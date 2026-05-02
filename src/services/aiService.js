export const callOpenRouter = async (prompt, apiKey, model = "google/gemini-2.0-flash-001") => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "AI connect nahi ho pa raha hai.";
  }
};

export const generateAIImage = async (prompt, apiKey) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "together/flux-schnell", // High-speed high-quality image model
        "messages": [
          {
            "role": "user",
            "content": [
              { "type": "text", "text": prompt }
            ]
          }
        ]
      })
    });
    const data = await response.json();
    // Note: Image models often return a URL or base64 in a specific format
    return data.choices[0].message.content; 
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
