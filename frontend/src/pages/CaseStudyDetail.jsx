import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { api } from "../api/client";

/** Deep links redirect to Portfolio and open the case-study modal. */
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    api
      .getCaseStudies()
      .then((items) => {
        if (!alive) return;
        const found = (items || []).some((item) => item.slug === slug && item.published !== false);
        setStatus(found ? "ok" : "missing");
      })
      .catch(() => {
        if (alive) setStatus("missing");
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (status === "loading") {
    return null;
  }

  if (status === "missing") {
    return <Navigate to="/portfolio" replace />;
  }

  return <Navigate to={`/portfolio?case=${encodeURIComponent(slug)}`} replace />;
}
