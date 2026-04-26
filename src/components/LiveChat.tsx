"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/hooks/useLiveStream";

interface LiveChatProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function LiveChat({ messages, onSend, disabled }: LiveChatProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink/10">
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-ink">Live Chat</h3>
        <span className="ml-auto text-xs text-ink/40">{messages.length} messages</span>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 min-h-0" aria-live="polite" aria-label="Chat messages">
        {messages.length === 0 && (
          <p className="text-xs text-ink/40 italic text-center mt-4">Chat will appear here once you go live.</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className={`font-semibold ${msg.user === "You" ? "text-wave" : "text-ink"}`}>{msg.user}: </span>
            <span className="text-ink/80">{msg.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 px-4 py-3 border-t border-ink/10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={disabled ? "Go live to chat…" : "Say something…"}
          disabled={disabled}
          maxLength={200}
          className="flex-1 rounded-lg border border-ink/10 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="rounded-lg bg-wave px-3 py-1.5 text-sm font-medium text-white hover:bg-wave/90 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
