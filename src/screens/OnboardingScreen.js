import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const slides = [
  { id: 1, title: 'AI Chat Pro', desc: 'Unlimited free conversations with the smartest AI models.', icon: 'chatbubbles', color: '#007AFF' },
  { id: 2, title: 'Art Generator', desc: 'Turn your words into masterpieces with premium AI Art tools.', icon: 'image', color: '#AF52DE' },
  { id: 3, title: 'Earn Rewards', desc: 'Watch ads and complete tasks to earn free tokens daily.', icon: 'gift', color: '#FF9500' },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = async () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await AsyncStorage.setItem('has_seen_onboarding', 'true');
      navigation.replace('Login');
    }
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: slide.color + '15' }]}>
          <Ionicons name={slide.icon} size={80} color={slide.color} />
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.desc}>{slide.desc}</Text>
        
        {/* Progress Dots */}
        <View style={styles.dotRow}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === currentSlide ? slide.color : '#DDD' }]} />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: slide.color }]} onPress={handleNext}>
          <Text style={styles.btnText}>{currentSlide === slides.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  iconCircle: { width: 160, height: 160, borderRadius: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center' },
  desc: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 15, lineHeight: 24 },
  dotRow: { flexDirection: 'row', marginTop: 40 },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 },
  footer: { padding: 40 },
  btn: { height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default OnboardingScreen;
