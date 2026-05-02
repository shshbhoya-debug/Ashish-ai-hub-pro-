import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';

const DataManagementScreen = ({ navigation }) => {
  const { isDarkMode, updateTokens } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleReset = (type) => {
    Alert.alert(
      "Confirm Reset",
      `Kya aap sach mein ${type} delete karna chahte hain? Ye wapas nahi aayega!`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes, Delete", 
          style: "destructive", 
          onPress: async () => {
            setLoading(true);
            try {
              if (type === 'Chat History') {
                await AsyncStorage.removeItem('chat_history');
              } else if (type === 'Wallet History') {
                await AsyncStorage.removeItem('wallet_history');
              } else if (type === 'All Data') {
                await AsyncStorage.clear();
                Alert.alert("Success", "Poora data saaf ho gaya hai. App restart karein.");
              }
              Alert.alert("Success", `${type} clear kar diya gaya hai.`);
            } catch (e) {
              Alert.alert("Error", "Kuch gadbad hui.");
            }
            setLoading(false);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Data & Privacy</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#FF9500" />
          <Text style={styles.infoText}>Yahan se aap app ka sensitive data manage kar sakte hain.</Text>
        </View>

        <TouchableOpacity style={[styles.optionCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => handleReset('Chat History')}>
          <View style={styles.iconBox}><Ionicons name="chatbubbles-outline" size={22} color="#007AFF" /></View>
          <Text style={[styles.optionText, { color: isDarkMode ? '#FFF' : '#000' }]}>Clear Chat History</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => handleReset('Wallet History')}>
          <View style={[styles.iconBox, { backgroundColor: '#4CD96420' }]}><Ionicons name="receipt-outline" size={22} color="#4CD964" /></View>
          <Text style={[styles.optionText, { color: isDarkMode ? '#FFF' : '#000' }]}>Clear Transaction History</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={[styles.dangerCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => handleReset('All Data')}>
          <View style={[styles.iconBox, { backgroundColor: '#FF3B3020' }]}><Ionicons name="trash-outline" size={22} color="#FF3B30" /></View>
          <Text style={styles.dangerText}>Factory Reset App</Text>
        </TouchableOpacity>
        <Text style={styles.warningNote}>Dhyan rahe: Factory reset se saari API keys aur tokens bhi chale jayenge.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  infoBox: { flexDirection: 'row', backgroundColor: '#FF950020', padding: 15, borderRadius: 12, marginBottom: 25, alignItems: 'center' },
  infoText: { color: '#FF9500', fontSize: 12, marginLeft: 10, flex: 1 },
  optionCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 12, elevation: 2 },
  iconBox: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#007AFF20', justifyContent: 'center', alignItems: 'center' },
  optionText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
  dangerCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#FF3B3040' },
  dangerText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: 'bold', color: '#FF3B30' },
  warningNote: { textAlign: 'center', color: '#888', fontSize: 11, marginTop: 10 }
});

export default DataManagementScreen;
