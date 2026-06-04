import type { GraphNodeType } from "./KnowledgeGraph";

const LEGEND: { type: GraphNodeType; label: string; color: string }[] = [
  { type: "BOOK", label: "Book", color: "var(--accent-primary)" },
  { type: "PERSON", label: "Person", color: "var(--accent-gold)" },
  { type: "CONCEPT", label: "Concept", color: "var(--accent-secondary)" },
  { type: "MOVEMENT", label: "Movement", color: "#7c3aed" },
  { type: "EVENT", label: "Event", color: "#b5338a" },
  { type: "PLACE", label: "Place", color: "#4a6fa5" },
];

export function GraphLegend() {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <p
        className="text-xs uppercase tracking-widest font-medium mb-3"
        style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
      >
        Legend
      </p>
      <ul className="space-y-2">
        {LEGEND.map((item) => (
          <li key={item.type} className="flex items-center gap-2.5">
            <span
              className="h-3 w-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
