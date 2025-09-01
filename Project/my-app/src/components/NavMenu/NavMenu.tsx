import { Link, NavLink } from "react-router-dom";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./NavMenu.module.scss";
import { useEffect } from "react";
import { Modal } from "../Modal/Modal";
import { CustomInput } from "../CustomInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  checkSessionAndLoadProfile,
  openModal,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from "../../app/authSlice";

export const NavMenu = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(checkSessionAndLoadProfile());
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(openModal("login"));
  };

  const userName = user
    ? `${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`
    : "";

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <nav className={styles.navMenu}>
        <Link to={"/"}>
          <SpriteIcon
            className={styles.navMenu__logo}
            name="logo-marusia-white"
            width={143}
            height={32}
          />
        </Link>
        <div className={styles.navMenu__wrapper}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navMenu__pageLink} ${
                isActive ? styles["navMenu__pageLink--active"] : ""
              }`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              `${styles.navMenu__pageLink} ${
                isActive ? styles["navMenu__pageLink--active"] : ""
              }`
            }
          >
            Жанры
          </NavLink>
          <CustomInput
            isDark={true}
            type="text"
            placeholder="Поиск"
            iconName="icon-search"
          />
        </div>
        {isAuthenticated ? (
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `${styles.navMenu__pageLink} ${
                isActive ? styles["navMenu__pageLink--active"] : ""
              }`
            }
          >
            {userName}
          </NavLink>
        ) : (
          <button className={styles.navMenu__btn} onClick={handleOpenModal}>
            Войти
          </button>
        )}
      </nav>

      <Modal />
    </>
  );
};
