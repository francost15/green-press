import { useEffect, useRef } from "react";

export function useScrollReveal(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add initial class to hide it and prepare for animation
    if (!element.classList.contains("reveal-hidden")) {
      element.classList.add("reveal-hidden");
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("reveal-visible");
        if (options.triggerOnce) {
          observer.unobserve(element);
        }
      } else if (!options.triggerOnce) {
        element.classList.remove("reveal-visible");
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return ref;
}
