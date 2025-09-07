import { useNavigate } from "react-router-dom";
import { transformGenres } from "../../utils/genreUtils";
import styles from "./GenreList.module.scss";

interface GenreListProps {
  genresList: string[];
}

export const GenreList: React.FC<GenreListProps> = ({ genresList }) => {
  const navigate = useNavigate();
  const genres = transformGenres(genresList);

  const handleGenreClick = (genre: string) => {
    navigate(`/genres/${genre}`);
  };

  return (
    <div className={styles.genre__list}>
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={styles.genre__card}
          onClick={() => handleGenreClick(genre.id)}
        >
          <img
            src={genre.imageUrl}
            alt={genre.name}
            className={styles.genre__cardImage}
            onError={(e) => {
              e.currentTarget.src = "../../../public/image/genres/default.png";
            }}
          />
          <div className={styles.genre__cardContent}>
            <h3 className={styles.genre__cardTitle}>{genre.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
