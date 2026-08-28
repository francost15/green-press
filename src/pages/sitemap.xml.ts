import type { APIRoute } from "astro";
import { projects } from "../data/projects";
import { SITE, localePath } from "../i18n";

interface Entry {
  en: string;
  es: string;
  priority: string;
  lastmod: string;
}

const siteUpdated = projects.reduce(
  (max, project) => (project.updated > max ? project.updated : max),
  "2026-08-27",
);

const entries: Entry[] = [
  { en: "", es: "", priority: "1.0", lastmod: siteUpdated },
  { en: "privacy/", es: "privacidad/", priority: "0.3", lastmod: "2026-08-27" },
  ...projects.map((project) => ({
    en: `projects/${project.slug}/`,
    es: `proyectos/${project.slug}/`,
    priority: "0.8",
    lastmod: project.updated,
  })),
];

export const GET: APIRoute = () => {
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
    <lastmod>${entry.lastmod}</lastmod>
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
