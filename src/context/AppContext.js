import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tokens, setTokens] = useState(1250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('Ashish');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedTokens = await AsyncStorage.getItem('user_tokens');
      const savedTheme = await AsyncStorage.getItem('app_theme');
      const savedName = await AsyncStorage.getItem('user_name');
      const savedTrans = await AsyncStorage.getItem('wallet_history');
      
      if (savedTokens !== null) setTokens(parseInt(savedTokens));
      if (savedTheme !== null) setIsDarkMode(savedTheme === 'dark');
      if (savedName !== null) setUserName(savedName);
      if (savedTrans !== null) setTransactions(JSON.parse(savedTrans));
    } catch (e) { console.error(e); }
  };

  const updateTokens = async (amount, reason) => {
    const newBalance = tokens + amount;
    setTokens(newBalance);
    await AsyncStorage.setItem('user_tokens', newBalance.toString());

    // Transaction record banana
    const newTransaction = {
      id: Date.now().toString(),
      amount: amount,
      reason: reason,
      date: new Date().toLocaleString(),
      type: amount > 0 ? 'credit' : 'debit'
    };
    
    const updatedHistory = [newTransaction, ...transactions].slice(0, 30); // Last 30 records
    setTransactions(updatedHistory);
    await AsyncStorage.setItem('wallet_history', JSON.stringify(updatedHistory));
  };

  return (
    <AppContext.Provider value={{ 
      tokens, updateTokens, isDarkMode, userName, transactions 
    }}>
      {children}
    </AppContext.Provider>
  );
};
