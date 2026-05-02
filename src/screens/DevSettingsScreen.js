import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const DevSettingsScreen = ({ navigation }) => {
  const { isDarkMode, apiKey, ghToken, saveDevKeys } = useContext(AppContext);
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempToken, setTempToken] = useState(ghToken);

  const handleSave = () => {
    saveDevKeys(tempKey, tempToken);
    Alert.alert("Success", "Keys safely encrypted and saved.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Developer Mode</Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color="#4CD964" />
          <Text style={styles.infoText}>Aapki keys local storage mein encrypted rehti hain.</Text>
        </View>

        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>OpenRouter API Key</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]} 
          secureTextEntry 
          value={tempKey}
          onChangeText={setTempKey}
          placeholder="sk-or-v1-..."
        />

        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555', marginTop: 20 }]}>GitHub Personal Token</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]} 
          secureTextEntry 
          value={tempToken}
          onChangeText={setTempToken}
          placeholder="ghp_..."
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Configuration</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  infoBox: { flexDirection: 'row', backgroundColor: '#E8F5E9', padding: 15, borderRadius: 12, marginBottom: 25, alignItems: 'center' },
  infoText: { color: '#2E7D32', fontSize: 12, marginLeft: 10 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', fontFamily: 'monospace' },
  saveBtn: { backgroundColor: '#007AFF', padding: 20, borderRadius: 15, marginTop: 40, alignItems: 'center' },
  saveBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default DevSettingsScreen;
