import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserMedications } from "@/lib/actions/medications";
import { MedicationsList } from "@/components/medications/medications-list";

export const metadata: Metadata = {
  title: "My Medications",
  description: "Manage your current medications for interaction checking.",
};

export default async function MedicationsPage() {
  const result = await getUserMedications();
  const medications = result.success ? result.data ?? [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Medications
          </h1>
          <p className="text-sm text-muted-foreground">
            Add all your medications, supplements, and herbs here. We&apos;ll
            check for interactions between them.
          </p>
        </div>
      </div>
      <MedicationsList initialMedications={medications} />
    </div>
  );
}
