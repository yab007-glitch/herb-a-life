"use client";

import { useEffect } from "react";

export function SWRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((error) => {
          console.error("[sw] Registration failed:", error);
        });
      });
    }
  }, []);

  return null;
}
