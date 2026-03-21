import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "./constants";

const rings = [
  { radius: 90, speed: 1, items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { radius: 150, speed: 0.7, items: ["Node.js", "Python", "NestJS", "FastAPI", "PostgreSQL"] },
  { radius: 210, speed: 0.4, items: ["OpenAI", "Docker", "AWS", "TensorFlow", "Git", "Claude"] },
];

function OrbitItem({
  label,
  angle,
  radius,
  centerX,
  centerY,
}: {
  label: string;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
}) {
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        padding: "6px 12px",
        borderRadius: 8,
        background: "rgba(255, 255, 255, 0.9)",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
        color: colors.text,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}

export function TechOrbit() {
  const frame = useCurrentFrame();
  const centerX = 300;
  const centerY = 300;

  const pulse = interpolate(frame % 60, [0, 30, 60], [0.9, 1.1, 0.9]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {/* Orbit rings */}
      {rings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: centerX - ring.radius,
            top: centerY - ring.radius,
            width: ring.radius * 2,
            height: ring.radius * 2,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        />
      ))}

      {/* Center orb */}
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: centerY,
          transform: `translate(-50%, -50%) scale(${pulse})`,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.blue}, ${colors.purple})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: "#ffffff",
          boxShadow: `0 0 40px ${colors.blue}30, 0 0 80px ${colors.purple}15`,
        }}
      >
        FS
      </div>

      {/* Orbiting items */}
      {rings.map((ring, ri) =>
        ring.items.map((item, ii) => {
          const baseAngle = (ii / ring.items.length) * Math.PI * 2;
          const angle = baseAngle + (frame / 600) * Math.PI * 2 * ring.speed;
          return (
            <OrbitItem
              key={`${ri}-${ii}`}
              label={item}
              angle={angle}
              radius={ring.radius}
              centerX={centerX}
              centerY={centerY}
            />
          );
        }),
      )}
    </AbsoluteFill>
  );
}
