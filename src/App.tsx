import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Writing from './components/Writing';
import BecomingMalik from './components/BecomingMalik';
import Contact from './components/Contact';
import CV from './components/CV';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  // Sync state with URL hash for direct linking and CTA navigation
  useEffect(() => {
    const validSections = new Set([
      'home',
      'about',
      'timeline',
      'projects',
      'writing',
      'becoming-malik',
      'cv',
      'contact',
    ]);

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (validSections.has(hash)) {
        setCurrentSection(hash);
      } else if (hash === '') {
        setCurrentSection('home');
      }
    };

    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return <About />;
      case 'timeline':
        return <Timeline />;
      case 'projects':
        return <Projects />;
      case 'writing':
        return <Writing />;
      case 'becoming-malik':
        return <BecomingMalik />;
      case 'cv':
        return <CV />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main className="transition-all duration-700 ease-in-out pt-14 md:pt-0">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;