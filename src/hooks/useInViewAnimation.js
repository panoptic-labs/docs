import { useEffect, useRef, useState } from "react";

/**
 * Pauses CSS animations when the element is off-screen.
 * Returns a ref to attach to the container and a boolean `inView`.
 */
export default function useInViewAnimation() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
