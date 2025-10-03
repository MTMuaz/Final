import React, { useState } from 'react';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import StarField from './components/StarField';
import HomePage from './components/HomePage';
import WorkingGames from './components/WorkingGames';
import AIAssistant from './components/AIAssistant';
import Community from './components/Community';
import ContactForm from './components/ContactForm';
import EducationHub from './components/EducationHubNew';
import LearnAboutISS from './components/LearnAboutISS';
import Footer from './components/Footer';
import Gallery from './components/GalleryNew';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage setActiveSection={setActiveSection} />;
      case 'education':
        return <EducationHub />;
      case 'learn-iss':
        return <LearnAboutISS />;
      case 'games':
        return <WorkingGames />;
      case 'community':
        return <Community />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'contact':
        return <ContactForm />;
      case 'gallery':
        return <Gallery />;
      default:
        return <HomePage setActiveSection={setActiveSection} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <StarField />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="relative">
        {renderActiveSection()}
      </main>
      <Footer setActiveSection={setActiveSection} />
      </div>
    </>
  );
}

export default App;