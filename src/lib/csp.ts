import { IS_DEV } from "@/config/env";

export interface CspOptions {
  isDev?: boolean;
  nonce?: string;
}

export function buildCspHeader(options: CspOptions = {}): string {
  const isDev = options.isDev ?? IS_DEV;

  const scriptDirectives = [
    "'self'",
    options.nonce ? `'nonce-${options.nonce}'` : null,
    isDev ? "'unsafe-eval'" : null,
    "'wasm-unsafe-eval'",
  ].filter(Boolean);

  const styleDirectives = ["'self'", "'unsafe-inline'"];

  const connectDirectives = [
    "'self'",
    "https:",
    "wss:",
    isDev ? "http:" : null,
    isDev ? "ws:" : null,
  ].filter(Boolean);

  const imgDirectives = [
    "'self'",
    "data:",
    "blob:",
    "https:",
    isDev ? "http:" : null,
  ].filter(Boolean);

  const mediaDirectives = [
    "'self'",
    "blob:",
    "https:",
    isDev ? "http:" : null,
  ].filter(Boolean);

  return [
    "default-src 'self'",
    `script-src ${scriptDirectives.join(" ")}`,
    `style-src ${styleDirectives.join(" ")}`,
    `img-src ${imgDirectives.join(" ")}`,
    "font-src 'self' data:",
    `connect-src ${connectDirectives.join(" ")}`,
    `media-src ${mediaDirectives.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests", "block-all-mixed-content"]),
  ].join("; ");
}


