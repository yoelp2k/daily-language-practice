export type ExerciseType = 'free-text' | 'true-false' | 'selection' | 'unseen';

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
  title: string;      // Supports Markdown
  description: string; // Supports Markdown
  exercises: Exercise[];
  footer?: string;     // Supports Markdown
}

export interface DrillState {
  currentExerciseIndex: number;
  userAnswers: {
    [key: number]: string[];
  };
  isCorrect: {
    [key: number]: boolean[];
  };
}
