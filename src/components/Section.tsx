import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`px-6 py-28 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1200px]">
        {title && (
          <div
            className={`mb-16 transition-all duration-500 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <h2 className="mb-4 font-[family-name:var(--color-font-display)] text-5xl font-black tracking-tighter text-text-primary md:text-7xl lg:text-8xl">
              {title}
            </h2>
            {subtitle && (
              <p className="max-w-2xl text-lg font-light leading-relaxed tracking-wide text-text-secondary md:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          className={`transition-all duration-500 delay-100 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
