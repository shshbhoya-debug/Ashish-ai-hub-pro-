import React from 'react';

const SupportScreen = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2 style={{ color: '#075e54' }}>Help & Support 📞</h2>
      <p style={{ color: '#666' }}>Humein aapki madad karke khushi hogi!</p>
      
      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <div style={cardStyle}>
          <strong>📧 Email Us</strong>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>support@ashishaihub.pro</p>
        </div>
        
        <div style={cardStyle}>
          <strong>🌐 Website</strong>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>www.ashishaihub.pro</p>
        </div>

        <div style={{ ...cardStyle, backgroundColor: '#e3f2fd' }}>
          <strong>❓ FAQs</strong>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>AI Tokens kaise buy karein?</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>Image download kaise karein?</p>
        </div>
      </div>
      
      <p style={{ marginTop: '30px', fontSize: '12px', color: '#aaa' }}>Made with ❤️ by Ashish Developer</p>
    </div>
  );
};

const cardStyle = {
  padding: '15px',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  marginBottom: '15px',
  border: '1px solid #eee'
};

export default SupportScreen;
