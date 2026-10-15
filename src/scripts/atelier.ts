import { gsap } from "gsap";

export type AtelierHandle = { kill: () => void };

const idle: AtelierHandle = { kill() {} };

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Interactive studio choreography: fanned deck hover physics, floating glass chips, and bento card focus. */
export function initAtelier(root: ParentNode = document): AtelierHandle {
  const host = root instanceof Document ? root.documentElement : document.documentElement;
  if (host.dataset.atelierReady === "1") return idle;
  host.dataset.atelierReady = "1";

  const index = root.querySelector<HTMLElement>("[data-project-index]");
  const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
  const fanCards = Array.from(root.querySelectorAll<HTMLElement>("[data-fan-card]"));

  if (reducedMotion()) {
    panels[0]?.classList.add("is-open");
    return {
      kill() {
        delete host.dataset.atelierReady;
      },
    };
  }

  const mm = gsap.matchMedia();

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

  mm.add("(min-width: 960px)", () => {
    if (fanCards.length === 0) return;

    const cleanups: Array<() => void> = [];

    fanCards.forEach((card, activeIdx) => {
      const onEnter = () => {
        fanCards.forEach((sibling, idx) => {
          const offset = idx - activeIdx;
          if (idx === activeIdx) {
            gsap.to(sibling, {
              y: -18,
              rotation: 0,
              scale: 1.05,
              duration: 0.34,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else {
            const baseAngle = (idx - 2) * 4;
            const spread = offset < 0 ? -10 : 10;
            gsap.to(sibling, {
              x: spread,
              y: Math.abs( idx - 2 ) * 6 + 4,
              rotation: baseAngle + (offset < 0 ? -1.5 : 1.5),
              scale: 0.98,
              duration: 0.34,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        });
      };

      const onLeave = () => {
        fanCards.forEach((sibling, idx) => {
          const baseAngle = (idx - 2) * 4;
          const baseY = idx === 2 ? -4 : Math.abs(idx - 2) === 1 ? 6 : 18;
          gsap.to(sibling, {
            x: 0,
            y: baseY,
            rotation: baseAngle,
            scale: 1,
            duration: 0.42,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("focusin", onEnter);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("focusout", onLeave);

      cleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("focusin", onEnter);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("focusout", onLeave);
      });
    });

    return () => {
      for (const fn of cleanups) fn();
    };
  });

  return {
    kill() {
      delete host.dataset.atelierReady;
      mm.revert();
    },
  };
}
