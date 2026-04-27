import React, { useState } from 'react';
import { 
  Text, View, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, Image, SafeAreaView, Dimensions, StatusBar, ActivityIndicator 
} from 'react-native';

const { width } = Dimensions.get('window');

// ── THEME COLORS (From your HTML Design) ──
const Colors = {
  bg: '#FFFFFF',
  bgSecondary: '#F7F7F8',
  border: '#E5E5E5',
  text: '#1F1F1F',
  textSecondary: '#6B6B6B',
  primary: '#10A37F', // ChatGPT Green
};

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([{role: 'ai', text: 'Namaste Ashish! Main aapki kya madad kar sakta hoon?'}]);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  // --- AI LOGIC (Chat & Image) ---
  const handleChat = async () => {
    if (!inputText.trim()) return;
    const userMsg = {role: 'user', text: inputText};
    setMessages([...messages, userMsg]);
    const currentInput = inputText; setInputText(''); setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer YOUR_KEY", "Content-Type": "application/json" },
        body: JSON.stringify({ "model": "google/gemini-2.0-flash-exp:free", "messages": [{"role": "user", "content": currentInput}] })
      });
      const data = await response.json();
      setMessages(prev => [...prev, {role: 'ai', text: data.choices[0].message.content}]);
    } catch (e) { setMessages(prev => [...prev, {role: 'ai', text: 'Connection Error! Check API Key.'}]); }
    setLoading(false);
  };

  const handleImage = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setGeneratedImage(`https://image.pollinations.ai/prompt/${encodeURIComponent(inputText)}?width=1024&height=1024&nologo=true`);
    setLoading(false);
  };

  // --- SCREEN RENDERER ---
  const renderScreen = () => {
    switch(screen) {
      case 'splash':
        return (
          <View style={[styles.center, {backgroundColor: Colors.primary}]}>
            <Text style={{fontSize: 80}}>🤖</Text>
            <Text style={[styles.greetName, {color: '#fff'}]}>Ashish AI Hub Pro</Text>
            <TouchableOpacity style={[styles.mainBtn, {backgroundColor: '#fff', width: '60%', marginTop: 40}]} onPress={() => setScreen('login')}>
              <Text style={{color: Colors.primary, fontWeight: 'bold'}}>Get Started 🚀</Text>
            </TouchableOpacity>
          </View>
        );

      case 'login':
        return (
          <View style={styles.center}>
            <Text style={styles.greetName}>Welcome Back</Text>
            <Text style={styles.greetText}>Log in with your Ashish AI account</Text>
            <TextInput placeholder="Email" style={styles.loginInput} />
            <TextInput placeholder="Password" style={styles.loginInput} secureTextEntry />
            <TouchableOpacity style={styles.mainBtn} onPress={() => setScreen('home')}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Continue</Text>
            </TouchableOpacity>
          </View>
        );

      case 'home':
        return (
          <ScrollView style={styles.scrollBody}>
            <View style={styles.homeHeader}>
               <View style={styles.hTop}>
                 <View style={styles.avatar}><Text style={{color:'#fff'}}>A</Text></View>
                 <Text style={styles.greetName}>Ashish 👋</Text>
               </View>
               <TouchableOpacity style={styles.searchBar}><Text style={{color: '#999'}}>Search AI Tools...</Text></TouchableOpacity>
            </View>
            <View style={styles.section}>
              <View style={styles.bannerCard}><Text style={styles.bcTitle}>Gemini 2.0 Now Live! 🚀</Text></View>
              <Text style={styles.secTitle}>QUICK ACTIONS</Text>
              <View style={styles.qGrid}>
                <TouchableOpacity style={styles.qi} onPress={()=>setScreen('chat')}><View style={styles.qiIcon}><Text>💬</Text></View><Text>Chat</Text></TouchableOpacity>
                <TouchableOpacity style={styles.qi} onPress={()=>setScreen('image')}><View style={styles.qiIcon}><Text>🎨</Text></View><Text>Art</Text></TouchableOpacity>
                <TouchableOpacity style={styles.qi} onPress={()=>setScreen('gaming')}><View style={styles.qiIcon}><Text>🎮</Text></View><Text>Games</Text></TouchableOpacity>
                <TouchableOpacity style={styles.qi} onPress={()=>setScreen('wallet')}><View style={styles.qiIcon}><Text>💰</Text></View><Text>Wallet</Text></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );

      case 'chat':
        return (
          <View style={{flex: 1}}>
            <ScrollView style={{padding: 15}}>
              {messages.map((m, i) => (
                <View key={i} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
                  <Text style={{color: m.role === 'user' ? '#fff' : '#000'}}>{m.text}</Text>
                </View>
              ))}
              {loading && <ActivityIndicator color={Colors.primary} />}
            </ScrollView>
            <View style={styles.chatInputRow}>
              <TextInput value={inputText} onChangeText={setInputText} placeholder="Ask me anything..." style={styles.cInput} />
              <TouchableOpacity onPress={handleChat} style={styles.sendBtn}><Text style={{color:'#fff'}}>Send</Text></TouchableOpacity>
            </View>
          </View>
        );

      case 'image':
        return (
          <View style={styles.center}>
            <Text style={styles.secTitle}>AI Image Creator</Text>
            <TextInput value={inputText} onChangeText={setInputText} placeholder="Describe the image..." style={styles.loginInput} />
            <TouchableOpacity style={styles.mainBtn} onPress={handleImage}><Text style={{color:'#fff'}}>Generate Art</Text></TouchableOpacity>
            {generatedImage && <Image source={{uri: generatedImage}} style={styles.previewImg} />}
          </View>
        );
        
      default:
        return <View style={styles.center}><Text>{screen.toUpperCase()} Screen Coming Soon</Text><TouchableOpacity onPress={()=>setScreen('home')}><Text>Back Home</Text></TouchableOpacity></View>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1}}>{renderScreen()}</View>
      
      {/* BOTTOM NAV */}
      {screen !== 'splash' && screen !== 'login' && (
        <View style={styles.bNav}>
          <TouchableOpacity onPress={() => setScreen('home')}><Text style={screen === 'home' ? styles.actNav : styles.defNav}>🏠</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('chat')}><Text style={screen === 'chat' ? styles.actNav : styles.defNav}>💬</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('wallet')}><Text style={screen === 'wallet' ? styles.actNav : styles.defNav}>💰</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('profile')}><Text style={screen === 'profile' ? styles.actNav : styles.defNav}>👤</Text></TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  scrollBody: { flex: 1 },
  greetName: { fontSize: 26, fontWeight: 'bold', color: Colors.text },
  greetText: { fontSize: 14, color: Colors.textSecondary, marginTop: 5 },
  loginInput: { width: '100%', height: 55, backgroundColor: Colors.bgSecondary, borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: Colors.border },
  mainBtn: { width: '100%', height: 55, backgroundColor: Colors.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  homeHeader: { padding: 20, paddingTop: 40 },
  hTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  searchBar: { backgroundColor: Colors.bgSecondary, padding: 14, borderRadius: 12, marginTop: 20 },
  section: { paddingHorizontal: 20 },
  bannerCard: { height: 100, borderRadius: 15, backgroundColor: '#E6F7F3', justifyContent: 'center', padding: 20, marginBottom: 20 },
  bcTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  secTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 15 },
  qGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  qi: { alignItems: 'center' },
  qiIcon: { width: 65, height: 65, backgroundColor: Colors.bgSecondary, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  bNav: { flexDirection: 'row', height: 75, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: Colors.border, justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15 },
  actNav: { fontSize: 22, color: Colors.primary },
  defNav: { fontSize: 22, color: '#999' },
  bubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  userBubble: { backgroundColor: Colors.primary, alignSelf: 'flex-end' },
  aiBubble: { backgroundColor: Colors.bgSecondary, alignSelf: 'flex-start' },
  chatInputRow: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderColor: Colors.border },
  cInput: { flex: 1, height: 45, backgroundColor: Colors.bgSecondary, borderRadius: 20, paddingHorizontal: 15 },
  sendBtn: { backgroundColor: Colors.primary, padding: 10, borderRadius: 20, marginLeft: 10 },
  previewImg: { width: 300, height: 300, marginTop: 20, borderRadius: 15 }
});
