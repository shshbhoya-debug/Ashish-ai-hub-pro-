import React, { useState, useContext, useRef } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { AppContext } from '../context/AppContext';
import { callOpenRouter } from '../services/aiService';

const agents = [
  { id: '1', name: 'General AI', icon: 'chatbubble-ellipses', color: '#007AFF', prompt: 'You are a helpful assistant.' },
  { id: '2', name: 'Code Wizard', icon: 'code-slash', color: '#AF52DE', prompt: 'You are a Senior Dev. Output code in markdown blocks.' },
  { id: '3', name: 'Creative Writer', icon: 'pencil', color: '#FF9500', prompt: 'You are a creative writer. Use bold and italics for emphasis.' },
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
      alert("Tokens low!");
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
      updateTokens(-5, `Chat: ${selectedAgent.name}`);
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
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>{selectedAgent.name}</Text>
      </View>

      <FlatList 
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={[styles.msgContainer, item.sender === 'user' ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
            <View style={[styles.msgBox, { backgroundColor: item.sender === 'user' ? accentColor : (isDarkMode ? '#1F1F1F' : '#FFF') }]}>
              <Markdown style={{ 
                body: { color: item.sender === 'user' ? '#FFF' : (isDarkMode ? '#EEE' : '#333'), fontSize: 15 },
                code_inline: { backgroundColor: '#8884', padding: 2, borderRadius: 4 },
                fence: { backgroundColor: '#000', borderRadius: 10, padding: 10 }
              }}>
                {item.text}
              </Markdown>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.inputArea, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
          <TextInput 
            style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity onPress={handleSend} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color={accentColor} /> : <Ionicons name="send" size={24} color={accentColor} />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 10 },
  msgContainer: { maxWidth: '85%', marginBottom: 10 },
  msgBox: { padding: 12, borderRadius: 18, elevation: 1 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 15, borderTopWidth: 0.5, borderTopColor: '#8884' },
  input: { flex: 1, maxHeight: 100, fontSize: 16 }
});

export default ChatScreen;
