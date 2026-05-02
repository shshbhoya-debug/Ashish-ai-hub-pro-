import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Markdown from 'react-native-markdown-display';
import { AppContext } from '../context/AppContext';
import { callOpenRouter } from '../services/aiService';

const defaultAgents = [
  { id: '1', name: 'General AI', icon: 'chatbubble-ellipses', color: '#007AFF', prompt: 'You are a helpful assistant.' },
  { id: '2', name: 'Code Wizard', icon: 'code-slash', color: '#AF52DE', prompt: 'You are a Senior Dev. Output code in markdown blocks.' }
];

const ChatScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, apiKey, updateTokens, tokens } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [agents, setAgents] = useState(defaultAgents);
  const [selectedAgent, setSelectedAgent] = useState(defaultAgents[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCustomAgents = async () => {
      try {
        const stored = await AsyncStorage.getItem('@custom_agents');
        if (stored) {
          const customAgents = JSON.parse(stored);
          setAgents([...defaultAgents, ...customAgents]);
        }
      } catch (e) { console.log(e); }
    };
    const unsubscribe = navigation.addListener('focus', loadCustomAgents);
    return unsubscribe;
  }, [navigation]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (tokens < 5) { alert("Tokens low!"); return; }

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
        <Ionicons name={selectedAgent.icon} size={24} color={selectedAgent.color} />
      </View>

      {/* Agent Selector Slider */}
      <View style={styles.agentSliderBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {agents.map((ag) => (
            <TouchableOpacity 
              key={ag.id} 
              onPress={() => setSelectedAgent(ag)}
              style={[styles.agentChip, { backgroundColor: selectedAgent.id === ag.id ? ag.color : (isDarkMode ? '#1F1F1F' : '#FFF') }]}
            >
              <Ionicons name={ag.icon} size={16} color={selectedAgent.id === ag.id ? '#FFF' : ag.color} />
              <Text style={{ marginLeft: 5, fontSize: 13, fontWeight: 'bold', color: selectedAgent.id === ag.id ? '#FFF' : (isDarkMode ? '#FFF' : '#000') }}>
                {ag.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={[styles.agentChip, { backgroundColor: accentColor + '20', borderWidth: 1, borderColor: accentColor }]}
            onPress={() => navigation.navigate('CreateAgentScreen')}
          >
            <Ionicons name="add" size={16} color={accentColor} />
            <Text style={{ marginLeft: 5, fontSize: 13, fontWeight: 'bold', color: accentColor }}>New AI</Text>
          </TouchableOpacity>
        </ScrollView>
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
            placeholder={`Chat with ${selectedAgent.name}...`}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, marginLeft: 15 },
  agentSliderBox: { paddingHorizontal: 15, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#8884' },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 10, elevation: 1 },
  msgContainer: { maxWidth: '85%', marginBottom: 10 },
  msgBox: { padding: 12, borderRadius: 18, elevation: 1 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 15, borderTopWidth: 0.5, borderTopColor: '#8884' },
  input: { flex: 1, maxHeight: 100, fontSize: 16 }
});

export default ChatScreen;
