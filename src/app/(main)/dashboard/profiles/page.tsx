import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPatientProfiles } from "@/lib/actions/patient-profiles";
import { ProfilesList } from "@/components/profiles/profiles-list";

export const metadata: Metadata = {
  title: "Dosage Profiles",
  description:
    "Manage patient profiles for yourself and your dependants to calculate accurate dosages.",
};

export default async function ProfilesPage() {
  const result = await getPatientProfiles();
  const profiles = result.success ? result.data ?? [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dosage Profiles
          </h1>
          <p className="text-sm text-muted-foreground">
            Create profiles for yourself and your family members to quickly
            calculate accurate herbal dosages.
          </p>
        </div>
      </div>
      <ProfilesList initialProfiles={profiles} />
    </div>
  );
}
