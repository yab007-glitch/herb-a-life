"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  Search,
  MessageCircle,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Herbs", href: "/herbs", icon: Leaf },
  { label: "Search", href: "/herbs?focus=search", icon: Search },
  { label: "Chat", href: "/pharmacist", icon: MessageCircle },
  { label: "Calc", href: "/calculator", icon: Calculator },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/herbs?focus=search") {
    return false;
  }
  if (href === "/herbs") {
    return pathname === "/herbs" || pathname.startsWith("/herbs/");
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-background/95 backdrop-blur-lg border-t",
        "pb-[env(safe-area-inset-bottom)]"
      )}
    >
      <div className="flex items-center justify-around px-1 h-14">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full",
                "transition-colors duration-200",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative flex flex-col items-center">
                <Icon className="size-5" />
                <span className="text-[10px] font-medium mt-0.5">
                  {tab.label}
                </span>
                <span
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2",
                    "size-1 rounded-full bg-primary",
                    "transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
