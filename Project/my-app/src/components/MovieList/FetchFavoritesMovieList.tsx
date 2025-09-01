import { useState, useEffect } from "react";
import { MovieList } from "../MovieList/MovieList";
import { favoritesService } from "../../api/favoriteService";
import type { Movie } from "../../api/movieService";
import { Loader } from "../Loader";
import styles from "./FetchMovieList.module.scss";
import { Button } from "../Button";

export const FetchFavoritesMovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const favorites = await favoritesService.getFavorites();
      setMovies(favorites);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки избранных фильмов"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (movieId: number) => {
    try {
      await favoritesService.removeFavorite(movieId);
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка удаления из избранного"
      );
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Ошибка загрузки избранных фильмов</h2>
        <p>{error}</p>
        <Button onClick={loadFavorites} variant="secondary" size="medium">
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <MovieList
      movies={movies}
      variant="favorites"
      onRemoveFavorite={handleRemoveFavorite}
    />
  );
};
