import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';

const colors = ['#007AFF', '#FF3B30', '#34C759', '#AF52DE', '#FF9500', '#FF2D55'];
const icons = ['person', 'briefcase', 'fitness', 'school', 'rocket', 'heart', 'headset', 'medical'];

const CreateAgentScreen = ({ navigation }) => {
  const { isDarkMode, accentColor } = useContext(AppContext);
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  const saveAgent = async () => {
    if (!name.trim() || !prompt.trim()) {
      Alert.alert("Incomplete", "Agent ka naam aur uski personality (prompt) dono likhna zaroori hai.");
      return;
    }

    const newAgent = {
      id: 'custom_' + Date.now(),
      name,
      prompt,
      color: selectedColor,
      icon: selectedIcon,
      isCustom: true
    };

    try {
      const existing = await AsyncStorage.getItem('@custom_agents');
      let agentsArr = existing ? JSON.parse(existing) : [];
      agentsArr.push(newAgent);
      await AsyncStorage.setItem('@custom_agents', JSON.stringify(agentsArr));
      
      Alert.alert("Agent Created! 🚀", `${name} is now ready to assist you.`, [
        { text: "Start Chatting", onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      console.log("Save error:", e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Build Your AI</Text>
        <View style={{ width: 28 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          
          <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>AI AGENT NAME</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="e.g., Gym Coach Max"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            maxLength={20}
          />

          <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>PERSONALITY & RULES (PROMPT)</Text>
          <TextInput 
            style={[styles.input, styles.textArea, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="e.g., You are a strict gym coach. Always motivate me, give diet tips, and talk in Hindi..."
            placeholderTextColor="#888"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            textAlignVertical="top"
          />

          <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>CHOOSE AVATAR COLOR</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
            {colors.map(c => (
              <TouchableOpacity key={c} onPress={() => setSelectedColor(c)} style={[styles.colorCircle, { backgroundColor: c }, selectedColor === c && styles.selectedRing]} />
            ))}
          </ScrollView>

          <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>CHOOSE ICON</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
            {icons.map(ic => (
              <TouchableOpacity key={ic} onPress={() => setSelectedIcon(ic)} style={[styles.iconBox, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', borderColor: selectedIcon === ic ? accentColor : 'transparent' }]}>
                <Ionicons name={ic} size={28} color={selectedIcon === ic ? accentColor : '#888'} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: accentColor }]} onPress={saveAgent}>
            <Text style={styles.saveBtnTxt}>Create My Agent</Text>
            <Ionicons name="sparkles" size={18} color="#FFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  label: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginTop: 20, marginBottom: 10 },
  input: { padding: 15, borderRadius: 15, fontSize: 16, elevation: 1 },
  textArea: { height: 120 },
  pickerScroll: { flexDirection: 'row', marginBottom: 10 },
  colorCircle: { width: 45, height: 45, borderRadius: 25, marginRight: 15, elevation: 2 },
  selectedRing: { borderWidth: 3, borderColor: '#FFF' },
  iconBox: { width: 60, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 2, elevation: 1 },
  saveBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, borderRadius: 20, marginTop: 40, elevation: 3 },
  saveBtnTxt: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default CreateAgentScreen;
