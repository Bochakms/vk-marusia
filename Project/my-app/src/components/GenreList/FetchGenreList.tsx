import { useState, useEffect } from "react";
import { Loader } from "../Loader";
import { GenreList } from "./GenreList";
import { movieService } from "../../api/movieService";
import type { GenresList } from "../../api/movieService";

export const FetchGenresList = () => {
  const [genres, setGenres] = useState<GenresList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        const genresData = await movieService.fetchGenres();
        setGenres(genresData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError(null);
      const genresData = await movieService.fetchGenres();
      setGenres(genresData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <span>Произошла ошибка: {error}</span>
        <button onClick={handleRetry}>Повторить запрос</button>
      </div>
    );
  }

  return <GenreList genresList={genres} />;
};
