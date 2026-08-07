import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../../content/siteContent";
import brandLogo from "../../../assets/images/Logo.png";
import { scrollToTop } from "../../../utils/scrollToTop";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRefs = useRef({});
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!openMenu) return undefined;

    const onDoc = (event) => {
      const current = menuRefs.current[openMenu];
      if (!current?.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [openMenu]);

  const isLinkActive = (link) => {
    if (link.label === "Solutions") return location.pathname.startsWith("/solutions");
    if (link.label === "Services") return location.pathname.startsWith("/services");
    return false;
  };

  return (
    <header
      className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}${
        mobileOpen ? ` ${styles.mobileOpen}` : ""
      }`}
    >
      <Link className={styles.brand} to="/" onClick={() => scrollToTop()}>
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
              className={`${styles.dropdown}${
                openMenu === link.label ? ` ${styles.dropdownOpen}` : ""
              }`}
              ref={(el) => {
                menuRefs.current[link.label] = el;
              }}
              onMouseEnter={() => setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className={isLinkActive(link) ? styles.activeLink : styles.link}
                aria-expanded={openMenu === link.label}
                aria-haspopup="true"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpenMenu((prev) => (prev === link.label ? null : link.label));
                }}
              >
                {link.label}
                <span className={styles.chevron} aria-hidden="true">
                  ▾
                </span>
              </button>
              <div
                className={`${styles.menu}${
                  openMenu === link.label ? ` ${styles.menuOpen}` : ""
                }`}
                role="menu"
              >
                {link.children.map((child) => (
                  <NavLink
                    key={child.href}
                    to={child.href}
                    end={child.href === "/solutions"}
                    role="menuitem"
                    className={({ isActive }) => {
                      const base = child.emphasis
                        ? styles.menuViewAll
                        : isActive
                          ? styles.menuActive
                          : styles.menuLink;
                      return child.emphasis && isActive
                        ? `${styles.menuViewAll} ${styles.menuViewAllActive}`
                        : base;
                    }}
                    onClick={() => {
                      setOpenMenu(null);
                      setMobileOpen(false);
                      scrollToTop();
                    }}
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
              onClick={() => {
                setMobileOpen(false);
                scrollToTop();
              }}
            >
              {link.label}
            </NavLink>
          )
        )}
      </nav>

      <Link
        className={`${styles.button} btnMotion`}
        to="/contact"
        onClick={() => scrollToTop()}
      >
        Book a Discovery Call
      </Link>
    </header>
  );
}
