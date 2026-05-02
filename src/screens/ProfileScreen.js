import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';

const ProfileScreen = () => {
  const { isDarkMode, userName, updateUserName } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      Alert.alert("Success", "Profile photo updated!");
    }
  };

  const handleSave = () => {
    updateUserName(newName);
    setIsEditing(false);
    Alert.alert("Success", "Name updated!");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <ScrollView>
        <View style={styles.headerBg}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.avatar}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImg} />
              ) : (
                <Text style={styles.avatarTxt}>{userName.charAt(0).toUpperCase()}</Text>
              )}
              <View style={styles.editIcon}><Ionicons name="camera" size={16} color="#FFF" /></View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.label}>Full Name</Text>
              <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
                <Text style={styles.editBtnText}>{isEditing ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            {isEditing ? (
              <TextInput style={styles.input} value={newName} onChangeText={setNewName} autoFocus />
            ) : (
              <Text style={[styles.info, { color: isDarkMode ? '#FFF' : '#000' }]}>{userName}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Developer ID</Text>
            <Text style={[styles.info, { color: '#888' }]}>ASH-PRO-2026-001</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBg: { height: 160, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 },
  avatarContainer: { marginBottom: -50 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1A1A1A', borderWidth: 4, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  profileImg: { width: '100%', height: '100%', borderRadius: 50 },
  avatarTxt: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#333', padding: 5, borderRadius: 12 },
  content: { marginTop: 60, padding: 20 },
  section: { marginBottom: 25, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#888', textTransform: 'uppercase' },
  info: { fontSize: 18, fontWeight: '500', marginTop: 5 },
  input: { fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#007AFF', paddingVertical: 5 },
  editBtnText: { color: '#007AFF', fontWeight: 'bold' }
});

export default ProfileScreen;
