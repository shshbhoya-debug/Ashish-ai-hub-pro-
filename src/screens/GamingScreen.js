import React from 'react';

const GamingScreen = () => {
  const games = [
    { id: 1, name: 'AI Quiz Master', icon: '🧠', color: '#4b7bec' },
    { id: 2, name: 'Tic-Tac-Toe AI', icon: '❌', color: '#eb3b5a' },
    { id: 3, name: 'Number Guessing', icon: '🔢', color: '#20bf6b' }
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f2f6', minHeight: '100vh' }}>
      <h2 style={{ color: '#2f3542' }}>Gaming Zone 🕹️</h2>
      <p style={{ color: '#747d8c' }}>Select a game to challenge the AI:</p>
      
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {games.map(game => (
          <div key={game.id} style={{
            padding: '20px',
            backgroundColor: game.color,
            color: 'white',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '30px' }}>{game.icon}</span>
            <h3 style={{ margin: '10px 0 0' }}>{game.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingScreen;
