import { SITE } from "../i18n";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Franco Sanchez",
  alternateName: "Franco Alessandro Sanchez Trinidad",
  jobTitle: "AI & Software Engineer",
  url: SITE,
  image: {
    "@type": "ImageObject",
    url: `${SITE}/og-image.png`,
    description: "Franco Sanchez — AI & Software Engineer",
  },
  // Keep this consistent with the Experience section on the page: 5+ years of software
  // engineering, AI work from 2024. Claiming 5+ years of production AI contradicts the
  // rendered timeline, which is a structured-data quality violation.
  description:
    "AI & Software Engineer based in Puebla, Mexico. 5+ years in software engineering, building production AI systems since 2024. Specializes in LangChain, LangGraph, RAG pipelines, and full-stack architecture. Delivered systems cutting operational costs by up to 85% and financial projections with accuracy above 92%.",
  email: "contacto@fsanchezt.dev",
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
      name: "UNIR México — Universidad Internacional de La Rioja",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Towel S.A. de C.V.",
    address: { "@type": "PostalAddress", addressLocality: "Puebla", addressCountry: "MX" },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "AI & Software Engineer",
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
  sameAs: [
    "https://github.com/francost15",
    "https://www.linkedin.com/in/franco-alessandro-sanchez-trinidad-2320742a3/",
  ],
};

export const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE}/#projects`,
  name: "Portfolio Projects — Franco Sanchez",
  description: "AI and software engineering projects with measurable business outcomes.",
  numberOfItems: 5,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  // No `author` here: it requires CreativeWork or Rating, and ItemList is an Intangible.
  // The per-item creator/author refs carry the link back to the Person node instead.
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        // CreativeWork, not SoftwareApplication: these are private client systems with no
        // download and no public instance, so the properties Google requires for the
        // Software App rich result could only be supplied by fabricating them.
        "@type": "CreativeWork",
        "@id": `${SITE}/#project-ai-dashboard`,
        name: "AI Business Intelligence Dashboard",
        description:
          "LangGraph agent querying SQL databases via natural language, generating dynamic charts, and predicting sales. Reduced report generation time by 90%.",
        creator: { "@id": `${SITE}/#person` },
        author: { "@id": `${SITE}/#person` },
        genre: "Business Intelligence Software",
        keywords:
          "AI dashboard, LangGraph, business intelligence, natural language SQL, LLMs, React, Python",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE}/#project-cfdi`,
        name: "Smart CFDI Billing System",
        description:
          "Electronic billing platform with OCR data extraction and predictive income modeling. Automated 80% of accounting workflows with 92% projection accuracy.",
        creator: { "@id": `${SITE}/#person` },
        author: { "@id": `${SITE}/#person` },
        genre: "Financial Software",
        keywords:
          "CFDI billing, OCR, electronic invoicing, Mexico fintech, predictive models, Node.js, Python",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE}/#project-rag-assistant`,
        name: "RAG Institutional Assistant",
        description:
          "24/7 virtual assistant using Retrieval-Augmented Generation connected to university knowledge bases. Autonomously resolved 65% of level-1 support queries.",
        creator: { "@id": `${SITE}/#person` },
        author: { "@id": `${SITE}/#person` },
        genre: "Educational Software",
        keywords:
          "RAG chatbot, LangChain, vector database, university assistant, AI automation, Python",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE}/#project-textile-erp`,
        name: "Textile Production ERP",
        description:
          "ERP system for real-time textile production traceability and shop floor control. Improved workflow visibility by 40% and eliminated paper use on the plant floor.",
        creator: { "@id": `${SITE}/#person` },
        author: { "@id": `${SITE}/#person` },
        genre: "Enterprise Resource Planning Software",
        keywords:
          "ERP, textile industry, production management, real-time tracking, PostgreSQL, React",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE}/#project-job-board`,
        name: "AI-Powered Job Matching Board",
        description:
          "Job board using NLP to parse CVs and automatically match candidates to technical vacancies. Reduced initial screening time by 75%.",
        creator: { "@id": `${SITE}/#person` },
        author: { "@id": `${SITE}/#person` },
        genre: "Recruitment Software",
        keywords: "job matching, AI recruitment, NLP, CV parsing, AWS, Next.js, Python",
      },
    },
  ],
};
