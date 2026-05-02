import React, { useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  ScrollView, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext'; // Context import kiya

const { width } = Dimensions.get('window');

const WalletScreen = ({ navigation }) => {
  const { tokens, updateTokens } = useContext(AppContext); // Asli data uthaya

  const PlanCard = ({ title, price, amount, color, isPro }) => (
    <TouchableOpacity 
      style={[styles.planCard, isPro && { borderColor: color, borderWidth: 2 }]}
      onPress={() => updateTokens(amount)} // Click karne par tokens badhenge
    >
      <View style={[styles.planHeader, { backgroundColor: color }]}>
        <Text style={styles.planTitle}>{title}</Text>
      </View>
      <View style={styles.planBody}>
        <Text style={styles.planTokens}>{amount} Tokens</Text>
        <Text style={styles.planPrice}>{price}</Text>
        <View style={[styles.buyBtn, { backgroundColor: color }]}>
          <Text style={styles.buyText}>Add Tokens</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Wallet</Text>
          <Ionicons name="help-circle-outline" size={24} color="#FFF" />
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
        <Text style={styles.sectionTitle}>Buy More Tokens</Text>
        <View style={styles.plansGrid}>
          <PlanCard title="Starter" price="₹99" amount={100} color="#007AFF" />
          <PlanCard title="Popular" price="₹499" amount={600} color="#AF52DE" isPro />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
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
  plansGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  planCard: { backgroundColor: '#FFF', width: (width - 50) / 2, borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  planHeader: { padding: 10, alignItems: 'center' },
  planTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  planBody: { padding: 15, alignItems: 'center' },
  planTokens: { fontSize: 18, fontWeight: 'bold' },
  planPrice: { color: '#666', marginTop: 5 },
  buyBtn: { marginTop: 15, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  buyText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});

export default WalletScreen;
