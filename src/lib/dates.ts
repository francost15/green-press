import type { Lang } from "../i18n";

export interface Period {
  /** ISO 8601: "YYYY" or "YYYY-MM" */
  start: string;
  /** "YYYY", "YYYY-MM", or "present". Omit for a single point in time. */
  end?: string;
}

const ONGOING: Record<Lang, string> = { es: "Presente", en: "Present" };
const LOCALE: Record<Lang, string> = { es: "es-MX", en: "en-US" };

function formatPoint(value: string, lang: Lang): string {
  const [year, month] = value.split("-");
  if (!month) return year;

  return new Intl.DateTimeFormat(LOCALE[lang], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
}

/**
 * Dates are stored as ISO and formatted per locale, rather than hand-written per
 * language — that is what keeps Spanish month abbreviations off the English page.
 */
export function formatPeriod(period: Period, lang: Lang): string {
  const start = formatPoint(period.start, lang);
  if (!period.end) return start;
  if (period.end === "present") return `${start} — ${ONGOING[lang]}`;
  return `${start} — ${formatPoint(period.end, lang)}`;
}
