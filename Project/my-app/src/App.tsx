import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./components/Layout";
import { NavMenu } from "./components/NavMenu";
import { GenrePage } from "./pages/GenrePage";
import { GenreMoviesPage } from "./pages/GenreMoviesPage";
import { MovieInfoPage } from "./pages/MovieInfoPage";
import { SocialList } from "./components/SocialList/SocialList";
import { AccountPage } from "./pages/AccountPage";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header className={styles.header}>
          <Layout>
            <NavMenu />
          </Layout>
        </header>

        <main>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/genres" element={<GenrePage />} />
              <Route path="/genres/:genre" element={<GenreMoviesPage />} />
              <Route path="/movies/:id" element={<MovieInfoPage />} />
            </Routes>
          </Layout>
        </main>

        <footer className={styles.footer}>
          <Layout>
            <SocialList />
          </Layout>
        </footer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
