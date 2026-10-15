import { describe, it, expect } from "vitest";
import { useTranslations, localePath, otherLang, defaultLang } from "../i18n";

describe("i18n", () => {
  it("defaults to English", () => {
    expect(defaultLang).toBe("en");
  });

  it("picks the English copy for en", () => {
    expect(useTranslations("en")("Hola", "Hello")).toBe("Hello");
  });

  it("picks the Spanish copy for es", () => {
    expect(useTranslations("es")("Hola", "Hello")).toBe("Hola");
  });

  it("leaves English unprefixed and serves the Spanish home at /", () => {
    expect(localePath("en")).toBe("/");
    expect(localePath("es")).toBe("/");
    expect(localePath("es", "proyectos/foo/")).toBe("/es/proyectos/foo/");
  });

  it("joins a sub-path onto the locale root", () => {
    expect(localePath("es", "about")).toBe("/es/about");
    expect(localePath("en", "/about")).toBe("/about");
  });

  it("swaps languages", () => {
    expect(otherLang("en")).toBe("es");
    expect(otherLang("es")).toBe("en");
  });
});
