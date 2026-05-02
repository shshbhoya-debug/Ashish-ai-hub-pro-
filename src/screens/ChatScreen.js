import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, FlatList, KeyboardAvoidingView, Platform, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Standard Expo Icons

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const renderMessage = ({ item }) => (
    <View style={[styles.msgWrapper, item.role === 'user' ? styles.userWrapper : styles.aiWrapper]}>
      <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.msgText, { color: item.role === 'user' ? '#fff' : '#1A1A1A' }]}>
          {item.content}
        </Text>
      </View>
      <Text style={styles.timeText}>1:41 PM</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* --- MODERN HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Ashish AI Pro</Text>
          <View style={styles.statusRow}>
            <View style={styles.dot} /><Text style={styles.statusText}>Active Now</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <FlatList 
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 20}}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="sparkles" size={60} color="#E3F2FD" />
              <Text style={styles.welcomeTxt}>Hello Ashish!</Text>
              <Text style={styles.subTxt}>Main aapki kaise madad kar sakta hoon?</Text>
            </View>
          )}
        />

        {/* --- SMART INPUT AREA --- */}
        <View style={styles.inputContainer}>
          <View style={styles.innerInput}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TextInput 
              style={styles.textInput} 
              placeholder="Ask anything..." 
              placeholderTextColor="#999"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity 
              style={[styles.sendCircle, { backgroundColor: input ? '#007AFF' : '#B0BEC5' }]} 
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
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { 
    height: 80, backgroundColor: '#007AFF', flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15,
    paddingTop: 10, elevation: 5
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50', marginRight: 5 },
  statusText: { color: '#E3F2FD', fontSize: 11 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 100 },
  welcomeTxt: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginTop: 15 },
  subTxt: { fontSize: 14, color: '#78909C', marginTop: 5 },
  msgWrapper: { marginBottom: 15, maxWidth: '80%' },
  userWrapper: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  aiWrapper: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { padding: 14, borderRadius: 20, elevation: 1 },
  userBubble: { backgroundColor: '#007AFF', borderBottomRightRadius: 2 },
  aiBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 2 },
  msgText: { fontSize: 15, lineHeight: 22 },
  timeText: { fontSize: 10, color: '#90A4AE', marginTop: 4 },
  inputContainer: { padding: 15, backgroundColor: 'transparent' },
  innerInput: { 
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30, 
    alignItems: 'center', paddingHorizontal: 10, height: 55,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
  },
  textInput: { flex: 1, height: '100%', color: '#000', fontSize: 16, paddingHorizontal: 10 },
  sendCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  actionBtn: { padding: 5 }
});

export default ChatScreen;
