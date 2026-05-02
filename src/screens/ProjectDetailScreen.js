import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const ProjectDetailScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const { isDarkMode } = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>{project.name}</Text>
          <Text style={styles.dateText}>Built on: {project.date}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>Project Prompt:</Text>
        <View style={[styles.promptBox, { backgroundColor: isDarkMode ? '#1F1F1F' : '#E3F2FD' }]}>
          <Text style={[styles.promptText, { color: isDarkMode ? '#BBDEFB' : '#1976D2' }]}>{project.prompt}</Text>
        </View>

        <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555', marginTop: 20 }]}>Generated Architecture Script:</Text>
        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <Text style={styles.codeHeaderTxt}>terminal_script.sh</Text>
            <Ionicons name="copy-outline" size={18} color="#888" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             <Text style={styles.codeContent}>{project.script}</Text>
          </ScrollView>
        </View>

        <TouchableOpacity 
          style={styles.rebuildBtn}
          onPress={() => Alert.alert("Feature Coming Soon", "Re-Architecting logic is being developed.")}
        >
          <Ionicons name="refresh-circle" size={24} color="#FFF" />
          <Text style={styles.rebuildText}>Re-Architect Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40, elevation: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  dateText: { fontSize: 12, color: '#888' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  promptBox: { padding: 15, borderRadius: 12, marginBottom: 10 },
  promptText: { fontSize: 14, fontStyle: 'italic' },
  codeContainer: { backgroundColor: '#1A1A1A', borderRadius: 15, overflow: 'hidden' },
  codeHeader: { backgroundColor: '#333', padding: 10, flexDirection: 'row', justifyContent: 'space-between' },
  codeHeaderTxt: { color: '#AAA', fontSize: 12, fontFamily: 'monospace' },
  codeContent: { color: '#00FF00', padding: 15, fontFamily: 'monospace', fontSize: 12 },
  rebuildBtn: { backgroundColor: '#007AFF', marginTop: 30, padding: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  rebuildText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 }
});

export default ProjectDetailScreen;
