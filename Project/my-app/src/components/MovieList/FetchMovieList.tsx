import { useState, useEffect, useCallback } from "react";
import { MovieList } from "../MovieList/MovieList";
import { movieService } from "../../api/movieService";
import type { Movie } from "../../api/movieService";
import { Loader } from "../Loader";
import styles from "./FetchMovieList.module.scss";
import { Button } from "../Button";

interface FetchMovieListProps {
  genre: string;
}

export const FetchMovieList: React.FC<FetchMovieListProps> = ({ genre }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);
      setPage(1);
      setHasMore(true);

      const firstPageMovies = await movieService.fetchMoviesByGenre(
        genre,
        10,
        1
      );
      setMovies(firstPageMovies);
      setHasMore(firstPageMovies.length === 10);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [genre]);

  const loadMoreMovies = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const nextMovies = await movieService.fetchMoviesByGenre(
        genre,
        10,
        nextPage
      );

      setMovies((prev) => [...prev, ...nextMovies]);
      setPage(nextPage);
      setHasMore(nextMovies.length === 10);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore, genre]);

  useEffect(() => {
    if (genre) {
      loadInitialMovies();
    }
  }, [genre, loadInitialMovies]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Ошибка загрузки фильмов</h2>
        <p>{error}</p>
        <Button onClick={loadInitialMovies} variant="secondary" size="medium">
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <>
      <MovieList movies={movies} />

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button
            onClick={loadMoreMovies}
            variant="primary"
            size="medium"
            disabled={loadingMore}
          >
            {loadingMore ? "Загрузка..." : "Показать ещё"}
          </Button>
        </div>
      )}

      {loadingMore && (
        <div className={styles.loadingMore}>
          <div className={styles.loader}>Загрузка...</div>
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className={styles.endMessage}>
          <p>Все фильмы загружены. Показано: {movies.length} фильмов</p>
        </div>
      )}
    </>
  );
};
