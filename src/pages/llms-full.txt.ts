import type { APIRoute } from "astro";
import { competencies } from "../data/competencies";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { SITE } from "../i18n";
import { formatPeriod } from "../lib/dates";

export const GET: APIRoute = () => {
  const projectBlocks = projects
    .map((project) => {
      return `### ${project.title.en}
- ES: ${SITE}/es/proyectos/${project.slug}/
- EN: ${SITE}/projects/${project.slug}/
- Client: ${project.client.en}
- Period: ${formatPeriod(project.period, "en")}
- Role: ${project.role.en}
- Impact: ${project.impact.en}
- Measurement: ${project.measurement.en}
- FAQ: ${project.faq.q.en} ${project.faq.a.en}

${project.body.en}

---

### ${project.title.es}
- Cliente: ${project.client.es}
- Periodo: ${formatPeriod(project.period, "es")}
- Rol: ${project.role.es}
- Impacto: ${project.impact.es}
- Medición: ${project.measurement.es}

${project.body.es}
`;
    })
    .join("\n");

  const exp = experience
    .map(
      (item) =>
        `- ${item.company} / ${item.role.en} / ${formatPeriod(item.period, "en")}: ${item.description.en}`,
    )
    .join("\n");

  const edu = education
    .map(
      (item) =>
        `- ${item.degree.en} / ${item.institution} / ${formatPeriod(item.period, "en")}`,
    )
    .join("\n");

  const comps = competencies
    .map((item) => `- ${item.title.en} (${item.techs.join(", ")}): ${item.description.en}`)
    .join("\n");

  const body = `# Franco Sanchez - full corpus

Canonical site: ${SITE}
Mailbox: ${profile.email} (${profile.emailDomainNote.en})
Legal name: ${profile.legalName}
Title: ${profile.title.en}

## Bio (en)

${profile.bio.en}

## Bio (es)

${profile.bio.es}

## Competencies

${comps}

## Experience

${exp}

## Education

${edu}

## Projects

${projectBlocks}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
