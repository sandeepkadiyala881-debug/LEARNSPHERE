import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors()); // Allows the website to talk to this server
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a Machine Learning Professor. Use LaTeX for math." },
        ...history.map(msg => ({ 
          role: msg.role === 'ai' ? 'assistant' : 'user', 
          content: msg.content 
        })),
        { role: "user", content: message }
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "AI communication failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 AI Server live on port ${PORT}`));