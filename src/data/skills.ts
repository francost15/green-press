import {
  SiPython,
  SiFastapi,
  SiNestjs,
  SiNodedotjs,
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiExpo,
  SiTailwindcss,
  SiFramer,
  SiTensorflow,
  SiLangchain,
} from "react-icons/si";
import { type IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
}

export const skills: Skill[] = [
  { name: "Python", icon: SiPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "FastAPI", icon: SiFastapi },
  { name: "NestJS", icon: SiNestjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Laravel", icon: SiLaravel },
  { name: "React Native", icon: SiExpo },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "LangChain", icon: SiLangchain },
  { name: "Framer Motion", icon: SiFramer },
];
