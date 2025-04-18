import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Scale, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const modes = [
    {
      id: 'story',
      title: 'Story Mode (RAG)',
      description: 'Explore immersive storytelling with AI-driven narrative generation.',
      icon: <BookOpen className="w-12 h-12" />,
      color: 'from-purple-500 to-blue-600',
      path: '/story'
    },
    {
      id: 'rpg',
      title: 'Role-Playing Mode',
      description: 'Assume a persona and make choices that impact the narrative flow.',
      icon: <Users className="w-12 h-12" />,
      color: 'from-emerald-500 to-teal-600',
      path: '/rpg'
    },
    {
      id: 'conflict',
      title: 'Conflict Resolution',
      description: 'Engage in diplomatic simulations with real-world cultural context.',
      icon: <Scale className="w-12 h-12" />,
      color: 'from-amber-500 to-orange-600',
      path: '/conflict'
    },
    {
      id: 'debate',
      title: 'Debate Mode',
      description: 'Analyze and argue ethical dilemmas across cultural perspectives.',
      icon: <MessageCircle className="w-12 h-12" />,
      color: 'from-rose-500 to-red-600',
      path: '/debate'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Cultural Bridge Game</h1>
        <p className="text-lg max-w-3xl">
          An interactive platform for exploring storytelling, diplomacy, and ethical reasoning across cultural contexts.
          Choose a mode below to begin your journey.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <div 
            key={mode.id}
            onClick={() => navigate(mode.path)}
            className={`
              cursor-pointer overflow-hidden rounded-xl shadow-lg
              ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'}
              transition duration-300 ease-in-out transform hover:-translate-y-1
            `}
          >
            <div className={`h-3 bg-gradient-to-r ${mode.color}`}></div>
            <div className="p-6">
              <div className={`p-4 mb-4 inline-flex rounded-full bg-opacity-10 ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-100'}`}>
                {mode.icon}
              </div>
              <h2 className="text-2xl font-bold mb-2">{mode.title}</h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {mode.description}
              </p>
              <button 
                className={`
                  px-4 py-2 rounded-lg font-medium text-white
                  bg-gradient-to-r ${mode.color} 
                  hover:opacity-90 transition-opacity
                `}
              >
                Start {mode.title.split(' ')[0]}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;