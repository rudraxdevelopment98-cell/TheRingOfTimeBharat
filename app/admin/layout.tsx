import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminSubNav } from "@/components/admin/AdminSubNav";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/books", label: "Books" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/authors", label: "Authors" },
  { href: "/admin/import", label: "Import" },
  { href: "/admin/ai-queue", label: "AI Queue" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminSubNav links={adminLinks} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
