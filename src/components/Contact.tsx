import React, { useState } from 'react';
import { Mail, MessageCircle, Calendar, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: '',
    collaborationType: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">Let's Collaborate</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking to build something transformative, need technical expertise, 
            or want to explore how technology can amplify human potential, I'm interested in the 
            meaningful conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Contact info and collaboration types */}
          <div className="space-y-12">
            {/* Collaboration types */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Ways We Can Work Together</h3>
              
              <div className="space-y-6">
                <div className="bg-white/70 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                      <MessageCircle className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Technical Consulting</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        AI/ML system architecture, full-stack development, technical strategy, 
                        and building scalable solutions that serve real human needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-purple-50 p-3 rounded-lg mr-4">
                      <Calendar className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Speaking & Workshops</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Talks on AI ethics, innovation in developing nations, authentic leadership, 
                        and the intersection of technology and social impact.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-green-50 p-3 rounded-lg mr-4">
                      <Mail className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Partnership Opportunities</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Collaborative projects, foundation partnerships, joint ventures 
                        focused on creating positive systemic change.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-yellow-50 p-3 rounded-lg mr-4">
                      <CheckCircle className="text-yellow-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Mentorship Exchange</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Mutual learning opportunities, career guidance for emerging engineers, 
                        and philosophical discussions about technology's role in society.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white/70 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300 group"
                >
                  <Github className="text-gray-600 group-hover:text-gray-900 mr-3" size={24} />
                  <span className="text-gray-800 group-hover:text-gray-900">GitHub</span>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white/70 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300 group"
                >
                  <Linkedin className="text-gray-600 group-hover:text-blue-700 mr-3" size={24} />
                  <span className="text-gray-800 group-hover:text-gray-900">LinkedIn</span>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white/70 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300 group"
                >
                  <Twitter className="text-gray-600 group-hover:text-blue-700 mr-3" size={24} />
                  <span className="text-gray-800 group-hover:text-gray-900">Twitter</span>
                </a>
                
                <a 
                  href="mailto:hello@malik.com" 
                  className="flex items-center p-4 bg-white/70 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-300 group"
                >
                  <Mail className="text-gray-600 group-hover:text-green-700 mr-3" size={24} />
                  <span className="text-gray-800 group-hover:text-gray-900">Email</span>
                </a>
              </div>
            </div>

            {/* Response time note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-700 mb-2">Response Commitment</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                I personally read and respond to every meaningful message within 48 hours. 
                Quality conversations matter more than quick replies.
              </p>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div>
            <div className="bg-white/70 border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Start a Conversation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
                    placeholder="Where do you work?"
                  />
                </div>

                <div>
                  <label htmlFor="collaborationType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Collaboration *
                  </label>
                  <select
                    id="collaborationType"
                    name="collaborationType"
                    required
                    value={formData.collaborationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-900"
                  >
                    <option value="">Select collaboration type</option>
                    <option value="technical-consulting">Technical Consulting</option>
                    <option value="speaking">Speaking & Workshops</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="mentorship">Mentorship Exchange</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2">
                    Project/Initiative
                  </label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
                    placeholder="What are you building?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-900 placeholder-gray-400 resize-none"
                    placeholder="Tell me about your vision, challenge, or idea. What makes this collaboration meaningful?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} className="mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Build the Future?</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Great things happen when visionary thinking meets technical execution. 
            Let's explore how we can create something meaningful together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;