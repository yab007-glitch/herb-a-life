import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Manage Herbs",
};

export default function AdminHerbsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Herbs</h1>
        <Link href="/admin/herbs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Herb
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Herb Database</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect Supabase to manage herbs. The herbs table will be populated
            with seed data containing 100+ medicinal herbs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
