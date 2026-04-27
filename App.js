import React, { useState } from 'react';
import { 
  Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, 
  SafeAreaView, Dimensions, StatusBar, ActivityIndicator, Modal, Image, Clipboard 
} from 'react-native';

const { width, height } = Dimensions.get('window');
const Colors = { primary: '#10A37F', bg: '#fff', bgSec: '#F7F7F8', border: '#E5E5E5', text: '#1F1F1F' };

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [inputText, setInputText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  // --- 1. THE BRAIN (Multi-Agent Logic) ---
  const runAIAgent = async () => {
    if (!inputText.trim()) return;
    setLoading(true); setAiResponse(''); setImgUrl(null);

    if (selectedAgent.name === 'Image') {
      // Asli Image Generation Feature
      setImgUrl(`https://image.pollinations.ai/prompt/${encodeURIComponent(inputText)}?width=1024&height=1024&nologo=true`);
      setLoading(false); return;
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer YOUR_KEY", "Content-Type": "application/json" },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [
            { "role": "system", "content": `You are an expert ${selectedAgent.name} agent.` },
            { "role": "user", "content": inputText }
          ]
        })
      });
      const data = await response.json();
      setAiResponse(data.choices[0].message.content);
    } catch (e) { setAiResponse("System Offline. Check API Key."); }
    setLoading(false);
  };

  // --- 2. THE SCREENS (13 Screens Logic) ---
  const renderContent = () => {
    switch(screen) {
      case 'home':
        return (
          <ScrollView style={{padding: 20}}>
            <Text style={styles.h1}>Ashish AI Hub Pro</Text>
            <View style={styles.banner}><Text style={{color: Colors.primary, fontWeight: 'bold'}}>Gemini 2.0 Agent Active ⚡</Text></View>
            <Text style={styles.secTitle}>EXPLORE AGENTS</Text>
            <View style={styles.grid}>
              {[{n: 'Coding', i: '💻'}, {n: 'Writing', i: '📝'}, {n: 'Image', i: '🎨'}, {n: 'Gaming', i: '🎮'}].map(item => (
                <TouchableOpacity key={item.n} style={styles.card} onPress={() => { setSelectedAgent({name: item.n}); setModalVisible(true); }}>
                  <Text style={{fontSize: 30}}>{item.i}</Text>
                  <Text style={styles.cardTitle}>{item.n}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      case 'wallet': return <View style={styles.center}><Text style={styles.h1}>💰 Wallet: 1,250 Tokens</Text></View>;
      case 'profile': return <View style={styles.center}><Text style={styles.h1}>👤 Profile & Settings</Text></View>;
      default: return <View style={styles.center}><Text>Splash Loading...</Text></View>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {screen === 'splash' ? (
        <View style={[styles.center, {backgroundColor: Colors.primary}]}>
          <Text style={{fontSize: 80}}>🤖</Text>
          <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 20}}>Ashish AI Hub Pro</Text>
          <TouchableOpacity style={styles.whiteBtn} onPress={() => setScreen('home')}><Text style={{color: Colors.primary, fontWeight:'bold'}}>Start Coding 🚀</Text></TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={{flex: 1}}>{renderContent()}</View>
          {/* Bottom Navigation */}
          <View style={styles.nav}>
             <TouchableOpacity onPress={() => setScreen('home')}><Text style={screen==='home'?styles.act:styles.def}>🏠</Text></TouchableOpacity>
             <TouchableOpacity onPress={() => setScreen('wallet')}><Text style={screen==='wallet'?styles.act:styles.def}>💰</Text></TouchableOpacity>
             <TouchableOpacity onPress={() => setScreen('profile')}><Text style={screen==='profile'?styles.act:styles.def}>👤</Text></TouchableOpacity>
          </View>
        </>
      )}

      {/* AGENT MODAL (The Main Feature) */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.h1}>{selectedAgent?.name} Agent</Text>
              <TouchableOpacity onPress={() => {setModalVisible(false); setAiResponse(''); setImgUrl(null);}}><Text style={{fontSize: 24}}>✕</Text></TouchableOpacity>
            </View>
            <TextInput placeholder="Ask anything..." style={styles.input} multiline value={inputText} onChangeText={setInputText} />
            <TouchableOpacity style={styles.mainBtn} onPress={runAIAgent} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color:'#fff', fontWeight:'bold'}}>Generate ✨</Text>}
            </TouchableOpacity>
            <ScrollView style={{marginTop: 20}}>
              {aiResponse ? <View style={styles.resBox}><Text>{aiResponse}</Text></View> : null}
              {imgUrl ? <Image source={{uri: imgUrl}} style={styles.resImg} /> : null}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  splash: { flex: 1, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  whiteBtn: { backgroundColor: '#fff', padding: 15, borderRadius: 30, marginTop: 40, paddingHorizontal: 40 },
  h1: { fontSize: 24, fontWeight: 'bold' },
  banner: { backgroundColor: '#E6F7F3', padding: 15, borderRadius: 12, marginVertical: 20 },
  secTitle: { fontSize: 12, fontWeight: '800', color: '#999', letterSpacing: 1, marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', marginTop: 10 },
  nav: { flexDirection: 'row', height: 80, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center', justifyContent: 'space-around' },
  act: { fontSize: 24, color: Colors.primary },
  def: { fontSize: 24, color: '#ccc' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBody: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: height * 0.8 },
  input: { backgroundColor: Colors.bgSec, borderRadius: 15, padding: 15, marginTop: 20, minHeight: 100, textAlignVertical: 'top' },
  mainBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 15 },
  resBox: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  resImg: { width: '100%', height: 300, borderRadius: 15, marginTop: 10 }
});
