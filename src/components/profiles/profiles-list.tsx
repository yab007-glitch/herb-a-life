"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Plus,
  Trash2,
  Loader2,
  Calculator,
  Baby,
  User,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  addPatientProfile,
  removePatientProfile,
  type PatientProfile,
} from "@/lib/actions/patient-profiles";
import { toast } from "sonner";

const relationships = [
  { value: "self", label: "Myself" },
  { value: "child", label: "Child" },
  { value: "spouse", label: "Spouse / Partner" },
  { value: "parent", label: "Parent" },
  { value: "other", label: "Other" },
];

const relationshipIcons: Record<string, typeof User> = {
  self: User,
  child: Baby,
  spouse: Heart,
  parent: Users,
  other: Users,
};

export function ProfilesList({
  initialProfiles,
}: {
  initialProfiles: PatientProfile[];
}) {
  const router = useRouter();
  const [profiles, setProfiles] = useState(initialProfiles);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await addPatientProfile(formData);
    if (result.success && result.data) {
      setProfiles((prev) => [...prev, result.data!]);
      setShowForm(false);
      toast.success("Profile added");
    } else {
      toast.error(result.error ?? "Failed to add profile");
    }
    setLoading(false);
  }

  async function handleRemove(id: string) {
    setRemovingId(id);
    const result = await removePatientProfile(id);
    if (result.success) {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      toast.success("Profile removed");
    } else {
      toast.error(result.error ?? "Failed to remove");
    }
    setRemovingId(null);
  }

  function buildCalcUrl(profile: PatientProfile) {
    const params = new URLSearchParams();
    if (profile.weight_kg) params.set("weight", String(profile.weight_kg));
    if (profile.height_cm) params.set("height", String(profile.height_cm));
    if (profile.age_months && profile.age_months < 24) {
      params.set("ageMonths", String(profile.age_months));
    } else if (profile.age_years) {
      params.set("age", String(profile.age_years));
    }
    params.set("name", profile.name);
    return `/calculator?${params.toString()}`;
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>
          <Plus className="size-4" />
          Add Profile
        </Button>
      )}

      {/* Add Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add a Person</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Sarah, Dad, Baby Ali..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <select
                    id="relationship"
                    name="relationship"
                    className="flex h-8 w-full rounded-lg border border-border bg-background px-3 text-sm"
                    defaultValue="self"
                  >
                    {relationships.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="age_years">Age (years)</Label>
                  <Input
                    id="age_years"
                    name="age_years"
                    type="number"
                    min="0"
                    max="120"
                    placeholder="e.g., 35"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age_months">Age (months)</Label>
                  <Input
                    id="age_months"
                    name="age_months"
                    type="number"
                    min="0"
                    max="1440"
                    placeholder="For infants"
                  />
                  <p className="text-xs text-muted-foreground">
                    For infants under 2 years
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight_kg">Weight (kg)</Label>
                  <Input
                    id="weight_kg"
                    name="weight_kg"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 70"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="height_cm">Height (cm)</Label>
                  <Input
                    id="height_cm"
                    name="height_cm"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 170"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Any notes (allergies, conditions...)"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                  {loading ? "Adding..." : "Add Profile"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Profiles List */}
      {profiles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {profiles.map((profile) => {
            const RelIcon = relationshipIcons[profile.relationship] ?? Users;
            return (
              <Card key={profile.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <RelIcon className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {profile.name}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-0.5">
                          {relationships.find(
                            (r) => r.value === profile.relationship
                          )?.label ?? profile.relationship}
                        </Badge>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          {profile.age_years != null && (
                            <span>Age: {profile.age_years}y</span>
                          )}
                          {profile.age_months != null &&
                            (profile.age_months < 24 || !profile.age_years) && (
                              <span>Age: {profile.age_months}m</span>
                            )}
                          {profile.weight_kg != null && (
                            <span>Weight: {profile.weight_kg}kg</span>
                          )}
                          {profile.height_cm != null && (
                            <span>Height: {profile.height_cm}cm</span>
                          )}
                        </div>
                        {profile.notes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {profile.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                      aria-label="Remove profile"
                      onClick={() => handleRemove(profile.id)}
                      disabled={removingId === profile.id}
                    >
                      {removingId === profile.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => router.push(buildCalcUrl(profile))}
                  >
                    <Calculator className="size-4" />
                    Calculate Dose for {profile.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        !showForm && (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center">
              <Users className="size-10 text-muted-foreground/40 mb-3" />
              <p className="font-medium text-muted-foreground">
                No profiles yet
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Add yourself and your family members to quickly calculate
                personalized herbal dosages.
              </p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
