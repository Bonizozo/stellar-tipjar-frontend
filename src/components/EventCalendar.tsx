"use client";

import { useState } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { EventScheduler } from "@/components/EventScheduler";
import {
  downloadICalFile,
  googleCalendarUrl,
  outlookCalendarUrl,
  type ICalEvent,
} from "@/utils/icalGenerator";
import type { CreatorEvent, EventType } from "@/services/api";

interface EventCalendarProps {
  creatorUsername: string;
  /** Show the "Schedule Event" button (creator-only) */
  isOwner?: boolean;
}

const TYPE_STYLES: Record<EventType, { bg: string; text: string; emoji: string }> = {
  stream:   { bg: "bg-purple-100",  text: "text-purple-700",  emoji: "🎥" },
  ama:      { bg: "bg-blue-100",    text: "text-blue-700",    emoji: "💬" },
  workshop: { bg: "bg-amber-100",   text: "text-amber-700",   emoji: "🛠️" },
  release:  { bg: "bg-green-100",   text: "text-green-700",   emoji: "🚀" },
  other:    { bg: "bg-ink/10",      text: "text-ink/70",      emoji: "📅" },
};

function toICalEvent(e: CreatorEvent): ICalEvent {
  return {
    uid: `${e.id}@stellar-tipjar`,
    summary: e.title,
    description: e.description,
    location: e.location,
    url: e.url,
    startIso: e.startIso,
    endIso: e.endIso,
    timezone: e.timezone,
    recurrence: e.recurrence === "NONE" ? undefined : e.recurrence,
    recurrenceCount: e.recurrenceCount,
  };
}

function formatEventDate(iso: string, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

function EventCard({
  event,
  onDelete,
  isOwner,
}: {
  event: CreatorEvent;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}) {
  const [showExport, setShowExport] = useState(false);
  const style = TYPE_STYLES[event.type];
  const ical = toICalEvent(event);

  return (
    <article
      aria-label={event.title}
      className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-card transition hover:border-wave/30"
    >
      <div className="flex items-start gap-3">
        {/* Type badge */}
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${style.bg}`}
          aria-hidden="true"
        >
          {style.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}>
              {event.type.toUpperCase()}
            </span>
            {event.recurrence !== "NONE" && (
              <span className="rounded-full bg-wave/10 px-2 py-0.5 text-xs font-semibold text-wave">
                Recurring
              </span>
            )}
          </div>

          <h3 className="mt-1 text-sm font-semibold text-ink">{event.title}</h3>

          {event.description && (
            <p className="mt-1 text-xs text-ink/60 line-clamp-2">{event.description}</p>
          )}

          <p className="mt-2 text-xs text-ink/50">
            🕐 {formatEventDate(event.startIso, event.timezone)}
          </p>

          {event.location && (
            <p className="mt-0.5 text-xs text-ink/50">📍 {event.location}</p>
          )}

          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 block truncate text-xs text-wave hover:underline"
            >
              🔗 {event.url}
            </a>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-3">
        {/* Export dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowExport((v) => !v)}
            aria-expanded={showExport}
            aria-label="Add to calendar"
            className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:border-wave/40 hover:text-wave"
          >
            + Add to Calendar
          </button>

          {showExport && (
            <div
              role="menu"
              className="absolute left-0 top-full z-10 mt-1 min-w-[180px] rounded-xl border border-ink/10 bg-[color:var(--surface)] py-1 shadow-card"
            >
              {[
                {
                  label: "Download .ics",
                  action: () => {
                    downloadICalFile([ical], `${event.title.replace(/\s+/g, "-")}.ics`);
                    setShowExport(false);
                  },
                },
                {
                  label: "Google Calendar",
                  action: () => {
                    window.open(googleCalendarUrl(ical), "_blank", "noopener,noreferrer");
                    setShowExport(false);
                  },
                },
                {
                  label: "Outlook",
                  action: () => {
                    window.open(outlookCalendarUrl(ical), "_blank", "noopener,noreferrer");
                    setShowExport(false);
                  },
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  onClick={item.action}
                  className="w-full px-4 py-2 text-left text-sm text-ink/80 transition hover:bg-wave/5 hover:text-wave"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:border-wave/40 hover:text-wave"
          >
            Join Event →
          </a>
        )}

        {isOwner && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            aria-label={`Delete event: ${event.title}`}
            className="ml-auto rounded-lg border border-ink/10 px-3 py-1.5 text-xs text-ink/30 transition hover:border-error/40 hover:text-error"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export function EventCalendar({ creatorUsername, isOwner = false }: EventCalendarProps) {
  const { upcomingEvents, pastEvents, isLoading, isError, deleteEvent } =
    useCalendar(creatorUsername);

  const [showScheduler, setShowScheduler] = useState(false);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const displayed = tab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <section aria-labelledby="calendar-heading" className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="calendar-heading" className="text-xl font-semibold text-ink">
            Events
          </h2>
          <p className="mt-0.5 text-xs text-ink/50">
            {upcomingEvents.length} upcoming · {pastEvents.length} past
          </p>
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={() => setShowScheduler(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-wave px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <span aria-hidden="true">+</span> Schedule Event
          </button>
        )}
      </div>

      {/* Scheduler modal */}
      {showScheduler && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="scheduler-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg overflow-y-auto rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card max-h-[90vh]">
            <h3 id="scheduler-title" className="mb-5 text-lg font-semibold text-ink">
              Schedule New Event
            </h3>
            <EventScheduler
              creatorUsername={creatorUsername}
              onClose={() => setShowScheduler(false)}
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-ink/10 bg-ink/5 p-1 w-fit">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "bg-[color:var(--surface)] text-ink shadow-sm"
                : "text-ink/50 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3" aria-busy="true" aria-label="Loading events">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-ink/10 bg-ink/5" />
          ))}
        </div>
      )}

      {isError && (
        <p role="alert" className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          Failed to load events.
        </p>
      )}

      {!isLoading && !isError && displayed.length === 0 && (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-8 text-center">
          <p className="text-2xl">📅</p>
          <p className="mt-2 text-sm text-ink/50">
            {tab === "upcoming"
              ? isOwner
                ? "No upcoming events. Schedule one above!"
                : "No upcoming events scheduled yet."
              : "No past events."}
          </p>
        </div>
      )}

      {!isLoading && !isError && displayed.length > 0 && (
        <ul className="space-y-3">
          {displayed.map((event) => (
            <li key={event.id}>
              <EventCard
                event={event}
                isOwner={isOwner}
                onDelete={deleteEvent}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
