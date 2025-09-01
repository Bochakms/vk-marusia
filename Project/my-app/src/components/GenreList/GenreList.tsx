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
    <div className={styles.genreList}>
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={styles.genreItem}
          onClick={() => handleGenreClick(genre.id)}
        >
          <img
            src={genre.imageUrl}
            alt={genre.name}
            className={styles.genreImage}
            onError={(e) => {
              e.currentTarget.src = "../../../public/image/genres/default.png";
            }}
          />
          <div className={styles.genreContent}>
            <h3 className={styles.genreTitle}>{genre.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
