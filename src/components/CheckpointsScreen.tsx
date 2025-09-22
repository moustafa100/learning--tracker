import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Circle, Bot, Trophy, RotateCcw } from 'lucide-react';
import { Checkpoint } from '../types';
import { DarkModeToggle } from './DarkModeToggle';
import { ProgressSidebar } from './ProgressSidebar';
import { ChatBubble } from './ChatBubble';

interface CheckpointsScreenProps {
  onBack: () => void;
  onRestart: () => void;
  onFeedback?: () => void;
  checkpoints: Checkpoint[];
  notes: string;
  isDark: boolean;
  onToggleDark: () => void;
  onDontKnow: (id: number) => void; // <-- Add this line
}

export const CheckpointsScreen: React.FC<CheckpointsScreenProps> = ({ 
  onBack, 
  onRestart, 
  onFeedback,
  checkpoints: initialCheckpoints,
  notes,
  isDark,
  onToggleDark,
  onDontKnow // <-- Add this line
}) => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(initialCheckpoints);
  
  const toggleCheckpoint = (id: number) => {
    setCheckpoints(prev => 
      prev.map(checkpoint => 
        checkpoint.id === id 
          ? { ...checkpoint, completed: !checkpoint.completed }
          : checkpoint
      )
    );
  };

  const completedCount = checkpoints.filter(cp => cp.completed).length;
  const totalCount = checkpoints.length;
  const progress = (completedCount / totalCount) * 100;
  const isAllCompleted = completedCount === totalCount;

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
      <div className="max-w-7xl mx-auto flex gap-6">
        <ProgressSidebar
          isDark={isDark}
          steps={[
            { id: 1, label: 'Welcome', completed: true },
            { id: 2, label: 'Notes', completed: true },
            { id: 3, label: 'Checkpoints', completed: completedCount > 0 },
            { id: 4, label: 'Practice', completed: false },
            { id: 5, label: 'Review', completed: false },
            { id: 6, label: 'Mastery', completed: isAllCompleted }
          ]}
        />

        <div className="flex-1">
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
            Back to Notes
          </button>
          <div className="text-center">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>Learning Checkpoints</h1>
            <p className={`transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {completedCount} of {totalCount} completed
            </p>
          </div>
          <button
            onClick={onRestart}
            className={`flex items-center gap-2 transition-colors duration-300 ${
              isDark 
                ? 'text-slate-400 hover:text-slate-200' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <RotateCcw size={16} />
            New Session
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-800/90 border border-slate-700' 
              : 'bg-white/80 border border-amber-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-semibold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>Progress</span>
              <span className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>{Math.round(progress)}%</span>
            </div>
            <div className={`w-full rounded-full h-3 overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-slate-700' : 'bg-amber-100'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                    : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            {isAllCompleted && (
              <div className={`mt-4 flex items-center gap-2 transition-colors duration-300 ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                <Trophy size={20} />
                <span className="font-semibold">Congratulations! You've completed all checkpoints!</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat-style Checkpoints */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
              isDark 
                ? 'bg-slate-800/90 border border-slate-700' 
                : 'bg-white/80 border border-amber-100'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700' 
                    : 'bg-gradient-to-br from-emerald-200 to-teal-300'
                }`}>
                  <Bot size={20} className={isDark ? 'text-white' : 'text-slate-700'} />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>Your Learning Path</h2>
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>Click checkboxes as you understand each concept</p>
                </div>
              </div>
              <div className="space-y-3">
                <ChatBubble role="assistant" isDark={isDark}>
                  Welcome back! Ready to break your notes into a learning path?
                </ChatBubble>
                {checkpoints.map((checkpoint, index) => (
                  <div key={checkpoint.id} className="space-y-2">
                    <ChatBubble role="assistant" isDark={isDark}>
                      <div className="font-semibold mb-1">Checkpoint {index + 1}: {checkpoint.title}</div>
                      <div className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{checkpoint.description}</div>
                    </ChatBubble>
                    <div className="flex gap-2 justify-end mt-2">
                      <button
                        onClick={() => toggleCheckpoint(checkpoint.id)}
                        className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 border transition-colors ${
                          checkpoint.completed
                            ? isDark
                              ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : isDark
                              ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {checkpoint.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                        {checkpoint.completed ? 'Completed' : 'Mark complete'}
                      </button>
                      {/* Add "I Don't Know" button */}
                      <button
                        onClick={() => onDontKnow(checkpoint.id)}
                        className="px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 border bg-amber-600 hover:bg-amber-700 text-white border-amber-300"
                      >
                        I Don't Know
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Original Notes */}
          <div className="space-y-6">
            <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
              isDark 
                ? 'bg-slate-800/90 border border-slate-700' 
                : 'bg-white/80 border border-amber-100'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>Your Original Notes</h3>
              <div className={`rounded-xl p-4 transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-700 border border-slate-600' 
                  : 'bg-amber-50 border border-amber-200'
              }`}>
                <p className={`text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  {notes}
                </p>
              </div>
            </div>

            <div className={`rounded-2xl p-6 transition-colors duration-300 ${
              isDark 
                ? 'bg-blue-900/30 border border-blue-800' 
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                isDark ? 'text-blue-300' : 'text-blue-800'
              }`}>🎯 Feynman Technique</h3>
              <div className={`space-y-2 text-sm transition-colors duration-300 ${
                isDark ? 'text-blue-200' : 'text-blue-700'
              }`}>
                <p><strong>1. Study:</strong> Learn the concept</p>
                <p><strong>2. Teach:</strong> Explain it simply</p>
                <p><strong>3. Identify:</strong> Find gaps in understanding</p>
                <p><strong>4. Review:</strong> Go back and fill the gaps</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => onFeedback && onFeedback()}
                className={`px-4 py-2 rounded-full font-medium ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Give human feedback
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};