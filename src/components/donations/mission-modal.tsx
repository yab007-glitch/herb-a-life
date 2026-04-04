"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Leaf,
  Sparkles,
  Globe,
  CheckCircle,
} from "lucide-react";

interface MissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MissionModal({ open, onOpenChange }: MissionModalProps) {
  const router = useRouter();

  const handleDonate = () => {
    onOpenChange(false);
    router.push("/donate");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600">
              <Heart className="h-5 w-5 text-white fill-white" />
            </div>
            Our Mission
          </DialogTitle>
          <DialogDescription className="sr-only">
            Learn about Herb-a-Life&apos;s mission and how your donations help keep herbal medicine information free for everyone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Mission Statement */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-foreground">
              Free herbal knowledge for <span className="text-primary">everyone</span>.
            </p>
            <p className="text-sm text-muted-foreground">
              We believe access to health information shouldn&apos;t depend on your wallet.
              Herb-a-Life provides comprehensive herbal medicine data at no cost — no ads, no paywalls, no premium tiers.
            </p>
          </div>

          {/* What We Provide */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-lg bg-muted/50 p-3 text-center">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">2,700+ Herbs</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg bg-muted/50 p-3 text-center">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">AI Herbalist</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg bg-muted/50 p-3 text-center">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">100% Free</span>
            </div>
          </div>

          {/* How Donations Help */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">How Your Donation Helps</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Hosting & Servers</strong> — Keep the app fast and available 24/7</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">AI Costs</strong> — Power the virtual herbalist chatbot</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Database</strong> — Store and serve 2,700+ herb profiles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-foreground">New Features</strong> — Add more herbs, interactions, and tools</span>
              </li>
            </ul>
          </div>

          {/* Promise */}
          <div className="rounded-lg bg-gradient-to-br from-primary/10 to-transparent p-4 text-center">
            <p className="text-sm font-medium text-foreground">
              We&apos;ll never charge users or sell your data.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Herb-a-Life is sustained entirely by voluntary donations.
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={handleDonate}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90"
          >
            <Heart className="h-4 w-4 mr-2 fill-white" />
            Make a Donation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}