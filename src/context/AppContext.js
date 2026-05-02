import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tokens, setTokens] = useState(1250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('Ashish'); // Default Name

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedTokens = await AsyncStorage.getItem('user_tokens');
      const savedTheme = await AsyncStorage.getItem('app_theme');
      const savedName = await AsyncStorage.getItem('user_name');
      
      if (savedTokens !== null) setTokens(parseInt(savedTokens));
      if (savedTheme !== null) setIsDarkMode(savedTheme === 'dark');
      if (savedName !== null) setUserName(savedName);
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const updateTokens = async (amount) => {
    const newBalance = tokens + amount;
    setTokens(newBalance);
    await AsyncStorage.setItem('user_tokens', newBalance.toString());
  };

  const updateName = async (newName) => {
    setUserName(newName);
    await AsyncStorage.setItem('user_name', newName);
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('app_theme', newTheme ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ tokens, updateTokens, isDarkMode, toggleTheme, userName, updateName }}>
      {children}
    </AppContext.Provider>
  );
};
