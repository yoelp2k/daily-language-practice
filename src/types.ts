export type ExerciseType = 'free-text' | 'true-false' | 'selection' | 'unseen';

export interface Exercise {
  question: string;
  answer: string;
  type: ExerciseType;
}

export interface DrillProps {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  footer: string;
}

export interface DrillState {
  answers: string[];
  submitted: boolean[];
  isCorrect: boolean[];
}
