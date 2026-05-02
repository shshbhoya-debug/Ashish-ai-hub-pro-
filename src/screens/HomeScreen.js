import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, 
  TouchableOpacity, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const HomeScreen = ({ navigation }) => {
  
  const tools = [
    { id: 1, title: 'Smart Chat', desc: 'Chat with AI', icon: 'chatbubbles', color: '#007AFF', screen: 'Chat' },
    { id: 2, title: 'Image Gen', desc: 'AI Art Creator', icon: 'color-palette', color: '#AF52DE', screen: 'ImageGen' },
    { id: 3, title: 'Code Hub', desc: 'Fix your code', icon: 'code-slash', color: '#FF9500', screen: 'Code' },
    { id: 4, title: 'Prompts', desc: 'Ready templates', icon: 'flash', color: '#34C759', screen: 'Prompts' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- WELCOME HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, Ashish! 👋</Text>
            <Text style={styles.subGreeting}>Kaise help karun aaj?</Text>
          </View>
          <TouchableOpacity style={styles.pfpCircle} onPress={() => navigation.navigate('ProfileScreen')}>
            <Ionicons name="person" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* --- STATS CARD --- */}
        <View style={styles.statsCard}>
          <View style={styles.() => navigation.navigate('WalletScreen')}>
            <Text style={styles.statNum}>Pro</Text>
            <Text style={styles.statLabel}>Plan</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.() => navigation.navigate('WalletScreen')}>
            <Text style={styles.statNum}>∞</Text>
            <Text style={styles.statLabel}>Tokens</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.() => navigation.navigate('WalletScreen')}>
            <Text style={[styles.statNum, {color: '#4CD964'}]}>Online</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        {/* --- TOOLS GRID --- */}
        <Text style={styles.sectionTitle}>AI Tools Hub</Text>
        <View style={styles.grid}>
          {tools.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.card, { borderTopColor: item.color }]}
              onPress={() => item.screen === 'Chat' ? item.screen === 'Chat' ? navigation.navigate('ChatScreen') : navigation.navigate('ImageGenScreen') : null}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={30} color={item.color} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- RECENT ACTIVITY --- */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity style={styles.recentItem}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.recentText}>App login issues fixed...</Text>
          <Ionicons name="chevron-forward" size={16} color="#CCC" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  scrollContent: { padding: 20 },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'center', marginBottom: 25 
  },
  greeting: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  subGreeting: { fontSize: 15, color: '#666', marginTop: 4 },
  pfpCircle: { 
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', 
    justifyContent: 'center', alignItems: 'center', elevation: 3, shadowOpacity: 0.1 
  },
  statsCard: { 
    backgroundColor: '#1A1A1A', borderRadius: 20, padding: 20, 
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 
  },
  () => navigation.navigate('WalletScreen'): { alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#999', fontSize: 12, marginTop: 4 },
  divider: { width: 1, height: '100%', backgroundColor: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { 
    backgroundColor: '#fff', width: cardWidth, borderRadius: 18, 
    padding: 20, marginBottom: 20, borderTopWidth: 4,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.05 
  },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  cardDesc: { fontSize: 12, color: '#888', marginTop: 4 },
  recentItem: { 
    backgroundColor: '#fff', padding: 15, borderRadius: 15, 
    flexDirection: 'row', alignItems: 'center', marginBottom: 10 
  },
  recentText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#444' }
});

export default HomeScreen;
