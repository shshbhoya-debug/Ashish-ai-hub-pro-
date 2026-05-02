import React, { useState, useRef, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const AnimatedMessage = ({ item }) => {
  const slideAnim = useRef(new Animated.Value(20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
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
  const { tokens } = useContext(AppContext); // Tokens sirf dikhane ke liye
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;
    
    // AB YE FREE HAI: No updateTokens(-1)
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // AI ka dummy reply (Design check ke liye)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Ye message bilkul free hai! Ashish AI Pro basic chat ke paise nahi leta. ✨" }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTitle}>Free AI Chat</Text>
          <Text style={styles.tokenCount}>⚡ {tokens} Tokens Available</Text>
        </View>
        <View style={{width: 24}} />
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
              <Text style={styles.emptyTitle}>Unlimited Free Chat! 🚀</Text>
              <Text style={styles.emptySub}>Puchiye jo puchna hai, koi token nahi lagega.</Text>
            </View>
          )}
        />
        <View style={styles.footer}>
          <View style={styles.inputCard}>
            <TextInput style={styles.textInput} placeholder="Message..." value={input} onChangeText={setInput} />
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
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { height: 100, backgroundColor: '#007AFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 35 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tokenCount: { color: '#B9F6CA', fontSize: 11, fontWeight: 'bold' },
  empty: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#263238' },
  emptySub: { fontSize: 14, color: '#90A4AE', marginTop: 10 },
  msgWrapper: { marginBottom: 15, maxWidth: '82%' },
  userWrapper: { alignSelf: 'flex-end' },
  aiWrapper: { alignSelf: 'flex-start' },
  bubble: { padding: 15, borderRadius: 24 },
  userBubble: { backgroundColor: '#007AFF' },
  aiBubble: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ECEFF1' },
  msgText: { fontSize: 16 },
  footer: { padding: 15 },
  inputCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30, padding: 6, alignItems: 'center', borderWidth: 1, borderColor: '#ECEFF1' },
  textInput: { flex: 1, paddingHorizontal: 15, fontSize: 16 },
  sendBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }
});

export default ChatScreen;
