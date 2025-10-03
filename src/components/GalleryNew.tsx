import React, { useState, useEffect } from 'react';
import {
  Camera,
  ExternalLink,
  Download,
  Search,
  Calendar,
  MapPin,
  Info,
  X,
  Loader
} from 'lucide-react';
import { searchNASAImages, fetchMultipleQueries } from '../services/nasaApi';
import { getGalleryImages, saveMultipleGalleryImages } from '../services/supabase';

interface GalleryImage {
  id: string;
  nasa_id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  date_created: string;
  photographer?: string;
  location?: string;
  keywords: string[];
  source: string;
}

const GalleryNew: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [searchTerm, selectedCategory, images]);

  const loadImages = async () => {
    try {
      let dbImages = await getGalleryImages(100);

      if (dbImages.length < 30) {
        console.log('Fetching images from NASA API...');
        const queries = [
          'International Space Station',
          'ISS Cupola',
          'Neutral Buoyancy Lab',
          'ISS spacewalk',
          'ISS Earth view',
          'ISS astronaut',
          'Space Station module'
        ];

        const nasaImages = await fetchMultipleQueries(queries, 8);

        if (nasaImages.length > 0) {
          const saved = await saveMultipleGalleryImages(nasaImages.map(img => ({
            nasa_id: img.nasa_id,
            title: img.title,
            description: img.description,
            image_url: img.image_url,
            thumbnail_url: img.thumbnail_url,
            date_created: img.date_created,
            photographer: img.photographer,
            location: img.location,
            keywords: img.keywords,
            metadata: {},
            source: img.source
          })));

          console.log(`Saved ${saved} new images to database`);
          dbImages = await getGalleryImages(100);
        }
      }

      setImages(dbImages);
      setFilteredImages(dbImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    let filtered = images;

    if (searchTerm) {
      filtered = filtered.filter(img =>
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img =>
        img.keywords.some(kw => kw.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    setFilteredImages(filtered);
  };

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'iss', label: 'ISS' },
    { id: 'earth', label: 'Earth Views' },
    { id: 'spacewalk', label: 'Spacewalks' },
    { id: 'astronaut', label: 'Astronauts' },
    { id: 'cupola', label: 'Cupola' }
  ];

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  if (loading) {
    return (
      <div className="relative z-10 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
            <p className="text-slate-300">Loading NASA images...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Space Gallery
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Explore {images.length}+ stunning images from NASA showcasing
            the beauty of space exploration and the International Space Station
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
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
        </div>

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
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.thumbnail_url || image.image_url}
                  alt={image.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-1 bg-black/70 rounded-full text-xs text-white font-medium">
                    {image.source}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {image.title}
                </h3>
                <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                  {image.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(image.date_created).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <div className="relative max-w-6xl max-h-full bg-slate-900 rounded-2xl overflow-hidden">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                    <p className="text-slate-300 leading-relaxed">{selectedImage.description}</p>
                  </div>

                  <div className="space-y-3">
                    {selectedImage.photographer && (
                      <div className="flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300">{selectedImage.photographer}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300">{new Date(selectedImage.date_created).toLocaleDateString()}</span>
                    </div>
                    {selectedImage.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">{selectedImage.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-300">Source: {selectedImage.source}</span>
                    </div>
                  </div>

                  {selectedImage.keywords && selectedImage.keywords.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.keywords.slice(0, 10).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-800/50 rounded-full text-xs text-slate-300"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-700">
                    <button
                      onClick={() => handleDownload(selectedImage)}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <a
                      href={`https://images.nasa.gov/details/${selectedImage.nasa_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>NASA Source</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredImages.length === 0 && (
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

export default GalleryNew;
