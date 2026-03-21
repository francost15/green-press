import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "./constants";

interface StatsCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export function StatsCounter({ target, label, suffix = "" }: StatsCounterProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const currentValue = Math.round(countProgress * target);

  const bounceScale = spring({ frame: frame - 55, fps, config: { damping: 8, stiffness: 200 } });
  const scale = frame > 55 ? 0.95 + bounceScale * 0.05 : 1;

  const labelOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          fontFamily: "'Inter', sans-serif",
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scale(${scale})`,
        }}
      >
        {currentValue}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 16,
          color: colors.textSecondary,
          fontFamily: "'Inter', sans-serif",
          marginTop: 8,
          opacity: labelOpacity,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
}
