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
import type { ComponentType } from "react";

interface IconProps {
  size?: number;
  className?: string;
  weight?: string;
}

export const techIcons: Record<string, ComponentType<IconProps>> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  React: SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  FastAPI: SiFastapi,
  NestJS: SiNestjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  AWS: FaAws,
  OpenAI: SiOpenai,
  "Claude API": SiOpenai,
  OpenCV: SiOpencv,
  YOLO: SiOpencv,
  TensorFlow: SiTensorflow,
  LangChain: SiLangchain,
  Redis: SiRedis,
  Linux: SiLinux,
  "GitHub Actions": SiGithubactions,
  Vercel: SiVercel,
};
