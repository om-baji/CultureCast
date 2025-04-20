import { characterMap } from "@/constants/rpg_mode";
import {
  DebatePromptResponse,
  DebateMessageResponse,
  DebateEvaluationResponse,
} from "@/types/debate";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

interface StoryRequest {
  culture: string;
  theme?: string;
  max_length?: number;
  language?: string;
  tone?: string;
}

interface StoryResponse {
  story: string;
  character_count: number;
  language: string;
  metadata: Record<string, any>;
  used_rag: boolean;
  reference_count: number;
}

interface ChatHistoryTurn {
  user: string;
  ai: string;
}

interface RolePlayRequest {
  role: string;
  culture: string;
  era: string;
  tone: string;
  language: string;
  include_emotion: boolean;
  user_input: string;
  chat_history: ChatHistoryTurn[];
}

interface StoryResponseRPG {
  story: string;
  character_count: number;
  language: string;
  metadata: {
    mode: string;
    culture: string;
    role: string;
    era: string;
    tone: string;
    language: string;
  };
  used_rag: boolean;
  reference_count: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Story mode API
export const storyApi = {
  startStory: async (storyRequest: StoryRequest): Promise<StoryResponse> => {
    // Enhance the request to ensure engaging content
    const enhancedRequest: StoryRequest = {
      ...storyRequest,
      tone: storyRequest.tone || "adventurous",
      max_length: Math.max(storyRequest.max_length || 800, 300),
    };

    const response = await api.post("/story", enhancedRequest);
    return response.data;
  },

  continueStory: async (
    userInput: string,
    currentStory: string
  ): Promise<StoryResponse> => {
    const keywords = userInput.split(" ");
    const possibleCulture = keywords[0];

    const continuationRequest: StoryRequest = {
      culture: possibleCulture.length > 3 ? possibleCulture : "General",
      theme: userInput,
      max_length: 500,
      language: "English",
      tone: "adventurous",
    };

    const response = await api.post("/story", continuationRequest);
    return response.data;
  },
};

export const rpgApi = {
  startSession: async (characterId: string) => {
    const charParams = characterMap[characterId] || {
      role: "Guide",
      culture: "Global",
      era: "Modern",
      tone: "friendly",
      language: "English",
    };

    const initialPrompt = `You meet a ${charParams.role} from ${charParams.culture} culture. How do you wish to begin your journey?`;

    const payload: RolePlayRequest = {
      ...charParams,
      include_emotion: true,
      user_input: initialPrompt,
      chat_history: [],
    };

    const response = await api.post<StoryResponse>("/rpg_mode", payload);

    return {
      scene: response.data.story,
      actions: [
        "Ask about their background",
        "Ask for guidance on your journey",
        "Share something about yourself",
        "Inquire about local customs",
      ],
    };
  },

  performAction: async (action: string) => {
    const gameState = window.currentGameState || {
      chatHistory: [],
      currentRole: "Guide",
      currentCulture: "Global",
      currentEra: "Modern",
      currentTone: "friendly",
      currentLanguage: "English",
    };

    const payload: RolePlayRequest = {
      role: gameState.currentRole,
      culture: gameState.currentCulture,
      era: gameState.currentEra,
      tone: gameState.currentTone,
      language: gameState.currentLanguage,
      include_emotion: true,
      user_input: action,
      chat_history: gameState.chatHistory || [],
    };

    const response = await api.post<StoryResponse>("/rpg_mode", payload);

    const suggestedActions = generateSuggestedActions(response.data.story);

    return {
      scene: response.data.story,
      actions: suggestedActions,
    };
  },
};

function generateSuggestedActions(currentScene: string): string[] {
  const defaultActions = [
    "Continue the conversation",
    "Ask a question",
    "Share your thoughts",
    "Change the subject",
  ];

  if (
    currentScene.toLowerCase().includes("journey") ||
    currentScene.toLowerCase().includes("travel")
  ) {
    return [
      "Ask about the destination",
      "Inquire about dangers ahead",
      "Request advice for the journey",
      "Share your travel experience",
    ];
  }

  if (
    currentScene.toLowerCase().includes("culture") ||
    currentScene.toLowerCase().includes("tradition")
  ) {
    return [
      "Ask for more details about their customs",
      "Compare with your own culture",
      "Request to participate in a cultural activity",
      "Ask about the history behind the tradition",
    ];
  }

  return defaultActions;
}

export const conflictApi = {
  startScenario: async (scenarioId: string, roleId: string) => {
    const response = await api.post("/conflict_resolution", {
      scenario_id: scenarioId,
      role_id: roleId,
      action: "start",
    });
    return response.data;
  },

  submitResponse: async (response: string) => {
    const result = await api.post("/conflict_resolution", {
      response,
      action: "respond",
    });
    return result.data;
  },
};

export const debateApi = {
  getPrompt: async (): Promise<DebatePromptResponse> => {
    const response = await api.get("/debate/prompt");
    return response.data;
  },

  sendMessage: async (
    prompt: string,
    message: string,
    history: Array<{ role: string; content: string }>
  ): Promise<DebateMessageResponse> => {
    const response = await api.post("/debate/message", {
      prompt,
      message,
      history,
    });
    return response.data;
  },

  evaluateDebate: async (
    prompt: string,
    argument: string
  ): Promise<DebateEvaluationResponse> => {
    const response = await api.post("/debate/evaluate", {
      prompt,
      response: argument,
    });
    return response.data;
  },
};

export default api;
