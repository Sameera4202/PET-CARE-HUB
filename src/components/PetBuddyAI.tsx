import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageCircle, X, Minimize2, Maximize2, Trash2, HelpCircle, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../types';

export default function PetBuddyAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Initial welcome messages
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Hello, animal lover! I am Pet Buddy AI, your premium custom care advisor at Pet Paradise! 🐾',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 'welcome-2',
        sender: 'bot',
        text: 'Ask me anything about puppy/kitten nutrition, selecting orthopedic beds, or booking our relaxing spa packages! 🐶🛁 How can I serve your pet friend today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickQuestions = [
    { label: '🍗 Puppy Food Advice', query: 'What is the best organic food for critical puppy growth?' },
    { label: '🛁 Platinum Spa Pack', query: 'What additional treatments does your Platinum Royal Pampering have?' },
    { label: '🧸 Recommend Cat Toys', query: 'What interactive cat toys do you suggest for active playful kitties?' },
    { label: '🦜 Healthy Bird Seeds', query: 'Which aviary nutriments are best designed for singing lovebirds?' }
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: messages // pass history for context
        })
      });

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: `m-bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || 'My signal paw got tangled temporarily! Could you kindly repeat that question? 🐾',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot response error:", error);
      const errorMessage: ChatMessage = {
        id: `m-err-${Date.now()}`,
        sender: 'bot',
        text: "Apologies, my server connections are sleeping right now! 😴 Just scroll down to view our gorgeous Grooming booking form or Premium Food tabs!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear your chat history with Pet Buddy AI?')) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'bot',
          text: 'Chat cleared! Ask me some fresh questions about dietary suggestions, hair brushing, or fun toys! 🐾🐶',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-[#BA68C8] hover:bg-[#ab5ebd] rounded-full flex items-center justify-center shadow-2xl text-white cursor-pointer z-50 hover:scale-105 active:scale-95 border-4 border-white ring-4 ring-[#BA68C8]/15 hover:rotate-6 transition-all ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </div>
      </button>

      {/* Slide-out Chat Panel Drawer */}
      <div
        className={`fixed bottom-6 right-6 w-[92vw] sm:w-[420px] h-[550px] glass-panel rounded-3xl border border-white shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#BA68C8] via-[#FF80AB] to-[#4FC3F7] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg shadow-inner">
              🤖
            </div>
            <div>
              <div className="text-sm font-black flex items-center gap-1">
                <span>Pet Buddy AI</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFF59D] fill-[#FFF59D]" />
              </div>
              <div className="text-[10px] text-white/90 font-bold uppercase tracking-wider">Store Companion</div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white/9
              0 hover:text-white transition-all transition-colors"
              title="Clear Active Chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/45 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#4FC3F7] text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-bl-none shadow border border-slate-100/80'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 font-bold mt-1 uppercase px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col mr-auto items-start max-w-[85%]">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow border border-slate-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#BA68C8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-[#BA68C8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-[#BA68C8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset suggestions tags */}
        {messages.length <= 3 && !isTyping && (
          <div className="px-4 py-2 bg-slate-50/60 border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickQuestions.map((qq, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(qq.query)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 rounded-full cursor-pointer transition-all active:scale-95"
              >
                {qq.label}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Footer Form */}
        <div className="p-3 bg-white/75 border-t border-white/60 flex gap-2 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your care question here..."
            className="flex-1 bg-white/90 border border-slate-250 rounded-xl px-3.5 py-2.5 text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BA68C8]/30 transition-all text-slate-800"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-2.5 bg-gradient-to-r from-[#BA68C8] to-[#FF80AB] hover:from-[#ab5ebd] hover:to-[#ff6da1] text-white rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
}
