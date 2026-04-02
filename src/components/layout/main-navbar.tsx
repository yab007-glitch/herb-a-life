"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Leaf,
  Menu,
  Calculator,
  MessageCircle,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";

const navLinks = [
  { href: "/herbs", label: "Herbs", icon: Leaf },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/pharmacist", label: "Herbalist", icon: MessageCircle },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

type NavUser = { email: string; name: string } | null;

export function MainNavbar({ user }: { user?: NavUser }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="size-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Herb-a-Life</span>
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
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 dark:hover:bg-pink-950/30"
            render={<Link href="/donate" />}
          >
            <Heart className="size-4" />
            Donate
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar size="default">
                  <AvatarFallback>
                    {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <DropdownMenuItem render={<button type="submit" className="w-full" />}>
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" render={<Link href="/login" />}>
              <LogIn className="size-4" />
              Login
            </Button>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Leaf className="size-5 text-primary" />
                Herb-a-Life
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pt-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-pink-600 transition-colors hover:bg-pink-50 dark:hover:bg-pink-950/30"
              >
                <Heart className="size-4" />
                Donate
              </Link>
              <div className="mt-4 border-t pt-4">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-3 py-1">
                      <User className="size-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                    <form action={logout}>
                      <Button variant="outline" size="sm" type="submit" className="w-full">
                        <LogOut className="size-4" />
                        Log out
                      </Button>
                    </form>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="w-full"
                    render={<Link href="/login" />}
                    onClick={() => setOpen(false)}
                  >
                    <LogIn className="size-4" />
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
