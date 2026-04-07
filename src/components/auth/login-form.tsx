"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useI18n } from "@/components/i18n/i18n-provider";

export function LoginForm() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await login(formData);
    if (result.success) {
      window.location.href = "/herbs";
    } else {
      toast.error(result.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t("auth.login.email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("auth.login.emailPlaceholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("auth.login.password")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={t("auth.login.passwordPlaceholder")}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t("auth.login.submitting") : t("auth.login.submit")}
      </Button>
      <div className="text-center text-sm space-y-2">
        <Link
          href="/forgot-password"
          className="text-primary hover:underline block"
        >
          {t("auth.login.forgotPassword")}
        </Link>
        <p className="text-muted-foreground">
          {t("auth.login.noAccount")}{" "}
          <Link href="/register" className="text-primary hover:underline">
            {t("auth.login.register")}
          </Link>
        </p>
      </div>
    </form>
  );
}
