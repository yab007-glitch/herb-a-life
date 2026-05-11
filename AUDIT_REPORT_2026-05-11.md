# HerbAlly Full Audit Report

**Date:** May 11, 2026  
**Version:** 0.1.0  
**Pi Version:** 0.74.0

---

## Executive Summary

| Category        | Status        | Issues                              |
| --------------- | ------------- | ----------------------------------- |
| 🔴 Security     | ⚠️ Attention  | 2 moderate vulnerabilities          |
| 🟡 Dependencies | ⚠️ Outdated   | 23 packages can be updated          |
| 🟡 Code Quality | ⚠️ Issues     | 1 ESLint error, 3 formatting issues |
| 🟢 Type Safety  | ✅ Pass       | No TypeScript errors                |
| 🟢 Tests        | ✅ Pass       | 22 tests passing                    |
| 🟢 CI/CD        | ✅ Configured | GitHub Actions workflow present     |

---

## 1. Security Audit

### 1.1 npm Vulnerabilities

**Severity:** Moderate (2 vulnerabilities)

```
postcss < 8.5.10
- Issue: XSS via Unescaped </style> in CSS Stringify Output
- GHSA: GHSA-qx2v-qp2m-jg93
- Path: node_modules/next/node_modules/postcss
- Fix: Requires Next.js downgrade to 9.3.3 (breaking change)
```

**Recommendation:**

- This is a transitive dependency through Next.js
- Monitor Next.js releases for postcss upgrade
- Risk is low for production (build-time dependency)

### 1.2 Security Headers ✅

Middleware implements comprehensive security headers:

- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Content-Security-Policy (configured)
- ✅ Strict-Transport-Security (production)
- ✅ Permissions-Policy

### 1.3 Environment Variables

**21 environment variables required** (from .env.example):

- ⚠️ Sensitive keys in code: `STRIPE_SECRET_KEY`, `OPENROUTER_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- ✅ No hardcoded secrets found in source
- ✅ Using `.env.example` pattern

**Recommendations:**

1. Add `.env.local` to `.gitignore` (already present)
2. Consider using a secrets manager for production

---

## 2. Dependency Audit

### 2.1 Outdated Packages (23 updates available)

**Critical Updates:**
| Package | Current | Latest | Risk |
|---------|---------|--------|------|
| openai | 4.104.0 | 6.37.0 | 🔴 Major (breaking) |
| typescript | 5.9.3 | 6.0.3 | 🟡 Major |
| eslint | 9.39.4 | 10.3.0 | 🟡 Major |
| jsdom | 25.0.1 | 29.1.1 | 🟡 Major |
| react-markdown | 9.1.0 | 10.1.0 | 🟡 Major |
| vitest | 3.2.4 | 4.1.5 | 🟡 Major |

**Safe Updates (minor/patch):**
| Package | Current | Latest |
|---------|---------|--------|
| @base-ui/react | 1.3.0 | 1.4.1 |
| @sentry/nextjs | 10.50.0 | 10.52.0 |
| @supabase/ssr | 0.9.0 | 0.10.3 |
| @supabase/supabase-js | 2.102.1 | 2.105.4 |
| lucide-react | 1.7.0 | 1.14.0 |
| next | 16.2.3 | 16.2.6 |
| prettier | 3.8.1 | 3.8.3 |
| react | 19.2.4 | 19.2.6 |
| react-dom | 19.2.4 | 19.2.6 |
| shadcn | 4.2.0 | 4.7.0 |
| stripe | 22.0.1 | 22.1.1 |
| tailwind-merge | 3.5.0 | 3.6.0 |
| tailwindcss | 4.2.2 | 4.3.0 |
| zod | 4.3.6 | 4.4.3 |

**Recommendation:** Run `npx npm-check-updates -u` to update safe packages first, then test major updates separately.

---

## 3. Code Quality Audit

### 3.1 ESLint Issues ❌

**1 Error Found:**

```
File: src/components/herbs/smart-search.tsx:57:7
Issue: Calling setState synchronously within an effect

useEffect(() => {
  if (debouncedQuery && debouncedQuery !== defaultValue) {
    handleSearch(debouncedQuery); // ⚠️ setState in effect
  }
}, [debouncedQuery]);
```

**Fix Required:** Refactor to avoid setState in effect body. Consider:

- Moving logic to event handler
- Using callback ref pattern
- Separating external state sync from internal state

### 3.2 Formatting Issues ❌

**3 files need formatting:**

1. `src/app/(main)/herbs/[slug]/page.tsx`
2. `src/components/herbs/smart-search.tsx`
3. `src/components/layout/main-navbar.tsx`

**Fix:** Run `npm run format` to auto-fix.

### 3.3 TypeScript ✅

**Status:** No type errors

- Strict mode enabled
- All types resolve correctly
- Build info generated: `tsconfig.tsbuildinfo`

### 3.4 Code Smells

- ✅ No TODO/FIXME/XXX comments found
- ✅ Minimal console.log usage (6 instances, all appropriate)
- ✅ No hardcoded values detected

---

## 4. Test Coverage

### 4.1 Test Suite Status ✅

```
✓ src/lib/utils/__tests__/rate-limit.test.ts (3 tests)
✓ src/lib/utils/__tests__/dosage-calculations.test.ts (19 tests)
Total: 22 tests passing
```

### 4.2 Coverage Gaps ⚠️

**Missing test coverage:**

- ❌ No component tests
- ❌ No integration tests
- ❌ No E2E tests (Playwright installed but no tests)
- ❌ No API route tests
- ❌ No middleware tests

**Recommendations:**

1. Add component tests for critical UI (calculator, search, chat)
2. Add E2E tests for user flows (auth, search, donation)
3. Test API routes (chat, donate, webhooks)
4. Target: 70%+ coverage for `src/lib/` and `src/components/`

---

## 5. CI/CD Audit

### 5.1 GitHub Actions Workflow ✅

**File:** `.github/workflows/ci.yml`

**Jobs:**

- ✅ Lint (Ubuntu, Node 20)
- ✅ Typecheck (Ubuntu, Node 20)
- ✅ Test (Ubuntu, Node 20)
- ✅ Format check (Ubuntu, Node 20)
- ✅ Build (Ubuntu, Node 20, requires all above)

**Strengths:**

- Parallel job execution
- Dependency caching
- Environment variables for build
- Proper job dependencies

**Recommendations:**

1. Add security scanning (npm audit)
2. Add Lighthouse CI for performance budgets
3. Add Playwright E2E tests
4. Consider matrix testing (Node 18, 20, 22)

---

## 6. Performance Audit

### 6.1 Next.js Configuration ✅

```typescript
// next.config.ts optimizations
- ✅ Standalone output for Docker
- ✅ Package optimization (lucide-react, react-markdown)
- ✅ Image optimization (AVIF, WebP)
- ✅ Compression enabled
- ✅ Cache TTL: 30 days
```

### 6.2 Bundle Optimization

**Installed:**

- ✅ `web-vitals` for performance monitoring
- ✅ `@sentry/nextjs` for error tracking
- ✅ Tree-shakeable icons (lucide-react)

**Recommendations:**

1. Add bundle analyzer: `@next/bundle-analyzer`
2. Implement lazy loading for heavy components
3. Review `react-markdown` usage (large bundle)
4. Consider dynamic imports for admin routes

### 6.3 Database Performance

**Indexes present** (migration 00011):

- ✅ Herb search indexes
- ✅ User medication indexes
- ✅ Interaction check indexes

**Recommendations:**

1. Add query performance monitoring
2. Review slow queries in production
3. Consider Redis caching for frequent queries

---

## 7. Accessibility Audit

### 7.1 Implemented Features ✅

- ✅ Skip to content link (`SkipToContent` component)
- ✅ Semantic HTML (App Router)
- ✅ ARIA providers (TooltipProvider)
- ✅ Theme support (next-themes)

### 7.2 Recommendations

1. Run automated a11y testing (axe-core)
2. Add keyboard navigation tests
3. Verify color contrast ratios
4. Test with screen readers
5. Add alt text validation

---

## 8. Documentation Audit

### 8.1 Existing Documentation ✅

- ✅ README.md (comprehensive)
- ✅ AGENTS.md (AI agent instructions)
- ✅ .env.example (21 variables documented)
- ✅ Database migrations (18 migration files)
- ✅ Previous audit reports (3 historical reports)

### 8.2 Missing Documentation ⚠️

1. API documentation (OpenAPI/Swagger)
2. Component documentation (Storybook)
3. Deployment runbook
4. Incident response guide
5. Database schema diagram

---

## 9. Production Readiness

### 9.1 Environment Configuration

**Production checks:**

- ✅ `.env.example` present
- ✅ Environment-specific configs
- ✅ Sentry configured (client, server, edge)
- ✅ Supabase SSR auth configured

### 9.2 Error Handling

- ✅ Global error boundary (`error.tsx`)
- ✅ 404 page (`not-found.tsx`)
- ✅ Loading states (`loading.tsx`)
- ✅ Sentry error tracking

### 9.3 Monitoring

- ✅ Web Vitals tracking
- ✅ Sentry error monitoring
- ✅ Health check endpoint (`/api/health`)

**Missing:**

- ❌ Uptime monitoring
- ❌ Log aggregation
- ❌ Performance dashboards
- ❌ Alert configuration

---

## 10. Action Items

### 🔴 Critical (Do Now)

1. **Fix ESLint error** in `src/components/herbs/smart-search.tsx`
2. **Run Prettier** on 3 unformatted files
3. **Update safe dependencies** (minor/patch versions)

### 🟡 High Priority (This Week)

4. **Add component tests** for critical paths
5. **Add E2E tests** with Playwright
6. **Review openai package** major update (breaking changes)
7. **Add bundle analyzer** to identify optimization opportunities

### 🟢 Medium Priority (This Month)

8. **Add API documentation** (OpenAPI spec)
9. **Implement accessibility testing** (axe-core)
10. **Set up uptime monitoring**
11. **Create deployment runbook**
12. **Add security scanning** to CI

### 📅 Low Priority (Backlog)

13. Add Storybook for component documentation
14. Create database schema diagram
15. Add performance budgets to CI
16. Implement Redis caching layer
17. Add comprehensive logging

---

## 11. Quick Fix Commands

```bash
# 1. Fix formatting
npm run format

# 2. Update safe dependencies (minor/patch)
npx npm-check-updates -u --target minor
npm install

# 3. Run all checks
npm run lint && npm run typecheck && npm run test:run && npm run format:check

# 4. Build verification
npm run build

# 5. Security audit
npm audit --audit-level=moderate
```

---

## 12. Conclusion

**Overall Health Score: 7.5/10** ✅

**Strengths:**

- Strong type safety (TypeScript strict mode)
- Comprehensive CI/CD pipeline
- Good security headers implementation
- Clean codebase (no TODOs, minimal console.logs)
- Solid test foundation (22 passing tests)

**Areas for Improvement:**

- Dependency updates needed (23 packages)
- Test coverage gaps (no E2E, component tests)
- 1 ESLint error to fix
- 3 files need formatting
- Documentation gaps (API, deployment)

**Next Steps:**

1. Run `npm run format` to fix formatting
2. Fix ESLint error in smart-search.tsx
3. Update minor/patch dependencies
4. Add E2E tests for critical user flows
5. Set up production monitoring

---

_Generated by Pi Coding Agent v0.74.0_
