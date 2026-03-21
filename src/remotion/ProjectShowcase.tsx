import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "./constants";

interface ProjectShowcaseProps {
  title: string;
  description: string;
  tags: string[];
}

export function ProjectShowcase({ title, description, tags }: ProjectShowcaseProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 15 } });
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [35, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {/* Gradient accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${colors.blue}, ${colors.purple}, ${colors.cyan})`,
          transform: `scaleX(${slideIn})`,
          transformOrigin: "left",
        }}
      />

      <div
        style={{
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          transform: `translateY(${interpolate(slideIn, [0, 1], [30, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            color: colors.text,
            opacity: titleOpacity,
            marginBottom: 16,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.6,
            opacity: descOpacity,
            maxWidth: 500,
            marginBottom: 24,
          }}
        >
          {description}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((tag, i) => {
            const tagSpring = spring({ frame: frame - 50 - i * 5, fps, config: { damping: 12 } });
            return (
              <div
                key={tag}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "rgba(124, 58, 237, 0.08)",
                  border: "1px solid rgba(124, 58, 237, 0.15)",
                  color: colors.purple,
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  opacity: tagSpring,
                  transform: `scale(${tagSpring})`,
                }}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
