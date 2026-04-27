import React from 'react';

const ProfileScreen = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '50%', margin: '0 auto 20px' }}>
        <img src="https://via.placeholder.com/100" alt="Profile" style={{ borderRadius: '50%' }} />
      </div>
      <h2>Ashish Developer</h2>
      <p style={{ color: '#666' }}>ashish@aihub.pro</p>
      
      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <div style={listStyle}>🔔 Notifications</div>
        <div style={listStyle}>🔒 Privacy & Security</div>
        <div style={listStyle}>📄 Terms of Service</div>
        <div style={{ ...listStyle, color: 'red', borderBottom: 'none' }}>🚪 Logout</div>
      </div>
    </div>
  );
};

const listStyle = {
  padding: '15px',
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default ProfileScreen;
