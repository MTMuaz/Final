import React from 'react';
import { ExternalLink, Download, Rocket, Star } from 'lucide-react';

const EducationResources: React.FC = () => {
  const nasaResources = [
    {
      title: 'NASA Image and Video Library',
      description: 'Comprehensive collection of high-resolution images and videos from NASA missions, including extensive ISS, Cupola, and Neutral Buoyancy Lab content.',
      url: 'https://images.nasa.gov/',
      category: 'media'
    },
    {
      title: 'Johnson Space Center Flickr Albums',
      description: 'Official Flickr albums from NASA Johnson Space Center featuring behind-the-scenes photos, astronaut training, and ISS operations.',
      url: 'https://www.flickr.com/photos/nasa2explore/albums/',
      category: 'media'
    },
    {
      title: 'Station Research and Technology',
      description: 'Detailed information about ongoing research and technological developments aboard the International Space Station.',
      url: 'https://www.nasa.gov/international-space-station/space-station-research-and-technology/',
      category: 'research'
    },
    {
      title: 'ISS Coordinates & Datasets',
      description: 'Access real-time ISS positional data, telemetry, and scientific datasets through NASA\'s Open Data Portal.',
      url: 'https://data.nasa.gov/dataset/?q=ISS+Coords&sort=score+desc%2C+metadata_modified+desc',
      category: 'data'
    },
    {
      title: 'Neutral Buoyancy Laboratory Overview',
      description: 'Learn about NASA\'s Neutral Buoyancy Laboratory where astronauts train for spacewalks in a massive indoor pool.',
      url: 'https://www.nasa.gov/johnson/neutral-buoyancy-laboratory/',
      category: 'training'
    },
    {
      title: 'Extravehicular Activity Systems',
      description: 'Comprehensive encyclopedia of EVA systems, spacesuits, and procedures used on the International Space Station.',
      url: 'https://www.nasa.gov/reference/jsc-eva-systems/',
      category: 'equipment'
    },
    {
      title: 'EVA & Environmental Physiology',
      description: 'Exploration of the physiological challenges and protective systems required for spacewalks and extravehicular activities.',
      url: 'https://www.nasa.gov/directorates/esdmd/hhp/space-suits-and-exploration-operations/',
      category: 'science'
    },
    {
      title: '3D Printable ISS Models',
      description: 'Download and print your own 3D models of the International Space Station, modules, and spacecraft.',
      url: 'https://science.nasa.gov/3d-resources/',
      category: 'educational'
    }
  ];

  const categories = [
    { id: 'media', label: 'Media & Images', color: 'cyan' },
    { id: 'research', label: 'Research', color: 'purple' },
    { id: 'data', label: 'Data & APIs', color: 'green' },
    { id: 'training', label: 'Training', color: 'orange' },
    { id: 'equipment', label: 'Equipment', color: 'blue' },
    { id: 'science', label: 'Science', color: 'pink' },
    { id: 'educational', label: 'Educational', color: 'yellow' }
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'slate';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Curated NASA Resources</h3>
        <p className="text-slate-300">Official NASA resources for deep learning and exploration</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {nasaResources.map((resource, index) => {
          const color = getCategoryColor(resource.category);
          return (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-${color}-500/20`}>
                  <Rocket className={`w-6 h-6 text-${color}-400`} />
                </div>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {resource.title}
              </h4>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {resource.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-500/20 text-${color}-300`}>
                  {categories.find(c => c.id === resource.category)?.label}
                </span>
                <span className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300">
                  Explore →
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20">
        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
          <Star className="w-5 h-5 text-green-400 mr-2" />
          ISS Quick Facts
        </h4>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">408 km</div>
            <div className="text-sm text-slate-400">Average Altitude</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">27,600</div>
            <div className="text-sm text-slate-400">km/h Speed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">93</div>
            <div className="text-sm text-slate-400">Minutes per Orbit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">16</div>
            <div className="text-sm text-slate-400">Sunrises per Day</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationResources;
