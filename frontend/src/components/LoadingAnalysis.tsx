'use client';

import { useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  'AI đang phân tích dấu ấn mùi hương của bạn...',
  'Đang tìm kiếm sự kết hợp hoàn hảo...',
  'Đang pha chế công thức riêng cho bạn...',
];

export default function LoadingAnalysis() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream via-blush/30 to-cream">
      <div className="text-center animate-fade-in">
        {/* Tea cup animation */}
        <div className="relative mb-8">
          <div className="text-6xl animate-float">🍵</div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-sage/40 rounded-full"
                  style={{
                    height: `${12 + i * 4}px`,
                    animation: `float ${1.5 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="loading-spinner mx-auto mb-6" />

        {/* Loading text */}
        <p className="text-tea-brown font-display text-lg italic animate-pulse-soft">
          {LOADING_MESSAGES[messageIndex]}
        </p>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sage/30"
              style={{
                animation: 'pulseSoft 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
