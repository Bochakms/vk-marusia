import { useState, useEffect, useCallback } from "react";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { movieService, type Movie } from "../../api/movieService";
import { Loader } from "../Loader";

export const FetchRandomMovie: React.FC = () => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRandomMovie = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const randomMovie = await movieService.fetchRandomMovie();
      setMovie(randomMovie);
    } catch (error) {
      console.error("Error loading random movie:", error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadRandomMovie();
  }, [loadRandomMovie]);

  const handleRefresh = () => {
    loadRandomMovie(true);
  };

  if (loading) return <Loader />;
  if (!movie) return <div>Фильм не найден</div>;

  return (
    <MovieInfo
      movie={movie}
      variant="part"
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
};
