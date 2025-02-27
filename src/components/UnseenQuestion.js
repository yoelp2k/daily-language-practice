import React, { useState } from 'react';

const UnseenQuestion = ({ question, answers }) => {
  const [userAnswers, setUserAnswers] = useState(Array(answers.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <p>
        {question.split('___').map((part, index) => (
          <span key={index}>
            {part}
            {index < answers.length && (
              answers[index].type === 'free-text' ? (
                <input
                  type="text"
                  value={userAnswers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={isSubmitted}
                />
              ) : (
                <select
                  value={userAnswers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={isSubmitted}
                >
                  <option value="">Select</option>
                  {answers[index].options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              )
            )}
          </span>
        ))}
      </p>
      <button onClick={handleSubmit} disabled={isSubmitted}>Submit</button>
      {isSubmitted && (
        <div>
          {answers.map((answer, index) => (
            <p key={index}>
              {userAnswers[index] === answer.correct ? '✅' : '❌'} {answer.correct}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnseenQuestion;
