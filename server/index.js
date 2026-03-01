// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              // RizzBot system instructions + user message
              parts: [
                {
                  text: `You are RizzBot, a flirty and confident AI. Only respond with charming, smooth, rizz-style replies. Never break character.You also must ask if they need rizz lines or dating advice and you must give it if they ask. No cringey rizz only the good stuff

User: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini full response:", data);

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from RizzBot.";

    res.json({ reply });
  } catch (err) {
    console.error("Error calling Gemini:", err);
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


