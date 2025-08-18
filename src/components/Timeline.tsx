import React from 'react';
import { Code, Heart, Rocket } from 'lucide-react';

interface TimelineItem {
  year: string;
  type: 'personal' | 'technical';
  title: string;
  description: string;
  status?: 'completed' | 'ongoing' | 'upcoming';
}

const Timeline: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      year: '2025',
      type: 'personal',
      title: 'Becoming Malik Series Launch',
      description: 'Documenting the authentic journey of growth through cinematic storytelling',
      status: 'ongoing'
    },
    {
      year: '2023',
      type: 'technical',
      title: 'AI/ML Engineering Focus',
      description: 'Deep dive into machine learning systems and ethical AI development',
      status: 'ongoing'
    },
    {
      year: '2025',
      type: 'personal',
      title: 'Terapy Initiative',
      description: 'WhatsApp-based mental health support platform for accessible conversations',
      status: 'ongoing'
    },
    {
      year: '2019',
      type: 'technical',
      title: 'Full-Stack Mastery',
      description: 'Expertise in Python, Go, FastAPI, React, and cloud infrastructure',
      status: 'completed'
    },
    {
      year: '2025',
      type: 'personal',
      title: 'Malik Diyaolu Foundation',
      description: 'Establishing foundation to bridge opportunity gaps and create impact',
      status: 'ongoing'
    },
    {
      year: '2025',
      type: 'technical',
      title: 'Open Source Contributions',
      description: 'Active contribution to projects democratizing access to powerful tools',
      status: 'ongoing'
    },
    {
      year: '2025',
      type: 'personal',
      title: 'AI Policy Advocacy',
      description: 'Writing and speaking on ethical AI development and nuclear diplomacy',
      status: 'upcoming'
    }
  ];

  const getIcon = (type: string) => {
    return type === 'personal' ? (
      <Heart className="text-purple-600" size={24} />
    ) : (
      <Code className="text-blue-600" size={24} />
    );
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'ongoing': return 'text-yellow-600';
      case 'upcoming': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">The Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personal growth and technical mastery intertwined. Each milestone builds 
            upon the last, creating a narrative of intentional evolution.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-full border-2 ${
                  item.type === 'personal' 
                    ? 'border-purple-600 bg-purple-50' 
                    : 'border-blue-600 bg-blue-50'
                } backdrop-blur-sm`}>
                  {getIcon(item.type)}
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900 mr-4">{item.year}</span>
                    {item.status && (
                      <span className={`text-sm uppercase tracking-wider ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed max-w-2xl">{item.description}</p>
                  
                  {/* Type badge */}
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === 'personal' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type === 'personal' ? 'Personal' : 'Engineering'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future vision */}
        <div className="mt-20 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <Rocket className="text-yellow-600 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4 text-gray-900">What's Next</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            The timeline continues. Each project, each line of code, each story shared 
            is a deliberate step toward a future where technology amplifies human potential 
            and creates meaningful change.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;