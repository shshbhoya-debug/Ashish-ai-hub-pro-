import React from 'react';

const HistoryScreen = () => {
  const historyData = [
    { id: 1, type: 'Chat', title: 'React Native help', date: '27 April' },
    { id: 2, type: 'Image', title: 'Futuristic Car Art', date: '26 April' },
    { id: 3, type: 'Game', title: 'AI Quiz Score: 90%', date: '25 April' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#075e54' }}>AI History 📜</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Aapka purana record yahan hai:</p>
      
      <div style={{ marginTop: '20px' }}>
        {historyData.map(item => (
          <div key={item.id} style={itemStyle}>
            <div style={{ fontWeight: 'bold' }}>{item.icon} {item.title}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{item.type} • {item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const itemStyle = {
  padding: '15px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  marginBottom: '10px',
  borderLeft: '5px solid #075e54'
};

export default HistoryScreen;
