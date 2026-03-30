import Link from "next/link";
import { Leaf, LayoutDashboard, Pill, Users, AlertTriangle } from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/herbs", label: "Herbs", icon: Leaf },
  { href: "/admin/interactions", label: "Interactions", icon: AlertTriangle },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-card p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Herb-a-Life Admin</span>
        </div>
        <nav className="space-y-1">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
