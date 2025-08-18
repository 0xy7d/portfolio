import React from 'react';
import { BookOpen, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  published: boolean;
  link?: string;
}

const Writing: React.FC = () => {
  const articles: Article[] = [
    {
      title: 'The Ethics of AI in Developing Nations',
      excerpt: 'Exploring how artificial intelligence can be deployed responsibly in contexts where digital infrastructure and regulatory frameworks are still emerging.',
      category: 'AI Policy',
      date: '2024-12-15',
      readTime: '8 min read',
      published: true,
      link: '#'
    },
    {
      title: 'Nuclear Diplomacy in the Digital Age',
      excerpt: 'How emerging technologies are reshaping nuclear negotiations and the critical role of technical literacy in diplomatic processes.',
      category: 'Diplomacy',
      date: '2024-11-28',
      readTime: '12 min read',
      published: true,
      link: '#'
    },
    {
      title: 'Building Mental Health Infrastructure with WhatsApp',
      excerpt: 'Lessons from Terapy: leveraging familiar platforms to create accessible mental health support systems in underserved communities.',
      category: 'Technology',
      date: '2024-11-10',
      readTime: '6 min read',
      published: true,
      link: '#'
    },
    {
      title: 'The Philosophy of Intentional Building',
      excerpt: 'Why every line of code, every product decision, and every business choice should be guided by a deeper understanding of human impact.',
      category: 'Philosophy',
      date: '2024-10-22',
      readTime: '10 min read',
      published: true,
      link: '#'
    },
    {
      title: 'African Innovation Ecosystems: Beyond the Hype',
      excerpt: 'A critical examination of what it really takes to build sustainable technology ecosystems across diverse African contexts.',
      category: 'Innovation',
      date: '2024-09-15',
      readTime: '14 min read',
      published: true,
      link: '#'
    },
    {
      title: 'The Vulnerability of Becoming',
      excerpt: 'Reflections on documenting personal growth in public and why authentic storytelling matters more than polished narratives.',
      category: 'Personal',
      date: '2025-01-05',
      readTime: '7 min read',
      published: false
    },
    {
      title: 'Open Source as Diplomatic Soft Power',
      excerpt: 'How open-source contributions can serve as bridges between nations and create shared technological foundations for cooperation.',
      category: 'Technology',
      date: '2025-01-20',
      readTime: '9 min read',
      published: false
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI Policy': 'bg-blue-50 text-blue-700 border-blue-200',
      'Diplomacy': 'bg-purple-50 text-purple-700 border-purple-200',
      'Technology': 'bg-green-50 text-green-700 border-green-200',
      'Philosophy': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Innovation': 'bg-red-50 text-red-700 border-red-200',
      'Personal': 'bg-pink-50 text-pink-700 border-pink-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const publishedArticles = articles.filter(article => article.published);
  const upcomingArticles = articles.filter(article => !article.published);

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">Writing & Thought</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring the intersection of technology, humanity, and possibility. 
            Each piece is a step toward understanding our collective future.
          </p>
        </div>

        {/* Published articles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Published</h3>
          <div className="space-y-8">
            {publishedArticles.map((article, index) => (
              <article 
                key={index}
                className="bg-white/70 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-300 hover:transform hover:translate-y-[-2px]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-2" />
                      {article.date}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-blue-700 transition-colors">
                  {article.link ? (
                    <a href={article.link} className="flex items-center">
                      {article.title}
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  ) : (
                    article.title
                  )}
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                
                {article.link && (
                  <a 
                    href={article.link}
                    className="inline-flex items-center text-blue-700 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Read full article
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Upcoming articles */}
        {upcomingArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Coming Soon</h3>
            <div className="space-y-6">
              {upcomingArticles.map((article, index) => (
                <article 
                  key={index}
                  className="bg-white/50 border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                      <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-2" />
                        {article.date}
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Writing philosophy */}
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <BookOpen className="text-yellow-600 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Why I Write</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Writing is thinking made visible. Each piece forces me to clarify my thoughts, 
            challenge my assumptions, and share insights that might spark important conversations. 
            In a world where engineers often speak in code, I believe we must also speak in stories.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Writing;