import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const SupportScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(AppContext);
  const [category, setCategory] = useState('Bug');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Bug', 'Suggestion', 'Question', 'Other'];

  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert("Empty Message", "Please describe your issue before submitting.");
      return;
    }

    setLoading(true);
    
    // Simulating API call to send feedback
    setTimeout(() => {
      setLoading(false);
      const ticketId = Math.floor(100000 + Math.random() * 900000);
      Alert.alert(
        "Message Sent! ✅", 
        `Aapka feedback record ho gaya hai.\nTicket ID: #ASH-${ticketId}\nHum jaldi hi aapse sampark karenge.`,
        [{ text: "Great", onPress: () => navigation.goBack() }]
      );
      setMessage('');
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#1A1A1A'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#333' }]}>What can we help with?</Text>
        <View style={styles.catRow}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[
                styles.catBtn, 
                category === cat && styles.catBtnActive,
                { backgroundColor: category === cat ? '#007AFF' : (isDarkMode ? '#333' : '#E0E0E0') }
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.catText, category === cat && { color: '#FFF' }]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#333', marginTop: 25 }]}>Describe your issue</Text>
        <TextInput 
          style={[styles.input, { 
            backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', 
            color: isDarkMode ? '#FFF' : '#000',
            borderColor: isDarkMode ? '#333' : '#DDD'
          }]}
          placeholder="Yahan apni samasya likhein..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity 
          style={[styles.submitBtn, { opacity: loading ? 0.7 : 1 }]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="paper-plane" size={20} color="#FFF" />
              <Text style={styles.submitText}> Submit Feedback</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.footerInfo}>
          <Ionicons name="mail-outline" size={16} color="#888" />
          <Text style={styles.footerText}> support@ashish-ai-hub.pro</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  catBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, marginBottom: 10, minWidth: '48%', alignItems: 'center' },
  catBtnActive: { elevation: 3 },
  catText: { fontSize: 14, fontWeight: '500', color: '#666' },
  input: { borderRadius: 15, padding: 15, fontSize: 16, borderWidth: 1, height: 150 },
  submitBtn: { backgroundColor: '#007AFF', marginTop: 30, padding: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footerInfo: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  footerText: { color: '#888', fontSize: 14 }
});

export default SupportScreen;
