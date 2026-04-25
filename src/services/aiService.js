const API_URL = "https://openrouter.ai/api/v1/chat/completions";
// Note: Apni API Key .env file mein hi rakhein
const API_KEY = "YOUR_OPENROUTER_API_KEY"; 

export const getAIResponse = async (userMessage) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-exp:free",
        "messages": [{"role": "user", "content": userMessage}]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "AI Error: Connection failed.";
  }
};
