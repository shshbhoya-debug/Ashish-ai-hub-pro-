import React, { useState } from 'react';
import { 
  Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, 
  SafeAreaView, Dimensions, StatusBar, ActivityIndicator, Modal, Image, Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');
const Colors = { primary: '#10A37F', bg: '#fff', bgSec: '#F7F7F8', border: '#E5E5E5', text: '#1F1F1F', textSec: '#6B6B6B' };

export default function App() {
  // --- Navigation & Data States ---
  const [screen, setScreen] = useState('splash');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [inputText, setInputText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(1250);

  // --- AI Logic (The Brain) ---
  const runAIAgent = async () => {
    if (!inputText.trim()) return;
    setLoading(true); setAiResponse('');
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer AIzaSyAVPxex5hW62fiXRAmrNEbJ64BGfJt9xBs", "Content-Type": "application/json" },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [{ "role": "system", "content": `You are a ${selectedAgent?.name} expert.` }, { "role": "user", "content": inputText }]
        })
      });
      const data = await response.json();
      setAiResponse(data.choices[0].message.content);
      setTokens(t => t - 10);
    } catch (e) { setAiResponse("API Error! Please check your internet or Key."); }
    setLoading(false);
  };

  // --- 13 SCREENS RENDERER ---
  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return (
          <View style={[styles.center, { backgroundColor: Colors.primary }]}>
            <Text style={{ fontSize: 80 }}>🤖</Text>
            <Text style={styles.splashTitle}>Ashish AI Hub Pro</Text>
            <TouchableOpacity style={styles.whiteBtn} onPress={() => setScreen('login')}><Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Get Started 🚀</Text></TouchableOpacity>
          </View>
        );

      case 'login':
        return (
          <View style={styles.center}>
            <Text style={styles.h1}>Welcome Back</Text>
            <TextInput placeholder="Email" style={styles.inputBox} />
            <TextInput placeholder="Password" style={styles.inputBox} secureTextEntry />
            <TouchableOpacity style={styles.mainBtn} onPress={() => setScreen('home')}><Text style={{ color: '#fff', fontWeight: 'bold' }}>Login</Text></TouchableOpacity>
          </View>
        );

      case 'home':
        return (
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.homeHeader}>
              <View style={styles.row}>
                <View style={styles.avatar}><Text style={{color:'#fff'}}>A</Text></View>
                <TouchableOpacity onPress={()=>setScreen('notif')}><Text style={{fontSize: 24}}>🔔</Text></TouchableOpacity>
              </View>
              <Text style={styles.h1}>Hello, Ashish 👋</Text>
              <View style={styles.searchBar}><Text style={{color:'#999'}}>Search 15+ AI Tools...</Text></View>
            </View>
            <View style={styles.section}>
              <Text style={styles.secTitle}>POPULAR AGENTS</Text>
              <View style={styles.grid}>
                {[{n:'Coding', i:'💻'}, {n:'Writing', i:'📝'}, {n:'Image', i:'🎨'}, {n:'Gaming', i:'🎮'}].map(item => (
                  <TouchableOpacity key={item.n} style={styles.card} onPress={() => { setSelectedAgent({name:item.n}); setModalVisible(true); }}>
                    <Text style={{fontSize: 32}}>{item.i}</Text>
                    <Text style={styles.cardTitle}>{item.n}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        );

      case 'wallet':
        return (
          <View style={styles.center}>
            <View style={styles.walletBox}>
              <Text style={{color:'#fff', opacity:0.8}}>Balance</Text>
              <Text style={{color:'#fff', fontSize: 40, fontWeight:'bold'}}>💰 {tokens}</Text>
            </View>
            <TouchableOpacity style={styles.mainBtn} onPress={()=>setTokens(t => t + 500)}><Text style={{color:'#fff'}}>Recharge 500 Tokens</Text></TouchableOpacity>
          </View>
        );

      case 'profile':
        return (
          <ScrollView style={styles.container}>
            <View style={styles.profileHead}>
              <View style={[styles.avatar, {width:80, height:80}]}><Text style={{fontSize:30, color:'#fff'}}>A</Text></View>
              <Text style={styles.h1}>Ashish Developer</Text>
            </View>
            {['Settings', 'History', 'Support', 'Terms'].map(item => (
              <TouchableOpacity key={item} style={styles.listItem} onPress={() => setScreen(item.toLowerCase().replace(' ', ''))}>
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.listItem, {marginTop: 20}]} onPress={()=>setScreen('login')}><Text style={{color:'red'}}>Logout</Text></TouchableOpacity>
          </ScrollView>
        );

      case 'history':
        return (
          <ScrollView style={styles.container}>
            <Text style={[styles.h1, {padding: 20}]}>AI History 📜</Text>
            {['React App Debug', 'Essay on AI', 'Image of Cyberpunk'].map((h, i) => (
              <View key={i} style={styles.listItem}><Text>{h}</Text></View>
            ))}
            <TouchableOpacity style={styles.backLink} onPress={()=>setScreen('profile')}><Text>← Back to Profile</Text></TouchableOpacity>
          </ScrollView>
        );

      case 'settings':
        return <View style={styles.center}><Text style={styles.h1}>Settings ⚙️</Text><TouchableOpacity onPress={()=>setScreen('profile')}><Text>Back</Text></TouchableOpacity></View>;
      case 'support':
        return <View style={styles.center}><Text style={styles.h1}>Support 📞</Text><TouchableOpacity onPress={()=>setScreen('profile')}><Text>Back</Text></TouchableOpacity></View>;
      case 'notif':
        return <View style={styles.center}><Text style={styles.h1}>Notifications 🔔</Text><TouchableOpacity onPress={()=>setScreen('home')}><Text>Back</Text></TouchableOpacity></View>;
      case 'terms':
        return <View style={styles.center}><Text style={styles.h1}>Terms & Privacy 📜</Text><TouchableOpacity onPress={()=>setScreen('profile')}><Text>Back</Text></TouchableOpacity></View>;

      default: return <View style={styles.center}><Text>Coming Soon...</Text></View>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>{renderScreen()}</View>

      {/* Bottom Nav */}
      {['home', 'wallet', 'profile'].includes(screen) && (
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => setScreen('home')}><Text style={screen==='home'?styles.act:styles.def}>🏠</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('wallet')}><Text style={screen==='wallet'?styles.act:styles.def}>💰</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('profile')}><Text style={screen==='profile'?styles.act:styles.def}>👤</Text></TouchableOpacity>
        </View>
      )}

      {/* Agent Input Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <View style={styles.row}>
              <Text style={styles.h1}>{selectedAgent?.name} Agent</Text>
              <TouchableOpacity onPress={() => {setModalVisible(false); setAiResponse('');}}><Text style={{fontSize: 24}}>✕</Text></TouchableOpacity>
            </View>
            <TextInput placeholder="Type here..." style={styles.modalInput} multiline onChangeText={setInputText} />
            <TouchableOpacity style={styles.mainBtn} onPress={runAIAgent} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color:'#fff', fontWeight:'bold'}}>Generate ✨</Text>}
            </TouchableOpacity>
            <ScrollView style={{marginTop: 20}}><Text style={styles.resText}>{aiResponse}</Text></ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  splashTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 20 },
  whiteBtn: { backgroundColor: '#fff', padding: 15, borderRadius: 30, marginTop: 40, paddingHorizontal: 40 },
  h1: { fontSize: 24, fontWeight: 'bold' },
  inputBox: { width: '100%', height: 55, backgroundColor: Colors.bgSec, borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: Colors.border },
  mainBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10, width: '100%' },
  homeHeader: { padding: 25, paddingTop: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  searchBar: { backgroundColor: Colors.bgSec, padding: 15, borderRadius: 12, marginTop: 20 },
  section: { padding: 25 },
  secTitle: { fontSize: 12, fontWeight: '800', color: '#999', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', marginTop: 10 },
  nav: { flexDirection: 'row', height: 80, borderTopWidth: 1, borderColor: '#eee', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15 },
  act: { fontSize: 24, color: Colors.primary },
  def: { fontSize: 24, color: '#ccc' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBody: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: height * 0.7 },
  modalInput: { backgroundColor: Colors.bgSec, borderRadius: 15, padding: 15, marginTop: 20, height: 120, textAlignVertical: 'top' },
  resText: { fontSize: 14, lineHeight: 22, color: '#333' },
  walletBox: { backgroundColor: Colors.primary, padding: 30, borderRadius: 20, width: '100%', alignItems: 'center', marginBottom: 20 },
  profileHead: { padding: 40, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  listItem: { padding: 20, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  backLink: { padding: 20, color: Colors.primary }
});
