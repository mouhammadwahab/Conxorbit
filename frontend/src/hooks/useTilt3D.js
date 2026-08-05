import { useCallback, useRef } from "react";

/**
 * Pointer-follow 3D tilt. Caches layout rect on enter so transform
 * feedback does not fight getBoundingClientRect (avoids shake).
 */
export default function useTilt3D({ max = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const frameRef = useRef(0);

  const clearFrame = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  };

  const onEnter = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    // Measure before any tilt so later moves stay stable
    rectRef.current = node.getBoundingClientRect();
    node.style.transition = "none";
  }, []);

  const onMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node || !rectRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = rectRef.current;
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = Math.max(-max, Math.min(max, (x - 0.5) * max * 2));
      const rotateX = Math.max(-max, Math.min(max, (0.5 - y) * max * 2));

      clearFrame();
      frameRef.current = requestAnimationFrame(() => {
        node.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      });
    },
    [max, scale]
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    clearFrame();
    rectRef.current = null;
    if (!node) return;
    node.style.transition = "transform 220ms ease-out, box-shadow 220ms ease";
    node.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return { ref, onEnter, onMove, onLeave };
}
