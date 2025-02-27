import { getEvaluationEmoji, normalizeText, convertDiacritics } from '../utils/diacritics';
import { calculateSimilarity } from '../utils/stringUtils';

// ...existing code...

const evaluateAnswer = (userAnswer: string, correctAnswer: string): string => {
  // First try with diacritics conversion
  const withDiacritics = convertDiacritics(userAnswer.trim().toLowerCase());
  if (withDiacritics === correctAnswer.trim().toLowerCase()) {
    return getEvaluationEmoji('good');
  }

  // Then try normalized comparison (without diacritics)
  const normalizedUser = normalizeText(userAnswer);
  const normalizedCorrect = normalizeText(correctAnswer);
  
  if (normalizedUser === normalizedCorrect) {
    return getEvaluationEmoji('good');
  }

  // Finally check similarity
  const similarity = calculateSimilarity(normalizedUser, normalizedCorrect);
  console.log(`Similarity between "${normalizedUser}" and "${normalizedCorrect}": ${similarity}`);
  
  if (similarity >= 0.7) {
    return getEvaluationEmoji('so-so');
  }

  return getEvaluationEmoji('not-good');
};

// ...existing code...
