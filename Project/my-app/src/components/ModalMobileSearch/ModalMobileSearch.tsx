import { useRef, useEffect } from "react";
import { FetchMovieSearchList } from "../MovieList/FetchMovieSearchList";
import styles from "./ModalMobileSearch.module.scss";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import { CustomInput } from "../CustomInput";

interface ModalMobileSearchProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onMovieSelect: () => void;
}

export const ModalMobileSearch: React.FC<ModalMobileSearchProps> = ({
  searchValue,
  onSearchChange,
  onClose,
  onMovieSelect,
}) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleMovieSelection = () => {
    onMovieSelect();
    onClose();
  };

  return (
    <div className={styles.mobileSearchOverlay}>
      <div className={styles.mobileSearch} ref={searchContainerRef}>
        <div className={styles.mobileSearch__header}>
          <button className={styles.mobileSearch__back} onClick={onClose}>
            <SpriteIcon name="icon-close" width={24} height={24} />
          </button>
          <CustomInput
            iconName="icon-search"
            autoFocus
            isDark={true}
            type="text"
            placeholder="Поиск"
            onChange={onSearchChange}
            value={searchValue}
          />
        </div>

        {searchValue && (
          <div className={styles.mobileSearch__results}>
            <FetchMovieSearchList
              title={searchValue}
              onMovieClick={handleMovieSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
};
