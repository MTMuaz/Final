import React, { useState } from 'react';
import { 
  Camera, 
  ExternalLink, 
  Download, 
  Heart,
  Share2,
  Filter,
  Search,
  Calendar,
  MapPin,
  Info,
  Maximize2,
  X
} from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
  hdUrl: string;
  date: string;
  photographer?: string;
  location?: string;
  category: 'earth' | 'iss' | 'space' | 'astronauts' | 'experiments';
  source: 'NASA' | 'ESA' | 'SpaceX' | 'Roscosmos';
  sourceUrl: string;
  likes: number;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Sample NASA and space agency photos with real sources
  const photos: Photo[] = [
    {
      id: '1',
      title: 'International Space Station Over Earth',
      description: 'The ISS orbiting Earth with solar panels fully deployed, captured during Expedition 70.',
      url: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2024-01-15',
      photographer: 'NASA',
      location: 'Low Earth Orbit',
      category: 'iss',
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/image-gallery/',
      likes: 1247
    },
    {
      id: '2',
      title: 'Earth from Space - Blue Marble',
      description: 'Stunning view of Earth showing the blue oceans, white clouds, and brown-green landmasses.',
      url: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2024-01-10',
      photographer: 'NASA Earth Observatory',
      location: 'Space',
      category: 'earth',
      source: 'NASA',
      sourceUrl: 'https://earthobservatory.nasa.gov/',
      likes: 2156
    },
    {
      id: '3',
      title: 'Astronaut Spacewalk EVA',
      description: 'Astronaut conducting extravehicular activity outside the International Space Station.',
      url: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2024-01-08',
      photographer: 'NASA',
      location: 'ISS External',
      category: 'astronauts',
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/mission_pages/station/main/index.html',
      likes: 1834
    },
    {
      id: '4',
      title: 'Milky Way Galaxy',
      description: 'Spectacular view of our galaxy captured from the International Space Station.',
      url: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2024-01-05',
      photographer: 'ESA',
      location: 'Deep Space',
      category: 'space',
      source: 'ESA',
      sourceUrl: 'https://www.esa.int/ESA_Multimedia/Images',
      likes: 3421
    },
    {
      id: '5',
      title: 'ISS Cupola Observatory',
      description: 'Interior view of the ISS Cupola with Earth visible through the windows.',
      url: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2024-01-03',
      photographer: 'NASA',
      location: 'ISS Cupola',
      category: 'iss',
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/mission_pages/station/main/index.html',
      likes: 987
    },
    {
      id: '6',
      title: 'Scientific Experiments in Microgravity',
      description: 'Astronaut conducting protein crystal growth experiments in the ISS laboratory.',
      url: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1600',
      date: '2024-01-01',
      photographer: 'NASA',
      location: 'ISS Laboratory',
      category: 'experiments',
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/mission_pages/station/research/',
      likes: 756
    },
    {
      id: '7',
      title: 'Aurora Borealis from Space',
      description: 'Beautiful aurora borealis captured from the International Space Station over polar regions.',
      url: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2023-12-28',
      photographer: 'NASA',
      location: 'Arctic Region',
      category: 'earth',
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/image-gallery/',
      likes: 2890
    },
    {
      id: '8',
      title: 'SpaceX Dragon Docking',
      description: 'SpaceX Crew Dragon spacecraft approaching the International Space Station for docking.',
      url: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=800',
      hdUrl: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '2023-12-25',
      photographer: 'SpaceX',
      location: 'ISS Vicinity',
      category: 'iss',
      source: 'SpaceX',
      sourceUrl: 'https://www.spacex.com/media/',
      likes: 1567
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', count: photos.length },
    { id: 'iss', label: 'ISS', count: photos.filter(p => p.category === 'iss').length },
    { id: 'earth', label: 'Earth Views', count: photos.filter(p => p.category === 'earth').length },
    { id: 'space', label: 'Deep Space', count: photos.filter(p => p.category === 'space').length },
    { id: 'astronauts', label: 'Astronauts', count: photos.filter(p => p.category === 'astronauts').length },
    { id: 'experiments', label: 'Experiments', count: photos.filter(p => p.category === 'experiments').length }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleDownload = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.hdUrl;
    link.download = `${photo.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Space Gallery
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Explore stunning images from NASA, ESA, and other space agencies showcasing 
            the beauty of space exploration and the International Space Station
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'masonry' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm h-2"></div>
                <div className="bg-current rounded-sm h-3"></div>
                <div className="bg-current rounded-sm h-3"></div>
                <div className="bg-current rounded-sm h-2"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                  : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/40'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'
        }`}>
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`group cursor-pointer bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105 ${
                viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
              }`}
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(photo);
                    }}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(photo.sourceUrl, '_blank');
                    }}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Source Badge */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-1 bg-black/70 rounded-full text-xs text-white font-medium">
                    {photo.source}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                  {photo.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                    {photo.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{photo.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>{photo.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <div className="relative max-w-6xl max-h-full bg-slate-900 rounded-2xl overflow-hidden">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <img
                    src={selectedPhoto.hdUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedPhoto.title}</h2>
                    <p className="text-slate-300 leading-relaxed">{selectedPhoto.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Photographer: {selectedPhoto.photographer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300">{new Date(selectedPhoto.date).toLocaleDateString()}</span>
                    </div>
                    {selectedPhoto.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">{selectedPhoto.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-300">Source: {selectedPhoto.source}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-700">
                    <button
                      onClick={() => handleDownload(selectedPhoto)}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => window.open(selectedPhoto.sourceUrl, '_blank')}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Source</span>
                    </button>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>{selectedPhoto.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No photos found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;