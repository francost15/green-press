import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFER_BY_FAN = ["1", "1", "0", "1", "2"] as const;

function bindOffer(root: ParentNode): () => void {
  const band = root.querySelector<HTMLElement>("#servicios");
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-fan-card]"));
  if (!band || cards.length === 0) return () => {};

  const pick = (index: number) => {
    const offer = OFFER_BY_FAN[index] ?? "0";
    band.dataset.offer = offer;
    band.querySelectorAll(".offer-list li").forEach((item, i) => {
      item.classList.toggle("is-lead", String(i) === offer);
    });
  };

  const cleanups: Array<() => void> = [];
  cards.forEach((card, index) => {
    const onFocus = () => pick(index);
    card.addEventListener("pointerenter", onFocus);
    card.addEventListener("focusin", onFocus);
    cleanups.push(() => {
      card.removeEventListener("pointerenter", onFocus);
      card.removeEventListener("focusin", onFocus);
    });
  });

  return () => {
    for (const fn of cleanups) fn();
  };
}

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

  const releaseOffer = bindOffer(root);

  if (reducedMotion()) {
    panels[0]?.classList.add("is-open");
    return {
      kill() {
        releaseOffer();
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
              duration: 0.22,
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
              duration: 0.22,
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
            duration: 0.16,
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

  mm.add("(min-width: 960px)", () => {
    const fan = root.querySelector<HTMLElement>(".fan-arena");
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".fan-arena [data-fan-card]"));
    const figure = root.querySelector<HTMLElement>("[data-case-figure]");
    if (!fan || cards.length === 0) return;

    const rest = [
      { y: 18, rotation: -8 },
      { y: 6, rotation: -4 },
      { y: -4, rotation: 0 },
      { y: 6, rotation: 4 },
      { y: 18, rotation: 8 },
    ];
    const fanTween = gsap.timeline({
      scrollTrigger: {
        trigger: fan,
        start: "top 62%",
        end: "bottom 38%",
        scrub: 0.4,
        onLeave: () => gsap.set(cards, { clearProps: "transform" }),
        onLeaveBack: () => gsap.set(cards, { clearProps: "transform" }),
      },
    });
    cards.forEach((card, index) => {
      const from = rest[index] ?? { y: 0, rotation: 0 };
      const to =
        index === 0
          ? { y: -26, rotation: 0, scale: 1.06 }
          : { y: from.y + 16, rotation: from.rotation, scale: 0.94 };
      fanTween.fromTo(card, { ...from, scale: 1 }, { ...to, immediateRender: false, duration: 0.5 }, 0);
    });

    const figureTween = figure
      ? gsap.fromTo(
          figure,
          { scale: 0.9 },
          {
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
            immediateRender: false,
            transformOrigin: "left center",
            scrollTrigger: { trigger: figure, start: "top 88%", once: true },
          },
        )
      : null;

    return () => {
      fanTween.scrollTrigger?.kill();
      fanTween.kill();
      figureTween?.scrollTrigger?.kill();
      figureTween?.kill();
    };
  });

  return {
    kill() {
      releaseOffer();
      delete host.dataset.atelierReady;
      mm.revert();
    },
  };
}
