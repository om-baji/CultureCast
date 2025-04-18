import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MessageCircle, RefreshCw, ThumbsUp } from 'lucide-react';
import { debateApi } from '../services/api';
import Spinner from '../components/ui/Spinner';

interface DebateState {
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

const DebateMode: React.FC = () => {
  const { theme } = useTheme();
  const [debateState, setDebateState] = useState<DebateState>({
    dilemma: '',
    userArgument: '',
    evaluation: null,
    isLoading: false,
    isEvaluating: false,
    error: null
  });

  useEffect(() => {
    fetchDilemma();
  }, []);

  const fetchDilemma = async () => {
    setDebateState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      evaluation: null,
      userArgument: ''
    }));

    try {
      const response = await debateApi.getPrompt();
      
      setDebateState(prev => ({
        ...prev,
        dilemma: response.prompt,
        isLoading: false
      }));
    } catch (error) {
      setDebateState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch a debate prompt. Please try again.'
      }));
    }
  };

  const evaluateArgument = async () => {
    if (!debateState.userArgument.trim() || debateState.isEvaluating) return;
    
    setDebateState(prev => ({
      ...prev,
      isEvaluating: true,
      error: null
    }));

    try {
      const response = await debateApi.evaluateArgument(
        debateState.dilemma, 
        debateState.userArgument
      );
      
      setDebateState(prev => ({
        ...prev,
        evaluation: {
          score: response.score,
          feedback: response.feedback,
          strengths: response.strengths || [],
          areas_to_improve: response.areas_to_improve || []
        },
        isEvaluating: false
      }));
    } catch (error) {
      setDebateState(prev => ({
        ...prev,
        isEvaluating: false,
        error: 'Failed to evaluate your argument. Please try again.'
      }));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return theme === 'dark' ? 'text-green-400' : 'text-green-600';
    if (score >= 60) return theme === 'dark' ? 'text-amber-400' : 'text-amber-600';
    return theme === 'dark' ? 'text-red-400' : 'text-red-600';
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <MessageCircle className={`h-8 w-8 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`} />
          <h1 className="text-3xl font-bold">Debate Mode</h1>
        </div>
        <p className="text-lg max-w-3xl">
          Explore ethical dilemmas and cultural perspectives. Craft arguments and receive feedback on your reasoning.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} mb-6`}>
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} flex justify-between items-center`}>
              <h2 className="text-xl font-semibold">Ethical Dilemma</h2>
              <button
                onClick={fetchDilemma}
                disabled={debateState.isLoading}
                className={`
                  p-2 rounded-md 
                  ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}
                  ${debateState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  transition-colors
                `}
                title="Get New Dilemma"
              >
                <RefreshCw size={18} className={debateState.isLoading ? 'animate-spin' : ''} />
              </button>
            </div>
            
            {debateState.error && (
              <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{debateState.error}</p>
              </div>
            )}
            
            <div className="p-6">
              {debateState.isLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : (
                <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                  {debateState.dilemma.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <label 
                  htmlFor="argument" 
                  className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Your Argument
                </label>
                <textarea
                  id="argument"
                  value={debateState.userArgument}
                  onChange={(e) => setDebateState(prev => ({ ...prev, userArgument: e.target.value }))}
                  placeholder="Present your argument, considering multiple perspectives and ethical principles..."
                  rows={6}
                  className={`
                    w-full p-3 rounded-lg resize-none
                    ${theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'}
                    border focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50
                    focus:border-rose-500 transition-colors
                  `}
                  disabled={debateState.isLoading || debateState.isEvaluating}
                />
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={evaluateArgument}
                    disabled={debateState.isLoading || debateState.isEvaluating || !debateState.userArgument.trim()}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
                      ${debateState.isLoading || debateState.isEvaluating || !debateState.userArgument.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-rose-500 to-red-600 text-white hover:opacity-90'}
                      transition-colors
                    `}
                  >
                    {debateState.isEvaluating ? (
                      <>
                        <Spinner size="sm" />
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <ThumbsUp size={16} />
                        <span>Evaluate Argument</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {debateState.evaluation && (
            <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} sticky top-4`}>
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold">Evaluation</h2>
              </div>
              
              <div className="p-4">
                <div className="mb-6 text-center">
                  <div className={`text-5xl font-bold mb-2 ${getScoreColor(debateState.evaluation.score)}`}>
                    {debateState.evaluation.score}/100
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
                    <div 
                      className={`h-2.5 rounded-full ${
                        debateState.evaluation.score >= 80 
                          ? 'bg-green-500' 
                          : debateState.evaluation.score >= 60 
                            ? 'bg-amber-500' 
                            : 'bg-red-500'
                      }`} 
                      style={{ width: `${debateState.evaluation.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className={`p-4 mb-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {debateState.evaluation.feedback}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Strengths
                  </h3>
                  <ul className={`list-disc list-inside space-y-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    {debateState.evaluation.strengths.map((strength, index) => (
                      <li key={index} className="text-sm">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Areas to Improve
                  </h3>
                  <ul className={`list-disc list-inside space-y-1 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                    {debateState.evaluation.areas_to_improve.map((area, index) => (
                      <li key={index} className="text-sm">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {area}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebateMode;