import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `You are an AI assistant for Halleluyah Darasimi Oludele (HDO), a software engineer.
Use the following information to answer questions about HDO:

Skills:
- Expert in Django, FastAPI, Node.js (NestJS, Express)
- Frontend: React, Next.js, TypeScript
- AI/ML: Experience with LLMs, Cohere AI, Gemini AI
- Blockchain: Smart Contracts, Web3 development

Notable Projects:
- Synthesis AI: Academic paper analysis system
- Legal AI: Automated legal document generation
- HealthPulse: Healthcare analytics platform
- Blockchain Voting Platform

Achievements:
- Cohere AI Hack4Good 2023 Honorable Mention
- NDPC Code for Privacy Hackathon 2024 First Place
- Partisia Blockchain Hackathon 2024 MVP
- Hult Prize UCH 2024 Winner (Oncolens)

Be helpful, professional, and concise in your responses.`;

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'll act as HDO's AI assistant and use this information to help visitors." }],
        },
        ...messages.slice(0, -1).map((msg: ChatMessage) => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }))
      ],
    });

    const result = await chat.sendMessage([{ text: messages[messages.length - 1].content }]);
    const response = await result.response;
    const text = response.text();

    // Generate suggestions
    const suggestedQuestions = await generateSuggestedQuestions(text);

    return NextResponse.json({
      response: text,
      suggestions: suggestedQuestions
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    let errorMessage = 'Failed to process chat request';

    if (error.message?.includes('quota')) {
      errorMessage = 'Rate limit exceeded. Please try again in a moment.';
    } else if (error.message?.includes('safety')) {
      errorMessage = 'Content filtered for safety. Please try a different question.';
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function generateSuggestedQuestions(context: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Based on this conversation context: "${context}"
  Generate 3 relevant follow-up questions that someone might want to ask.
  Return them as a JSON array of strings. Example: ["question 1", "question 2", "question 3"]
  Make the questions natural and contextual.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  try {
    return JSON.parse(response.text());
  } catch {
    return [
      "Can you tell me more about your experience with AI?",
      "What other projects have you worked on?",
      "What technologies do you specialize in?"
    ];
  }
}
