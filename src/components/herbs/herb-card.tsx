import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          "h-full transition-all hover:shadow-md group-hover:border-primary/30",
          className
        )}
      >
        <CardHeader>
          <div className="mb-1">
            {herb.herb_categories?.name && (
              <Badge variant="secondary" className="text-xs">
                {herb.herb_categories.name}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {herb.name}
          </CardTitle>
          <p className="text-sm italic text-muted-foreground">
            {herb.scientific_name}
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {herb.description}
          </p>
          <HerbSafetyBadges
            pregnancySafe={herb.pregnancy_safe}
            nursingSafe={herb.nursing_safe}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
