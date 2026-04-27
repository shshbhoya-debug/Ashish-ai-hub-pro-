import React from 'react';

const WalletScreen = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <div style={{ backgroundColor: '#075e54', padding: '30px', borderRadius: '15px', color: 'white', marginBottom: '20px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>Available AI Tokens</p>
        <h1 style={{ margin: '10px 0', fontSize: '36px' }}>1,250</h1>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>Approx. 50 Chat Sessions left</p>
      </div>

      <h3 style={{ textAlign: 'left' }}>Recharge Tokens</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={planCard}>⭐ Basic<br/>500 Tokens<br/>₹99</div>
        <div style={{ ...planCard, borderColor: '#ff4757' }}>🔥 Popular<br/>2000 Tokens<br/>₹299</div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <h4>Recent Transactions</h4>
        <div style={historyItem}>Sent 10 tokens - AI Chat</div>
        <div style={historyItem}>Sent 50 tokens - Image Gen</div>
      </div>
    </div>
  );
};

const planCard = { padding: '15px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold' };
const historyItem = { padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '14px', color: '#555' };

export default WalletScreen;
