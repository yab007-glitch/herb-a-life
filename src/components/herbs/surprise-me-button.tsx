"use client";

import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/i18n-provider";

export function SurpriseMeButton({ totalHerbs }: { totalHerbs: number }) {
  const router = useRouter();
  const { t } = useI18n();

  function handleSurprise() {
    const randomPage =
      Math.floor(Math.random() * Math.ceil(totalHerbs / 20)) + 1;
    router.push(`/herbs?page=${randomPage}`);
  }

  return (
    <button onClick={handleSurprise} type="button">
      <Badge
        variant="outline"
        className="cursor-pointer gap-1 border-primary/30 bg-primary/5 text-primary transition-all hover:bg-primary/10 hover:shadow-sm"
      >
        <Shuffle className="size-3" />
        {t("search.surpriseMe")}
      </Badge>
    </button>
  );
}