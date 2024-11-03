import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const prompt = "Give me a playful phrase a pirate might say.";
        const result = await model.generateContent(prompt);
        res.status(200).json({ insult: result.response.text });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch insult" });
    }
}
