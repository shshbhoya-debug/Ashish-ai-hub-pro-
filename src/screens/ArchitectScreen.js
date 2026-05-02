import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { callOpenRouter } from '../services/aiService';

const ArchitectScreen = ({ navigation }) => {
  const { isDarkMode, updateTokens, tokens, apiKey } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');

  const generateProject = async () => {
    if (!prompt.trim() || loading) return;
    if (!apiKey) {
      Alert.alert("API Key Missing", "Pehle Settings > Developer Mode mein OpenRouter Key dalo.");
      return;
    }
    if (tokens < 50) {
      Alert.alert("Low Tokens", "Full project ke liye 50 tokens chahiye.");
      return;
    }

    setLoading(true);
    
    // AI ko instruction dena ki wo sirf shell script return kare
    const systemPrompt = `You are a Senior Project Architect. 
    Based on the user prompt, generate a SINGLE bash script that:
    1. Creates a project folder.
    2. Uses 'cat << "EOF" > filename' to create every necessary file (HTML, CSS, JS, etc.) with FULL working code.
    3. Output ONLY the script. No explanations. No markdown blocks like \`\`\`bash. Start directly with 'mkdir'.`;

    try {
      const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;
      const script = await callOpenRouter(fullPrompt, apiKey, "google/gemini-2.0-flash-001");
      
      setGeneratedScript(script.replace(/\`\`\`bash/g, '').replace(/\`\`\`/g, '').trim());
      updateTokens(-50); // Real cost for full architecture
      Alert.alert("Architected! 🏗️", "Aapka poora project script ready hai.");
    } catch (e) {
      Alert.alert("Error", "AI respond nahi kar raha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>AI Project Architect</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Describe a website/app, and AI will write the FULL project files for you.</Text>
        </View>

        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]} 
          placeholder="e.g. Build a Food Delivery Landing page with 4 sections..."
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        <TouchableOpacity style={styles.buildBtn} onPress={generateProject} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buildText}>Architect Full Project (50 ⚡)</Text>}
        </TouchableOpacity>

        {generatedScript ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Run this in your Codespaces Terminal:</Text>
            <View style={styles.codeBox}>
              <ScrollView>
                <Text style={styles.codeText}>{generatedScript}</Text>
              </ScrollView>
            </View>
            <Text style={styles.hint}>Ise paste karte hi saari files apne aap ban jayengi.</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  infoBox: { backgroundColor: '#007AFF15', padding: 15, borderRadius: 15, marginBottom: 20 },
  infoText: { color: '#007AFF', fontSize: 13, fontWeight: '500' },
  input: { height: 120, borderRadius: 20, padding: 20, textAlignVertical: 'top', borderWidth: 1, borderColor: '#DDD' },
  buildBtn: { backgroundColor: '#FFD700', marginTop: 20, padding: 20, borderRadius: 20, alignItems: 'center', elevation: 5 },
  buildText: { fontWeight: 'bold', fontSize: 16 },
  resultContainer: { marginTop: 30 },
  resultLabel: { fontWeight: 'bold', marginBottom: 10, color: '#4CD964' },
  codeBox: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 15, maxHeight: 300 },
  codeText: { color: '#00FF00', fontFamily: 'monospace', fontSize: 11 },
  hint: { color: '#888', fontSize: 11, marginTop: 10, textAlign: 'center' }
});

export default ArchitectScreen;
