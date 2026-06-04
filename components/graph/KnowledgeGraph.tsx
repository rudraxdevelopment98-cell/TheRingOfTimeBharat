"use client";

import { useEffect, useRef } from "react";

export type GraphNodeType =
  | "BOOK"
  | "PERSON"
  | "CONCEPT"
  | "MOVEMENT"
  | "EVENT"
  | "PLACE";

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
}

export interface GraphLink {
  source: string;
  target: string;
  relation: string;
}

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  height?: number;
  onNodeClick?: (node: GraphNode) => void;
}

// Internal simulation node carrying physics state.
interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
}

interface SimLink {
  source: SimNode;
  target: SimNode;
  relation: string;
}

// Colors that are NOT derived from CSS variables (fixed per spec).
const FIXED_TYPE_COLORS: Partial<Record<GraphNodeType, string>> = {
  MOVEMENT: "#7c3aed",
  EVENT: "#b5338a",
  PLACE: "#4a6fa5",
};

interface ThemeColors {
  border: string;
  textPrimary: string;
  textFaint: string;
  accentPrimary: string;
  accentSecondary: string;
  accentGold: string;
}

function readThemeColors(): ThemeColors {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim() || fallback;
  return {
    border: v("--border", "#d4c9b0"),
    textPrimary: v("--text-primary", "#1a1208"),
    textFaint: v("--text-faint", "#a8957a"),
    accentPrimary: v("--accent-primary", "#8b4513"),
    accentSecondary: v("--accent-secondary", "#2c5f2e"),
    accentGold: v("--accent-gold", "#c9a84c"),
  };
}

function colorForType(type: GraphNodeType, theme: ThemeColors): string {
  switch (type) {
    case "BOOK":
      return theme.accentPrimary;
    case "PERSON":
      return theme.accentGold;
    case "CONCEPT":
      return theme.accentSecondary;
    default:
      return FIXED_TYPE_COLORS[type] ?? theme.accentPrimary;
  }
}

const NODE_RADIUS = 9;

export function KnowledgeGraph({
  nodes,
  links,
  height = 600,
  onNodeClick,
}: KnowledgeGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep the latest click handler without restarting the simulation.
  const onNodeClickRef = useRef(onNodeClick);
  onNodeClickRef.current = onNodeClick;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let theme = readThemeColors();

    // ---- Build simulation graph ----
    const nodeById = new Map<string, SimNode>();
    const simNodes: SimNode[] = nodes.map((n, i) => {
      const angle = (i / Math.max(1, nodes.length)) * Math.PI * 2;
      const r = 200;
      const sn: SimNode = {
        ...n,
        x: Math.cos(angle) * r + (Math.random() - 0.5) * 20,
        y: Math.sin(angle) * r + (Math.random() - 0.5) * 20,
        vx: 0,
        vy: 0,
        pinned: false,
      };
      nodeById.set(n.id, sn);
      return sn;
    });

    const simLinks: SimLink[] = [];
    for (const l of links) {
      const s = nodeById.get(l.source);
      const t = nodeById.get(l.target);
      if (s && t) simLinks.push({ source: s, target: t, relation: l.relation });
    }

    // Adjacency for hover highlighting.
    const neighbors = new Map<string, Set<string>>();
    for (const n of simNodes) neighbors.set(n.id, new Set());
    for (const l of simLinks) {
      neighbors.get(l.source.id)!.add(l.target.id);
      neighbors.get(l.target.id)!.add(l.source.id);
    }

    // ---- View transform (pan + zoom) ----
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    // CSS pixel size of the canvas.
    let cssW = container.clientWidth || 800;
    let cssH = height;

    function resize() {
      if (!container || !canvas || !ctx) return;
      cssW = container.clientWidth || 800;
      cssH = container.clientHeight || height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    // Re-read colors if the html class (theme) changes.
    const mo = new MutationObserver(() => {
      theme = readThemeColors();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // ---- Coordinate helpers ----
    // World coords are centered at (0,0) ~ canvas center. Screen = center + offset + world*scale.
    const toScreen = (wx: number, wy: number) => ({
      x: cssW / 2 + offsetX + wx * scale,
      y: cssH / 2 + offsetY + wy * scale,
    });
    const toWorld = (sx: number, sy: number) => ({
      x: (sx - cssW / 2 - offsetX) / scale,
      y: (sy - cssH / 2 - offsetY) / scale,
    });

    function nodeAt(sx: number, sy: number): SimNode | null {
      const w = toWorld(sx, sy);
      const hitR = (NODE_RADIUS + 4) / scale;
      // Iterate backwards so topmost (last drawn) wins.
      for (let i = simNodes.length - 1; i >= 0; i--) {
        const n = simNodes[i];
        const dx = n.x - w.x;
        const dy = n.y - w.y;
        if (dx * dx + dy * dy <= hitR * hitR) return n;
      }
      return null;
    }

    // ---- Interaction state ----
    let hoverNode: SimNode | null = null;
    let dragNode: SimNode | null = null;
    let panning = false;
    let lastPX = 0;
    let lastPY = 0;
    let downX = 0;
    let downY = 0;
    let moved = false;

    function localPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onPointerDown(e: PointerEvent) {
      const p = localPointer(e);
      downX = p.x;
      downY = p.y;
      moved = false;
      canvas!.setPointerCapture(e.pointerId);
      const hit = nodeAt(p.x, p.y);
      if (hit) {
        dragNode = hit;
        dragNode.pinned = true;
      } else {
        panning = true;
      }
      lastPX = p.x;
      lastPY = p.y;
    }

    function onPointerMove(e: PointerEvent) {
      const p = localPointer(e);
      const dx = p.x - lastPX;
      const dy = p.y - lastPY;
      if (Math.abs(p.x - downX) > 3 || Math.abs(p.y - downY) > 3) moved = true;

      if (dragNode) {
        const w = toWorld(p.x, p.y);
        dragNode.x = w.x;
        dragNode.y = w.y;
        dragNode.vx = 0;
        dragNode.vy = 0;
      } else if (panning) {
        offsetX += dx;
        offsetY += dy;
      } else {
        hoverNode = nodeAt(p.x, p.y);
        canvas!.style.cursor = hoverNode ? "pointer" : "grab";
      }
      lastPX = p.x;
      lastPY = p.y;
    }

    function onPointerUp(e: PointerEvent) {
      const p = localPointer(e);
      if (dragNode) {
        dragNode.pinned = false;
        if (!moved) {
          onNodeClickRef.current?.({
            id: dragNode.id,
            label: dragNode.label,
            type: dragNode.type,
          });
        }
      }
      dragNode = null;
      panning = false;
      hoverNode = nodeAt(p.x, p.y);
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const before = toWorld(sx, sy);
      const factor = Math.exp(-e.deltaY * 0.0015);
      scale = Math.min(4, Math.max(0.2, scale * factor));
      // Keep cursor anchored: adjust offset so world point under cursor stays put.
      const after = toScreen(before.x, before.y);
      offsetX += sx - after.x;
      offsetY += sy - after.y;
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.style.cursor = "grab";

    // ---- Force simulation ----
    const REPULSION = 5200;
    const MAX_REP_FORCE = 280;
    const SPRING_K = 0.012;
    const TARGET_DIST = 110;
    const CENTER_K = 0.006;
    const DAMPING = 0.85;
    const MAX_VEL = 18;
    const DT = 0.7;

    function step() {
      const N = simNodes.length;
      // Repulsion (O(n^2), fine for small graphs).
      for (let i = 0; i < N; i++) {
        const a = simNodes[i];
        for (let j = i + 1; j < N; j++) {
          const b = simNodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 0.01) {
            dx = (Math.random() - 0.5) * 0.5;
            dy = (Math.random() - 0.5) * 0.5;
            d2 = dx * dx + dy * dy + 0.01;
          }
          const d = Math.sqrt(d2);
          let f = REPULSION / d2;
          if (f > MAX_REP_FORCE) f = MAX_REP_FORCE;
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          a.vx += fx * 0.01;
          a.vy += fy * 0.01;
          b.vx -= fx * 0.01;
          b.vy -= fy * 0.01;
        }
      }

      // Spring attraction along links.
      for (const l of simLinks) {
        const a = l.source;
        const b = l.target;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const disp = d - TARGET_DIST;
        const f = SPRING_K * disp;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      // Centering + integrate.
      for (const n of simNodes) {
        n.vx += -n.x * CENTER_K;
        n.vy += -n.y * CENTER_K;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        // Clamp velocity.
        if (n.vx > MAX_VEL) n.vx = MAX_VEL;
        else if (n.vx < -MAX_VEL) n.vx = -MAX_VEL;
        if (n.vy > MAX_VEL) n.vy = MAX_VEL;
        else if (n.vy < -MAX_VEL) n.vy = -MAX_VEL;
        if (n.pinned) {
          n.vx = 0;
          n.vy = 0;
          continue;
        }
        n.x += n.vx * DT;
        n.y += n.vy * DT;
      }
    }

    // ---- Render ----
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, cssW, cssH);

      const highlightId = hoverNode ? hoverNode.id : null;
      const hl = highlightId ? neighbors.get(highlightId)! : null;

      // Links.
      ctx.lineWidth = 1;
      for (const l of simLinks) {
        const s = toScreen(l.source.x, l.source.y);
        const t = toScreen(l.target.x, l.target.y);
        const active =
          !highlightId ||
          l.source.id === highlightId ||
          l.target.id === highlightId;
        ctx.globalAlpha = active ? 0.9 : 0.12;
        ctx.strokeStyle = theme.border;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();

        // Relation label at midpoint (only when zoomed enough or highlighted).
        if ((scale > 0.75 || active) && (active || !highlightId)) {
          ctx.globalAlpha = active ? 0.7 : 0.08;
          ctx.fillStyle = theme.textFaint;
          ctx.font = "10px var(--font-fira-code), monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(l.relation, (s.x + t.x) / 2, (s.y + t.y) / 2);
        }
      }

      // Nodes.
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const n of simNodes) {
        const p = toScreen(n.x, n.y);
        const isHover = n.id === highlightId;
        const isNeighbor = hl ? hl.has(n.id) : false;
        const dim = highlightId && !isHover && !isNeighbor;
        ctx.globalAlpha = dim ? 0.2 : 1;

        const color = colorForType(n.type, theme);
        const r = isHover ? NODE_RADIUS + 3 : NODE_RADIUS;

        if (isHover) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.18;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = theme.border;
        ctx.stroke();

        // Label.
        ctx.globalAlpha = dim ? 0.25 : 1;
        ctx.fillStyle = theme.textPrimary;
        ctx.font = `${isHover ? "600 " : ""}12px var(--font-dm-sans), sans-serif`;
        ctx.fillText(n.label, p.x, p.y + r + 4);
      }
      ctx.globalAlpha = 1;
    }

    let raf = 0;
    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
    };
    // Re-init whenever the dataset changes.
  }, [nodes, links, height]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height, position: "relative", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", touchAction: "none" }} />
    </div>
  );
}
