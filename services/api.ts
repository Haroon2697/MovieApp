const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: 'f2eedf0aa1286c12242bfee968bc1ae7',
  READ_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmVlZGYwYWExMjg2YzEyMjQyYmZlZTk2OGJjMWFlNyIsIm5iZiI6MTc1MzkzMTQ5Ny42ODYsInN1YiI6IjY4OGFkZWU5YjkzNGNjNzUyZjUxZDFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FXR4op9QizCQCm_rvrV54UwNsIBOPW9kFEbBhUyW9Hw',
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmVlZGYwYWExMjg2YzEyMjQyYmZlZTk2OGJjMWFlNyIsIm5iZiI6MTc1MzkzMTQ5Ny42ODYsInN1YiI6IjY4OGFkZWU5YjkzNGNjNzUyZjUxZDFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FXR4op9QizCQCm_rvrV54UwNsIBOPW9kFEbBhUyW9Hw`,
  },
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  release_date: string;
  overview: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  spoken_languages: { english_name: string; iso_639_1: string }[];
  budget: number;
  revenue: number;
  status: string;
  vote_count: number;
}

export interface ApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/search/movie?language=en-US&query=${query}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/top_rated?language=en-US&page=1`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/popular?language=en-US&page=1`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getLatestMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
};

export const getMovieGenres = async (): Promise<{ [key: number]: string }> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/genre/movie/list?language=en-US`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    const data = await response.json();
    const genres: { [key: number]: string } = {};
    data.genres.forEach((genre: { id: number; name: string }) => {
      genres[genre.id] = genre.name;
    });
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {};
  }
};

export const getMoviePosterUrl = (posterPath: string): string => {
  return `${IMAGE_BASE_URL}${posterPath}`;
}; 

