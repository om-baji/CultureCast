import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, RefreshCcw, Share2 } from 'lucide-react';
import { storyApi } from '../services/api';
import StoryDisplay from '../components/story/StoryDisplay';
import StoryInput from '../components/story/StoryInput';

interface StoryState {
  isLoading: boolean;
  storyText: string;
  storyHistory: string[];
  error: string | null;
}

const StoryMode: React.FC = () => {
  const { theme } = useTheme();
  const [storyState, setStoryState] = useState<StoryState>({
    isLoading: false,
    storyText: '',
    storyHistory: [],
    error: null
  });

  const startNewStory = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    setStoryState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const response = await storyApi.startStory(prompt);
      
      setStoryState(prev => ({
        ...prev,
        isLoading: false,
        storyText: response.story,
        storyHistory: [response.story]
      }));
    } catch (error) {
      setStoryState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to start the story. Please try again.'
      }));
    }
  };

  const continueStory = async (userInput: string) => {
    if (!userInput.trim()) return;
    
    setStoryState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const response = await storyApi.continueStory(userInput, storyState.storyText);
      
      setStoryState(prev => ({
        ...prev,
        isLoading: false,
        storyText: prev.storyText + '\n\n' + response.story,
        storyHistory: [...prev.storyHistory, response.story]
      }));
    } catch (error) {
      setStoryState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to continue the story. Please try again.'
      }));
    }
  };

  const resetStory = () => {
    setStoryState({
      isLoading: false,
      storyText: '',
      storyHistory: [],
      error: null
    });
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <h1 className="text-3xl font-bold">Story Mode</h1>
        </div>
        <p className="text-lg max-w-3xl">
          Create and explore AI-driven narratives. Your choices and inputs shape the story's path.
        </p>
      </header>

      <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} mb-6`}>
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} flex justify-between items-center`}>
          <h2 className="text-xl font-semibold">Your Story</h2>
          <div className="flex space-x-2">
            <button 
              onClick={resetStory}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
              title="Start New Story"
            >
              <RefreshCcw size={18} />
            </button>
            <button 
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
              title="Share Story"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
        
        <StoryDisplay 
          storyText={storyState.storyText} 
          isLoading={storyState.isLoading} 
          error={storyState.error}
        />
      </div>

      <StoryInput 
        onStartStory={startNewStory} 
        onContinueStory={continueStory} 
        isLoading={storyState.isLoading}
        storyStarted={storyState.storyText.length > 0}
      />
    </div>
  );
};

export default StoryMode;