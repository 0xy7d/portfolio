import React from 'react';
import { Home, User, Clock, FolderGit2, PenSquare, Film, FileText, Handshake, Menu } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setCurrentSection }) => {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'projects', label: 'Projects' },
    { id: 'writing', label: 'Writing' },
    { id: 'becoming-malik', label: 'Becoming Malik' },
    { id: 'cv', label: 'CV' },
    { id: 'contact', label: 'Collaborate' }
  ];

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    window.location.hash = section;
  };

  const iconMap: Record<string, React.ReactNode> = {
    home: <Home size={16} />,
    about: <User size={16} />,
    timeline: <Clock size={16} />,
    projects: <FolderGit2 size={16} />,
    writing: <PenSquare size={16} />,
    'becoming-malik': <Film size={16} />,
    cv: <FileText size={16} />,
    contact: <Handshake size={16} />,
  };

  return (
    <>
      {/* Right-edge handle (desktop) */}
      <button
        aria-label="Open navigation"
        onClick={() => setIsPanelOpen(true)}
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 px-3 py-2 rounded-l-lg bg-white/80 border border-r-0 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-white transition-colors items-center gap-2 shadow"
      >
        <Menu size={16} />
        <span className="text-xs uppercase tracking-wider">Menu</span>
      </button>

      {/* Slide-out panel (desktop) */}
      <aside
        className={`hidden md:flex fixed right-0 top-0 h-full w-72 z-50 bg-white/70 backdrop-blur-md border-l border-white flex-col transform transition-transform duration-300 ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50/10 to-neutral-50/5" />
        <nav className="flex-1 overflow-y-auto px-3 py-2 mt-10 flex items-center">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    handleNavigate(item.id);
                    setIsPanelOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                    currentSection === item.id
                      ? 'bg-blue-50/60 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/70 border border-transparent'
                  }`}
                >
                  <span className="opacity-80">{iconMap[item.id]}</span>
                  <span className="uppercase tracking-wider">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4 text-xs text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Malik
        </div>
      </aside>

      {/* Backdrop for desktop */}
      {isPanelOpen && (
        <div
          className="hidden md:block fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
          onClick={() => setIsPanelOpen(false)}
        />
      )}

      {/* Floating button (mobile + tablet) */}
      <button
        aria-label="Open navigation"
        onClick={() => setIsPanelOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-white/90 border border-gray-300 text-gray-800 flex items-center justify-center shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Overlay sheet (mobile) */}
      {isPanelOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col">
          <nav className="flex-1 px-6 flex flex-col items-center justify-center space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigate(item.id);
                  setIsPanelOpen(false);
                }}
                className={`w-full max-w-sm flex items-center gap-3 px-3 py-3 rounded-md text-base transition-colors ${
                  currentSection === item.id ? 'text-blue-700 bg-blue-50' : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{iconMap[item.id]}</span>
                <span className="uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto px-6 py-6 text-xs text-gray-500">© {new Date().getFullYear()} Malik</div>
          <button
            className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/80 border border-gray-300 text-gray-800"
            onClick={() => setIsPanelOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default Header;