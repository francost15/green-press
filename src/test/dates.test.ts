import { describe, it, expect } from "vitest";
import { formatPeriod } from "../lib/dates";
import { experience } from "../data/experience";
import { education } from "../data/education";

describe("formatPeriod", () => {
  it("formats a closed range per locale", () => {
    const period = { start: "2024-02", end: "2025-06" };
    expect(formatPeriod(period, "en")).toMatch(/^Feb 2024 — Jun 2025$/);
    expect(formatPeriod(period, "es")).toContain("2024");
    expect(formatPeriod(period, "es")).toContain("2025");
  });

  it("translates the ongoing marker", () => {
    const period = { start: "2025-10", end: "present" };
    expect(formatPeriod(period, "en")).toContain("Present");
    expect(formatPeriod(period, "es")).toContain("Presente");
    expect(formatPeriod(period, "en")).not.toContain("Presente");
  });

  it("renders a bare year without inventing a month", () => {
    expect(formatPeriod({ start: "2026" }, "en")).toBe("2026");
    expect(formatPeriod({ start: "2026" }, "es")).toBe("2026");
  });

  // The whole point of storing ISO dates: no hand-written Spanish month abbreviation
  // can leak onto the English page.
  it("keeps Spanish month names out of every English period", () => {
    const spanish = /\b(Ago|Sept|Dic|Ene|Abr|Presente)\b/;
    for (const item of experience) {
      expect(formatPeriod(item.period, "en")).not.toMatch(spanish);
    }
    for (const edu of education) {
      expect(formatPeriod(edu.period, "en")).not.toMatch(spanish);
    }
  });
});
