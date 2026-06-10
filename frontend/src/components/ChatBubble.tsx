'use client';

import { useEffect, useState } from 'react';

interface ChatBubbleProps {
  message: string;
  isAI?: boolean;
  delay?: number;
  children?: React.ReactNode;
}

export default function ChatBubble({ message, isAI = true, delay = 0, children }: ChatBubbleProps) {
  const [visible, setVisible] = useState(delay === 0);
  const [showTyping, setShowTyping] = useState(delay > 0 && isAI);

  useEffect(() => {
    if (delay > 0) {
      const typingTimer = setTimeout(() => {
        setShowTyping(false);
        setVisible(true);
      }, delay);
      return () => clearTimeout(typingTimer);
    }
  }, [delay]);

  if (showTyping && isAI) {
    return (
      <div className="flex justify-start mb-4 animate-fade-in">
        <div className="chat-bubble-ai px-5 py-4 max-w-xs">
          <div className="flex gap-1.5">
            <div className="typing-dot w-2 h-2 rounded-full bg-sage"></div>
            <div className="typing-dot w-2 h-2 rounded-full bg-sage"></div>
            <div className="typing-dot w-2 h-2 rounded-full bg-sage"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!visible) return null;

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      {isAI && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sage to-deep-green flex items-center justify-center mr-3 mt-1">
          <span className="text-white text-xs">🍵</span>
        </div>
      )}
      <div className={`${isAI ? 'chat-bubble-ai' : 'chat-bubble-user'} px-5 py-4 max-w-sm`}>
        <p className={`text-sm leading-relaxed ${isAI ? 'text-gray-700' : 'text-white'}`}>
          {message}
        </p>
        {children}
      </div>
    </div>
  );
}
