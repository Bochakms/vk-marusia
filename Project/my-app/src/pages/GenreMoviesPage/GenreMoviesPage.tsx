import { useParams, Link } from "react-router-dom";
import styles from "./GenreMoviesPage.module.scss";
import { FetchMovieList } from "../../components/MovieList/FetchMovieList";
import { getGenreName } from "../../utils/genreUtils";
import { SpriteIcon } from "../../components/SpriteIcon/SpriteIcon";

export function GenreMoviesPage() {
  const { genre } = useParams<{ genre: string }>();
  const genreName = genre ? getGenreName(genre) : "";

  return (
    <section className={styles.genreMovies}>
      <div className={styles.genreMovies__header}>
        <Link to="/genres">
          <SpriteIcon
            className={styles.genreMovies__iconBack}
            name="icon-chevron"
            width={40}
            height={40}
          />
        </Link>
        <h2 className={styles.genreMovies__title}>{genreName}</h2>
      </div>

      <FetchMovieList genre={genre!} />
    </section>
  );
}
