import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vite-plus/test";
import { Contact } from "../sections/Contact";
import { I18nProvider } from "../i18n";

function renderContact() {
  return render(
    <I18nProvider>
      <Contact />
    </I18nProvider>,
  );
}

describe("Contact", () => {
  it("renders form with required fields", () => {
    renderContact();
    expect(screen.getByLabelText("Nombre")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Mensaje")).toBeRequired();
  });

  it("renders submit button", () => {
    renderContact();
    expect(screen.getByRole("button", { name: "Enviar Mensaje" })).toBeInTheDocument();
  });

  it("renders contact links", () => {
    renderContact();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("has aria-live region for status messages", () => {
    const { container } = renderContact();
    expect(container.querySelector("[aria-live='polite']")).toBeInTheDocument();
  });

  it("linkedin opens in new tab with security attributes", () => {
    renderContact();
    const linkedin = screen.getByText("LinkedIn").closest("a");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });
});
