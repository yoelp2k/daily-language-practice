import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DrillProps } from '../types';
import './Drill.css';

const Drill: React.FC<DrillProps> = ({ title, description, exercises, footer }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [validated, setValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const exercise = exercises[currentExercise];

  const stripMarkdown = (str: string): string => {
    return str
      .replace(/\*\*([^*]+)\*\*/g, '$1') // remove bold
      .replace(/\*([^*]+)\*/g, '$1')     // remove italics
      .replace(/[_~`>#]/g, '')           // remove other markdown symbols
      .trim();
  };

  const checkAnswer = () => {
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = stripMarkdown(exercise.answer).toLowerCase();
    setIsCorrect(normalizedUser === normalizedCorrect);
    setValidated(true);
  };

  const handleNext = () => {
    setCurrentExercise(prev => (prev < exercises.length - 1 ? prev + 1 : prev));
    setUserAnswer('');
    setValidated(false);
    setIsCorrect(null);
  };

  const handlePrev = () => {
    setCurrentExercise(prev => (prev > 0 ? prev - 1 : prev));
    setUserAnswer('');
    setValidated(false);
    setIsCorrect(null);
  };

  return (
    <div className="drill">
      <h2><ReactMarkdown>{title}</ReactMarkdown></h2>
      <p className="description"><ReactMarkdown>{description}</ReactMarkdown></p>
      
      <div className="exercise">
        <h3>Exercise {currentExercise + 1} of {exercises.length}</h3>
        <div className="question">
          <ReactMarkdown>{exercise.question}</ReactMarkdown>
        </div>

        {exercise.type === 'true-false' ? (
          <div className="true-false-buttons">
            <button 
              className={userAnswer === 'true' ? "selected" : ""}
              onClick={() => setUserAnswer('true')}
            >
              True
            </button>
            <button 
              className={userAnswer === 'false' ? "selected" : ""}
              onClick={() => setUserAnswer('false')}
            >
              False
            </button>
          </div>
        ) : exercise.type === 'selection' ? (
          <div className="selection-options">
            {exercise.options?.map((option, index) => (
              <button
                key={index}
                className={userAnswer === option ? "selected" : ""}
                onClick={() => setUserAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
          />
        )}

        <div className="buttons">
          <button onClick={handlePrev} disabled={currentExercise === 0}>Prev</button>
          <button onClick={checkAnswer}>Check Answer</button>
          <button onClick={handleNext} disabled={currentExercise === exercises.length - 1}>Next</button>
        </div>

        {validated && (
          <div className="answer">
            {isCorrect ? (
              <strong style={{ color: 'green' }}>Correct!</strong>
            ) : (
              <span>
                <strong style={{ color: 'red' }}>Incorrect!</strong> The correct answer is: <ReactMarkdown>{exercise.answer}</ReactMarkdown>
              </span>
            )}
          </div>
        )}
      </div>

      {footer && (
        <div className="footer">
          <ReactMarkdown>{footer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Drill;
