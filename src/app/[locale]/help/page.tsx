import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";
import { HelpPageClient } from "./HelpPageClient";

export const metadata: Metadata = buildMetadata({
  title: "Help & FAQ — Stellar Tip Jar",
  description:
    "Find answers to common questions about wallet setup, sending tips, XLM, and troubleshooting on Stellar Tip Jar.",
  path: "/help",
});

export default function HelpPage() {
  return <HelpPageClient />;
}
