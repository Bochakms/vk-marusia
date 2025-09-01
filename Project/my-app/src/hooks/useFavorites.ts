import { useState, useCallback } from 'react';
import { favoritesService } from '../api/favoriteService';

export const useFavorites = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await favoritesService.getFavorites();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки избранного');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (movieId: number) => {
    setLoading(true);
    setError(null);
    try {
      await favoritesService.addFavorite(movieId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка добавления в избранное');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFavorite = useCallback(async (movieId: number) => {
    setLoading(true);
    setError(null);
    try {
      await favoritesService.removeFavorite(movieId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления из избранного');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(async (movieId: number) => {
    setLoading(true);
    setError(null);
    try {
      const currentFavorites = await favoritesService.getFavorites();
      const isCurrentlyFavorite = currentFavorites.some(movie => movie.id === movieId);

      if (isCurrentlyFavorite) {
        await favoritesService.removeFavorite(movieId);
      } else {
        await favoritesService.addFavorite(movieId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка переключения избранного');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkIsFavorite = useCallback(async (movieId: number) => {
    setLoading(true);
    setError(null);
    try {
      const favorites = await favoritesService.getFavorites();
      return favorites.some(movie => movie.id === movieId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка проверки избранного');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    checkIsFavorite,
  };
};