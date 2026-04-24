/**
 * icalGenerator.ts
 *
 * Generates RFC 5545-compliant iCalendar (.ics) strings entirely client-side.
 * No external dependencies required.
 */

export type RecurrenceRule = "DAILY" | "WEEKLY" | "MONTHLY" | "NONE";

export interface ICalEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  url?: string;
  /** ISO 8601 string */
  startIso: string;
  /** ISO 8601 string */
  endIso: string;
  /** IANA timezone name, e.g. "America/New_York" */
  timezone: string;
  recurrence?: RecurrenceRule;
  /** How many times to repeat (only used when recurrence !== "NONE") */
  recurrenceCount?: number;
  organizer?: { name: string; email: string };
}

/** Format a Date to iCal DTSTART/DTEND with TZID */
function formatDt(iso: string, timezone: string): string {
  // Convert to local time in the given timezone using Intl
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}${get("month")}${get("day")}T${get("hour")}${get("minute")}${get("second")}`;
}

/** Fold long lines per RFC 5545 (max 75 octets) */
function fold(line: string): string {
  const chunks: string[] = [];
  while (line.length > 75) {
    chunks.push(line.slice(0, 75));
    line = " " + line.slice(75);
  }
  chunks.push(line);
  return chunks.join("\r\n");
}

function escape(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Generate a single VEVENT block */
function buildVEvent(event: ICalEvent): string {
  const now = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const lines: string[] = [
    "BEGIN:VEVENT",
    fold(`UID:${event.uid}`),
    fold(`DTSTAMP:${now}`),
    fold(`DTSTART;TZID=${event.timezone}:${formatDt(event.startIso, event.timezone)}`),
    fold(`DTEND;TZID=${event.timezone}:${formatDt(event.endIso, event.timezone)}`),
    fold(`SUMMARY:${escape(event.summary)}`),
  ];

  if (event.description) lines.push(fold(`DESCRIPTION:${escape(event.description)}`));
  if (event.location) lines.push(fold(`LOCATION:${escape(event.location)}`));
  if (event.url) lines.push(fold(`URL:${escape(event.url)}`));
  if (event.organizer) {
    lines.push(
      fold(`ORGANIZER;CN=${escape(event.organizer.name)}:mailto:${event.organizer.email}`),
    );
  }

  if (event.recurrence && event.recurrence !== "NONE") {
    const count = event.recurrenceCount ?? 10;
    lines.push(fold(`RRULE:FREQ=${event.recurrence};COUNT=${count}`));
  }

  lines.push("END:VEVENT");
  return lines.join("\r\n");
}

/** Build a full .ics file string for one or more events */
export function generateICalString(events: ICalEvent[]): string {
  const vevents = events.map(buildVEvent).join("\r\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Stellar Tip Jar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    vevents,
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Trigger a browser download of an .ics file */
export function downloadICalFile(events: ICalEvent[], filename = "event.ics"): void {
  const content = generateICalString(events);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Build a Google Calendar "Add to Calendar" URL */
export function googleCalendarUrl(event: ICalEvent): string {
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.summary,
    dates: `${fmt(event.startIso)}/${fmt(event.endIso)}`,
    details: event.description ?? "",
    location: event.location ?? "",
    ctz: event.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Build an Outlook Web "Add to Calendar" URL */
export function outlookCalendarUrl(event: ICalEvent): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.summary,
    startdt: event.startIso,
    enddt: event.endIso,
    body: event.description ?? "",
    location: event.location ?? "",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/** List of common IANA timezone names for the scheduler UI */
export const COMMON_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];
