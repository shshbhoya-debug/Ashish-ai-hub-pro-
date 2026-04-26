import React, { useState } from 'react';

const ImageGeneratorScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const generateImage = () => {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;
    setImageUrl(url);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>AI Artist 🖌️</h2>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Describe your image..." 
        style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={generateImage} style={{ padding: '10px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '5px' }}>
        Create Magic
      </button>
      {imageUrl && <img src={imageUrl} alt="AI Generated" style={{ width: '100%', marginTop: '20px', borderRadius: '10px' }} />}
    </div>
  );
};

export default ImageGeneratorScreen;
