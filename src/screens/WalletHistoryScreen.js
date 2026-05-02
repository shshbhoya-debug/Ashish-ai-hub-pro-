import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const WalletHistoryScreen = ({ navigation }) => {
  const { transactions, isDarkMode } = useContext(AppContext);

  const TransactionCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
      <View style={[styles.iconCircle, { backgroundColor: item.type === 'credit' ? '#4CD96420' : '#FF3B3020' }]}>
        <Ionicons 
          name={item.type === 'credit' ? "arrow-down" : "arrow-up"} 
          size={20} 
          color={item.type === 'credit' ? "#4CD964" : "#FF3B30"} 
        />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={[styles.reason, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>{item.reason}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={[styles.amount, { color: item.type === 'credit' ? '#4CD964' : '#FF3B30' }]}>
        {item.type === 'credit' ? '+' : ''}{item.amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Transaction History</Text>
      </View>

      <FlatList 
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TransactionCard item={item} />}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={60} color="#CCC" />
            <Text style={styles.emptyTxt}>Abhi tak koi transaction nahi hui.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  card: { flexDirection: 'row', padding: 15, borderRadius: 15, marginBottom: 10, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 45, height: 45, borderRadius: 23, justifyContent: 'center', alignItems: 'center' },
  reason: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#888', marginTop: 2 },
  amount: { fontSize: 18, fontWeight: 'bold' },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyTxt: { color: '#888', marginTop: 15 }
});

export default WalletHistoryScreen;
