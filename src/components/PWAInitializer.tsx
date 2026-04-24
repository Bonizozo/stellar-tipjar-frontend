"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/pwa/register";

export function PWAInitializer() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
