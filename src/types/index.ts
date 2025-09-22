export interface Checkpoint {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  // Add new field to track if user requested explanation
  explanationRequested?: boolean;
}

export interface LearningSession {
  notes: string;
  checkpoints: Checkpoint[];
  currentStep: 'home' | 'notes' | 'processing' | 'checkpoints' | 'explanation' | 'feedback';
  // Add field to track which checkpoint needs explanation
  currentCheckpointId?: number;
}