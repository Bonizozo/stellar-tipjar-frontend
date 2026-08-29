/**
 * Next.js Instrumentation hook.
 *
 * Runs once at server startup (before any request is handled) in Node.js runtime.
 * Guarantees that environment configuration is validated immediately upon server boot.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Validate configuration at server startup
    const { validateConfig } = await import("./config/env");
    validateConfig();
  }
}
