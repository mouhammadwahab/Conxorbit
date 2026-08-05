import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./styles/fonts.css";
import "./styles/globals.css";
import "./styles/theme.css";
import "./styles/motion.css";
import SplashScreen from "./components/splash/SplashScreen";
import Layout from "./components/layout/Layout/Layout";
import { routes } from "./routes";
import { initAnalytics, track } from "./utils/analytics";
import { ensureGsap } from "./utils/gsapSetup";

function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    track("page_view", { path: location.pathname });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <RouteAnalytics />
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    ensureGsap();
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <SplashScreen>
        <AppRoutes />
      </SplashScreen>
    </BrowserRouter>
  );
}

export default App;
