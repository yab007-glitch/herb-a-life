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

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal Herb-a-Life dashboard.",
};

const dashboardCards = [
  {
    title: "My Medications",
    description: "Manage all your medications, supplements, and herbs to check for interactions",
    icon: Pill,
    count: 0,
    href: "/dashboard/medications",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Interaction History",
    description: "Known interactions between your medications and herbs",
    icon: AlertTriangle,
    count: 0,
    href: "/dashboard/interactions",
    color:
      "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    title: "Dosage Profiles",
    description: "Manage profiles for you and your family to calculate dosages",
    icon: Calculator,
    count: 0,
    href: "/dashboard/profiles",
    color:
      "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    title: "Chat Sessions",
    description: "Access your past conversations with the virtual herbalist",
    icon: MessageCircle,
    count: 0,
    href: "/dashboard/chats",
    color:
      "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to your Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your medications, review interaction checks, and access your
          activity history.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`inline-flex size-10 items-center justify-center rounded-lg ${card.color}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    {card.count}
                  </span>
                </div>
                <CardTitle className="mt-2">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0"
                  render={<Link href={card.href} />}
                >
                  View Details
                  <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
