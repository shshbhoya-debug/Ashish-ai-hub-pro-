import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const ImageGenScreen = ({ navigation }) => {
  const { tokens, updateTokens } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    // Premium Check: 5 Tokens zaroori hain
    if (tokens < 5) {
      Alert.alert("Low Tokens", "Image banane ke liye 5 tokens chahiye. Recharge karein?", [
        { text: "Cancel" },
        { text: "Recharge", onPress: () => navigation.navigate('WalletScreen') }
      ]);
      return;
    }

    // Deduct 5 Tokens
    updateTokens(-5);
    Alert.alert("Success", "5 Tokens deducted! Generating your masterpiece...");
    setPrompt('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="close" size={28} /></TouchableOpacity>
        <Text style={styles.headerTitle}>AI Art (Premium)</Text>
        <Text style={styles.tokenTxt}>⚡ {tokens}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.costTag}>Cost: 5 Tokens per Image</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Describe your art..." 
          multiline 
          value={prompt}
          onChangeText={setPrompt}
        />
        <TouchableOpacity style={styles.genBtn} onPress={handleGenerate}>
          <Text style={styles.genText}>Generate Magic ✨</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  tokenTxt: { color: '#AF52DE', fontWeight: 'bold' },
  content: { padding: 20 },
  costTag: { alignSelf: 'center', backgroundColor: '#F3E5F5', color: '#AF52DE', padding: 5, borderRadius: 10, fontSize: 12, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 15, padding: 15, height: 120, textAlignVertical: 'top' },
  genBtn: { backgroundColor: '#AF52DE', marginTop: 30, padding: 18, borderRadius: 20, alignItems: 'center' },
  genText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default ImageGenScreen;
