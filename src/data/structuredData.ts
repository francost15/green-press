import { education } from "./education";
import { profile } from "./profile";
import { projects } from "./projects";
import { SITE, type Lang } from "../i18n";
import { periodPublished } from "../lib/iso";

export function workId(slug: string): string {
  return `${SITE}/#work-${slug}`;
}

const EMPLOYER_ID = `${SITE}/#employer`;

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Franco Sanchez",
    inLanguage: ["en", "es"],
    publisher: { "@id": `${SITE}/#person` },
  };
}

export function profilePageSchema(lang: Lang) {
  const url = lang === "es" ? `${SITE}/es/` : `${SITE}/`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    inLanguage: lang,
    mainEntity: { "@id": `${SITE}/#person` },
    isPartOf: { "@id": `${SITE}/#website` },
  };
}

export function personSchema(lang: Lang) {
  const jobTitle = lang === "es" ? profile.title.es : profile.title.en;
  const description = lang === "es" ? profile.bio.es : profile.bio.en;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: profile.name,
    alternateName: profile.legalName,
    jobTitle,
    url: SITE,
    inLanguage: lang,
    image: {
      "@type": "ImageObject",
      url: `${SITE}/og-image.png`,
      description: `${profile.name} - ${profile.title.en}`,
    },
    description,
    email: profile.email,
    telephone: "+52-220-157-0694",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Puebla",
      addressCountry: "MX",
    },
    nationality: { "@type": "Country", name: "Mexico" },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad del Valle de Puebla",
        alternateName: "UVP",
      },
      { "@type": "CollegeOrUniversity", name: "Universidad Anáhuac Puebla" },
      {
        "@type": "CollegeOrUniversity",
        name: "UNIR México - Universidad Internacional de La Rioja",
      },
    ],
    hasCredential: education.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      name: lang === "es" ? item.degree.es : item.degree.en,
      credentialCategory: item.status === "in-progress" ? "degree in progress" : "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: item.institution },
    })),
    worksFor: {
      "@type": "Organization",
      "@id": EMPLOYER_ID,
      name: "Towel S.A. de C.V.",
      address: { "@type": "PostalAddress", addressLocality: "Puebla", addressCountry: "MX" },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: jobTitle,
      occupationLocation: { "@type": "City", name: "Puebla" },
      skills:
        "LangChain, LangGraph, RAG, TensorFlow, React, NestJS, AWS, PostgreSQL, Python, Computer Vision, OCR, NLP",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Development",
      "Computer Vision",
      "Retrieval-Augmented Generation",
      "LangChain",
      "LangGraph",
      "Large Language Models",
      "Natural Language Processing",
      "TensorFlow",
      "AWS Cloud Architecture",
      "PostgreSQL",
      "React",
      "NestJS",
      "Software Architecture",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    sameAs: [profile.links.github, profile.links.linkedin],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable-impact]", "#acerca .t-body"],
    },
  };
}

export function projectsSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}/#projects`,
    name: lang === "es" ? "Proyectos de portafolio - Franco Sanchez" : "Portfolio Projects - Franco Sanchez",
    description:
      lang === "es"
        ? "Sistemas de IA e ingeniería de software en producción, con cliente, fechas y método de medición."
        : "Production AI and software-engineering systems, with client, dates, and measurement method.",
    inLanguage: lang,
    numberOfItems: projects.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": workId(project.slug),
        name: lang === "es" ? project.title.es : project.title.en,
        description: lang === "es" ? project.impact.es : project.impact.en,
        url: `${SITE}${lang === "es" ? "/es/proyectos/" : "/projects/"}${project.slug}/`,
        inLanguage: lang,
        datePublished: periodPublished(project.period),
        dateModified: project.updated,
        creator: { "@id": `${SITE}/#person` },
        author: { "@id": `${SITE}/#person` },
        keywords: (lang === "es" ? project.tags.es : project.tags.en).join(", "),
      },
    })),
  };
}

export function projectWorkSchema(
  lang: Lang,
  project: (typeof projects)[number],
  canonicalUrl: string,
) {
  const title = lang === "es" ? project.title.es : project.title.en;
  const tags = lang === "es" ? project.tags.es : project.tags.en;
  const images = project.images ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": workId(project.slug),
    name: title,
    headline: title,
    description: lang === "es" ? project.impact.es : project.impact.en,
    url: canonicalUrl,
    inLanguage: lang,
    datePublished: periodPublished(project.period),
    dateModified: project.updated,
    mainEntityOfPage: canonicalUrl,
    creator: { "@id": `${SITE}/#person` },
    author: { "@id": `${SITE}/#person` },
    keywords: tags.join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable-impact]", "[data-speakable-faq]"],
    },
    ...(images.length > 0 ? { image: images.map((src) => `${SITE}${src}`) } : {}),
  };
}

export function breadcrumbSchema(lang: Lang, project: (typeof projects)[number], canonicalUrl: string) {
  const home = lang === "es" ? `${SITE}/es/` : `${SITE}/`;
  const homeName = lang === "es" ? "Inicio" : "Home";
  const title = lang === "es" ? project.title.es : project.title.en;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeName,
        item: home,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: canonicalUrl,
      },
    ],
  };
}
