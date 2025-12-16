import { AI_SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.MISTRAL_API_KEY || '';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

let conversationHistory: Message[] = [];

export const initializeChat = (): void => {
  conversationHistory = [
    { role: 'system', content: AI_SYSTEM_INSTRUCTION }
  ];
};

export const sendMessageToMistral = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Извините, сейчас я не могу ответить. Пожалуйста, проверьте настройку API ключа.";
  }

  if (conversationHistory.length === 0) {
    initializeChat();
  }

  conversationHistory.push({ role: 'user', content: message });

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "Извините, я не поняла вопрос. Можете переформулировать?";
    
    conversationHistory.push({ role: 'assistant', content: assistantMessage });
    
    return assistantMessage;
  } catch (error) {
    console.error("Mistral Error:", error);
    return "Произошла небольшая ошибка связи. Попробуйте позже.";
  }
};
