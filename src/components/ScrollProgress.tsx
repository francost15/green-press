import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
