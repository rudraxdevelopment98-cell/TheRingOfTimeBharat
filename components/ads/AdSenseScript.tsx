"use client";

import Script from "next/script";

/**
 * Loads the Google AdSense loader script once per page.
 *
 * MOUNT THIS IN `app/layout.tsx` (root layout, inside <body>) so every route
 * that renders an <AdSlot> has the loader available. It renders null when
 * NEXT_PUBLIC_ADSENSE_CLIENT is unset, so it is safe to mount unconditionally.
 */
export default function AdSenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <Script
      id="adsbygoogle-loader"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        client
      )}`}
    />
  );
}
