import { Navigate, useParams } from "react-router-dom";
import { caseStudiesContent } from "../content/siteContent";

/** Deep links redirect to Portfolio and open the case-study modal. */
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const item = caseStudiesContent.items.find((c) => c.slug === slug);

  if (!item) {
    return <Navigate to="/portfolio" replace />;
  }

  return <Navigate to={`/portfolio?case=${encodeURIComponent(item.slug)}`} replace />;
}
