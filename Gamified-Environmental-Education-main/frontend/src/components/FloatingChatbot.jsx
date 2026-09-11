import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

// Enhanced CSS animations and styles
const floatingStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-8px) rotate(1deg);
    }
    50% {
      transform: translateY(-12px) rotate(0deg);
    }
    75% {
      transform: translateY(-8px) rotate(-1deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 6px 20px rgba(16,185,129,0.4);
    }
    50% {
      box-shadow: 0 8px 30px rgba(16,185,129,0.6);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes messageSlide {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .floating-bot {
    animation: float 4s ease-in-out infinite, pulse 3s ease-in-out infinite;
  }
  
  .floating-bot:hover {
    animation-play-state: paused;
    transform: scale(1.1);
  }
  
  .chat-modal {
    animation: slideIn 0.3s ease-out;
  }
  
  .message-animate {
    animation: messageSlide 0.3s ease-out;
  }
  
  .typing-indicator {
    display: inline-block;
    animation: pulse 1.5s ease-in-out infinite;
  }
`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm EcoBot 🤖, your friendly environmental assistant. How can I help you today? 🌱",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const botResponses = [
    "That's a fantastic question! 🌍 I'd be delighted to help you with environmental tips and sustainable practices.",
    "Sustainability is absolutely crucial! 🌱 Let me share some valuable insights and actionable steps with you.",
    "I love discussing eco-friendly solutions! 💚 What specific environmental area would you like to explore?",
    "Thank you for caring about our beautiful planet! 🌎 Here are my recommendations for making a positive impact...",
    "Wonderful! Every small action creates ripples of change for our environment. ♻️ Keep up the great work!",
    "Excellent question about environmental conservation! 🌿 Here are some practical tips to get you started...",
    "I'm here to help you become a true eco-champion! 🏆 What aspect of sustainability interests you most?",
    "Protecting our planet is everyone's responsibility! 🌊 I'm excited to guide you on this green journey.",
    "Amazing! Your environmental consciousness is inspiring! 🌟 Let's explore some eco-friendly solutions together.",
    "Perfect timing for this question! 🕒 Environmental action is more important than ever. Here's what I suggest..."
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: floatingStyles }} />
      
      {/* Floating Bot Button */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={toggleChat}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isOpen ? 'rotate-180' : 'floating-bot'
          }`}
          style={{ 
            background: 'linear-gradient(135deg, #10b981, #06b6d4)', 
            color: '#fff', 
            border: '3px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 30px rgba(16,185,129,0.5)'
          }}
        >
          {isOpen ? <X size={24} /> : '🤖'}
        </button>
        
        {/* Notification Badge */}
        {!isOpen && (
          <div 
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
            style={{ 
              background: 'linear-gradient(135deg, #ef4444, #dc2626)', 
              color: '#fff',
              boxShadow: '0 2px 8px rgba(239,68,68,0.4)'
            }}
          >
            💬
          </div>
        )}
      </div>

      {/* Chat Window - Modal overlay when open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
          <div
            className="w-full max-w-md h-[500px] rounded-3xl shadow-2xl border overflow-hidden chat-modal"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,253,244,0.95))', 
              borderColor: 'rgba(22,163,74,0.3)',
              boxShadow: '0 25px 50px rgba(22,163,74,0.2)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: '#ffffff' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl animate-pulse" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-lg">EcoBot</h3>
                  <p className="text-sm opacity-90">🟢 Online • Ready to help!</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200 hover:rotate-90"
                style={{ color: '#ffffff' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 h-80 overflow-y-auto p-4 space-y-4"
              style={{ background: 'rgba(16,185,129,0.02)' }}
            >
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} message-animate`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg transition-all duration-200 hover:shadow-xl ${
                      message.isUser
                        ? 'rounded-br-md'
                        : 'rounded-bl-md'
                    }`}
                    style={{
                      background: message.isUser 
                        ? 'linear-gradient(135deg, #10b981, #06b6d4)' 
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,253,244,0.9))',
                      color: message.isUser ? '#fff' : 'var(--text)',
                      border: message.isUser ? 'none' : '2px solid rgba(22,163,74,0.15)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start message-animate">
                  <div
                    className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md text-sm shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,253,244,0.9))',
                      color: 'var(--text)',
                      border: '2px solid rgba(22,163,74,0.15)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>EcoBot is typing</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full typing-indicator" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full typing-indicator" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full typing-indicator" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className="p-4 border-t"
              style={{ 
                background: 'rgba(16,185,129,0.05)', 
                borderColor: 'rgba(22,163,74,0.1)' 
              }}
            >
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about sustainability... 🌱"
                  className="flex-1 px-4 py-3 text-sm border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  style={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: 'rgba(22,163,74,0.2)', 
                    color: 'var(--text)' 
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  style={{
                    background: inputMessage.trim() 
                      ? 'linear-gradient(135deg, #10b981, #06b6d4)' 
                      : 'rgba(22,163,74,0.3)',
                    color: '#fff'
                  }}
                  disabled={!inputMessage.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
