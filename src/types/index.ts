export interface Quote {
  id: number;
  text: string;
  meaning: string;
  author?: string;
  category?: 'idiom' | 'life' | 'love' | 'motivation';
}

export interface MusicTrack {
  id: number;
  title: string;
  url: string;
  artist?: string;
  category?: 'lofi' | 'viet-chill' | 'instrumental' | 'pop';
  youtubeId?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  readingTime: string;
  tags?: string[];
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}
