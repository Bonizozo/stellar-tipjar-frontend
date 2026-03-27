export function generateAvatarUrl(seed: string): string {
  // Use DiceBear API to generate deterministic avatars based on the username
  // 'adventurer' style looks nice and modern
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=e2e8f0,c7d2fe,fde68a`;
}

/**
 * Returns a static 10x10 base64 SVG string representing a subtle gradient or solid color.
 * Used for next/image's blurDataURL property while the real image is loading lazily.
 */
export function getStaticBlurDataUrl(): string {
  // A simple 10x10 SVG placeholder with an indigo tint
  const svg = `
    <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="#e0e7ff" />
    </svg>
  `;

  // Encode to base64 for inline usage
  const base64 = typeof window === "undefined"
    ? Buffer.from(svg).toString("base64")
    : window.btoa(svg);

  return `data:image/svg+xml;base64,${base64}`;
}
