# HerbAlly.app Comprehensive Security & Performance Audit

**Audit Date:** April 8, 2026  
**Auditor:** Claude Code Security Suite  
**Scope:** Full-stack application audit covering security, code quality, infrastructure, and performance

---

## Executive Summary

| Category | Status | Risk Level |
|----------|--------|------------|
| **Security Posture** | ⚠️ MODERATE | Medium |
| **Code Quality** | ✅ GOOD | Low |
| **Infrastructure** | ✅ HEALTHY | Low |
| **Dependencies** | ⚠️ REQUIRES ATTENTION | Medium |
| **Overall** | ⚠️ IMPROVEMENTS NEEDED | Medium |

**Key Findings:**
- 3 dependency vulnerabilities (1 high, 2 moderate) - **Immediate action required**
- XSS patterns present in SEO components (acceptable use case)
- Live site is healthy with all core services operational
- Strong security headers implemented
- TypeScript build passing

---

## 1. Security Assessment

### 1.1 Dependency Vulnerabilities (HIGH PRIORITY)

| Package | Severity | CVE | Issue | Fix Status |
|---------|----------|-----|-------|------------|
| `vite` | 🔴 **HIGH** | CVE-2025-XXXX | Path traversal & arbitrary file read | Available |
| `hono` | 🟡 MODERATE | CVE-2025-XXXX | Cookie validation bypass | Available |
| `@hono/node-server` | 🟡 MODERATE | CVE-2025-XXXX | Middleware bypass via path traversal | Available |

**Recommendation:** Run `npm audit fix` immediately or update packages manually.

### 1.2 XSS Risk Patterns (ACCEPTABLE)

Three instances of `dangerouslySetInnerHTML` were detected, all for JSON-LD structured data in SEO components:

- `src/components/seo/herb-schema.tsx:103`
- `src/components/seo/organization-schema.tsx:36`  
- `src/app/(main)/herbs/page.tsx:109`

**Risk Assessment:** LOW - These are for Google structured data and use statically generated content from the database, not user input.

**Recommendation:** No action required for these specific instances.

### 1.3 Security Headers ✅

| Header | Status | Value |
|--------|--------|-------|
| X-Frame-Options | ✅ Set | DENY |
| X-Content-Type-Options | ✅ Set | nosniff |
| Content-Security-Policy | ✅ Set | Comprehensive policy including Stripe domains |
| Referrer-Policy | ✅ Set | strict-origin-when-cross-origin |
| Strict-Transport-Security | ✅ Set | max-age=63072000 (production) |
| Permissions-Policy | ✅ Set | camera=(), microphone=(), geolocation=() |

### 1.4 Secrets & Configuration

| Check | Status | Notes |
|-------|--------|-------|
| Hardcoded credentials | ✅ None found | - |
| .env committed | ✅ No secrets committed | .env.example only |
| Console logging | ⚠️ Partial | API key prefixes logged in chat route (non-critical) |

**Finding:** In `src/app/api/chat/route.ts` lines 12-17, API key prefixes are logged to console. This is low-risk but should be removed in production.

---

## 2. Live Site Audit Results

### 2.1 Health Check API ✅

```json
{
  "status": "healthy",
  "version": "0.1.0",
  "timestamp": "2026-04-08T17:39:00.189Z",
  "latency": 135,
  "checks": {
    "database": { "status": "healthy", "latency": 130 },
    "environment": { "status": "healthy" },
    "ai": { "status": "healthy" },
    "stripe": { "status": "healthy" },
    "rateLimit": { "status": "healthy", "backend": "upstash", "configured": true }
  }
}
```

### 2.2 Page Performance

| Page | Load Time | Status |
|------|-----------|--------|
| Homepage | 1.4s | ✅ Excellent |
| Herbs Listing | 3.6s | ✅ Good |
| Calculator | 3.2s | ✅ Good |
| Pharmacist (AI Chat) | 1.1s | ✅ Excellent |
| Legal Pages | 2.1s avg | ✅ Good |

### 2.3 Core Web Vitals (Estimated)

- **First Contentful Paint:** ~1.2s
- **Largest Contentful Paint:** ~2.1s
- **Time to Interactive:** ~3.5s

### 2.4 SEO Configuration ✅

- Sitemap: Generated dynamically with 2,700+ herb pages
- robots.txt: Properly configured with admin/api exclusions
- Structured data: JSON-LD for herbs and organization
- Meta tags: Complete OpenGraph and Twitter card support

---

## 3. Code Quality Assessment

### 3.1 ESLint Results

| Severity | Count | Description |
|----------|-------|-------------|
| Error | 2 | setState in useEffect (React 19 warnings) |
| Warning | 2 | `any` type, unused variable |

**Files with issues:**
- `src/components/i18n/i18n-provider.tsx:39` - setState in effect
- `src/components/shared/animated-counter.tsx:82` - setState in effect

### 3.2 TypeScript Build ✅

```
✅ TypeScript: Clean (noEmit)
✅ No type errors
✅ 22 tests passing
```

### 3.3 Test Coverage

| Test File | Tests | Status |
|-----------|-------|--------|
| `rate-limit.test.ts` | 3 | ✅ PASS |
| `dosage-calculations.test.ts` | 19 | ✅ PASS |

---

## 4. Infrastructure Analysis

### 4.1 Architecture Overview

| Component | Technology | Status |
|-----------|------------|--------|
| Framework | Next.js 16.2.1 | ✅ Current |
| Runtime | React 19.2.4 | ✅ Current |
| Database | Supabase (PostgreSQL) | ✅ Healthy |
| Auth | Supabase Auth | ✅ Configured |
| AI Service | OpenRouter + Ollama | ✅ Operational |
| Payments | Stripe | ✅ Operational |
| Rate Limiting | Upstash Redis | ✅ Configured |
| Styling | Tailwind CSS 4 | ✅ Modern |
| Hosting | Vercel | ✅ Live |

### 4.2 Database Security

- ✅ RLS (Row Level Security) enabled on tables
- ✅ Service role key only used server-side
- ✅ Anon key properly scoped for public data
- ⚠️ No database backup strategy documented

### 4.3 Authentication & Authorization

| Feature | Status | Implementation |
|---------|--------|----------------|
| Session management | ✅ | Supabase SSR with cookie-based sessions |
| Public routes | ✅ | Configured in middleware.ts |
| Admin routes protection | ✅ | Database role check |
| Rate limiting | ✅ | 20 req/min per IP |

---

## 5. Critical Issues & Recommendations

### 🔴 CRITICAL (Fix Immediately)

1. **Vite Vulnerability (HIGH)**
   - **Risk:** Arbitrary file read via dev server WebSocket
   - **Action:** Update vite to version 7.3.2+
   - **Command:** `npm update vite`

### 🟡 HIGH PRIORITY (Fix This Week)

2. **Hono Dependencies**
   - **Risk:** Multiple cookie validation issues
   - **Action:** Update hono to 4.12.12+ and @hono/node-server to 1.19.13+

3. **Console Logging of API Keys**
   - **File:** `src/app/api/chat/route.ts:12-17`
   - **Action:** Remove or mask API key prefix logging

4. **React 19 Effect Warnings**
   - **Files:** i18n-provider.tsx, animated-counter.tsx
   - **Action:** Refactor to use `useSyncExternalStore` or initialize state properly

### 🟢 MEDIUM PRIORITY (Fix This Month)

5. **Add CI/CD Pipeline**
   - No GitHub Actions workflows found
   - Should include: build, test, security scan, deploy

6. **Missing Git Remote**
   - No origin configured for this repo
   - Action: `git remote add origin <github-url>`

7. **Database Backup Strategy**
   - Document and automate Supabase backups

---

## 6. Deployment Verification

### Current Status: ✅ LIVE ON VERCEL

| Check | Status | Evidence |
|-------|--------|----------|
| DNS | ✅ | herbally.app resolves |
| HTTPS | ✅ | SSL certificate valid |
| Health endpoint | ✅ | /api/health returns 200 |
| Sitemap | ✅ | /sitemap.xml accessible |
| Security headers | ✅ | All headers present |

---

## 7. Recommendations Summary

### Immediate Actions (This Week)

```bash
# 1. Fix vulnerabilities
npm audit fix

# 2. Clean up console logging
# Remove lines 12-17 from src/app/api/chat/route.ts

# 3. Fix ESLint errors
# Refactor i18n-provider.tsx and animated-counter.tsx
```

### Short-term (This Month)

1. Set up GitHub Actions for CI/CD
2. Add Sentry for error tracking
3. Implement database backup automation
4. Add Vercel Analytics
5. Create donation tracking database table

### Long-term (Next Quarter)

1. Add comprehensive E2E testing with Playwright
2. Implement API versioning strategy
3. Add performance monitoring
4. Consider CDN for static assets

---

## Appendix: Detailed Vulnerability Report

### CVE Details

#### 1. Vite Path Traversal (CVE-2025-XXXX)
- **CVSS Score:** HIGH
- **Affected:** vite@7.0.0 - 7.3.1
- **Description:** Arbitrary file read via dev server WebSocket
- **Impact:** In dev mode only, file disclosure possible
- **Fix:** Update to vite@^7.3.2

#### 2. Hono Cookie Issues (CVE-2025-XXXX)
- **CVSS Score:** MODERATE
- **Affected:** hono@<=4.12.11
- **Description:** Cookie validation bypass and path traversal
- **Impact:** Potential session manipulation
- **Fix:** Update to hono@^4.12.12

---

**Audit Completed:** April 8, 2026  
**Next Audit Recommended:** After vulnerability fixes + 30 days