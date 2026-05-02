import React, { useState, useRef, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ navigation }) => {
  const { tokens, isDarkMode, saveChat } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    // Voice event listeners
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setInput(e.value[0]); // Jo bola wo input mein set ho jayega
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // 'hi-IN' for Hindi support
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    // Save logic yahan aayega
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>AI Voice Chat</Text>
        <Text style={styles.tokenCount}>⚡ {tokens}</Text>
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

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[styles.footer, { backgroundColor: isDarkMode ? '#121212' : '#FFF' }]}>
          <View style={styles.inputRow}>
            
            {/* VOICE BUTTON */}
            <TouchableOpacity 
              style={[styles.micBtn, isListening && styles.micActive]} 
              onLongPress={startListening}
              onPressOut={stopListening}
            >
              <Ionicons name={isListening ? "mic" : "mic-outline"} size={24} color={isListening ? "#FFF" : "#007AFF"} />
            </TouchableOpacity>

            <TextInput 
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              placeholder={isListening ? "Listening..." : "Type or hold mic..."}
              value={input}
              onChangeText={setInput}
            />

            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Ionicons name="send" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 100, backgroundColor: '#007AFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 35 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tokenCount: { color: '#B9F6CA', fontWeight: 'bold' },
  bubble: { padding: 15, borderRadius: 20, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#E0E0E0' },
  footer: { padding: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  micBtn: { width: 45, height: 45, borderRadius: 23, borderWidth: 1, borderColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  micActive: { backgroundColor: '#FF3B30', borderColor: '#FF3B30' },
  input: { flex: 1, height: 45, backgroundColor: '#F5F5F5', borderRadius: 23, paddingHorizontal: 15 },
  sendBtn: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }
});

export default ChatScreen;
