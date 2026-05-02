import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const themes = [
  { name: 'Classic Blue', color: '#007AFF' },
  { name: 'Emerald Green', color: '#4CD964' },
  { name: 'Cyber Pink', color: '#FF2D55' },
  { name: 'Royal Gold', color: '#FFCC00' },
  { name: 'Deep Purple', color: '#5856D6' },
  { name: 'Sunset Orange', color: '#FF9500' },
];

const ThemeScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, updateAccentColor } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>App Themes</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>Choose your vibe</Text>
        <View style={styles.grid}>
          {themes.map(t => (
            <TouchableOpacity 
              key={t.color} 
              style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', borderColor: accentColor === t.color ? t.color : 'transparent' }]}
              onPress={() => updateAccentColor(t.color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: t.color }]} />
              <Text style={[styles.themeName, { color: isDarkMode ? '#FFF' : '#000' }]}>{t.name}</Text>
              {accentColor === t.color && <Ionicons name="checkmark-circle" size={20} color={t.color} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', borderWidth: 2, elevation: 3 },
  colorCircle: { width: 40, height: 40, borderRadius: 20, marginBottom: 10 },
  themeName: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 }
});

export default ThemeScreen;
