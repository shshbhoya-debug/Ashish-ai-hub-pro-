import React from 'react';

const HomeScreen = ({ onStartChat, onStartImage }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#075e54' }}>Ashish AI Hub Pro</h1>
      <p>Aapka swagat hai! Kya karna chahenge?</p>
      
      <button 
        onClick={onStartChat}
        style={btnStyle('#25d366')}
      >
        💬 Start AI Chat
      </button>

      <button 
        onClick={onStartImage}
        style={btnStyle('#ff4757')}
      >
        🎨 Generate AI Image
      </button>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
        Version 1.0.0 - Powered by Ashish
      </div>
    </div>
  );
};

const btnStyle = (color) => ({
  display: 'block',
  width: '100%',
  padding: '15px',
  margin: '10px 0',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer'
});

export default HomeScreen;
