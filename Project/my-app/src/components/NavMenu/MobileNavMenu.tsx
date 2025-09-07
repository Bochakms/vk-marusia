import { Link, NavLink } from "react-router-dom";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./NavMenu.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openModal, selectIsAuthenticated } from "../../app/authSlice";
import { useState } from "react";
import { ModalMobileSearch } from "../ModalMobileSearch";

export const MobileNavMenu = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOpenModal = () => {
    dispatch(openModal("login"));
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  const handleMovieSelection = () => {
    setSearchValue("");
    setIsSearchOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <nav className={styles.navMenuMobile}>
        <Link to={"/"}>
          <SpriteIcon
            className={styles.navMenuMobile__logo}
            name="logo-marusia-white"
            width={80}
            height={32}
          />
        </Link>

        <div className={styles.navMenuMobile__icons}>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              `${styles.navMenuMobile__icon} ${
                isActive ? styles["navMenuMobile__icon--active"] : ""
              }`
            }
          >
            <SpriteIcon name="icon-genres" width={24} height={24} />
          </NavLink>

          <button
            className={styles.navMenuMobile__icon}
            onClick={handleSearchClick}
          >
            <SpriteIcon name="icon-search" width={24} height={24} />
          </button>

          {isAuthenticated ? (
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `${styles.navMenuMobile__icon} ${
                  isActive ? styles["navMenuMobile__icon--active"] : ""
                }`
              }
            >
              <SpriteIcon name="icon-user" width={24} height={24} />
            </NavLink>
          ) : (
            <button
              className={styles.navMenuMobile__icon}
              onClick={handleOpenModal}
            >
              <SpriteIcon name="icon-user" width={24} height={24} />
            </button>
          )}
        </div>
      </nav>

      {isSearchOpen && (
        <ModalMobileSearch
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onClose={handleSearchClose}
          onMovieSelect={handleMovieSelection}
        />
      )}
    </>
  );
};
