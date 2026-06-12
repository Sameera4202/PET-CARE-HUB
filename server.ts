import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environmental variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini SDK lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables. Assistant replies will fallback to high-quality simulated pet support rules.");
    }
    ai = new GoogleGenAI({
      apiKey: key || 'dummy-key',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// Chat API Endpoint
app.post('/api/chat', async (req: express.Request, res: express.Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: 'Message is required' });
       return;
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Fallback helper in case Gemini API key is missing, responding like a delightful chatbot
      const simulatedResponses: Record<string, string> = {
        food: "For premium nutrition, I highly recommend our Wilderness Prime Salmon & Sweet Potato or Royal Canopy Puppy Formulas. They contain balanced protein, DHA, and skin-healthy Omega fats perfectly optimized for bone and coat health! 🐾",
        grooming: "Our salon provides Gold & Platinum packages! They include warm oatmeal bubble baths, personalized breed styling, nail buffing, and relaxing paw-pad aromatherapy massage. You can book an appointment directly through our online Booking System! ✂️🧼",
        accessory: "Your pet will love our SnuggleCloud Orthopedic Memory Foam Bed or the Interactive Laser Cat Ball. These are top choices for safety, comfort, and interactive fitness! 🧸💤",
        default: "Hello there! I am Pet Buddy AI, your virtual pet care companion at Pet Paradise. Ask me anything about premium nutrition, accessories, professional grooming schedules, or tips for happy, healthy dogs, cats, birds, and fish! 🐾🐶🐱🦜🐠"
      };

      const msgLower = message.toLowerCase();
      let reply = simulatedResponses.default;
      if (msgLower.includes('food') || msgLower.includes('diet') || msgLower.includes('eat') || msgLower.includes('nutrition')) {
        reply = simulatedResponses.food;
      } else if (msgLower.includes('groom') || msgLower.includes('bath') || msgLower.includes('nail') || msgLower.includes('haircut') || msgLower.includes('spa')) {
        reply = simulatedResponses.grooming;
      } else if (msgLower.includes('toy') || msgLower.includes('bed') || msgLower.includes('collar') || msgLower.includes('carrier') || msgLower.includes('leash')) {
        reply = simulatedResponses.accessory;
      }
      
      res.json({ text: reply });
      return;
    }

    const gemini = getGeminiClient();
    
    // Construct chat history structured for @google/genai
    const systemInstruction = 
      "You are Pet Buddy AI, a delightful, intelligent, and empathetic pet caregiver assistant at the 'Pet Paradise' pet store. " +
      "Your tone is playful, warm, professional, and full of pet-loving energy (frequent cute emojis like 🐾, 🐶, 🐱, 🦜, 🐠 are highly encouraged!). " +
      "You offer expert advice on: " +
      "1) Recommending premium pet food (Dog/Cat/Bird/Fish foods like Royal Canopy, Wilderness Prime, Whiskers Pure Tuna, Sunland seed mixes). " +
      "2) Suggesting accessories (SnuggleCloud Bed, Interactive Toys, Elegant Collars, Travel Carriers). " +
      "3) Grooming guidance (stylist advice, waterless cleaning, Gold and Platinum packages details). " +
      "4) Breed-specific tips and general veterinary care advice. " +
      "Keep responses concise (maximum 3 concise benefit-focused paragraphs or bullet points). If asked about booking, politely guide them to the booking button on our header or sections.";

    // Simple single prompt with history injection to preserve text context
    let fullPrompt = `${systemInstruction}\n\n`;
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((msg: any) => {
        fullPrompt += `${msg.sender === 'user' ? 'User' : 'Pet Buddy AI'}: ${msg.text}\n`;
      });
    }
    fullPrompt += `User: ${message}\nPet Buddy AI:`;

    const response = await gemini.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: fullPrompt,
    });

    const replyText = response.text || "Hello! How can I and the team at Pet Paradise help you and your beloved furry friend today? 🐾";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong in your Pet Buddy AI companion.", details: error.message });
  }
});

// Setup fallback for Vite assets and index.html in production vs development
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  // In development, import Vite dynamically and build Server middleware
  import('vite').then((vite) => {
    vite.createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    }).then((viteServer) => {
      app.use(viteServer.middlewares);
      app.listen(port, '0.0.0.0', () => {
        console.log(`Development full-stack Pet Paradise server active on http://localhost:${port}`);
      });
    });
  });
} else {
  // In production, serve rebuilt static files
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Production full-stack Pet Paradise server active on http://localhost:${port}`);
  });
}
