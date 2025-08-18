import React from 'react';
import { ExternalLink, Github, Lightbulb, Rocket, Star, Wrench } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  status: 'idea' | 'mvp' | 'in-progress' | 'live';
  category: 'personal' | 'technical';
  technologies?: string[];
  link?: string;
  github?: string;
  impact?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'MDF',
      description: 'Impact-driven foundation focused on bridging opportunity gaps and creating systemic change through education, technology access, and community development.',
      status: 'in-progress',
      category: 'personal',
      impact: 'Targeting 1000+ individuals in first year',
      link: '#'
    },
    {
      title: 'Terapy',
      description: 'WhatsApp-based mental health support platform providing accessible, conversational therapy and emotional wellness tools for underserved communities.',
      status: 'mvp',
      category: 'technical',
      technologies: ['Python', 'Go', 'FastAPI', 'PostgreSQL', 'AWS'],
      github: '#'
    },
    {
      title: 'Becoming Malik',
      description: 'Cinematic docu-journal series documenting authentic growth, vulnerability, and the process of becoming. Raw storytelling meets intentional evolution.',
      status: 'in-progress',
      category: 'personal',
      impact: 'Authentic representation of growth journey'
    },
    {
      title: 'AI Ethics Policy Framework',
      description: 'Comprehensive framework for ethical AI development, with focus on developing nations and nuclear diplomacy applications.',
      status: 'idea',
      category: 'personal',
      impact: 'Policy influence potential'
    },
    {
      title: 'ML Pipeline Toolkit',
      description: 'Open-source toolkit for streamlined machine learning workflows, featuring automated data preprocessing, model training, and deployment pipelines.',
      status: 'in-progress',
      category: 'technical',
      technologies: ['Python', 'MLflow', 'Docker', 'AWS'],
      github: '#'
    },
    {
      title: 'Innovation Lab Africa',
      description: 'Initiative to establish tech innovation hubs across Africa, fostering local talent and creating sustainable tech ecosystems.',
      status: 'idea',
      category: 'personal',
      impact: 'Continental tech ecosystem development'
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'idea':
        return { icon: Lightbulb, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      case 'mvp':
        return { icon: Wrench, color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'in-progress':
        return { icon: Rocket, color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'live':
        return { icon: Star, color: 'bg-green-50 text-green-700 border-green-200' };
      default:
        return { icon: Lightbulb, color: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">Projects & Visions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial sparks to living systems. Each project represents a deliberate 
            step toward creating technology that amplifies human potential.
          </p>
        </div>

        {/* Filter/Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-yellow-200 bg-yellow-50 text-yellow-700 text-sm">
            <Lightbulb size={16} />
            <span>Idea</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm">
            <Wrench size={16} />
            <span>MVP</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-sm">
            <Rocket size={16} />
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-green-200 bg-green-50 text-green-700 text-sm">
            <Star size={16} />
            <span>Live</span>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const statusConfig = getStatusConfig(project.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${statusConfig.color}`}>
                    <StatusIcon size={14} />
                    <span className="text-xs uppercase font-medium">{project.status}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === 'personal' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {project.category === 'personal' ? 'Personal' : 'Technical'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact */}
                {project.impact && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">
                      <strong>Impact:</strong> {project.impact}
                    </p>
                  </div>
                )}

                {/* Links */}
                <div className="flex space-x-3">
                  {project.link && (
                    <a 
                      href={project.link}
                      className="flex items-center space-x-1 text-blue-700 hover:text-blue-800 text-sm transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>View</span>
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm transition-colors"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision statement */}
        <div className="mt-20 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">A Living Portfolio</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            This isn't just a showcase, it's a commitment to transparent building. 
            Every project listed here represents a real intention, whether it's in 
            the initial spark phase or already impacting lives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;