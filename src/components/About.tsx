import React from 'react';
import { Code, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">About</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 font-serif tracking-tight">Two Sides, One Practice</h2>
          <div className="h-px w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I am driven by the dual pursuit of technical excellence and impactful storytelling. 
            Here's how these paths converge and why they matter.
          </p>
          <blockquote className="mt-8 max-w-2xl mx-auto text-gray-700 italic">
            "The best engineers think beyond their code. The best thinkers understand systems."
          </blockquote>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* The Visionary */}
          <div className="space-y-8">
            <div className="flex items-center mb-6">
              <Heart className="text-purple-600 mr-4" size={32} />
              <h3 className="text-3xl font-bold text-gray-900">Driven by Vision</h3>
            </div>
            
            <div className="prose text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                My interest in AI policy stems from a desire to ensure technology serves humanity. 
                I aim to drive impact one project at a time, using every skill I possess.
              </p>
              
              <p className="mb-6">
                My journey is about telling my story as authentically as possible. Raw and unfiltered, 
                it reflects the challenges and triumphs of my path.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-purple-700">Current Endeavors</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Malik Diyaolu Foundation: Bridging opportunity gaps through targeted projects.</li>
                <li>Terapy: Providing mental health support via accessible platforms.</li>
                <li>Essays: Exploring technology governance from an insider's perspective.</li>
                <li>Becoming Malik: A candid journal of personal and professional growth.</li>
              </ul>
            </div>
          </div>

          {/* The Engineer */}
          <div className="space-y-8">
            <div className="flex items-center mb-6">
              <Code className="text-blue-600 mr-4" size={32} />
              <h3 className="text-3xl font-bold text-gray-900">The Technical Journey</h3>
            </div>
            
            <div className="prose text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                My focus is on building performant systems with privacy at the core of my ML engineering. 
                I leverage design skills and creativity to construct robust systems.
              </p>
              
              <p className="mb-6">
                I prioritize tools that matter over fleeting trends, ensuring that my work is both 
                innovative and sustainable.
              </p>
              
              <p className="mb-6">
                Every component I build is designed for longevity and maintainability, anticipating 
                future needs and challenges.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-blue-700">Technical Stack</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong className="text-gray-900">Core Languages</strong>
                  <br />Python, Go, TypeScript
                </div>
                <div>
                  <strong className="text-gray-900">Frontend</strong>
                  <br />React, Next.js, Tailwind
                </div>
                <div>
                  <strong className="text-gray-900">Backend</strong>
                  <br />FastAPI, PostgreSQL, Redis
                </div>
                <div>
                  <strong className="text-gray-900">Infrastructure</strong>
                  <br />AWS, Docker, GitHub Actions, Kafka
                </div>
                <div>
                  <strong className="text-gray-900">Data/ML</strong>
                  <br />PyTorch, TensorFlow, Hugging Face, MLflow
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration statement */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <Lightbulb className="text-yellow-600 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Why Both Matter</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Code without context is just clever puzzles.<br />
            Vision without implementation is just expensive dreams.
            <br /><br />
            The work informs the words.<br />
            The words guide the work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;