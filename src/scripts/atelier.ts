import { gsap } from "gsap";

export type AtelierHandle = { kill: () => void };

const idle: AtelierHandle = { kill() {} };

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Hover accordion and polaroid tilt for the workshop notebook. */
export function initAtelier(root: ParentNode = document): AtelierHandle {
  const host = root instanceof Document ? root.documentElement : document.documentElement;
  if (host.dataset.atelierReady === "1") return idle;
  host.dataset.atelierReady = "1";

  const index = root.querySelector<HTMLElement>("[data-project-index]");
  const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
  const polaroids = Array.from(root.querySelectorAll<HTMLElement>("[data-polaroid]"));
  const annos = Array.from(root.querySelectorAll<HTMLElement>("[data-anno]"));

  if (reducedMotion()) {
    panels[0]?.classList.add("is-open");
    return {
      kill() {
        delete host.dataset.atelierReady;
      },
    };
  }

  const mm = gsap.matchMedia();
  const tweens: gsap.core.Tween[] = [];

  mm.add("(min-width: 900px)", () => {
    if (!index || panels.length === 0) return;

    const open = (target: HTMLElement) => {
      for (const panel of panels) {
        panel.classList.toggle("is-open", panel === target);
      }
    };

    open(panels[0]);

    const onEnter = (event: Event) => {
      const panel = (event.currentTarget as HTMLElement) ?? null;
      if (panel) open(panel);
    };

    for (const panel of panels) {
      panel.addEventListener("pointerenter", onEnter);
      panel.addEventListener("focusin", onEnter);
    }

    return () => {
      for (const panel of panels) {
        panel.removeEventListener("pointerenter", onEnter);
        panel.removeEventListener("focusin", onEnter);
      }
    };
  });

  if (polaroids.length > 0) {
    tweens.push(
      gsap.to(polaroids, {
        y: 8,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.35, from: "random" },
      }),
    );
  }

  if (annos.length > 0) {
    tweens.push(
      gsap.to(annos, {
        y: -6,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.18,
      }),
    );
  }

  return {
    kill() {
      delete host.dataset.atelierReady;
      mm.revert();
      for (const tween of tweens) tween.kill();
    },
  };
}
