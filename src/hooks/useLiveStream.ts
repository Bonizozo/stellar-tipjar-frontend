"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  ts: number;
}

export interface LiveTip {
  id: string;
  sender: string;
  amount: number;
  memo?: string;
  ts: number;
}

export interface LiveStreamState {
  isLive: boolean;
  isRecording: boolean;
  viewerCount: number;
  chatMessages: ChatMessage[];
  liveTips: LiveTip[];
  streamUrl: string;
  startStream: () => void;
  stopStream: () => void;
  toggleRecording: () => void;
  sendChat: (text: string) => void;
  simulateTip: () => void;
}

const DEMO_USERS = ["alice", "bob", "carol", "dave", "eve", "frank"];
const DEMO_MESSAGES = [
  "Great stream! 🔥", "Love the content!", "Keep it up!", "Amazing work 🚀",
  "First time here, loving it!", "Can you explain that again?", "This is so helpful!",
];

let _id = 0;
const uid = () => `ls-${Date.now()}-${++_id}`;

export function useLiveStream(): LiveStreamState {
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [liveTips, setLiveTips] = useState<LiveTip[]>([]);
  const [streamUrl] = useState("https://www.twitch.tv/stellartipjar");

  const chatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const viewerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tipIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearIntervals = useCallback(() => {
    [chatIntervalRef, viewerIntervalRef, tipIntervalRef].forEach((ref) => {
      if (ref.current) { clearInterval(ref.current); ref.current = null; }
    });
  }, []);

  const startStream = useCallback(() => {
    setIsLive(true);
    setViewerCount(Math.floor(Math.random() * 20) + 5);

    // Simulate viewer count fluctuation
    viewerIntervalRef.current = setInterval(() => {
      setViewerCount((v) => Math.max(1, v + Math.floor(Math.random() * 7) - 3));
    }, 4000);

    // Simulate incoming chat messages
    chatIntervalRef.current = setInterval(() => {
      const user = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
      const text = DEMO_MESSAGES[Math.floor(Math.random() * DEMO_MESSAGES.length)];
      setChatMessages((prev) => [...prev.slice(-49), { id: uid(), user, text, ts: Date.now() }]);
    }, 3000);

    // Simulate occasional tips
    tipIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.6) {
        const sender = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
        const amount = [5, 10, 25, 50, 100][Math.floor(Math.random() * 5)];
        const tip: LiveTip = { id: uid(), sender, amount, memo: Math.random() > 0.5 ? "Keep it up! 🚀" : undefined, ts: Date.now() };
        setLiveTips((prev) => [...prev.slice(-9), tip]);
      }
    }, 8000);
  }, []);

  const stopStream = useCallback(() => {
    setIsLive(false);
    setIsRecording(false);
    setViewerCount(0);
    clearIntervals();
  }, [clearIntervals]);

  const toggleRecording = useCallback(() => {
    setIsRecording((r) => !r);
  }, []);

  const sendChat = useCallback((text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev.slice(-49), { id: uid(), user: "You", text: text.trim(), ts: Date.now() }]);
  }, []);

  const simulateTip = useCallback(() => {
    const sender = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
    const amount = [5, 10, 25, 50, 100][Math.floor(Math.random() * 5)];
    setLiveTips((prev) => [...prev.slice(-9), { id: uid(), sender, amount, memo: "Test tip! 💸", ts: Date.now() }]);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => clearIntervals(), [clearIntervals]);

  return { isLive, isRecording, viewerCount, chatMessages, liveTips, streamUrl, startStream, stopStream, toggleRecording, sendChat, simulateTip };
}
