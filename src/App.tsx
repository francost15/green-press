import { lazy, Suspense } from "react";
import { Layout } from "./components/Layout";
import { Hero } from "./sections/Hero";

const Competencies = lazy(() =>
  import("./sections/Competencies").then((m) => ({ default: m.Competencies })),
);
const Projects = lazy(() => import("./sections/Projects").then((m) => ({ default: m.Projects })));
const TechStack = lazy(() =>
  import("./sections/TechStack").then((m) => ({ default: m.TechStack })),
);
const About = lazy(() => import("./sections/About").then((m) => ({ default: m.About })));
const Experience = lazy(() =>
  import("./sections/Experience").then((m) => ({ default: m.Experience })),
);
const Education = lazy(() =>
  import("./sections/Education").then((m) => ({ default: m.Education })),
);
const Contact = lazy(() => import("./sections/Contact").then((m) => ({ default: m.Contact })));

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      }
    >
      {children}
    </Suspense>
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
        <TechStack />
      </LazySection>
      <LazySection>
        <About />
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
