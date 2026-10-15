import { gsap } from "gsap";

export type HeroMotionHandle = { kill: () => void };

const idle: HeroMotionHandle = { kill() {} };

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Choreographed studio entrance for `#inicio`: line-lift, connector trace, and fanned deck reveal. */
export function initHero(root: ParentNode = document): HeroMotionHandle {
  const hero = root.querySelector<HTMLElement>("#inicio");
  if (!hero || hero.dataset.heroReady === "1") return idle;
  hero.dataset.heroReady = "1";

  if (reducedMotion()) return idle;

  const names = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-name]"));
  const lines = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-line]"));
  const facts = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-fact]"));
  const fanCards = Array.from(hero.querySelectorAll<HTMLElement>("[data-fan-card]"));
  const chips = Array.from(hero.querySelectorAll<HTMLElement>("[data-anno]"));
  const movers = [...names, ...lines, ...facts];
  if (movers.length === 0) return idle;

  hero.dataset.heroMotion = "gsap";

  gsap.set(movers, { willChange: "transform", yPercent: 110 });
  if (fanCards.length > 0) {
    gsap.set(fanCards, { willChange: "transform", y: 36, scale: 0.94 });
  }
  if (chips.length > 0) {
    gsap.set(chips, { willChange: "transform", y: 14, scale: 0.95 });
  }

  const box = hero.querySelector<SVGGeometryElement>("[data-name-box]");
  if (box) {
    gsap.set(box, { strokeDasharray: 100, strokeDashoffset: 100 });
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      gsap.set(movers, { willChange: "auto", yPercent: 0 });
      if (fanCards.length > 0) {
        gsap.set(fanCards, { clearProps: "willChange,y,scale" });
      }
      if (chips.length > 0) {
        gsap.set(chips, { clearProps: "willChange,y,scale" });
      }
      hero.querySelectorAll<HTMLElement>(".mask").forEach((mask) => {
        mask.style.overflow = "visible";
      });
    },
  });

  if (box) {
    tl.to(box, { strokeDashoffset: 0, duration: 1.05, ease: "power2.out" }, 0.15);
  }

  if (names.length > 0) {
    tl.to(names, { yPercent: 0, duration: 0.78, stagger: 0.08 }, 0.04).to(
      lines,
      { yPercent: 0, duration: 0.65, stagger: 0.07 },
      "-=0.52",
    );
  } else {
    tl.to(lines, { yPercent: 0, duration: 0.68, stagger: 0.07 }, 0.04);
  }

  const verbLoop = startVerbCycle(hero);

  tl.to(
      fanCards,
      {
        y: 0,
        scale: 1,
        duration: 0.72,
        stagger: { each: 0.06, from: "center" },
        ease: "back.out(1.35)",
      },
      "-=0.45",
    );

  if (chips.length > 0) {
    tl.to(
      chips,
      {
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      },
      "-=0.55",
    );
  }

  if (facts.length > 0) {
    tl.to(facts, { yPercent: 0, duration: 0.48, stagger: 0.05 }, "-=0.48");
  }

  return {
    kill() {
      tl.kill();
      verbLoop.kill();
      gsap.killTweensOf([...movers, ...fanCards, ...chips]);
    },
  };
}

/** Notion-style verb slot: one word visible, the next slides up as the window resizes. */
function startVerbCycle(hero: HTMLElement): { kill: () => void } {
  const slot = hero.querySelector<HTMLElement>("[data-verb-slot]");
  const track = hero.querySelector<HTMLElement>("[data-verb-track]");
  const words = track ? Array.from(track.querySelectorAll<HTMLElement>("[data-verb]")) : [];
  if (!slot || !track || words.length < 2) return { kill() {} };

  let index = 0;
  const measure = () => {
    const box = words[0].getBoundingClientRect();
    const current = words[index] ?? words[0];
    const height = Math.floor(box.height);
    const width = Math.ceil(current.getBoundingClientRect().width);
    if (height < 1 || width < 1) return height;
    gsap.set(slot, { height, width });
    gsap.set(track, { y: -index * height });
    return height;
  };

  let height = measure();
  let tween: gsap.core.Timeline | null = null;

  const step = () => {
    const next = (index + 1) % words.length;
    tween = gsap.timeline({
      defaults: { duration: 0.62, ease: "power3.inOut" },
      onComplete: () => {
        index = next;
      },
    });
    tween
      .to(track, { y: -next * height }, 0)
      .to(slot, { width: Math.ceil(words[next].getBoundingClientRect().width) }, 0);
  };

  const timer = window.setInterval(step, 2400);
  const onResize = () => {
    height = measure();
    index = 0;
  };
  window.addEventListener("resize", onResize);

  return {
    kill() {
      window.clearInterval(timer);
      window.removeEventListener("resize", onResize);
      tween?.kill();
    },
  };
}
