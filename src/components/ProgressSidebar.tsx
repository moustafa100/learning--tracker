import React from 'react';
import { Check, Circle, BookOpen, MessageSquare, ListChecks, Cog } from 'lucide-react';

interface StepItem {
  id: number;
  label: string;
  completed: boolean;
}

interface ProgressSidebarProps {
  steps: StepItem[];
  isDark: boolean;
}

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({ steps, isDark }) => {
  return (
    <aside className={`hidden md:block w-64 flex-shrink-0`}> 
      <div className={`sticky top-6 rounded-2xl p-4 transition-colors duration-300 ${
        isDark ? 'bg-slate-800/90 border border-slate-700' : 'bg-white/80 border border-amber-100'
      }`}>
        <div className="mb-4">
          <div className={`flex items-center gap-2 font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <BookOpen size={18} />
            Progress
          </div>
        </div>

        <ol className="space-y-4">
          {steps.map(step => (
            <li key={step.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full grid place-items-center border-2 ${
                step.completed
                  ? isDark
                    ? 'bg-emerald-900/40 border-emerald-600'
                    : 'bg-emerald-50 border-emerald-400'
                  : isDark
                    ? 'bg-slate-700/50 border-slate-500'
                    : 'bg-white border-amber-200'
              }`}>
                {step.completed ? (
                  <Check size={16} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
                ) : (
                  <Circle size={16} className={isDark ? 'text-slate-400' : 'text-slate-400'} />
                )}
              </div>
              <span className={`${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{step.label}</span>
            </li>
          ))}
        </ol>

        <div className={`mt-6 text-xs flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <Cog size={14} />
          Module {steps.filter(s => s.completed).length}/{steps.length} Completed
        </div>
      </div>
    </aside>
  );
};


