import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import AdSenseScript from "@/components/ads/AdSenseScript";

export const metadata: Metadata = {
  title: {
    default: "Bibliosphere — All the world's knowledge, between two covers.",
    template: "%s | Bibliosphere",
  },
  description:
    "A universal book platform — every book, every language, every era. Collections, AI summarisation, knowledge graph, and civilisation-scale discovery.",
  keywords: ["books", "library", "literature", "knowledge", "reading"],
  authors: [{ name: "Bibliosphere" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bibliosphere.app",
    siteName: "Bibliosphere",
    title: "Bibliosphere — All the world's knowledge, between two covers.",
    description: "A digital Library of Alexandria where all human literary knowledge is interconnected.",
  },
};

// Runs synchronously before first paint so the correct theme class is on
// <html> from the very first frame — no flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var c=document.documentElement.classList;c.toggle('dark',d);c.toggle('light',!d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <I18nProvider>{children}</I18nProvider>
          </ThemeProvider>
        </AuthProvider>
        <AdSenseScript />
      </body>
    </html>
  );
}
