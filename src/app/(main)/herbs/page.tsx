import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HerbCard } from "@/components/herbs/herb-card";
import { SmartSearch } from "@/components/herbs/smart-search";
import { SurpriseMeButton } from "@/components/herbs/surprise-me-button";
import { EmptyState } from "@/components/shared/empty-state";
import {
  getHerbs,
  getHerbCategories,
  getSymptomCounts,
} from "@/lib/actions/herbs";
import { Flame } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Medicinal Herbs Database",
  description:
    "Browse our comprehensive database of 2,700+ medicinal herbs with detailed profiles, active compounds, and drug interactions.",
};

// JSON-LD structured data for the herbs page
interface HerbForSchema {
  name: string;
  scientific_name: string;
  description: string;
  slug: string;
}

function generateStructuredData(herbs: HerbForSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: herbs.map((herb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MedicalWebPage",
        name: herb.name,
        alternateName: herb.scientific_name,
        description: herb.description,
        url: `https://herbally.app/herbs/${herb.slug || ""}`,
      },
    })),
  };
}

export default async function HerbsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const page = parseInt(params.page || "1", 10);

  const symptoms = [
    "headache",
    "anxiety",
    "insomnia",
    "inflammation",
    "digestive",
    "diabetes",
    "pain",
    "cough",
    "fever",
    "skin",
    "hypertension",
    "fatigue",
  ];

  const [herbsResult, categoriesResult, countsResult] = await Promise.all([
    getHerbs({ query, category, page }),
    getHerbCategories(),
    !query && !category
      ? getSymptomCounts(symptoms)
      : Promise.resolve({ success: false as const, data: undefined }),
  ]);

  const herbs = herbsResult.success ? herbsResult.data!.herbs : [];
  const total = herbsResult.success ? herbsResult.data!.total : 0;
  const categories = categoriesResult.success ? categoriesResult.data! : [];
  const symptomCounts =
    countsResult.success && countsResult.data
      ? countsResult.data
      : ({} as Record<string, number>);
  const totalPages = Math.ceil(total / 20);

  const structuredData = generateStructuredData(herbs);

  return (
    <div className="space-y-8">
      <Script
        id="herbs-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Medicinal Herbs Database
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore{" "}
          <span className="font-semibold text-foreground">
            {total.toLocaleString()}
          </span>{" "}
          herbs with detailed profiles, active compounds, and safety
          information.
        </p>
      </div>

      {/* Smart Search */}
      <SmartSearch defaultValue={query} category={category} />

      {/* Popular Searches & Symptom Tags */}
      {!query && !category && (
        <div className="space-y-5">
          {/* Popular searches */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-orange-500" />
              <p className="text-sm font-medium text-foreground">
                Popular Searches
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { term: "turmeric", label: "Turmeric" },
                { term: "chamomile", label: "Chamomile" },
                { term: "ginger", label: "Ginger" },
                { term: "lavender", label: "Lavender" },
                { term: "echinacea", label: "Echinacea" },
              ].map((item) => (
                <Link
                  key={item.term}
                  href={`/herbs?q=${encodeURIComponent(item.term)}`}
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1 transition-all hover:bg-primary/10 hover:text-primary"
                  >
                    <Flame className="size-3 text-orange-400" />
                    {item.label}
                  </Badge>
                </Link>
              ))}
              <SurpriseMeButton totalHerbs={total} />
            </div>
          </div>

          {/* Symptom tags */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Search by symptom:
            </p>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => {
                const count = symptomCounts[symptom];
                return (
                  <Link
                    key={symptom}
                    href={`/herbs?q=${encodeURIComponent(symptom)}`}
                    title={
                      count != null
                        ? `~${count} herb${count !== 1 ? "s" : ""} match "${symptom}"`
                        : undefined
                    }
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-border/50 bg-muted/30 transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      {symptom}
                      {count != null && count > 0 && (
                        <span className="ml-1 text-[10px] text-muted-foreground/70">
                          {count}
                        </span>
                      )}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href="/herbs">
          <Badge
            variant={!category ? "default" : "outline"}
            className="cursor-pointer transition-all"
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
              className="cursor-pointer transition-all hover:border-primary/50"
            >
              {cat.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Search Results Label */}
      {query && herbs.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Found <span className="font-semibold text-foreground">{total}</span>{" "}
          herb{total !== 1 ? "s" : ""} matching &quot;{query}&quot;
        </p>
      )}

      {/* Herbs Grid */}
      {herbs.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {herbs.map((herb) => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <EmptyState
            variant="search"
            title={query ? `No herbs found for "${query}"` : "No herbs found"}
            description="Try searching for a symptom like headache, anxiety, or inflammation. You can also browse by category."
            action={{ label: "Browse All Herbs", href: "/herbs" }}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "headache",
              "anxiety",
              "insomnia",
              "pain",
              "cough",
              "diabetes",
            ].map((s) => (
              <Link key={s} href={`/herbs?q=${s}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:border-primary/50 hover:bg-primary/5"
                >
                  {s}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
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
