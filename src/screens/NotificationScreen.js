import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const NotificationScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(AppContext);

  const notifications = [
    { id: '1', title: 'Welcome Reward!', body: 'Aapko 250 extra tokens mile hain app setup karne ke liye.', time: '2h ago', icon: 'gift' },
    { id: '2', title: 'New Model Added', body: 'Ab aap Gemini 2.0 Flash use kar sakte hain Code Architect mein.', time: '5h ago', icon: 'rocket' },
    { id: '3', title: 'Daily Bonus Ready', body: 'Aaj ka 20 token bonus claim karein Dashboard par.', time: '1d ago', icon: 'sparkles' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Notifications</Text>
      </View>
      <FlatList 
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
            <View style={styles.iconCircle}><Ionicons name={item.icon} size={20} color="#007AFF" /></View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  card: { flexDirection: 'row', padding: 15, borderRadius: 15, marginBottom: 12, elevation: 2 },
  iconCircle: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#007AFF20', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  body: { fontSize: 13, color: '#888', marginTop: 3 },
  time: { fontSize: 11, color: '#007AFF', marginTop: 5, fontWeight: 'bold' }
});

export default NotificationScreen;
