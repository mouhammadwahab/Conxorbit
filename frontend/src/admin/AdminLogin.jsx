import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

export default function AdminLogin() {
  const { isAuthed, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@conxorbit.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthed) return <Navigate to="/admin/solutions" replace />;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.login(email, password);
      login(data.token, data.email);
      navigate("/admin/solutions");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={onSubmit}>
        <h1>Admin login</h1>
        <p className={styles.muted}>Manage solutions, case studies, and team.</p>
        <label className={styles.field}>
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label className={styles.field}>
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>
        {error ? <p className={styles.error}>{error}</p> : null}
        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
