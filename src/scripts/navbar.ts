const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Sticky-bar reveal, section scroll spy, and the mobile menu with its focus trap. */
export function initNavbar(doc: Document = document) {
  const nav = doc.querySelector<HTMLElement>(".site-nav");
  const menu = doc.querySelector<HTMLElement>("[data-mobile-menu]");
  const menuButton = doc.querySelector<HTMLButtonElement>("[data-menu-button]");
  const iconOpen = menuButton?.querySelector<HTMLElement>("[data-icon-open]");
  const iconClose = menuButton?.querySelector<HTMLElement>("[data-icon-close]");

  /* ── Sticky bar ── */
  if (nav) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle("is-scrolled", window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll spy ── */
  const navLinks = Array.from(doc.querySelectorAll<HTMLAnchorElement>(".nav-link"));
  const hashes = new Set(
    navLinks
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => !!href && href.startsWith("#")),
  );

  if (typeof IntersectionObserver !== "undefined") {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const active = `#${entry.target.id}`;
          for (const link of navLinks) {
            if (link.getAttribute("href") === active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const hash of hashes) {
      const section = doc.getElementById(hash.slice(1));
      if (section) spy.observe(section);
    }
  }

  /* ── Mobile menu ── */
  const setMenu = (open: boolean) => {
    if (!menu || !menuButton) return;
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    const label = menuButton.dataset[open ? "labelClose" : "labelOpen"];
    if (label) menuButton.setAttribute("aria-label", label);
    if (iconOpen) iconOpen.hidden = open;
    if (iconClose) iconClose.hidden = !open;
  };

  menuButton?.addEventListener("click", () => setMenu(menu?.hidden ?? true));

  for (const link of menu?.querySelectorAll("a") ?? []) {
    link.addEventListener("click", () => setMenu(false));
  }

  menu?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenu(false);
      menuButton?.focus();
      return;
    }
    if (e.key !== "Tab") return;

    const focusable = menu.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && doc.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && doc.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ── Keep the reader on the same section when switching language ── */
  for (const link of doc.querySelectorAll<HTMLAnchorElement>("[data-lang-switch]")) {
    link.addEventListener("click", () => {
      if (location.hash) link.href = link.pathname + location.hash;
    });
  }
}
