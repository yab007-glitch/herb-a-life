import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://herb-a-life.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/herbs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: herbs } = await supabase
      .from("herbs")
      .select("slug, updated_at")
      .eq("is_published", true);

    const herbPages: MetadataRoute.Sitemap = (herbs ?? []).map((herb) => ({
      url: `${baseUrl}/herbs/${herb.slug}`,
      lastModified: herb.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...herbPages];
  } catch {
    return staticPages;
  }
}
