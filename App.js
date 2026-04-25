import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import Header from './src/components/Header';

export default function App() {
  // Ye 'state' tay karega ki kaunsi screen dikhani hai
  // 'login', 'home', ya 'chat'
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc' }}>
      <Header />
      
      {/* Screen Badalne ka Logic */}
      {currentScreen === 'login' && <LoginScreen onLogin={() => setCurrentScreen('home')} />}
      {currentScreen === 'home' && <HomeScreen onStartChat={() => setCurrentScreen('chat')} />}
      {currentScreen === 'chat' && <ChatScreen />}

      {/* Temp Navigation Buttons (Sirf Check karne ke liye) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#eee' }}>
        <button onClick={() => setCurrentScreen('login')}>Login</button>
        <button onClick={() => setCurrentScreen('home')}>Home</button>
        <button onClick={() => setCurrentScreen('chat')}>Chat</button>
      </div>
    </div>
  );
}
