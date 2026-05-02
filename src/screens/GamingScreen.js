import React, { useState, useContext, useRef } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  Animated, Easing, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const GamingScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, tokens, updateTokens } = useContext(AppContext);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  const rewards = [0, 5, 20, 50, 100, 0, 200, 10, 500, 0]; // Possible wins

  const startSpin = () => {
    if (tokens < 10) {
      Alert.alert("Low Tokens", "Spin karne ke liye kam se kam 10 tokens chahiye!");
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    updateTokens(-10, "Spin the Wheel Entry");

    // Randomize spin
    const randomSpin = Math.floor(Math.random() * 10);
    const totalValue = 360 * 5 + (randomSpin * 36); // 5 full rotations + offset

    Animated.timing(spinValue, {
      toValue: totalValue,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).current.start(() => {
      const prize = rewards[randomSpin];
      setResult(prize);
      if (prize > 0) {
        updateTokens(prize, `Won in Spin: ${prize} Tokens`);
      }
      setIsSpinning(false);
      spinValue.setValue(randomSpin * 36); // Reset but keep pointer
    });
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 3600],
    outputRange: ['0deg', '3600deg'],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Luck Center</Text>
        <View style={[styles.tokenBadge, { backgroundColor: accentColor + '20' }]}>
          <Text style={{ color: accentColor, fontWeight: 'bold' }}>⚡ {tokens}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.wheelContainer}>
          <View style={[styles.pointer, { borderBottomColor: accentColor }]} />
          <Animated.View style={[styles.wheel, { transform: [{ rotate }], borderColor: accentColor }]}>
            {rewards.map((r, i) => (
              <View key={i} style={[styles.segment, { transform: [{ rotate: `${i * 36}deg` }] }]}>
                <Text style={styles.segmentText}>{r}</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        <View style={styles.resultBox}>
          {result !== null && (
            <Text style={[styles.resultTxt, { color: result > 0 ? '#4CD964' : '#FF3B30' }]}>
              {result > 0 ? `Balle Balle! +${result} Tokens` : "Oh no! Luck ne sath nahi diya."}
            </Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.spinBtn, { backgroundColor: isSpinning ? '#888' : accentColor }]} 
          onPress={startSpin}
          disabled={isSpinning}
        >
          <Text style={styles.spinBtnTxt}>{isSpinning ? "Spinning..." : "SPIN (10 ⚡)"}</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>Ek spin ki keemat sirf 10 tokens!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  tokenBadge: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  wheelContainer: { alignItems: 'center', marginBottom: 50 },
  pointer: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 15, borderRightWidth: 15, borderBottomWidth: 30, borderLeftColor: 'transparent', borderRightColor: 'transparent', marginBottom: -10, zIndex: 10 },
  wheel: { width: 280, height: 280, borderRadius: 140, borderWidth: 8, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  segment: { position: 'absolute', height: '100%', alignItems: 'center', paddingTop: 10 },
  segmentText: { color: '#888', fontWeight: 'bold', fontSize: 14 },
  resultBox: { height: 60, justifyContent: 'center' },
  resultTxt: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  spinBtn: { width: '80%', padding: 20, borderRadius: 25, alignItems: 'center', elevation: 5, marginTop: 20 },
  spinBtnTxt: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  hint: { color: '#888', marginTop: 15, fontSize: 12 }
});

export default GamingScreen;
