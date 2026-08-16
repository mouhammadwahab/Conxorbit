import { useEffect, useMemo, useState } from "react";
import SEO from "../components/common/SEO";
import PageShell from "../components/layout/PageShell/PageShell";
import SolutionsHero from "../components/solutions/SolutionsHero";
import SolutionsFilterBar from "../components/solutions/SolutionsFilterBar";
import SolutionsGrid from "../components/solutions/SolutionsGrid";
import SolutionsFinalCta from "../components/solutions/SolutionsFinalCta";
import { solutionsListing as staticListing } from "../content/solutionsContent";
import { api, mediaUrl } from "../api/client";
import styles from "./Solutions.module.css";

function mapSolution(item) {
  return {
    ...item,
    badge: item.listingBadge || item.badge,
    image: mediaUrl(item.image),
  };
}

function categoriesFromSolutions(solutions) {
  const seen = new Map();
  solutions.forEach((item) => {
    (item.categories || []).forEach((tag) => {
      const label = String(tag || "").trim();
      if (!label) return;
      const key = label.toLowerCase();
      if (!seen.has(key)) seen.set(key, label);
    });
  });
  return ["All", ...Array.from(seen.values()).sort((a, b) => a.localeCompare(b))];
}

export default function Solutions() {
  const [listing, setListing] = useState(staticListing);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      api.getSolutions(),
      api.getPageContent("solutionsListing").catch(() => null),
    ])
      .then(([rows, chrome]) => {
        if (!alive) return;
        setSolutions(rows.map(mapSolution));
        if (chrome) setListing({ ...staticListing, ...chrome });
        setError("");
      })
      .catch((err) => {
        if (!alive) return;
        setSolutions([]);
        setError(err.message || "Failed to load solutions");
      });
    return () => {
      alive = false;
    };
  }, []);

  const filters = useMemo(() => categoriesFromSolutions(solutions), [solutions]);

  useEffect(() => {
    if (!filters.some((f) => f.toLowerCase() === activeFilter.toLowerCase())) {
      setActiveFilter("All");
    }
  }, [filters, activeFilter]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return solutions.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        (item.categories || []).some(
          (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
        );
      if (!matchesFilter) return false;
      if (!query) return true;
      const haystack = [item.name, item.description, item.badge, ...(item.categories || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeFilter, search, solutions]);

  const { meta, hero, searchPlaceholder, cta } = listing;

  return (
    <PageShell atmosphere="products">
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
        {error ? <p style={{ textAlign: "center", padding: 24 }}>{error}</p> : null}
        <SolutionsGrid items={filtered} />
        <SolutionsFinalCta content={cta} />
      </div>
    </PageShell>
  );
}
