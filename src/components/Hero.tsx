import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const keywords = ['technology', 'policy', 'arts', 'economics', 'people', 'infrastructure'];
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
      
      {/* Tiny animated shapes with directional drift and soft pulsing */}
      <div className="absolute inset-0">
        {[...Array(16)].map((_, i) => (
          <div
            key={`dr-${i}`}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400/70 to-purple-400/70 shadow-sm shadow-blue-200/40 animate-drift-right"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${(Math.random() * 4).toFixed(2)}s`
            }}
          />
        ))}
        {[...Array(16)].map((_, i) => (
          <div
            key={`dl-${i}`}
            className="absolute w-2 h-2 rotate-45 bg-gradient-to-br from-blue-300/70 to-purple-300/70 shadow-sm shadow-purple-200/40 animate-drift-left"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${(Math.random() * 4).toFixed(2)}s`
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`pulse-${i}`}
            className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-400/60 to-purple-400/60 shadow-md shadow-purple-200/40 animate-pulse-soft"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${(Math.random() * 3).toFixed(2)}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main identity */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-gray-700 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in font-serif tracking-tight">
            Malik Diyaolu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Exploring my interests in <span key={wordIndex} className="text-gray-900 font-medium animate-fade-in">{keywords[wordIndex]}</span>.
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

        {/* Gallery removed on Home */}

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

        {/* Scroll indicator - leads to about */}
        <div 
          className="animate-bounce cursor-pointer" 
          onClick={() => window.location.hash = 'about'}
        >
          <ArrowDown size={32} className="mx-auto text-gray-500 hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Hero;