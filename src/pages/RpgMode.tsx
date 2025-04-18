import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Users, RefreshCw } from 'lucide-react';
import CharacterSelect from '../components/rpg/CharacterSelect';
import GameConsole from '../components/rpg/GameConsole';
import { rpgApi } from '../services/api';

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
}

interface GameState {
  started: boolean;
  selectedCharacter: Character | null;
  currentScene: string;
  availableActions: string[];
  gameHistory: string[];
  isLoading: boolean;
  error: string | null;
}

const RpgMode: React.FC = () => {
  const { theme } = useTheme();
  const [gameState, setGameState] = useState<GameState>({
    started: false,
    selectedCharacter: null,
    currentScene: '',
    availableActions: [],
    gameHistory: [],
    isLoading: false,
    error: null
  });

  const characters: Character[] = [
    {
      id: 'diplomat',
      name: 'Namiko',
      role: 'Diplomat',
      description: 'A skilled negotiator from Kyoto, versed in ancient Japanese etiquette and modern diplomacy.',
      avatarUrl: 'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg'
    },
    {
      id: 'warrior',
      name: 'Ravi',
      role: 'Warrior',
      description: 'A Kshatriya from North India, trained in martial arts and battle strategy.',
      avatarUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    },
    {
      id: 'sage',
      name: 'Elena',
      role: 'Sage',
      description: 'A Balkan mystic who draws on Slavic folklore and spiritual insight to guide others.',
      avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
      id: 'merchant',
      name: 'Omar',
      role: 'Merchant',
      description: 'A skilled negotiator from Marrakech who blends business with deep cultural wisdom.',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: 'healer',
      name: 'Amina',
      role: 'Healer',
      description: 'An herbalist from the Sahel who practices ancient African healing traditions.',
      avatarUrl: 'https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg'
    },
    {
      id: 'storyteller',
      name: 'Kofi',
      role: 'Storyteller',
      description: 'A Griot from West Africa, keeper of oral traditions and cultural memory.',
      avatarUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
    },
    {
      id: 'explorer',
      name: 'Anika',
      role: 'Explorer',
      description: 'A South Indian anthropologist uncovering tribal stories and forgotten wisdom.',
      avatarUrl: 'https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg'
    },
    {
      id: 'artisan',
      name: 'Miguel',
      role: 'Artisan',
      description: 'A Quechua artisan from the Andes, preserving culture through vivid weavings and architecture.',
      avatarUrl: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg'
    },
    {
      id: 'shaman',
      name: 'Hoku',
      role: 'Shaman',
      description: 'A Polynesian spiritual guide who reads the stars and communes with ancestors.',
      avatarUrl: 'https://images.pexels.com/photos/54324/pexels-photo-54324.jpeg'
    },
    {
      id: 'poet',
      name: 'Meera',
      role: 'Poet',
      description: 'A wandering bard from Rajasthan who crafts verses that challenge social norms and celebrate love.',
      avatarUrl: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg'
    },
    {
      id: 'monk',
      name: 'Haruto',
      role: 'Monk',
      description: 'A Zen practitioner from Nara who teaches the way of harmony through silence and ritual.',
      avatarUrl: 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg'
    },
    {
      id: 'dancer',
      name: 'Raji',
      role: 'Dancer',
      description: 'A classical Bharatanatyam performer who channels mythology through motion.',
      avatarUrl: 'https://images.pexels.com/photos/1126784/pexels-photo-1126784.jpeg'
    }
  ];
  

  const selectCharacter = async (character: Character) => {
    setGameState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const response = await rpgApi.startSession(character.id);
      
      setGameState(prev => ({
        ...prev,
        started: true,
        selectedCharacter: character,
        currentScene: response.scene,
        availableActions: response.actions || [],
        gameHistory: [response.scene],
        isLoading: false
      }));
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to start the game session. Please try again.'
      }));
    }
  };

  const performAction = async (actionIndex: number) => {
    if (gameState.isLoading) return;
    
    const action = gameState.availableActions[actionIndex];
    
    setGameState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const response = await rpgApi.performAction(action);
      
      setGameState(prev => ({
        ...prev,
        currentScene: response.scene,
        availableActions: response.actions || [],
        gameHistory: [...prev.gameHistory, `You chose: ${action}`, response.scene],
        isLoading: false
      }));
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to process your action. Please try again.'
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      started: false,
      selectedCharacter: null,
      currentScene: '',
      availableActions: [],
      gameHistory: [],
      isLoading: false,
      error: null
    });
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Users className={`h-8 w-8 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <h1 className="text-3xl font-bold">Role-Playing Mode</h1>
        </div>
        <p className="text-lg max-w-3xl">
          Assume the role of a character and navigate through scenarios where your choices shape the outcome.
        </p>
      </header>

      {!gameState.started ? (
        <CharacterSelect 
          characters={characters} 
          onSelect={selectCharacter} 
          isLoading={gameState.isLoading}
          error={gameState.error}
        />
      ) : (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={gameState.selectedCharacter?.avatarUrl} 
                alt={gameState.selectedCharacter?.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
              />
              <div>
                <h3 className="font-bold">{gameState.selectedCharacter?.name}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {gameState.selectedCharacter?.role}
                </p>
              </div>
            </div>
            <button
              onClick={resetGame}
              className={`
                flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm
                ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}
                transition-colors
              `}
            >
              <RefreshCw size={14} />
              <span>New Game</span>
            </button>
          </div>
          
          <GameConsole 
            gameHistory={gameState.gameHistory}
            availableActions={gameState.availableActions}
            onAction={performAction}
            isLoading={gameState.isLoading}
            error={gameState.error}
          />
        </div>
      )}
    </div>
  );
};

export default RpgMode;