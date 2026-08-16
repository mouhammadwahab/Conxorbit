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
        <label className={styles.filterField} htmlFor="solutions-category-filter">
          <span className={styles.label}>Filter Solutions</span>
          <select
            id="solutions-category-filter"
            className={styles.select}
            value={activeFilter}
            onChange={(event) => onFilterChange(event.target.value)}
            aria-label="Solution categories"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </label>
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
