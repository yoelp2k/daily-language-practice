import React, { useState } from 'react';
import { compareIgnoringDiacritics } from './utils/diacritics';
import './Drill.css';

// Your existing Drill component
function Drill({ questions }) {
  // State declarations
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  // Get the current question
  const question = questions && questions.length > 0 ? questions[currentQuestionIndex] : null;

  // Add this function to check for "almost correct" answers
  const checkAlmostCorrect = (userAnswer, correctAnswer) => {
    // Compare the user answer with the correct answer ignoring diacritics
    return compareIgnoringDiacritics(userAnswer, correctAnswer) && 
           userAnswer.toLowerCase() !== correctAnswer.toLowerCase();
  };

  // Handle the user's answer submission
  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer(userAnswer);
  };

  // Handle input changes
  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  // Modify your answer checking logic
  const checkAnswer = (userAnswer) => {
    if (!question) return;
    
    const correctAnswer = question.answer;
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct!");
      // Other correct answer logic
      setShowComparison(false);
    } 
    else if (checkAlmostCorrect(userAnswer, correctAnswer)) {
      setFeedback("Almost");
      // Show the comparison
      setShowComparison(true);
    }
    else {
      setFeedback("Incorrect");
      // Other incorrect answer logic
      setShowComparison(false);
    }
  };

  // If no questions are available, show a message
  if (!question) {
    return <div className="drill">No questions available</div>;
  }

  return (
    <div className="drill">
      <h2>{question.question}</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Type your answer"
          data-testid="answer-input"
        />
        <button type="submit">Submit</button>
      </form>
      
      {feedback && <div className="answer" data-testid="feedback">{feedback}</div>}
      
      {feedback === "Almost" && showComparison && (
        <div className="word-comparison" data-testid="word-comparison">
          <div className="user-answer">
            {userAnswer.split('').map((char, i) => (
              <span key={`user-${i}`}>
                {char !== question.answer[i] ? <span className="diff-char">{char}</span> : char}
              </span>
            ))}
          </div>
          <div className="correct-answer">
            {question.answer.split('').map((char, i) => (
              <span key={`correct-${i}`}>
                {userAnswer[i] !== char ? <span className="diff-char">{char}</span> : char}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Drill;
