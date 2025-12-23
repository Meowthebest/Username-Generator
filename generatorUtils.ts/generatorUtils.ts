
import { UsernameOptions, StylePreset, CategoryType } from '../types';
import { CATEGORY_WORDS, PREFIXES, SUFFIXES, AMBIGUOUS_CHARS, STYLE_CONFIGS } from '../constants';

const getRandomInt = (max: number): number => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

const getRandomItem = <T>(arr: T[]): T => arr[getRandomInt(arr.length)];

const applyCasing = (str: string, style: StylePreset): string => {
  if (style === 'cute' || style === 'professional') {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  if (style === 'clean') {
    return str.toLowerCase();
  }
  if (style === 'gamer') {
    return str.toUpperCase();
  }
  return str;
};

export const generateBatch = (options: UsernameOptions): string[] => {
  const results = new Set<string>();
  const attempts = options.batchSize * 5; // Safety to avoid infinite loops
  let count = 0;

  while (results.size < options.batchSize && count < attempts) {
    const username = generateSingle(options);
    if (username.length >= options.minLength && username.length <= options.maxLength) {
      results.add(username);
    }
    count++;
  }

  return Array.from(results);
};

const generateSingle = (options: UsernameOptions): string => {
  const config = STYLE_CONFIGS[options.style];
  const words: string[] = [];

  // Prefix
  if (options.includePrefix) {
    words.push(applyCasing(getRandomItem(PREFIXES), options.style));
  }

  // Core Word & Keyword Blending
  const categoryList = CATEGORY_WORDS[options.category];
  const coreWord = getRandomItem(categoryList);
  
  if (options.keyword) {
    // Blend keyword: sometimes before, sometimes after the core word
    if (getRandomInt(2) === 0) {
      words.push(applyCasing(options.keyword, options.style));
      words.push(applyCasing(coreWord, options.style));
    } else {
      words.push(applyCasing(coreWord, options.style));
      words.push(applyCasing(options.keyword, options.style));
    }
  } else {
    words.push(applyCasing(coreWord, options.style));
  }

  // Suffix
  if (options.includeSuffix) {
    words.push(applyCasing(getRandomItem(SUFFIXES), options.style));
  }

  // Join with separator
  let username = words.join(config.separator);

  // Numbers for gamers
  if (config.numbers || (options.style === 'gamer' && getRandomInt(2) === 0)) {
    username += getRandomInt(100).toString();
  }

  // Avoid Ambiguous
  if (options.avoidAmbiguous) {
    AMBIGUOUS_CHARS.forEach(char => {
      username = username.split(char).join('');
    });
  }

  // Cleanup: ensure no double separators and doesn't start/end with separator
  if (config.separator) {
    const escapedSep = config.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    username = username.replace(new RegExp(`${escapedSep}{2,}`, 'g'), config.separator);
    username = username.replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, 'g'), '');
  }

  return username;
};
