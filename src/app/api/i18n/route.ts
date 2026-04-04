import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { LANGUAGES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const cache: Record<string, Record<string, unknown>> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") as Locale || DEFAULT_LOCALE;

  // Validate locale
  if (!LANGUAGES.find(l => l.code === locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  // Return cached if available
  if (cache[locale]) {
    return NextResponse.json(cache[locale]);
  }

  // Load dictionary
  try {
    const dictPath = path.join(process.cwd(), "src/lib/i18n/dictionaries", `${locale}.json`);
    const content = fs.readFileSync(dictPath, "utf8");
    const dict = JSON.parse(content);
    cache[locale] = dict;
    return NextResponse.json(dict);
  } catch {
    // Return default locale if not found
    if (locale !== DEFAULT_LOCALE) {
      const dictPath = path.join(process.cwd(), "src/lib/i18n/dictionaries", `${DEFAULT_LOCALE}.json`);
      const content = fs.readFileSync(dictPath, "utf8");
      const dict = JSON.parse(content);
      return NextResponse.json(dict);
    }
    return NextResponse.json({ error: "Dictionary not found" }, { status: 404 });
  }
}