import React, { useState } from 'react';
import AnimatedLogo from './AnimatedLogo';
import { 
  Globe, 
  BookOpen, 
  Gamepad2, 
  Users, 
  Bot,
  Menu,
  X,
  Mail,
  Camera,
  Rocket,
  Satellite
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Rocket },
    { id: 'learn-iss', label: 'Learn About ISS', icon: Satellite },
    { id: 'education', label: 'Education Hub', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'cupola', label: 'Cupola', icon: Globe, external: true, url: 'https://iss-cupola-interacti-taj5.bolt.host/' },
    { id: 'nbl', label: 'Neutral Buoyancy Lab', icon: Users, external: true, url: 'https://astronaut-nbl-traini-3kyd.bolt.host/' },
    { id: 'physics', label: 'Physics Module', icon: Rocket, external: true, url: 'https://iss-25-quantum-space-4dn3.bolt.host/' },
    { id: 'games', label: 'Gaming Zone', icon: Gamepad2 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="w-full max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <AnimatedLogo size="small" showText={true} />
            
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  item.external ? (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  ) : (
                    <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="flex items-center justify-between px-4 py-3">
          <AnimatedLogo size="small" showText={true} />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-cyan-400 hover:bg-slate-800/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-cyan-500/20">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  item.external ? (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  ) : (
                    <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    </button>
                  )
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;