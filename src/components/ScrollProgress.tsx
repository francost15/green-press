import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress fixed top-0 right-0 left-0 z-[100] h-[3px] origin-left bg-accent"
      style={{
        transform: `scaleX(${scroll / 100})`,
        boxShadow:
          scroll > 1
            ? "0 0 12px 2px color-mix(in srgb, var(--color-accent) 40%, transparent)"
            : "none",
        transition: "transform 100ms ease-out",
      }}
      aria-hidden="true"
    />
  );
}
