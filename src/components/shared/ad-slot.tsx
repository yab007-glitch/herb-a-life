import { cn } from "@/lib/utils";

interface AdSlotProps {
  format: "rectangle" | "horizontal" | "vertical";
  className?: string;
}

const formatStyles: Record<AdSlotProps["format"], string> = {
  rectangle: "h-[250px] w-[300px]",
  horizontal: "h-[90px] w-full",
  vertical: "h-[600px] w-[160px]",
};

export function AdSlot({ format, className }: AdSlotProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30 text-xs font-medium text-muted-foreground/40",
        formatStyles[format],
        className
      )}
    >
      Ad
    </div>
  );
}
