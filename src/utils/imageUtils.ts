export function generateAvatarUrl(seed: string): string {
  // PNG format allows Next.js Image to apply avif/webp optimisation and caching.
  return `https://api.dicebear.com/7.x/adventurer/png?seed=${encodeURIComponent(seed)}&backgroundColor=e2e8f0,c7d2fe,fde68a&size=128`;
}

/**
 * Returns a base64-encoded SVG blur placeholder.
 * @param color - Fill color for the placeholder (hex or CSS color)
 */
export function getStaticBlurDataUrl(color = "#e0e7ff"): string {
  const svg = `<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="${color}"/></svg>`;
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(svg).toString("base64")
      : window.btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}
