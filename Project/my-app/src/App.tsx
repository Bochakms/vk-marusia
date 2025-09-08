import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import { Layout } from "./components/Layout";
import { NavMenu } from "./components/NavMenu";
import { SocialList } from "./components/SocialList/SocialList";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Modal } from "./components/Modal/Modal";
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { WelcomeScreen } from "./components/WelcomeScreen";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WelcomeScreen />

        <header className={styles.header}>
          <Layout>
            <NavMenu />
          </Layout>
        </header>

        <main>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </main>

        <footer className={styles.footer}>
          <Layout>
            <SocialList />
          </Layout>
        </footer>

        <Modal />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
