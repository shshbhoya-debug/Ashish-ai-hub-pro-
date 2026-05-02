import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Dimensions, Image, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ImageGenScreen = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('1:1');

  // Dummy Recent Images
  const recentImages = [1, 2, 3, 4]; 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Art Hub</Text>
        <View style={styles.tokenTag}>
          <Text style={styles.tokenText}>12 Tokens</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        
        {/* RECENT GALLERY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Recent Creations</Text>
          <TouchableOpacity><Text style={styles.viewAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
          {recentImages.map((i) => (
            <View key={i} style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={30} color="#CCC" />
            </View>
          ))}
          <TouchableOpacity style={styles.addNew}>
            <Ionicons name="add" size={24} color="#AF52DE" />
          </TouchableOpacity>
        </ScrollView>

        {/* INPUT BOX */}
        <View style={styles.card}>
          <Text style={styles.label}>Describe your imagination...</Text>
          <TextInput 
            style={styles.input}
            placeholder="A futuristic car on Mars, high detail, 8k..."
            multiline
            value={prompt}
            onChangeText={setPrompt}
          />
        </View>

        {/* ASPECT RATIO */}
        <Text style={[styles.sectionTitle, {marginLeft: 20, marginTop: 20}]}>Select Aspect Ratio</Text>
        <View style={styles.ratioRow}>
          {['1:1', '4:3', '16:9'].map((r) => (
            <TouchableOpacity 
              key={r} 
              style={[styles.ratioBtn, selectedRatio === r && styles.activeRatio]}
              onPress={() => setSelectedRatio(r)}
            >
              <Text style={[styles.ratioText, selectedRatio === r && styles.activeRatioText]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* FLOATING GENERATE BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>Generate Magic ✨</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  tokenTag: { backgroundColor: '#F3E5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tokenText: { color: '#AF52DE', fontWeight: 'bold', fontSize: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  viewAll: { color: '#AF52DE', fontSize: 12 },
  gallery: { paddingLeft: 20, marginTop: 15 },
  imagePlaceholder: { width: 100, height: 100, backgroundColor: '#EEE', borderRadius: 15, marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  addNew: { width: 100, height: 100, borderStyle: 'dashed', borderWidth: 2, borderColor: '#AF52DE', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 20, padding: 15, backgroundColor: '#FFF', borderRadius: 20, elevation: 5, shadowOpacity: 0.1 },
  label: { fontSize: 12, color: '#999', marginBottom: 10 },
  input: { fontSize: 16, color: '#333', minHeight: 80, textAlignVertical: 'top' },
  ratioRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 10 },
  ratioBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: '#F5F5F5', marginRight: 10 },
  activeRatio: { backgroundColor: '#AF52DE' },
  ratioText: { color: '#666', fontWeight: 'bold' },
  activeRatioText: { color: '#FFF' },
  footer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  generateBtn: { backgroundColor: '#AF52DE', width: '85%', padding: 18, borderRadius: 20, alignItems: 'center', elevation: 8 },
  generateText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default ImageGenScreen;
