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
import { scrollToTop } from "./utils/scrollToTop";
import AdminRoot from "./admin/AdminRoot";

function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    track("page_view", { path: location.pathname });
    scrollToTop();
    const frame = requestAnimationFrame(() => scrollToTop());
    const timer = window.setTimeout(() => scrollToTop(), 50);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [location.pathname, location.key]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <RouteAnalytics />
      <Routes>
        <Route path="/admin/*" element={<AdminRoot />} />
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
