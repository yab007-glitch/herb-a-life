import type { Metadata } from "next";
import Link from "next/link";
import {
  Pill,
  AlertTriangle,
  Calculator,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal 1Herb dashboard.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let medCount = 0;
  let profileCount = 0;
  let chatCount = 0;

  if (user) {
    const [meds, profiles, chats] = await Promise.all([
      supabase
        .from("user_medications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_active", true),
      supabase
        .from("patient_profiles")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("chat_sessions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);
    medCount = meds.count ?? 0;
    profileCount = profiles.count ?? 0;
    chatCount = chats.count ?? 0;
  }

  const dashboardCards = [
    {
      title: "My Medications",
      description:
        "Manage all your medications, supplements, and herbs to check for interactions",
      icon: Pill,
      count: medCount,
      href: "/dashboard/medications",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Interaction History",
      description: "Known interactions between your medications and herbs",
      icon: AlertTriangle,
      count: null,
      href: "/dashboard/interactions",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Dosage Profiles",
      description:
        "Manage profiles for you and your family to calculate dosages",
      icon: Calculator,
      count: profileCount,
      href: "/dashboard/profiles",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Chat Sessions",
      description:
        "Access your past conversations with the virtual herbalist",
      icon: MessageCircle,
      count: chatCount,
      href: "/dashboard/chats",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your medications, review interaction checks, and access your activity history.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Gradient accent */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.gradient}`} />
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  {"count" in card && card.count !== null && (
                    <span className="text-2xl font-bold text-foreground">
                      {card.count}
                    </span>
                  )}
                </div>
                <CardTitle className="mt-2">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 px-0 text-primary hover:bg-primary/5"
                  render={<Link href={card.href} />}
                >
                  View Details
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" render={<Link href="/herbs" />}>
            <Pill className="mr-2 size-4" />
            Browse Herbs
          </Button>
          <Button variant="outline" size="sm" render={<Link href="/calculator" />}>
            <Calculator className="mr-2 size-4" />
            Calculate Dose
          </Button>
          <Button variant="outline" size="sm" render={<Link href="/pharmacist" />}>
            <MessageCircle className="mr-2 size-4" />
            Ask Herbalist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}