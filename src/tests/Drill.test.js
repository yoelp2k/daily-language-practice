import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drill from '../Drill';
import { compareIgnoringDiacritics } from '../utils/diacritics';

// Mock the component's props
const mockProps = {
  questions: [
    {
      id: 1,
      question: 'How do you say "three" in Portuguese?',
      answer: 'três',
      options: ['tres', 'três', 'treis', 'trez']
    },
    {
      id: 2,
      question: 'How do you say "coffee" in Portuguese?',
      answer: 'café',
      options: ['cafe', 'café', 'cafei', 'caffe']
    }
  ]
};

// Test the internal functions directly
describe('Diacritics utilities', () => {
  test('compareIgnoringDiacritics correctly identifies similar words', () => {
    expect(compareIgnoringDiacritics('tres', 'três')).toBe(true);
    expect(compareIgnoringDiacritics('cafe', 'café')).toBe(true);
    expect(compareIgnoringDiacritics('lapis', 'lápis')).toBe(true);
    expect(compareIgnoringDiacritics('hello', 'hola')).toBe(false);
  });
  
  // We now test the checkAlmostCorrect indirectly through component interaction
});

// Test the component rendering and behavior
describe('Drill component', () => {
  test('renders without crashing', () => {
    render(<Drill {...mockProps} />);
    expect(screen.getByText(/How do you say/)).toBeInTheDocument();
  });
  
  test('shows "Almost" feedback for answers missing diacritics', () => {
    render(<Drill {...mockProps} />);
    
    // Find the input field
    const input = screen.getByTestId('answer-input');
    
    // Type an answer without diacritics
    fireEvent.change(input, { target: { value: 'tres' } });
    fireEvent.submit(screen.getByRole('form'));
    
    // Check if the "Almost" feedback is shown
    expect(screen.getByTestId('feedback')).toHaveTextContent('Almost');
    
    // Check if the word comparison is displayed
    const comparisonElement = screen.getByTestId('word-comparison');
    expect(comparisonElement).toBeInTheDocument();
    
    // Check for user answer and correct answer in the comparison
    expect(comparisonElement.querySelector('.user-answer')).toHaveTextContent('tres');
    expect(comparisonElement.querySelector('.correct-answer')).toHaveTextContent('três');
  });
  
  test('shows "Correct" feedback for exact matches', () => {
    render(<Drill {...mockProps} />);
    
    const input = screen.getByTestId('answer-input');
    
    // Type the exact answer with diacritics
    fireEvent.change(input, { target: { value: 'três' } });
    fireEvent.submit(screen.getByRole('form'));
    
    // Check if the "Correct" feedback is shown
    expect(screen.getByTestId('feedback')).toHaveTextContent('Correct!');
    
    // Check that the word comparison is NOT displayed
    expect(screen.queryByTestId('word-comparison')).not.toBeInTheDocument();
  });
  
  test('shows "Incorrect" feedback for wrong answers', () => {
    render(<Drill {...mockProps} />);
    
    const input = screen.getByTestId('answer-input');
    
    // Type a completely wrong answer
    fireEvent.change(input, { target: { value: 'quatro' } });
    fireEvent.submit(screen.getByRole('form'));
    
    // Check if the "Incorrect" feedback is shown
    expect(screen.getByTestId('feedback')).toHaveTextContent('Incorrect');
    
    // Check that the word comparison is NOT displayed
    expect(screen.queryByTestId('word-comparison')).not.toBeInTheDocument();
  });
});
