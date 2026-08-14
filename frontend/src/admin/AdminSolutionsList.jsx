import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAdminAuth } from "./AdminAuth";
import styles from "./admin.module.css";

export default function AdminSolutionsList() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setItems(await api.admin.solutions.list(token));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this solution?")) return;
    await api.admin.solutions.remove(token, id);
    load();
  };

  return (
    <div>
      <div className={styles.row}>
        <h1>Solutions</h1>
        <Link className={styles.btn} to="/admin/solutions/new">
          Add solution
        </Link>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Portfolio</th>
            <th>Trades</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.portfolioCategory}</td>
              <td>{(item.trades || []).join(", ")}</td>
              <td className={styles.row}>
                <Link className={`${styles.btn} ${styles.btnSecondary}`} to={`/admin/solutions/${item._id}`}>
                  Edit
                </Link>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
