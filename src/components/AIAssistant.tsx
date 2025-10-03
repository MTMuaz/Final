import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Sparkles,
  Brain,
  Rocket,
  Globe,
  BookOpen
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Space Assistant. I can help you learn about the International Space Station, space exploration, NASA missions, and answer any questions about space science. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const spaceKnowledge = {
    iss: {
      keywords: ['iss', 'international space station', 'space station', 'orbital', 'station'],
      responses: [
        "The International Space Station (ISS) is humanity's greatest achievement in space! Launched in 1998, it orbits Earth at 408 km altitude, traveling at 27,600 km/h. The ISS completes one orbit every 93 minutes, giving astronauts 16 sunrises and sunsets daily.",
        "The ISS has been continuously inhabited since November 2000 - that's over 23 years of human presence in space! It's a joint project between NASA (USA), Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada). The station serves as a microgravity laboratory for groundbreaking scientific research.",
        "The ISS is massive - about the size of a football field! It has a pressurized volume of 916 cubic meters, weighs 420,000 kg, and its solar arrays span 73 meters. Over 270 astronauts from 19 countries have called it home, conducting over 3,000 scientific experiments."
      ]
    },
    nasa: {
      keywords: ['nasa', 'space agency', 'astronaut', 'mission', 'space apps', 'challenge'],
      responses: [
        "NASA (National Aeronautics and Space Administration) was established in 1958 and has been pushing the boundaries of human knowledge ever since! NASA leads the civilian space program, conducts aeronautics research, and advances space science for all humanity.",
        "NASA's achievements are legendary: the Apollo moon landings (1969-1972), the Space Shuttle program (1981-2011), Mars rovers including Perseverance and Curiosity, the Hubble Space Telescope, and the revolutionary James Webb Space Telescope!",
        "Current NASA missions are incredible! The Artemis program aims to return humans to the Moon by 2026, the Perseverance rover is searching for ancient life on Mars, and the Parker Solar Probe is 'touching' the Sun. NASA also hosts the annual Space Apps Challenge, the world's largest global hackathon!"
      ]
    },
    space: {
      keywords: ['space', 'universe', 'cosmos', 'galaxy', 'solar system', 'planets', 'stars'],
      responses: [
        "Space is mind-blowingly vast! Our observable universe spans 93 billion light-years and contains over 2 trillion galaxies, each with billions of stars. That means there are more stars in the universe than grains of sand on all Earth's beaches!",
        "Our solar system formed 4.6 billion years ago from a collapsing cloud of gas and dust. It includes our Sun, 8 planets, over 200 moons, millions of asteroids, and countless comets. Earth is perfectly positioned in the 'Goldilocks zone' - not too hot, not too cold, just right for life!",
        "Space is mostly empty vacuum, but it's filled with cosmic radiation, mysterious dark matter (27%), and dark energy (68%). The temperature of space is -270°C, just 3 degrees above absolute zero. Despite being 'empty,' space is full of wonder and discovery!"
      ]
    },
    astronauts: {
      keywords: ['astronaut', 'crew', 'spacewalk', 'eva', 'cosmonauts', 'space suit'],
      responses: [
        "Becoming an astronaut requires years of intense training! Candidates learn spacecraft systems, practice scientific experiments, train underwater for spacewalks, and develop survival skills. Only the most exceptional individuals are selected from thousands of applicants.",
        "Life in space is both amazing and challenging! Astronauts experience microgravity, which causes bone loss and muscle atrophy. They exercise 2.5 hours daily using specialized equipment to stay healthy. Everything floats, including food, water, and even tears!",
        "Spacewalks (EVAs - Extravehicular Activities) are the ultimate adventure! Astronauts wear spacesuits that are like personal spacecraft, providing life support for up to 8 hours. They perform maintenance, install new equipment, and conduct experiments outside the ISS while traveling at 27,600 km/h!"
      ]
    },
    experiments: {
      keywords: ['experiment', 'research', 'science', 'microgravity', 'laboratory', 'studies'],
      responses: [
        "The ISS is the ultimate laboratory in space! Microgravity allows scientists to study protein crystallization, fluid physics, combustion, and materials science in ways impossible on Earth. Without gravity's interference, we can observe pure scientific phenomena.",
        "Over 3,000 groundbreaking experiments have been conducted on the ISS! Research includes medical studies on bone loss and muscle atrophy, plant growth for future Mars missions, fire behavior in microgravity, advanced materials development, and cutting-edge technology demonstrations.",
        "ISS research directly benefits life on Earth! Discoveries have led to improved cancer treatments, stronger materials for cars and planes, better water purification systems, advances in telemedicine, new drug development techniques, and even better food preservation methods."
      ]
    },
    planets: {
      keywords: ['planet', 'mars', 'venus', 'jupiter', 'saturn', 'mercury', 'uranus', 'neptune', 'earth'],
      responses: [
        "Our solar system has 8 fascinating planets! Mercury is closest to the Sun and extremely hot, Venus has a toxic atmosphere, Earth is our perfect home, Mars is the 'Red Planet' we're planning to visit, Jupiter is a gas giant with over 80 moons, Saturn has spectacular rings, and Uranus and Neptune are ice giants.",
        "Mars is humanity's next destination! It's about half Earth's size, has seasons like Earth, and evidence suggests it once had liquid water. NASA's Perseverance rover is currently searching for signs of ancient microbial life, and we're planning crewed missions in the 2030s!",
        "Earth is truly special - it's the only known planet with life! Our planet has liquid water, a protective atmosphere, and a magnetic field that shields us from harmful radiation. From the ISS, astronauts see Earth's beauty: blue oceans, white clouds, and the thin atmosphere that protects all life."
      ]
    },
    galaxy: {
      keywords: ['galaxy', 'milky way', 'stars', 'nebula', 'black hole'],
      responses: [
        "Our Milky Way galaxy is home to over 100 billion stars! It's a spiral galaxy about 100,000 light-years across. We're located in one of the spiral arms, about 26,000 light-years from the galactic center, which contains a supermassive black hole called Sagittarius A*.",
        "Stars are born in nebulae - vast clouds of gas and dust. Our Sun is a middle-aged star, about 4.6 billion years old, and will shine for another 5 billion years. The nearest star to us (besides the Sun) is Proxima Centauri, 4.24 light-years away!",
        "Black holes are among the most mysterious objects in the universe! They're regions where gravity is so strong that nothing, not even light, can escape. The Event Horizon Telescope recently captured the first image of a black hole, and we've detected gravitational waves from black hole mergers!"
      ]
    }
  };

  const quickQuestions = [
    "How fast does the ISS travel?",
    "What experiments are done on the ISS?",
    "How do astronauts sleep in space?",
    "What is NASA's Artemis program?",
    "How long is a day on the ISS?",
    "What do astronauts eat in space?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm excited to talk about space with you. What aspect of space exploration interests you most?";
    }

    // Check for thanks
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! I love sharing knowledge about space. Is there anything else you'd like to explore?";
    }

    // Find matching knowledge category
    for (const [category, data] of Object.entries(spaceKnowledge)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
        return randomResponse;
      }
    }

    // Specific question responses
    if (input.includes('how fast') && input.includes('iss')) {
      return "The ISS travels at an incredible speed of 27,600 km/h (17,150 mph)! At this speed, it orbits Earth every 93 minutes, meaning astronauts see 16 sunrises and sunsets every day.";
    }

    if (input.includes('sleep') && input.includes('space')) {
      return "Astronauts sleep in sleeping bags attached to the walls! Without gravity, they can sleep in any orientation. They use eye masks and earplugs because the ISS experiences 16 day/night cycles every 24 hours.";
    }

    if (input.includes('eat') && input.includes('space')) {
      return "Space food has come a long way! Astronauts eat rehydrated meals, thermostabilized foods, and fresh fruits delivered by cargo ships. They use special utensils and containers to prevent food from floating away.";
    }

    if (input.includes('artemis')) {
      return "Artemis is NASA's ambitious program to return humans to the Moon by 2026! Named after Apollo's twin sister, it aims to land the first woman and next man on the lunar surface. The program includes the powerful SLS rocket, Orion spacecraft, and plans for a lunar Gateway station. It's our stepping stone to Mars!";
    }

    if (input.includes('25') || input.includes('anniversary')) {
      return "2023 marks the 25th anniversary of the ISS! The first module, Zarya, was launched in 1998. Since then, the ISS has hosted over 270 astronauts from 19 countries, conducted over 3,000 experiments, and traveled over 4 billion kilometers - that's like going to Neptune and back!";
    }

    if (input.includes('space apps') || input.includes('challenge')) {
      return "The NASA Space Apps Challenge is the world's largest global hackathon! Every year, thousands of participants worldwide create innovative solutions to challenges we face on Earth and in space. It's an amazing opportunity to use NASA's open data to solve real problems and connect with space enthusiasts globally!";
    }

    // Default responses for unknown queries
    const defaultResponses = [
      "That's a great question about space! While I don't have specific information about that, I can tell you about the ISS, NASA missions, or space science. What would you like to explore?",
      "I'm still learning about that topic! However, I have lots of knowledge about the International Space Station, astronaut life, and space exploration. What interests you most?",
      "Interesting question! Let me share something fascinating about space instead: Did you know that one day on the ISS includes 16 sunrises and sunsets as it orbits Earth?",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with Web Speech API
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real app, this would use Text-to-Speech API
  };

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Space Assistant
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Your intelligent companion for space exploration knowledge. Ask me anything about the ISS, NASA, astronauts, and space science!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl border border-cyan-500/20 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Space AI Assistant</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Online</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleListening}
                      className={`p-2 rounded-lg transition-colors ${
                        isListening ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400 hover:text-cyan-400'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleSpeaking}
                      className={`p-2 rounded-lg transition-colors ${
                        isSpeaking ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-400 hover:text-cyan-400'
                      }`}
                    >
                      {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'bg-slate-800/50 text-slate-100 border border-slate-700/50'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <div className={`text-xs text-slate-400 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-slate-700/50">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me about space, the ISS, NASA, or astronauts..."
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-cyan-400 mr-2" />
                Quick Questions
              </h3>
              
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/40 text-slate-300 hover:text-white transition-all text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Knowledge Areas */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 text-cyan-400 mr-2" />
                Knowledge Areas
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30">
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 text-sm">International Space Station</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300 text-sm">NASA Missions</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">Space Science</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30">
                  <Bot className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-300 text-sm">Astronaut Life</span>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4">AI Features</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Voice Input</span>
                  <span className={`px-2 py-1 rounded text-xs ${isListening ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400'}`}>
                    {isListening ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Text-to-Speech</span>
                  <span className={`px-2 py-1 rounded text-xs ${isSpeaking ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-400'}`}>
                    {isSpeaking ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Smart Responses</span>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Context Awareness</span>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;