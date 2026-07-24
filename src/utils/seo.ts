import type { Metadata } from "next";
import { SITE_BASE_URL } from "@/config/env";

const BASE_URL = SITE_BASE_URL;

export const DEFAULT_OG_IMAGE = "/opengraph-image";

export function buildMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Stellar Tip Jar",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stellar Tip Jar",
    url: BASE_URL,
    description: "Support creators globally with low-fee Stellar tips.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/explore?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function creatorProfileJsonLd({
  username,
  displayName,
  bio,
}: {
  username: string;
  displayName: string;
  bio: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    alternateName: `@${username}`,
    description: bio,
    url: `${BASE_URL}/creator/${username}`,
  };
}
