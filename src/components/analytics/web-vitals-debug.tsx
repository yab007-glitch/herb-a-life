"use client";

import { useEffect, useState } from "react";

interface WebVitalsData {
  name: string;
  value: number;
  rating: string;
  pathname: string;
  timestamp: number;
}

export function WebVitalsDebug() {
  const [vitals, setVitals] = useState<WebVitalsData[]>([]);

  useEffect(() => {
    // Listen for web vitals events (only in development)
    if (process.env.NODE_ENV === "production") return;

    const handleVital = (event: CustomEvent<WebVitalsData>) => {
      setVitals((prev) => [event.detail, ...prev].slice(0, 10));
    };

    window.addEventListener("web-vital", handleVital as EventListener);
    return () => window.removeEventListener("web-vital", handleVital as EventListener);
  }, []);

  if (process.env.NODE_ENV === "production" || vitals.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-black/90 text-white p-4 rounded-lg text-xs font-mono">
      <h3 className="font-bold mb-2">Core Web Vitals (Dev)</h3>
      <div className="space-y-1">
        {vitals.map((vital, i) => (
          <div key={i} className="flex justify-between">
            <span className={vital.rating === "good" ? "text-green-400" : vital.rating === "poor" ? "text-red-400" : "text-yellow-400"}>
              {vital.name}
            </span>
            <span>{Math.round(vital.value)}{vital.name === "CLS" ? "" : "ms"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
