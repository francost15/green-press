import type { ReactNode } from "react";
import { I18nProvider } from "../i18n";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <div className="relative min-h-screen bg-bg">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
