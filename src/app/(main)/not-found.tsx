import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
        <AlertCircle className="size-10 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-4xl font-bold text-foreground">404</h1>
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/" />}>
          <Home className="mr-2 size-4" />
          Go Home
        </Button>
        <Button variant="outline" render={<Link href="/herbs" />}>
          <ArrowLeft className="mr-2 size-4" />
          Browse Herbs
        </Button>
      </div>
    </div>
  );
}
