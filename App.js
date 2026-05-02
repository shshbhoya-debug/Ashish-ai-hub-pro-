import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainTabs from './src/navigation/MainTabs';
import ChatScreen from './src/screens/ChatScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ArchitectScreen from './src/screens/ArchitectScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import DevSettingsScreen from './src/screens/DevSettingsScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import SecurityScreen from './src/screens/SecurityScreen';
import SupportScreen from './src/screens/SupportScreen';
import WalletHistoryScreen from './src/screens/WalletHistoryScreen';
import LockScreen from './src/screens/LockScreen';

import { AppProvider } from './src/context/AppContext';

const Stack = createStackNavigator();

export default function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [checkingLock, setCheckingLock] = useState(true);

  useEffect(() => {
    checkAppLock();
  }, []);

  const checkAppLock = async () => {
    const pin = await AsyncStorage.getItem('app_pin');
    if (pin) {
      setIsLocked(true); // Agar PIN hai toh lock dikhao
    } else {
      setIsLocked(false); // Warna seedha entry
    }
    setCheckingLock(false);
  };

  if (checkingLock) return null; // Splash screen ya loading dikha sakte hain

  return (
    <AppProvider>
      <NavigationContainer>
        {isLocked ? (
          <LockScreen onUnlock={() => setIsLocked(false)} />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="WalletScreen" component={WalletScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
            <Stack.Screen name="ArchitectScreen" component={ArchitectScreen} />
            <Stack.Screen name="ProjectDetailScreen" component={ProjectDetailScreen} />
            <Stack.Screen name="DevSettingsScreen" component={DevSettingsScreen} />
            <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
            <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
            <Stack.Screen name="SupportScreen" component={SupportScreen} />
            <Stack.Screen name="WalletHistoryScreen" component={WalletHistoryScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AppProvider>
  );
}
