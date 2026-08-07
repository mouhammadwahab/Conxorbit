import { Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import ServiceHero from "../components/services/ServiceHero";
import ServiceValue from "../components/services/ServiceValue";
import ServiceApproach from "../components/services/ServiceApproach";
import ServiceCapabilities from "../components/services/ServiceCapabilities";
import ServiceWhy from "../components/services/ServiceWhy";
import ServiceFinalCta from "../components/services/ServiceFinalCta";
import FeaturedSolutions from "../components/home/FeaturedSolutions/FeaturedSolutions";
import FAQAccordion from "../components/home/FAQAccordion/FAQAccordion";
import { getServicePage } from "../content/servicePages";
import { homeContent } from "../content/siteContent";
import styles from "./ServiceDetail.module.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const page = getServicePage(slug);

  if (!page) {
    return <Navigate to="/services/custom-ai-development" replace />;
  }

  const faq = page.faq || homeContent.faq;

  return (
    <PageShell atmosphere="services">
      <SEO
        title={page.meta.title}
        description={page.meta.description}
        path={`/services/${page.slug}`}
      />
      <div className={styles.page}>
        <ServiceHero content={page.hero} />
        <ServiceValue content={page.value} />
        <ServiceApproach content={page.approach} />
        <ServiceCapabilities content={page.capabilities} />
        <FeaturedSolutions content={page.featured} />
        <ServiceWhy content={page.why} />
        <FAQAccordion content={faq} />
        <ServiceFinalCta content={page.cta} />
      </div>
    </PageShell>
  );
}
