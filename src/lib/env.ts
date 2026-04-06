import { z } from "zod/v4";

const serverSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  OPENROUTER_API_KEY: z.string().min(1),
  OPENROUTER_MODEL: z.string().default("openai/gpt-4o-mini"),
  NEXT_PUBLIC_APP_URL: z.url().optional(),
  OPENFDA_BASE_URL: z.url().default("https://api.fda.gov/drug"),
  RXNORM_BASE_URL: z.url().default("https://rxnav.nlm.nih.gov/REST"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.url().optional(),
});

function validateEnv<T extends z.ZodType>(
  schema: T,
  env: Record<string, string | undefined>
): z.infer<T> {
  const result = schema.safeParse(env);
  if (!result.success) {
    const formatted = z.prettifyError(result.error);
    console.error("Invalid environment variables:", formatted);
    throw new Error(`Missing or invalid environment variables:\n${formatted}`);
  }
  return result.data;
}

export const serverEnv = validateEnv(serverSchema, process.env);

export const clientEnv = validateEnv(clientSchema, {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
