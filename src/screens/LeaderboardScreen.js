import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const LeaderboardScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, tokens, userName } = useContext(AppContext);

  const players = [
    { id: '1', name: 'Aryan Dev', tokens: 15400, rank: 1 },
    { id: '2', name: 'Zoya AI', tokens: 12800, rank: 2 },
    { id: '3', name: 'Kabir Pro', tokens: 9500, rank: 3 },
    { id: '4', name: userName, tokens: tokens, rank: 'YOU' },
    { id: '5', name: 'Sana Dev', tokens: 5200, rank: 4 },
  ].sort((a, b) => (typeof a.rank === 'string' ? Infinity : b.tokens - a.tokens));

  const RankItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }, item.rank === 'YOU' && { borderColor: accentColor, borderWidth: 1.5 }]}>
      <View style={styles.rankBadge}>
        <Text style={[styles.rankText, { color: item.rank === 'YOU' ? accentColor : '#888' }]}>
          {item.rank === 'YOU' ? '•' : item.rank}
        </Text>
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.name}</Text>
        <Text style={styles.tokenSub}>{item.tokens} ⚡</Text>
      </View>
      {item.rank <= 3 && <Ionicons name="shield-checkmark" size={18} color={accentColor} />}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Community Rankings</Text>
      </View>

      <FlatList 
        data={players}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RankItem item={item} />}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTxt}>TOP CONTRIBUTORS</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 15 },
  listHeader: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#8882', paddingBottom: 10 },
  listHeaderTxt: { fontSize: 11, fontWeight: '800', color: '#888', letterSpacing: 1.5 },
  card: { flexDirection: 'row', padding: 16, borderRadius: 18, marginBottom: 10, alignItems: 'center', elevation: 1 },
  rankBadge: { width: 30, alignItems: 'center' },
  rankText: { fontSize: 14, fontWeight: 'bold' },
  name: { fontSize: 15, fontWeight: '600' },
  tokenSub: { fontSize: 12, color: '#888', marginTop: 2 }
});

export default LeaderboardScreen;
