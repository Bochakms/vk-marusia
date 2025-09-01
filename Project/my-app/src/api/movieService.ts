import axios from 'axios';
import z from 'zod';

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string(),
  trailerYouTubeId: z.string(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable()
});

export const MoviesListSchema = z.array(MovieSchema);
export const GenresListSchema = z.array(z.string());

export type Movie = z.infer<typeof MovieSchema>;
export type MoviesList = z.infer<typeof MoviesListSchema>;
export type GenresList = z.infer<typeof GenresListSchema>;

export interface FetchMoviesParams {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cinemaguide.skillbox.cc/';

const movieApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

movieApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('Network error: No response received');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

export const movieService = {
  fetchMovies: async (
    params: FetchMoviesParams = {}
  ): Promise<MoviesList> => {
    const {
      count = 50,
      page,
      title,
      genre
    } = params;

    const response = await movieApi.get('/movie', {
      params: {
        count,
        page,
        title,
        genre
      }
    });

    const data = MoviesListSchema.parse(response.data);
    return data;
  },
  
  fetchMoviesByGenre: async (
    genre: string,
    count: number = 50,
    page?: number
  ): Promise<MoviesList> => {
    return movieService.fetchMovies({ genre, count, page });
  },
  
  searchMoviesByTitle: async (
    title: string,
    count: number = 50,
    page?: number
  ): Promise<MoviesList> => {
    return movieService.fetchMovies({ title, count, page });
  },

  fetchMovieById: async (id: number): Promise<Movie> => {
    const response = await movieApi.get(`/movie/${id}`);
    const data = MovieSchema.parse(response.data);
    return data;
  },

  fetchTop10Movies: async (): Promise<MoviesList> => {
    const response = await movieApi.get('/movie/top10');
    const data = MoviesListSchema.parse(response.data);
    return data;
  },

  fetchGenres: async (): Promise<GenresList> => {
    const response = await movieApi.get('/movie/genres');
    const data = GenresListSchema.parse(response.data);
    return data;
  },

  fetchRandomMovie: async (): Promise<Movie> => {
    const response = await movieApi.get('/movie/random');
    const data = MovieSchema.parse(response.data);
    return data;
  }
};