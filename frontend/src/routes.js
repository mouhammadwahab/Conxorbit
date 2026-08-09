import Home from "./pages/Home";
import FacadeSolution from "./pages/FacadeSolution";
import ConstructionSolution from "./pages/ConstructionSolution";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import ServiceDetail from "./pages/ServiceDetail";
import Portfolio from "./pages/Portfolio";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import BookDiscovery from "./pages/BookDiscovery";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

function ServicesRedirect() {
  return <Navigate to="/services/custom-ai-development" replace />;
}

function CaseStudiesRedirect() {
  return <Navigate to="/portfolio" replace />;
}

function HomeRedirect() {
  return <Navigate to="/" replace />;
}

function DiscoveryRedirect() {
  return <Navigate to="/book-discovery" replace />;
}

function FacadeRedirect() {
  return <Navigate to="/case-studies/facade" replace />;
}

function ConstructionRedirect() {
  return <Navigate to="/case-studies/construction" replace />;
}

export const routes = [
  { path: "/", element: Home },
  { path: "/solutions", element: Solutions },
  { path: "/solutions/facade", element: FacadeRedirect },
  { path: "/solutions/construction", element: ConstructionRedirect },
  { path: "/solutions/:slug", element: SolutionDetail },
  { path: "/services", element: ServicesRedirect },
  { path: "/services/:slug", element: ServiceDetail },
  { path: "/products", element: HomeRedirect },
  { path: "/portfolio", element: Portfolio },
  { path: "/case-studies", element: CaseStudiesRedirect },
  { path: "/case-studies/facade", element: FacadeSolution },
  { path: "/case-studies/construction", element: ConstructionSolution },
  { path: "/case-studies/:slug", element: CaseStudyDetail },
  { path: "/partners", element: HomeRedirect },
  { path: "/about", element: About },
  { path: "/book-discovery", element: BookDiscovery },
  { path: "/contact", element: DiscoveryRedirect },
  { path: "*", element: NotFound },
];
