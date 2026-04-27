import React from 'react';

const TermsScreen = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
      <h2 style={{ color: '#075e54' }}>Terms & Privacy 📜</h2>
      <p style={{ fontSize: '12px', color: '#888' }}>Last Updated: April 2026</p>
      
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h4 style={{ color: '#333' }}>1. Privacy Policy</h4>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Hum aapka data kisi teesre party ko nahi bechte. Aapki chat history sirf AI processing ke liye use hoti hai.
        </p>

        <h4 style={{ color: '#333' }}>2. AI Usage</h4>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Ashish AI Hub Pro ke dwara generate kiya gaya content AI-based hai. Iska sahi upyog karna user ki zimmedari hai.
        </p>

        <h4 style={{ color: '#333' }}>3. Tokens & Refund</h4>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Ek baar khareede gaye tokens refund nahi kiye ja sakte. Tokens ki validity 1 saal tak rahegi.
        </p>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '10px' }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>Humein bharosa hai ki aap hamari policy ka samman karenge.</p>
      </div>
    </div>
  );
};

export default TermsScreen;
            
