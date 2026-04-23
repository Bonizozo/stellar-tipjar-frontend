import { Workbox } from "workbox-window";

type ServiceWorkerUpdateCallback = () => void;

let workboxInstance: Workbox | null = null;
let updateCallback: ServiceWorkerUpdateCallback | null = null;

export function onServiceWorkerUpdate(callback: ServiceWorkerUpdateCallback) {
  updateCallback = callback;
}

export async function applyServiceWorkerUpdate() {
  if (!workboxInstance) return;
  await workboxInstance.messageSkipWaiting();
}

export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  const wb = new Workbox("/sw.js");
  workboxInstance = wb;

  wb.addEventListener("waiting", () => {
    window.dispatchEvent(new CustomEvent("sw-update-available"));
    updateCallback?.();
  });

  wb.addEventListener("activated", (event) => {
    if (event.isUpdate) {
      window.dispatchEvent(new CustomEvent("sw-updated"));
    }
  });

  wb.register().catch((error) => {
    console.error("Service worker registration failed:", error);
  });
}
