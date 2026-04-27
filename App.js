import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, 
  SafeAreaView, Dimensions, StatusBar, ActivityIndicator, Modal, Clipboard 
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ── THEME COLORS ──
const Colors = {
  bg: '#FFFFFF',
  bgSec: '#F7F7F8',
  border: '#E5E5E5',
  primary: '#10A37F',
  text: '#1F1F1F',
  textSec: '#6B6B6B'
};

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [inputText, setInputText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(1250);

  // ── MULTI-AGENT ENGINE ──
  const runAgent = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setAiResponse('');

    // System Prompts for different agents
    const systemPrompts = {
      'Coding': "You are a Senior Software Engineer. Provide clean code blocks with brief logic.",
      'Writing': "You are a Professional Writer. Write structured, high-quality content.",
      'Image': "You are a Prompt Engineer. Convert ideas into detailed 4K image descriptions.",
      'General': "You are Ashish AI Pro, a smart and helpful AI assistant."
    };

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_OPENROUTER_KEY", // Yahan apni key dalein
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [
            { "role": "system", "content": systemPrompts[selectedAgent?.name] || systemPrompts.General },
            { "role": "user", "content": inputText }
          ]
        })
      });
      const data = await response.json();
      setAiResponse(data.choices[0].message.content);
      setTokens(prev => prev - 10); // Simulated token deduction
    } catch (error) {
      setAiResponse("System busy! Check your API key or internet.");
    }
    setLoading(false);
  };

  // ── UI COMPONENTS ──
  const AgentCard = ({ icon, name, desc }) => (
    <TouchableOpacity style={styles.toolCard} onPress={() => { setSelectedAgent({name, desc}); setModalVisible(true); }}>
      <Text style={{fontSize: 28}}>{icon}</Text>
      <Text style={styles.toolName}>{name}</Text>
      <Text style={styles.toolDesc}>{desc}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {screen === 'splash' ? (
        <View style={styles.splash}>
          <Text style={{fontSize: 80}}>🤖</Text>
          <Text style={styles.splashTitle}>Ashish AI Hub Pro</Text>
          <TouchableOpacity style={styles.whiteBtn} onPress={() => setScreen('home')}>
            <Text style={{color: Colors.primary, fontWeight: 'bold'}}>Launch AI 🚀</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.row}>
              <View style={styles.avatar}><Text style={{color:'#fff'}}>A</Text></View>
              <View style={styles.tokenBadge}><Text style={{fontSize: 12, fontWeight: 'bold'}}>💰 {tokens}</Text></View>
            </View>
            <Text style={styles.greet}>Good Morning, Ashish 👋</Text>
            <View style={styles.searchBar}><Text style={{color:'#999'}}>Search AI Agents...</Text></View>
          </View>

          {/* Agents Grid */}
          <View style={styles.section}>
            <Text style={styles.secTitle}>ACTIVE AI AGENTS</Text>
            <View style={styles.grid}>
              <AgentCard icon="💻" name="Coding" desc="App builder & debugger" />
              <AgentCard icon="📝" name="Writing" desc="Essay & Content writer" />
              <AgentCard icon="🎨" name="Image" desc="Visual prompt generator" />
              <AgentCard icon="🧠" name="General" desc="Chat with Gemini 2.0" />
            </View>
          </View>
        </ScrollView>
      )}

      {/* AGENT MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedAgent?.name} Agent</Text>
              <TouchableOpacity onPress={() => {setModalVisible(false); setAiResponse(''); setInputText('');}}><Text style={{fontSize: 24}}>✕</Text></TouchableOpacity>
            </View>
            
            <ScrollView style={{maxHeight: height * 0.6}}>
              <TextInput 
                placeholder={`Ask ${selectedAgent?.name} anything...`}
                style={styles.input}
                multiline
                value={inputText}
                onChangeText={setInputText}
              />
              
              <TouchableOpacity style={styles.mainBtn} onPress={runAgent} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color:'#fff', fontWeight:'bold'}}>Run Agent ✨</Text>}
              </TouchableOpacity>

              {aiResponse ? (
                <View style={styles.responseBox}>
                  <Text style={styles.responseText}>{aiResponse}</Text>
                  <TouchableOpacity onPress={() => Clipboard.setString(aiResponse)} style={styles.copyBtn}>
                    <Text style={{fontSize: 12, color: Colors.primary}}>📋 Copy Output</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
      {screen !== 'splash' && (
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => setScreen('home')}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.fab}><Text style={{fontSize: 24, color: '#fff'}}>💬</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('profile')}><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  splash: { flex: 1, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  splashTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 20 },
  whiteBtn: { backgroundColor: '#fff', padding: 15, borderRadius: 30, marginTop: 40, paddingHorizontal: 40 },
  header: { padding: 25, paddingTop: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  tokenBadge: { backgroundColor: Colors.bgSec, padding: 8, borderRadius: 10, borderWidth: 1, borderColor: Colors.border },
  greet: { fontSize: 26, fontWeight: 'bold', marginTop: 20 },
  searchBar: { backgroundColor: Colors.bgSec, padding: 15, borderRadius: 12, marginTop: 20, borderWidth: 1, borderColor: '#eee' },
  section: { padding: 25 },
  secTitle: { fontSize: 12, fontWeight: '800', color: '#999', letterSpacing: 1, marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  toolCard: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: Colors.border, elevation: 2 },
  toolName: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  toolDesc: { fontSize: 11, color: '#888', marginTop: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBody: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: height * 0.7 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold' },
  input: { backgroundColor: Colors.bgSec, borderRadius: 15, padding: 20, textAlignVertical: 'top', minHeight: 120, fontSize: 16 },
  mainBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 15 },
  responseBox: { marginTop: 20, padding: 20, backgroundColor: '#f9f9f9', borderRadius: 15, borderWidth: 1, borderColor: '#eee' },
  responseText: { fontSize: 14, lineHeight: 22, color: '#333' },
  copyBtn: { marginTop: 10, alignSelf: 'flex-end' },
  nav: { flexDirection: 'row', height: 80, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
  navIcon: { fontSize: 24, color: '#ccc', flex: 1, textAlign: 'center' },
  fab: { width: 60, height: 60, borderRadius: 20, backgroundColor: Colors.primary, marginTop: -40, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});
