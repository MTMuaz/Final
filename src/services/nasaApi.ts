interface NASAImage {
  nasa_id: string;
  title: string;
  description: string;
  date_created: string;
  keywords: string[];
  media_type: string;
  photographer?: string;
  location?: string;
}

interface NASAImageLink {
  href: string;
  rel: string;
  render?: string;
}

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

const NASA_API_BASE = 'https://images-api.nasa.gov';

export async function searchNASAImages(query: string, limit: number = 30): Promise<GalleryImage[]> {
  try {
    const response = await fetch(
      `${NASA_API_BASE}/search?q=${encodeURIComponent(query)}&media_type=image&page_size=${limit}`
    );

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.statusText}`);
    }

    const data = await response.json();
    const items = data.collection?.items || [];

    const images: GalleryImage[] = [];

    for (const item of items) {
      const imageData: NASAImage = item.data[0];

      if (!imageData || imageData.media_type !== 'image') continue;

      try {
        const assetResponse = await fetch(`${NASA_API_BASE}/asset/${imageData.nasa_id}`);
        const assetData = await assetResponse.json();
        const imageLinks = assetData.collection?.items || [];

        const thumbLink = imageLinks.find((link: NASAImageLink) =>
          link.href.includes('thumb')
        )?.href;

        const fullLink = imageLinks.find((link: NASAImageLink) =>
          link.href.includes('medium') || link.href.includes('large')
        )?.href || imageLinks.find((link: NASAImageLink) =>
          link.href.endsWith('.jpg') || link.href.endsWith('.png')
        )?.href;

        if (fullLink) {
          images.push({
            id: imageData.nasa_id,
            nasa_id: imageData.nasa_id,
            title: imageData.title || 'Untitled',
            description: imageData.description || '',
            image_url: fullLink,
            thumbnail_url: thumbLink || fullLink,
            date_created: imageData.date_created,
            photographer: imageData.photographer,
            location: imageData.location,
            keywords: imageData.keywords || [],
            source: 'NASA'
          });
        }

        if (images.length >= limit) break;
      } catch (error) {
        console.error(`Error fetching assets for ${imageData.nasa_id}:`, error);
        continue;
      }
    }

    return images;
  } catch (error) {
    console.error('Error searching NASA images:', error);
    return [];
  }
}

export async function fetchMultipleQueries(queries: string[], imagesPerQuery: number = 10): Promise<GalleryImage[]> {
  const allImages: GalleryImage[] = [];
  const seenIds = new Set<string>();

  for (const query of queries) {
    const images = await searchNASAImages(query, imagesPerQuery);

    for (const image of images) {
      if (!seenIds.has(image.nasa_id)) {
        seenIds.add(image.nasa_id);
        allImages.push(image);
      }
    }
  }

  return allImages;
}
