import React, { useState, useContext, useRef } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { callOpenRouter } from '../services/aiService';

const agents = [
  { id: '1', name: 'General AI', icon: 'chatbubble-ellipses', color: '#007AFF', prompt: 'You are a helpful general assistant.' },
  { id: '2', name: 'Code Wizard', icon: 'code-slash', color: '#AF52DE', prompt: 'You are an expert software developer. Provide only clean, efficient code.' },
  { id: '3', name: 'Creative Writer', icon: 'pencil', color: '#FF9500', prompt: 'You are a professional creative writer. Be poetic and descriptive.' },
  { id: '4', name: 'Prompt Eng', icon: 'color-palette', color: '#FF2D55', prompt: 'You are an expert in writing AI image generation prompts.' },
];

const ChatScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, apiKey, updateTokens, tokens } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (tokens < 5) {
      alert("Tokens khatam ho gaye bhai!");
      return;
    }

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await callOpenRouter(`${selectedAgent.prompt}\nUser: ${input}`, apiKey);
      const aiMsg = { id: Date.now() + 1, text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
      updateTokens(-5, `Chat with ${selectedAgent.name}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>{selectedAgent.name}</Text>
      </View>

      <View style={styles.agentBar}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={agents}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              onPress={() => setSelectedAgent(item)}
              style={[styles.agentTab, { borderColor: selectedAgent.id === item.id ? item.color : 'transparent' }]}
            >
              <Ionicons name={item.icon} size={18} color={item.color} />
              <Text style={[styles.agentName, { color: isDarkMode ? '#FFF' : '#333' }]}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList 
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={[styles.msgBox, item.sender === 'user' ? styles.userMsg : styles.aiMsg, { backgroundColor: item.sender === 'user' ? accentColor : (isDarkMode ? '#1F1F1F' : '#FFF') }]}>
            <Text style={{ color: item.sender === 'user' ? '#FFF' : (isDarkMode ? '#FFF' : '#000') }}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
          <TextInput 
            style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleSend} disabled={loading}>
            <Ionicons name="send" size={24} color={accentColor} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  agentBar: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#8882' },
  agentTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, borderWidth: 2, marginHorizontal: 5 },
  agentName: { marginLeft: 8, fontSize: 12, fontWeight: 'bold' },
  msgBox: { padding: 15, borderRadius: 20, marginBottom: 10, maxWidth: '80%', elevation: 2 },
  userMsg: { alignSelf: 'flex-end' },
  aiMsg: { alignSelf: 'flex-start' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderTopWidth: 1, borderTopColor: '#8882' },
  input: { flex: 1, fontSize: 16, marginRight: 10 }
});

export default ChatScreen;
