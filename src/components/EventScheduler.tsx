"use client";

import { useState } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { COMMON_TIMEZONES } from "@/utils/icalGenerator";
import type { EventType, RecurrenceRule } from "@/services/api";

interface EventSchedulerProps {
  creatorUsername: string;
  onClose: () => void;
}

const EVENT_TYPES: { value: EventType; label: string; emoji: string }[] = [
  { value: "stream", label: "Live Stream", emoji: "🎥" },
  { value: "ama", label: "AMA", emoji: "💬" },
  { value: "workshop", label: "Workshop", emoji: "🛠️" },
  { value: "release", label: "Release", emoji: "🚀" },
  { value: "other", label: "Other", emoji: "📅" },
];

const RECURRENCE_OPTIONS: { value: RecurrenceRule; label: string }[] = [
  { value: "NONE", label: "Does not repeat" },
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

/** Convert a local datetime-local input value + timezone to an ISO string */
function localToIso(localDt: string, _tz: string): string {
  // datetime-local gives "YYYY-MM-DDTHH:mm" — treat as-is and append Z for UTC approximation.
  // In production, use a proper timezone library (e.g. date-fns-tz) for exact conversion.
  return localDt ? new Date(localDt).toISOString() : "";
}

/** Get the browser's local datetime-local default (now + offset) */
function defaultDt(offsetHours = 1): string {
  const d = new Date(Date.now() + offsetHours * 3_600_000);
  return d.toISOString().slice(0, 16);
}

const inputCls =
  "w-full rounded-xl border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-wave/30";
const labelCls = "block text-sm font-medium text-ink mb-1";

export function EventScheduler({ creatorUsername, onClose }: EventSchedulerProps) {
  const { createEvent, isCreating, createError } = useCalendar(creatorUsername);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<EventType>("stream");
  const [startDt, setStartDt] = useState(defaultDt(1));
  const [endDt, setEndDt] = useState(defaultDt(3));
  const [timezone, setTimezone] = useState(
    typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
  );
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");
  const [recurrence, setRecurrence] = useState<RecurrenceRule>("NONE");
  const [recurrenceCount, setRecurrenceCount] = useState(4);
  const [localError, setLocalError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): string | null => {
    if (!title.trim()) return "Title is required.";
    if (!startDt) return "Start date/time is required.";
    if (!endDt) return "End date/time is required.";
    if (new Date(endDt) <= new Date(startDt)) return "End must be after start.";
    if (url && !/^https?:\/\//.test(url)) return "URL must start with http:// or https://";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setLocalError(err); return; }
    setLocalError(null);

    createEvent(
      {
        creatorUsername,
        title: title.trim(),
        description: description.trim(),
        type,
        startIso: localToIso(startDt, timezone),
        endIso: localToIso(endDt, timezone),
        timezone,
        location: location.trim() || undefined,
        url: url.trim() || undefined,
        recurrence,
        recurrenceCount: recurrence !== "NONE" ? recurrenceCount : undefined,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setTimeout(onClose, 1200);
        },
      },
    );
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <span className="text-4xl">🎉</span>
        <p className="font-semibold text-ink">Event scheduled!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Event type pills */}
      <div>
        <span className={labelCls}>Event Type</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Event type">
          {EVENT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              aria-pressed={type === t.value}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors ${
                type === t.value
                  ? "border-wave bg-wave/10 text-wave"
                  : "border-ink/20 text-ink/60 hover:border-wave/30"
              }`}
            >
              <span aria-hidden="true">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <label className="block">
        <span className={labelCls}>Title *</span>
        <input
          className={inputCls}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Weekly Live Stream"
          maxLength={120}
          required
        />
      </label>

      {/* Description */}
      <label className="block">
        <span className={labelCls}>Description</span>
        <textarea
          className={`${inputCls} min-h-[72px] resize-y`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this event about?"
          maxLength={1000}
          rows={3}
        />
      </label>

      {/* Date/time row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Start *</span>
          <input
            type="datetime-local"
            className={inputCls}
            value={startDt}
            onChange={(e) => setStartDt(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className={labelCls}>End *</span>
          <input
            type="datetime-local"
            className={inputCls}
            value={endDt}
            onChange={(e) => setEndDt(e.target.value)}
            required
          />
        </label>
      </div>

      {/* Timezone */}
      <label className="block">
        <span className={labelCls}>Timezone</span>
        <select
          className={inputCls}
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          {COMMON_TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </label>

      {/* Location + URL */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Location</span>
          <input
            className={inputCls}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Online / Discord / etc."
          />
        </label>
        <label className="block">
          <span className={labelCls}>URL</span>
          <input
            type="url"
            className={inputCls}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://twitch.tv/..."
          />
        </label>
      </div>

      {/* Recurrence */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Recurrence</span>
          <select
            className={inputCls}
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as RecurrenceRule)}
          >
            {RECURRENCE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </label>
        {recurrence !== "NONE" && (
          <label className="block">
            <span className={labelCls}>Repeat count</span>
            <input
              type="number"
              min={2}
              max={52}
              className={inputCls}
              value={recurrenceCount}
              onChange={(e) => setRecurrenceCount(Number(e.target.value))}
            />
          </label>
        )}
      </div>

      {/* Errors */}
      {(localError ?? createError) && (
        <p role="alert" className="rounded-xl border border-error/30 bg-error/5 px-3 py-2 text-sm text-error">
          {localError ?? createError}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={isCreating}
          aria-busy={isCreating}
          className="inline-flex items-center justify-center rounded-xl bg-wave px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {isCreating ? "Scheduling..." : "Schedule Event"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink/70 transition hover:border-wave/40"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
