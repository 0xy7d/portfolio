import React, { createContext, useContext, useMemo } from 'react';

type SectionId = 'home' | 'about' | 'timeline' | 'projects' | 'writing' | 'becoming-malik' | 'cv' | 'contact';

interface NavigationContextValue {
  currentSection: SectionId;
  setCurrentSection: (id: SectionId) => void;
  goTo: (id: SectionId) => void;
  goToNext: () => void;
  nextId: SectionId | null;
  nextLabel: string | null;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

const ORDER: SectionId[] = ['about', 'projects', 'writing', 'cv', 'contact'];
const LABELS: Record<SectionId, string> = {
  home: 'Home',
  about: 'About',
  timeline: 'Timeline',
  projects: 'Projects',
  writing: 'Writing',
  'becoming-malik': 'Becoming Malik',
  cv: 'Experience',
  contact: 'Contact',
};

export const NavigationProvider: React.FC<{
  currentSection: SectionId;
  setCurrentSection: (id: SectionId) => void;
  children: React.ReactNode;
}> = ({ currentSection, setCurrentSection, children }) => {
  const value = useMemo<NavigationContextValue>(() => {
    const goTo = (id: SectionId) => {
      setCurrentSection(id);
      window.location.hash = id;
    };
    const idx = ORDER.indexOf(currentSection);
    const nextId = idx >= 0 && idx < ORDER.length - 1 ? ORDER[idx + 1] : currentSection === 'about' && ORDER.length > 0 ? ORDER[0] : null;
    const nextLabel = nextId ? LABELS[nextId] : null;
    const goToNext = () => {
      if (nextId) goTo(nextId);
    };
    return { currentSection, setCurrentSection, goTo, goToNext, nextId, nextLabel };
  }, [currentSection, setCurrentSection]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};


