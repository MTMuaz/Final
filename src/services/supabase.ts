import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EducationPost {
  id: string;
  author_name: string;
  title: string;
  content: string;
  post_type: 'article' | 'video' | 'resource';
  url?: string;
  thumbnail_url?: string;
  metadata: Record<string, any>;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  achievements_count: number;
  lessons_completed: number;
  certificates_earned: number;
  total_learning_time: number;
  updated_at: string;
}

export interface GalleryImage {
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
  metadata: Record<string, any>;
  source: string;
  created_at: string;
}

export async function getEducationPosts(postType?: string): Promise<EducationPost[]> {
  let query = supabase
    .from('education_posts')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (postType) {
    query = query.eq('post_type', postType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching education posts:', error);
    return [];
  }

  return data || [];
}

export async function createEducationPost(post: Omit<EducationPost, 'id' | 'created_at' | 'updated_at'>): Promise<EducationPost | null> {
  const { data, error } = await supabase
    .from('education_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating education post:', error);
    return null;
  }

  return data;
}

export async function getUserStats(): Promise<UserStats | null> {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }

  return data;
}

export async function updateUserStats(stats: Partial<UserStats>): Promise<UserStats | null> {
  const existing = await getUserStats();

  if (!existing) {
    const { data, error } = await supabase
      .from('user_stats')
      .insert([{ ...stats, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) {
      console.error('Error creating user stats:', error);
      return null;
    }

    return data;
  }

  const { data, error } = await supabase
    .from('user_stats')
    .update({ ...stats, updated_at: new Date().toISOString() })
    .eq('id', existing.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user stats:', error);
    return null;
  }

  return data;
}

export async function getGalleryImages(limit: number = 30): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('date_created', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }

  return data || [];
}

export async function saveGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at'>): Promise<GalleryImage | null> {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert([image])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return null;
    }
    console.error('Error saving gallery image:', error);
    return null;
  }

  return data;
}

export async function saveMultipleGalleryImages(images: Omit<GalleryImage, 'id' | 'created_at'>[]): Promise<number> {
  if (images.length === 0) return 0;

  const { data, error } = await supabase
    .from('gallery_images')
    .upsert(images, {
      onConflict: 'nasa_id',
      ignoreDuplicates: true
    })
    .select();

  if (error) {
    console.error('Error saving multiple gallery images:', error);
    return 0;
  }

  return data?.length || 0;
}
