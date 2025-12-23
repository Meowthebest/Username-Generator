
export type CategoryType = 'clean' | 'fruit' | 'cat' | 'anime' | 'league' | 'genshin' | 'sanrio' | 'miscellaneous';
export type StylePreset = 'cute' | 'clean' | 'gamer' | 'professional';

export interface UsernameOptions {
  category: CategoryType;
  style: StylePreset;
  batchSize: number;
  minLength: number;
  maxLength: number;
  includePrefix: boolean;
  includeSuffix: boolean;
  avoidAmbiguous: boolean;
  keyword: string;
}

export interface HistoryItem {
  id: string;
  value: string;
  timestamp: number;
}
