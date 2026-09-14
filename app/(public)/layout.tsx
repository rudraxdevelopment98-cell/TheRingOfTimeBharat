import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// I18nProvider is mounted in the root layout (app/layout.tsx) so that /admin
// routes, which also render the Navbar, get the same locale context.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
