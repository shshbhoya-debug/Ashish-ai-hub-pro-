import React, { useContext, useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  ScrollView, StatusBar, Dimensions, Modal, ActivityIndicator, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const { width } = Dimensions.get('window');

const WalletScreen = ({ navigation }) => {
  const { tokens, updateTokens, isDarkMode } = useContext(AppContext);
  const [isAdLoading, setIsAdLoading] = useState(false);

  // Simulated Ad Function
  const watchAd = () => {
    setIsAdLoading(true);
    
    // Simulate 3 seconds of ad playing
    setTimeout(() => {
      setIsAdLoading(false);
      const reward = 25; // 25 tokens per ad
      updateTokens(reward);
      Alert.alert(
        "Reward Received! 🎉", 
        `Ad dekhne ke liye aapko ${reward} tokens mile hain.`,
        [{ text: "Awesome!" }]
      );
    }, 3000);
  };

  const PlanCard = ({ title, price, amount, color, isPro }) => (
    <TouchableOpacity 
      style={[styles.planCard, isPro && { borderColor: color, borderWidth: 2 }]}
      onPress={() => updateTokens(amount)}
    >
      <View style={[styles.planHeader, { backgroundColor: color }]}>
        <Text style={styles.planTitle}>{title}</Text>
      </View>
      <View style={styles.planBody}>
        <Text style={styles.planTokens}>{amount} Tokens</Text>
        <Text style={styles.planPrice}>{price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Wallet</Text>
          <View style={{width: 24}} />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <View style={styles.balanceRow}>
            <Ionicons name="flash" size={32} color="#FFD700" />
            <Text style={styles.balanceAmount}>{tokens}</Text>
            <Text style={styles.tokenLabel}>Tokens</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* WATCH AD SECTION */}
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>Earn Free Tokens</Text>
        <TouchableOpacity style={styles.adCard} onPress={watchAd}>
          <View style={styles.adIconBox}>
            <Ionicons name="play-circle" size={40} color="#FFF" />
          </View>
          <View style={{flex: 1, marginLeft: 15}}>
            <Text style={styles.adTitle}>Watch Video Ad</Text>
            <Text style={styles.adSub}>Get +25 Tokens instantly!</Text>
          </View>
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeTxt}>FREE</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#333', marginTop: 25 }]}>Purchase Plans</Text>
        <View style={styles.plansGrid}>
          <PlanCard title="Starter" price="₹99" amount={100} color="#007AFF" />
          <PlanCard title="Pro" price="₹499" amount={600} color="#AF52DE" isPro />
        </View>
      </ScrollView>

      {/* AD LOADING OVERLAY */}
      <Modal transparent visible={isAdLoading} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.adOverlay}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingAdTxt}>Playing Advertisement...</Text>
            <Text style={styles.waitTxt}>Please wait 3 seconds to claim reward</Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { backgroundColor: '#1A1A1A', paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  balanceCard: { backgroundColor: '#333', marginHorizontal: 20, borderRadius: 20, padding: 25, marginTop: 10, elevation: 10 },
  balanceLabel: { color: '#AAA', fontSize: 14 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  balanceAmount: { color: '#FFF', fontSize: 40, fontWeight: 'bold', marginLeft: 10 },
  tokenLabel: { color: '#FFD700', fontSize: 18, marginLeft: 10, fontWeight: '600' },
  scrollContent: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  adCard: { flexDirection: 'row', backgroundColor: '#AF52DE', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 5 },
  adIconBox: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  adTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  adSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  adBadge: { backgroundColor: '#FFD700', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  adBadgeTxt: { fontSize: 10, fontWeight: 'bold', color: '#000' },
  plansGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  planCard: { backgroundColor: '#FFF', width: (width - 50) / 2, borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  planHeader: { padding: 10, alignItems: 'center' },
  planTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  planBody: { padding: 15, alignItems: 'center' },
  planTokens: { fontSize: 18, fontWeight: 'bold' },
  planPrice: { color: '#666', marginTop: 5 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  adOverlay: { alignItems: 'center' },
  loadingAdTxt: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  waitTxt: { color: '#AAA', fontSize: 14, marginTop: 10 }
});

export default WalletScreen;
