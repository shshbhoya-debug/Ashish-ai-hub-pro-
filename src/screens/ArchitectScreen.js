import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArchitectScreen = ({ navigation }) => {
  const { isDarkMode, updateTokens, tokens } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');

  const saveToHistory = async (name, script) => {
    try {
      const existing = await AsyncStorage.getItem('project_history');
      const history = existing ? JSON.parse(existing) : [];
      const newProject = {
        id: Date.now().toString(),
        name: name,
        date: new Date().toLocaleDateString(),
        script: script,
        prompt: prompt
      };
      await AsyncStorage.setItem('project_history', JSON.stringify([newProject, ...history]));
    } catch (e) { console.error(e); }
  };

  const generateProject = () => {
    if (!prompt.trim()) return;
    if (tokens < 50) {
      Alert.alert("Low Tokens", "50 tokens required.");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      updateTokens(-50, `Built Project: ${prompt.substring(0,15)}...`);
      
      const folderName = prompt.toLowerCase().replace(/\s+/g, '-').substring(0, 15);
      const script = `mkdir ${folderName} && cd ${folderName} && touch index.html style.css script.js && echo "Project Generated!"`;
      
      setGeneratedScript(script);
      await saveToHistory(prompt.substring(0, 20), script);
      Alert.alert("Project Built!", "Code is now saved in History.");
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>AI Architect</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}><Ionicons name="list" size={24} color="#007AFF" /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]} 
          placeholder="What do you want to build? (Full Project)"
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />
        <TouchableOpacity style={styles.buildBtn} onPress={generateProject}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buildText}>Build My Project (50 ⚡)</Text>}
        </TouchableOpacity>

        {generatedScript ? (
          <View style={styles.resultContainer}>
            <Text style={{color: '#007AFF', fontWeight: 'bold'}}>Terminal Command Ready:</Text>
            <View style={styles.codeBox}><Text style={styles.codeText}>{generatedScript}</Text></View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  input: { height: 150, borderRadius: 20, padding: 20, textAlignVertical: 'top', borderWidth: 1, borderColor: '#DDD' },
  buildBtn: { backgroundColor: '#FFD700', marginTop: 20, padding: 20, borderRadius: 20, alignItems: 'center' },
  buildText: { fontWeight: 'bold', fontSize: 16 },
  resultContainer: { marginTop: 30 },
  codeBox: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 15, marginTop: 10 },
  codeText: { color: '#00FF00', fontFamily: 'monospace', fontSize: 12 }
});

export default ArchitectScreen;
