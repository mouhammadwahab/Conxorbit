import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import SolutionDetailHero from "../components/solutions/SolutionDetailHero";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import { getSolution, solutionsListing } from "../content/solutionsContent";
import styles from "./SolutionDetail.module.css";

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = getSolution(slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  return (
    <PageShell atmosphere="services">
      <SEO
        title={`${solution.name} — ConX Orbit`}
        description={solution.description}
        path={`/solutions/${solution.slug}`}
      />
      <div className={styles.page}>
        <div className={styles.top}>
          <Link className={styles.back} to="/solutions">
            ← All Solutions
          </Link>
        </div>
        <SolutionDetailHero solution={solution} />
        <SolutionsFinalCta content={solutionsListing.cta} />
      </div>
    </PageShell>
  );
}
