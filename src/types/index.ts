export interface Checkpoint {
  id: number;
  title: string;
  description: string;
  completed: boolean;
<<<<<<< HEAD
  // Add new field to track if user requested explanation
  explanationRequested?: boolean;
=======
>>>>>>> 33fcb692ce54c984ca628fbd0b7a16a6b80b0943
}

export interface LearningSession {
  notes: string;
  checkpoints: Checkpoint[];
<<<<<<< HEAD
  currentStep: 'home' | 'notes' | 'processing' | 'checkpoints' | 'explanation' | 'feedback';
  // Add field to track which checkpoint needs explanation
  currentCheckpointId?: number;
=======
  currentStep: 'home' | 'notes' | 'processing' | 'checkpoints' | 'feedback';
>>>>>>> 33fcb692ce54c984ca628fbd0b7a16a6b80b0943
}