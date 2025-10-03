import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Award,
  Calendar,
  Globe,
  TrendingUp
} from 'lucide-react';
import { getUserStats, type UserStats } from '../services/supabase';
import EducationResources from './EducationResources';
import AstronautInterviews from './AstronautInterviews';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  completed: boolean;
  thumbnail: string;
}

interface Timeline {
  year: number;
  title: string;
  description: string;
  image: string;
  category: 'launch' | 'milestone' | 'expansion' | 'science';
}

const EducationHubNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'timeline' | 'interviews' | 'resources'>('lessons');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const stats = await getUserStats();
      setUserStats(stats);
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'ISS: Humanity\'s Greatest Achievement',
      description: 'Discover the incredible story of the International Space Station - 25 years of human presence in space',
      duration: '15 min',
      difficulty: 'Beginner',
      category: 'ISS Basics',
      completed: false,
      thumbnail: '🛰️'
    },
    {
      id: '2',
      title: 'Living Among the Stars',
      description: 'Experience daily life aboard the ISS - from eating floating food to sleeping while orbiting Earth 16 times a day',
      duration: '20 min',
      difficulty: 'Beginner',
      category: 'Astronaut Life',
      completed: true,
      thumbnail: '👨\u200d🚀'
    },
    {
      id: '3',
      title: 'Laboratory in the Sky',
      description: 'Explore over 3,000 groundbreaking experiments that have advanced medicine, materials science, and our understanding of life',
      duration: '25 min',
      difficulty: 'Intermediate',
      category: 'Science',
      completed: false,
      thumbnail: '🔬'
    },
    {
      id: '4',
      title: 'Walking in the Void',
      description: 'Join astronauts on spacewalks as they maintain the ISS while traveling at 27,600 km/h, 408 km above Earth',
      duration: '18 min',
      difficulty: 'Intermediate',
      category: 'Operations',
      completed: false,
      thumbnail: '🚶\u200d♂️'
    },
    {
      id: '5',
      title: 'Engineering Marvel of the 21st Century',
      description: 'Understand the incredible technology that keeps 420,000 kg of space station operational in the harsh environment of space',
      duration: '30 min',
      difficulty: 'Advanced',
      category: 'Engineering',
      completed: false,
      thumbnail: '⚙️'
    },
    {
      id: '6',
      title: 'Unity Among Nations',
      description: 'Discover how 15 countries united to build humanity\'s greatest symbol of international cooperation and peaceful collaboration',
      duration: '22 min',
      difficulty: 'Intermediate',
      category: 'History',
      completed: true,
      thumbnail: '🌍'
    }
  ];

  const timeline: Timeline[] = [
    {
      year: 1998,
      title: 'The Journey Begins',
      description: 'Zarya, the first ISS module, launches from Baikonur Cosmodrome, marking the beginning of humanity\'s greatest space construction project.',
      image: '🚀',
      category: 'launch'
    },
    {
      year: 2000,
      title: 'Humanity Moves to Space',
      description: 'Expedition 1 crew arrives, beginning 25+ years of continuous human presence in space.',
      image: '👨\u200d🚀',
      category: 'milestone'
    },
    {
      year: 2001,
      title: 'Science Takes Flight',
      description: 'NASA\'s Destiny laboratory arrives, transforming the ISS into a world-class research facility.',
      image: '🔬',
      category: 'expansion'
    },
    {
      year: 2008,
      title: 'International Science Hub',
      description: 'Japan\'s Kibo and Europe\'s Columbus laboratories join the ISS, creating the most advanced microgravity research facility.',
      image: '🏗️',
      category: 'expansion'
    },
    {
      year: 2011,
      title: 'End of an Era',
      description: 'Space Shuttle Atlantis completes the final shuttle mission, ending 30 years of shuttle operations.',
      image: '🛸',
      category: 'milestone'
    },
    {
      year: 2020,
      title: 'Commercial Space Age',
      description: 'SpaceX Crew Dragon successfully carries astronauts to the ISS, ushering in the era of commercial human spaceflight.',
      image: '🚀',
      category: 'milestone'
    },
    {
      year: 2023,
      title: 'Silver Anniversary in Space',
      description: 'The ISS celebrates 25 incredible years! Over 270 astronauts from 19 countries have called it home.',
      image: '🎉',
      category: 'milestone'
    }
  ];

  const categories = ['all', 'ISS Basics', 'Astronaut Life', 'Science', 'Operations', 'Engineering', 'History'];
  const filteredLessons = selectedCategory === 'all' ? lessons : lessons.filter(lesson => lesson.category === selectedCategory);

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/40'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="text-4xl mb-4">{lesson.thumbnail}</div>

            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                lesson.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {lesson.difficulty}
              </span>
              {lesson.completed && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {lesson.title}
            </h3>

            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              {lesson.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors">
                <Play className="w-4 h-4" />
                <span className="text-sm">Start</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">25 Years of ISS History</h3>
        <p className="text-slate-300">Journey through the major milestones of the International Space Station</p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500"></div>

        {timeline.map((event) => (
          <div key={event.year} className="relative flex items-start space-x-6 pb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 ${
              event.category === 'launch' ? 'bg-orange-500/20 border-orange-500' :
              event.category === 'milestone' ? 'bg-cyan-500/20 border-cyan-500' :
              event.category === 'expansion' ? 'bg-purple-500/20 border-purple-500' :
              'bg-green-500/20 border-green-500'
            }`}>
              {event.image}
            </div>

            <div className="flex-1 bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-bold text-white">{event.title}</h4>
                <span className="text-2xl font-bold text-cyan-400">{event.year}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Education Hub
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover the wonders of the International Space Station through interactive lessons,
            historical timelines, and exclusive astronaut interviews
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-white">{userStats?.achievements_count || 5}</div>
                <div className="text-xs text-slate-400">Achievements</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white">{userStats?.lessons_completed || 12}</div>
                <div className="text-xs text-slate-400">Lessons Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">{userStats?.certificates_earned || 3}</div>
                <div className="text-xs text-slate-400">Certificates</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-orange-500/20">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-white">1,247</div>
                <div className="text-xs text-slate-400">Fellow Learners</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'lessons', label: 'Interactive Lessons', icon: BookOpen },
            { id: 'timeline', label: '25-Year Timeline', icon: Calendar },
            { id: 'interviews', label: 'Astronaut Interviews', icon: Users },
            { id: 'resources', label: 'NASA Resources', icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/40 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div>
          {activeTab === 'lessons' && renderLessons()}
          {activeTab === 'timeline' && renderTimeline()}
          {activeTab === 'interviews' && <AstronautInterviews />}
          {activeTab === 'resources' && <EducationResources />}
        </div>
      </div>
    </div>
  );
};

export default EducationHubNew;
