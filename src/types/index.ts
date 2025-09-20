export interface Checkpoint {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface LearningSession {
  notes: string;
  checkpoints: Checkpoint[];
  currentStep: 'home' | 'notes' | 'processing' | 'checkpoints' | 'feedback';
}