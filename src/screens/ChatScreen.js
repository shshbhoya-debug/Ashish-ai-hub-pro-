import React, { useState, useRef, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedMessage = ({ item }) => {
  const slideAnim = useRef(new Animated.Value(20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.msgWrapper, 
      item.role === 'user' ? styles.userWrapper : styles.aiWrapper,
      { opacity: opacityAnim, transform: [{ translateY: slideAnim }] }
    ]}>
      <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.msgText, { color: item.role === 'user' ? '#fff' : '#1A1A1A' }]}>
          {item.content}
        </Text>
      </View>
    </Animated.View>
  );
};

const ChatScreen = ({ navigation }) => {
  const { tokens, isDarkMode } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  // Load chat history on start
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const savedChat = await AsyncStorage.getItem('chat_history');
      if (savedChat !== null) {
        setMessages(JSON.parse(savedChat));
      }
    } catch (e) {
      console.error("Failed to load chat", e);
    }
  };

  const saveChat = async (newMessages) => {
    try {
      await AsyncStorage.setItem('chat_history', JSON.stringify(newMessages));
    } catch (e) {
      console.error("Failed to save chat", e);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, newMsg];
    
    setMessages(updatedMessages);
    saveChat(updatedMessages); // Save to storage
    setInput('');

    // Simulated AI Reply
    setTimeout(() => {
      const aiReply = { role: 'ai', content: "Ye message history mein save ho gaya hai! Aap app band karke check kar sakte hain. ✨" };
      const withAiReply = [...updatedMessages, aiReply];
      setMessages(withAiReply);
      saveChat(withAiReply);
    }, 1000);
  };

  const clearChat = () => {
    Alert.alert("Clear Chat?", "Kya aap saari baatcheet delete karna chahte hain?", [
      { text: "No" },
      { text: "Yes", onPress: async () => {
          setMessages([]);
          await AsyncStorage.removeItem('chat_history');
      }}
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTitle}>AI Chat Memory</Text>
          <Text style={styles.tokenCount}>⚡ {tokens} Tokens Available</Text>
        </View>
        <TouchableOpacity onPress={clearChat}>
          <Ionicons name="trash-outline" size={22} color="#FFCDD2" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <FlatList 
          ref={scrollRef}
          data={messages}
          renderItem={({item}) => <AnimatedMessage item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 20}}
          onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>Chat History is Empty</Text>
              <Text style={styles.emptySub}>Yahan jo bhi baatcheet hogi, wo save rahegi.</Text>
            </View>
          )}
        />
        <View style={[styles.footer, { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' }]}>
          <View style={[styles.inputCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', borderColor: isDarkMode ? '#333' : '#ECEFF1' }]}>
            <TextInput 
              style={[styles.textInput, { color: isDarkMode ? '#FFF' : '#000' }]} 
              placeholder="Message..." 
              placeholderTextColor="#999"
              value={input} 
              onChangeText={setInput} 
            />
            <TouchableOpacity style={[styles.sendBtn, {backgroundColor: input ? '#007AFF' : '#ECEFF1'}]} onPress={handleSend}>
              <Ionicons name="arrow-up" size={22} color={input ? "#fff" : "#B0BEC5"} />
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
  tokenCount: { color: '#B9F6CA', fontSize: 11, fontWeight: 'bold' },
  empty: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#90A4AE' },
  emptySub: { fontSize: 14, color: '#B0BEC5', marginTop: 10 },
  msgWrapper: { marginBottom: 15, maxWidth: '82%' },
  userWrapper: { alignSelf: 'flex-end' },
  aiWrapper: { alignSelf: 'flex-start' },
  bubble: { padding: 15, borderRadius: 24 },
  userBubble: { backgroundColor: '#007AFF' },
  aiBubble: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#ECEFF1' },
  msgText: { fontSize: 16 },
  footer: { padding: 15 },
  inputCard: { flexDirection: 'row', borderRadius: 30, padding: 6, alignItems: 'center', borderWidth: 1 },
  textInput: { flex: 1, paddingHorizontal: 15, fontSize: 16 },
  sendBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }
});

export default ChatScreen;
