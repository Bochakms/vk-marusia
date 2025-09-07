import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./MovieInfo.module.scss";
import { formatRuntime } from "../../utils/timeFormatter";
import { formatGenres } from "../../utils/genreUtils";
import { Button } from "../Button/Button";
import { Rating } from "../Rating";
import { formatCurrency, transformLanguage } from "../../utils/movieUtils";
import type { Movie } from "../../api/movieService";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openModal } from "../../app/authSlice";
import { TrailerModal } from "../TrailerModal";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";

export interface MovieProps {
  movie: Movie;
  variant?: "full" | "part";
  onRefresh?: () => void;
}

export const MovieInfo: React.FC<MovieProps> = ({
  movie,
  variant = "full",
  onRefresh,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { checkIsFavorite, toggleFavorite, isLoading } = useFavorites();
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const { isMobile } = useDeviceDetect();

  const handleTrailerClick = () => {
    setIsTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setIsTrailerModalOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const checkFavoriteStatus = async () => {
        try {
          const isFavorite = await checkIsFavorite(movie.id);
          setIsMovieFavorite(isFavorite);
        } catch (error) {
          console.error("Error checking favorite:", error);
        }
      };

      checkFavoriteStatus();
    } else {
      setIsMovieFavorite(false);
    }
  }, [movie.id, checkIsFavorite, isAuthenticated]);

  const handleAboutClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      dispatch(openModal("login"));
      return;
    }

    try {
      await toggleFavorite(movie.id);
      setIsMovieFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const rows = [
    {
      label: "Язык оригинала",
      value: movie.language ? transformLanguage(movie.language) : undefined,
    },
    {
      label: "Бюджет",
      value: movie.budget ? formatCurrency(movie.budget) : undefined,
    },
    {
      label: "Сборы",
      value: movie.revenue ? formatCurrency(movie.revenue) : undefined,
    },
    { label: "Режиссер", value: movie.director },
    { label: "Продакшн", value: movie.production },
    { label: "Награды", value: movie.awardsSummary },
  ];

  const getFavoriteIcon = () => {
    if (!isAuthenticated) {
      return "icon-favorites";
    }
    return isMovieFavorite ? "icon-favorites-filled" : "icon-favorites";
  };

  return (
    <div className={styles.movie}>
      <div className={styles.movie__mainDescription}>
        <div className={styles.movie__wrapper}>
          <div className={styles.movie__content}>
            <div className={styles.movie__dataWrap}>
              <Rating value={movie.tmdbRating} size="medium" />
              <span className={styles.movie__data}>{movie.releaseYear}</span>
              <span
                className={[styles.movie__data, styles.movie__genre].join(" ")}
              >
                {formatGenres(movie.genres)}
              </span>
              <span className={styles.movie__data}>
                {formatRuntime(movie.runtime)}
              </span>
            </div>
            <h2 className={styles.movie__title}>{movie.title}</h2>
            <p className={styles.movie__plot}>{movie.plot}</p>
          </div>

          <div
            className={styles.movie__btnWrap}
            style={{ flexWrap: variant == "part" ? "wrap" : "nowrap" }}
          >
            <Button
              variant="primary"
              size="medium"
              fullWidth={isMobile ? true : false}
              onClick={handleTrailerClick}
            >
              Трейлер
            </Button>
            {variant == "part" && (
              <Button
                variant="secondary"
                size="medium"
                onClick={handleAboutClick}
              >
                О фильме
              </Button>
            )}
            <Button
              variant="secondary"
              size="small"
              icon={
                <SpriteIcon name={getFavoriteIcon()} width={24} height={24} />
              }
              onClick={handleToggleFavorite}
              isLoading={isLoading}
            ></Button>
            {variant == "part" && (
              <Button
                variant="secondary"
                size="small"
                icon={<SpriteIcon name="icon-update" width={24} height={24} />}
                onClick={onRefresh}
                isLoading={isLoading}
              ></Button>
            )}
          </div>
        </div>
        <div className={styles.movie__imgContainer}>
          <img
            src={movie.backdropUrl || "../../../public/image/Empty.jpg"}
            alt="backdrop"
            className={styles.movie__img}
          />
        </div>
      </div>

      {variant == "full" && (
        <div className={styles.movie__auxDescription}>
          <h3 className={styles.movie__heading}>О фильме</h3>
          <div className={styles.movie__info}>
            {rows.map((row, index) => (
              <div key={index} className={styles.movie__infoItem}>
                <div className={styles.movie__infoLabel}>
                  <span>{row.label}</span>
                  <span className={styles.movie__dot}></span>
                </div>
                <div className={styles.movie__infoValue}>
                  {row.value || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={closeTrailerModal}
        trailerYouTubeId={movie.trailerYouTubeId}
        title={movie.title}
      />
    </div>
  );
};
