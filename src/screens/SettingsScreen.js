import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>App Preferences</Text>
          <View style={styles.row}>
            <Text style={styles.rowText}>Dark Mode</Text>
            <Switch value={false} />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Push Notifications</Text>
            <Switch value={true} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About</Text>
          <TouchableOpacity style={styles.row}><Text style={styles.rowText}>Privacy Policy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.row}><Text style={styles.rowText}>Terms of Service</Text></TouchableOpacity>
          <TouchableOpacity style={styles.row}><Text style={styles.rowText}>App Version 1.0.0</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionLabel: { fontSize: 13, fontWeight: 'bold', color: '#999', marginBottom: 10, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 8 },
  rowText: { fontSize: 16, color: '#1A1A1A' }
});
export default SettingsScreen;
