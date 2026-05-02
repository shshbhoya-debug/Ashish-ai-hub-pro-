import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tokens, setTokens] = useState(1250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('Ashish');
  const [accentColor, setAccentColor] = useState('#007AFF');
  const [transactions, setTransactions] = useState([]);
  const [lastClaimDate, setLastClaimDate] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const keys = ['user_tokens', 'app_theme', 'user_name', 'accent_color', 'wallet_history', 'last_claim'];
      const results = await AsyncStorage.multiGet(keys);
      results.forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'user_tokens') setTokens(parseInt(value));
          if (key === 'app_theme') setIsDarkMode(value === 'dark');
          if (key === 'user_name') setUserName(value);
          if (key === 'accent_color') setAccentColor(value);
          if (key === 'wallet_history') setTransactions(JSON.parse(value));
          if (key === 'last_claim') setLastClaimDate(value);
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

  const claimDailyReward = async () => {
    const today = new Date().toDateString();
    if (lastClaimDate === today) return { success: false, msg: "Aaj ka reward mil chuka hai bhai!" };
    
    await updateTokens(50, "Daily Login Bonus");
    setLastClaimDate(today);
    await AsyncStorage.setItem('last_claim', today);
    return { success: true, msg: "Mubarak ho! +50 Tokens mil gaye." };
  };

  const updateUserName = async (name) => {
    setUserName(name);
    await AsyncStorage.setItem('user_name', name);
  };

  const updateAccentColor = async (color) => {
    setAccentColor(color);
    await AsyncStorage.setItem('accent_color', color);
  };

  return (
    <AppContext.Provider value={{ 
      tokens, updateTokens, isDarkMode, accentColor, updateAccentColor,
      userName, updateUserName, transactions, claimDailyReward, lastClaimDate
    }}>
      {children}
    </AppContext.Provider>
  );
};
