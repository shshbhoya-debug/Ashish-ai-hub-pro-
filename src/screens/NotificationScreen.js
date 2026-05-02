import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = ({ navigation }) => {
  const data = [
    { id: '1', title: 'Welcome Gift! 🎁', desc: 'Aapko 50 free tokens mile hain.', time: '2h ago', icon: 'gift', color: '#FF9500' },
    { id: '2', title: 'New Model Alert ⚡', desc: 'Gemini 2.0 Flash ab live hai.', time: '5h ago', icon: 'flash', color: '#007AFF' },
    { id: '3', title: 'System Update', desc: 'App performance improve ki gayi hai.', time: '1d ago', icon: 'settings', color: '#34C759' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={[styles.iconBox, {backgroundColor: item.color + '20'}]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, marginHorizontal: 20, marginTop: 10, borderRadius: 15, alignItems: 'center' },
  iconBox: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: 'bold' },
  desc: { fontSize: 13, color: '#666', marginTop: 2 },
  time: { fontSize: 11, color: '#999', marginTop: 5 }
});
export default NotificationScreen;
