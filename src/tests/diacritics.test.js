import { removeDiacritics, compareIgnoringDiacritics } from '../utils/diacritics';

describe('Diacritics utilities', () => {
  describe('removeDiacritics', () => {
    test('removes accent marks from letters', () => {
      expect(removeDiacritics('três')).toBe('tres');
      expect(removeDiacritics('café')).toBe('cafe');
      expect(removeDiacritics('São Paulo')).toBe('Sao Paulo');
      expect(removeDiacritics('mañana')).toBe('manana');
      expect(removeDiacritics('crème')).toBe('creme');
      expect(removeDiacritics('façade')).toBe('facade');
      expect(removeDiacritics('über')).toBe('uber');
    });

    test('handles empty strings', () => {
      expect(removeDiacritics('')).toBe('');
    });

    test('leaves normal text unchanged', () => {
      expect(removeDiacritics('hello world')).toBe('hello world');
      expect(removeDiacritics('123')).toBe('123');
    });
  });

  describe('compareIgnoringDiacritics', () => {
    test('correctly compares words with and without diacritics', () => {
      expect(compareIgnoringDiacritics('tres', 'três')).toBe(true);
      expect(compareIgnoringDiacritics('cafe', 'café')).toBe(true);
      expect(compareIgnoringDiacritics('manana', 'mañana')).toBe(true);
      expect(compareIgnoringDiacritics('uber', 'über')).toBe(true);
    });

    test('still returns false for different words', () => {
      expect(compareIgnoringDiacritics('hello', 'hola')).toBe(false);
      expect(compareIgnoringDiacritics('cafe', 'coffee')).toBe(false);
    });

    test('handles case differences', () => {
      expect(compareIgnoringDiacritics('TRES', 'três')).toBe(true);
      expect(compareIgnoringDiacritics('Cafe', 'CAFÉ')).toBe(true);
    });
  });
});
