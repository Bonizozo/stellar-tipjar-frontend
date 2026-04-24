import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline - Stellar Tip Jar",
  description: "You are currently offline",
  robots: "noindex, nofollow",
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
