import { useState, useEffect, useCallback } from "react";
import { movieService } from "../../api/movieService";
import type { Movie } from "../../api/movieService";
import { Loader } from "../Loader";
import styles from "./FetchMovieList.module.scss";
import { MovieSearchList } from "./MovieSearchList";

interface FetchMovieSearchListProps {
  title: string;
  onMovieClick?: () => void;
}

export const FetchMovieSearchList: React.FC<FetchMovieSearchListProps> = ({
  title,
  onMovieClick,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);

      const movies = await movieService.searchMoviesByTitle(title, 5, 1);
      setMovies(movies);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    if (title) {
      loadMovies();
    }
  }, [title, loadMovies]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Ошибка загрузки фильмов</h2>
        <p>{error}</p>
      </div>
    );
  }

  return <MovieSearchList movies={movies} onMovieClick={onMovieClick} />;
};
