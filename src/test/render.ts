import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { within } from "@testing-library/dom";

type AstroComponent = Parameters<AstroContainer["renderToString"]>[0];

/**
 * Render an .astro component into the document and return Testing Library
 * queries scoped to it. Note this runs the server render only — the behaviour
 * of a component's `<script>` is covered through the modules in src/scripts.
 */
export async function renderAstro(Component: AstroComponent, props: Record<string, unknown> = {}) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, { props });

  // Attached rather than detached, so jest-dom's toBeInTheDocument works.
  const host = document.createElement("div");
  host.innerHTML = html;
  document.body.appendChild(host);

  return { container: host, html, ...within(host) };
}
