import { AbsoluteFill, useCurrentFrame, interpolateColors, interpolate } from "remotion";
import { colors } from "./constants";

function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  const frame = useCurrentFrame();
  const adjustedFrame = (frame + delay) % 300;
  const y = interpolate(adjustedFrame, [0, 300], [110, -10]);
  const opacity = interpolate(adjustedFrame, [0, 30, 270, 300], [0, 0.35, 0.35, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${colors.blue}, ${colors.purple})`,
        opacity,
        filter: "blur(1px)",
      }}
    />
  );
}

const codeSnippets = ["async function", "AI.predict()", "<Component />", "await fetch()", "const model =", "export default", "return data;", "import { Brain }"];

function FloatingCode({ text, delay, x, y: baseY }: { text: string; delay: number; x: number; y: number }) {
  const frame = useCurrentFrame();
  const adjustedFrame = (frame + delay) % 300;
  const y = baseY + interpolate(adjustedFrame, [0, 150, 300], [0, -8, 0]);
  const opacity = interpolate(adjustedFrame, [0, 50, 250, 300], [0, 0.08, 0.08, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        color: colors.purple,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
}

const particles = Array.from({ length: 60 }, (_, i) => ({
  delay: Math.floor((i / 60) * 300),
  x: (i * 17 + 7) % 100,
  size: 3 + (i % 5),
}));

const codeElements = codeSnippets.map((text, i) => ({
  text,
  delay: i * 37,
  x: 5 + (i * 12) % 85,
  y: 10 + (i * 11) % 75,
}));

export function HeroComposition() {
  const frame = useCurrentFrame();
  const progress = frame / 300;

  const bg1 = interpolateColors(frame, [0, 100, 200, 300], [colors.bg, "#eef2ff", "#ecfeff", colors.bg]);
  const bg2 = interpolateColors(frame, [0, 100, 200, 300], [colors.purple, colors.blue, colors.cyan, colors.purple]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${30 + Math.sin(progress * Math.PI * 2) * 20}% ${40 + Math.cos(progress * Math.PI * 2) * 15}%, ${bg2}18, transparent 60%), radial-gradient(ellipse at ${70 - Math.sin(progress * Math.PI * 2) * 15}% ${60 + Math.cos(progress * Math.PI * 2) * 20}%, ${colors.cyan}12, transparent 50%), ${bg1}`,
        }}
      />
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
      {codeElements.map((c, i) => (
        <FloatingCode key={i} {...c} />
      ))}
    </AbsoluteFill>
  );
}
