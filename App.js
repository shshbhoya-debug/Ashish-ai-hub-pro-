import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([{role: 'ai', text: 'Namaste Ashish! Main aapki kya madad kar sakta hoon?'}]);
  const [loading, setLoading] = useState(false);

  // AI se baat karne wala function
  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = {role: 'user', text: inputText};
    setMessages([...messages, userMsg]);
    const currentInput = inputText;
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_OPENROUTER_API_KEY", // <--- Yahan apni key daalein
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [{"role": "user", "content": currentInput}]
        })
      });
      const data = await response.json();
      const aiMsg = data.choices[0].message.content;
      setMessages(prev => [...prev, {role: 'ai', text: aiMsg}]);
    } catch (e) {
      setMessages(prev => [...prev, {role: 'ai', text: 'Connection fail ho gaya. API Key check karein!'}]);
    }
    setLoading(false);
  };

  // Screens Definitions
  if (screen === 'login') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Ashish AI Hub Pro</Text>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('home')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'home') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Welcome, Ashish!</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#25d366'}]} onPress={() => setScreen('chat')}>
          <Text style={styles.btnText}>Start AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginTop: 10, backgroundColor: '#666'}]} onPress={() => setScreen('login')}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Chat Assistant</Text>
      <ScrollView style={styles.chatBox}>
        {messages.map((m, i) => (
          <View key={i} style={m.role === 'user' ? styles.userBubble : styles.aiBubble}>
            <Text style={styles.msgText}>{m.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#075e54" />}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput 
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything..." 
          style={styles.chatInput} 
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{color:'white', fontWeight: 'bold'}}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setScreen('home')} style={{padding: 10}}>
        <Text style={{textAlign:'center', color: '#007bff'}}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#075e54' },
  header: { fontSize: 20, textAlign: 'center', padding: 15, backgroundColor: '#075e54', color: 'white', fontWeight: 'bold' },
  input: { width: '100%', borderBottomWidth: 1, padding: 12, marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  chatBox: { flex: 1, padding: 15 },
  userBubble: { backgroundColor: '#dcf8c6', padding: 12, borderRadius: 10, alignSelf: 'flex-end', marginBottom: 10, maxWidth: '80%' },
  aiBubble: { backgroundColor: '#fff', padding: 12, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 10, maxWidth: '80%', borderWidth: 1, borderColor: '#eee' },
  msgText: { fontSize: 15, color: '#333' },
  inputRow: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  chatInput: { flex: 1, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 20, paddingLeft: 15 },
  sendBtn: { backgroundColor: '#075e54', paddingHorizontal: 20, marginLeft: 10, borderRadius: 20, justifyContent: 'center' }
});
