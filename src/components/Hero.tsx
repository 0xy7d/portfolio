import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const keywords = ['technology', 'policy', 'markets', 'people', 'infrastructure'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % keywords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient (light) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.08)_100%)]"></div>
      
      {/* Animated particles (subtle) */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-600/15 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main identity */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-gray-700 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in font-serif tracking-tight">
            Malik Diyaolu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Work at the edge of <span key={wordIndex} className="text-gray-900 font-medium animate-fade-in">{keywords[wordIndex]}</span>.
          </p>
          <div className="h-px w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>


        {/* Creative ticker */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-90"></div>
          <div className="overflow-hidden">
            <div className="whitespace-nowrap animate-marquee text-gray-500 uppercase tracking-[0.2em] text-[10px] md:text-xs">
              <span className="mx-6">Malik Diyaolu Foundation</span> •
              <span className="mx-6">Terapy</span> •
              <span className="mx-6">Becoming Malik</span> •
              <span className="mx-6">Essays on policy & innovation</span> •
              <span className="mx-6">Systems design</span> •
              <span className="mx-6">Public-interest technology</span> •
              <span className="mx-6">Institutional thinking</span> •
              <span className="mx-6">Markets & infrastructure</span> •
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href="https://github.com/0xy7d"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
          >
            <Github size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </a>
          <a 
            href="https://www.linkedin.com/in/malikdiyaolu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
          >
            <Linkedin size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </a>
          <a 
            href="mailto:malik@diyaolu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
          >
            <Mail size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ArrowDown size={32} className="mx-auto text-gray-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;