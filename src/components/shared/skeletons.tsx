import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("border-border/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Skeleton className="size-10 rounded-lg" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="mt-2 h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24" />
      </CardContent>
    </Card>
  );
}

export function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function ChatSkeleton({ messages = 3 }: { messages?: number }) {
  return (
    <div className="flex h-[60vh] flex-col">
      <div className="flex-1 space-y-4 p-4">
        {Array.from({ length: messages }).map((_, i) => (
          <div
            key={i}
            className={cn("flex", i % 2 === 0 ? "justify-start" : "justify-end")}
          >
            <div className={cn("space-y-2", i % 2 === 0 ? "w-3/4" : "w-1/2")}>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
}

export function CardGridSkeleton({
  count = 4,
  columns = "sm:grid-cols-2",
}: {
  count?: number;
  columns?: string;
}) {
  return (
    <div className={cn("grid gap-5", columns)}>
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}
