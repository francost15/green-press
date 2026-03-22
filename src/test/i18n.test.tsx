import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vite-plus/test";
import { I18nProvider, useLang } from "../i18n";

function TestConsumer() {
  const { lang, toggle, t } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="translated">{t("Hola", "Hello")}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

describe("i18n", () => {
  it("defaults to Spanish", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
    expect(screen.getByTestId("translated")).toHaveTextContent("Hola");
  });

  it("toggles to English", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("translated")).toHaveTextContent("Hello");
  });

  it("toggles back to Spanish", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );
    fireEvent.click(screen.getByText("toggle"));
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
  });
});
