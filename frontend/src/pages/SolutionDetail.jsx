import { Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import SolutionDetailHero from "../components/solutions/SolutionDetailHero";
import SolutionStats from "../components/solutions/SolutionStats";
import SolutionChallenge from "../components/solutions/SolutionChallenge";
import SolutionCapabilities from "../components/solutions/SolutionCapabilities";
import SolutionHowItWorks from "../components/solutions/SolutionHowItWorks";
import SolutionBuiltFor from "../components/solutions/SolutionBuiltFor";
import SolutionDemo from "../components/solutions/SolutionDemo";
import SolutionMore from "../components/solutions/SolutionMore";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import FAQAccordion from "../components/home/FAQAccordion/FAQAccordion";
import { getSolution } from "../content/solutionsContent";
import styles from "./SolutionDetail.module.css";

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = getSolution(slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const { detail } = solution;

  return (
    <PageShell atmosphere="services">
      <SEO
        title={`${solution.name} — ConX Orbit`}
        description={solution.description}
        path={`/solutions/${solution.slug}`}
      />
      <div className={styles.page}>
        <SolutionDetailHero solution={solution} />
        <SolutionStats stats={detail.stats} />
        <SolutionChallenge content={detail.challenge} />
        <SolutionCapabilities content={detail.capabilities} />
        <SolutionHowItWorks content={detail.howItWorks} />
        <SolutionBuiltFor content={detail.builtFor} />
        <SolutionDemo content={detail.demo} fallbackPoster={solution.image} />
        <SolutionMore content={detail.more} />
        {detail.faq ? <FAQAccordion content={detail.faq} /> : null}
        {detail.cta ? <SolutionsFinalCta content={detail.cta} /> : null}
      </div>
    </PageShell>
  );
}
