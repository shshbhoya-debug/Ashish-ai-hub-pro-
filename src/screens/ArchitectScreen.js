import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Alert, ActivityIndicator, Share 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { callOpenRouter } from '../services/aiService';

const templates = [
  { id: '1', title: 'Snake Game', icon: 'game-controller', prompt: 'Build a classic Snake Game using HTML, CSS, and Vanilla JavaScript with a neon theme.' },
  { id: '2', title: 'Portfolio Web', icon: 'person', prompt: 'Create a professional responsive portfolio website with Home, About, and Contact sections using HTML/Tailwind CSS.' },
  { id: '3', title: 'To-Do App', icon: 'list', prompt: 'Build a full-featured To-Do List application with local storage persistence using React/JavaScript.' },
  { id: '4', title: 'Coffee Shop', icon: 'cafe', prompt: 'Design a premium Coffee Shop landing page with a menu, hero section, and booking form using HTML and modern CSS.' },
  { id: '5', title: 'Weather App', icon: 'cloud-sunny', prompt: 'Create a Weather Dashboard that fetches real-time data from an API and displays it with dynamic icons.' },
  { id: '6', title: 'Admin Dash', icon: 'grid', prompt: 'Build a professional Admin Dashboard layout with a sidebar, charts, and data tables using HTML/CSS.' },
];

const ArchitectScreen = ({ navigation }) => {
  const { isDarkMode, updateTokens, tokens, apiKey } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: generatedScript,
        title: 'Project Script from Ashish AI Hub Pro',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const generateProject = async (customPrompt = prompt) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim() || loading) return;
    if (!apiKey) {
      Alert.alert("API Key Missing", "Settings mein OpenRouter Key dalo!");
      return;
    }
    if (tokens < 50) {
      Alert.alert("Low Tokens", "50 tokens chahiye architect karne ke liye.");
      return;
    }

    setLoading(true);
    const systemPrompt = "You are a Senior Project Architect. Generate a SINGLE bash script that creates a folder and all files with full working code. Output ONLY the script text.";

    try {
      const script = await callOpenRouter(`${systemPrompt}\n\nRequest: ${finalPrompt}`, apiKey);
      setGeneratedScript(script.replace(/\`\`\`bash/g, '').replace(/\`\`\`/g, '').trim());
      updateTokens(-50, `Architected: ${finalPrompt.substring(0, 15)}...`);
    } catch (e) {
      Alert.alert("Error", "AI respond nahi kar raha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>AI Project Architect</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>Templates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templateRow}>
          {templates.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.templateCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}
              onPress={() => { setPrompt(item.prompt); generateProject(item.prompt); }}
            >
              <View style={styles.iconCircle}><Ionicons name={item.icon} size={24} color="#007AFF" /></View>
              <Text style={[styles.templateTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]} 
          placeholder="Describe custom project..."
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        <TouchableOpacity style={styles.buildBtn} onPress={() => generateProject()} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buildText}>Architect Now (50 ⚡)</Text>}
        </TouchableOpacity>

        {generatedScript ? (
          <View style={styles.resultArea}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultLabel}>Script Ready</Text>
              <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
                <Ionicons name="share-social" size={20} color="#007AFF" />
                <Text style={styles.shareTxt}> Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.codeBox}><Text style={styles.codeText}>{generatedScript}</Text></View>
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
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  templateRow: { marginBottom: 20 },
  templateCard: { width: 110, padding: 15, borderRadius: 20, marginRight: 12, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#007AFF15', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  templateTitle: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  input: { height: 100, borderRadius: 20, padding: 20, textAlignVertical: 'top', borderWidth: 1, borderColor: '#DDD' },
  buildBtn: { backgroundColor: '#FFD700', marginTop: 20, padding: 20, borderRadius: 20, alignItems: 'center' },
  buildText: { fontWeight: 'bold', fontSize: 16 },
  resultArea: { marginTop: 30 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  resultLabel: { fontWeight: 'bold', color: '#4CD964' },
  shareBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF15', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  shareTxt: { color: '#007AFF', fontWeight: 'bold', fontSize: 14 },
  codeBox: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 15 },
  codeText: { color: '#00FF00', fontFamily: 'monospace', fontSize: 11 }
});

export default ArchitectScreen;
