import React from 'react';

const NotificationScreen = () => {
  const alerts = [
    { id: 1, title: '🔥 New AI Model!', message: 'Gemini 2.0 is now live in your app.', time: '2h ago', color: '#ff4757' },
    { id: 2, title: '🎁 Weekend Offer', message: 'Get 500 extra tokens on your next recharge.', time: '5h ago', color: '#2ed573' },
    { id: 3, title: '🔒 Security Alert', message: 'Your password was changed successfully.', time: 'Yesterday', color: '#1e90ff' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#2f3542' }}>Notifications 🔔</h2>
      <div style={{ marginTop: '20px' }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{
            padding: '15px',
            borderRadius: '12px',
            backgroundColor: '#fff',
            marginBottom: '15px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderLeft: `6px solid ${alert.color}`
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{alert.title}</div>
            <div style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>{alert.message}</div>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '8px', textAlign: 'right' }}>{alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationScreen;
