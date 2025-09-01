import { FetchRandomMovie } from "../../components/MovieInfo/FetchRandomMovie";
import { FetchTop10MovieList } from "../../components/MovieList/FetchTop10MovieList";
import styles from "./MainPage.module.scss";

export function MainPage() {
  return (
    <>
      <section className={styles.randomMovie}>
        <FetchRandomMovie />
      </section>
      <section className={styles.top10MovieList}>
        <h2 className={styles.top10MovieList__heading}>Топ 10 фильмов</h2>
        <FetchTop10MovieList />
      </section>
    </>
  );
}
