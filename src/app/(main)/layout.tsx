import { MainNavbar } from "@/components/layout/main-navbar";
import { FDADisclaimerBanner } from "@/components/layout/fda-disclaimer-banner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <FDADisclaimerBanner />
      <MainNavbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
