import Link from "next/link";
import { Leaf } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-50/50 to-background px-4 py-12 dark:from-green-950/10">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="size-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Herb-a-Life</span>
        </Link>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
