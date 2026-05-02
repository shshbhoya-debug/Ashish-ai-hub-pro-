import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tokens, setTokens] = useState(1250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('Ashish');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedTokens = await AsyncStorage.getItem('user_tokens');
      const savedTheme = await AsyncStorage.getItem('app_theme');
      const savedName = await AsyncStorage.getItem('user_name');
      const savedNotifs = await AsyncStorage.getItem('app_notifications');
      
      if (savedTokens !== null) setTokens(parseInt(savedTokens));
      if (savedTheme !== null) setIsDarkMode(savedTheme === 'dark');
      if (savedName !== null) setUserName(savedName);
      if (savedNotifs !== null) setNotifications(JSON.parse(savedNotifs));
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const addNotification = async (title, desc, type) => {
    const newNotif = {
      id: Date.now().toString(),
      title,
      desc,
      time: 'Just now',
      type, // 'earn' or 'spend'
    };
    const updatedNotifs = [newNotif, ...notifications].slice(0, 20); // Keep last 20
    setNotifications(updatedNotifs);
    await AsyncStorage.setItem('app_notifications', JSON.stringify(updatedNotifs));
  };

  const updateTokens = async (amount, reason) => {
    const newBalance = tokens + amount;
    setTokens(newBalance);
    await AsyncStorage.setItem('user_tokens', newBalance.toString());
    
    // Add logic notification
    if (reason) {
      addNotification(
        amount > 0 ? "Tokens Added! ⚡" : "Tokens Used ⚡",
        reason,
        amount > 0 ? "earn" : "spend"
      );
    }
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
    <AppContext.Provider value={{ 
      tokens, updateTokens, isDarkMode, toggleTheme, 
      userName, updateName, notifications, addNotification 
    }}>
      {children}
    </AppContext.Provider>
  );
};
