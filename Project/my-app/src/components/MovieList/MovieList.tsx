import { useNavigate } from "react-router-dom";
import type { Movie } from "../../api/movieService";
import { Button } from "../Button/Button";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./MovieList.module.scss";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

import { useDeviceDetect } from "../../hooks/useDeviceDetect";

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
  const { isMobile } = useDeviceDetect();

  const getImageUrl = (url: string | null) => {
    return url || "/image/no-poster.jpg";
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  const handleRemoveClick = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    onRemoveFavorite?.(movieId);
  };

  const renderMovieCard = (movie: Movie, index: number) => (
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
        className={styles.movieCard__poster}
        onError={(e) => {
          e.currentTarget.src = "/image/no-poster.jpg";
        }}
      />

      {variant === "top10" && (
        <div className={styles.movieCard__label}>{index + 1}</div>
      )}

      {variant === "favorites" && (hoveredMovieId === movie.id || isMobile) && (
        <div className={styles.movieCard__removeButtonContainer}>
          <Button
            variant="secondary"
            size="small"
            icon={<SpriteIcon name="icon-close" width={24} height={24} />}
            onClick={(e) => handleRemoveClick(e, movie.id)}
            className={styles.movieCard__removeButton}
          />
        </div>
      )}
    </div>
  );

  if (movies.length === 0) {
    return (
      <div className={styles.noMovies}>
        <h2>Фильмы не найдены</h2>
      </div>
    );
  }
  if (!isMobile || variant === "simple") {
    return (
      <div className={styles.moviesList}>
        {movies.map((movie, index) => renderMovieCard(movie, index))}
      </div>
    );
  }
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={40}
        freeMode={true}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        resistance={true}
        resistanceRatio={0.85}
        slidesPerView={1}
        className={styles.movieSwiper}
        style={{ overflow: "visible" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} className={styles.swiperSlide}>
            {renderMovieCard(movie, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
