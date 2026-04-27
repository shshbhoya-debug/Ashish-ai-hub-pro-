import React from 'react';

const SplashScreen = ({ onGetStarted }) => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #075e54 0%, #128c7e 100%)',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Arial'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🤖</div>
      <h1 style={{ fontSize: '32px', margin: '0' }}>Ashish AI Hub Pro</h1>
      <p style={{ fontSize: '16px', opacity: 0.8, marginTop: '10px' }}>Your All-in-One AI Companion</p>
      
      <button 
        onClick={onGetStarted}
        style={{
          marginTop: '50px',
          padding: '15px 40px',
          backgroundColor: 'white',
          color: '#075e54',
          border: 'none',
          borderRadius: '30px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}
      >
        Get Started 🚀
      </button>
      
      <p style={{ position: 'absolute', bottom: '20px', fontSize: '12px', opacity: 0.6 }}>
        Version 1.0.0 | Powered by Gemini
      </p>
    </div>
  );
};

export default SplashScreen;
