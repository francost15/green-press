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
    .flatMap((entry) => {
      const enLoc = `${SITE}${localePath("en", entry.en)}`;
      const esLoc = `${SITE}${localePath("es", entry.es)}`;
      return enLoc === esLoc
        ? [{ loc: esLoc, entry, home: true }]
        : [
            { loc: enLoc, entry, home: false },
            { loc: esLoc, entry, home: false },
          ];
    })
    .map(({ loc, entry, home }) => {
      const enHref = `${SITE}${localePath("en", entry.en)}`;
      const esHref = `${SITE}${localePath("es", entry.es)}`;
      const alternates = home
        ? `    <xhtml:link rel="alternate" hreflang="es" href="${esHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esHref}" />`
        : `    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="es" href="${esHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esHref}" />`;
      return `  <url>
    <loc>${loc}</loc>
${alternates}
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
