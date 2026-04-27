# HerbAlly Comprehensive Audit Report

**Date:** 2026-04-27
**Scope:** Full-stack review across UX/UI, i18n, Performance, Accessibility, Code Quality, Architecture, and Security
**Auditor:** Claude Code

---

## Executive Summary

| Category | Grade | Risk | Priority |
|----------|-------|------|----------|
| Security | B+ | Medium | Fix dependency CVEs |
| UX/UI (Mobile) | C+ | High | Language selector missing on mobile |
| UX/UI (Desktop) | B+ | Low | Minor touch target issues |
| i18n | B | Medium | Limited language coverage, no pluralization |
| Performance | B | Medium | No virtualization, over-fetching related herbs |
| Accessibility | B+ | Low | Good semantics, minor motion/color issues |
| Code Quality | A- | Low | Clean TypeScript, few lint overrides |
| Architecture | B+ | Low | Solid patterns, some coupling |

**Top 5 Actions:**
1. Add language selector to mobile navigation (critical i18n gap)
2. Update `vite` and `hono` dependencies (CVE-2025-XXXX)
3. Fix related-herbs over-fetching on herb detail pages
4. Add pluralization support to translation system
5. Remove console logging of API key prefixes in chat route

---

## 1. UX/UI Findings

### 1.1 Critical: Language Selector Missing on Mobile

**File:** `src/components/layout/main-navbar.tsx`, `src/components/layout/marketing-navbar.tsx`

**Issue:** The `LanguageSelector` component is only rendered in the desktop nav (`hidden md:flex`). Mobile users accessing the hamburger menu (`Sheet`) have **no way to change language**. Combined with the `MobileTabBar` also lacking a language option, this makes the app effectively monolingual for mobile users.

**Impact:** High. Mobile traffic typically represents 50-70% of web users. French-speaking mobile users cannot switch to their preferred language.

**Fix:** Add a mobile-optimized language picker (bottom sheet) and include it in both mobile nav sheets.

### 1.2 Touch Targets Below WCAG Minimum

**Files:** `src/components/i18n/language-selector.tsx`, `src/components/theme/theme-toggle.tsx`

**Issue:** Trigger buttons are `size-8` (32px). WCAG 2.5.5 requires touch targets to be at least 44x44px.

**Fix:** Increase to `size-11` (44px) or add padding to meet minimum.

### 1.3 Smart Search Debounce May Feel Sluggish

**File:** `src/components/herbs/smart-search.tsx:60`

**Issue:** 500ms debounce before auto-searching on keystroke. On mobile with slower typing, this can feel unresponsive.

**Fix:** Reduce to 300ms or make it configurable. Consider only triggering search on Enter for mobile.

### 1.4 Calculator Form Dense on Mobile

**File:** `src/components/calculator/dose-calculator-form.tsx`

**Issue:** The calculator presents all fields at once in a dense grid. On mobile, the unit toggle buttons and formula grid are cramped.

**Fix:** Consider a step-by-step wizard pattern for screens < 640px, or at least increase vertical spacing between sections.

### 1.5 Herb Detail Page Lacks Navigation Aids

**File:** `src/app/(main)/herbs/[slug]/page.tsx`

**Issue:** The page is very long (dosage, safety, interactions, citations, related herbs). There is no sticky table of contents or "back to top" button.

**Fix:** Add a sticky TOC sidebar on desktop and a floating "back to top" on mobile.

### 1.6 Mobile Hamburger Menu Missing Utility Items

**Issue:** The mobile sheet menu shows nav links + donate button, but no language or theme toggle. Theme toggle is also desktop-only.

**Fix:** Add a settings/utility section to the mobile sheet with language, theme, and possibly font size.

---

## 2. i18n Findings

### 2.1 Limited Language Coverage

**File:** `src/lib/i18n/config.ts`

**Issue:** Only English and French are supported. For a medical/herbal app, Spanish (`es`) and German (`de`) would significantly expand the addressable market. The architecture already supports adding locales easily.

**Fix:** Document the process for adding new locales. Consider community-driven translations via a platform like Crowdin.

### 2.2 No Pluralization Support

**File:** `src/lib/i18n/utils.ts`

**Issue:** The `lookupTranslation` function does simple `{param}` interpolation but has no pluralization logic. Pages like herbs listing use manual ternary (`total !== 1 ? t("herbs.herbPlural") : t("herbs.herbSingular")`).

**Fix:** Add ICU-style pluralization (e.g., `{count, plural, one {# herb} other {# herbs}}`) or at minimum a `tPlural()` helper.

### 2.3 French Dictionary Flash on Load

**File:** `src/components/i18n/i18n-provider.tsx:62-68`

**Issue:** French dictionary is loaded dynamically via `import()`. Users with `fr` locale see English text briefly until the JSON loads.

**Fix:** Preload French dictionary when `navigator.language` suggests French, or include it in the main bundle (it's only ~38KB). Alternatively, show a skeleton or loading state.

### 2.4 Server/Client Locale Sync Requires Reload

**File:** `src/components/i18n/i18n-provider.tsx:71-75`

**Issue:** `setLocale` updates localStorage and cookie, but server components won't re-render with the new locale until a page navigation or reload. Client components update immediately.

**Fix:** Add `window.location.reload()` after setting locale, or use `router.refresh()` from `next/navigation` to trigger a server re-render.

### 2.5 Array-Style Translation Keys Are Fragile

**File:** `src/app/page.tsx:132-139`

**Issue:** `t(`home.hero.trustBadgesList[${i}]`)` relies on array indexing. If the array length changes, keys may break silently.

**Fix:** Use explicit keys (`trustBadge1`, `trustBadge2`) or iterate over an array in the dictionary.

---

## 3. Performance Findings

### 3.1 Related Herbs Fetch is Wasteful

**File:** `src/app/(main)/herbs/[slug]/page.tsx:247-262`

**Issue:** On every herb detail page load, the server fetches **all published herbs** from the database just to compute related herbs client-side via `getComparisonHerbs`.

```typescript
const { data: allHerbs } = await supabaseClient
  .from("herbs")
  .select("name, slug, scientific_name, symptom_keywords, traditional_uses")
  .eq("is_published", true);
```

This is O(n) data transfer and O(n) computation for every page view. With 2,700+ herbs, this is significant.

**Fix:** Move related-herb computation to a database function (SQL or RPC), or pre-compute and store `related_herb_slugs` in the `herbs` table.

### 3.2 Chat Stream Lacks React 19 Streaming Patterns

**File:** `src/components/pharmacist/chat-interface.tsx:210-254`

**Issue:** The chat streams response chunks and updates React state on every chunk. This is fine for small responses but can cause re-render thrashing for long replies.

**Fix:** Consider using `useDeferredValue` or batching state updates. Or use a ref for accumulation and throttle UI updates.

### 3.3 No Virtualization for Long Lists

**File:** `src/app/(main)/herbs/page.tsx:207-212`

**Issue:** Herb grids render all cards at once. With 20 per page this is fine, but if pagination increases, virtualization would help.

**Fix:** Monitor Core Web Vitals. If LCP suffers, add `react-window` or similar for large grids.

### 3.4 Static Generation Limited to 100 Herbs

**File:** `src/app/(main)/herbs/[slug]/page.tsx:57-73`

**Issue:** `generateStaticParams` only generates 100 herbs at build time. The remaining 2,600+ are SSR on first visit.

**Fix:** Consider incremental static regeneration (`revalidate` is already set to 3600s, which is good). Evaluate if 100 is sufficient for popular herbs or if it should be increased.

---

## 4. Accessibility Findings

### 4.1 Good Practices Observed

- `SkipToContent` component present
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels on interactive elements
- `motion-safe:` prefixes for animations
- `sr-only` text for icon-only buttons
- Proper heading hierarchy on herb detail pages

### 4.2 Color-Only Safety Indicators

**File:** `src/components/herbs/herb-card.tsx:80-84`, `src/components/herbs/herb-safety-badges.tsx`

**Issue:** Safety levels (safe/caution/unsafe) are communicated via colored borders and backgrounds only. Colorblind users may not distinguish these.

**Fix:** Add distinct icons or patterns (e.g., checkmark for safe, triangle for caution, X for unsafe) in addition to color.

### 4.3 Animated Counter May Lack Reduced Motion Check

**File:** `src/components/shared/animated-counter.tsx`

**Issue:** The security audit flagged this file for a `setState` in `useEffect`. Additionally, number animations can cause vestibular disorders.

**Fix:** Ensure `prefers-reduced-motion` is respected.

### 4.4 DropdownMenu Content `w-48` May Overflow on Small Screens

**File:** `src/components/i18n/language-selector.tsx:22`

**Issue:** The dropdown content has a fixed width of `w-48` (192px). On very small screens or when zoomed, this could cause horizontal overflow.

**Fix:** Use `min-w-48` or ensure responsive sizing.

---

## 5. Code Quality Findings

### 5.1 TypeScript is Strong

- Clean discriminated union pattern for `ActionResponse<T>`
- Good use of `as const` for config objects
- Proper `unknown` handling for dictionary values

### 5.2 Minor Issues

**File:** `src/lib/i18n/utils.ts:17`

```typescript
let value: any = dict;
```

**Issue:** Explicit `any` with eslint suppression. Could use `unknown` with type narrowing.

**File:** `src/app/api/chat/route.ts:11-17`

**Issue:** Console logging in production path. The security audit flagged this.

**File:** `src/components/i18n/i18n-provider.tsx:39`

**Issue:** `setState` called during render (inside `getInitialLocale`). React 19 warns about this.

**Fix:** Use `useSyncExternalStore` or `useState(() => ...)` with a lazy initializer.

### 5.3 Guest Chat Persistence Without Auth

**File:** `src/components/pharmacist/chat-interface.tsx:136-191`

**Issue:** Chat sessions are persisted via a `guestId` cookie. While convenient, this could be abused to flood the database with sessions.

**Mitigation:** Rate limiting is already in place (20 req/min). Consider session limits per guest ID.

---

## 6. Architecture Findings

### 6.1 Strengths

- Clean separation: `actions/`, `components/`, `lib/`, `app/`
- Server actions with consistent `ActionResponse<T>` wrapper
- Middleware with comprehensive security headers
- Database migrations in `supabase/migrations/`
- Good use of Next.js App Router patterns

### 6.2 Areas for Improvement

**No API Versioning:** The chat API at `/api/chat` has no versioning strategy. If breaking changes are needed, client caching may cause issues.

**Tight Coupling in Herb Detail Page:** The herb detail page handles monograph generation, related herbs, citations, and structured data. It's ~725 lines. Consider extracting sections into smaller server components.

**Duplicate Locale Cookie Reading:** `getLocale()` helper is defined inline in `herbs/page.tsx` and `[slug]/page.tsx`. Extract to a shared helper.

---

## 7. Security Findings (From Prior Audit + Verification)

### 7.1 Dependency Vulnerabilities (Confirmed)

| Package | Severity | Action |
|---------|----------|--------|
| `vite` | HIGH | Update to 7.3.2+ |
| `hono` | MODERATE | Update to 4.12.12+ |
| `@hono/node-server` | MODERATE | Update to 1.19.13+ |

### 7.2 XSS via dangerouslySetInnerHTML (Acceptable)

Three instances for JSON-LD structured data. Content is database-generated, not user input. Risk: LOW.

### 7.3 Security Headers (Excellent)

Comprehensive CSP, HSTS, X-Frame-Options, Permissions-Policy. Well configured.

### 7.4 Rate Limiting (Good)

20 requests/minute per IP on chat endpoint. Upstash Redis backend.

---

## 8. Recommendations by Priority

### Immediate (This Week)

1. **Add language selector to mobile navigation** — Critical UX gap affecting majority of users
2. **Fix dependency CVEs** — `npm audit fix` for vite, hono
3. **Remove console.log of API keys** — `src/app/api/chat/route.ts`
4. **Fix React 19 warnings** — `setState` in render in i18n-provider and animated-counter

### Short-Term (This Month)

5. **Optimize related herbs query** — Use SQL function instead of fetching all herbs
6. **Add pluralization to i18n** — `tPlural()` helper or ICU format
7. **Improve touch targets** — Language and theme toggles to 44px minimum
8. **Add accessibility icons to safety badges** — Beyond color-only indicators

### Medium-Term (Next Quarter)

9. **Add Spanish locale** — Expand market reach
10. **E2E testing with Playwright** — Critical paths: search, calculator, chat
11. **Performance monitoring** — Web Vitals tracking, LCP optimization
12. **Herb detail page refactor** — Extract sections into smaller components
13. **Database backup automation** — Document Supabase backup strategy

---

*End of Audit Report*
