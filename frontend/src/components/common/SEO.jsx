import { useEffect } from "react";
import { site } from "../../content/siteContent";

export default function SEO({ title, description }) {
  const fullTitle = title || site.name;
  const desc = description || site.tagline;

  useEffect(() => {
    document.title = fullTitle;

    const ensureMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
        document.head.appendChild(el);
      }
      return el;
    };

    const descriptionEl = ensureMeta('meta[name="description"]', { name: "description" });
    descriptionEl.setAttribute("content", desc);

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: "og:title" });
    ogTitle.setAttribute("content", fullTitle);

    const ogDesc = ensureMeta('meta[property="og:description"]', { property: "og:description" });
    ogDesc.setAttribute("content", desc);
  }, [fullTitle, desc]);

  return null;
}
