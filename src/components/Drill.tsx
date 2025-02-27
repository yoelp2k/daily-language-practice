import React, { useState } from 'react';
import { DrillProps, DrillState } from '../types';
import './Drill.css';

const Drill: React.FC<DrillProps> = ({ exercises, description, footer }) => {
  const [state, setState] = useState<DrillState>({
    answers: exercises.map(() => ''),
    submitted: exercises.map(() => false),
    isCorrect: exercises.map(() => false)
  });

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...state.answers];
    newAnswers[index] = value;
    setState({ ...state, answers: newAnswers });
  };

  const handleSubmit = (index: number) => {
    const isCorrect = state.answers[index].toLowerCase().trim() === 
      exercises[index].answer.toLowerCase().trim();
    
    const newSubmitted = [...state.submitted];
    const newIsCorrect = [...state.isCorrect];
    
    newSubmitted[index] = true;
    newIsCorrect[index] = isCorrect;
    
    setState({
      ...state,
      submitted: newSubmitted,
      isCorrect: newIsCorrect
    });
  };

  return (
    <div className="drill">
      <div className="drill-description">{description}</div>
      
      <div className="exercises-list">
        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-item">
            <div className="exercise-question">
              {exercise.question}
            </div>
            <div className="exercise-answer">
              <input
                type={exercise.type === 'true-false' ? 'checkbox' : 'text'}
                value={state.answers[index]}
                onChange={(e) => handleAnswerChange(index, 
                  exercise.type === 'true-false' ? e.target.checked.toString() : e.target.value
                )}
                disabled={state.submitted[index]}
              />
              <button 
                onClick={() => handleSubmit(index)}
                disabled={state.submitted[index]}
              >
                Verificar
              </button>
              {state.submitted[index] && (
                <span className="result">
                  {state.isCorrect[index] ? '✅' : '❌'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="drill-footer">{footer}</div>
    </div>
  );
};

export default Drill;
