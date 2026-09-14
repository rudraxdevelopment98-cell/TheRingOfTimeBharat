"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export interface AdSlotProps {
  /** The AdSense ad unit id (data-ad-slot). */
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
  /** Render an "ADVERTISEMENT" caption above the unit (AdSense policy). */
  label?: boolean;
}

export default function AdSlot({
  slot,
  format = "auto",
  className,
  style,
  label = true,
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // AdSense script blocked or not yet loaded — nothing to do.
    }
  }, [client]);

  const caption = label ? (
    <p
      className="mb-1.5 text-center text-[10px] uppercase tracking-widest"
      style={{ color: "var(--text-faint)", fontFamily: "var(--font-dm-sans)" }}
    >
      Advertisement
    </p>
  ) : null;

  // Dev / unconfigured: show a labelled placeholder so layouts read correctly.
  if (!client) {
    return (
      <div className={className} style={style}>
        {caption}
        <div
          className="flex min-h-[90px] items-center justify-center rounded-xl px-4 py-6"
          style={{
            border: "1px dashed var(--border)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <span
            className="text-xs"
            style={{ color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}
          >
            Ad slot — {slot}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      {caption}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
