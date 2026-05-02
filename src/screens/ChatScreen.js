import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- ANIMATED MESSAGE COMPONENT ---
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
      <Text style={styles.timeText}>Just now</Text>
    </Animated.View>
  );
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- HEADER WITH GLOW --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.pfp}>
            <Ionicons name="person" size={20} color="#007AFF" />
            <View style={styles.glowDot} />
          </View>
          <View style={{marginLeft: 12}}>
            <Text style={styles.headerTitle}>Ashish AI Hub Pro</Text>
            <Text style={styles.onlineTxt}>Active Agent</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.optBtn}>
          <Ionicons name="shield-checkmark" size={20} color="#B9F6CA" />
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
              <View style={styles.iconCircle}>
                <Ionicons name="flash" size={40} color="#007AFF" />
              </View>
              <Text style={styles.emptyTitle}>Powerful AI Dashboard</Text>
              <Text style={styles.emptySub}>Aapka personal assistant tayyar hai. Kuch bhi puchiye!</Text>
            </View>
          )}
        />

        {/* --- PREMIUM INPUT BAR --- */}
        <View style={styles.footer}>
          <View style={styles.inputCard}>
            <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="happy-outline" size={24} color="#546E7A" />
            </TouchableOpacity>
            <TextInput 
              style={styles.textInput} 
              placeholder="Message..." 
              placeholderTextColor="#90A4AE"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, {backgroundColor: input ? '#007AFF' : '#ECEFF1'}]}
              onPress={() => {
                if(input) {
                  setMessages([...messages, {role: 'user', content: input}]);
                  setInput('');
                }
              }}
            >
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
  header: { 
    height: 100, backgroundColor: '#007AFF', flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 35
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  pfp: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  glowDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50', position: 'absolute', right: 0, bottom: 0, borderWidth: 2, borderColor: '#007AFF' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  onlineTxt: { color: '#B9F6CA', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  
  empty: { flex: 1, alignItems: 'center', marginTop: 80 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#263238', marginTop: 20 },
  emptySub: { fontSize: 14, color: '#78909C', textAlign: 'center', paddingHorizontal: 50, marginTop: 10 },

  msgWrapper: { marginBottom: 15, maxWidth: '82%' },
  userWrapper: { alignSelf: 'flex-end' },
  aiWrapper: { alignSelf: 'flex-start' },
  bubble: { padding: 15, borderRadius: 24, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, elevation: 2 },
  userBubble: { backgroundColor: '#007AFF', borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#ECEFF1' },
  msgText: { fontSize: 16, lineHeight: 24 },
  timeText: { fontSize: 10, color: '#CFD8DC', marginTop: 5, marginLeft: 5 },

  footer: { padding: 15, backgroundColor: 'transparent' },
  inputCard: { 
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30, 
    padding: 6, alignItems: 'center', borderWidth: 1, borderColor: '#ECEFF1'
  },
  addBtn: { paddingHorizontal: 12 },
  textInput: { flex: 1, maxHeight: 100, fontSize: 16, color: '#37474F', paddingVertical: 8 },
  sendBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }
});

export default ChatScreen;
