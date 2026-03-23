import { Component, lazy, Suspense } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Layout } from "./components/Layout";
import { Hero } from "./sections/Hero";

const Competencies = lazy(() =>
  import("./sections/Competencies").then((m) => ({ default: m.Competencies })),
);
const Projects = lazy(() => import("./sections/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() =>
  import("./sections/Experience").then((m) => ({ default: m.Experience })),
);
const Education = lazy(() =>
  import("./sections/Education").then((m) => ({ default: m.Education })),
);
const Contact = lazy(() => import("./sections/Contact").then((m) => ({ default: m.Contact })));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Section failed to load:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-48 items-center justify-center text-text-tertiary">
          <p className="text-sm">Something went wrong loading this section.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function LazySection({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <Layout>
      <Hero />
      <LazySection>
        <Competencies />
      </LazySection>
      <LazySection>
        <Projects />
      </LazySection>
      <LazySection>
        <Experience />
      </LazySection>
      <LazySection>
        <Education />
      </LazySection>
      <LazySection>
        <Contact />
      </LazySection>
    </Layout>
  );
}
