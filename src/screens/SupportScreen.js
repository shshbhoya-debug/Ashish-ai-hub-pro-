import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="headset-outline" size={80} color="#007AFF" style={{alignSelf: 'center', marginBottom: 20}} />
        <Text style={styles.title}>How can we help?</Text>
        <Text style={styles.sub}>Submit a ticket and our AI team will get back to you.</Text>
        
        <TextInput style={styles.input} placeholder="Subject" />
        <TextInput style={[styles.input, {height: 120}]} placeholder="Describe your issue..." multiline />
        
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={styles.sendTxt}>Submit Ticket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  content: { padding: 25 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  sub: { textAlign: 'center', color: '#666', marginTop: 10, marginBottom: 30 },
  input: { backgroundColor: '#F5F7FA', padding: 15, borderRadius: 12, marginBottom: 15 },
  sendBtn: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  sendTxt: { color: '#FFF', fontWeight: 'bold' }
});
export default SupportScreen;
