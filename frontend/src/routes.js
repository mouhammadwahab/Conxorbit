import Home from "./pages/Home";
import FacadeSolution from "./pages/FacadeSolution";
import ConstructionSolution from "./pages/ConstructionSolution";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import ServiceDetail from "./pages/ServiceDetail";
import Products from "./pages/Products";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Partners from "./pages/Partners";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

function ServicesRedirect() {
  return <Navigate to="/services/custom-ai-development" replace />;
}

export const routes = [
  { path: "/", element: Home },
  { path: "/solutions", element: Solutions },
  { path: "/solutions/facade", element: FacadeSolution },
  { path: "/solutions/construction", element: ConstructionSolution },
  { path: "/solutions/:slug", element: SolutionDetail },
  { path: "/services", element: ServicesRedirect },
  { path: "/services/:slug", element: ServiceDetail },
  { path: "/products", element: Products },
  { path: "/case-studies", element: CaseStudies },
  { path: "/case-studies/:slug", element: CaseStudyDetail },
  { path: "/partners", element: Partners },
  { path: "/about", element: About },
  { path: "/contact", element: Contact },
  { path: "*", element: NotFound },
];
