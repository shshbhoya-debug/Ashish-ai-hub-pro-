import React, { useState, useRef, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated, ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const aiTools = [
  { id: 'gen', name: 'General AI', icon: 'chatbubble-ellipses', color: '#007AFF', desc: 'Everyday assistant' },
  { id: 'code', name: 'Code Architect', icon: 'code-slash', color: '#AF52DE', desc: 'Full project expert' },
  { id: 'art', name: 'Prompt Guru', icon: 'color-palette', color: '#FF9500', desc: 'Image generation' },
  { id: 'py', name: 'Python Master', icon: 'logo-python', color: '#34C759', desc: 'Scripting & Data' },
  { id: 'biz', name: 'Biz Strategy', icon: 'briefcase', color: '#5856D6', desc: 'Startup & Business' },
  { id: 'write', name: 'Content Pro', icon: 'pencil', color: '#FF2D55', desc: 'Blogs & Essays' },
  { id: 'math', name: 'Math Solver', icon: 'calculator', color: '#FFCC00', desc: 'Equations & Logic' },
  { id: 'law', name: 'Legal Aide', icon: 'document-text', color: '#8E8E93', desc: 'Documents & Advice' },
  { id: 'fit', name: 'Health Coach', icon: 'heart', color: '#FF3B30', desc: 'Fitness & Health' },
];

const ChatScreen = ({ navigation }) => {
  const { tokens, isDarkMode } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedTool, setSelectedTool] = useState(aiTools[0]);
  const scrollRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI Reply based on selected tool
    setTimeout(() => {
      const aiMsg = { 
        role: 'ai', 
        content: `Namaste! Main aapka ${selectedTool.name} assistant hoon. Main aapki help karne ke liye taiyar hoon.` 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F2F2F7' }]}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTitle}>AI Hub Pro</Text>
          <Text style={styles.activeTool}>Active: {selectedTool.name}</Text>
        </View>
        <Text style={styles.tokenTxt}>⚡ {tokens}</Text>
      </View>

      {/* 9 TOOLS SELECTOR */}
      <View style={{ height: 100, paddingVertical: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
          {aiTools.map((tool) => (
            <TouchableOpacity 
              key={tool.id} 
              style={[
                styles.toolBtn, 
                { backgroundColor: selectedTool.id === tool.id ? tool.color : (isDarkMode ? '#1F1F1F' : '#FFF') }
              ]}
              onPress={() => setSelectedTool(tool)}
            >
              <Ionicons name={tool.icon} size={22} color={selectedTool.id === tool.id ? '#FFF' : tool.color} />
              <Text style={[styles.toolName, { color: selectedTool.id === tool.id ? '#FFF' : (isDarkMode ? '#AAA' : '#555') }]}>
                {tool.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        ref={scrollRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={{color: item.role === 'user' ? '#FFF' : '#000'}}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[styles.footer, { backgroundColor: isDarkMode ? '#121212' : '#FFF' }]}>
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#F0F0F5', color: isDarkMode ? '#FFF' : '#000' }]} 
              placeholder={`Ask ${selectedTool.name}...`}
              placeholderTextColor="#888"
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
  header: { height: 110, backgroundColor: '#1A1A1A', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 40 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  activeTool: { color: '#B9F6CA', fontSize: 11, fontWeight: 'bold' },
  tokenTxt: { color: '#FFD700', fontWeight: 'bold' },
  toolBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, marginRight: 10, alignItems: 'center', justifyContent: 'center', height: 75, width: 90, elevation: 2 },
  toolName: { fontSize: 10, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  bubble: { padding: 15, borderRadius: 20, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  footer: { padding: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, height: 45, borderRadius: 23, paddingHorizontal: 20, fontSize: 16 },
  sendBtn: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }
});

export default ChatScreen;
