  import React, { useState } from 'react';
  import { useTheme } from '../contexts/ThemeContext';
  import { Scale } from 'lucide-react';
  import ScenarioSelect from '../components/conflict/ScenarioSelect';
  import ConflictSimulator from '../components/conflict/ConflictSimulator';
  import { conflictApi } from '../services/api';
  import { scenarios, roles } from '@/constants/senarios';
  import { ConflictState, Scenario, Role } from '@/types/conflict';

  const ConflictMode: React.FC = () => {
    const { theme } = useTheme();
    const [conflictState, setConflictState] = useState<ConflictState>({
      selectedScenario: null,
      selectedRole: null,
      tensionLevel: 50,
      currentPrompt: '',
      history: [],
      kalkiScore: null,
      isLoading: false,
      error: null
    });

    const selectScenario = (scenario: Scenario) => {
      setConflictState(prev => ({
        ...prev,
        selectedScenario: scenario
      }));
    };

    const selectRole = async (role: Role) => {
      setConflictState(prev => ({
        ...prev,
        isLoading: true,
        error: null
      }));

      try {
        const response = await conflictApi.startScenario(
          conflictState.selectedScenario?.id || '',
          role.id
        );
        
        setConflictState(prev => ({
          ...prev,
          selectedRole: role,
          currentPrompt: response.prompt,
          history: [{ message: response.prompt, author: 'system' }],
          isLoading: false
        }));
      } catch (error) {
        setConflictState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to start the scenario. Please try again.'
        }));
      }
    };

    const submitResponse = async (response: string) => {
      if (!response.trim() || conflictState.isLoading) return;
      
      setConflictState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        history: [...prev.history, { message: response, author: 'user' }]
      }));

      try {
        const apiResponse = await conflictApi.submitResponse(response);
        
        setConflictState(prev => ({
          ...prev,
          tensionLevel: apiResponse.tension_level || prev.tensionLevel,
          currentPrompt: apiResponse.next_prompt,
          history: [...prev.history, { message: apiResponse.next_prompt, author: 'system' }],
          kalkiScore: apiResponse.score ? {
            empathy: apiResponse.score.empathy || 0,
            diplomacy: apiResponse.score.diplomacy || 0,
            history: apiResponse.score.history || 0,
            ethics: apiResponse.score.ethics || 0,
            total: apiResponse.score.total || 0
          } : prev.kalkiScore,
          isLoading: false
        }));
      } catch (error) {
        setConflictState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to process your response. Please try again.'
        }));
      }
    };

    const resetScenario = () => {
      setConflictState({
        selectedScenario: null,
        selectedRole: null,
        tensionLevel: 50,
        currentPrompt: '',
        history: [],
        kalkiScore: null,
        isLoading: false,
        error: null
      });
    };

    return (
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Scale className={`h-8 w-8 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
            <h1 className="text-3xl font-bold">Conflict Resolution</h1>
          </div>
          <p className="text-lg max-w-3xl">
            Engage in diplomatic simulations based on real-world scenarios. Your decisions impact the tension level and resolution outcomes.
          </p>
        </header>

        {!conflictState.selectedScenario ? (
          <ScenarioSelect 
            scenarios={scenarios} 
            onSelect={selectScenario} 
          />
        ) : !conflictState.selectedRole ? (
          <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} mb-6`}>
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
              <h2 className="text-xl font-semibold">Choose Your Role</h2>
              <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Select the perspective you want to take in this scenario
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    className={`
                      rounded-lg p-4 cursor-pointer transition-colors
                      ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'}
                    `}
                    onClick={() => selectRole(role)}
                  >
                    <h3 className="text-lg font-bold mb-2">{role.name}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={resetScenario}
                  className={`
                    px-4 py-2 rounded-lg font-medium
                    ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}
                    transition-colors
                  `}
                >
                  Back to Scenarios
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ConflictSimulator
            scenario={conflictState.selectedScenario}
            role={conflictState.selectedRole}
            tensionLevel={conflictState.tensionLevel}
            history={conflictState.history}
            kalkiScore={conflictState.kalkiScore}
            onSubmitResponse={submitResponse}
            onReset={resetScenario}
            isLoading={conflictState.isLoading}
            error={conflictState.error}
          />
        )}
      </div>
    );
  };

  export default ConflictMode;