import React from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  Image, ScrollView, Switch, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  
  const MenuOption = ({ icon, title, subtitle, color, isLast }) => (
    <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSub}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity>
          <Ionicons name="pencil" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* USER INFO */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
               <Text style={styles.avatarInitial}>A</Text>
            </View>
            <TouchableOpacity style={styles.editPfp}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Ashish</Text>
          <Text style={styles.userEmail}>developer@ashishai.pro</Text>
          <View style={styles.proBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.proText}>PRO MEMBER</Text>
          </View>
        </View>

        {/* STATS SECTION */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>1.2k</Text>
            <Text style={styles.statLab}>Prompts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>85</Text>
            <Text style={styles.statLab}>Images</Text>
          </View>
        </View>

        {/* SETTINGS GROUP */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupLabel}>Account Settings</Text>
          <MenuOption icon="person-outline" title="Personal Info" subtitle="Manage your account" color="#007AFF" />
          <MenuOption icon="notifications-outline" title="Notifications" subtitle="Alerts & Sound" color="#FF9500" />
          <MenuOption icon="wallet-outline" title="Subscription" subtitle="Manage plan & billing" color="#34C759" />
          <MenuOption icon="shield-checkmark-outline" title="Privacy" color="#AF52DE" isLast />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  profileCard: { alignItems: 'center', backgroundColor: '#FFF', paddingBottom: 25 },
  avatarWrapper: { width: 100, height: 100, marginBottom: 15 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  avatarInitial: { color: '#FFF', fontSize: 40, fontWeight: 'bold' },
  editPfp: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1A1A1A', padding: 8, borderRadius: 20, borderWidth: 3, borderColor: '#FFF' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  userEmail: { fontSize: 14, color: '#666', marginTop: 4 },
  proBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 12 },
  proText: { color: '#FFD700', fontSize: 11, fontWeight: 'bold', marginLeft: 6 },
  statsRow: { flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: 'bold' },
  statLab: { fontSize: 12, color: '#999', marginTop: 2 },
  statDivider: { width: 1, height: '100%', backgroundColor: '#F0F0F0' },
  menuGroup: { marginTop: 25, backgroundColor: '#FFF', paddingHorizontal: 20 },
  groupLabel: { fontSize: 13, fontWeight: 'bold', color: '#999', marginTop: 20, marginBottom: 10, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  iconCircle: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  menuSub: { fontSize: 12, color: '#999', marginTop: 2 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, padding: 15 },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});

export default ProfileScreen;
