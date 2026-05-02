import React, { useContext, useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  ScrollView, Dimensions, StatusBar, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { tokens, updateTokens, isDarkMode } = useContext(AppContext);
  const [canClaim, setCanClaim] = useState(true);

  useEffect(() => {
    checkDailyBonus();
  }, []);

  const checkDailyBonus = async () => {
    const lastClaim = await AsyncStorage.getItem('last_claim_date');
    const today = new Date().toDateString();
    if (lastClaim === today) {
      setCanClaim(false);
    }
  };

  const claimBonus = async () => {
    if (!canClaim) {
      Alert.alert("Wait!", "Aapne aaj ka reward le liya hai. Kal wapas aana! 😊");
      return;
    }
    const today = new Date().toDateString();
    await AsyncStorage.setItem('last_claim_date', today);
    updateTokens(20);
    setCanClaim(false);
    Alert.alert("Congrats! 🎉", "20 Daily Bonus tokens aapke wallet mein add ho gaye hain.");
  };

  const FeatureCard = ({ title, icon, color, screen, desc }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} 
      onPress={() => navigation.navigate(screen)}
    >
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={[styles.cardTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Hello, Ashish! 👋</Text>
          <Text style={styles.subWelcome}>Ready to build something great?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.pfpCircle}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>A</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* DAILY BONUS CARD */}
        <TouchableOpacity 
          style={[styles.bonusCard, !canClaim && { opacity: 0.7 }]} 
          onPress={claimBonus}
        >
          <Ionicons name="gift" size={30} color="#FFD700" />
          <View style={{flex: 1, marginLeft: 15}}>
            <Text style={styles.bonusTitle}>{canClaim ? "Daily Bonus Ready!" : "Next Bonus Tomorrow"}</Text>
            <Text style={styles.bonusSub}>{canClaim ? "Claim 20 tokens for today" : "Aapne aaj ka gift le liya hai"}</Text>
          </View>
          <Ionicons name={canClaim ? "arrow-forward-circle" : "checkmark-circle"} size={24} color="#FFF" />
        </TouchableOpacity>

        {/* BALANCE BOX */}
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('WalletScreen')}>
          <View>
            <Text style={styles.statLabel}>Available Balance</Text>
            <Text style={styles.statValue}>⚡ {tokens} Tokens</Text>
          </View>
          <Ionicons name="wallet-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>AI Power Hub</Text>
        <View style={styles.grid}>
          <FeatureCard title="Chat Pro" icon="chatbubbles" color="#007AFF" screen="ChatScreen" desc="Talk to Gemini AI" />
          <FeatureCard title="Art Gen" icon="image" color="#AF52DE" screen="ImageGenScreen" desc="Create AI Images" />
          <FeatureCard title="Gaming" icon="game-controller" color="#FF2D55" screen="GamingScreen" desc="AI Battle Zone" />
          <FeatureCard title="Ads" icon="play-circle" color="#34C759" screen="WalletScreen" desc="Earn Free Tokens" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  welcome: { fontSize: 24, fontWeight: 'bold' },
  subWelcome: { fontSize: 14, color: '#888' },
  pfpCircle: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  bonusCard: { flexDirection: 'row', backgroundColor: '#FF9500', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 20, elevation: 5 },
  bonusTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  bonusSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  statCard: { backgroundColor: '#1A1A1A', padding: 25, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  statLabel: { color: '#AAA', fontSize: 14 },
  statValue: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: (width - 55) / 2, padding: 20, borderRadius: 22, marginBottom: 15, elevation: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardDesc: { fontSize: 12, color: '#888', marginTop: 4 }
});

export default HomeScreen;
