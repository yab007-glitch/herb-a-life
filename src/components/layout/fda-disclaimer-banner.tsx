import { FDA_DISCLAIMER } from "@/lib/constants";

export function FDADisclaimerBanner() {
  return (
    <div className="w-full bg-amber-50 text-amber-800 px-4 py-1.5 text-center text-xs leading-snug dark:bg-amber-950 dark:text-amber-200">
      <p className="max-w-7xl mx-auto">{FDA_DISCLAIMER}</p>
    </div>
  );
}
