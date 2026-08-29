import { NextResponse } from "next/server";
import { validateConfig } from "@/config/env";

/**
 * Health check endpoint.
 *
 * Validates application configuration and runtime readiness.
 * Can be used by container orchestrators, load balancers, and CI/CD pipelines
 * before traffic is routed to the application instance.
 */
export async function GET() {
  try {
    const config = validateConfig();
    return NextResponse.json({
      status: "ok",
      environment: config.nodeEnv,
      stellarNetwork: config.stellarNetwork,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Invalid application configuration",
      },
      { status: 500 }
    );
  }
}
