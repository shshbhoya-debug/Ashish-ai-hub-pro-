import React from 'react';

const LoginScreen = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h2>Ashish AI Hub Pro</h2>
      <p>Please Login to Continue</p>
      <input type="text" placeholder="Username" style={{ padding: '10px', margin: '5px' }} /><br/>
      <input type="password" placeholder="Password" style={{ padding: '10px', margin: '5px' }} /><br/>
      <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        Login
      </button>
    </div>
  );
};

export default LoginScreen;
