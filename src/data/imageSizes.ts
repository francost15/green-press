// GENERATED from the files in public/projects. Intrinsic dimensions let the browser
// reserve space before an image loads, which is what keeps CLS at zero.
export interface ImageSize {
  width: number;
  height: number;
}

export const imageSizes: Record<string, ImageSize> = {
  "/projects/ai-dashboard-1-sm.webp": { width: 768, height: 386 },
  "/projects/ai-dashboard-1.webp": { width: 1536, height: 773 },
  "/projects/ai-dashboard-2-sm.webp": { width: 768, height: 386 },
  "/projects/ai-dashboard-2.webp": { width: 1536, height: 773 },
  "/projects/ai-dashboard-3-sm.webp": { width: 768, height: 386 },
  "/projects/ai-dashboard-3.webp": { width: 1536, height: 773 },
  "/projects/ai-dashboard-4-sm.webp": { width: 768, height: 386 },
  "/projects/ai-dashboard-4.webp": { width: 1536, height: 773 },
  "/projects/ai-dashboard-5-sm.webp": { width: 768, height: 386 },
  "/projects/ai-dashboard-5.webp": { width: 1536, height: 773 },
  "/projects/cfdi-1-sm.webp": { width: 768, height: 432 },
  "/projects/cfdi-1.webp": { width: 1536, height: 864 },
  "/projects/cfdi-2-sm.webp": { width: 768, height: 386 },
  "/projects/cfdi-2.webp": { width: 1536, height: 773 },
  "/projects/cfdi-3-sm.webp": { width: 768, height: 366 },
  "/projects/cfdi-3.webp": { width: 1536, height: 732 },
  "/projects/cfdi-4-sm.webp": { width: 768, height: 386 },
  "/projects/cfdi-4.webp": { width: 1536, height: 772 },
  "/projects/cfdi-5-sm.webp": { width: 768, height: 386 },
  "/projects/cfdi-5.webp": { width: 1536, height: 772 },
  "/projects/cfdi-6-sm.webp": { width: 768, height: 432 },
  "/projects/cfdi-6.webp": { width: 1536, height: 864 },
  "/projects/cfdi-7-sm.webp": { width: 768, height: 386 },
  "/projects/cfdi-7.webp": { width: 1536, height: 773 },
  "/projects/cfdi-8-sm.webp": { width: 768, height: 368 },
  "/projects/cfdi-8.webp": { width: 1536, height: 736 },
  "/projects/ltc-job-board-1-sm.webp": { width: 768, height: 386 },
  "/projects/ltc-job-board-1.webp": { width: 1536, height: 773 },
  "/projects/ltc-job-board-2-sm.webp": { width: 768, height: 386 },
  "/projects/ltc-job-board-2.webp": { width: 1536, height: 773 },
  "/projects/ltc-job-board-3-sm.webp": { width: 768, height: 386 },
  "/projects/ltc-job-board-3.webp": { width: 1536, height: 773 },
  "/projects/rag-chatbot-1-sm.webp": { width: 768, height: 386 },
  "/projects/rag-chatbot-1.webp": { width: 1536, height: 773 },
  "/projects/rag-chatbot-2-sm.webp": { width: 768, height: 386 },
  "/projects/rag-chatbot-2.webp": { width: 1536, height: 773 },
};

/** Path of the 768px variant that sits alongside every full-size screenshot. */
export function smallVariant(src: string): string {
  return src.replace(/\.webp$/, "-sm.webp");
}
