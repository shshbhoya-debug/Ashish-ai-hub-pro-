import React, { useState } from 'react';
import { 
  Text, View, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, Image, SafeAreaView, Dimensions, StatusBar 
} from 'react-native';

const { width } = Dimensions.get('window');

// ── THEME COLORS (Directly from your HTML CSS) ──
const Colors = {
  bg: '#FFFFFF',
  bgSecondary: '#F7F7F8',
  border: '#E5E5E5',
  text: '#1F1F1F',
  textSecondary: '#6B6B6B',
  primary: '#10A37F', // ChatGPT Green
  danger: '#EF4444',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // --- Screens Components ---

  const HomeScreen = () => (
    <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
      {/* Home Header */}
      <View style={styles.homeHeader}>
        <View style={styles.hTop}>
          <View style={styles.avatar}><Text style={{color:'#fff', fontWeight:'bold'}}>A</Text></View>
          <View style={styles.hActions}>
            <TouchableOpacity style={styles.iconBtn}><Text>🔔</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><Text>⚙️</Text></TouchableOpacity>
          </View>
        </View>
        <Text style={styles.greetText}>Good Morning,</Text>
        <Text style={styles.greetName}>Ashish 👋</Text>
        
        {/* Search Bar (HTML Design) */}
        <TouchableOpacity style={styles.searchBar}>
          <Text style={{color: Colors.textSecondary}}>Search AI Tools...</Text>
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
          <View style={[styles.bannerCard, {backgroundColor: '#E6F7F3'}]}>
            <Text style={{fontSize: 30}}>🚀</Text>
            <Text style={styles.bcLabel}>NEW RELEASE</Text>
            <Text style={styles.bcTitle}>Gemini 2.0 Flash is here!</Text>
          </View>
        </ScrollView>
      </View>

      {/* Quick Actions Grid (HTML QGrid) */}
      <View style={styles.section}>
        <View style={styles.secHead}>
          <Text style={styles.secTitle}>QUICK ACTIONS</Text>
        </View>
        <View style={styles.qGrid}>
          {['Chat', 'Image', 'Code', 'Write'].map((item, i) => (
            <TouchableOpacity key={i} style={styles.qi}>
              <View style={styles.qiIcon}><Text style={{fontSize: 24}}>{['💬', '🎨', '💻', '📝'][i]}</Text></View>
              <Text style={styles.qiLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity (HTML Act List) */}
      <View style={styles.section}>
        <Text style={styles.secTitle}>RECENT ACTIVITY</Text>
        <View style={styles.actList}>
          <View style={styles.actItem}>
            <View style={styles.actIcon}><Text>🤖</Text></View>
            <View style={styles.actInfo}>
              <Text style={styles.actName}>React Native Architecture</Text>
              <Text style={styles.actTime}>2 hours ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const ToolScreen = () => (
    <View style={styles.center}>
      <View style={styles.toolsHero}>
        <Text style={styles.thTitle}>AI Powerhouse ⚡</Text>
        <Text style={styles.thSub}>15+ Advanced AI Agents ready to help</Text>
      </View>
      <Text style={{padding: 20, color: Colors.textSecondary}}>Tools are being migrated from HTML...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Screen Container */}
      <View style={{flex: 1}}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'tools' && <ToolScreen />}
        {currentScreen === 'chat' && <View style={styles.center}><Text>Asli AI Chat Screen</Text></TouchableOpacity>}
        {currentScreen === 'profile' && <View style={styles.center}><Text>Profile Settings</Text></View>}
      </View>

      {/* BOTTOM NAVIGATION (Directly from HTML CSS) */}
      <View style={styles.bNav}>
        <TouchableOpacity style={styles.ni} onPress={() => setCurrentScreen('home')}>
          <Text style={[styles.niIcon, currentScreen === 'home' && styles.activeNav]}>🏠</Text>
          <Text style={[styles.niLabel, currentScreen === 'home' && styles.activeNav]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.ni} onPress={() => setCurrentScreen('tools')}>
          <Text style={[styles.niIcon, currentScreen === 'tools' && styles.activeNav]}>🛠️</Text>
          <Text style={[styles.niLabel, currentScreen === 'tools' && styles.activeNav]}>Tools</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navFab} onPress={() => setCurrentScreen('chat')}>
          <Text style={{color: '#fff', fontSize: 24}}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ni} onPress={() => setCurrentScreen('wallet')}>
          <Text style={[styles.niIcon, currentScreen === 'wallet' && styles.activeNav]}>💰</Text>
          <Text style={[styles.niLabel, currentScreen === 'wallet' && styles.activeNav]}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ni} onPress={() => setCurrentScreen('profile')}>
          <Text style={[styles.niIcon, currentScreen === 'profile' && styles.activeNav]}>👤</Text>
          <Text style={[styles.niLabel, currentScreen === 'profile' && styles.activeNav]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── STYLES (HTML CSS to React Native Translation) ──
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scrollBody: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  // Header Style
  homeHeader: { padding: 20, paddingTop: 40 },
  hTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  hActions: { flexDirection: 'row', gap: 10 },
  iconBtn: { width: 36, height: 36, borderWidth: 1, borderColor: Colors.border, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  greetText: { fontSize: 13, color: Colors.textSecondary },
  greetName: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  
  // Search Bar
  searchBar: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: Colors.bgSecondary, padding: 12, 
    borderRadius: 12, marginTop: 15, borderWidth: 1, borderColor: '#F0F0F0' 
  },

  // Banner
  section: { paddingHorizontal: 20, marginTop: 25 },
  bannerCard: { 
    width: width - 40, height: 130, borderRadius: 16, 
    padding: 20, justifyContent: 'center', borderWidth: 1, borderColor: Colors.border 
  },
  bcLabel: { fontSize: 10, fontWeight: '800', color: Colors.primary, marginBottom: 5 },
  bcTitle: { fontSize: 18, fontWeight: '700' },

  // Quick Grid
  secHead: { marginBottom: 15 },
  secTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  qGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  qi: { alignItems: 'center', gap: 8 },
  qiIcon: { width: 65, height: 65, borderRadius: 12, backgroundColor: Colors.bgSecondary, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  qiLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },

  // Activity List
  actList: { marginTop: 10, gap: 10 },
  actItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: Colors.border },
  actIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: Colors.bgSecondary, justifyContent: 'center', alignItems: 'center' },
  actInfo: { marginLeft: 12 },
  actName: { fontSize: 14, fontWeight: '600' },
  actTime: { fontSize: 11, color: Colors.textSecondary },

  // Tools Hero
  toolsHero: { width: width - 40, backgroundColor: Colors.primary, borderRadius: 16, padding: 25 },
  thTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  thSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 5 },

  // Bottom Nav
  bNav: { 
    flexDirection: 'row', height: 85, backgroundColor: '#fff', 
    borderTopWidth: 1, borderTopColor: Colors.border, 
    paddingBottom: 20, alignItems: 'center' 
  },
  ni: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  niIcon: { fontSize: 20, color: '#9B9B9B' },
  niLabel: { fontSize: 11, color: '#9B9B9B', marginTop: 4 },
  activeNav: { color: Colors.primary },
  navFab: { 
    width: 55, height: 55, borderRadius: 16, 
    backgroundColor: Colors.primary, marginTop: -35, 
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  }
});
