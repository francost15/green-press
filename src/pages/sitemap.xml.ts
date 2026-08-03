import type { APIRoute } from "astro";
import { projects } from "../data/projects";
import { SITE, localePath } from "../i18n";

/**
 * Generated at build time rather than hand-maintained in public/, so new routes and the
 * lastmod date cannot drift out of sync with the site.
 */
interface Entry {
  /** Path below the locale root; "" is the locale home page. */
  en: string;
  es: string;
  priority: string;
}

const entries: Entry[] = [
  { en: "", es: "", priority: "1.0" },
  ...projects.map((project) => ({
    en: `projects/${project.slug}/`,
    es: `proyectos/${project.slug}/`,
    priority: "0.8",
  })),
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = entries
    .flatMap((entry) => [
      { loc: `${SITE}${localePath("en", entry.en)}`, entry },
      { loc: `${SITE}${localePath("es", entry.es)}`, entry },
    ])
    .map(({ loc, entry }) => {
      const enHref = `${SITE}${localePath("en", entry.en)}`;
      const esHref = `${SITE}${localePath("es", entry.es)}`;
      return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="es" href="${esHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}" />
    <lastmod>${lastmod}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
