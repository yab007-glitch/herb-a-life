import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, AlertTriangle, Users, ClipboardCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [herbs, interactions, users, checks] = await Promise.all([
    supabase.from("herbs").select("id", { count: "exact", head: true }),
    supabase.from("drug_interactions").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("interaction_checks").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Total Herbs", value: herbs.count ?? 0, icon: Leaf, color: "text-green-600" },
    { label: "Drug Interactions", value: interactions.count ?? 0, icon: AlertTriangle, color: "text-amber-600" },
    { label: "Users", value: users.count ?? 0, icon: Users, color: "text-blue-600" },
    { label: "Interaction Checks", value: checks.count ?? 0, icon: ClipboardCheck, color: "text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Updated just now
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
