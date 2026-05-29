export interface LanguageToolReplacement {
  value: string;
}

export interface LanguageToolContext {
  offset: number;
  length: number;
  text: string;
}

export interface LanguageToolMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: LanguageToolReplacement[];
  context: LanguageToolContext;
}

export interface LanguageToolResult {
  matches: LanguageToolMatch[];
}

export interface TranslateResponse {
  translatedText: string;
}

export interface MatchInfo {
  offset: number;
  length: number;
  replacement: string;
}
