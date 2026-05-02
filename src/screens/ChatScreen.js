import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const QuickChips = ["🎨 Create Art", "✍️ Write Blog", "💡 Idea Gen", "🧠 Summarize"];

  return (
    <SafeAreaView style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarTxt}>A</Text></View>
        <View>
          <Text style={styles.headerTitle}>Ashish AI Hub Pro</Text>
          <Text style={styles.headerSub}>Design Mode Active</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        {messages.length === 0 ? (
          <View style={styles.emptyWrap}>
            <View style={styles.logo}><Text style={{fontSize: 40}}>⚡</Text></View>
            <Text style={styles.welcome}>Welcome, Ashish!</Text>
            <View style={styles.chipBox}>
              {QuickChips.map((c, i) => (
                <TouchableOpacity key={i} style={styles.chip}><Text style={styles.chipTxt}>{c}</Text></TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <FlatList 
            data={messages}
            renderItem={({item}) => (
              <View style={[styles.msg, item.role === 'user' ? styles.user : styles.ai]}>
                <Text style={{color: item.role === 'user' ? '#fff' : '#000'}}>{item.content}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{padding: 20}}
          />
        )}

        {/* Input Design */}
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            placeholder="Kaya design karein aaj?" 
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.send} onPress={() => {
            if(input) setMessages([...messages, {role: 'user', content: input}]);
            setInput('');
          }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarTxt: { color: '#fff', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerSub: { fontSize: 12, color: '#4CD964' },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0F7FF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  chipBox: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  chip: { padding: 10, backgroundColor: '#F2F2F7', borderRadius: 20, margin: 5, borderWidth: 1, borderColor: '#ddd' },
  chipTxt: { fontSize: 13, color: '#333' },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, backgroundColor: '#F2F2F7', paddingHorizontal: 20, borderRadius: 25, height: 45 },
  send: { marginLeft: 10, backgroundColor: '#007AFF', paddingHorizontal: 20, borderRadius: 25, justifyContent: 'center' },
  msg: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  user: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  ai: { alignSelf: 'flex-start', backgroundColor: '#F2F2F7' }
});

export default ChatScreen;
