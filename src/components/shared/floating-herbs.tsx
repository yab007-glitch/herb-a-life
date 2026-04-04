"use client";

import { cn } from "@/lib/utils";

const leaves = [
  {
    // Simple pointed leaf — top-left
    className: "absolute -top-4 left-[8%] w-16 h-16 animate-float-leaf-1 hidden md:block",
    rotate: "rotate-[-25deg]",
    path: "M12 2C6.5 6 2 12 2 18c0 2 1.5 3.5 3 4 1-4 4-9 8-14 4 5 7 10 8 14 1.5-.5 3-2 3-4 0-6-4.5-12-10-18z",
    viewBox: "0 0 24 24",
  },
  {
    // Rounded leaf — top-right
    className: "absolute top-12 right-[6%] w-20 h-20 animate-float-leaf-2 hidden md:block",
    rotate: "rotate-[15deg]",
    path: "M17 2C12 2 4 7 4 15c0 3 2 5 5 6 0-5 2-10 5-14 2 5 4 10 4 14 3-1 5-3 5-6C23 7 22 2 17 2z",
    viewBox: "0 0 24 24",
  },
  {
    // Thin elongated leaf — left center
    className: "absolute top-1/2 -left-2 w-14 h-14 animate-float-leaf-3 hidden md:block",
    rotate: "rotate-[45deg]",
    path: "M12 1C8 5 5 10 5 16c0 3 2 5 4 6 .5-5 1.5-10 3-14 1.5 4 2.5 9 3 14 2-1 4-3 4-6 0-6-3-11-7-15z",
    viewBox: "0 0 24 24",
  },
  {
    // Wide leaf — right center-bottom
    className: "absolute top-[60%] right-[4%] w-24 h-24 animate-float-leaf-1 hidden md:block",
    rotate: "rotate-[-10deg]",
    path: "M12 3C7 6 3 11 3 17c0 2.5 1.5 4 3.5 4.5 .5-4.5 2.5-9 5.5-13.5 3 4.5 5 9 5.5 13.5 2-.5 3.5-2 3.5-4.5 0-6-4-11-9-14z",
    viewBox: "0 0 24 24",
  },
  {
    // Small sprig — bottom-left
    className: "absolute bottom-[15%] left-[12%] w-12 h-12 animate-float-leaf-2 hidden md:block",
    rotate: "rotate-[30deg]",
    path: "M12 2C9 5 6 9 6 14c0 4 2 6 4 7 0-4 1-8 2-11 1 3 2 7 2 11 2-1 4-3 4-7 0-5-3-9-6-12z",
    viewBox: "0 0 24 24",
  },
  {
    // Medium leaf — bottom-right area
    className: "absolute bottom-[25%] right-[15%] w-16 h-16 animate-float-leaf-3 hidden md:block",
    rotate: "rotate-[-40deg]",
    path: "M12 1C7.5 5 4 10 4 16c0 3 1.5 5 4 6 .5-5 2-10 4-14 2 4 3.5 9 4 14 2.5-1 4-3 4-6 0-6-3.5-11-8-15z",
    viewBox: "0 0 24 24",
  },
];

export function FloatingHerbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf, i) => (
        <div key={i} className={cn(leaf.className, leaf.rotate)}>
          <svg
            viewBox={leaf.viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full text-primary/10"
          >
            <path
              d={leaf.path}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
