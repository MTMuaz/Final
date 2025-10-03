import React, { useState } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Target, 
  Zap, 
  Users,
  Clock,
  Star,
  Medal,
  Play,
  RotateCcw
} from 'lucide-react';

const GamingZone: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'docking',
      title: 'ISS Docking Simulator',
      description: 'Master the complex art of spacecraft docking with the International Space Station',
      difficulty: 'Expert',
      players: '1,247',
      bestScore: '98.5%',
      icon: Target,
      gradient: 'from-cyan-400 to-blue-500',
      features: ['Realistic Physics', 'Multiple Spacecraft', 'Weather Conditions']
    },
    {
      id: 'survival',
      title: 'Space Survival Challenge',
      description: 'Manage resources, solve crises, and keep your crew alive in orbit',
      difficulty: 'Hard',
      players: '2,891',
      bestScore: '127 days',
      icon: Zap,
      gradient: 'from-orange-400 to-red-500',
      features: ['Resource Management', 'Crisis Events', 'Team Coordination']
    },
    {
      id: 'zero-gravity',
      title: 'Zero-Gravity Explorer',
      description: 'Navigate through ISS modules completing missions in microgravity',
      difficulty: 'Medium',
      players: '4,562',
      bestScore: '45 missions',
      icon: Star,
      gradient: 'from-purple-400 to-pink-500',
      features: ['Physics Simulation', 'Mission Variety', 'Skill Progression']
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'AstronautAce', score: 98752, badge: '🥇' },
    { rank: 2, name: 'SpaceExplorer', score: 95431, badge: '🥈' },
    { rank: 3, name: 'OrbitMaster', score: 92187, badge: '🥉' },
    { rank: 4, name: 'CosmicPilot', score: 88965, badge: '🏆' },
    { rank: 5, name: 'StarNavigator', score: 85742, badge: '🌟' },
  ];

  const achievements = [
    { name: 'Perfect Docking', description: 'Complete 10 docking maneuvers with 100% accuracy', progress: 7, total: 10, unlocked: false },
    { name: 'Space Survivor', description: 'Survive 100 days in space survival mode', progress: 100, total: 100, unlocked: true },
    { name: 'Module Master', description: 'Explore all ISS modules in zero-gravity mode', progress: 8, total: 12, unlocked: false },
    { name: 'Team Player', description: 'Complete 50 multiplayer missions', progress: 23, total: 50, unlocked: false },
  ];

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Gaming Zone
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Challenge yourself with realistic space simulations, compete with players worldwide, 
            and master the skills needed to operate in the harsh environment of space.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Games Grid */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid md:grid-cols-1 gap-6">
              {games.map((game) => {
                const Icon = game.icon;
                const isSelected = selectedGame === game.id;
                
                return (
                  <div
                    key={game.id}
                    className={`group cursor-pointer bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                      isSelected 
                        ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-105' 
                        : 'border-slate-700/50 hover:border-cyan-500/30'
                    }`}
                    onClick={() => setSelectedGame(isSelected ? null : game.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                      {/* Game Icon */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${game.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      {/* Game Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            game.difficulty === 'Expert' ? 'bg-red-500/20 text-red-300' :
                            game.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {game.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-slate-300 mb-4 leading-relaxed">{game.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-cyan-400" />
                            <span className="text-slate-300">{game.players} players</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-slate-300">Best: {game.bestScore}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 flex-shrink-0">
                        <button className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25' 
                            : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <Play className="w-4 h-4" />
                            <span>Play Now</span>
                          </div>
                        </button>
                        
                        {isSelected && (
                          <div className="space-y-2 animate-fade-in">
                            <button className="w-full px-6 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg transition-colors">
                              Quick Match
                            </button>
                            <button className="w-full px-6 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors">
                              Tutorial
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Features */}
                    {isSelected && (
                      <div className="mt-6 pt-6 border-t border-slate-700/50">
                        <h4 className="text-white font-semibold mb-3">Game Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {game.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-300 border border-slate-600/50"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Achievements Section */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Medal className="w-5 h-5 text-yellow-400 mr-2" />
                Your Achievements
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                        : 'bg-slate-800/30 border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-300' : 'text-white'}`}>
                        {achievement.name}
                      </h4>
                      {achievement.unlocked && <Trophy className="w-5 h-5 text-yellow-400" />}
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-3">{achievement.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Progress</span>
                        <span className={achievement.unlocked ? 'text-yellow-300' : 'text-slate-400'}>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Global Leaderboard */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                Global Leaderboard
              </h3>
              
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      player.rank === 1 ? 'bg-yellow-500/10' :
                      player.rank === 2 ? 'bg-slate-600/20' :
                      player.rank === 3 ? 'bg-orange-500/10' :
                      'bg-slate-800/30'
                    }`}
                  >
                    <div className="w-8 text-center">
                      <span className="text-lg">{player.badge}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-slate-400">{player.score.toLocaleString()} pts</div>
                    </div>
                    <div className="text-xs text-slate-500">#{player.rank}</div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm">
                View Full Rankings
              </button>
            </div>

            {/* Game Stats */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Games Played</span>
                  <span className="text-white font-semibold">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Win Rate</span>
                  <span className="text-green-400 font-semibold">73%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Best Streak</span>
                  <span className="text-orange-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Score</span>
                  <span className="text-cyan-400 font-semibold">89,432</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all">
                  <span>Daily Challenge</span>
                  <Clock className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all">
                  <span>Training Mode</span>
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all">
                  <span>Multiplayer Lobby</span>
                  <Users className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingZone;