import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import TiltCard from "../components/common/TiltCard";
import PageShell from "../components/layout/PageShell/PageShell";
import useInView from "../hooks/useInView";
import { productsContent } from "../content/siteContent";
import styles from "./Products.module.css";

export default function Products() {
  const { meta, hero, products } = productsContent;
  const [ref, visible] = useInView();

  return (
    <PageShell atmosphere="products">
      <SEO title={meta.title} description={meta.description} path="/products" />
      <PageHero {...hero} />
      <section
        ref={ref}
        className={`${styles.section} toneLight ${visible ? `${styles.visible} visible` : styles.hidden}`}
      >
        <div className={styles.grid}>
          {products.map((product, index) => (
            <TiltCard
              key={product.title}
              as="article"
              className={`${styles.card} interactiveCard cardReveal`}
              max={11}
              scale={1.03}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span className={styles.badge}>{product.status}</span>
              <h2>{product.title}</h2>
              <p>{product.body}</p>
            </TiltCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
