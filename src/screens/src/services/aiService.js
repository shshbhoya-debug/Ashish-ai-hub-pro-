const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "YOUR_OPENROUTER_API_KEY"; // Yahan aapki key aayegi

export const getAIResponse = async (userMessage) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-exp:free", // Aap model badal sakte hain
        "messages": [
          {"role": "user", "content": userMessage}
        ]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "Maaf kijiye, AI abhi jawab nahi de paa raha hai.";
  }
};
