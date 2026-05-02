import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true })
    ]).start();

    // 3 second baad Home screen par bhej dega
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconCircle}>
          <Ionicons name="flash" size={60} color="#FFF" />
        </View>
        <Text style={styles.logoText}>Ashish AI Hub</Text>
        <Text style={styles.version}>PRO v1.0</Text>
      </Animated.View>
      
      <View style={styles.footer}>
        <Text style={styles.loadingTxt}>Powering up AI...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center' },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoText: { color: '#FFF', fontSize: 28, fontWeight: 'bold', letterSpacing: 2 },
  version: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 5, fontWeight: '600' },
  footer: { position: 'absolute', bottom: 50 },
  loadingTxt: { color: '#FFF', fontSize: 14, opacity: 0.8 }
});

export default SplashScreen;
