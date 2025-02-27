import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drill from '../../Drill';

// This test focuses specifically on the diacritics comparison integration
describe('Diacritics integration in the Drill component', () => {
  const testCases = [
    { userInput: 'tres', expectedAnswer: 'três', feedbackType: 'Almost' },
    { userInput: 'três', expectedAnswer: 'três', feedbackType: 'Correct!' },
    { userInput: 'cafe', expectedAnswer: 'café', feedbackType: 'Almost' },
    { userInput: 'manana', expectedAnswer: 'mañana', feedbackType: 'Almost' },
    { userInput: 'treis', expectedAnswer: 'três', feedbackType: 'Incorrect' }
  ];
  
  // Create mock props for testing different scenarios
  const createMockPropsWithAnswer = (answer) => ({
    questions: [{
      id: 1,
      question: `Test question for ${answer}`,
      answer: answer,
      options: [answer, answer.replace(/[\u0300-\u036f]/g, ''), 'wrong']
    }]
  });
  
  testCases.forEach(({ userInput, expectedAnswer, feedbackType }) => {
    test(`correctly handles "${userInput}" when correct answer is "${expectedAnswer}"`, () => {
      const mockProps = createMockPropsWithAnswer(expectedAnswer);
      render(<Drill {...mockProps} />);
      
      // Find the input field
      const input = screen.getByTestId('answer-input');
      
      // Type the test input
      fireEvent.change(input, { target: { value: userInput } });
      fireEvent.submit(screen.getByRole('form'));
      
      // Check for the expected feedback
      expect(screen.getByTestId('feedback')).toHaveTextContent(feedbackType);
      
      // Check for comparison display only when feedback is "Almost"
      if (feedbackType === 'Almost') {
        const comparisonElement = screen.getByTestId('word-comparison');
        expect(comparisonElement).toBeInTheDocument();
      } else {
        // No comparison for Correct or Incorrect
        expect(screen.queryByTestId('word-comparison')).not.toBeInTheDocument();
      }
    });
  });
  
  // Test that the comparison handles words of different lengths correctly
  test('handles words of different lengths in comparison', () => {
    const mockProps = {
      questions: [{
        id: 1,
        question: 'Test question for length differences',
        answer: 'mañana', // 6 characters
        options: ['manana', 'mañana', 'mananaaa'] // the last is longer
      }]
    };
    
    render(<Drill {...mockProps} />);
    const input = screen.getByTestId('answer-input');
    
    // Try with shorter word
    fireEvent.change(input, { target: { value: 'mana' } }); // 4 characters
    fireEvent.submit(screen.getByRole('form'));
    
    // Should be marked incorrect, not almost
    expect(screen.getByTestId('feedback')).toHaveTextContent('Incorrect');
    
    // Try with exact match without diacritics
    fireEvent.change(input, { target: { value: 'manana' } }); 
    fireEvent.submit(screen.getByRole('form'));
    
    // Should be marked "Almost"
    expect(screen.getByTestId('feedback')).toHaveTextContent('Almost');
    expect(screen.getByTestId('word-comparison')).toBeInTheDocument();
  });
});
