import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Dimensions, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ratioCardWidth = (width - 60) / 3;

const ImageGenScreen = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('1:1');

  const ratios = [
    { id: 1, ratio: '1:1', icon: 'square-outline', label: 'Square' },
    { id: 2, ratio: '16:9', icon: 'tablet-landscape-outline', label: 'Landscape' },
    { id: 3, ratio: '9:16', icon: 'tablet-portrait-outline', label: 'Portrait' },
  ];

  const stylesList = ["Realistic", "Cartoon", "Anime", "Cyberpunk", "Pixel Art"];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Art Generator</Text>
        <TouchableOpacity style={styles.creditBtn}>
          <Text style={styles.creditText}>5 ⚡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- PROMPT INPUT --- */}
        <Text style={styles.sectionTitle}>Image Description</Text>
        <View style={styles.inputCard}>
          <TextInput 
            style={styles.textInput} 
            placeholder="Describe the image you want (e.g., 'A golden retriever riding a rocket in space')"
            placeholderTextColor="#999"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* --- ASPECT RATIO SELECTOR --- */}
        <Text style={styles.sectionTitle}>Image Size (Aspect Ratio)</Text>
        <View style={styles.grid}>
          {ratios.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.ratioCard, 
                selectedRatio === item.ratio && styles.selectedRatioCard
              ]}
              onPress={() => setSelectedRatio(item.ratio)}
            >
              <Ionicons 
                name={item.icon} 
                size={24} 
                color={selectedRatio === item.ratio ? '#007AFF' : '#666'} 
              />
              <Text style={[
                styles.ratioText,
                selectedRatio === item.ratio && styles.selectedRatioText
              ]}>
                {item.ratio}
              </Text>
              <Text style={styles.ratioLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- STYLE SELECTOR (Chips) --- */}
        <Text style={styles.sectionTitle}>Choose Style (Optional)</Text>
        <View style={styles.chipContainer}>
          {stylesList.map((item, index) => (
            <TouchableOpacity key={index} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- RESULT PLACEHOLDER --- */}
        <View style={styles.resultCard}>
          <Ionicons name="color-palette-outline" size={60} color="#E0E0E0" />
          <Text style={styles.resultLabel}>Generated image will appear here...</Text>
        </View>

      </ScrollView>

      {/* --- GENERATE BUTTON --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.genBtn}>
          <Ionicons name="sparkles" size={20} color="#fff" />
          <Text style={styles.genText}>Generate Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { 
    height: 60, backgroundColor: '#fff', flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15,
    borderBottomWidth: 1, borderBottomColor: '#EEE', elevation: 2
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  creditBtn: { backgroundColor: '#F0F7FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  creditText: { color: '#007AFF', fontWeight: 'bold', fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginTop: 25, marginBottom: 15 },
  inputCard: { backgroundColor: '#fff', borderRadius: 18, padding: 15, elevation: 2 },
  textInput: { fontSize: 15, color: '#333', minHeight: 120 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  ratioCard: { 
    backgroundColor: '#fff', width: ratioCardWidth, borderRadius: 18, 
    padding: 20, alignItems: 'center', borderWidth: 2, borderColor: '#EEE', elevation: 2
  },
  selectedRatioCard: { borderColor: '#007AFF', backgroundColor: '#F0F7FF' },
  ratioText: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginTop: 10 },
  selectedRatioText: { color: '#007AFF' },
  ratioLabel: { fontSize: 11, color: '#888', marginTop: 4 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  chip: { backgroundColor: '#F2F2F7', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, margin: 5, borderWidth: 1, borderColor: '#ddd' },
  chipText: { color: '#3A3A3C', fontSize: 13, fontWeight: '500' },
  resultCard: { 
    backgroundColor: '#fff', borderRadius: 18, minHeight: 300, 
    justifyContent: 'center', alignItems: 'center', marginTop: 25,
    borderWidth: 2, borderColor: '#E0E0E0', borderStyle: 'dashed' 
  },
  resultLabel: { color: '#999', fontSize: 14, marginTop: 15 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'transparent' },
  genBtn: { backgroundColor: '#AF52DE', paddingVertical: 15, borderRadius: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  genText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});

export default ImageGenScreen;
