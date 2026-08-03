export const languages = ["en", "es"] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = "en";

/**
 * Canonical origin. Must match the Vercel *primary* domain, because every canonical,
 * hreflang, sitemap URL and JSON-LD @id is derived from it.
 *
 * Currently `www`: the apex 308-redirects there, so declaring the apex would point all of
 * those at a redirect. To move to the bare apex instead, change this line *and* flip the
 * primary domain in Vercel → Project → Domains — both, or the mismatch comes back.
 */
export const SITE = "https://www.fsanchezt.com";

/**
 * Translator. The argument order is (spanish, english) — it mirrors the copy as
 * it was authored, so markup ported from the old React components reads the same.
 */
export function useTranslations(lang: Lang) {
  return function t(es: string, en: string): string {
    return lang === "es" ? es : en;
  };
}

/** Path to a page in the given language. English is the unprefixed default. */
export function localePath(lang: Lang, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  const prefix = lang === defaultLang ? "/" : `/${lang}/`;
  return `${prefix}${clean}`;
}

/** The other language, for the toggle link. */
export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}
