import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';

const HistoryScreen = ({ navigation }) => {
  const { isDarkMode, accentColor } = useContext(AppContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProjects);
    return unsubscribe;
  }, [navigation]);

  const loadProjects = async () => {
    const saved = await AsyncStorage.getItem('saved_projects');
    if (saved) setProjects(JSON.parse(saved));
  };

  const handleShare = (script) => {
    Share.share({ message: script, title: 'Project Script' });
  };

  const ProjectCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.title}...</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => handleShare(item.script)} style={styles.shareIcon}>
        <Ionicons name="share-outline" size={22} color={accentColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>My Projects Hub</Text>
      </View>

      <FlatList 
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProjectCard item={item} />}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={80} color="#CCC" />
            <Text style={styles.emptyTxt}>Abhi tak koi project nahi banaya.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 25, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  card: { flexDirection: 'row', padding: 20, borderRadius: 20, marginBottom: 15, alignItems: 'center', elevation: 3 },
  title: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#888', marginTop: 5 },
  shareIcon: { padding: 10, backgroundColor: '#8881', borderRadius: 12 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyTxt: { color: '#888', marginTop: 15 }
});

export default HistoryScreen;
