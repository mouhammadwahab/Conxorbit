import { Navigate, Route, Routes } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuth";
import AdminLogin from "./AdminLogin";
import AdminSolutionsList from "./AdminSolutionsList";
import AdminSolutionForm from "./AdminSolutionForm";
import AdminCaseStudies from "./AdminCaseStudies";
import AdminTeam from "./AdminTeam";
import AdminOffers from "./AdminOffers";
import AdminPages from "./AdminPages";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./admin.module.css";

function Shell() {
  const { isAuthed, logout, email } = useAdminAuth();
  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <p className={styles.brand}>ConX Admin</p>
        <nav className={styles.nav}>
          <NavLink className={({ isActive }) => (isActive ? styles.navActive : undefined)} to="/admin/solutions">
            Solutions
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.navActive : undefined)}
            to="/admin/case-studies"
          >
            Case Studies
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.navActive : undefined)} to="/admin/team">
            Team
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.navActive : undefined)} to="/admin/offers">
            Offers
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.navActive : undefined)}
            to="/admin/pages/solutionsListing"
          >
            Pages
          </NavLink>
        </nav>
        <div className={styles.sideFoot}>
          <span>{email || "Admin"}</span>
          <button type="button" onClick={logout}>
            Log out
          </button>
          <Link to="/">View site</Link>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<Shell />}>
        <Route index element={<Navigate to="solutions" replace />} />
        <Route path="solutions" element={<AdminSolutionsList />} />
        <Route path="solutions/:id" element={<AdminSolutionForm />} />
        <Route path="case-studies" element={<AdminCaseStudies />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="offers" element={<AdminOffers />} />
        <Route path="pages" element={<Navigate to="solutionsListing" replace />} />
        <Route path="pages/:key" element={<AdminPages />} />
      </Route>
    </Routes>
  );
}

export default function AdminRoot() {
  return (
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  );
}
