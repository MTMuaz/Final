import React from 'react';
import {
  Rocket,
  Mail,
  Phone,
  MapPin,
  Github,
  Facebook,
  Twitter,
  MessageCircle,
  ExternalLink,
  Globe,
  BookOpen,
  Gamepad2,
  Users,
  Bot,
  Satellite
} from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const quickLinks = [
    { id: 'home', label: 'Home', icon: Rocket },
    { id: 'learn-iss', label: 'Learn About ISS', icon: Satellite },
    { id: 'education', label: 'Education Hub', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: ExternalLink },
    { id: 'cupola', label: 'Cupola', icon: Globe, external: true, url: 'https://iss-cupola-interacti-taj5.bolt.host/' },
    { id: 'nbl', label: 'Neutral Buoyancy Lab', icon: Users, external: true, url: 'https://astronaut-nbl-traini-3kyd.bolt.host/' },
    { id: 'physics', label: 'Physics Module', icon: Rocket, external: true, url: 'https://iss-25-quantum-space-4dn3.bolt.host/' },
    { id: 'games', label: 'Gaming Zone', icon: Gamepad2 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const socialLinks = [
    {
      name: 'Facebook - Team Explorer BD',
      url: 'https://www.facebook.com/profile.php?id=61581429201964',
      icon: Facebook,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter/X',
      url: 'https://x.com/AhnafIstiakaia',
      icon: Twitter,
      color: 'hover:text-sky-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/lahirahman63-gif',
      icon: Github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'Discord',
      url: 'https://discord.com/channels/1186022404410064957/1186022404410064960',
      icon: MessageCircle,
      color: 'hover:text-indigo-400'
    }
  ];

  return (
    <footer className="relative z-10 bg-slate-900/95 backdrop-blur-lg border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <AnimatedLogo size="small" showText={false} />
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">ISS 25 Explorer</h3>
              <p className="text-xs text-slate-400">Team Explorer BD</p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Celebrating 25 years of the International Space Station through interactive exploration, 
              education, and community engagement. Built with passion for space exploration.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-slate-800/50 text-slate-400 ${social.color} transition-all duration-300 hover:bg-slate-700/50`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  link.external ? (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-cyan-400" />
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <button
                    key={link.id}
                    onClick={() => {
                      setActiveSection(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm group"
                  >
                    <Icon className="w-4 h-4 group-hover:text-cyan-400" />
                    <span>{link.label}</span>
                    </button>
                  )
                );
              })}
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium text-sm">Email</div>
                  <a
                    href="mailto:tahmidmuaz50@gmail.com"
                    className="text-slate-300 text-sm hover:text-cyan-400 transition-colors"
                  >
                    tahmidmuaz50@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium text-sm">Phone</div>
                  <a
                    href="tel:+8801744799261"
                    className="text-slate-300 text-sm hover:text-purple-400 transition-colors"
                  >
                    +880 1744 799261
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Facebook className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium text-sm">Facebook</div>
                  <a
                    href="https://www.facebook.com/profile.php?id=61581429201964"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 text-sm hover:text-blue-400 transition-colors"
                  >
                    Team Explorer BD
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* NASA Resources */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">NASA Resources</h4>
            <div className="space-y-3">
              <a
                href="https://www.nasa.gov/mission_pages/station/main/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm group"
              >
                <ExternalLink className="w-4 h-4 group-hover:text-cyan-400" />
                <span>Official ISS Page</span>
              </a>
              <a
                href="https://www.nasa.gov/live"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm group"
              >
                <ExternalLink className="w-4 h-4 group-hover:text-cyan-400" />
                <span>NASA Live</span>
              </a>
              <a
                href="https://spotthestation.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm group"
              >
                <ExternalLink className="w-4 h-4 group-hover:text-cyan-400" />
                <span>Spot the Station</span>
              </a>
              <a
                href="https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/what-is-the-iss-58.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm group"
              >
                <ExternalLink className="w-4 h-4 group-hover:text-cyan-400" />
                <span>ISS Education</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2025 ISS 25 Explorer. Created for NASA Space Apps Challenge 2025.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-slate-400">Data sources:</span>
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                NASA Open Data
              </a>
              <a
                href="https://wheretheiss.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                ISS API
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;