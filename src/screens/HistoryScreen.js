import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const { isDarkMode } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHistory();
    });
    return unsubscribe;
  }, [navigation]);

  const loadHistory = async () => {
    const saved = await AsyncStorage.getItem('project_history');
    if (saved) setHistory(JSON.parse(saved));
  };

  const deleteProject = async (id) => {
    Alert.alert("Delete?", "Aap ye project history se hatana chahte hain?", [
      { text: "No" },
      { text: "Yes", onPress: async () => {
          const updated = history.filter(p => p.id !== id);
          setHistory(updated);
          await AsyncStorage.setItem('project_history', JSON.stringify(updated));
      }}
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Built Projects</Text>
      </View>

      <FlatList 
        data={history}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}
            onPress={() => navigation.navigate('ProjectDetailScreen', { project: item })}
          >
            <View style={styles.iconBox}><Ionicons name="folder" size={24} color="#FFD700" /></View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteProject(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text style={styles.empty}>Abhi tak koi project nahi banaya.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  card: { flexDirection: 'row', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 15, elevation: 3 },
  iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#888' },
  empty: { textAlign: 'center', marginTop: 100, color: '#888' }
});

export default HistoryScreen;
