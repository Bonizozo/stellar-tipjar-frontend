/**
 * Single lazy entry point for jsPDF.
 *
 * jsPDF is only needed when a user actually triggers a PDF export (receipt,
 * certificate, press kit, tax report, etc). Importing it eagerly at module
 * scope would ship its ~350KB parser/font payload to every visitor, so every
 * PDF-generating module in the app should call `loadJsPDF()` instead of
 * `import jsPDF from "jspdf"` directly.
 */
import type { jsPDF as JsPDFClass } from "jspdf";

let jsPDFPromise: Promise<typeof JsPDFClass> | null = null;

export function loadJsPDF(): Promise<typeof JsPDFClass> {
  if (!jsPDFPromise) {
    jsPDFPromise = import("jspdf").then((mod) => mod.jsPDF);
  }
  return jsPDFPromise;
}

export type { JsPDFClass as JsPDF };
