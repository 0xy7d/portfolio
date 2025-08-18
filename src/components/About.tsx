import React, { useState } from 'react';
import { galleryImages } from '../content/gallery';
import { Code, Heart, Lightbulb, X } from 'lucide-react';

const About: React.FC = () => {
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  
  const offsetClasses = [
    '-translate-y-2 rotate-[-1deg]',
    '-translate-y-1 rotate-[0.5deg]',
    'translate-y-0 rotate-[-0.5deg]',
    'translate-y-1 rotate-[0.75deg]',
    'translate-y-2 rotate-[-0.75deg]'
  ];

  const technicalSkills = {
    "Programming Languages": ["Python", "Go", "TypeScript", "JavaScript", "Rust", "C++", "SQL"],
    "Machine Learning & AI": ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "Computer Vision", "NLP", "MLOps"],
    "Backend & Infrastructure": ["FastAPI", "Django", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    "Cloud & DevOps": ["AWS", "GCP", "Terraform", "CI/CD", "Monitoring", "Load Balancing"],
    "Frontend & Design": ["React", "Next.js", "Tailwind CSS", "Figma", "User Research"],
    "Data & Analytics": ["Pandas", "NumPy", "Apache Spark", "Data Pipelines", "ETL", "Data Visualization"]
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">About</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 font-serif tracking-tight">Two Sides, One Practice</h2>
          <div className="h-px w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I write code. I shape ideas. Same standard: useful, humane, long-term.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            <div className="bg-white/70 border border-gray-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-gray-900">Build with consequence</div>
              <div className="text-sm text-gray-600">Products that touch people and policy.</div>
            </div>
            <div className="bg-white/70 border border-gray-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-gray-900">Systems thinking</div>
              <div className="text-sm text-gray-600">From databases to institutions.</div>
            </div>
            <div className="bg-white/70 border border-gray-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-gray-900">Public-interest tech</div>
              <div className="text-sm text-gray-600">Access, dignity, and outcomes.</div>
            </div>
          </div>
        </div>
        {/* Scenes from the work */}
        {galleryImages.length > 0 && (
          <div className="mb-16 -mx-6 md:mx-0">
            <div className="text-sm text-gray-500 px-6 md:px-0 mb-3">Scenes from the work</div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-6 px-6 md:px-0">
                {galleryImages.map((src, i) => (
                  <div
                    key={i}
                    className={`relative flex-none w-80 md:w-[28rem] rounded-3xl overflow-hidden shadow-sm border border-gray-200 bg-white transform ${offsetClasses[i % offsetClasses.length]}`}
                  >
                    <img src={src} alt={`Gallery ${i + 1}`} className="h-72 md:h-[30rem] w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* One story, two lenses */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <Heart className="text-purple-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">What drives me</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Access before aesthetics. Useful beats flashy.</li>
              <li>• Tell the truth of the work. Build in public when it helps others.</li>
              <li>• Aim for systems that outlive me.</li>
            </ul>
            <div className="bg-white/70 border border-gray-200 rounded-lg p-5">
              <div className="text-sm font-semibold text-purple-700 mb-2">Now</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Malik Diyaolu Foundation</li>
                <li>• Terapy on WhatsApp</li>
                <li>• Essays on AI governance</li>
                <li>• Becoming Malik</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center">
              <Code className="text-blue-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">How I build</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Privacy-minded ML. Performance without surprises.</li>
              <li>• Clear APIs. Strong contracts. Measured rollouts.</li>
              <li className="flex items-center gap-2">
                • Common tools: Python, Go, PyTorch
                <button 
                  onClick={() => setShowSkillsModal(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="Show all technical skills"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="19" cy="12" r="1"/>
                    <circle cx="5" cy="12" r="1"/>
                  </svg>
                </button>
              </li>
            </ul>
            <div className="bg-white/70 border border-gray-200 rounded-lg p-5">
              <div className="text-sm font-semibold text-blue-700 mb-2">Principles</div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Choose boring tech for critical paths.</li>
                <li>• Automate the risky parts; keep humans in the loop.</li>
                <li>• Write it down. Future you is a teammate.</li>
              </ul>
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
            <br />
            The work informs the words. The words guide the work.
          </p>
        </div>
      </div>

      {/* Technical Skills Modal */}
      {showSkillsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Technical Skills</h3>
                <button
                  onClick={() => setShowSkillsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">A comprehensive view of my technical toolkit</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(technicalSkills).map(([category, skills]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Philosophy:</strong> I believe in choosing the right tool for the job, prioritizing maintainability and team velocity over novelty. 
                  The best technology is often the most boring one that gets the job done reliably.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;