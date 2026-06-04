"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Network, Filter, X, Info, BookOpen, User } from "lucide-react";
import {
  KnowledgeGraph,
  type GraphNode,
  type GraphLink,
  type GraphNodeType,
} from "@/components/graph/KnowledgeGraph";
import { GraphLegend } from "@/components/graph/GraphLegend";

// ---------------------------------------------------------------------------
// Sample dataset: a constellation of Western intellectual influence.
// Each node optionally carries an `era` used by the era filter.
// ---------------------------------------------------------------------------
type Era =
  | "Ancient"
  | "Medieval"
  | "Enlightenment"
  | "Modern"
  | "Contemporary";

interface SampleNode extends GraphNode {
  era?: Era;
  slug?: string;
}

const NODES: SampleNode[] = [
  // Ancient
  { id: "plato", label: "Plato", type: "PERSON", era: "Ancient", slug: "plato" },
  { id: "aristotle", label: "Aristotle", type: "PERSON", era: "Ancient", slug: "aristotle" },
  { id: "socrates", label: "Socrates", type: "PERSON", era: "Ancient", slug: "socrates" },
  { id: "epictetus", label: "Epictetus", type: "PERSON", era: "Ancient", slug: "epictetus" },
  { id: "seneca", label: "Seneca", type: "PERSON", era: "Ancient", slug: "seneca" },
  { id: "marcus", label: "Marcus Aurelius", type: "PERSON", era: "Ancient", slug: "marcus-aurelius" },
  { id: "stoicism", label: "Stoicism", type: "MOVEMENT", era: "Ancient" },
  { id: "republic", label: "The Republic", type: "BOOK", era: "Ancient", slug: "the-republic" },
  { id: "meditations", label: "Meditations", type: "BOOK", era: "Ancient", slug: "meditations" },
  { id: "athens", label: "Athens", type: "PLACE", era: "Ancient" },
  { id: "virtue", label: "Virtue", type: "CONCEPT", era: "Ancient" },

  // Medieval
  { id: "aquinas", label: "Thomas Aquinas", type: "PERSON", era: "Medieval", slug: "thomas-aquinas" },
  { id: "summa", label: "Summa Theologica", type: "BOOK", era: "Medieval", slug: "summa-theologica" },

  // Enlightenment
  { id: "enlightenment", label: "The Enlightenment", type: "EVENT", era: "Enlightenment" },
  { id: "kant", label: "Immanuel Kant", type: "PERSON", era: "Enlightenment", slug: "immanuel-kant" },
  { id: "freewill", label: "Free Will", type: "CONCEPT", era: "Enlightenment" },

  // Modern
  { id: "kierkegaard", label: "Kierkegaard", type: "PERSON", era: "Modern", slug: "soren-kierkegaard" },
  { id: "dostoevsky", label: "Dostoevsky", type: "PERSON", era: "Modern", slug: "fyodor-dostoevsky" },
  { id: "nietzsche", label: "Nietzsche", type: "PERSON", era: "Modern", slug: "friedrich-nietzsche" },
  { id: "zarathustra", label: "Thus Spoke Zarathustra", type: "BOOK", era: "Modern", slug: "thus-spoke-zarathustra" },

  // Contemporary
  { id: "existentialism", label: "Existentialism", type: "MOVEMENT", era: "Contemporary" },
  { id: "sartre", label: "Sartre", type: "PERSON", era: "Contemporary", slug: "jean-paul-sartre" },
  { id: "camus", label: "Camus", type: "PERSON", era: "Contemporary", slug: "albert-camus" },
  { id: "absurdism", label: "Absurdism", type: "CONCEPT", era: "Contemporary" },
  { id: "sisyphus", label: "The Myth of Sisyphus", type: "BOOK", era: "Contemporary", slug: "the-myth-of-sisyphus" },
];

const LINKS: GraphLink[] = [
  { source: "socrates", target: "plato", relation: "influenced" },
  { source: "plato", target: "aristotle", relation: "influenced" },
  { source: "plato", target: "republic", relation: "wrote" },
  { source: "plato", target: "athens", relation: "lived in" },
  { source: "socrates", target: "athens", relation: "lived in" },
  { source: "aristotle", target: "aquinas", relation: "influenced" },
  { source: "aristotle", target: "virtue", relation: "theorized" },

  { source: "stoicism", target: "epictetus", relation: "part of" },
  { source: "stoicism", target: "seneca", relation: "part of" },
  { source: "stoicism", target: "marcus", relation: "part of" },
  { source: "stoicism", target: "virtue", relation: "centered on" },
  { source: "epictetus", target: "marcus", relation: "influenced" },
  { source: "seneca", target: "marcus", relation: "contemporary of" },
  { source: "marcus", target: "meditations", relation: "wrote" },

  { source: "aquinas", target: "summa", relation: "wrote" },
  { source: "aquinas", target: "freewill", relation: "examined" },

  { source: "enlightenment", target: "kant", relation: "part of" },
  { source: "kant", target: "freewill", relation: "examined" },
  { source: "kant", target: "nietzsche", relation: "influenced" },

  { source: "kierkegaard", target: "existentialism", relation: "founded" },
  { source: "dostoevsky", target: "existentialism", relation: "influenced" },
  { source: "nietzsche", target: "existentialism", relation: "influenced" },
  { source: "kierkegaard", target: "nietzsche", relation: "contemporary of" },
  { source: "nietzsche", target: "zarathustra", relation: "wrote" },

  { source: "existentialism", target: "sartre", relation: "part of" },
  { source: "existentialism", target: "camus", relation: "associated with" },
  { source: "nietzsche", target: "camus", relation: "influenced" },
  { source: "dostoevsky", target: "camus", relation: "influenced" },
  { source: "sartre", target: "camus", relation: "contemporary of" },
  { source: "camus", target: "absurdism", relation: "developed" },
  { source: "camus", target: "sisyphus", relation: "wrote" },
  { source: "sisyphus", target: "absurdism", relation: "explores" },
  { source: "absurdism", target: "freewill", relation: "responded to" },
];

const ERAS: Era[] = ["Ancient", "Medieval", "Enlightenment", "Modern", "Contemporary"];

const TYPE_META: { type: GraphNodeType; label: string; color: string }[] = [
  { type: "BOOK", label: "Book", color: "var(--accent-primary)" },
  { type: "PERSON", label: "Person", color: "var(--accent-gold)" },
  { type: "CONCEPT", label: "Concept", color: "var(--accent-secondary)" },
  { type: "MOVEMENT", label: "Movement", color: "#7c3aed" },
  { type: "EVENT", label: "Event", color: "#b5338a" },
  { type: "PLACE", label: "Place", color: "#4a6fa5" },
];

const ALL_TYPES = TYPE_META.map((t) => t.type);

export default function GraphPage() {
  const [activeEras, setActiveEras] = useState<Set<Era>>(new Set(ERAS));
  const [activeTypes, setActiveTypes] = useState<Set<GraphNodeType>>(
    new Set(ALL_TYPES),
  );
  const [selected, setSelected] = useState<GraphNode | null>(null);

  const toggleEra = (era: Era) =>
    setActiveEras((prev) => {
      const next = new Set(prev);
      if (next.has(era)) next.delete(era);
      else next.add(era);
      return next;
    });

  const toggleType = (type: GraphNodeType) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });

  // Filter nodes by era + type, then keep only links whose endpoints survive.
  const { nodes, links } = useMemo(() => {
    const visible = NODES.filter(
      (n) =>
        activeTypes.has(n.type) && (n.era ? activeEras.has(n.era) : true),
    );
    const visibleIds = new Set(visible.map((n) => n.id));
    const filteredLinks = LINKS.filter(
      (l) => visibleIds.has(l.source) && visibleIds.has(l.target),
    );
    // Strip the extra sample fields before passing to the graph.
    const graphNodes: GraphNode[] = visible.map((n) => ({
      id: n.id,
      label: n.label,
      type: n.type,
    }));
    return { nodes: graphNodes, links: filteredLinks };
  }, [activeEras, activeTypes]);

  // Relations involving the selected node, for the info panel.
  const selectedRelations = useMemo(() => {
    if (!selected) return [];
    const byId = new Map(NODES.map((n) => [n.id, n] as const));
    const out: { other: string; relation: string; dir: "out" | "in" }[] = [];
    for (const l of LINKS) {
      if (l.source === selected.id) {
        out.push({ other: byId.get(l.target)?.label ?? l.target, relation: l.relation, dir: "out" });
      } else if (l.target === selected.id) {
        out.push({ other: byId.get(l.source)?.label ?? l.source, relation: l.relation, dir: "in" });
      }
    }
    return out;
  }, [selected]);

  const selectedMeta = selected
    ? NODES.find((n) => n.id === selected.id)
    : undefined;

  const detailHref =
    selected && selectedMeta?.slug
      ? selected.type === "BOOK"
        ? `/book/${selectedMeta.slug}`
        : selected.type === "PERSON"
          ? `/author/${selectedMeta.slug}`
          : undefined
      : undefined;

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      {/* Header strip */}
      <div
        className="border-b py-10"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Network className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--accent-gold)" }}
            >
              Knowledge Graph
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            The web of human thought
          </h1>
          <p
            className="text-base max-w-2xl"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-source-serif)" }}
          >
            Drag, zoom, and hover to trace how ideas, people, and works pulled at
            one another across the centuries. Every line is an influence; every
            node, a mind or a movement.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters column */}
          <aside className="space-y-5">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                <p
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Eras
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {ERAS.map((era) => {
                  const on = activeEras.has(era);
                  return (
                    <button
                      key={era}
                      onClick={() => toggleEra(era)}
                      className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                      style={{
                        borderColor: on ? "var(--accent-primary)" : "var(--border)",
                        backgroundColor: on ? "var(--accent-primary)" : "transparent",
                        color: on ? "#ffffff" : "var(--text-muted)",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {era}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <p
                className="text-xs uppercase tracking-widest font-medium mb-3"
                style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
              >
                Node types
              </p>
              <ul className="space-y-1.5">
                {TYPE_META.map((t) => {
                  const on = activeTypes.has(t.type);
                  return (
                    <li key={t.type}>
                      <button
                        onClick={() => toggleType(t.type)}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-opacity"
                        style={{ opacity: on ? 1 : 0.4 }}
                      >
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: t.color }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}
                        >
                          {t.label}
                        </span>
                        {!on && (
                          <X className="h-3 w-3 ml-auto" style={{ color: "var(--text-faint)" }} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <GraphLegend />

            {/* Selected node info card */}
            {selected ? (
              <div
                className="rounded-xl border p-4"
                style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {selected.type === "BOOK" ? (
                      <BookOpen className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                    ) : selected.type === "PERSON" ? (
                      <User className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
                    ) : (
                      <Info className="h-4 w-4" style={{ color: "var(--accent-secondary)" }} />
                    )}
                    <span
                      className="text-[10px] uppercase tracking-widest font-medium"
                      style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      {selected.type}
                    </span>
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Close">
                    <X className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
                  </button>
                </div>
                <p
                  className="text-lg font-light mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                >
                  {selected.label}
                </p>
                {selectedRelations.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {selectedRelations.map((r, i) => (
                      <li
                        key={i}
                        className="text-xs"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                      >
                        <span style={{ color: "var(--accent-primary)" }}>
                          {r.dir === "out" ? r.relation : `← ${r.relation}`}
                        </span>{" "}
                        <span style={{ color: "var(--text-primary)" }}>{r.other}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {detailHref && (
                  <Link
                    href={detailHref}
                    className="inline-flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    View details
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            ) : (
              <div
                className="rounded-xl border border-dashed p-4 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
              >
                Click any node to inspect its connections.
              </div>
            )}
          </aside>

          {/* Canvas */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            <KnowledgeGraph
              nodes={nodes}
              links={links}
              height={620}
              onNodeClick={(n) => setSelected(n)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
