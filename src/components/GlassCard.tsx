import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-card-border bg-bg-alt shadow-sm ${
        hover ? "transition-all duration-300 hover:border-accent-purple/20 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
