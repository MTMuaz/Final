import React from 'react';
import { Satellite, Globe as Globe2, Rocket, Users, Trophy, Clock, Activity, ExternalLink, Video } from 'lucide-react';
import Logo from './Logo';

interface HomePageProps {
  setActiveSection: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveSection }) => {
  const stats = [
    { label: 'Years in Orbit', value: '25', icon: Clock },
    { label: 'Countries Involved', value: '15+', icon: Globe2 },
    { label: 'Astronauts Hosted', value: '270+', icon: Users },
    { label: 'Scientific Experiments', value: '3000+', icon: Activity }
  ];

  const features = [
    {
      title: 'Learn About ISS',
      description: 'Watch live ISS feed, explore 25 years of history, and discover life in space',
      icon: Video,
      gradient: 'from-cyan-400 to-blue-500',
      action: () => setActiveSection('learn-iss'),
      external: false
    },
    {
      title: 'Educational Hub',
      description: 'Interactive lessons, astronaut interviews, and curated NASA resources',
      icon: Globe2,
      gradient: 'from-purple-400 to-pink-500',
      action: () => setActiveSection('education'),
      external: false
    },
    {
      title: 'ISS Cupola',
      description: 'Experience the breathtaking 360-degree observatory module of the International Space Station',
      icon: Globe2,
      gradient: 'from-cyan-400 to-purple-500',
      action: () => window.open('https://iss-cupola-interacti-taj5.bolt.host/', '_blank'),
      external: true
    },
    {
      title: 'Neutral Buoyancy Lab',
      description: 'Explore NASA\'s underwater astronaut training facility where spacewalks are practiced',
      icon: Users,
      gradient: 'from-blue-400 to-cyan-500',
      action: () => window.open('https://astronaut-nbl-traini-3kyd.bolt.host/', '_blank'),
      external: true
    },
    {
      title: 'Physics Module',
      description: 'Discover quantum physics experiments and cutting-edge research conducted in microgravity',
      icon: Rocket,
      gradient: 'from-orange-400 to-red-500',
      action: () => window.open('https://iss-25-quantum-space-4dn3.bolt.host/', '_blank'),
      external: true
    },
    {
      title: 'Space Gallery',
      description: 'Browse 30+ stunning NASA images of the ISS, Earth, and space exploration',
      icon: Activity,
      gradient: 'from-green-400 to-teal-500',
      action: () => setActiveSection('gallery'),
      external: false
    }
  ];

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium text-cyan-300">NASA Space Apps Challenge 2025</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Celebrate 25 Years of the
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              International Space Station
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore, learn, and play in the most comprehensive ISS experience ever created. 
            Journey through 25 years of human achievement in space with cutting-edge 3D visualization, 
            interactive games, and AI-powered learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveSection('education')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
            >
              Start Learning
            </button>
            <button
              onClick={() => setActiveSection('learn-iss')}
              className="px-8 py-4 border border-cyan-500/30 rounded-lg font-semibold text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
            >
              Learn About ISS
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400/20 to-purple-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={feature.action}
                className="group cursor-pointer bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300">
                  <span>{feature.external ? 'Open Module' : 'Explore Feature'}</span>
                  {feature.external ? (
                    <ExternalLink className="w-4 h-4 ml-2" />
                  ) : (
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HomePage;