import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext'; // Brain connect kiya

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#1A1A1A'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>Settings</Text>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>App Preferences</Text>
          
          {/* DARK MODE SWITCH */}
          <View style={[styles.row, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
            <Text style={[styles.rowText, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>Dark Mode</Text>
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleTheme} // Theme change karne ka logic
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#007AFF" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.row, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
            <Text style={[styles.rowText, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>Notifications</Text>
            <Switch value={true} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Support</Text>
          <TouchableOpacity 
            style={[styles.row, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}
            onPress={() => navigation.navigate('SupportScreen')}
          >
            <Text style={[styles.rowText, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>Help & Feedback</Text>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#333' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionLabel: { fontSize: 13, fontWeight: 'bold', color: '#999', marginBottom: 10, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 8 },
  rowText: { fontSize: 16 }
});

export default SettingsScreen;
