import React, { useState } from 'react';
import { Check, ArrowLeft, Bot } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

interface NotesScreenProps {
  onBack: () => void;
  onNotesSubmit: (notes: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({ onBack, onNotesSubmit, isDark, onToggleDark }) => {
  const [notes, setNotes] = useState('');
  const [showAIMessage, setShowAIMessage] = useState(false);

  const handleDone = () => {
    if (notes.trim()) {
      setShowAIMessage(true);
      setTimeout(() => {
        onNotesSubmit(notes);
      }, 2000);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 transition-colors duration-300 ${
              isDark 
                ? 'text-slate-400 hover:text-slate-200' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>Notes</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notes Input */}
          <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/90 border border-slate-700' 
              : 'bg-white/80 border border-amber-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>Your Notes</h2>
              <button
                onClick={handleDone}
                disabled={!notes.trim()}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  isDark 
                    ? 'bg-slate-700 hover:bg-slate-600 disabled:bg-slate-600 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white'
                }`}
              >
                <Check size={16} />
                Done
              </button>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes..."
              className={`w-full h-64 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-700 border border-slate-600 focus:ring-amber-500 placeholder-slate-400 text-white' 
                  : 'bg-amber-50 border border-amber-200 focus:ring-amber-400 placeholder-slate-400 text-slate-700'
              }`}
            />
            
            <div className={`mt-4 text-sm transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {notes.length}/1000 characters
            </div>
          </div>

          {/* AI Message */}
          <div className={`transition-all duration-500 ${showAIMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
              isDark 
                ? 'bg-emerald-900/30 border border-emerald-800' 
                : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700' 
                    : 'bg-gradient-to-br from-emerald-200 to-teal-300'
                }`}>
                  <Bot size={24} className={isDark ? 'text-white' : 'text-slate-700'} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    AI Analysis in Progress
                  </h3>
                  <p className={`leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    AI agents will now explain your notes and divide them into checkpoints
                  </p>
                  
                  {/* Loading animation */}
                  <div className="flex gap-1 mt-4">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      isDark ? 'bg-emerald-500' : 'bg-emerald-400'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      isDark ? 'bg-emerald-500' : 'bg-emerald-400'
                    }`} style={{animationDelay: '0.1s'}}></div>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      isDark ? 'bg-emerald-500' : 'bg-emerald-400'
                    }`} style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        {!showAIMessage && (
          <div className={`mt-8 rounded-xl p-6 transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/60 border border-slate-700' 
              : 'bg-white/60 border border-amber-100'
          }`}>
            <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>💡 Tips for better learning:</h3>
            <ul className={`space-y-2 transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <li>• Write in your own words</li>
              <li>• Include key concepts and examples</li>
              <li>• Don't worry about perfect formatting</li>
              <li>• Focus on understanding, not memorization</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};