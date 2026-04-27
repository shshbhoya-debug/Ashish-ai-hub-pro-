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
  primary: '#10A37F', 
};

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([{role: 'ai', text: 'Namaste Ashish! Main aapki kya madad kar sakta hoon?'}]);
  const [loading, setLoading] = useState(false);

  // --- HTML Tools Data (Directly from your code) ---
  const aiTools = [
    { id: 1, name: 'Essay Writer', desc: 'Write high quality essays', icon: '📝', color: '#E6F7F3' },
    { id: 2, name: 'Code Solver', desc: 'Fix bugs in your code', icon: '💻', color: '#F0F4FF' },
    { id: 3, name: 'Image Gen', desc: 'Create AI images', icon: '🎨', color: '#FFF0F0' },
    { id: 4, name: 'Translator', desc: 'Translate 50+ languages', icon: '🌐', color: '#F5F0FF' },
    { id: 5, name: 'Movie AI', desc: 'Personal recommendations', icon: '🍿', color: '#FFF9E6' },
    { id: 6, name: 'Study Buddy', desc: 'Your personal tutor', icon: '📚', color: '#E6FFF9' },
  ];

  // --- SCREEN RENDERER ---
  const renderScreen = () => {
    switch(screen) {
      case 'splash':
        return (
          <View style={[styles.center, {backgroundColor: Colors.primary}]}>
            <Text style={{fontSize: 80}}>🤖</Text>
            <Text style={[styles.greetName, {color: '#fff'}]}>Ashish AI Hub Pro</Text>
            <TouchableOpacity style={styles.splashBtn} onPress={() => setScreen('login')}>
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
          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            <View style={styles.homeHeader}>
               <View style={styles.hTop}>
                 <View style={styles.avatar}><Text style={{color:'#fff'}}>A</Text></View>
                 <Text style={styles.greetName}>Ashish 👋</Text>
               </View>
               <TouchableOpacity style={styles.searchBar}><Text style={{color: '#999'}}>Search 15+ AI Tools...</Text></TouchableOpacity>
            </View>
            <View style={styles.section}>
              <View style={styles.bannerCard}><Text style={styles.bcTitle}>Gemini 2.0 Now Live! 🚀</Text></View>
              
              <Text style={styles.secTitle}>POPULAR TOOLS</Text>
              <View style={styles.toolsGrid}>
                {aiTools.slice(0, 4).map(tool => (
                  <TouchableOpacity key={tool.id} style={styles.toolCard} onPress={() => setScreen('chat')}>
                    <Text style={{fontSize: 24}}>{tool.icon}</Text>
                    <Text style={styles.toolName}>{tool.name}</Text>
                    <Text style={styles.toolDesc}>{tool.desc}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        );

      case 'tools':
        return (
          <ScrollView style={{flex: 1, backgroundColor: '#fff'}} padding={20}>
            <Text style={styles.greetName}>AI Tools Grid 🛠️</Text>
            <View style={[styles.toolsGrid, {marginTop: 20}]}>
              {aiTools.map(tool => (
                <TouchableOpacity key={tool.id} style={[styles.toolCard, {width: '48%'}]}>
                  <Text style={{fontSize: 30, marginBottom: 10}}>{tool.icon}</Text>
                  <Text style={styles.toolName}>{tool.name}</Text>
                  <Text style={styles.toolDesc}>{tool.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );

      case 'profile':
        return (
          <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.profileHeader}>
               <View style={styles.largeAvatar}><Text style={{fontSize: 40, color: '#fff'}}>A</Text></View>
               <Text style={styles.greetName}>Ashish Developer</Text>
               <Text style={styles.greetText}>ashish@aihub.pro</Text>
            </View>
            <View style={styles.statsRow}>
               <View style={styles.statBox}><Text style={styles.statVal}>1.2k</Text><Text style={styles.statLab}>Tokens</Text></View>
               <View style={styles.statBox}><Text style={styles.statVal}>45</Text><Text style={styles.statLab}>Chats</Text></View>
            </View>
            {['Settings', 'AI History', 'Security', 'Logout'].map((item, i) => (
              <TouchableOpacity key={i} style={styles.menuItem} onPress={() => item === 'Logout' && setScreen('login')}>
                <Text style={{fontSize: 16, fontWeight: '600', color: item === 'Logout' ? 'red' : '#333'}}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      default:
        return <View style={styles.center}><Text>Screen Loading...</Text></View>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1}}>{renderScreen()}</View>
      
      {screen !== 'splash' && screen !== 'login' && (
        <View style={styles.bNav}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.ni}><Text style={screen === 'home' ? styles.actNav : styles.defNav}>🏠</Text><Text style={styles.navLabel}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('tools')} style={styles.ni}><Text style={screen === 'tools' ? styles.actNav : styles.defNav}>🛠️</Text><Text style={styles.navLabel}>Tools</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('chat')} style={styles.navFab}><Text style={{color: '#fff', fontSize: 24}}>💬</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('wallet')} style={styles.ni}><Text style={screen === 'wallet' ? styles.actNav : styles.defNav}>💰</Text><Text style={styles.navLabel}>Wallet</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('profile')} style={styles.ni}><Text style={screen === 'profile' ? styles.actNav : styles.defNav}>👤</Text><Text style={styles.navLabel}>Profile</Text></TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  scrollBody: { flex: 1 },
  greetName: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  greetText: { fontSize: 13, color: Colors.textSecondary },
  splashBtn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, marginTop: 30 },
  loginInput: { width: '100%', height: 55, backgroundColor: Colors.bgSecondary, borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: Colors.border },
  mainBtn: { width: '100%', height: 55, backgroundColor: Colors.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  homeHeader: { padding: 20, paddingTop: 30 },
  hTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  searchBar: { backgroundColor: Colors.bgSecondary, padding: 14, borderRadius: 12, marginTop: 20, borderWidth: 1, borderColor: '#eee' },
  section: { paddingHorizontal: 20 },
  bannerCard: { height: 100, borderRadius: 15, backgroundColor: '#E6F7F3', justifyContent: 'center', padding: 20, marginBottom: 25 },
  bcTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  secTitle: { fontSize: 12, fontWeight: '800', color: '#999', marginBottom: 15, letterSpacing: 1 },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  toolCard: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: Colors.border },
  toolName: { fontSize: 14, fontWeight: '700', marginTop: 10, color: Colors.text },
  toolDesc: { fontSize: 11, color: Colors.textSecondary, marginTop: 4 },
  bNav: { flexDirection: 'row', height: 85, backgroundColor: '#fff', borderTopWidth: 1, borderColor: Colors.border, alignItems: 'center', paddingBottom: 15 },
  ni: { flex: 1, alignItems: 'center' },
  navLabel: { fontSize: 10, color: '#999', marginTop: 4 },
  actNav: { fontSize: 22, color: Colors.primary },
  defNav: { fontSize: 22, color: '#CCC' },
  navFab: { width: 56, height: 56, borderRadius: 18, backgroundColor: Colors.primary, marginTop: -40, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  profileHeader: { padding: 40, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  largeAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  statsRow: { flexDirection: 'row', padding: 20, gap: 15 },
  statBox: { flex: 1, padding: 15, backgroundColor: Colors.bgSecondary, borderRadius: 12, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: 'bold' },
  statLab: { fontSize: 11, color: '#999' },
  menuItem: { padding: 20, borderBottomWidth: 1, borderColor: '#f0f0f0' }
});
