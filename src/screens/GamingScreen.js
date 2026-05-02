import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const GamingScreen = ({ navigation }) => {
  const { tokens, updateTokens } = useContext(AppContext);

  const handlePlay = (title, cost) => {
    if (cost > 0) {
      if (tokens < cost) {
        Alert.alert("Low Tokens", `${title} khelne ke liye ${cost} tokens chahiye.`);
        return;
      }
      updateTokens(-cost);
      Alert.alert("Mission Started!", `${cost} Tokens deducted. Good luck!`);
    } else {
      Alert.alert("Starting...", `${title} is free to play!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={28} color="#00E5FF" /></TouchableOpacity>
        <Text style={styles.headerTitle}>AI GAMING</Text>
        <Text style={styles.tokenTxt}>⚡ {tokens}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>Cyber Chess AI</Text>
          <Text style={styles.costText}>Cost: 10 Tokens</Text>
          <TouchableOpacity style={styles.mainPlayBtn} onPress={() => handlePlay("Cyber Chess AI", 10)}>
            <Text style={styles.mainPlayText}>START MISSION</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Free Games</Text>
        {['Word Master', 'Quick Draw'].map((game, i) => (
          <TouchableOpacity key={i} style={styles.gameRow} onPress={() => handlePlay(game, 0)}>
            <Text style={{color: '#FFF', fontSize: 16}}>{game}</Text>
            <Text style={{color: '#4CD964'}}>FREE</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  headerTitle: { color: '#00E5FF', fontSize: 20, fontWeight: 'bold' },
  tokenTxt: { color: '#FFD700', fontWeight: 'bold' },
  featuredCard: { padding: 30, backgroundColor: '#1A1A2E', borderRadius: 25, borderWidth: 1, borderColor: '#00E5FF', alignItems: 'center' },
  featuredTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  costText: { color: '#00E5FF', marginVertical: 10 },
  mainPlayBtn: { backgroundColor: '#00E5FF', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10 },
  mainPlayText: { color: '#000', fontWeight: 'bold' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginVertical: 20 },
  gameRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#161625', padding: 20, borderRadius: 15, marginBottom: 10 }
});

export default GamingScreen;
