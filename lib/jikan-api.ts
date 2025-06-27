export interface JikanAnime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  type: string;
  episodes?: number;
  status: string;
  aired: {
    from: string;
    to?: string;
    string: string;
  };
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  year?: number;
  source: string;
  duration: string;
  rating: string;
}

export interface JikanResponse {
  data: JikanAnime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// Convert Jikan API response to our AnimeProp format
export function convertJikanToAnimeProp(jikanAnime: JikanAnime): AnimeProp {
  return {
    id: jikanAnime.mal_id.toString(),
    name: jikanAnime.title_english || jikanAnime.title,
    image: {
      original: jikanAnime.images.jpg.large_image_url || jikanAnime.images.jpg.image_url,
    },
    kind: jikanAnime.type || 'Unknown',
    episodes: jikanAnime.episodes || 0,
    episodes_aired: jikanAnime.episodes || 0,
    score: jikanAnime.score?.toFixed(2) || 'N/A',
  };
}

// API Functions
const BASE_URL = 'https://api.jikan.moe/v4';
const RATE_LIMIT_DELAY = 1000; // 1 second delay between requests

// Rate limiting helper
let lastRequestTime = 0;
async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  return fetch(url);
}

export async function fetchTopAnime(page: number = 1): Promise<JikanResponse> {
  try {
    const response = await rateLimitedFetch(`${BASE_URL}/top/anime?page=${page}&limit=20`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: JikanResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
}

export async function searchAnime(query: string, page: number = 1): Promise<JikanResponse> {
  try {
    const response = await rateLimitedFetch(
      `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20&order_by=score&sort=desc`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: JikanResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
}

export async function fetchAnimeById(id: number): Promise<{ data: JikanAnime }> {
  try {
    const response = await rateLimitedFetch(`${BASE_URL}/anime/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime by ID:', error);
    throw error;
  }
}

export async function fetchAnimeByGenre(genreId: number, page: number = 1): Promise<JikanResponse> {
  try {
    const response = await rateLimitedFetch(
      `${BASE_URL}/anime?genres=${genreId}&page=${page}&limit=20&order_by=score&sort=desc`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: JikanResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    throw error;
  }
}

// Updated AnimeProp interface (keep this compatible with existing components)
export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}