export interface DebateState {
    dilemma: string;
    userArgument: string;
    evaluation: {
      score: number;
      feedback: string;
      strengths: string[];
      areas_to_improve: string[];
    } | null;
    isLoading: boolean;
    isEvaluating: boolean;
    error: string | null;
  }