import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const ArchitectScreen = ({ navigation }) => {
  const { isDarkMode, updateTokens, tokens } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCommand, setGeneratedCommand] = useState('');

  const handleBuild = () => {
    if (!prompt.trim()) return;
    if (tokens < 50) {
      Alert.alert("Low Tokens", "Full project architect ke liye 50 tokens chahiye.");
      return;
    }

    setLoading(true);
    
    // Yahan hum simulation kar rahe hain ki AI ne files generate kar di hain
    // Real integration mein yahan OpenRouter ko "JSON Project Map" ke liye call jayegi
    setTimeout(() => {
      setLoading(false);
      updateTokens(-50);
      
      // Ye ek example command hai jo poora folder structure banayegi
      const masterCommand = `mkdir -p my-new-app/src && cat << 'INNER' > my-new-app/index.html
<!DOCTYPE html>
<html><body><h1>App Built by Ashish AI</h1></body></html>
INNER`;
      
      setGeneratedCommand(masterCommand);
      Alert.alert("Architecture Ready!", "Aapka poora project structure generate ho gaya hai.");
    }, 3000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>AI Project Architect</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.infoBox}>
          <Ionicons name="flash" size={24} color="#FFD700" />
          <Text style={styles.infoText}>Ek prompt se poora folder structure aur code files banayein.</Text>
        </View>

        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]} 
          placeholder="e.g. Build a Portfolio Website with 3 pages and CSS..."
          placeholderTextColor="#888"
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        <TouchableOpacity style={styles.buildBtn} onPress={handleBuild} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : (
            <>
              <Ionicons name="hammer" size={20} color="#FFF" />
              <Text style={styles.buildText}> Generate Full Project (50 ⚡)</Text>
            </>
          )}
        </TouchableOpacity>

        {generatedCommand ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Master Terminal Command:</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{generatedCommand}</Text>
            </View>
            <Text style={styles.hint}>Ise terminal mein paste karein, saari files apne aap ban jayengi.</Text>
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
  infoBox: { flexDirection: 'row', backgroundColor: '#333', padding: 15, borderRadius: 15, marginBottom: 20, alignItems: 'center' },
  infoText: { color: '#FFF', marginLeft: 10, flex: 1, fontSize: 13 },
  input: { height: 120, borderRadius: 20, padding: 20, textAlignVertical: 'top', fontSize: 16, borderWidth: 1, borderColor: '#DDD' },
  buildBtn: { backgroundColor: '#FFD700', marginTop: 20, padding: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buildText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  resultContainer: { marginTop: 30 },
  resultLabel: { fontWeight: 'bold', marginBottom: 10, color: '#888' },
  codeBox: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 10 },
  codeText: { color: '#00FF00', fontFamily: 'monospace', fontSize: 12 },
  hint: { color: '#007AFF', fontSize: 12, marginTop: 10, fontStyle: 'italic' }
});

export default ArchitectScreen;
