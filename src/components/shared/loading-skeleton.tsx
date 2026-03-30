import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function HerbCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl p-4 ring-1 ring-foreground/10",
        className
      )}
    >
      {/* Category badge */}
      <Skeleton className="h-5 w-24" />
      {/* Title */}
      <Skeleton className="h-5 w-3/4" />
      {/* Scientific name */}
      <Skeleton className="h-4 w-1/2" />
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      {/* Safety badges */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      {/* Content blocks */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      {/* Cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <HerbCardSkeleton />
        <HerbCardSkeleton />
        <HerbCardSkeleton />
      </div>
    </div>
  );
}
