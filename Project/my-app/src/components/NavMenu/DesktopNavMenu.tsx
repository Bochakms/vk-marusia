import { Link, NavLink } from "react-router-dom";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./NavMenu.module.scss";
import { useRef, useState } from "react";
import { CustomInput } from "../CustomInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  openModal,
  selectIsAuthenticated,
  selectUser,
} from "../../app/authSlice";
import { FetchMovieSearchList } from "../MovieList/FetchMovieSearchList";

export const DesktopNavMenu = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => {
    dispatch(openModal("login"));
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleMovieSelection = () => {
    setSearchValue("");
    setIsSearchFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClose = () => {
    setSearchValue("");
    setIsSearchFocused(false);
  };

  const userName = user
    ? `${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`
    : "";

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
          <div ref={searchContainerRef} className={styles.searchContainer}>
            <div className={styles.searchContainer__header}>
              {searchValue && (
                <button
                  className={styles.searchContainer__back}
                  onClick={handleClose}
                >
                  <SpriteIcon name="icon-close" width={24} height={24} />
                </button>
              )}
              <CustomInput
                ref={inputRef}
                isDark={true}
                type="text"
                placeholder="Поиск"
                iconName="icon-search"
                onFocus={handleSearchFocus}
                onChange={handleSearchChange}
                value={searchValue}
              />
            </div>

            {isSearchFocused && searchValue && (
              <div className={styles.searchResults}>
                <FetchMovieSearchList
                  title={searchValue}
                  onMovieClick={handleMovieSelection}
                />
              </div>
            )}
          </div>
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

      {isSearchFocused && (
        <div
          className={styles.searchOverlay}
          onClick={() => setIsSearchFocused(false)}
        />
      )}
    </>
  );
};
