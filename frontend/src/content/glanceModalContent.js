import panelXImage from "../assets/portfolio/featured-panelx.png";
import inspectionImage from "../assets/solutions/construction-inspection.jpg";
import drawingImage from "../assets/solutions/drawing-intelligence.jpg";

export const glanceModalContent = {
  badge: "CONX ORBIT",
  title: "AI & Technology Built Around Real Workflows.",
  body: "We build intelligent systems for façade and construction teams.",
  solutionsLabel: "FEATURED SOLUTIONS",
  solutions: [
    {
      badge: "CLIENT SYSTEM",
      title: "PanelX",
      body: "Façade panel visibility across shop and site.",
      href: "/solutions/panel-x",
      demoHref: "/solutions/panel-x#demo",
      image: panelXImage,
    },
    {
      badge: "INTERNAL PRODUCT",
      title: "Construction Inspection",
      body: "Site capture, photos, and close-out in one flow.",
      href: "/solutions/construction-inspection",
      demoHref: "/solutions/construction-inspection#demo",
      image: inspectionImage,
    },
    {
      badge: "WORKFLOW SOLUTION",
      title: "Drawing Intelligence",
      body: "Revision compare and drawing data extraction.",
      href: "/solutions/drawing-intelligence",
      demoHref: "/solutions/drawing-intelligence#demo",
      image: drawingImage,
    },
  ],
  footerPrompt: "See what we're building.",
  primaryCta: { label: "Explore Solutions", href: "/solutions" },
  secondaryCta: { label: "Book a Discovery Call", href: "/book-discovery" },
  actions: {
    viewDemo: "View Demo",
    learnMore: "Learn More",
  },
};
