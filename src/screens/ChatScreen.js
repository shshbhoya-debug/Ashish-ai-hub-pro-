import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView
} from 'react-native';

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  // Jab Send button dabega
  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    // User ka message add karna
    const newMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInputText('');
    
    // Abhi ke liye fake AI response (Baad mein yahan API lagayenge)
    setTimeout(() => {
      const aiMsg = { id: (Date.now() + 1).toString(), text: "Hello! Main Ashish AI hoon. Abhi main UI mode mein hoon, API lagna baaki hai. ✨", sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Chat</Text>
          <Text style={styles.status}>🟢 Online - Ready</Text>
        </View>

        {/* Chat Body */}
        <ScrollView style={styles.chatBody} contentContainerStyle={{ paddingBottom: 20 }}>
          {messages.length === 0 ? (
            // Empty State (Jab koi chat na ho)
            <View style={styles.emptyChat}>
              <Text style={styles.icon}>✨</Text>
              <Text style={styles.emptyTitle}>Ashish AI Hub Pro</Text>
              <Text style={styles.emptyDesc}>Kuch bhi pucho ya code likhwao!</Text>
              
              <TouchableOpacity style={styles.quickPrompt} onPress={() => setInputText("React Native kaise seekhein?")}>
                <Text style={styles.promptText}>👉 React Native kaise seekhein?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickPrompt} onPress={() => setInputText("Ek short story likho")}>
                <Text style={styles.promptText}>👉 Ek short story likho</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Message List
            messages.map((msg) => (
              <View key={msg.id} style={[styles.msgRow, msg.sender === 'user' ? styles.userRow : styles.aiRow]}>
                {msg.sender === 'ai' && <View style={styles.aiAvatar}><Text>🤖</Text></View>}
                <View style={[styles.bubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
                  <Text style={[styles.bubbleText, msg.sender === 'user' ? styles.userText : styles.aiText]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Chat Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Ask something..."
              placeholderTextColor="#9B9B9B"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, inputText.trim() === '' ? styles.sendBtnDisabled : null]} 
              onPress={sendMessage}
              disabled={inputText.trim() === ''}
            >
              <Text style={styles.sendIcon}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  status: {
    fontSize: 12,
    color: '#10A37F',
    marginTop: 4,
  },
  chatBody: {
    flex: 1,
    padding: 20,
  },
  emptyChat: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 20,
  },
  quickPrompt: {
    width: '100%',
    padding: 12,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 13,
    color: '#1F1F1F',
  },
  msgRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7F7F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: '#10A37F',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#F7F7F8',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#1F1F1F',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 14,
    color: '#1F1F1F',
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#10A37F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginBottom: 2,
  },
  sendBtnDisabled: {
    backgroundColor: '#A0D8C9',
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
