"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pill, Plus, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addMedication, removeMedication } from "@/lib/actions/medications";
import { toast } from "sonner";
import type { UserMedication } from "@/lib/types";

export function MedicationsList({
  initialMedications,
}: {
  initialMedications: UserMedication[];
}) {
  const router = useRouter();
  const [medications, setMedications] = useState(initialMedications);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await addMedication(formData);
    if (result.success && result.data) {
      setMedications((prev) => [result.data!, ...prev]);
      setShowForm(false);
      toast.success("Medication added");
    } else {
      toast.error(result.error ?? "Failed to add medication");
    }
    setLoading(false);
  }

  async function handleRemove(id: string) {
    setRemovingId(id);
    const result = await removeMedication(id);
    if (result.success) {
      setMedications((prev) => prev.filter((m) => m.id !== id));
      toast.success("Medication removed");
    } else {
      toast.error(result.error ?? "Failed to remove");
    }
    setRemovingId(null);
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>
          <Plus className="size-4" />
          Add Medication
        </Button>
      )}

      {/* Add Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Add a Medication, Supplement, or Herb
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="drug_name">Name *</Label>
                <Input
                  id="drug_name"
                  name="drug_name"
                  placeholder="e.g., Warfarin, Turmeric, Vitamin D, St. John's Wort..."
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    name="dosage"
                    placeholder="e.g., 5mg, 500mg..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Input
                    id="frequency"
                    name="frequency"
                    placeholder="e.g., Once daily, Twice daily..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder="Any additional notes..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                  {loading ? "Adding..." : "Add"}
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

      {/* Medications List */}
      {medications.length > 0 ? (
        <div className="space-y-3">
          {medications.map((med) => (
            <Card key={med.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Pill className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {med.drug_name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {med.dosage && (
                        <Badge variant="secondary" className="text-xs">
                          {med.dosage}
                        </Badge>
                      )}
                      {med.frequency && (
                        <Badge variant="secondary" className="text-xs">
                          {med.frequency}
                        </Badge>
                      )}
                    </div>
                    {med.notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {med.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    aria-label="Remove medication"
                    onClick={() => handleRemove(med.id)}
                    disabled={removingId === med.id}
                  >
                    {removingId === med.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Check Interactions CTA */}
          <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
            <CardContent className="flex items-center gap-3 py-4">
              <AlertTriangle className="size-5 text-amber-600 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Check interactions between all your medications
                </p>
                <p className="text-xs text-muted-foreground">
                  Our AI herbalist will analyze your full list for potential
                  interactions
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  const names = medications.map((m) => m.drug_name).join(", ");
                  router.push(
                    `/pharmacist?medications=${encodeURIComponent(names)}`
                  );
                }}
              >
                Check Now
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        !showForm && (
          <Card>
            <CardContent className="flex flex-col items-center py-12 text-center">
              <Pill className="size-10 text-muted-foreground/40 mb-3" />
              <p className="font-medium text-muted-foreground">
                No medications saved yet
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Add your prescription drugs, supplements, and herbs to check for
                interactions between them.
              </p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
