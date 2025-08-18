import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

const NextButton: React.FC = () => {
  const { nextId, nextLabel, goToNext } = useNavigation();
  if (!nextId) return null;
  return (
    <button
      aria-label={`Go to ${nextLabel}`}
      onClick={goToNext}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 shadow-lg transition-colors"
    >
      <span className="hidden sm:inline text-sm font-medium">Next: {nextLabel}</span>
      <ArrowRight size={18} />
    </button>
  );
};

export default NextButton;


