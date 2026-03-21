import { useEffect, useRef, useCallback } from "react";
import type { PlayerRef } from "@remotion/player";

export function useRemotionAutoplay() {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (!playerRef.current) return;
    if (entry?.isIntersecting) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return { playerRef, containerRef };
}
