"use client";

import { useState } from "react";
import { Heart, Coffee, Database, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const suggestedAmounts = [
  {
    amount: 5,
    icon: Coffee,
    label: "Buy us a coffee",
    description: "Covers a day of API costs",
  },
  {
    amount: 15,
    icon: Database,
    label: "Feed the database",
    description: "A week of hosting costs",
  },
  {
    amount: 50,
    icon: Heart,
    label: "Champion supporter",
    description: "A month of full operations",
  },
];

export function DonationButtons() {
  const [customAmount, setCustomAmount] = useState(20);
  const [loading, setLoading] = useState<number | null>(null);

  const handleDonate = async (amount: number) => {
    setLoading(amount);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("Failed to process donation. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      {/* Preset Amounts */}
      <div className="grid gap-3 sm:grid-cols-3">
        {suggestedAmounts.map((tier) => {
          const Icon = tier.icon;
          const isLoading = loading === tier.amount;
          return (
            <Card
              key={tier.amount}
              className="h-full transition-all hover:border-primary/50 hover:shadow-md cursor-pointer"
              onClick={() => handleDonate(tier.amount)}
            >
              <CardContent className="flex flex-col items-center py-6 text-center">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 text-primary mb-2 animate-spin" />
                ) : (
                  <Icon className="h-8 w-8 text-primary mb-2" />
                )}
                <p className="text-2xl font-bold text-foreground">
                  ${tier.amount}
                </p>
                <p className="font-medium text-foreground mt-1">
                  {tier.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tier.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Amount */}
      <Card className="border-primary/20">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-muted-foreground">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Math.max(1, Math.min(1000, Number(e.target.value))))}
                min={1}
                max={1000}
                step={1}
                className="w-24 rounded-md border border-input bg-background px-3 py-2 text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-teal-600 hover:opacity-90"
              onClick={() => handleDonate(customAmount)}
              disabled={loading === customAmount}
            >
              {loading === customAmount ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Heart className="size-5" />
              )}
              Donate Custom Amount
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}