import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const ImageGenScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, tokens, updateTokens, apiKey } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImg, setGeneratedImg] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    if (!apiKey) {
      Alert.alert("API Key Missing", "Settings mein OpenRouter Key dalo bhai!");
      return;
    }
    if (tokens < 100) {
      Alert.alert("Low Tokens", "Image generation ke liye 100 tokens chahiye.");
      return;
    }

    setLoading(true);
    // Simulation for now as most OpenRouter Image models return via different streams
    // Real integration will use the generateAIImage service
    setTimeout(() => {
      setGeneratedImg(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`);
      updateTokens(-100, `Generated Image: ${prompt.substring(0, 15)}...`);
      setLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>AI Image Lab</Text>
        <View style={[styles.tokenBadge, { backgroundColor: accentColor + '20' }]}>
          <Text style={{ color: accentColor, fontWeight: 'bold' }}>⚡ {tokens}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={[styles.inputBox, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
          <TextInput 
            style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="Describe the image you want to create..."
            placeholderTextColor="#888"
            multiline
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity 
            style={[styles.genBtn, { backgroundColor: accentColor }]} 
            onPress={handleGenerate}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#FFF" /> : <Ionicons name="sparkles" size={20} color="#FFF" />}
          </TouchableOpacity>
        </View>

        {generatedImg ? (
          <View style={styles.imgContainer}>
            <Image source={{ uri: generatedImg }} style={styles.resultImg} />
            <TouchableOpacity style={styles.downloadBtn}>
              <Ionicons name="download-outline" size={24} color="#FFF" />
              <Text style={styles.downloadTxt}> Save to Gallery</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={80} color="#CCC" />
            <Text style={styles.placeholderTxt}>Aapka imagination yahan dikhega...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  tokenBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  inputBox: { flexDirection: 'row', borderRadius: 20, padding: 10, elevation: 3, alignItems: 'flex-end' },
  input: { flex: 1, padding: 10, minHeight: 60, fontSize: 16, textAlignVertical: 'top' },
  genBtn: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  imgContainer: { marginTop: 30, alignItems: 'center' },
  resultImg: { width: '100%', height: 350, borderRadius: 25, backgroundColor: '#EEE' },
  downloadBtn: { flexDirection: 'row', backgroundColor: '#333', marginTop: 20, padding: 15, borderRadius: 15, alignItems: 'center' },
  downloadTxt: { color: '#FFF', fontWeight: 'bold' },
  placeholder: { marginTop: 100, alignItems: 'center' },
  placeholderTxt: { color: '#888', marginTop: 15, fontSize: 14 }
});

export default ImageGenScreen;
