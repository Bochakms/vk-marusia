import styles from "./Modal.module.scss";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import { LoginForm, RegisterForm, RegisterSuccess } from "../AuthForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal, selectModalView } from "../../app/authSlice";
import { animated, useTransition } from "react-spring";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const modalView = useAppSelector(selectModalView);
  const isOpen = modalView !== "closed";

  const transitions = useTransition(isOpen, {
    from: {
      opacity: 0,
      overlayOpacity: 0,
      transform: "translateY(20px) scale(0.5)",
    },
    enter: {
      opacity: 1,
      overlayOpacity: 1,
      transform: "translateY(0px) scale(1)",
    },
    leave: {
      opacity: 0,
      overlayOpacity: 0,
      transform: "translateY(20px) scale(0.5)",
    },
    config: { tension: 600, friction: 90 },
  });

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

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          className={styles.modal__overlay}
          style={{ opacity: style.overlayOpacity }}
          onClick={handleClose}
        >
          <animated.div
            className={styles.modal__content}
            style={{
              opacity: style.opacity,
              transform: style.transform,
            }}
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
          </animated.div>
        </animated.div>
      )
  );
};
