import React from 'react';
import { Download, Award, Briefcase, GraduationCap, Code, Heart } from 'lucide-react';

const CV: React.FC = () => {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">Resume</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive overview of experience, skills, and impact. 
            Where technical expertise meets visionary purpose.
          </p>
          
          <a href="/assets/Malik%20Diyaolu%20CV%20(4).pdf" download className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Download size={20} className="mr-2" />
            Download PDF
          </a>
        </div>

        {/* Quick stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-4 bg-white/70 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 mb-2">7+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-white/70 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-700 mb-2">11</div>
            <div className="text-gray-600 text-sm">Companies Worked</div>
          </div>
          <div className="text-center p-4 bg-white/70 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-700 mb-2">3</div>
            <div className="text-gray-600 text-sm">Companies Founded</div>
          </div>
          <div className="text-center p-4 bg-white/70 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700 mb-2">500+</div>
            <div className="text-gray-600 text-sm">API Endpoints Built</div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Technical */}
          <div className="space-y-12">
            {/* Experience */}
            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="text-blue-600 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              </div>
              
              <div className="space-y-8">
                <div className="border-l-2 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">AI/ML Engineer</h4>
                    <span className="text-sm text-gray-500">Present</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">CreaCubed USA (Remote)</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Spearheaded Generative AI applications and PoC projects</li>
                    <li>• Led architecture of AI trading system PoC</li>
                    <li>• Built comprehensive bot platform from concept to deployment</li>
                    <li>• Engineered scalable systems for AI-driven applications</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Product ML Engineer</h4>
                    <span className="text-sm text-gray-500">Jan 2025</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">HabitatHunt</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Led AI solutions for property lead generation from social media</li>
                    <li>• Optimized using Redis, Next.js, Python, and APIFY</li>
                    <li>• Ensured data compliance with local regulations</li>
                    <li>• Refined data scraping algorithms for enhanced lead quality</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Youth Corps Member (NYSC)</h4>
                    <span className="text-sm text-gray-500">Apr 2025</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">Crescent University, Abeokuta</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Software/hardware support engineer for ICTEC team</li>
                    <li>• Managed Nursing Council exam deployment (2 occasions)</li>
                    <li>• Facilitated JAMB registration and student sensitization</li>
                    <li>• Keynote speaker addressing 200+ students on career opportunities</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">ML Software Engineer</h4>
                    <span className="text-sm text-gray-500">Nov 2023</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">Pusheat</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Developed food GPT application MVP using Langchain and FastAPI</li>
                    <li>• Designed RAG interface using Llama and GPT-3.5</li>
                    <li>• Enhanced model efficiency for YouTube transcript retrieval</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Full-Stack Software Engineer</h4>
                    <span className="text-sm text-gray-500">Nov 2022</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">Listwise</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Redesigned website sections for improved UX</li>
                    <li>• Simplified technical terminology for stakeholders</li>
                    <li>• Contributed to AI integration in existing platforms</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Co-Founder & Backend Engineer</h4>
                    <span className="text-sm text-gray-500">Feb 2021</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">Fashy</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Built RESTful APIs supporting mobile application</li>
                    <li>• Improved workflows through messaging/notification service</li>
                    <li>• Ensured seamless data distribution across multiple countries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <div className="flex items-center mb-6">
                <Code className="text-blue-600 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">Technical Skills</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'Go', 'Rust (Basic)'].map((skill) => (
                      <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    {['FastAPI', 'Django', 'Flask', 'React.js', 'Next.js', 'Vue.js', 'Node.js'].map((skill) => (
                      <span key={skill} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ML & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'Pandas', 'NumPy', 'Hugging Face'].map((skill) => (
                      <span key={skill} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Infrastructure & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AWS', 'GCP', 'PostgreSQL', 'Redis', 'Kafka', 'GraphQL'].map((skill) => (
                      <span key={skill} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm border border-yellow-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Personal & Impact */}
          <div className="space-y-12">
            {/* Impact & Leadership */}
            <div>
              <div className="flex items-center mb-6">
                <Heart className="text-purple-600 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">Impact & Leadership</h3>
              </div>
              
              <div className="space-y-8">
                <div className="border-l-2 border-purple-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Founder & Director</h4>
                  </div>
                  <p className="text-purple-700 text-sm mb-3">Malik Diyaolu Foundation</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Establishing foundation focused on opportunity bridging</li>
                    <li>• Developing partnerships with educational institutions</li>
                    <li>• Creating scholarship programs for underrepresented students</li>
                  </ul>
                </div>

                <div className="border-l-2 border-purple-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Product Lead</h4>
                  </div>
                  <p className="text-purple-700 text-sm mb-3">Terapy (Mental Health Platform)</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Designing WhatsApp-based mental health support system</li>
                    <li>• Building MVP for pilot community</li>
                    <li>• Establishing partnerships with mental health professionals</li>
                  </ul>
                </div>

                <div className="border-l-2 border-purple-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Content Creator</h4>
                  </div>
                  <p className="text-purple-700 text-sm mb-3">Becoming Malik Series</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Producing documentary series on authentic growth</li>
                    <li>• Building audience of engaged followers</li>
                    <li>• Speaking at conferences about transparency in leadership</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="text-green-600 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-2 border-green-600 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900">Bachelor of Science (B.Sc)</h4>
                  <p className="text-green-700 text-sm mb-2">Computer Science</p>
                  <p className="text-gray-600 text-sm">Federal University of Agriculture, Abeokuta • Nov 2023</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 text-sm">English</span>
                      <span className="text-gray-600 text-sm">Conversational</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 text-sm">Yoruba</span>
                      <span className="text-gray-600 text-sm">Intermediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 text-sm">Chinese</span>
                      <span className="text-gray-600 text-sm">Beginner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <div className="flex items-center mb-6">
                <Award className="text-yellow-600 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">Core Competencies</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Leadership & Communication</h4>
                  <div className="flex flex-wrap gap-2">
                    {['System Architecture', 'Technical Design', 'Cross-functional Collaboration', 'Leadership'].map((skill) => (
                      <span key={skill} className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs border border-yellow-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Project Management</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Project Planning', 'Quality Assurance', 'Problem Solving', 'Effective Communication'].map((skill) => (
                      <span key={skill} className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs border border-yellow-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Let's Build Something Together</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Looking for someone who brings both technical excellence and visionary thinking 
            to complex challenges. Ready to create solutions that matter.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Let's Collaborate
            </a>
            <a href="/assets/Malik%20Diyaolu%20CV%20(4).pdf" download className="border border-gray-300 hover:border-gray-400 text-gray-800 hover:text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors">
              <Download size={20} className="mr-2 inline" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;