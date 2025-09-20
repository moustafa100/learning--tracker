import React from 'react';

interface ChatBubbleProps {
  role: 'assistant' | 'user' | 'system';
  children: React.ReactNode;
  isDark: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, children, isDark }) => {
  const isAssistant = role === 'assistant' || role === 'system';

  return (
    <div className={`w-full flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm md:text-base shadow-sm transition-colors duration-300 ${
          isAssistant
            ? isDark
              ? 'bg-sky-900/40 text-slate-100 border border-sky-800'
              : 'bg-sky-50 text-slate-800 border border-sky-200'
            : isDark
              ? 'bg-slate-700 text-slate-100 border border-slate-600'
              : 'bg-white text-slate-800 border border-slate-200'
        }`}
      >
        {children}
      </div>
    </div>
  );
};


