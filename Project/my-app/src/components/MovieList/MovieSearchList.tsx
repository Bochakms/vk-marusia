import { useNavigate } from "react-router-dom";
import type { Movie } from "../../api/movieService";
import styles from "./MovieSearchList.module.scss";
import { formatGenres } from "../../utils/genreFormatter";
import { formatRuntime } from "../../utils/timeFormatter";
import { Rating } from "../Rating";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

import { useDeviceDetect } from "../../hooks/useDeviceDetect";

interface MovieSearchListProps {
  movies: Movie[];
  onMovieClick?: () => void;
}

export const MovieSearchList: React.FC<MovieSearchListProps> = ({
  movies,
  onMovieClick,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceDetect();

  const getImageUrl = (url: string | null) => {
    return url || "../../../public/image/Empty.jpg";
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movies/${id}`);
    onMovieClick?.();
  };

  const renderMovieCard = (movie: Movie) => (
    <div
      key={movie.id}
      className={styles.movie__card}
      onClick={() => handleMovieClick(movie.id)}
    >
      <div className={styles.movie__posterBox}>
        <img
          src={getImageUrl(movie.posterUrl)}
          alt={movie.title}
          className={styles.movie__poster}
          onError={(e) => {
            e.currentTarget.src = "/image/movies/poster-placeholder.jpg";
          }}
        />
      </div>

      <div className={styles.movie__content}>
        <div className={styles.movie__contentWrap}>
          <Rating value={movie.tmdbRating} size="small" />
          <span className={styles.movie__data}>{movie.releaseYear}</span>
          <span className={styles.movie__data}>
            {formatGenres(movie.genres)}
          </span>
          <span className={styles.movie__data}>
            {formatRuntime(movie.runtime)}
          </span>
        </div>
        <h2 className={styles.movie__title}>{movie.title}</h2>
      </div>
    </div>
  );

  if (movies.length === 0) {
    return (
      <div className={styles.movie__list}>
        <h2 className={styles.movie__empty}>
          По вашему запросу фильмы не найдены
        </h2>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className={styles.movie__list}>
        {movies.map((movie) => renderMovieCard(movie))}
      </div>
    );
  }
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={16}
        freeMode={true}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        resistance={true}
        resistanceRatio={0.85}
        slidesPerView={1.5}
        className={styles.movieSwiper}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className={styles.swiperSlide}>
            {renderMovieCard(movie)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
