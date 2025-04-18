import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Story mode API
export const storyApi = {
  startStory: async (prompt: string) => {
    const response = await api.post('/story', { prompt });
    return response.data;
  },
  
  continueStory: async (userInput: string, currentStory: string) => {
    const response = await api.post('/add_story', { 
      user_input: userInput,
      current_story: currentStory 
    });
    return response.data;
  }
};

// RPG mode API
export const rpgApi = {
  startSession: async (characterId: string) => {
    const response = await api.post('/rpg/start', { character_id: characterId });
    return response.data;
  },
  
  performAction: async (action: string) => {
    const response = await api.post('/rpg/progress', { action });
    return response.data;
  }
};

// Conflict resolution API
export const conflictApi = {
  startScenario: async (scenarioId: string, roleId: string) => {
    const response = await api.post('/conflict_resolution', { 
      scenario_id: scenarioId,
      role_id: roleId,
      action: 'start'
    });
    return response.data;
  },
  
  submitResponse: async (response: string) => {
    const result = await api.post('/conflict_resolution', {
      response,
      action: 'respond'
    });
    return result.data;
  }
};

// Debate mode API
export const debateApi = {
  getPrompt: async () => {
    const response = await api.get('/debate/prompt');
    return response.data;
  },
  
  evaluateArgument: async (prompt: string, argument: string) => {
    const response = await api.post('/debate/evaluate', { 
      prompt,
      argument 
    });
    return response.data;
  }
};

export default api;