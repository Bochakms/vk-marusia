import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { movieService, type Movie } from "../../api/movieService";
import { Loader } from "../Loader";
import styles from "./FetchMovie.module.scss";

export const FetchMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovie = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const movieData = await movieService.fetchMovieById(Number(id));
      setMovie(movieData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки фильма");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id, loadMovie]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Ошибка загрузки фильма</h2>
        <p>{error}</p>
        <button onClick={loadMovie}>Попробовать снова</button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.notFound}>
        <h2>Фильм не найден</h2>
        <p>Фильм с указанным ID не существует</p>
      </div>
    );
  }

  return <MovieInfo movie={movie} variant="full" />;
};
