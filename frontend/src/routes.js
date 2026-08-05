import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FacadeSolution from "./pages/FacadeSolution";
import ConstructionSolution from "./pages/ConstructionSolution";
import Services from "./pages/Services";
import Products from "./pages/Products";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function SolutionsRedirect() {
  return <Navigate to="/solutions/facade" replace />;
}

export const routes = [
  { path: "/", element: Home },
  { path: "/solutions", element: SolutionsRedirect },
  { path: "/solutions/facade", element: FacadeSolution },
  { path: "/solutions/construction", element: ConstructionSolution },
  { path: "/services", element: Services },
  { path: "/products", element: Products },
  { path: "/case-studies", element: CaseStudies },
  { path: "/case-studies/:slug", element: CaseStudyDetail },
  { path: "/partners", element: Partners },
  { path: "/about", element: About },
  { path: "/contact", element: Contact },
  { path: "*", element: NotFound },
];
