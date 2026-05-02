import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  ScrollView, ImageBackground, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const GamingScreen = ({ navigation }) => {
  
  const GameCard = ({ title, players, rating, icon, color }) => (
    <TouchableOpacity style={styles.gameCard}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <Ionicons name={icon} size={30} color="#FFF" />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.gameTitle}>{title}</Text>
        <Text style={styles.gameStats}>{players} Playing • ⭐ {rating}</Text>
      </View>
      <TouchableOpacity style={styles.playBtn}>
        <Text style={styles.playText}>PLAY</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- NEON HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#00E5FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI GAMING ZONE</Text>
        <TouchableOpacity>
          <Ionicons name="trophy-outline" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* --- FEATURED GAME (Neon Card) --- */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTag}>NEW RELEASE</Text>
            <Text style={styles.featuredTitle}>Cyber Chess AI</Text>
            <Text style={styles.featuredDesc}>Defeat the world's smartest AI in a futuristic chess battle.</Text>
            <TouchableOpacity style={styles.mainPlayBtn}>
              <Text style={styles.mainPlayText}>START MISSION</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- CATEGORIES --- */}
        <Text style={styles.sectionTitle}>Popular AI Games</Text>
        <GameCard title="Word Master AI" players="1.2k" rating="4.8" icon="text" color="#FF2D55" />
        <GameCard title="Quick Draw Bot" players="850" rating="4.5" icon="brush" color="#5856D6" />
        <GameCard title="Mystery Riddle" players="2.5k" rating="4.9" icon="help-buoy" color="#AF52DE" />
        
        {/* --- LEADERBOARD SECTION --- */}
        <View style={styles.leaderboardCard}>
          <Text style={styles.lbTitle}>Global Leaderboard</Text>
          <View style={styles.lbRow}>
            <Text style={styles.lbRank}>#1</Text>
            <Text style={styles.lbName}>Ashish_Dev</Text>
            <Text style={styles.lbScore}>15,240 XP</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  headerTitle: { color: '#00E5FF', fontSize: 20, fontWeight: 'bold', letterSpacing: 2 },
  featuredCard: { 
    height: 200, backgroundColor: '#1A1A2E', borderRadius: 25, 
    overflow: 'hidden', marginBottom: 30, borderWidth: 1, borderColor: '#00E5FF' 
  },
  featuredOverlay: { flex: 1, padding: 20, justifyContent: 'center' },
  featuredTag: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  featuredTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  featuredDesc: { color: '#AAA', fontSize: 12, marginTop: 5, marginBottom: 15 },
  mainPlayBtn: { backgroundColor: '#00E5FF', paddingVertical: 10, borderRadius: 10, alignItems: 'center', width: 150 },
  mainPlayText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  gameCard: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#161625', 
    padding: 15, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#333' 
  },
  iconBox: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  gameTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  gameStats: { color: '#666', fontSize: 12, marginTop: 4 },
  playBtn: { backgroundColor: '#333', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  playText: { color: '#00E5FF', fontWeight: 'bold', fontSize: 12 },
  leaderboardCard: { backgroundColor: '#1A1A2E', padding: 20, borderRadius: 25, marginTop: 10 },
  lbTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  lbRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lbRank: { color: '#00E5FF', fontWeight: 'bold' },
  lbName: { color: '#FFF', flex: 1, marginLeft: 15 },
  lbScore: { color: '#FFD700', fontWeight: 'bold' }
});

export default GamingScreen;
