import {
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiOpenai,
  SiOpencv,
  SiTensorflow,
  SiLangchain,
  SiRedis,
  SiLinux,
  SiGithubactions,
  SiVercel,
  FaAws,
} from "../components/TechSvgIcons";
import { createElement } from "react";
import type { ComponentType } from "react";
import type { IconProps, TechIconVariant } from "../components/TechSvgIcons";

interface TechIconDefinition {
  icon: ComponentType<IconProps>;
  brandSafe?: boolean;
}

export const techIcons: Record<string, TechIconDefinition> = {
  Python: { icon: SiPython, brandSafe: true },
  TypeScript: { icon: SiTypescript, brandSafe: true },
  React: { icon: SiReact, brandSafe: true },
  "React Native": { icon: SiReact, brandSafe: true },
  "Next.js": { icon: SiNextdotjs, brandSafe: true },
  FastAPI: { icon: SiFastapi, brandSafe: true },
  NestJS: { icon: SiNestjs, brandSafe: true },
  "Node.js": { icon: SiNodedotjs, brandSafe: true },
  PostgreSQL: { icon: SiPostgresql, brandSafe: true },
  Docker: { icon: SiDocker, brandSafe: true },
  AWS: { icon: FaAws, brandSafe: true },
  OpenAI: { icon: SiOpenai, brandSafe: true },
  "Claude API": { icon: SiOpenai, brandSafe: true },
  OpenCV: { icon: SiOpencv, brandSafe: true },
  YOLO: { icon: SiOpencv },
  TensorFlow: { icon: SiTensorflow, brandSafe: true },
  LangChain: { icon: SiLangchain, brandSafe: true },
  Redis: { icon: SiRedis, brandSafe: true },
  Linux: { icon: SiLinux, brandSafe: true },
  "GitHub Actions": { icon: SiGithubactions, brandSafe: true },
  Vercel: { icon: SiVercel, brandSafe: true },
};

export function TechIcon({
  name,
  variant = "mono",
  ...props
}: IconProps & { name: string; variant?: TechIconVariant }) {
  const iconDef = techIcons[name];
  if (!iconDef) return null;

  const Icon = iconDef.icon;
  const resolvedVariant = variant === "brand" && iconDef.brandSafe ? "brand" : "mono";

  return createElement(Icon, { ...props, title: name, variant: resolvedVariant });
}
