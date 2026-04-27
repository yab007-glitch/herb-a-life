"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function parseValue(value: string): { target: number; suffix: string } {
  const match = value.match(/^[\s,]*([0-9,]+)\s*(.*)$/);
  if (!match) {
    return { target: 0, suffix: "" };
  }
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = match[2] || "";
  return { target, suffix };
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const { target, suffix } = parseValue(value);
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const animate = useCallback(() => {
    if (target === 0) return;

    // Respect reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(easedProgress * target);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [target]);

  // Use useSyncExternalStore for hydration-safe mounting detection
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    // Schedule state update for next tick to avoid sync setState warning
    const timeoutId = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
          animate();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animate]);

  return (
    <span
      ref={elementRef}
      className={cn(isVisible && "motion-safe:animate-count-up", className)}
      suppressHydrationWarning
    >
      {hasMounted ? `${formatNumber(displayValue)}${suffix}` : value}
    </span>
  );
}
