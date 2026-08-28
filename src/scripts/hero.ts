import { gsap } from "gsap";

export type HeroMotionHandle = { kill: () => void };

const idle: HeroMotionHandle = { kill() {} };

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Line-lift entrance for `#inicio`. Words stay whole so tracking and kerning hold. */
export function initHero(root: ParentNode = document): HeroMotionHandle {
  const hero = root.querySelector<HTMLElement>("#inicio");
  if (!hero || hero.dataset.heroReady === "1") return idle;
  hero.dataset.heroReady = "1";

  if (reducedMotion()) return idle;

  const names = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-name]"));
  const lines = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-line]"));
  const facts = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-fact]"));
  const movers = [...names, ...lines, ...facts];
  if (movers.length === 0) return idle;

  hero.dataset.heroMotion = "gsap";

  gsap.set(movers, { willChange: "transform", yPercent: 110 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      gsap.set(movers, { willChange: "auto", yPercent: 0 });
      hero.querySelectorAll<HTMLElement>(".mask").forEach((mask) => {
        mask.style.overflow = "visible";
      });
    },
  });

  tl.to(names, { yPercent: 0, duration: 0.82, stagger: 0.09 })
    .to(lines, { yPercent: 0, duration: 0.68, stagger: 0.08 }, "-=0.52")
    .to(facts, { yPercent: 0, duration: 0.52, stagger: 0.05 }, "-=0.5");

  return {
    kill() {
      tl.kill();
      gsap.killTweensOf(movers);
    },
  };
}
