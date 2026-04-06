import type { Metadata } from "next";
import Link from "next/link";
import {
  Pill,
  AlertTriangle,
  Calculator,
  MessageCircle,
  ArrowRight,
  Leaf,
  Search,
  Clock,
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
  description: "Your personal HerbWise dashboard.",
};

function MiniSparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-0.5 h-6" aria-hidden="true">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-primary/30 animate-sparkline"
          style={{
            height: `${(v / max) * 100}%`,
            animationDelay: `${i * 80}ms`,
            minHeight: "2px",
          }}
        />
      ))}
    </div>
  );
}

function formatRelativeTime(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function isWithin24Hours(dateStr: string): boolean {
  return (Date.now() - new Date(dateStr).getTime()) < (24 * 60 * 60 * 1000);
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let medCount = 0;
  let profileCount = 0;
  let chatCount = 0;
  let recentInteraction: string | null = null;
  let lastMedActivity: string | null = null;
  let lastProfileActivity: string | null = null;
  let lastChatActivity: string | null = null;

  if (user) {
    const [meds, profiles, chats, latestCheck, latestMed, latestProfile, latestChat] = await Promise.all([
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
      supabase
        .from("interaction_checks")
        .select("created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from("user_medications")
        .select("updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from("patient_profiles")
        .select("updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from("chat_sessions")
        .select("updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single(),
    ]);
    medCount = meds.count ?? 0;
    profileCount = profiles.count ?? 0;
    chatCount = chats.count ?? 0;
    recentInteraction = latestCheck.data?.created_at ?? null;
    lastMedActivity = latestMed.data?.updated_at ?? null;
    lastProfileActivity = latestProfile.data?.updated_at ?? null;
    lastChatActivity = latestChat.data?.updated_at ?? null;
  }

  // Check if interaction was within last 24 hours (server component)
  const hasNewInteractions = recentInteraction ? isWithin24Hours(recentInteraction) : false;

  const dashboardCards = [
    {
      title: "My Medications",
      description:
        "Manage all your medications, supplements, and herbs to check for interactions",
      icon: Pill,
      count: medCount,
      href: "/dashboard/medications",
      gradient: "from-blue-500 to-cyan-500",
      sparkline: [2, 3, 5, 4, 6, 3, medCount],
      needsAttention: false,
      lastActivity: formatRelativeTime(lastMedActivity),
    },
    {
      title: "Interaction History",
      description: "Known interactions between your medications and herbs",
      icon: AlertTriangle,
      count: null as number | null,
      href: "/dashboard/interactions",
      gradient: "from-amber-500 to-orange-500",
      sparkline: [1, 0, 2, 1, 3, 2, 1],
      needsAttention: hasNewInteractions,
      lastActivity: formatRelativeTime(recentInteraction),
    },
    {
      title: "Dosage Profiles",
      description:
        "Manage profiles for you and your family to calculate dosages",
      icon: Calculator,
      count: profileCount,
      href: "/dashboard/profiles",
      gradient: "from-emerald-500 to-teal-500",
      sparkline: [1, 1, 2, 2, 3, 2, profileCount],
      needsAttention: false,
      lastActivity: formatRelativeTime(lastProfileActivity),
    },
    {
      title: "Chat Sessions",
      description:
        "Access your past conversations with the virtual herbalist",
      icon: MessageCircle,
      count: chatCount,
      href: "/dashboard/chats",
      gradient: "from-purple-500 to-indigo-500",
      sparkline: [0, 1, 2, 1, 3, 2, chatCount],
      needsAttention: false,
      lastActivity: formatRelativeTime(lastChatActivity),
    },
  ];

  const quickActions = [
    { href: "/herbs", icon: Leaf, label: "Browse Herbs", description: "Explore the database" },
    { href: "/herbs?q=", icon: Search, label: "Search Herbs", description: "Find by symptom" },
    { href: "/calculator", icon: Calculator, label: "Calculate Dose", description: "Dosage formula" },
    { href: "/pharmacist", icon: MessageCircle, label: "Ask Herbalist", description: "AI chat assistant" },
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
              className={`card-press group relative overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${card.needsAttention ? "animate-pulse-attention" : ""}`}
            >
              {/* Gradient accent */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.gradient}`} />

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.gradient} text-white shadow-sm`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex items-center gap-3">
                    <MiniSparkline values={card.sparkline} />
                    {card.count !== null && (
                      <span className="text-2xl font-bold text-foreground">
                        {card.count}
                      </span>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-2">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 px-0 text-primary hover:bg-primary/5"
                    render={<Link href={card.href} />}
                  >
                    View Details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  {card.lastActivity && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {card.lastActivity}
                    </span>
                  )}
                </div>
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
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group/action flex flex-col items-center gap-2 rounded-xl border border-border/50 p-4 text-center transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover/action:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}