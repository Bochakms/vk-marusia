import { FetchMovie } from "../../components/MovieInfo/FetchMovie";
import styles from "./MovieInfoPage.module.scss";

export function MovieInfoPage() {
  return (
    <section className={styles.movieInfo}>
      <FetchMovie />
    </section>
  );
}
