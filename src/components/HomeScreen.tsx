import React from 'react';
import { Bot, Lightbulb, ArrowRight } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

interface HomeScreenProps {
  onStartLearning: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartLearning, isDark, onToggleDark }) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center p-4 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
      
      <div className="max-w-2xl w-full">
        <div className={`backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-800/90 border border-slate-700' 
            : 'bg-white/80 border border-amber-100'
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`w-32 h-32 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700' 
                    : 'bg-gradient-to-br from-emerald-200 to-teal-300'
                }`}>
                  <Bot size={64} className={isDark ? 'text-white' : 'text-slate-700'} />
                </div>
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ${
                  isDark ? 'bg-yellow-400' : 'bg-yellow-300'
                }`}>
                  <Lightbulb size={16} className={isDark ? 'text-slate-800' : 'text-slate-700'} />
                </div>
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              Feynman-style
              <br />
              <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>Teaching</span>
            </h1>
            
            <p className={`text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Learn with AI agents using the
              <br />
              <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Feynman technique</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={onStartLearning}
              className={`group font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2 mx-auto ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white' 
                  : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-800'
              }`}
            >
              Start Learning
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300 ${
                isDark ? 'bg-amber-900/50' : 'bg-amber-100'
              }`}>
                <span className="text-2xl">📝</span>
              </div>
              <p className={`font-medium transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>Add your notes</p>
            </div>
            <div className="text-center p-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300 ${
                isDark ? 'bg-emerald-900/50' : 'bg-emerald-100'
              }`}>
                <Bot size={24} className={isDark ? 'text-emerald-400' : 'text-emerald-700'} />
              </div>
              <p className={`font-medium transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>AI breaks it down</p>
            </div>
            <div className="text-center p-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300 ${
                isDark ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <span className="text-2xl">✓</span>
              </div>
              <p className={`font-medium transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>Learn step by step</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};