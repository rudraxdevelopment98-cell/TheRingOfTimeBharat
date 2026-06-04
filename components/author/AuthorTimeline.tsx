interface TimelineEvent {
  year: number | string;
  label: string;
  type?: "birth" | "work" | "death" | "event";
}

interface AuthorTimelineProps {
  events: TimelineEvent[];
}

const DOT_COLOR: Record<NonNullable<TimelineEvent["type"]>, string> = {
  birth: "var(--accent-gold)",
  work: "var(--accent-primary)",
  death: "var(--text-faint)",
  event: "var(--accent-secondary)",
};

export function AuthorTimeline({ events }: AuthorTimelineProps) {
  return (
    <ol className="relative ml-3">
      <div
        className="absolute left-0 top-1 bottom-1 w-px"
        style={{ backgroundColor: "var(--border)" }}
        aria-hidden
      />
      {events.map((event, i) => {
        const color = DOT_COLOR[event.type ?? "event"];
        return (
          <li key={`${event.year}-${i}`} className="relative pl-8 pb-8 last:pb-0">
            <span
              className="absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full ring-4"
              style={{
                backgroundColor: color,
                // ring color blends the dot into the page background
                ["--tw-ring-color" as string]: "var(--bg-base)",
              }}
              aria-hidden
            />
            <div
              className="text-lg font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
            >
              {event.year}
            </div>
            <div
              className="text-sm mt-0.5"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
            >
              {event.label}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
