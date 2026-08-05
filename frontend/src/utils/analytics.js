export function track(event, payload = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag && process.env.REACT_APP_GA_ID) {
    window.gtag("event", event, payload);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    // Hook for future analytics wiring
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload);
  }
}

export function initAnalytics() {
  const id = process.env.REACT_APP_GA_ID;
  if (!id || typeof document === "undefined") return;

  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
}
