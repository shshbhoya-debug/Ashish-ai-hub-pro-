import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
    
    setTimeout(async () => {
      const hasSeen = await AsyncStorage.getItem('has_seen_onboarding');
      if (hasSeen) {
        navigation.replace('Login');
      } else {
        navigation.replace('Onboarding');
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Ionicons name="flash" size={80} color="#FFF" />
        <Text style={styles.logoText}>Ashish AI Hub</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  logoText: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 20, letterSpacing: 2 }
});

export default SplashScreen;
