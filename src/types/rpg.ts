export interface GameStateContext {
  chatHistory: Array<{ user: string; ai: string }>;
  currentRole: string;
  currentCulture: string;
  currentEra: string;
  currentTone: string;
  currentLanguage: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
}

export interface GameState {
  started: boolean;
  selectedCharacter: Character | null;
  currentScene: string;
  availableActions: string[];
  gameHistory: string[];
  isLoading: boolean;
  error: string | null;

  chatHistory: Array<{ user: string; ai: string }>;
  currentRole: string;
  currentCulture: string;
  currentEra: string;
  currentTone: string;
  currentLanguage: string;
}
