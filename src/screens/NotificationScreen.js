import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const NotificationScreen = ({ navigation }) => {
  const { notifications, isDarkMode } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#1A1A1A'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>Notifications</Text>
      </View>
      
      <FlatList 
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
            <View style={[styles.iconBox, { backgroundColor: item.type === 'earn' ? '#4CD96420' : '#FF3B3020' }]}>
              <Ionicons 
                name={item.type === 'earn' ? "add-circle" : "remove-circle"} 
                size={24} 
                color={item.type === 'earn' ? "#4CD964" : "#FF3B30"} 
              />
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={60} color="#CCC" />
            <Text style={styles.emptyTxt}>No notifications yet!</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#333' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  card: { flexDirection: 'row', padding: 15, marginHorizontal: 20, marginTop: 10, borderRadius: 15, alignItems: 'center' },
  iconBox: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: 'bold' },
  desc: { fontSize: 13, color: '#888', marginTop: 2 },
  time: { fontSize: 11, color: '#999', marginTop: 5 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyTxt: { color: '#999', marginTop: 10 }
});
export default NotificationScreen;
