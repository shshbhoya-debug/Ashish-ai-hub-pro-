import React, { useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TouchableOpacity, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const { userName, tokens, isDarkMode, accentColor, lastClaimDate } = useContext(AppContext);
  const isClaimed = lastClaimDate === new Date().toDateString();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      {/* Sleek Minimal Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={[styles.userName, { color: isDarkMode ? '#FFF' : '#000' }]}>{userName}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.tokenStatusBar, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} 
          onPress={() => navigation.navigate('WalletScreen')}
        >
          <Ionicons name="flash" size={16} color={accentColor} />
          <Text style={[styles.tokenText, { color: isDarkMode ? '#FFF' : '#000' }]}>{tokens}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Subtle Reward Reminder (Not a big card) */}
        {!isClaimed && (
          <TouchableOpacity 
            style={[styles.miniReward, { borderColor: accentColor + '40' }]} 
            onPress={() => navigation.navigate('WalletScreen')}
          >
            <Ionicons name="gift-outline" size={20} color={accentColor} />
            <Text style={[styles.miniRewardText, { color: accentColor }]}>Daily bonus is waiting for you!</Text>
            <Ionicons name="arrow-forward" size={16} color={accentColor} />
          </TouchableOpacity>
        )}

        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#AAA' : '#444' }]}>AI POWERED TOOLS</Text>
        
        <View style={styles.mainTool}>
          <TouchableOpacity 
            style={[styles.heroCard, { backgroundColor: accentColor }]}
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <View>
              <Text style={styles.heroTitle}>Multi-Agent Chat</Text>
              <Text style={styles.heroSub}>Talk to specialist AI models</Text>
            </View>
            <Ionicons name="chatbubble-ellipses" size={40} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={[styles.smallCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => navigation.navigate('ArchitectScreen')}>
            <Ionicons name="cube-outline" size={24} color={accentColor} />
            <Text style={[styles.cardLabel, { color: isDarkMode ? '#FFF' : '#000' }]}>Architect</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.smallCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => navigation.navigate('ImageGenScreen')}>
            <Ionicons name="color-palette-outline" size={24} color="#FF2D55" />
            <Text style={[styles.cardLabel, { color: isDarkMode ? '#FFF' : '#000' }]}>Image Lab</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  greeting: { color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  userName: { fontSize: 22, fontWeight: 'bold' },
  tokenStatusBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  tokenText: { marginLeft: 5, fontWeight: 'bold', fontSize: 14 },
  miniReward: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, borderWidth: 1, marginBottom: 25, backgroundColor: 'transparent' },
  miniRewardText: { flex: 1, marginLeft: 10, fontWeight: '600', fontSize: 13 },
  sectionTitle: { fontSize: 12, fontWeight: '800', marginBottom: 15, letterSpacing: 1.5 },
  heroCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderRadius: 25, marginBottom: 15 },
  heroTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 5 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  smallCard: { width: '48%', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 2 },
  cardLabel: { marginTop: 10, fontWeight: 'bold', fontSize: 14 }
});

export default HomeScreen;
