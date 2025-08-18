import React from 'react';
import { Play, Camera, Film, Monitor } from 'lucide-react';

interface Episode {
  title: string;
  description: string;
  duration: string;
  released: boolean;
  thumbnail?: string;
  season: number;
  episode: number;
}

const BecomingMalik: React.FC = () => {
  const episodes: Episode[] = [
    {
      title: 'The Decision to Begin',
      description: 'Why I chose to document this journey publicly, and what vulnerability means in the context of growth.',
      duration: '12:34',
      released: true,
      season: 1,
      episode: 1
    },
    {
      title: 'Between Code and Dreams',
      description: 'Navigating the tension between technical precision and visionary ambition. Finding balance in the chaos.',
      duration: '18:42',
      released: true,
      season: 1,
      episode: 2
    },
    {
      title: 'Building in Public',
      description: 'The psychology of transparent creation. Why showing your work matters more than showing perfection.',
      duration: '15:28',
      released: true,
      season: 1,
      episode: 3
    },
    {
      title: 'Failure as Foundation',
      description: 'A raw examination of recent setbacks and what they reveal about growth, resilience, and redefining success.',
      duration: '22:15',
      released: false,
      season: 1,
      episode: 4
    },
    {
      title: 'The Weight of Impact',
      description: 'Grappling with the responsibility that comes with building things that matter. When vision becomes obligation.',
      duration: '19:07',
      released: false,
      season: 1,
      episode: 5
    },
    {
      title: 'Identity in Transition',
      description: 'Who are you when you\'re between who you were and who you\'re becoming? The liminal space of transformation.',
      duration: '16:53',
      released: false,
      season: 1,
      episode: 6
    }
  ];

  const releasedEpisodes = episodes.filter(ep => ep.released);
  const upcomingEpisodes = episodes.filter(ep => !ep.released);

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">Becoming Malik</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A cinematic journey of authentic growth. Raw conversations with myself, 
            unfiltered reflections on building, failing, and becoming.
          </p>
          
          {/* Series description */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-left max-w-4xl mx-auto border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              This isn't another productivity show or startup documentary. "Becoming Malik" 
              is an honest examination of what it means to build something meaningful while 
              simultaneously building yourself.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each episode captures real moments: the 3 AM coding sessions, the philosophical 
              breakthroughs, the painful recognitions, and the quiet victories that don't 
              make it to LinkedIn. It's accountability through storytelling.
            </p>
          </div>
        </div>

        {/* Featured/Latest episode */}
        {releasedEpisodes.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Latest Episode</h3>
            <div className="bg-white/70 border border-gray-200 rounded-lg overflow-hidden">
              {/* Video placeholder */}
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative flex items-center justify-center">
                <div className="text-center">
                  <Play className="text-gray-900 mx-auto mb-4" size={64} />
                  <p className="text-gray-900 text-lg font-medium">Episode Preview</p>
                </div>
              </div>
              
              {/* Episode info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                      S{releasedEpisodes[releasedEpisodes.length - 1].season}E{releasedEpisodes[releasedEpisodes.length - 1].episode}
                    </span>
                    <span className="text-gray-600 text-sm">{releasedEpisodes[releasedEpisodes.length - 1].duration}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {releasedEpisodes[releasedEpisodes.length - 1].title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed">
                  {releasedEpisodes[releasedEpisodes.length - 1].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Episode grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Released episodes */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Available Now</h3>
            <div className="space-y-6">
              {releasedEpisodes.map((episode, index) => (
                <div key={index} className="bg-white/70 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        S{episode.season}E{episode.episode}
                      </span>
                      <span className="text-gray-600 text-sm">{episode.duration}</span>
                    </div>
                    <Play className="text-blue-700 hover:text-blue-800 cursor-pointer transition-colors" size={20} />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">{episode.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{episode.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming episodes */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Coming Soon</h3>
            <div className="space-y-6">
              {upcomingEpisodes.map((episode, index) => (
                <div key={index} className="bg-white/50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
                        S{episode.season}E{episode.episode}
                      </span>
                      <span className="text-gray-600 text-sm">{episode.duration}</span>
                    </div>
                    <Camera className="text-gray-700" size={20} />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">{episode.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{episode.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Behind the scenes */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/50 rounded-lg border border-gray-200">
            <Film className="text-blue-700 mx-auto mb-4" size={48} />
            <h4 className="text-lg font-semibold mb-2">Cinematic Approach</h4>
            <p className="text-gray-600 text-sm">
              Every episode is crafted with intentional pacing, visual storytelling, 
              and authentic emotion.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/50 rounded-lg border border-gray-200">
            <Monitor className="text-purple-700 mx-auto mb-4" size={48} />
            <h4 className="text-lg font-semibold mb-2">Real Time</h4>
            <p className="text-gray-600 text-sm">
              Not retrospective wisdom, but real-time processing of growth, 
              failure, and discovery.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/50 rounded-lg border border-gray-200">
            <Camera className="text-green-700 mx-auto mb-4" size={48} />
            <h4 className="text-lg font-semibold mb-2">Unfiltered</h4>
            <p className="text-gray-600 text-sm">
              Raw moments, honest reflection, and the vulnerability that comes 
              with documenting transformation.
            </p>
          </div>
        </div>

        {/* Subscribe/Follow */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Follow the Journey</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            New episodes released when they're ready: not on a schedule. 
            This isn't content; it's documentation of becoming.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Get Notifications
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-800 hover:text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomingMalik;