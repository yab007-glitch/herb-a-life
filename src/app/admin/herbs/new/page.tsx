import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const metadata = {
  title: "Add New Herb",
};

export default function NewHerbPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Herb</h1>
      <Card>
        <CardHeader>
          <CardTitle>Herb Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Common Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Turmeric"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scientific_name">Scientific Name</Label>
                <Input
                  id="scientific_name"
                  name="scientific_name"
                  placeholder="e.g. Curcuma longa"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the herb, its origins, and primary uses..."
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage_adult">Adult Dosage</Label>
              <Input
                id="dosage_adult"
                name="dosage_adult"
                placeholder="e.g. 500-2000mg daily"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch id="pregnancy_safe" name="pregnancy_safe" />
                <Label htmlFor="pregnancy_safe">Pregnancy Safe</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="nursing_safe" name="nursing_safe" />
                <Label htmlFor="nursing_safe">Nursing Safe</Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Herb
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
