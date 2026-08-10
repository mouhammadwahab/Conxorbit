import { useEffect, useRef, useState } from "react";

/**
 * Adds visibility when the element enters the viewport (transform/opacity only).
 * @param {{ eager?: boolean }} [options] eager = true for first-viewport heroes only
 */
export default function useInView(options = {}) {
  const { eager = false } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || eager || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [eager]);

  return [ref, visible];
}
