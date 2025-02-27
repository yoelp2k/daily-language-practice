export enum ExerciseType {
  FREE_TEXT = 'free-text',
  TRUE_FALSE = 'true-false',
  SELECTION = 'selection',
  UNSEEN = 'unseen'
}

export interface Answer {
  correct: string;
  type: ExerciseType;
  options?: string[];
}

export interface Exercise {
  question: string;
  answers: Answer[];
}

export interface DrillProps {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  footer?: string; // Make footer optional since it can be undefined
}
