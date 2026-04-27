import React, { useState } from 'react';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: darkMode ? '#1a1a1a' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      <h2 style={{ borderBottom: '2px solid #075e54', paddingBottom: '10px' }}>Settings ⚙️</h2>
      
      <div style={settingItem}>
        <span>🌙 Dark Mode</span>
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>

      <div style={settingItem}>
        <span>🔔 Push Notifications</span>
        <input type="checkbox" defaultChecked />
      </div>

      <div style={settingItem}>
        <span>🔑 Change Password</span>
        <button style={smallBtn}>Edit</button>
      </div>

      <div style={settingItem}>
        <span>🌐 Language</span>
        <select style={{ padding: '5px' }}>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>
      </div>

      <div style={{ marginTop: '40px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
        App Version: 1.0.5 (Stable)
      </div>
    </div>
  );
};

const settingItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 0',
  borderBottom: '1px solid #eee'
};

const smallBtn = {
  padding: '5px 10px',
  backgroundColor: '#075e54',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default SettingsScreen;
