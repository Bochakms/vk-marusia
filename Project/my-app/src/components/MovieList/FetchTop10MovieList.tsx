import { useState, useEffect } from "react";
import { MovieList } from "../MovieList/MovieList";
import { movieService } from "../../api/movieService";
import type { Movie } from "../../api/movieService";
import { Loader } from "../Loader";
import styles from "./FetchMovieList.module.scss";
import { Button } from "../Button";

export const FetchTop10MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTop10Movies = async () => {
    try {
      setLoading(true);
      setError(null);

      const top10Movies = await movieService.fetchTop10Movies();
      setMovies(top10Movies);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки топ-10 фильмов"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTop10Movies();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Ошибка загрузки топ-10 фильмов</h2>
        <p>{error}</p>
        <Button onClick={loadTop10Movies} variant="secondary" size="medium">
          Попробовать снова
        </Button>
      </div>
    );
  }

  return <MovieList movies={movies} variant="top10" />;
};
