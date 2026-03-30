import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, AlertTriangle, Users, ClipboardCheck } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Herbs", value: "—", icon: Leaf, color: "text-green-600" },
    { label: "Drug Interactions", value: "—", icon: AlertTriangle, color: "text-amber-600" },
    { label: "Users", value: "—", icon: Users, color: "text-blue-600" },
    { label: "Interaction Checks", value: "—", icon: ClipboardCheck, color: "text-purple-600" },
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
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Connect Supabase to see live data
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
