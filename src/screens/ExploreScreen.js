import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const sampleData = [
  { id: '1', type: 'image', title: 'Cyberpunk City', author: 'Ashish', url: 'https://image.pollinations.ai/prompt/cyberpunk%20city%20neon%20lights?width=400' },
  { id: '2', type: 'code', title: 'Snake Game JS', author: 'DevPro', preview: 'cat << EOF > snake.js...' },
  { id: '3', type: 'image', title: 'Ocean Astronaut', author: 'AI_Artist', url: 'https://image.pollinations.ai/prompt/astronaut%20floating%20in%20deep%20ocean?width=400' },
  { id: '4', type: 'image', title: 'Neon Forest', author: 'SkyWalker', url: 'https://image.pollinations.ai/prompt/neon%20forest%20at%20night?width=400' },
];

const ExploreScreen = () => {
  const { isDarkMode, accentColor } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
      {item.type === 'image' ? (
        <Image source={{ uri: item.url }} style={styles.cardImg} />
      ) : (
        <View style={styles.codeBox}>
          <Ionicons name="code-slash" size={30} color={accentColor} />
          <Text style={styles.codeTxt}>{item.preview}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Explore Creations</Text>
        <TouchableOpacity><Ionicons name="search-outline" size={24} color={isDarkMode ? '#FFF' : '#000'} /></TouchableOpacity>
      </View>
      
      <FlatList 
        data={sampleData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  card: { width: '48%', borderRadius: 20, marginBottom: 15, overflow: 'hidden', elevation: 2 },
  cardImg: { width: '100%', height: 160 },
  codeBox: { width: '100%', height: 160, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 10 },
  codeTxt: { color: '#0F0', fontSize: 9, marginTop: 10, fontFamily: 'monospace' },
  info: { padding: 12 },
  title: { fontSize: 13, fontWeight: 'bold' },
  author: { fontSize: 10, color: '#888', marginTop: 3 }
});

export default ExploreScreen;
