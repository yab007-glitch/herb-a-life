import { MainNavbar } from "@/components/layout/main-navbar";
import { FDADisclaimerBanner } from "@/components/layout/fda-disclaimer-banner";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-muted/30" style={{ minHeight: "100dvh" }}>
      <FDADisclaimerBanner />
      <MainNavbar />
      <main
        id="main-content"
        className="flex-1 pb-bottom-nav"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </main>
      <MobileTabBar />
    </div>
  );
}
