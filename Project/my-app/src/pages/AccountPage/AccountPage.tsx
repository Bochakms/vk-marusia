import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { FetchFavoritesMovieList } from "../../components/MovieList/FetchFavoritesMovieList";
import { SpriteIcon } from "../../components/SpriteIcon/SpriteIcon";
import { UserProfile } from "../../components/UserProfile";
import styles from "./AccountPage.module.scss";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";

export type AccountView = "favorites" | "profile";

export function AccountPage() {
  const [accView, setAccView] = useState<AccountView>("favorites");
  const { isMobile } = useDeviceDetect();

  const transitions = useTransition(accView, {
    from: { opacity: 0, transform: "translateX(50%)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-50%)" },
    config: { tension: 280, friction: 30 },
    exitBeforeEnter: true,
  });

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
          <span className={styles.account__menuItemName}>
            {isMobile ? "Избранное" : "Избранные фильмы"}
          </span>
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
            {isMobile ? "Настройки" : "Настройка аккаунта"}
          </span>
        </div>
      </div>

      <div style={{ minHeight: "400px" }}>
        {transitions((style, item) => (
          <animated.div
            style={{
              ...style,
              width: "100%",
              height: "100%",
            }}
          >
            {item === "favorites" && <FetchFavoritesMovieList />}
            {item === "profile" && <UserProfile />}
          </animated.div>
        ))}
      </div>
    </section>
  );
}
