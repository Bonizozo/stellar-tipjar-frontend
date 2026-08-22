import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/config/env";

const BASE_URL = SITE_BASE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
