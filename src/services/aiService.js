const API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

export const askAI = async (prompt, agentType = "general") => {
  // Har agent ke liye alag personality
  const systemPrompts = {
    coding: "You are an expert software engineer. Provide only clean, working code with brief explanations.",
    essay: "You are a professional academic writer. Write formal, well-structured essays with references.",
    image: "You are a creative prompt engineer. Convert simple ideas into highly detailed 4K image prompts.",
    general: "You are a helpful and witty AI assistant named Ashish AI Pro."
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-exp:free",
        "messages": [
          { "role": "system", "content": systemPrompts[agentType] || systemPrompts.general },
          { "role": "user", "content": prompt }
        ]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "Error: System slow hai, thodi der baad try karein.";
  }
};
