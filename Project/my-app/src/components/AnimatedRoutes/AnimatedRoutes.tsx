import { Routes, Route } from "react-router-dom";
import { AccountPage } from "../../pages/AccountPage";
import { MainPage } from "../../pages/MainPage";
import { GenrePage } from "../../pages/GenrePage";
import { MoviesByGenrePage } from "../../pages/MoviesByGenrePage";
import { MovieInfoPage } from "../../pages/MovieInfoPage";
import { useRouteTransition } from "../../hooks/useRouteTransition";
import { animated } from "react-spring";

export const AnimatedRoutes = () => {
  const transitions = useRouteTransition();

  return transitions((style, item) => (
    <animated.div
      style={{
        ...style,
        width: "100%",
        height: "100%",
      }}
    >
      <Routes location={item}>
        <Route path="/" element={<MainPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/genres" element={<GenrePage />} />
        <Route path="/genres/:genre" element={<MoviesByGenrePage />} />
        <Route path="/movies/:id" element={<MovieInfoPage />} />
      </Routes>
    </animated.div>
  ));
};
