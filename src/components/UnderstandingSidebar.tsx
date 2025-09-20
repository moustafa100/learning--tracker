import React, { useMemo } from 'react';
import { Brain } from 'lucide-react';
import { CheckpointsModel } from './CheckpointEditor';

interface UnderstandingSidebarProps {
  model: CheckpointsModel;
  isDark: boolean;
}

type Level = 'Novice' | 'Emerging' | 'Proficient' | 'Mastered';

interface ScoredCheckpoint {
  index: number;
  level: Level;
  score: number; // 0..100
}

const toLevel = (score: number): Level => {
  if (score >= 85) return 'Mastered';
  if (score >= 65) return 'Proficient';
  if (score >= 40) return 'Emerging';
  return 'Novice';
};

const levelColor = (level: Level, isDark: boolean) => {
  switch (level) {
    case 'Mastered':
      return isDark ? 'text-emerald-300' : 'text-emerald-700';
    case 'Proficient':
      return isDark ? 'text-green-300' : 'text-green-700';
    case 'Emerging':
      return isDark ? 'text-yellow-300' : 'text-yellow-700';
    case 'Novice':
    default:
      return isDark ? 'text-orange-300' : 'text-orange-700';
  }
};

export const UnderstandingSidebar: React.FC<UnderstandingSidebarProps> = ({ model, isDark }) => {
  const scored = useMemo<ScoredCheckpoint[]>(() => {
    const checkpoints = model.checkpoints || [];
    return checkpoints.map((cp, idx) => {
      const answer = (cp.answer || '').trim();
      const base = Math.min(60, Math.floor(answer.length / 6)); // up to 60 pts for length/coverage
      const criteriaMatches = (cp.criteria || []).reduce((acc, crit) => {
        const c = (crit || '').toLowerCase();
        if (!c) return acc;
        return acc + (answer.toLowerCase().includes(c.split(' ').slice(0, 3).join(' ')) ? 1 : 0);
      }, 0);
      const criteriaTotal = Math.max(1, (cp.criteria || []).length);
      const criteriaScore = Math.round((criteriaMatches / criteriaTotal) * 40); // up to 40 pts
      const score = Math.max(0, Math.min(100, base + criteriaScore));
      return { index: idx, level: toLevel(score), score };
    });
  }, [model]);

  const overallScore = useMemo(() => {
    if (scored.length === 0) return 0;
    return Math.round(scored.reduce((s, x) => s + x.score, 0) / scored.length);
  }, [scored]);

  const overallLevel = toLevel(overallScore);

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className={`sticky top-6 rounded-2xl p-4 shadow transition-colors duration-300 ${
        isDark ? 'bg-slate-800/90 border border-slate-700' : 'bg-white/80 border border-amber-100'
      }`}>
        <div className="mb-3 flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full grid place-items-center ${
            isDark ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-gradient-to-br from-emerald-200 to-teal-300'
          }`}>
            <Brain size={16} className={isDark ? 'text-white' : 'text-slate-700'} />
          </div>
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Understanding</div>
        </div>

        <div className={`mb-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Overall: <span className={`font-semibold ${levelColor(overallLevel, isDark)}`}>{overallLevel}</span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'
          }`}>{overallScore}%</span>
        </div>

        <ul className="space-y-3">
          {scored.map((s) => (
            <li key={s.index} className={`rounded-xl p-3 border transition-colors ${
              isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/70 border-amber-100'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Checkpoint {s.index + 1}</span>
                <span className={`font-semibold ${levelColor(s.level, isDark)}`}>{s.level}</span>
              </div>
              <div className={`mt-2 w-full h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-amber-100'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    s.score >= 85
                      ? isDark ? 'bg-emerald-500' : 'bg-emerald-500'
                      : s.score >= 65
                        ? isDark ? 'bg-green-500' : 'bg-green-500'
                        : s.score >= 40
                          ? isDark ? 'bg-yellow-500' : 'bg-yellow-500'
                          : isDark ? 'bg-orange-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default UnderstandingSidebar;


