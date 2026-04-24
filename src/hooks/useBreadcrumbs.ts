"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export type Crumb = {
  path: string;
  label: string;
  icon?: React.ReactNode;
};

function titleize(segment: string) {
  if (!segment) return "";
  // Remove brackets for dynamic segments
  const cleaned = segment.replace(/^\[|\]$/g, "");
  // replace hyphens/underscores with space and capitalize words
  return cleaned
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/**
 * useBreadcrumbs
 * Automatically generate breadcrumbs from Next.js app-router pathname.
 * Accepts optional labelMap to map segments or paths to friendly labels,
 * and optional iconMap to attach icons to crumbs.
 */
export default function useBreadcrumbs(
  labelMap?: Record<string, string>,
  iconMap?: Record<string, React.ReactNode>,
) {
  const pathname = usePathname() ?? "/";

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    // start with root
    const crumbs: Crumb[] = [
      {
        path: "/",
        label: labelMap?.["/"] ?? "Home",
        icon: iconMap?.["/"],
      },
    ];

    let acc = "";
    segments.forEach((seg) => {
      acc += `/${seg}`;
      const key = acc; // allow mapping by path
      const label = labelMap?.[key] ?? labelMap?.[seg] ?? titleize(seg);
      crumbs.push({ path: key, label, icon: iconMap?.[key] ?? iconMap?.[seg] });
    });

    return crumbs;
  }, [pathname, labelMap, iconMap]);

  return breadcrumbs;
}
