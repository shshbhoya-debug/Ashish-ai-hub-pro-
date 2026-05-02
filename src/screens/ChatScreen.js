import React, { useState, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, 
  StatusBar, Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const renderMessage = ({ item }) => (
    <Animated.View style={[styles.msgWrapper, item.role === 'user' ? styles.userWrapper : styles.aiWrapper]}>
      <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.msgText, { color: item.role === 'user' ? '#fff' : '#1A1A1A' }]}>
          {item.content}
        </Text>
      </View>
      <Text style={styles.timeText}>Just now</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.profilePic}><Text style={styles.profileText}>A</Text></View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.headerTitle}>Ashish AI Hub</Text>
            <Text style={styles.headerStatus}>● Online</Text>
          </View>
        </View>
        <TouchableOpacity><Ionicons name="ellipsis-vertical" size={20} color="#fff" /></TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <FlatList 
          ref={scrollRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 20}}
          onContentSizeChange={() => scrollRef.current.scrollToEnd()}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Ionicons name="chatbubble-ellipses-outline" size={80} color="#D1E9FF" />
              <Text style={styles.emptyTitle}>Chalo shuru karte hain!</Text>
              <Text style={styles.emptySub}>Ashish AI Hub Pro aapki madad ke liye taiyar hai.</Text>
            </View>
          )}
        />

        {/* --- GLASS DESIGN INPUT --- */}
        <View style={styles.inputArea}>
          <View style={styles.glassInput}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Ask me something..." 
              placeholderTextColor="#90A4AE"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity 
              style={[styles.sendBtn, {backgroundColor: input ? '#007AFF' : '#CFD8DC'}]}
              onPress={() => {
                if(input) {
                  setMessages([...messages, {role: 'user', content: input}]);
                  setInput('');
                }
              }}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { 
    height: 90, backgroundColor: '#007AFF', flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 30
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  profileText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerStatus: { color: '#B9F6CA', fontSize: 11, fontWeight: '600' },
  
  empty: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#455A64', marginTop: 20 },
  emptySub: { fontSize: 14, color: '#90A4AE', textAlign: 'center', paddingHorizontal: 40, marginTop: 5 },

  msgWrapper: { marginBottom: 15, maxWidth: '85%' },
  userWrapper: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  aiWrapper: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { padding: 14, borderRadius: 22, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, elevation: 2 },
  userBubble: { backgroundColor: '#007AFF', borderBottomRightRadius: 2 },
  aiBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 2 },
  msgText: { fontSize: 16, lineHeight: 22 },
  timeText: { fontSize: 10, color: '#90A4AE', marginTop: 5 },

  inputArea: { padding: 15, backgroundColor: 'transparent' },
  glassInput: { 
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30, 
    padding: 8, alignItems: 'center', elevation: 4, shadowOpacity: 0.1
  },
  textInput: { flex: 1, paddingHorizontal: 15, fontSize: 16, color: '#263238' },
  sendBtn: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }
});

export default ChatScreen;
