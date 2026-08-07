import Reveal from "../common/Reveal";
import styles from "./SolutionsFilterBar.module.css";

export default function SolutionsFilterBar({
  filters = [],
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
  searchPlaceholder = "Search solutions...",
}) {
  return (
    <Reveal as="div" className={styles.bar} role="search">
      <div className={styles.left}>
        <span className={styles.label}>Filter Solutions</span>
        <div className={styles.pills} role="tablist" aria-label="Solution categories">
          {filters.map((filter) => {
            const selected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={selected}
                className={selected ? styles.pillActive : styles.pill}
                onClick={() => onFilterChange(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
      <label className={styles.search}>
        <span className={styles.srOnly}>Search solutions</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
        />
      </label>
    </Reveal>
  );
}
