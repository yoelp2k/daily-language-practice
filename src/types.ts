export type ExerciseType = 'free-text' | 'true-false' | 'selection' | 'unseen';

export interface Exercise {
  question: string;  // Supports Markdown
  answer: string;    // Supports Markdown (validation is case-insensitive)
  type: ExerciseType;
  options?: string[];  // For selection-type exercises
}

export interface DrillProps {
  id: string;
  title: string;      // Supports Markdown
  description: string; // Supports Markdown
  exercises: Exercise[];
  footer?: string;     // Supports Markdown
}

export interface DrillState {
  answers: string[];
  submitted: boolean[];
  isCorrect: boolean[];
}
