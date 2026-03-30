import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Manage Interactions",
};

export default function AdminInteractionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Drug Interactions</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Interaction
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Interaction Database</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect Supabase to manage drug-herb interactions. The database will
            be populated with 150+ well-documented interactions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
