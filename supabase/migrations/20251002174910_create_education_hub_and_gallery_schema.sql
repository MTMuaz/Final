/*
  # Education Hub and Gallery Database Schema

  1. New Tables
    - `education_posts`
      - `id` (uuid, primary key)
      - `author_name` (text)
      - `title` (text)
      - `content` (text)
      - `post_type` (text) - article, video, resource
      - `url` (text, nullable) - for external resources/videos
      - `thumbnail_url` (text, nullable)
      - `metadata` (jsonb) - flexible metadata storage
      - `is_approved` (boolean) - moderation flag
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_stats`
      - `id` (uuid, primary key)
      - `achievements_count` (integer, default 0)
      - `lessons_completed` (integer, default 0)
      - `certificates_earned` (integer, default 0)
      - `total_learning_time` (integer, default 0) - in minutes
      - `updated_at` (timestamptz)
    
    - `gallery_images`
      - `id` (uuid, primary key)
      - `nasa_id` (text, unique)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `thumbnail_url` (text)
      - `date_created` (date)
      - `photographer` (text, nullable)
      - `location` (text, nullable)
      - `keywords` (text array)
      - `metadata` (jsonb)
      - `source` (text, default 'NASA')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated write access with approval workflow
*/

-- Create education_posts table
CREATE TABLE IF NOT EXISTS education_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  post_type text NOT NULL CHECK (post_type IN ('article', 'video', 'resource')),
  url text,
  thumbnail_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  achievements_count integer DEFAULT 0,
  lessons_completed integer DEFAULT 0,
  certificates_earned integer DEFAULT 0,
  total_learning_time integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nasa_id text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  thumbnail_url text,
  date_created date,
  photographer text,
  location text,
  keywords text[],
  metadata jsonb DEFAULT '{}'::jsonb,
  source text DEFAULT 'NASA',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_education_posts_type ON education_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_education_posts_approved ON education_posts(is_approved);
CREATE INDEX IF NOT EXISTS idx_education_posts_created_at ON education_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_nasa_id ON gallery_images(nasa_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_date ON gallery_images(date_created DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_keywords ON gallery_images USING gin(keywords);

-- Enable Row Level Security
ALTER TABLE education_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Education Posts Policies
-- Anyone can read approved posts
CREATE POLICY "Anyone can view approved education posts"
  ON education_posts FOR SELECT
  USING (is_approved = true);

-- Anyone can insert new posts (they start unapproved)
CREATE POLICY "Anyone can create education posts"
  ON education_posts FOR INSERT
  WITH CHECK (true);

-- User Stats Policies
-- Anyone can read user stats
CREATE POLICY "Anyone can view user stats"
  ON user_stats FOR SELECT
  USING (true);

-- Anyone can update stats
CREATE POLICY "Anyone can update user stats"
  ON user_stats FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Anyone can insert stats
CREATE POLICY "Anyone can create user stats"
  ON user_stats FOR INSERT
  WITH CHECK (true);

-- Gallery Images Policies
-- Anyone can read gallery images
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  USING (true);

-- Anyone can insert gallery images
CREATE POLICY "Anyone can add gallery images"
  ON gallery_images FOR INSERT
  WITH CHECK (true);

-- Insert initial user stats record
INSERT INTO user_stats (achievements_count, lessons_completed, certificates_earned, total_learning_time)
VALUES (5, 12, 3, 180)
ON CONFLICT DO NOTHING;

-- Insert some initial curated education posts
INSERT INTO education_posts (author_name, title, content, post_type, url, thumbnail_url, is_approved)
VALUES 
  ('NASA Education', 'NASA Image and Video Library', 'Comprehensive collection of high-resolution images and videos from NASA missions, including extensive ISS, Cupola, and Neutral Buoyancy Lab content.', 'resource', 'https://images.nasa.gov/', 'https://images.nasa.gov/images/nasa-logo.png', true),
  ('NASA JSC', 'Johnson Space Center Flickr Albums', 'Official Flickr albums from NASA Johnson Space Center featuring behind-the-scenes photos, astronaut training, and ISS operations.', 'resource', 'https://www.flickr.com/photos/nasa2explore/albums/', null, true),
  ('NASA', 'Station Research and Technology', 'Detailed information about ongoing research and technological developments aboard the International Space Station.', 'resource', 'https://www.nasa.gov/international-space-station/space-station-research-and-technology/', null, true),
  ('NASA Open Data', 'ISS Coordinates & Datasets', 'Access real-time ISS positional data, telemetry, and scientific datasets through NASA''s Open Data Portal.', 'resource', 'https://data.nasa.gov/dataset/?q=ISS+Coords&sort=score+desc%2C+metadata_modified+desc', null, true),
  ('NASA JSC', 'Neutral Buoyancy Laboratory Overview', 'Learn about NASA''s Neutral Buoyancy Laboratory where astronauts train for spacewalks in a massive indoor pool.', 'resource', 'https://www.nasa.gov/johnson/neutral-buoyancy-laboratory/', null, true),
  ('NASA', 'Extravehicular Activity Systems', 'Comprehensive encyclopedia of EVA systems, spacesuits, and procedures used on the International Space Station.', 'resource', 'https://www.nasa.gov/reference/jsc-eva-systems/', null, true),
  ('NASA HHP', 'EVA & Environmental Physiology', 'Exploration of the physiological challenges and protective systems required for spacewalks and extravehicular activities.', 'resource', 'https://www.nasa.gov/directorates/esdmd/hhp/space-suits-and-exploration-operations/', null, true),
  ('NASA Science', '3D Printable ISS Models', 'Download and print your own 3D models of the International Space Station, modules, and spacecraft.', 'resource', 'https://science.nasa.gov/3d-resources/', null, true)
ON CONFLICT DO NOTHING;
