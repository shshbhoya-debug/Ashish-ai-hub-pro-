import React, { useState, useRef, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech'; // Speech import kiya
import { AppContext } from '../context/AppContext';

const ChatScreen = ({ navigation }) => {
  const { tokens, isDarkMode } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value) setInput(e.value[0]);
    };
    return () => Voice.destroy().then(Voice.removeAllListeners);
  }, []);

  const speak = (text) => {
    Speech.speak(text, {
      language: 'en-US', // Hindi ke liye 'hi-IN' use kar sakte hain
      pitch: 1.0,
      rate: 1.0,
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI Response with Voice
    setTimeout(() => {
      const aiText = "Main sun sakta hoon aur bol bhi sakta hoon! Ashish AI Hub Pro ab ek advanced voice assistant ban gaya hai.";
      const aiMsg = { role: 'ai', content: aiText };
      setMessages(prev => [...prev, aiMsg]);
      
      // AI khud bolega!
      speak(aiText);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>AI Voice Chat</Text>
        <TouchableOpacity onPress={() => Speech.stop()}><Ionicons name="volume-mute-outline" size={24} color="#fff" /></TouchableOpacity>
      </View>

      <FlatList 
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={{color: item.role === 'user' ? '#fff' : '#000'}}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{padding: 20}}
      />

      <View style={styles.footer}>
        <View style={styles.inputRow}>
          <TouchableOpacity 
            style={[styles.micBtn, isListening && { backgroundColor: '#FF3B30' }]}
            onLongPress={() => { Voice.start('en-US'); setIsListening(true); }}
            onPressOut={() => { Voice.stop(); setIsListening(false); }}
          >
            <Ionicons name="mic" size={24} color={isListening ? "#FFF" : "#007AFF"} />
          </TouchableOpacity>
          
          <TextInput 
            style={styles.input} 
            placeholder="Talk to me..." 
            value={input} 
            onChangeText={setInput} 
          />
          
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 100, backgroundColor: '#007AFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 35 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bubble: { padding: 15, borderRadius: 20, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#E0E0E0' },
  footer: { padding: 15, backgroundColor: '#FFF' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  micBtn: { width: 45, height: 45, borderRadius: 23, borderWidth: 1, borderColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  input: { flex: 1, height: 45, backgroundColor: '#F5F5F5', borderRadius: 23, paddingHorizontal: 15 },
  sendBtn: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }
});

export default ChatScreen;
