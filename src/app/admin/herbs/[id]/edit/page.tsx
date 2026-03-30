import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Edit Herb",
};

export default function EditHerbPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Herb</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Herb Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect Supabase to load herb data for editing. Herb ID: {params.id}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
