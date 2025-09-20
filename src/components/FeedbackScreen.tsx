import React, { useMemo, useState } from 'react';
import { ArrowLeft, Save, Bot } from 'lucide-react';
import CheckpointEditor, { CheckpointsModel } from './CheckpointEditor';
import { DarkModeToggle } from './DarkModeToggle';
import { ProgressSidebar } from './ProgressSidebar';
import { UnderstandingSidebar } from './UnderstandingSidebar';

interface FeedbackScreenProps {
  onBack: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  initialModel?: CheckpointsModel;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  onBack,
  isDark,
  onToggleDark,
  initialModel
}) => {
  const defaultModel: CheckpointsModel = useMemo(
    () =>
      initialModel ?? {
        checkpoints: [
          { description: 'Understand core concept', criteria: ['Explain simply'], verification: 'Teach back' }
        ]
      },
    [initialModel]
  );

  const [model, setModel] = useState<CheckpointsModel>(defaultModel);

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
            { id: 3, label: 'Checkpoints', completed: true },
            { id: 4, label: 'Feedback', completed: false },
            { id: 5, label: 'Review', completed: false },
            { id: 6, label: 'Mastery', completed: false }
          ]}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className={`flex items-center gap-2 transition-colors duration-300 ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="text-center">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Human Feedback</h1>
              <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Refine checkpoints before practice</p>
            </div>
            <button
              onClick={() => console.log('save', model)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <Save size={16} />
              Save
            </button>
          </div>

          <div className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
            isDark ? 'bg-slate-800/90 border border-slate-700' : 'bg-white/80 border border-amber-100'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full grid place-items-center ${
                isDark ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-gradient-to-br from-emerald-200 to-teal-300'
              }`}>
                <Bot size={20} className={isDark ? 'text-white' : 'text-slate-700'} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Refine the plan</h2>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Edit, add, or remove checkpoints</p>
              </div>
            </div>

            <CheckpointEditor checkpointsModel={model} onUpdate={setModel} />

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => console.log('answers', model)}
                className={`px-4 py-2 rounded-full font-medium ${
                  isDark ? 'bg-emerald-700 hover:bg-emerald-600 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                Save feedback & answers
              </button>
            </div>
          </div>
        </div>

        <UnderstandingSidebar model={model} isDark={isDark} />
      </div>
    </div>
  );
};

export default FeedbackScreen;


