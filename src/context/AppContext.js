import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tokens, setTokens] = useState(1250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('Ashish');
  const [apiKey, setApiKey] = useState('');
  const [ghToken, setGhToken] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const keys = ['user_tokens', 'app_theme', 'user_name', 'api_key', 'gh_token', 'wallet_history'];
      const results = await AsyncStorage.multiGet(keys);
      results.forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'user_tokens') setTokens(parseInt(value));
          if (key === 'app_theme') setIsDarkMode(value === 'dark');
          if (key === 'user_name') setUserName(value);
          if (key === 'api_key') setApiKey(value);
          if (key === 'gh_token') setGhToken(value);
          if (key === 'wallet_history') setTransactions(JSON.parse(value));
        }
      });
    } catch (e) { console.error(e); }
  };

  const updateTokens = async (amount, reason) => {
    const newBal = tokens + amount;
    setTokens(newBal);
    await AsyncStorage.setItem('user_tokens', newBal.toString());
    const newTrans = { id: Date.now().toString(), amount, reason, date: new Date().toLocaleString(), type: amount > 0 ? 'credit' : 'debit' };
    const updated = [newTrans, ...transactions].slice(0, 30);
    setTransactions(updated);
    await AsyncStorage.setItem('wallet_history', JSON.stringify(updated));
  };

  const updateUserName = async (name) => {
    setUserName(name);
    await AsyncStorage.setItem('user_name', name);
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('app_theme', newTheme ? 'dark' : 'light');
  };

  const saveDevKeys = async (key, token) => {
    setApiKey(key); setGhToken(token);
    await AsyncStorage.setItem('api_key', key);
    await AsyncStorage.setItem('gh_token', token);
  };

  return (
    <AppContext.Provider value={{ 
      tokens, updateTokens, isDarkMode, toggleTheme, 
      userName, updateUserName, apiKey, ghToken, saveDevKeys, transactions 
    }}>
      {children}
    </AppContext.Provider>
  );
};
