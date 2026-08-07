import { useEffect, useRef, useState } from "react";

function isNearViewport(node) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/**
 * Adds visibility when the element enters the viewport (transform/opacity only).
 * @param {{ eager?: boolean }} [options]
 */
export default function useInView(options = {}) {
  const { eager = false } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    if (eager || isNearViewport(node)) {
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
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);

    // Route enter / layout race: re-check after paint
    const frame = requestAnimationFrame(() => {
      if (isNearViewport(node)) {
        setVisible(true);
        observer.disconnect();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [eager]);

  return [ref, visible];
}
