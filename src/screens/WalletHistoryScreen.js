import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const WalletHistoryScreen = ({ navigation }) => {
  const { transactions, isDarkMode } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // All, Credit, Debit

  const filteredData = transactions.filter(item => {
    const matchesSearch = item.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || item.type.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

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
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Wallet Ledger</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: isDarkMode ? '#1F1F1F' : '#E5E5EA' }]}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput 
            style={[styles.searchInput, { color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="Search transactions..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterRow}>
          {['All', 'Credit', 'Debit'].map(f => (
            <TouchableOpacity 
              key={f} 
              onPress={() => setFilter(f)}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, filter === f && { color: '#FFF' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList 
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TransactionCard item={item} />}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={60} color="#CCC" />
            <Text style={styles.emptyTxt}>Koi matching transaction nahi mili.</Text>
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
  searchContainer: { paddingHorizontal: 20, marginBottom: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 45, borderRadius: 12 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  filterRow: { flexDirection: 'row', marginTop: 15 },
  filterBtn: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginRight: 10, backgroundColor: '#8882' },
  filterBtnActive: { backgroundColor: '#007AFF' },
  filterText: { fontSize: 13, fontWeight: 'bold', color: '#888' },
  card: { flexDirection: 'row', padding: 15, borderRadius: 15, marginBottom: 10, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  reason: { fontSize: 15, fontWeight: 'bold' },
  date: { fontSize: 11, color: '#888', marginTop: 2 },
  amount: { fontSize: 16, fontWeight: 'bold' },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyTxt: { color: '#888', marginTop: 15 }
});

export default WalletHistoryScreen;
