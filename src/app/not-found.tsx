import type { Metadata } from "next";
import { Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { getServerTranslation, type Locale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or may have been moved.",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("herbally-locale");
  const locale: Locale = localeCookie?.value === "fr" ? "fr" : "en";
  const t = (key: string) => getServerTranslation(locale, key);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <Leaf className="h-8 w-8 text-green-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{t("notFound.title")}</h2>
        <p className="text-muted-foreground max-w-md">
          {t("notFound.message")}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" render={<Link href="/" />}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("notFound.goHome")}
        </Button>
        <Button render={<Link href="/herbs" />}>{t("notFound.browseHerbs")}</Button>
      </div>
    </div>
  );
}