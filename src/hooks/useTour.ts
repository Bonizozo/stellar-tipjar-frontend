"use client";

import { useState, useCallback, useEffect } from "react";
import { createNamespacedStorage } from "@/lib/storage";

const storage = createNamespacedStorage("tour");

const TOUR_REPLAY_EVENT = "tipjar:tour:replay";

export interface TourStep {
  target: string; // data-tour value
  title: string;
  content: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    target: "navbar",
    title: "Navigation",
    content: "Use the navbar to explore the app, access your wallet, and switch themes.",
  },
  {
    target: "explore",
    title: "Explore Creators",
    content: "Discover creators from around the world and find someone to support.",
  },
  {
    target: "creator-profile",
    title: "Creator Profiles",
    content: "View creator stats, tip history, and goals all in one place.",
  },
  {
    target: "tip-form",
    title: "Send a Tip",
    content: "Send XLM tips directly to creators using the Stellar network.",
  },
  {
    target: "wallet-connector",
    title: "Connect Wallet",
    content: "Connect your Freighter wallet to start sending tips securely.",
  },
  {
    target: "settings",
    title: "Settings",
    content: "Manage your profile, notifications, privacy, and security here.",
  },
];

/** Call this from anywhere (e.g. settings page) to restart the tour. */
export function replayTour() {
  storage.remove("done");
  window.dispatchEvent(new Event(TOUR_REPLAY_EVENT));
}

export function useTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!storage.getString("done", { legacyKey: "tipjar_tour_done" })) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener(TOUR_REPLAY_EVENT, handler);
    return () => window.removeEventListener(TOUR_REPLAY_EVENT, handler);
  }, []);

  const next = useCallback(() => {
    setStep((s) => {
      if (s + 1 >= TOUR_STEPS.length) {
        setIsOpen(false);
        storage.setString("done", "1");
        return 0;
      }
      return s + 1;
    });
  }, []);

  const skip = useCallback(() => {
    setIsOpen(false);
    storage.setString("done", "1");
    setStep(0);
  }, []);

  return { isOpen, step, next, skip, total: TOUR_STEPS.length };
}
