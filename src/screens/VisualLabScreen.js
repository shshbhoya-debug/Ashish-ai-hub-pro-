import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { AppContext } from '../context/AppContext';

const modes = ['Sticker', 'PNG / Image'];
const stylesArr = ['Realistic', 'Cartoon', 'Cyberpunk', 'Sketch', '3D Isometric'];

const VisualLabScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, updateTokens, tokens } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [activeStyle, setActiveStyle] = useState(stylesArr[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateVisual = async () => {
    if (!prompt.trim() || loading) return;
    if (tokens < 20) {
      Alert.alert("Low Tokens", "You need 20 tokens for this high-quality render.");
      return;
    }

    setLoading(true);
    setResult(null);

    // Prompt Engineering based on Mode
    let finalPrompt = '';
    if (activeMode === 'Sticker') {
      finalPrompt = `Die-cut sticker of ${prompt}, ${activeStyle} style, thick white border, clean sharp edges, isolated on white background, vector quality.`;
    } else {
      finalPrompt = `Professional high-quality ${activeStyle} image of ${prompt}, sharp focus, 8k resolution, minimalist clean background, studio lighting.`;
    }
    
    const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?nologo=true&seed=${Date.now()}`;

    try {
      setResult(apiUrl);
      updateTokens(-20, `Visual Lab: ${activeMode}`);
    } catch (e) {
      Alert.alert("Error", "Visual engine is busy. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveToPhone = async () => {
    if (!result) return;
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission", "Need gallery access to save.");
      return;
    }
    try {
      const fileUri = `${FileSystem.documentDirectory}visual_${Date.now()}.png`;
      const downloaded = await FileSystem.downloadAsync(result, fileUri);
      await MediaLibrary.saveToLibraryAsync(downloaded.uri);
      Alert.alert("Saved! ✨", "Check your gallery for the result.");
    } catch (e) {
      Alert.alert("Error", "Could not save image.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>AI Visual Lab</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Mode Selector */}
        <View style={styles.modeToggle}>
          {modes.map(m => (
            <TouchableOpacity 
              key={m} 
              onPress={() => setActiveMode(m)} 
              style={[styles.modeBtn, { backgroundColor: activeMode === m ? accentColor : 'transparent' }]}
            >
              <Text style={{ color: activeMode === m ? '#FFF' : '#888', fontWeight: 'bold' }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
          placeholder={`Describe your ${activeMode.toLowerCase()}...`}
          placeholderTextColor="#888"
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        <Text style={styles.label}>CHOOSE STYLE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {stylesArr.map(s => (
            <TouchableOpacity 
              key={s} 
              onPress={() => setActiveStyle(s)} 
              style={[styles.styleChip, { borderColor: activeStyle === s ? accentColor : '#8882', backgroundColor: activeStyle === s ? accentColor + '15' : 'transparent' }]}
            >
              <Text style={{ color: activeStyle === s ? accentColor : '#888', fontSize: 13 }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={[styles.mainBtn, { backgroundColor: accentColor }]} onPress={generateVisual} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnTxt}>Generate {activeMode} (20 ⚡)</Text>}
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <Image source={{ uri: result }} style={styles.image} resizeMode="contain" />
            <TouchableOpacity style={styles.saveBtn} onPress={saveToPhone}>
              <Ionicons name="download-outline" size={20} color={accentColor} />
              <Text style={[styles.saveTxt, { color: accentColor }]}>Save to Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40, justifyContent: 'space-between' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  modeToggle: { flexDirection: 'row', backgroundColor: '#8882', borderRadius: 15, padding: 5, marginBottom: 20 },
  modeBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  input: { padding: 18, borderRadius: 20, fontSize: 16, height: 100, textAlignVertical: 'top' },
  label: { fontSize: 11, fontWeight: 'bold', color: '#888', marginVertical: 10, letterSpacing: 1 },
  styleChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  mainBtn: { padding: 18, borderRadius: 20, alignItems: 'center', elevation: 3 },
  btnTxt: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 30, alignItems: 'center' },
  image: { width: '100%', height: 300, borderRadius: 20, backgroundColor: '#0001' },
  saveBtn: { flexDirection: 'row', marginTop: 15, alignItems: 'center' },
  saveTxt: { marginLeft: 8, fontWeight: 'bold' }
});

export default VisualLabScreen;
