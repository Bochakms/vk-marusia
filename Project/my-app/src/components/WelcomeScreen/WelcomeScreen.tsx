import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useAppSelector } from "../../app/hooks";
import { selectUser, selectAuthLoading } from "../../app/authSlice";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";
import styles from "./WelcomeScreen.module.scss";
import { Loader } from "../Loader";

export const WelcomeScreen = () => {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Анимация появления логотипа и лоадера
  const logoSpring = useSpring({
    opacity: showWelcome ? 0 : 1,
    scale: showWelcome ? 0.5 : 1,
    delay: 500,
    config: { tension: 280, friction: 90 },
  });

  // Анимация появления приветственного текста
  const welcomeSpring = useSpring({
    opacity: showContent ? 1 : 0,
    y: showContent ? 0 : 40,
    delay: 500,
    config: { tension: 280, friction: 90 },
  });

  // Анимация исчезновения всего экрана
  const screenSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    delay: 500,
    config: { tension: 280, friction: 90 },
  });

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowWelcome(true);
    }, 3000);

    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    const timer3 = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <animated.div
      className={styles.welcomeScreen}
      style={screenSpring}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <div className={styles.welcomeScreen__content}>
        <animated.div
          className={styles.welcomeScreen__logoSection}
          style={{
            opacity: logoSpring.opacity,
            transform: logoSpring.scale.to((scale) => `scale(${scale})`),
          }}
        >
          <SpriteIcon
            className={styles.welcomeScreen__logo}
            name="logo-marusia-white"
            width={300}
            height={80}
          />
          <Loader />
        </animated.div>

        <animated.div
          className={styles.welcomeScreen__textSection}
          style={{
            opacity: welcomeSpring.opacity,
            transform: welcomeSpring.y.to((y) => `translateY(${y}px)`),
          }}
        >
          <h1 className={styles.welcomeScreen__title}>
            Добро пожаловать{user ? `, ${user.name}` : ""}
          </h1>
          {user && (
            <p className={styles.welcomeScreen__subtitle}>
              {isLoading
                ? "Загружаем ваш профиль..."
                : "Рады видеть вас снова!"}
            </p>
          )}
        </animated.div>
      </div>
    </animated.div>
  );
};
