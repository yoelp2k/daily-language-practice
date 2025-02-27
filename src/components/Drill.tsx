import React, { useState, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { DrillProps, DrillState, Answer } from '../types';
import './Drill.css';

const Drill: React.FC<DrillProps> = (props) => {
  const { exercises, title, description, footer } = props;

  const [state, setState] = useState<DrillState>({
    currentExerciseIndex: 0,
    userAnswers: {},
    isCorrect: {}
  });

  if (!exercises?.length) {
    return <div>No exercises available</div>;
  }

  const currentExercise = exercises[state.currentExerciseIndex];
  const currentAnswers = state.userAnswers[state.currentExerciseIndex] || Array(currentExercise.answers.length).fill('');
  const currentCorrect = state.isCorrect[state.currentExerciseIndex] || Array(currentExercise.answers.length).fill(false);

  const normalizeAnswer = (value: string): string => {
    const normalized = value.trim().toLowerCase();
    // Handle yes/no variations
    if (['yes', 'sim', 'y', 's'].includes(normalized)) return 'true';
    if (['no', 'não', 'nao', 'n'].includes(normalized)) return 'false';
    return normalized;
  };

  const validateAnswer = (index: number, value: string): boolean => {
    try {
      const answer = currentExercise.answers[index];
      const normalizedInput = normalizeAnswer(value);
      const normalizedCorrect = normalizeAnswer(answer.correct);
      
      const newIsCorrect = { ...state.isCorrect };
      if (!newIsCorrect[state.currentExerciseIndex]) {
        newIsCorrect[state.currentExerciseIndex] = Array(currentExercise.answers.length).fill(false);
      }
      
      newIsCorrect[state.currentExerciseIndex][index] = normalizedInput === normalizedCorrect;
      setState(prev => ({ ...prev, isCorrect: newIsCorrect }));

      return normalizedInput === normalizedCorrect;
    } catch (error) {
      console.error('Error validating answer:', error);
      return false;
    }
  };

  const handleChange = (index: number, value: string): void => {
    const newAnswers = { ...state.userAnswers };
    if (!newAnswers[state.currentExerciseIndex]) {
      newAnswers[state.currentExerciseIndex] = Array(currentExercise.answers.length).fill('');
    }
    newAnswers[state.currentExerciseIndex][index] = value;
    setState(prev => ({ ...prev, userAnswers: newAnswers }));

    // Validate immediately after typing
    validateAnswer(index, value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Enter') {
      validateAnswer(index, currentAnswers[index]);
    }
  };

  const goToNextExercise = () => {
    if (state.currentExerciseIndex < exercises.length - 1) {
      setState(prev => ({ ...prev, currentExerciseIndex: prev.currentExerciseIndex + 1 }));
    }
  };

  const goToPreviousExercise = () => {
    if (state.currentExerciseIndex > 0) {
      setState(prev => ({ ...prev, currentExerciseIndex: prev.currentExerciseIndex - 1 }));
    }
  };

  const renderInput = (index: number, answer: Answer): JSX.Element => {
    const value = currentAnswers[index] || '';
    
    if (answer.type === 'selection' && answer.options) {
      return (
        <select
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
        >
          <option value="">Select...</option>
          {answer.options.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    if (answer.type === 'true-false') {
      return (
        <select
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
        >
          <option value="">Select...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        placeholder="Type your answer..."
      />
    );
  };

  return (
    <div className="drill">
      <ReactMarkdown className="title">{title}</ReactMarkdown>
      <ReactMarkdown className="description">{description}</ReactMarkdown>
      <div className="exercise-navigation">
        <button 
          onClick={goToPreviousExercise}
          disabled={state.currentExerciseIndex === 0}
        >
          ←
        </button>
        <span>{state.currentExerciseIndex + 1} / {exercises.length}</span>
        <button 
          onClick={goToNextExercise}
          disabled={state.currentExerciseIndex === exercises.length - 1}
        >
          →
        </button>
      </div>
      <div className="exercise">
        <p>
          {currentExercise.question.split('___').map((part, index) => (
            <span key={index}>
              {part}
              {index < currentExercise.answers.length && (
                <span className="input-wrapper">
                  {renderInput(index, currentExercise.answers[index])}
                  {currentAnswers[index] && currentCorrect[index] && (
                    <span className="validation-marker correct">✓</span>
                  )}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
      {footer && <ReactMarkdown className="footer">{footer}</ReactMarkdown>}
    </div>
  );
};

export default Drill;
