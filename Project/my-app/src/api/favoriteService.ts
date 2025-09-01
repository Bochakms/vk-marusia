import axios from 'axios';
import z from 'zod';
import { authUtils } from './userService';
import { MovieSchema, MoviesListSchema } from './movieService';

export const FavoriteResponseSchema = z.object({
  result: z.boolean(),
});

export type FavoriteMovie = z.infer<typeof MovieSchema>;
export type FavoritesList = z.infer<typeof MoviesListSchema>;
export type AddFavoriteResponse = z.infer<typeof FavoriteResponseSchema>;
export type RemoveFavoriteResponse = z.infer<typeof FavoriteResponseSchema>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cinemaguide.skillbox.cc/';

const favoritesApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,
});

favoritesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || error.response.data?.message || 'Unknown error';
      
      switch (status) {
        case 400:
          throw new Error(`Ошибка запроса`);
        case 401:
          authUtils.clearAuthData();
          throw new Error(`Unauthorized: ${message}`);
        case 403:
          throw new Error(`Forbidden: ${message}`);
        case 404:
          throw new Error(`Фильм не найден`);
        case 409:
          throw new Error(`Фильм уже в избранном`);
        default:
          throw new Error(`Server error: ${status} - ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: No response received');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

export const favoritesService = {
  getFavorites: async (): Promise<FavoritesList> => {
    try {
      const response = await favoritesApi.get('/favorites');
      const data = MoviesListSchema.parse(response.data);
      authUtils.setSessionActive();
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        authUtils.clearAuthData();
      }
      throw error;
    }
  },

  addFavorite: async (movieId: number): Promise<AddFavoriteResponse> => {
    const formData = new URLSearchParams();
    formData.append('id', String(movieId));
    
    try {
      const response = await favoritesApi.post('/favorites', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });      
      const data = FavoriteResponseSchema.parse(response.data);
      authUtils.setSessionActive();      
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        authUtils.clearAuthData();
      }
      throw error;
    }
  },

  removeFavorite: async (movieId: number): Promise<RemoveFavoriteResponse> => {
    try {
      const response = await favoritesApi.delete(`/favorites/${movieId}`);
      const data = FavoriteResponseSchema.parse(response.data);
      authUtils.setSessionActive();
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        authUtils.clearAuthData();
      }
      throw error;
    }
  },

  isFavorite: async (movieId: string): Promise<boolean> => {
    try {
      const favorites = await favoritesService.getFavorites();
      return favorites.some(movie => movie.id.toString() === movieId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
};