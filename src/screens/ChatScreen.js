import React from 'react';

const ChatScreen = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', height: '400px', overflowY: 'scroll' }}>
        <p><b>AI:</b> Namaste Ashish! Main aapki kya madad kar sakta hoon?</p>
      </div>
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: '10px', borderRadius: '5px' }} />
        <button style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#25d366', color: 'white', border: 'none', borderRadius: '5px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
