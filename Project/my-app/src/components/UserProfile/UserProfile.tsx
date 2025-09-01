import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button } from "../Button";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./UserProfile.module.scss";
import { logoutUser } from "../../app/authSlice";

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  if (isLoading) {
    return <div>Загрузка профиля...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Войдите чтобы увидеть профиль</div>;
  }

  const iconName = `${user?.name.charAt(0).toUpperCase()}${user?.surname
    .charAt(0)
    .toUpperCase()}`;
  const userName = `${
    user?.name.charAt(0).toUpperCase() + user?.name.slice(1)
  } ${user?.surname.charAt(0).toUpperCase() + user?.surname.slice(1)}`;

  return (
    <div className={styles.userProfile}>
      <div className={styles.userProfile__list}>
        <div className={styles.userProfile__item}>
          <div className={styles.userProfile__itemIcon}>{iconName}</div>
          <div className={styles.userProfile__itemContent}>
            <div className={styles.userProfile__itemName}>Имя Фамилия</div>
            <div className={styles.userProfile__itemValue}>{userName}</div>
          </div>
        </div>
        <div className={styles.userProfile__item}>
          <div className={styles.userProfile__itemIcon}>
            <SpriteIcon name="icon-email" width={24} height={24} />
          </div>
          <div className={styles.userProfile__itemContent}>
            <div className={styles.userProfile__itemName}>
              Электронная почта
            </div>
            <div className={styles.userProfile__itemValue}>{user?.email}</div>
          </div>
        </div>
      </div>
      <Button
        className={styles.userProfile__btn}
        variant="primary"
        onClick={handleLogout}
        isLoading={isLoading}
      >
        {isLoading ? "Выход..." : "Выйти из аккаунта"}
      </Button>
    </div>
  );
};
