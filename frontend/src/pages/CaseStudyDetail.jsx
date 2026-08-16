import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import CaseStudyHero from "../components/portfolio/CaseStudyHero";
import CaseStudyProblem from "../components/portfolio/CaseStudyProblem";
import CaseStudySolution from "../components/portfolio/CaseStudySolution";
import CaseStudyCta from "../components/portfolio/CaseStudyCta";
import { api, mediaUrl } from "../api/client";
import styles from "./CaseStudyDetail.module.css";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [study, setStudy] = useState(null);
  const [relatedSolution, setRelatedSolution] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    api
      .getCaseStudy(slug)
      .then(async (item) => {
        if (!alive) return;
        setStudy(item);
        let related = null;
        if (item.relatedSolutionId) {
          try {
            const solutions = await api.getSolutions("?listing=all");
            related =
              solutions.find((row) => row._id === item.relatedSolutionId) ||
              solutions.find((row) => row.slug === item.relatedSolutionId) ||
              null;
          } catch {
            related = null;
          }
        }
        if (alive) {
          setRelatedSolution(related);
          setStatus("ok");
        }
      })
      .catch(() => {
        if (!alive) return;
        setStudy(null);
        setStatus("missing");
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <PageShell atmosphere="cases">
        <p className={styles.loading}>Loading case study…</p>
      </PageShell>
    );
  }

  if (status === "missing" || !study) {
    return <Navigate to="/portfolio" replace />;
  }

  const solutionName = relatedSolution?.name || study.title;
  const solutionHref = relatedSolution?.slug
    ? `/solutions/${relatedSolution.slug}`
    : "/solutions";
  const seoTitle = `${solutionName} — Case Study | ConX Orbit`;
  const seoDescription = study.shortDescription || "";

  const studyForHero = {
    ...study,
    heroImageUrl: mediaUrl(study.heroImageUrl),
    mockupImageUrl: mediaUrl(study.mockupImageUrl),
  };

  return (
    <PageShell atmosphere="cases">
      <SEO title={seoTitle} description={seoDescription} path={`/case-studies/${study.slug}`} />
      <CaseStudyHero study={studyForHero} solutionName={solutionName} />
      <CaseStudyProblem problem={study.problem} problemPoints={study.problemPoints} />
      <CaseStudySolution solution={study.solution} solutionPoints={study.solutionPoints} />
      {(study.supportingImageUrl || study.clientName || study.industry) && (
        <div className={styles.body}>
          {study.supportingImageUrl ? (
            <img
              className={styles.supportImage}
              src={mediaUrl(study.supportingImageUrl)}
              alt=""
              loading="lazy"
            />
          ) : null}
          {(study.clientName || study.industry || study.trade) && (
            <p className={styles.metaLine}>
              {[study.clientName, study.industry, study.trade].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      )}
      <CaseStudyCta
        content={{
          title: `See ${solutionName} in more detail.`,
          body: "Explore the full solution, its capabilities and the workflow it was designed around.",
          primary: { label: "View Solution", href: solutionHref },
          secondary: { label: "Explore More Case Studies", href: "/portfolio" },
        }}
        solutionName={solutionName}
        solutionHref={solutionHref}
      />
    </PageShell>
  );
}
