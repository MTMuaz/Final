import React, { useState } from 'react';
import { Play, Clock, X } from 'lucide-react';
import { astronautInterviews, type AstronautInterview } from '../data/astronautInterviews';

const AstronautInterviews: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<AstronautInterview | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Astronaut Interviews</h3>
        <p className="text-slate-300">Learn from the experiences of real astronauts who lived and worked on the ISS</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {astronautInterviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedVideo(interview)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={interview.thumbnail}
                alt={interview.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {interview.title}
              </h3>
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">{interview.caption}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{interview.duration}</span>
                </div>

                <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Watch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 bg-slate-900">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
              <p className="text-cyan-400 mb-3">{selectedVideo.caption}</p>
              <p className="text-slate-300 leading-relaxed">{selectedVideo.description}</p>

              <div className="mt-4 flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedVideo.duration}</span>
                </div>
                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstronautInterviews;
