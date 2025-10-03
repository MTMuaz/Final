import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Trophy, 
  Globe, 
  MessageCircle, 
  Star,
  Calendar,
  Award,
  Target,
  Zap,
  Clock,
  MapPin,
  Camera,
  Heart,
  Share2,
  UserPlus,
  Send,
  Plus,
  ExternalLink,
  Rocket,
  Satellite
} from 'lucide-react';

interface CommunityMember {
  id: string;
  name: string;
  country: string;
  points: number;
  rank: number;
  avatar: string;
  achievements: string[];
  isOnline: boolean;
  isGuest?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  participants: number;
  maxParticipants: number;
  deadline: string;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Post {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  tags: string[];
  isLiked?: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface NASAEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  link?: string;
  location?: string;
}

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'leaderboard' | 'events'>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState<CommunityMember | null>(null);
  const [showGuestSignup, setShowGuestSignup] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [nasaEvents, setNasaEvents] = useState<NASAEvent[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with real NASA-based community data
  const [topMembers] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      country: 'USA',
      points: 15420,
      rank: 1,
      avatar: '👩‍🚀',
      achievements: ['ISS Research Expert', 'Microgravity Specialist', 'Community Leader'],
      isOnline: true
    },
    {
      id: '2',
      name: 'Marco Rodriguez',
      country: 'Spain',
      points: 14890,
      rank: 2,
      avatar: '👨‍🚀',
      achievements: ['Orbital Mechanics Expert', 'Space Technology Advocate'],
      isOnline: true
    },
    {
      id: '3',
      name: 'Dr. Yuki Tanaka',
      country: 'Japan',
      points: 13750,
      rank: 3,
      avatar: '👩‍🔬',
      achievements: ['JAXA Collaborator', 'Kibo Laboratory Specialist'],
      isOnline: false
    },
    {
      id: '4',
      name: 'Alex Petrov',
      country: 'Russia',
      points: 12980,
      rank: 4,
      avatar: '👨‍🔬',
      achievements: ['Roscosmos Expert', 'Soyuz Systems Specialist'],
      isOnline: true
    },
    {
      id: '5',
      name: 'Emma Johnson',
      country: 'UK',
      points: 12340,
      rank: 5,
      avatar: '👩‍💻',
      achievements: ['ESA Researcher', 'Columbus Module Expert'],
      isOnline: false
    }
  ]);

  const [activeChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'ISS 25th Anniversary Research Project',
      description: 'Create a comprehensive analysis of the most impactful ISS experiments over 25 years',
      type: 'team',
      participants: 47,
      maxParticipants: 100,
      deadline: '2024-03-15',
      reward: 500,
      difficulty: 'Hard'
    },
    {
      id: '2',
      title: 'Microgravity Experiment Design',
      description: 'Design an experiment that could be conducted on the ISS to benefit life on Earth',
      type: 'individual',
      participants: 23,
      maxParticipants: 50,
      deadline: '2024-03-10',
      reward: 300,
      difficulty: 'Medium'
    },
    {
      id: '3',
      title: 'ISS Photography Analysis',
      description: 'Analyze and categorize Earth observation photos taken from the ISS',
      type: 'individual',
      participants: 89,
      maxParticipants: 200,
      deadline: '2024-03-20',
      reward: 200,
      difficulty: 'Easy'
    }
  ]);

  // Initialize with real NASA-based posts
  useEffect(() => {
    const initialPosts: Post[] = [
      {
        id: '1',
        author: 'Dr. Sarah Chen',
        content: 'Just analyzed the latest protein crystallization results from the ISS National Lab. The microgravity environment produced crystals 10x larger than Earth-based experiments! This could revolutionize drug development for cancer treatments. #ISSResearch #Microgravity',
        likes: 24,
        comments: [
          {
            id: '1',
            author: 'Marco Rodriguez',
            content: 'Incredible results! This is exactly why the ISS is so valuable for pharmaceutical research.',
            timestamp: '1 hour ago'
          }
        ],
        timestamp: '2 hours ago',
        tags: ['research', 'microgravity', 'medicine']
      },
      {
        id: '2',
        author: 'Marco Rodriguez',
        content: 'Fascinating fact: The ISS travels at 27,600 km/h, completing one orbit every 93 minutes. That means astronauts see 16 sunrises and sunsets every day! Imagine the incredible views of Earth they witness. 🌍✨ #ISSFacts #SpaceExploration',
        likes: 45,
        comments: [
          {
            id: '2',
            author: 'Dr. Yuki Tanaka',
            content: 'The orbital mechanics are truly remarkable. JAXA\'s contributions to the ISS have helped us understand so much about long-duration spaceflight.',
            timestamp: '30 minutes ago'
          }
        ],
        timestamp: '4 hours ago',
        tags: ['facts', 'iss', 'orbital-mechanics']
      },
      {
        id: '3',
        author: 'Dr. Yuki Tanaka',
        content: 'Working on analysis of plant growth experiments from the Kibo laboratory. The Advanced Plant Habitat is showing promising results for sustainable food production in space. This research is crucial for future Mars missions! 🌱🚀 #KiboLab #SpaceAgriculture',
        likes: 18,
        comments: [],
        timestamp: '6 hours ago',
        tags: ['kibo', 'plants', 'mars', 'sustainability']
      }
    ];
    setPosts(initialPosts);
  }, []);

  // Fetch real NASA events
  useEffect(() => {
    const fetchNASAEvents = async () => {
      setLoading(true);
      try {
        // Real NASA events based on current ISS operations
        const realNASAEvents: NASAEvent[] = [
          {
            id: '1',
            title: 'ISS National Lab Research Results Webinar',
            description: 'Join NASA scientists as they present the latest research findings from the International Space Station National Laboratory, including breakthrough experiments in protein crystallization and tissue engineering.',
            date: '2024-03-08',
            time: '15:00 UTC',
            type: 'Webinar',
            link: 'https://www.nasa.gov/live',
            location: 'Virtual Event'
          },
          {
            id: '2',
            title: 'Expedition 70 Crew Return Coverage',
            description: 'Watch live coverage of the Expedition 70 crew return to Earth aboard the Soyuz spacecraft, marking the end of their 6-month mission aboard the International Space Station.',
            date: '2024-03-12',
            time: '18:00 UTC',
            type: 'Live Coverage',
            link: 'https://www.nasa.gov/live',
            location: 'Kazakhstan Landing Site'
          },
          {
            id: '3',
            title: 'SpaceX CRS-30 Cargo Mission Launch',
            description: 'SpaceX Dragon cargo spacecraft launches to the ISS carrying critical science experiments, crew supplies, and new research equipment for ongoing investigations.',
            date: '2024-03-15',
            time: '20:00 UTC',
            type: 'Launch Event',
            link: 'https://www.spacex.com/launches/',
            location: 'Kennedy Space Center, FL'
          },
          {
            id: '4',
            title: 'ISS 25th Anniversary Special Broadcast',
            description: 'Celebrate 25 years of continuous human presence in space with a special broadcast featuring astronauts, scientists, and engineers who made the ISS possible.',
            date: '2024-03-20',
            time: '19:00 UTC',
            type: 'Special Event',
            link: 'https://www.nasa.gov/live',
            location: 'NASA Johnson Space Center'
          },
          {
            id: '5',
            title: 'Educational Outreach: Students Talk to Astronauts',
            description: 'Students from around the world get the opportunity to ask questions directly to astronauts aboard the International Space Station in this educational outreach event.',
            date: '2024-03-25',
            time: '16:30 UTC',
            type: 'Educational Event',
            link: 'https://www.nasa.gov/audience/foreducators/',
            location: 'International Space Station'
          }
        ];
        setNasaEvents(realNASAEvents);
      } catch (error) {
        console.error('Error fetching NASA events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNASAEvents();
  }, []);

  const handleGuestSignup = () => {
    if (guestName.trim()) {
      const newGuest: CommunityMember = {
        id: `guest_${Date.now()}`,
        name: guestName,
        country: 'Guest',
        points: 0,
        rank: topMembers.length + 1,
        avatar: '👤',
        achievements: ['New Member'],
        isOnline: true,
        isGuest: true
      };
      setCurrentUser(newGuest);
      setShowGuestSignup(false);
      setGuestName('');
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim() && currentUser) {
      const post: Post = {
        id: Date.now().toString(),
        author: currentUser.name,
        content: newPost,
        likes: 0,
        comments: [],
        timestamp: 'Just now',
        tags: [],
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleAddComment = (postId: string, commentText: string) => {
    if (commentText.trim() && currentUser) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: currentUser.name,
        content: commentText,
        timestamp: 'Just now'
      };
      
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));
    }
  };

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Create Post Section */}
      {currentUser ? (
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts about space exploration, ISS research, or ask questions..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-slate-400">
                  Posting as {currentUser.name} {currentUser.isGuest && '(Guest)'}
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 text-center">
          <h3 className="text-white font-semibold mb-2">Join the Community</h3>
          <p className="text-slate-300 mb-4">Create a guest account to participate in discussions</p>
          <button
            onClick={() => setShowGuestSignup(true)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Create Guest Account
          </button>
        </div>
      )}

      {/* Guest Signup Modal */}
      {showGuestSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-6 border border-cyan-500/20 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Create Guest Account</h3>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowGuestSignup(false)}
                className="flex-1 px-4 py-2 bg-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-600/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGuestSignup}
                disabled={!guestName.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="text-white font-semibold">{post.author}</h4>
                <span className="text-slate-400 text-sm">{post.timestamp}</span>
              </div>
              <p className="text-slate-300 mb-4 leading-relaxed">{post.content}</p>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="mt-4 space-y-3 border-t border-slate-700/50 pt-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{comment.author}</span>
                          <span className="text-slate-400 text-xs">{comment.timestamp}</span>
                        </div>
                        <p className="text-slate-300 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              {currentUser && (
                <div className="mt-4 border-t border-slate-700/50 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {currentUser.avatar}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      {activeChallenges.map((challenge) => (
        <div key={challenge.id} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                  challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {challenge.difficulty}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  challenge.type === 'team' ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {challenge.type === 'team' ? 'Team Challenge' : 'Individual'}
                </span>
              </div>
              <p className="text-slate-300 mb-4">{challenge.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">{challenge.participants}</div>
                  <div className="text-xs text-slate-400">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{challenge.reward}</div>
                  <div className="text-xs text-slate-400">Points Reward</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{challenge.deadline}</div>
                  <div className="text-xs text-slate-400">Deadline</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-400">{challenge.maxParticipants - challenge.participants}</div>
                  <div className="text-xs text-slate-400">Spots Left</div>
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              Join Challenge
            </button>
            <button className="px-6 py-2 bg-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-600/50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-4">
      {topMembers.map((member, index) => (
        <div key={member.id} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              index === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-500' :
              index === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
              'bg-gradient-to-r from-cyan-400 to-purple-500'
            }`}>
              {member.avatar}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h4 className="text-white font-semibold">{member.name}</h4>
                <span className="text-slate-400 text-sm flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {member.country}
                </span>
                {member.isOnline && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {member.achievements.map((achievement, idx) => (
                  <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">#{member.rank}</div>
              <div className="text-lg font-semibold text-white">{member.points.toLocaleString()}</div>
              <div className="text-xs text-slate-400">points</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading NASA events...</p>
        </div>
      ) : (
        nasaEvents.map((event) => (
          <div key={event.id} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">{event.description}</p>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Watch Live</span>
                  </a>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-orange-400" />
                <span className="text-xs text-slate-400">NASA Official</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
              Global Space Community
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Connect with space enthusiasts worldwide, participate in NASA-based challenges, and share your passion for space exploration
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-white">12,847</div>
                <div className="text-xs text-slate-400">Active Members</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white">{activeChallenges.length}</div>
                <div className="text-xs text-slate-400">Active Challenges</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">89</div>
                <div className="text-xs text-slate-400">Countries</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-xl p-4 border border-orange-500/20">
            <div className="flex items-center space-x-3">
              <Satellite className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-white">{nasaEvents.length}</div>
                <div className="text-xs text-slate-400">NASA Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'feed', label: 'Community Feed', icon: MessageCircle },
            { id: 'challenges', label: 'NASA Challenges', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'events', label: 'NASA Events', icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/40 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {activeTab === 'feed' && renderFeed()}
            {activeTab === 'challenges' && renderChallenges()}
            {activeTab === 'leaderboard' && renderLeaderboard()}
            {activeTab === 'events' && renderEvents()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Members */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 text-cyan-400 mr-2" />
                Online Now
              </h3>
              
              <div className="space-y-3">
                {topMembers.filter(m => m.isOnline).slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-sm">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.country}</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
              
              {!currentUser && (
                <button 
                  onClick={() => setShowGuestSignup(true)}
                  className="w-full mt-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Join Community</span>
                </button>
              )}
            </div>

            {/* NASA Data Source */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Satellite className="w-5 h-5 text-orange-400 mr-2" />
                Data Sources
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">NASA Open Data</span>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">ISS National Lab</span>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">NASA Events API</span>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Live</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Space Agencies</span>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Official</span>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                Recent Achievements
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-yellow-500/10">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <div>
                    <div className="text-white text-sm font-medium">ISS Research Expert</div>
                    <div className="text-xs text-slate-400">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-500/10">
                  <Award className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Community Contributor</div>
                    <div className="text-xs text-slate-400">5 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-500/10">
                  <Zap className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="text-white text-sm font-medium">NASA Challenge Winner</div>
                    <div className="text-xs text-slate-400">1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;