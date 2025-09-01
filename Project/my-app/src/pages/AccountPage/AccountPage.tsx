import { useState } from "react";
import { FetchFavoritesMovieList } from "../../components/MovieList/FetchFavoritesMovieList";
import { SpriteIcon } from "../../components/SpriteIcon/SpriteIcon";
import { UserProfile } from "../../components/UserProfile";
import styles from "./AccountPage.module.scss";

export type AccountView = "favorites" | "profile";

export function AccountPage() {
  const [accView, setAccView] = useState<AccountView>("favorites");

  const renderCurrentView = () => {
    switch (accView) {
      case "favorites":
        return <FetchFavoritesMovieList />;
      case "profile":
        return <UserProfile />;
      default:
        return null;
    }
  };

  const handleChangeView = (view: AccountView) => {
    setAccView(view);
  };

  return (
    <section className={styles.account}>
      <h2 className={styles.account__header}>Мой аккаунт</h2>
      <div className={styles.account__menu}>
        <div
          className={`${styles.account__menuItem} ${
            accView == "favorites" ? styles["account__menuItem--active"] : ""
          }`}
          onClick={() => handleChangeView("favorites")}
        >
          <SpriteIcon
            className={styles.account__menuItemIcon}
            name="icon-favorites"
            width={24}
            height={24}
          />
          <span className={styles.account__menuItemName}>Избранные фильмы</span>
        </div>
        <div
          className={`${styles.account__menuItem} ${
            accView == "profile" ? styles["account__menuItem--active"] : ""
          }`}
          onClick={() => handleChangeView("profile")}
        >
          <SpriteIcon
            className={styles.account__menuItemIcon}
            name="icon-user"
            width={24}
            height={24}
          />
          <span className={styles.account__menuItemName}>
            Настройка аккаунта
          </span>
        </div>
      </div>
      {renderCurrentView()}
    </section>
  );
}
