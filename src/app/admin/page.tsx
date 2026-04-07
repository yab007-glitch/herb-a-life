import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Leaf,
  AlertTriangle,
  Users,
  ClipboardCheck,
  Activity,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Overview",
};

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [herbs, interactions, users, checks] = await Promise.all([
    supabase.from("herbs").select("id", { count: "exact", head: true }),
    supabase
      .from("drug_interactions")
      .select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("interaction_checks")
      .select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Total Herbs",
      value: herbs.count ?? 0,
      icon: Leaf,
      gradient: "from-emerald-500 to-teal-500",
      description: "Published in database",
    },
    {
      label: "Drug Interactions",
      value: interactions.count ?? 0,
      icon: AlertTriangle,
      gradient: "from-amber-500 to-orange-500",
      description: "Known interactions",
    },
    {
      label: "Registered Users",
      value: users.count ?? 0,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      description: "Total accounts",
    },
    {
      label: "Interaction Checks",
      value: checks.count ?? 0,
      icon: ClipboardCheck,
      gradient: "from-purple-500 to-indigo-500",
      description: "Checks performed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-600 text-white shadow-lg">
          <Activity className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Admin Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor platform activity and statistics
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="relative overflow-hidden border-border/50"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.gradient}`}
              />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient} text-white`}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value.toLocaleString()}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Placeholder */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Activity className="size-10 text-muted-foreground/50" />
          <p className="mt-4 font-medium text-foreground">
            Activity Logging Coming Soon
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed analytics and activity logs will appear here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
