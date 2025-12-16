import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!API_KEY) {
    console.error("API Key is missing for Gemini Service");
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: AI_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    try {
        initializeChat();
    } catch (e) {
        return "Извините, сейчас я не могу ответить. Пожалуйста, проверьте настройку API ключа.";
    }
  }

  try {
    if (!chatSession) throw new Error("Chat session not initialized");
    
    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });

    return response.text || "Извините, я не поняла вопрос. Можете переформулировать?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Произошла небольшая ошибка связи. Попробуйте позже.";
  }
};