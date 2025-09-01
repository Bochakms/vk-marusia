import { useNavigate } from "react-router-dom";
import type { Movie } from "../../api/movieService";
import { Button } from "../Button/Button";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./MovieList.module.scss";
import { useState } from "react";

export type MovieListVariant = "simple" | "top10" | "favorites";

interface MovieListProps {
  movies: Movie[];
  variant?: MovieListVariant;
  onRemoveFavorite?: (movieId: number) => void;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  variant = "simple",
  onRemoveFavorite,
}) => {
  const navigate = useNavigate();
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);

  const getImageUrl = (url: string | null) => {
    return url || "../../../public/image/Empty.jpg";
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  const handleRemoveClick = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    onRemoveFavorite?.(movieId);
  };

  if (movies.length === 0) {
    return (
      <div className={styles.noMovies}>
        <h2>Фильмы не найдены</h2>
      </div>
    );
  }

  return (
    <div className={styles.movieList}>
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={styles.movieCard}
          onClick={() => handleMovieClick(movie.id)}
          onMouseEnter={() => setHoveredMovieId(movie.id)}
          onMouseLeave={() => setHoveredMovieId(null)}
        >
          <img
            src={getImageUrl(movie.posterUrl)}
            alt={movie.title}
            className={styles.moviePoster}
            onError={(e) => {
              e.currentTarget.src = "/image/movies/poster-placeholder.jpg";
            }}
          />

          {variant === "top10" && (
            <div className={styles.movieLabel}>{index + 1}</div>
          )}

          {variant === "favorites" && hoveredMovieId === movie.id && (
            <div className={styles.removeButtonContainer}>
              <Button
                variant="secondary"
                size="small"
                icon={<SpriteIcon name="icon-close" width={24} height={24} />}
                onClick={(e) => handleRemoveClick(e, movie.id)}
                className={styles.removeButton}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
