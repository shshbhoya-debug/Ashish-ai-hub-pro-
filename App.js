import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import ImageGeneratorScreen from './src/screens/ImageGeneratorScreen';
import GamingScreen from './src/screens/GamingScreen'; // <--- Naya Import (Step 2 Part A)
import Header from './src/components/Header';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <Header />
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Screen Switching Logic */}
        {currentScreen === 'login' && <LoginScreen onLogin={() => setCurrentScreen('home')} />}
        
        {currentScreen === 'home' && (
          <HomeScreen 
            onStartChat={() => setCurrentScreen('chat')} 
            onStartImage={() => setCurrentScreen('image')}
            onStartGaming={() => setCurrentScreen('gaming')} // <--- Home se Gaming ka rasta
          />
        )}
        
        {currentScreen === 'chat' && <ChatScreen />}
        {currentScreen === 'image' && <ImageGeneratorScreen />}
        {currentScreen === 'gaming' && <GamingScreen />} {/* <--- Nayi Screen (Step 2 Part B) */}
      </div>

      {/* Modern Navigation Bar (Step 2 Part C) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px', background: '#2f3542', borderTop: '2px solid #075e54' }}>
        <button onClick={() => setCurrentScreen('home')} style={navBtn}>🏠 Home</button>
        <button onClick={() => setCurrentScreen('chat')} style={navBtn}>💬 Chat</button>
        <button onClick={() => setCurrentScreen('image')} style={navBtn}>🎨 AI Art</button>
        <button onClick={() => setCurrentScreen('gaming')} style={navBtn}>🎮 Games</button>
      </div>
    </div>
  );
}

const navBtn = { 
  padding: '8px 12px', 
  cursor: 'pointer', 
  backgroundColor: 'transparent', 
  color: 'white', 
  border: '1px solid #555', 
  borderRadius: '8px',
  fontSize: '12px' 
};
