import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { NotesScreen } from './components/NotesScreen';
import { CheckpointsScreen } from './components/CheckpointsScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { ExplanationScreen } from './components/ExplanationScreen';
import { generateCheckpoints } from './utils/generateCheckpoints';
import { LearningSession } from './types';


export default App;

import type { Checkpoint } from './types';

export interface CheckpointsScreenProps {
  onBack: () => void;
  onRestart: () => void;
  onFeedback: () => void;
  checkpoints: Checkpoint[];
  notes: string;
  isDark: boolean;
  onToggleDark: () => void;
  onDontKnow: (checkpointId: number) => void;
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [session, setSession] = useState<LearningSession>({
    notes: '',
    checkpoints: [],
    currentStep: 'home',
    currentCheckpointId: undefined
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Simple hash-based preview routes for quick dev previews
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === '/feedback' || hash === 'feedback') {
      setSession(prev => ({ ...prev, currentStep: 'feedback' }));
    }
    if (hash === '/checkpoints' || hash === 'checkpoints') {
      setSession(prev => ({ ...prev, currentStep: 'checkpoints' }));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const handleStartLearning = () => {
    setSession(prev => ({ ...prev, currentStep: 'notes' }));
  };

  const handleNotesSubmit = (notes: string) => {
    const checkpoints = generateCheckpoints(notes);
    setSession(prev => ({
      ...prev,
      notes,
      checkpoints,
      currentStep: 'checkpoints'
    }));
  };

  const handleBackToHome = () => {
    setSession({
      notes: '',
      checkpoints: [],
      currentStep: 'home'
    });
  };

  const handleBackToNotes = () => {
    setSession(prev => ({ ...prev, currentStep: 'notes' }));
  };

  const handleGoToFeedback = () => {
    setSession(prev => ({ ...prev, currentStep: 'feedback' }));
  };

  const handleBackFromFeedback = () => {
    setSession(prev => ({ ...prev, currentStep: 'checkpoints' }));
  };

  const handleDontKnow = (checkpointId: number) => {
    setSession(prev => ({
      ...prev,
      currentCheckpointId: checkpointId,
      currentStep: 'explanation'
    }));
  };

  const handleBackFromExplanation = () => {
    setSession(prev => ({
      ...prev,
      currentStep: 'checkpoints'
    }));
  };

  const handleUnderstood = () => {
    if (session.currentCheckpointId) {
      setSession(prev => ({
        ...prev,
        checkpoints: prev.checkpoints.map(cp => 
          cp.id === session.currentCheckpointId 
            ? { ...cp, completed: true, explanationRequested: true }
            : cp
        ),
        currentStep: 'checkpoints'
      }));
    }
  };

  const renderCurrentScreen = () => {
    switch (session.currentStep) {
      case 'home':
        return (
          <HomeScreen 
            onStartLearning={handleStartLearning} 
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        );
      case 'notes':
        return (
          <NotesScreen
            onBack={handleBackToHome}
            onNotesSubmit={handleNotesSubmit}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        );
      case 'checkpoints':
        return (
          <CheckpointsScreen
            onBack={handleBackToNotes}
            onRestart={handleBackToHome}
            onFeedback={handleGoToFeedback}
            checkpoints={session.checkpoints}
            notes={session.notes}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
            onDontKnow={handleDontKnow}
          />
        );
      case 'explanation':
        const checkpoint = session.checkpoints.find(cp => cp.id === session.currentCheckpointId);
        return checkpoint ? (
          <ExplanationScreen
            checkpoint={checkpoint}
            onBack={handleBackFromExplanation}
            onUnderstood={handleUnderstood}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        ) : null;
      case 'feedback':
        return (
          <FeedbackScreen
            onBack={handleBackFromFeedback}
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        );
      default:
        return (
          <HomeScreen 
            onStartLearning={handleStartLearning} 
            isDark={isDark}
            onToggleDark={toggleDarkMode}
          />
        );
    }
  };

  return (
    <div className="font-sans">
      {renderCurrentScreen()}
    </div>
  );
}

