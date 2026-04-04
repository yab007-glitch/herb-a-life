import { MainNavbar } from "@/components/layout/main-navbar";
import { FDADisclaimerBanner } from "@/components/layout/fda-disclaimer-banner";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <FDADisclaimerBanner />
      <MainNavbar
        user={
          user
            ? { email: user.email ?? "", name: user.user_metadata?.full_name ?? "" }
            : null
        }
      />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}