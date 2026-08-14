import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "conx-admin-token";
const EMAIL_KEY = "conx-admin-email";
const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });
  const [email, setEmail] = useState(() => {
    try {
      return sessionStorage.getItem(EMAIL_KEY) || "";
    } catch {
      return "";
    }
  });

  const login = useCallback((nextToken, nextEmail) => {
    setToken(nextToken);
    setEmail(nextEmail || "");
    try {
      sessionStorage.setItem(STORAGE_KEY, nextToken);
      sessionStorage.setItem(EMAIL_KEY, nextEmail || "");
    } catch {
      /* ignore */
    }
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setEmail("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(EMAIL_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ token, email, isAuthed: Boolean(token), login, logout }),
    [token, email, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth requires AdminAuthProvider");
  return ctx;
}
