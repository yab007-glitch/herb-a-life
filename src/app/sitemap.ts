import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

// Use anon client for sitemap (no cookies, no auth needed)
function getAnonClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/herbs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/symptoms`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...(["anxiety", "sleep", "inflammation", "digestion", "blood-pressure", "immune", "headache", "liver", "skin", "menstrual", "menopause", "cold", "joint", "diabetes", "cholesterol", "depression", "focus", "nausea", "constipation", "nerve", "circulation", "allergy", "cough", "wound", "acne", "hormonal"].map((s) => ({
      url: `${baseUrl}/symptoms/${s}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))),
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pharmacist`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const supabase = getAnonClient();

    if (!supabase) {
      console.error("Supabase client not configured for sitemap");
      return staticPages;
    }

    // Get all published herbs with slugs
    const { data: herbs } = await supabase
      .from("herbs")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("name", { ascending: true });

    const herbPages: MetadataRoute.Sitemap = (herbs ?? []).map((herb) => ({
      url: `${baseUrl}/herbs/${herb.slug}`,
      lastModified: herb.updated_at ? new Date(herb.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Get categories for category pages
    const { data: categories } = await supabase
      .from("herb_categories")
      .select("slug");

    const categoryPages: MetadataRoute.Sitemap = (categories ?? []).map(
      (cat) => ({
        url: `${baseUrl}/herbs?category=${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...categoryPages, ...herbPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static pages only on error
    return staticPages;
  }
}

// Revalidate every hour
export const revalidate = 3600;
