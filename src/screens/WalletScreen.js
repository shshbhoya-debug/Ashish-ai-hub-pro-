import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  ScrollView, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WalletScreen = ({ navigation }) => {
  
  const PlanCard = ({ title, price, tokens, color, isPro }) => (
    <TouchableOpacity style={[styles.planCard, isPro && { borderColor: color, borderWidth: 2 }]}>
      <View style={[styles.planHeader, { backgroundColor: color }]}>
        <Text style={styles.planTitle}>{title}</Text>
      </View>
      <View style={styles.planBody}>
        <Text style={styles.planTokens}>{tokens} Tokens</Text>
        <Text style={styles.planPrice}>{price}</Text>
        <TouchableOpacity style={[styles.buyBtn, { backgroundColor: color }]}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Wallet</Text>
          <Ionicons name="help-circle-outline" size={24} color="#FFF" />
        </View>

        {/* --- MAIN BALANCE CARD --- */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <View style={styles.balanceRow}>
            <Ionicons name="flash" size={32} color="#FFD700" />
            <Text style={styles.balanceAmount}>1,250</Text>
            <Text style={styles.tokenLabel}>Tokens</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.expiryTxt}>Expires in 28 days</Text>
            <TouchableOpacity style={styles.historyBtn}>
              <Text style={styles.historyTxt}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Top Up Tokens</Text>
        <View style={styles.plansGrid}>
          <PlanCard title="Starter" price="₹99" tokens="100" color="#007AFF" />
          <PlanCard title="Popular" price="₹499" tokens="600" color="#AF52DE" isPro />
          <PlanCard title="Business" price="₹999" tokens="1500" color="#FF9500" />
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.transaction}>
              <View style={styles.transIcon}>
                <Ionicons name="image" size={20} color="#666" />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.transTitle}>AI Image Generation</Text>
                <Text style={styles.transDate}>Today, 02:10 PM</Text>
              </View>
              <Text style={styles.transAmount}>- 5⚡</Text>
            </View>
          ))}
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
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, borderTopWidth: 1, borderTopColor: '#444', paddingTop: 15 },
  expiryTxt: { color: '#888', fontSize: 12 },
  historyBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  historyTxt: { color: '#FFF', fontSize: 12 },
  scrollContent: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  plansGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  planCard: { backgroundColor: '#FFF', width: (width - 50) / 2, borderRadius: 15, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  planHeader: { padding: 10, alignItems: 'center' },
  planTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  planBody: { padding: 15, alignItems: 'center' },
  planTokens: { fontSize: 18, fontWeight: 'bold' },
  planPrice: { color: '#666', marginTop: 5 },
  buyBtn: { marginTop: 15, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  buyText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  transactionList: { backgroundColor: '#FFF', borderRadius: 20, padding: 10 },
  transaction: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  transIcon: { width: 40, height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  transTitle: { fontWeight: '600', fontSize: 14 },
  transDate: { fontSize: 11, color: '#999', marginTop: 2 },
  transAmount: { fontWeight: 'bold', color: '#FF3B30' }
});

export default WalletScreen;
