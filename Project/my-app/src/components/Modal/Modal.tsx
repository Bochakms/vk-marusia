import styles from "./Modal.module.scss";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import { LoginForm, RegisterForm, RegisterSuccess } from "../AuthForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal, selectModalView } from "../../app/authSlice";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const modalView = useAppSelector(selectModalView);
  const isOpen = modalView !== "closed";

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const renderCurrentView = () => {
    switch (modalView) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "success":
        return <RegisterSuccess />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.modal__overlay} onClick={handleClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <SpriteIcon
          className={styles.modal__logo}
          name="logo-marusia-white"
          width={132}
          height={30}
        />
        <button
          className={styles.modal__closeButton}
          onClick={handleClose}
          aria-label="Закрыть"
        >
          <SpriteIcon name="icon-close" width={24} height={24} />
        </button>
        {renderCurrentView()}
      </div>
    </div>
  );
};
