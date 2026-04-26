import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import ImageGeneratorScreen from './src/screens/ImageGeneratorScreen'; // Naya Import
import Header from './src/components/Header';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ flex: 1 }}>
        {currentScreen === 'login' && <LoginScreen onLogin={() => setCurrentScreen('home')} />}
        {currentScreen === 'home' && (
          <HomeScreen 
            onStartChat={() => setCurrentScreen('chat')} 
            onStartImage={() => setCurrentScreen('image')} // Naya rasta
          />
        )}
        {currentScreen === 'chat' && <ChatScreen />}
        {currentScreen === 'image' && <ImageGeneratorScreen />}
      </div>

      {/* Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '15px', background: '#333' }}>
        <button onClick={() => setCurrentScreen('home')} style={navBtn}>Home</button>
        <button onClick={() => setCurrentScreen('chat')} style={navBtn}>Chat</button>
        <button onClick={() => setCurrentScreen('image')} style={navBtn}>AI Image</button>
      </div>
    </div>
  );
}

const navBtn = { padding: '5px 10px', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px' };
