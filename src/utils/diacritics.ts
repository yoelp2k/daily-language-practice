const diacriticsMap: { [key: string]: string } = {
  'ai': 'aí',
  'nao': 'não',
  'e': 'é',
  'voce': 'você',
  'esta': 'está',
  'ate': 'até',
  'ja': 'já',
  'tambem': 'também',
  'entao': 'então',
  'mae': 'mãe',
  'irmao': 'irmão',
  'pao': 'pão',
  'manha': 'manhã',
  'aviao': 'avião',
  'ingles': 'inglês',
  'portugues': 'português',
  'tres': 'três',
  'mes': 'mês'
};

const emojiMap: { [key: string]: string } = {
  ':good:': '✅',
  ':so-so:': '😐',
  ':not-good:': '❌',
  ':shrug:': '🤷'
};

export const normalizeText = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export const convertDiacritics = (text: string): string => {
  return text.replace(/\b\w+\b/g, word => {
    const loweredWord = word.toLowerCase();
    return diacriticsMap[loweredWord] || word;
  });
};

export const convertEmojis = (text: string): string => {
  return text.replace(/:([\w-]+):/g, (match, code) => emojiMap[match] || match);
};

export const convertText = (text: string): string => {
  return convertEmojis(convertDiacritics(text));
};

export const getEvaluationEmoji = (result: 'good' | 'so-so' | 'not-good'): string => {
  const emojiCode = `:${result}:`;
  return emojiMap[emojiCode] || '❓';
};
