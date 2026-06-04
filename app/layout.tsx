import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
