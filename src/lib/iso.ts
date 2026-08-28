import type { Period } from "./dates";

/** Schema.org and <time datetime> need a full date. Year-only becomes Jan 1. */
export function toIsoDate(value: string): string {
  if (value === "present") return new Date().toISOString().slice(0, 10);
  if (/^\d{4}$/.test(value)) return `${value}-01-01`;
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  return value;
}

export function periodPublished(period: Period): string {
  return toIsoDate(period.start);
}

export function periodModified(period: Period): string {
  if (!period.end || period.end === "present") return toIsoDate("present");
  return toIsoDate(period.end);
}
