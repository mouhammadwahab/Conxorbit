import { useMemo, useState } from "react";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import SolutionsHero from "../components/solutions/SolutionsHero";
import SolutionsFilterBar from "../components/solutions/SolutionsFilterBar";
import SolutionsGrid from "../components/solutions/SolutionsGrid";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import { solutions, solutionsListing } from "../content/solutionsContent";
import styles from "./Solutions.module.css";

export default function Solutions() {
  const { meta, hero, filters, searchPlaceholder, cta } = solutionsListing;
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return solutions.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        item.categories.some(
          (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
        );
      if (!matchesFilter) return false;
      if (!query) return true;
      const haystack = [item.name, item.description, item.badge, ...item.categories]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeFilter, search]);

  return (
    <PageShell atmosphere="services">
      <SEO title={meta.title} description={meta.description} path="/solutions" />
      <div className={styles.page}>
        <SolutionsHero content={hero} />
        <div className={styles.filterWrap}>
          <SolutionsFilterBar
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder={searchPlaceholder}
          />
        </div>
        <SolutionsGrid items={filtered} />
        <SolutionsFinalCta content={cta} />
      </div>
    </PageShell>
  );
}
