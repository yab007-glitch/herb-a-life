import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HerbCard } from "@/components/herbs/herb-card";
import { getHerbs, getHerbCategories } from "@/lib/actions/herbs";

export const metadata: Metadata = {
  title: "Medicinal Herbs Database",
  description:
    "Browse our comprehensive database of 500+ medicinal herbs with detailed profiles, active compounds, and drug interactions.",
};

export default async function HerbsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const page = parseInt(params.page || "1", 10);

  const [herbsResult, categoriesResult] = await Promise.all([
    getHerbs({ query, category, page }),
    getHerbCategories(),
  ]);

  const herbs = herbsResult.success ? herbsResult.data!.herbs : [];
  const total = herbsResult.success ? herbsResult.data!.total : 0;
  const categories = categoriesResult.success ? categoriesResult.data! : [];
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Medicinal Herbs Database
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our comprehensive collection of {total} medicinal herbs with
          detailed profiles, active compounds, and safety information.
        </p>
      </div>

      {/* Search */}
      <form className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          defaultValue={query}
          placeholder="Search by herb name, symptom, or disease (e.g. headache, anxiety, diabetes)..."
          className="pl-10"
        />
        {category && <input type="hidden" name="category" value={category} />}
      </form>

      {/* Symptom Quick Search */}
      {!query && !category && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Common symptoms:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "headache",
              "anxiety",
              "insomnia",
              "inflammation",
              "digestive",
              "diabetes",
              "pain",
              "cough",
              "fever",
              "skin conditions",
              "hypertension",
              "fatigue",
            ].map((symptom) => (
              <Link key={symptom} href={`/herbs?q=${encodeURIComponent(symptom)}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer transition-colors hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950/30"
                >
                  {symptom}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href="/herbs">
          <Badge
            variant={!category ? "default" : "outline"}
            className="cursor-pointer"
          >
            All
          </Badge>
        </Link>
        {categories.map((cat: { slug: string; name: string }) => (
          <Link
            key={cat.slug}
            href={`/herbs?category=${cat.slug}${query ? `&q=${query}` : ""}`}
          >
            <Badge
              variant={category === cat.slug ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-muted"
            >
              {cat.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Search Results Label */}
      {query && herbs.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Found <span className="font-medium text-foreground">{total}</span> herb{total !== 1 ? "s" : ""} matching &quot;{query}&quot;
        </p>
      )}

      {/* Herbs Grid */}
      {herbs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {herbs.map((herb) => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            No herbs found{query ? ` for "${query}"` : ""}.
          </p>
          <p className="text-sm text-muted-foreground">
            Try searching for a symptom like &quot;headache&quot;, &quot;anxiety&quot;, or &quot;inflammation&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["headache", "anxiety", "insomnia", "pain", "cough", "diabetes"].map(
              (s) => (
                <Link key={s} href={`/herbs?q=${s}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-green-50 hover:border-green-300">
                    {s}
                  </Badge>
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            render={
              page > 1 ? (
                <Link
                  href={`/herbs?page=${page - 1}${query ? `&q=${query}` : ""}${category ? `&category=${category}` : ""}`}
                />
              ) : undefined
            }
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            render={
              page < totalPages ? (
                <Link
                  href={`/herbs?page=${page + 1}${query ? `&q=${query}` : ""}${category ? `&category=${category}` : ""}`}
                />
              ) : undefined
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
