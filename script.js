import { GoogleGenerativeAI } from "@google/generative-ai";

const insultButton = document.getElementById('insultButton');
const insultDisplay = document.getElementById('insultDisplay');

const backupInsults = [
    "Ye scurvy dog!",
    "Avast, ye barnacle-bottomed landlubber!",
    "Arrr, ye lily-livered swashbuckler!",
    "Walk the plank, ye blaggard!",
    "Shiver me timbers, ye scurvy dog!",
    "Avast, ye barnacle-bottomed landlubber!",
    "Arrr, ye lily-livered swashbuckler!",
    "Walk the plank, ye blaggard!"

];

function pirateify(text) {
    return text
        .replace(/\byou\b/g, "ye")
        .replace(/\bare\b/g, "be")
        .replace(/\byour\b/g, "yer")
        .replace(/\byou're\b/g, "ye be")
        .replace(/\byou'll\b/g, "ye'll")
        .replace(/\byou've\b/g, "ye've")
        .replace(/\byou'd\b/g, "ye'd")
        .replace(/\bof\b/g, "o'")
        .replace(/\bthe\b/g, "th'");
}

let genAI;
let model;

async function initializeAPI() {
    try {
        const response = await fetch('/api/config');
        const data = await response.json();
        
        if (!data.apiKey) {
            throw new Error('No API key found');
        }

        genAI = new GoogleGenerativeAI(data.apiKey);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (error) {
        console.error('Failed to initialize API:', error);
    }
}

async function fetchPirateInsult() {
    insultButton.disabled = true;
    insultButton.innerText = "Fetching...";

    try {
        if (!model) {
            throw new Error('API not initialized');
        }

        const prompt = "Give me a playful phrase a pirate might say.";
        const result = await model.generateContent(prompt);
        const pirateInsult = pirateify(result.response.text());
        insultDisplay.innerText = pirateInsult;

    } catch (error) {
        console.error("Error fetching pirate insult:", error);
        const fallbackInsult = backupInsults[Math.floor(Math.random() * backupInsults.length)];
        insultDisplay.innerText = pirateify(fallbackInsult);

    } finally {
        insultButton.disabled = false;
        insultButton.innerText = "Give Me An Insult!";
    }
}


initializeAPI();

insultButton.addEventListener('click', fetchPirateInsult);

