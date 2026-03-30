import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Users",
};

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect Supabase to view registered users and their activity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
