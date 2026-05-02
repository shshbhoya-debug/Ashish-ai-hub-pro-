import React, { useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TouchableOpacity, Image, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const { 
    userName, tokens, isDarkMode, accentColor, 
    claimDailyReward, lastClaimDate 
  } = useContext(AppContext);

  const today = new Date().toDateString();
  const isClaimed = lastClaimDate === today;

  const handleClaim = async () => {
    const result = await claimDailyReward();
    Alert.alert(result.success ? "Success! 🎉" : "Opps! ✋", result.msg);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={[styles.userName, { color: isDarkMode ? '#FFF' : '#000' }]}>{userName} 👋</Text>
        </View>
        <TouchableOpacity style={[styles.tokenBadge, { backgroundColor: accentColor + '20' }]} onPress={() => navigation.navigate('WalletScreen')}>
          <Text style={{ color: accentColor, fontWeight: 'bold' }}>⚡ {tokens}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Daily Reward Card */}
        <View style={[styles.rewardCard, { backgroundColor: isClaimed ? '#8E8E9320' : accentColor }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rewardTitle}>Daily Bonus</Text>
            <Text style={styles.rewardSub}>
              {isClaimed ? "Aaj ka quota pura ho gaya!" : "Apne 50 free tokens claim karein."}
            </Text>
            <TouchableOpacity 
              style={[styles.claimBtn, { backgroundColor: isClaimed ? '#555' : '#FFF' }]} 
              onPress={handleClaim}
              disabled={isClaimed}
            >
              <Text style={{ color: isClaimed ? '#CCC' : accentColor, fontWeight: 'bold' }}>
                {isClaimed ? "Claimed ✅" : "Claim Now +50"}
              </Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="gift" size={70} color="rgba(255,255,255,0.3)" />
        </View>

        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>AI Multi-Agent Tools</Text>
        <View style={styles.toolGrid}>
          <TouchableOpacity style={[styles.toolCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => navigation.navigate('ChatScreen')}>
            <Ionicons name="chatbubbles" size={30} color={accentColor} />
            <Text style={[styles.toolName, { color: isDarkMode ? '#FFF' : '#000' }]}>Chat AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toolCard, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]} onPress={() => navigation.navigate('ArchitectScreen')}>
            <Ionicons name="code-working" size={30} color="#AF52DE" />
            <Text style={[styles.toolName, { color: isDarkMode ? '#FFF' : '#000' }]}>Architect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, paddingTop: 40 },
  greeting: { color: '#888', fontSize: 14 },
  userName: { fontSize: 22, fontWeight: 'bold' },
  tokenBadge: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  rewardCard: { flexDirection: 'row', padding: 20, borderRadius: 25, alignItems: 'center', marginBottom: 30, elevation: 5 },
  rewardTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  rewardSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginVertical: 8 },
  claimBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, alignSelf: 'flex-start', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  toolGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  toolCard: { width: '48%', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 3 },
  toolName: { marginTop: 10, fontWeight: 'bold' }
});

export default HomeScreen;
