import React, { useState } from 'react';
import { 
  Satellite, 
  Globe, 
  Users, 
  Microscope, 
  Rocket,
  Calendar,
  MapPin,
  Clock,
  Play,
  ExternalLink,
  BookOpen,
  Star,
  Zap,
  Target,
  Award
} from 'lucide-react';

const LearnAboutISS: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'history' | 'science' | 'life' | 'future'>('overview');

  const issStats = [
    { label: 'Altitude', value: '408 km', icon: MapPin, color: 'text-cyan-400' },
    { label: 'Speed', value: '27,600 km/h', icon: Zap, color: 'text-purple-400' },
    { label: 'Orbit Time', value: '93 minutes', icon: Clock, color: 'text-green-400' },
    { label: 'Mass', value: '420,000 kg', icon: Target, color: 'text-orange-400' },
    { label: 'Solar Array Span', value: '73 meters', icon: Star, color: 'text-yellow-400' },
    { label: 'Pressurized Volume', value: '916 m³', icon: Globe, color: 'text-blue-400' }
  ];

  const modules = [
    {
      name: 'Zarya',
      country: 'Russia',
      year: 1998,
      purpose: 'First module, provides power and propulsion',
      image: '🛰️'
    },
    {
      name: 'Unity (Node 1)',
      country: 'USA',
      year: 1998,
      purpose: 'Connecting hub for other modules',
      image: '🔗'
    },
    {
      name: 'Zvezda',
      country: 'Russia',
      year: 2000,
      purpose: 'Service module with life support systems',
      image: '🏠'
    },
    {
      name: 'Destiny',
      country: 'USA',
      year: 2001,
      purpose: 'Primary research laboratory',
      image: '🔬'
    },
    {
      name: 'Kibo',
      country: 'Japan',
      year: 2008,
      purpose: 'Largest laboratory module',
      image: '🧪'
    },
    {
      name: 'Columbus',
      country: 'Europe',
      year: 2008,
      purpose: 'European research laboratory',
      image: '🌍'
    }
  ];

  const experiments = [
    {
      title: 'Protein Crystal Growth',
      description: 'Growing larger, more perfect protein crystals in microgravity for drug development',
      impact: 'Better understanding of diseases and improved medications',
      image: '💊'
    },
    {
      title: 'Plant Growth Studies',
      description: 'Understanding how plants grow in space for future long-duration missions',
      impact: 'Sustainable food production for Mars missions',
      image: '🌱'
    },
    {
      title: 'Materials Science',
      description: 'Creating new alloys and materials impossible to make on Earth',
      impact: 'Stronger, lighter materials for aerospace and consumer products',
      image: '🔧'
    },
    {
      title: 'Medical Research',
      description: 'Studying bone loss, muscle atrophy, and cardiovascular changes',
      impact: 'Treatments for osteoporosis and age-related conditions',
      image: '🏥'
    }
  ];

  const timeline = [
    { year: 1998, event: 'First module (Zarya) launched', milestone: true },
    { year: 2000, event: 'First crew arrives (Expedition 1)', milestone: true },
    { year: 2001, event: 'Destiny laboratory added', milestone: false },
    { year: 2008, event: 'Kibo and Columbus labs installed', milestone: false },
    { year: 2011, event: 'Space Shuttle program ends', milestone: true },
    { year: 2020, event: 'Commercial Crew era begins', milestone: true },
    { year: 2023, event: '25th Anniversary celebration', milestone: true }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Live ISS Feed */}
      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-3"></div>
            ISS Live Stream
          </h3>
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full">LIVE</span>
        </div>

        <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/iYmvCUonukw?autoplay=0"
            title="ISS Live Stream - Earth from Space"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Watch Earth from Space:</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Experience our planet from the unique perspective of astronauts aboard the International Space Station.
            This live HD feed shows breathtaking views of Earth as the ISS orbits at 27,600 km/h, 408 kilometers
            above our planet. The station completes an orbit every 93 minutes, providing stunning views of continents,
            oceans, weather patterns, and the thin blue line of our atmosphere.
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Note: Stream may occasionally show internal ISS views or go offline during crew sleep periods or maintenance.
          </p>
        </div>
      </div>

      {/* ISS Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What is the ISS */}
      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-6">What is the International Space Station?</h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              The International Space Station (ISS) is a modular space station in low Earth orbit. 
              It is a multinational collaborative project involving five participating space agencies: 
              NASA (United States), Roscosmos (Russia), JAXA (Japan), ESA (Europe), and CSA (Canada).
            </p>
            
            <p className="text-slate-300 leading-relaxed">
              The ISS serves as a microgravity and space environment research laboratory where 
              scientific research is conducted in astrobiology, astronomy, meteorology, physics, 
              and other fields. It is suited for testing the spacecraft systems and equipment 
              required for possible future long-duration missions to the Moon and Mars.
            </p>
            
            <p className="text-slate-300 leading-relaxed">
              Since November 2000, the ISS has been continuously inhabited by astronauts and 
              cosmonauts from around the world, making it one of humanity's greatest achievements 
              in international cooperation and space exploration.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-2">Key Features:</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Largest artificial object in space</li>
                <li>• Visible to the naked eye from Earth</li>
                <li>• 16 pressurized modules</li>
                <li>• Multiple docking ports for visiting spacecraft</li>
                <li>• Advanced life support systems</li>
                <li>• Sophisticated research facilities</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">International Partners:</h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300 text-sm">
                <div>🇺🇸 NASA (USA)</div>
                <div>🇷🇺 Roscosmos (Russia)</div>
                <div>🇯🇵 JAXA (Japan)</div>
                <div>🇪🇺 ESA (Europe)</div>
                <div>🇨🇦 CSA (Canada)</div>
                <div>🌍 15+ Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">25 Years of ISS History</h3>
        <p className="text-slate-300">From concept to reality: The incredible journey of building humanity's home in space</p>
      </div>

      {/* The Birth of ISS */}
      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Rocket className="w-6 h-6 text-cyan-400 mr-3" />
          The Birth of the International Space Station
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-cyan-400 mb-3">From Dream to Reality</h4>
            <p className="text-slate-300 leading-relaxed">
              The International Space Station was born from humanity's greatest dream - to live and work among the stars. 
              In the 1980s, President Ronald Reagan announced the ambitious Space Station Freedom project, envisioning 
              a permanent American outpost in space.
            </p>
            
            <p className="text-slate-300 leading-relaxed">
              However, the true magic happened when former enemies became partners. After the Cold War ended, 
              the United States and Russia joined forces, combining their space expertise. This partnership 
              transformed a national project into humanity's greatest international collaboration.
            </p>
            
            <p className="text-slate-300 leading-relaxed">
              On November 20, 1998, the Russian Zarya module launched from Baikonur Cosmodrome, marking the 
              beginning of the ISS era. This wasn't just a launch - it was the birth of humanity's permanent 
              home in space, a testament to what we can achieve when we work together.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">Key Milestones in ISS Birth:</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium text-sm">1984</div>
                    <div className="text-slate-300 text-sm">President Reagan announces Space Station Freedom</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium text-sm">1993</div>
                    <div className="text-slate-300 text-sm">Russia joins the project, creating the ISS partnership</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium text-sm">1998</div>
                    <div className="text-slate-300 text-sm">Zarya module launches - ISS construction begins</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium text-sm">2000</div>
                    <div className="text-slate-300 text-sm">First crew arrives - continuous human presence begins</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
              <div className="text-slate-300 text-sm">Countries United</div>
              <div className="text-xs text-slate-400 mt-1">In peaceful collaboration</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
          <h4 className="text-yellow-400 font-semibold mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            The Miracle of International Cooperation
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            The ISS represents humanity at its best. Former adversaries became partners, sharing technology, 
            resources, and dreams. Russian Soyuz spacecraft carry American astronauts, American modules house 
            European experiments, and Japanese robotic arms assist Canadian manipulator systems. The ISS proves 
            that when we reach for the stars together, there are no limits to what we can achieve.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
        
        {timeline.map((item, index) => (
          <div key={item.year} className="relative flex items-center space-x-6 pb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border-4 ${
              item.milestone 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-400' 
                : 'bg-slate-700 border-slate-500'
            }`}>
              {item.year}
            </div>
            
            <div className="flex-1 bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
              <p className="text-white font-medium">{item.event}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-6">ISS Modules</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-4xl mb-4 text-center">{module.image}</div>
              <h4 className="text-white font-bold mb-2">{module.name}</h4>
              <div className="text-cyan-400 text-sm mb-2">{module.country} • {module.year}</div>
              <p className="text-slate-300 text-sm">{module.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScience = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Scientific Research on the ISS</h3>
        <p className="text-slate-300">Over 3,000 experiments conducted, advancing human knowledge and technology</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {experiments.map((experiment, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
            <div className="text-4xl mb-4">{experiment.image}</div>
            <h4 className="text-xl font-bold text-white mb-3">{experiment.title}</h4>
            <p className="text-slate-300 mb-4 leading-relaxed">{experiment.description}</p>
            <div className="bg-cyan-500/10 rounded-lg p-3">
              <h5 className="text-cyan-400 font-semibold mb-1">Impact on Earth:</h5>
              <p className="text-slate-300 text-sm">{experiment.impact}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-6">Why Microgravity Matters</h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              The unique microgravity environment of the ISS allows scientists to conduct experiments 
              impossible on Earth. Without gravity's influence, researchers can study fundamental 
              processes in physics, chemistry, and biology in ways never before possible.
            </p>
            
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-2">Research Areas:</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Protein crystallization for drug development</li>
                <li>• Combustion science for cleaner engines</li>
                <li>• Fluid physics and heat transfer</li>
                <li>• Materials science and metallurgy</li>
                <li>• Plant biology and agriculture</li>
                <li>• Human physiology and medicine</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Benefits to Humanity:</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• Advanced cancer treatments</li>
                <li>• Better water purification systems</li>
                <li>• Improved weather forecasting</li>
                <li>• Enhanced food preservation</li>
                <li>• Revolutionary materials</li>
                <li>• Medical breakthroughs</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">3,000+</div>
              <div className="text-slate-300 text-sm">Experiments Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLife = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Life Aboard the ISS</h3>
        <p className="text-slate-300">Discover how astronauts live, work, and thrive in the unique environment of space</p>
      </div>

      {/* Life in Space Videos */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Video 1 */}
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-4 border border-slate-700/50">
          <a 
            href="https://www.youtube.com/watch?v=XkM_04Ch76E"
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-video rounded-lg overflow-hidden bg-black mb-3 relative group hover:scale-105 transition-transform duration-300"
          >
            <img
              src="https://img.youtube.com/vi/XkM_04Ch76E/maxresdefault.jpg"
              alt="Daily Life on the International Space Station"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          </a>
          <h4 className="text-white font-semibold mb-2">Daily Life on the ISS</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Step into the daily routine of astronauts living 400 kilometers above Earth. This fascinating look 
            at life aboard the ISS shows how crew members wake up, eat meals, conduct experiments, exercise, 
            and sleep while floating in microgravity. Discover the unique challenges and incredible adaptations 
            required for humans to thrive in the space environment, from managing floating objects to maintaining 
            physical fitness without gravity's help.
          </p>
        </div>

        {/* Video 2 */}
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-4 border border-slate-700/50">
          <a 
            href="https://www.youtube.com/watch?v=OBIxbULqDxY"
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-video rounded-lg overflow-hidden bg-black mb-3 relative group hover:scale-105 transition-transform duration-300"
          >
            <img
              src="https://img.youtube.com/vi/OBIxbULqDxY/maxresdefault.jpg"
              alt="Working and Conducting Experiments in Space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          </a>
          <h4 className="text-white font-semibold mb-2">Working in Microgravity</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Witness the incredible work being done aboard the International Space Station. This detailed look 
            at space operations shows astronauts conducting cutting-edge scientific experiments, maintaining 
            complex station systems, and using specialized tools designed for microgravity environments. 
            See how researchers take advantage of the unique conditions in space to advance our understanding 
            of physics, biology, materials science, and medicine in ways impossible on Earth.
          </p>
        </div>

        {/* Video 3 */}
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-4 border border-slate-700/50">
          <a 
            href="https://www.youtube.com/watch?v=-Y04Zic1-r4"
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-video rounded-lg overflow-hidden bg-black mb-3 relative group hover:scale-105 transition-transform duration-300"
          >
            <img
              src="https://img.youtube.com/vi/-Y04Zic1-r4/maxresdefault.jpg"
              alt="Personal Life and Human Experience in Space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          </a>
          <h4 className="text-white font-semibold mb-2">Personal Life in Space</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Experience the deeply personal and emotional side of living in space. This intimate portrayal 
            shows astronauts sharing meals, staying connected with loved ones on Earth, and finding moments 
            of profound wonder while gazing at our beautiful planet below. Discover how the human spirit 
            adapts to life among the stars, the psychological challenges of isolation, and the life-changing 
            perspective that comes from seeing Earth as a fragile blue marble in the vast cosmos.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <h4 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 text-cyan-400 mr-2" />
            Daily Schedule
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Wake up & Personal Hygiene</span>
              <span className="text-cyan-400">06:00 GMT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Daily Planning Conference</span>
              <span className="text-cyan-400">07:05 GMT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Scientific Work</span>
              <span className="text-cyan-400">08:10-19:30 GMT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Exercise (2.5 hours)</span>
              <span className="text-cyan-400">Daily</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">Sleep</span>
              <span className="text-cyan-400">21:30 GMT</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-bold text-white mb-3">🍽️ Space Food</h4>
            <p className="text-slate-300 text-sm">
              Astronauts eat rehydrated meals, thermostabilized foods, and fresh fruits. 
              Special utensils prevent food from floating away in microgravity.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-bold text-white mb-3">😴 Sleeping in Space</h4>
            <p className="text-slate-300 text-sm">
              Astronauts sleep in sleeping bags attached to walls. They use eye masks 
              and earplugs due to 16 day/night cycles every 24 hours.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-bold text-white mb-3">💪 Exercise</h4>
            <p className="text-slate-300 text-sm">
              Daily 2.5-hour exercise sessions prevent bone loss and muscle atrophy 
              using specialized equipment like COLPA and treadmills.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-6">Challenges of Living in Space</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-slate-800/50 rounded-xl">
            <div className="text-3xl mb-3">🦴</div>
            <h4 className="text-white font-semibold mb-2">Bone Loss</h4>
            <p className="text-slate-300 text-sm">Astronauts lose 1-2% bone density per month</p>
          </div>
          
          <div className="text-center p-6 bg-slate-800/50 rounded-xl">
            <div className="text-3xl mb-3">💪</div>
            <h4 className="text-white font-semibold mb-2">Muscle Atrophy</h4>
            <p className="text-slate-300 text-sm">Muscles weaken without gravity resistance</p>
          </div>
          
          <div className="text-center p-6 bg-slate-800/50 rounded-xl">
            <div className="text-3xl mb-3">🧠</div>
            <h4 className="text-white font-semibold mb-2">Psychological</h4>
            <p className="text-slate-300 text-sm">Isolation and confinement challenges</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFuture = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Future of the ISS</h3>
        <p className="text-slate-300">Looking ahead: The next chapter of human space exploration</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <h4 className="text-xl font-bold text-white mb-4">🚀 Commercial Space Stations</h4>
          <p className="text-slate-300 mb-4">
            Private companies are developing commercial space stations to replace the ISS, 
            enabling continued research and commercial activities in low Earth orbit.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Axiom Space Station</li>
            <li>• Blue Origin Orbital Reef</li>
            <li>• Sierra Space Dream Chaser</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <h4 className="text-xl font-bold text-white mb-4">🌙 Gateway to Deep Space</h4>
          <p className="text-slate-300 mb-4">
            The ISS serves as a testbed for technologies needed for lunar bases 
            and Mars missions, including life support systems and crew psychology.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Artemis Moon Program</li>
            <li>• Mars exploration preparation</li>
            <li>• Deep space technologies</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-6">ISS Legacy</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4">Scientific Achievements:</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Over 3,000 scientific investigations</li>
              <li>• Breakthrough medical research</li>
              <li>• Advanced materials development</li>
              <li>• Earth observation and climate studies</li>
              <li>• Technology demonstrations</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-purple-400 font-semibold mb-4">International Cooperation:</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 15+ countries involved</li>
              <li>• 270+ astronauts from 19 nations</li>
              <li>• Peaceful collaboration model</li>
              <li>• Shared resources and expertise</li>
              <li>• Cultural exchange in space</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg">
          <h4 className="text-xl font-bold text-white mb-2">The ISS: Humanity's Greatest Achievement</h4>
          <p className="text-slate-300">
            A testament to what we can accomplish when we work together toward a common goal
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Learn About the ISS
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover the incredible story of humanity's greatest achievement in space - 
            the International Space Station
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: 'overview', label: 'Overview', icon: Satellite },
            { id: 'history', label: 'History', icon: Calendar },
            { id: 'science', label: 'Science', icon: Microscope },
            { id: 'life', label: 'Life in Space', icon: Users },
            { id: 'future', label: 'Future', icon: Rocket }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === tab.id
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
        <div>
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'history' && renderHistory()}
          {activeSection === 'science' && renderScience()}
          {activeSection === 'life' && renderLife()}
          {activeSection === 'future' && renderFuture()}
        </div>
      </div>
    </div>
  );
};

export default LearnAboutISS;