"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/herbs", label: "Herbs" },
  { href: "/calculator", label: "Calculator" },
  { href: "/pharmacist", label: "Herbalist" },
  { href: "/about", label: "About" },
];

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" render={<Link href="/login" />}>
            Sign In
          </Button>
          <Button size="sm" className="shadow-sm" render={<Link href="/register" />}>
            Get Started
          </Button>
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-2 border-t pt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  render={<Link href="/login" />}
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full"
                  render={<Link href="/register" />}
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}