import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TermsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
      <Text style={styles.headerTitle}>Terms & Privacy</Text>
    </View>
    <ScrollView style={{padding: 20}}>
      <Text style={styles.h1}>1. Introduction</Text>
      <Text style={styles.p}>Welcome to Ashish AI Hub Pro. By using our app, you agree to these terms...</Text>
      <Text style={styles.h1}>2. Usage Policy</Text>
      <Text style={styles.p}>Aap AI models ka use illegal kaam ke liye nahi kar sakte. Tokens non-refundable hain.</Text>
      <Text style={styles.h1}>3. Data Privacy</Text>
      <Text style={styles.p}>Hum aapke personal data ko secure rakhte hain aur kisi third party ko nahi bechte.</Text>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  h1: { fontSize: 18, fontWeight: 'bold', marginTop: 20, color: '#007AFF' },
  p: { fontSize: 14, color: '#666', marginTop: 10, lineHeight: 22 }
});
export default TermsScreen;
