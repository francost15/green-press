import type { ReactNode } from "react";
import { I18nProvider } from "../i18n";
import { ThemeProvider } from "../context/ThemeContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <div className="relative min-h-screen bg-bg">
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </I18nProvider>
  );
}
