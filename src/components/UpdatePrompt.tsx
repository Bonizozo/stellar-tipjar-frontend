"use client";

import { useEffect, useState } from "react";
import { applyServiceWorkerUpdate } from "@/lib/pwa/register";

export function UpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => setShowUpdate(true);
    window.addEventListener("sw-update-available", handleUpdateAvailable);

    return () => {
      window.removeEventListener("sw-update-available", handleUpdateAvailable);
    };
  }, []);

  if (!showUpdate) return null;

  const handleUpdate = async () => {
    await applyServiceWorkerUpdate();
    window.location.reload();
  };

  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-xl bg-wave px-4 py-3 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">A new version is ready.</span>
        <button
          type="button"
          onClick={handleUpdate}
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-wave"
        >
          Update now
        </button>
      </div>
    </div>
  );
}
