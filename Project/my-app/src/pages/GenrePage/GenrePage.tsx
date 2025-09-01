import { FetchGenresList } from "../../components/GenreList/FetchGenreList";
import styles from "./GenrePage.module.scss";

export function GenrePage() {
  return (
    <section className={styles.genre}>
      <h2 className={styles.genre__title}>Жанры фильмов</h2>
      <FetchGenresList />
    </section>
  );
}
