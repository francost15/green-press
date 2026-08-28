import { describe, it, expect } from "vitest";
import { periodModified, periodPublished, toIsoDate } from "../lib/iso";

describe("toIsoDate", () => {
  it("expands a year to January 1", () => {
    expect(toIsoDate("2024")).toBe("2024-01-01");
  });

  it("expands a year-month to the first day", () => {
    expect(toIsoDate("2025-10")).toBe("2025-10-01");
  });

  it("uses start for datePublished and end for dateModified", () => {
    expect(periodPublished({ start: "2025-08", end: "2025-09" })).toBe("2025-08-01");
    expect(periodModified({ start: "2025-08", end: "2025-09" })).toBe("2025-09-01");
  });
});
