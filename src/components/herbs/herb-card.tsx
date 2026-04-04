import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HerbSafetyBadges } from "@/components/herbs/herb-safety-badges";
import { cn } from "@/lib/utils";

interface HerbCardProps {
  herb: {
    id: string;
    name: string;
    scientific_name: string;
    slug: string;
    description: string;
    pregnancy_safe: boolean;
    nursing_safe: boolean;
    herb_categories?: { name: string } | null;
  };
  className?: string;
}

export function HerbCard({ herb, className }: HerbCardProps) {
  return (
    <Link href={`/herbs/${herb.slug}`} className="group">
      <Card
        className={cn(
          "relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50",
          className
        )}
      >
        {/* Gradient accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-teal-500 to-cyan-500" />
        
        <CardContent className="p-5">
          {/* Category Badge */}
          <div className="mb-3">
            {herb.herb_categories?.name ? (
              <Badge variant="secondary" className="text-xs font-medium">
                {herb.herb_categories.name}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                <Leaf className="mr-1 size-3" />
                Herb
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {herb.name}
          </h3>
          <p className="mb-3 text-sm italic text-muted-foreground">
            {herb.scientific_name}
          </p>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {herb.description}
          </p>

          {/* Safety Badges */}
          <div className="flex items-center justify-between">
            <HerbSafetyBadges
              pregnancySafe={herb.pregnancy_safe}
              nursingSafe={herb.nursing_safe}
            />
            <ArrowRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}