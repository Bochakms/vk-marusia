import { Button } from "../Button";
import styles from "../AuthForm/AuthForm.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { setModalView } from "../../app/authSlice";

export const RegisterSuccess = () => {
  const dispatch = useAppDispatch();
  const handleSwitchToLogin = () => {
    dispatch(setModalView("login"));
  };

  return (
    <div className={styles.authForm}>
      <h2 className={styles.authForm__heading}>Регистрация завершена</h2>
      <p className={styles.authForm__successText}>
        Используйте вашу электронную почту для входа
      </p>
      <Button onClick={handleSwitchToLogin}>Войти</Button>
    </div>
  );
};
