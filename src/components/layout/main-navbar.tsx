"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Leaf,
  Menu,
  Calculator,
  MessageCircle,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MissionModal } from "@/components/donations/mission-modal";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/herbs", label: "Herbs", icon: Leaf },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/pharmacist", label: "Herbalist", icon: MessageCircle },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function MainNavbar() {
  const [open, setOpen] = useState(false);
  const [showMission, setShowMission] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Leaf className="size-5" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Herb<span className="gradient-text">a</span>Life
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <button
              onClick={() => setShowMission(true)}
              className="group relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105"
            >
              <Heart className="size-4 fill-white group-hover:animate-pulse" />
              <span>Support</span>
            </button>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l border-border/50">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-600 text-white">
                    <Leaf className="size-4" />
                  </div>
                  Herb-a-Life
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pt-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowMission(true);
                    }}
                    className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
                  >
                    <Heart className="size-4 fill-white" />
                    Support Herb-a-Life
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Mission Modal */}
      <MissionModal open={showMission} onOpenChange={setShowMission} />
    </>
  );
}