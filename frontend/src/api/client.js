const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export function mediaUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  if (path.startsWith("/static/") || path.startsWith("static/")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalized}`;
}

async function request(path, { method = "GET", body, token, formData } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  let payload = body;
  if (formData) {
    payload = formData;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }
  const res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }
  if (!res.ok) {
    const err = new Error(data?.message || res.statusText || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  getSolutions: (query = "") => request(`/api/solutions${query}`),
  getSolution: (slug) => request(`/api/solutions/${encodeURIComponent(slug)}`),
  getCaseStudies: () => request("/api/case-studies"),
  getCaseStudy: (slug) => request(`/api/case-studies/${encodeURIComponent(slug)}`),
  getTeam: () => request("/api/team"),
  getPageContent: (key) => request(`/api/page-content/${encodeURIComponent(key)}`),
  login: (email, password) => request("/api/auth/login", { method: "POST", body: { email, password } }),
  admin: {
    solutions: {
      list: (token) => request("/api/admin/solutions", { token }),
      create: (token, body) => request("/api/admin/solutions", { method: "POST", token, body }),
      update: (token, id, body) =>
        request(`/api/admin/solutions/${id}`, { method: "PUT", token, body }),
      remove: (token, id) => request(`/api/admin/solutions/${id}`, { method: "DELETE", token }),
    },
    caseStudies: {
      list: (token) => request("/api/admin/case-studies", { token }),
      create: (token, body) => request("/api/admin/case-studies", { method: "POST", token, body }),
      update: (token, id, body) =>
        request(`/api/admin/case-studies/${id}`, { method: "PUT", token, body }),
      remove: (token, id) =>
        request(`/api/admin/case-studies/${id}`, { method: "DELETE", token }),
    },
    team: {
      list: (token) => request("/api/admin/team", { token }),
      create: (token, body) => request("/api/admin/team", { method: "POST", token, body }),
      update: (token, id, body) => request(`/api/admin/team/${id}`, { method: "PUT", token, body }),
      remove: (token, id) => request(`/api/admin/team/${id}`, { method: "DELETE", token }),
    },
    pageContent: {
      get: (token, key) =>
        request(`/api/admin/page-content/${encodeURIComponent(key)}`, { token }),
      put: (token, key, body) =>
        request(`/api/admin/page-content/${encodeURIComponent(key)}`, {
          method: "PUT",
          token,
          body,
        }),
    },
    upload: async (token, file) => {
      const formData = new FormData();
      formData.append("file", file);
      return request("/api/admin/upload", { method: "POST", token, formData });
    },
  },
};

export { API_URL };
