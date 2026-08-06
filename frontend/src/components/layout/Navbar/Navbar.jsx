import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../../content/siteContent";
import brandLogo from "../../../assets/images/Logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!openDropdown) return undefined;

    const onDoc = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    // Use click (not pointerdown) so the opening click is not raced
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [openDropdown]);

  const isSolutionsActive = location.pathname.startsWith("/solutions");

  return (
    <header
      className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}${
        mobileOpen ? ` ${styles.mobileOpen}` : ""
      }`}
    >
      <Link className={styles.brand} to="/">
        <img className={styles.navLogo} src={brandLogo} alt="ConX Orbit logo" />
        <span className={styles.logo}>ConX Orbit</span>
      </Link>

      <button
        type="button"
        className={styles.menuToggle}
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <nav className={styles.nav} aria-label="Primary navigation">
        {navLinks.map((link) =>
          link.children ? (
            <div
              key={link.label}
              className={`${styles.dropdown}${openDropdown ? ` ${styles.dropdownOpen}` : ""}`}
              ref={dropdownRef}
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button
                type="button"
                className={isSolutionsActive ? styles.activeLink : styles.link}
                aria-expanded={openDropdown}
                aria-haspopup="true"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpenDropdown((prev) => !prev);
                }}
              >
                {link.label}
                <span className={styles.chevron} aria-hidden="true">
                  ▾
                </span>
              </button>
              <div
                className={`${styles.menu}${openDropdown ? ` ${styles.menuOpen}` : ""}`}
                role="menu"
              >
                {link.children.map((child) => (
                  <NavLink
                    key={child.href}
                    to={child.href}
                    role="menuitem"
                    className={({ isActive }) =>
                      isActive ? styles.menuActive : styles.menuLink
                    }
                    onClick={() => setOpenDropdown(false)}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              {link.label}
            </NavLink>
          )
        )}
      </nav>

      <Link className={styles.button} to="/contact">
        Book a Discovery Call
      </Link>
    </header>
  );
}
