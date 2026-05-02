import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  TextInput, Image, ScrollView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const ProfileScreen = () => {
  const { isDarkMode, userName, updateUserName } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName);

  const handleSave = () => {
    updateUserName(newName);
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* Header Background */}
        <View style={styles.headerBg}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>Full Name</Text>
              <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
                <Text style={{color: '#007AFF', fontWeight: 'bold'}}>{isEditing ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            
            {isEditing ? (
              <TextInput 
                style={[styles.input, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
                value={newName}
                onChangeText={setNewName}
                autoFocus
              />
            ) : (
              <Text style={[styles.info, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>{userName}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>Email Address</Text>
            <Text style={[styles.info, { color: isDarkMode ? '#888' : '#666' }]}>ashish.dev@hubpro.ai</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: isDarkMode ? '#AAA' : '#555' }]}>Account Status</Text>
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
              <Text style={styles.statusText}>Premium Developer</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}> Logout Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBg: { height: 180, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 },
  avatarContainer: { width: 100, height: 100, marginBottom: -50 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1A1A1A', borderWidth: 4, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  avatarTxt: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  editIcon: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#333', padding: 6, borderRadius: 15 },
  content: { marginTop: 60, paddingHorizontal: 20 },
  section: { marginBottom: 25, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  info: { fontSize: 18, fontWeight: '500' },
  input: { height: 50, borderRadius: 12, paddingHorizontal: 15, fontSize: 18, borderWidth: 1, borderColor: '#007AFF' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  statusText: { color: '#4CD964', marginLeft: 5, fontWeight: 'bold' },
  logoutBtn: { flexDirection: 'row', marginTop: 40, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold' }
});

export default ProfileScreen;
