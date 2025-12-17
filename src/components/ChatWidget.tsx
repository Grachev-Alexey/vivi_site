import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToMistral } from '../services/mistralService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Здравствуйте! Я консультант ViVi. 💖 Подсказать стоимость курса на лазере Pioneer?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || status === LoadingState.LOADING) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(LoadingState.LOADING);

    const replyText = await sendMessageToMistral(userMsg.text);
    
    const botMsg: ChatMessage = { role: 'model', text: replyText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setStatus(LoadingState.IDLE);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-24 md:bottom-10 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-48px)] h-[500px] bg-white rounded-[2rem] shadow-2xl shadow-dark/20 border border-white flex flex-col overflow-hidden animate-fade-in origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-5 flex justify-between items-center z-10 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                    <Sparkles size={20} fill="currentColor" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-brand-500"></div>
              </div>
              <div>
                 <span className="font-bold text-lg block leading-tight">ViVi консультант</span>
                 <span className="text-xs text-white/80 font-medium">Онлайн</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 text-sm font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-dark text-white rounded-2xl rounded-tr-none'
                      : 'bg-white text-dark border border-gray-100 rounded-2xl rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {status === LoadingState.LOADING && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center border border-gray-100">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
             <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Спросить..."
                  className="w-full pl-5 pr-12 py-3.5 bg-gray-100 rounded-xl text-sm font-bold text-dark focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-200 transition-all placeholder:text-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={status === LoadingState.LOADING || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-500 text-white p-2 rounded-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition shadow-lg shadow-brand-500/30"
                >
                  <Send size={16} />
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-widget-toggle group flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-brand-600 to-brand-400 text-white rounded-full shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle size={32} fill="currentColor" />
      </button>
    </div>
  );
};