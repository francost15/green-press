const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Section scroll spy and the mobile disclosure menu. */
export function initNavbar(doc: Document = document) {
  const menu = doc.querySelector<HTMLElement>("[data-mobile-menu]");
  const menuButton = doc.querySelector<HTMLButtonElement>("[data-menu-button]");
  const iconOpen = menuButton?.querySelector<HTMLElement>("[data-icon-open]");
  const iconClose = menuButton?.querySelector<HTMLElement>("[data-icon-close]");

  /* ── Scroll spy ──
     `aria-current="page"` is announced to assistive tech, so a stale marker is a
     wrong announcement, not just a wrong underline. Track which observed sections
     are actually on screen, mark the topmost, and clear the mark when none are —
     the previous version left the last match set forever. */
  const navLinks = Array.from(doc.querySelectorAll<HTMLAnchorElement>(".nav-link"));
  const hashes = new Set(
    navLinks
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => !!href && href.startsWith("#")),
  );

  if (typeof IntersectionObserver !== "undefined") {
    const visible = new Set<string>();
    const order: string[] = [];

    const mark = () => {
      const active = order.find((hash) => visible.has(hash));
      for (const link of navLinks) {
        if (active && link.getAttribute("href") === active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    };

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const hash = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(hash);
          else visible.delete(hash);
        }
        mark();
      },
      // Discount the fixed masthead at the top and the tail of the viewport, so
      // the marked section is the one actually being read.
      { rootMargin: "-80px 0px -55% 0px" },
    );

    for (const hash of hashes) {
      const section = doc.getElementById(hash.slice(1));
      if (section) {
        order.push(hash);
        spy.observe(section);
      }
    }
  }

  /* ── Mobile menu ──
     A disclosure, not a dialog: it does not cover the page and the rest of the
     document stays reachable, so claiming `aria-modal` would tell a screen
     reader the page is hidden when it is not. */
  const setMenu = (open: boolean, moveFocus = false) => {
    if (!menu || !menuButton) return;
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    const label = menuButton.dataset[open ? "labelClose" : "labelOpen"];
    if (label) menuButton.setAttribute("aria-label", label);
    if (iconOpen) iconOpen.hidden = open;
    if (iconClose) iconClose.hidden = !open;
    if (open && moveFocus) menu.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  };

  menuButton?.addEventListener("click", () => setMenu(menu?.hidden ?? true, true));

  for (const link of menu?.querySelectorAll("a") ?? []) {
    link.addEventListener("click", () => setMenu(false));
  }

  // Escape closes from anywhere in the disclosure, including the button that
  // opened it — the previous version bound it to the menu only, so Escape did
  // nothing while focus was still on the toggle.
  const onEscape = (e: KeyboardEvent) => {
    if (e.key !== "Escape" || menu?.hidden !== false) return;
    setMenu(false);
    menuButton?.focus();
  };

  menuButton?.addEventListener("keydown", onEscape);
  menu?.addEventListener("keydown", onEscape);

  /* ── Keep the reader on the same section when switching language ──
     Without this a bilingual reader switching locale from #contacto lands at the
     top of the other locale instead of on the section they were reading. */
  for (const link of doc.querySelectorAll<HTMLAnchorElement>("[data-lang-switch]")) {
    link.addEventListener("click", () => {
      if (location.hash) link.href = link.pathname + location.hash;
    });
  }
}
