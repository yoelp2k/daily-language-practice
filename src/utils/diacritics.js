/**
 * Removes diacritical marks (accent marks) from a string
 * @param {string} text - The text to process
 * @return {string} Text without diacritical marks
 */
export const removeDiacritics = (text) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Checks if two strings are identical when ignoring diacritics
 * @param {string} text1 - First text to compare
 * @param {string} text2 - Second text to compare
 * @return {boolean} True if texts match ignoring diacritics
 */
export const compareIgnoringDiacritics = (text1, text2) => {
  return removeDiacritics(text1.toLowerCase()) === removeDiacritics(text2.toLowerCase());
};
