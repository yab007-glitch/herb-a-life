# Core Web Vitals Monitoring Setup

## Real-World Monitoring Strategy

### 1. Google Search Console (Free)
**URL**: https://search.google.com/search-console
**Property**: https://herbally.app

**Setup Steps**:
1. Verify ownership via DNS TXT record or HTML file
2. Submit sitemap: https://herbally.app/sitemap.xml
3. Navigate to "Core Web Vitals" report (Experience → Core Web Vitals)
4. Monitor LCP, FID, CLS monthly

**Key Metrics to Track**:
- **LCP** (Largest Contentful Paint): Should be < 2.5s (Good), < 4s (Needs improvement)
- **FID** (First Input Delay): Should be < 100ms (Good), < 300ms (Needs improvement)
- **CLS** (Cumulative Layout Shift): Should be < 0.1 (Good), < 0.25 (Needs improvement)

### 2. PageSpeed Insights API (Programmatic)
**API Endpoint**: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`

### 3. Web Vitals JavaScript Library (Real User Monitoring)
**NPM Package**: `web-vitals`

### 4. Vercel Analytics (Built-in)
**URL**: https://vercel.com/yassers-projects-19dfe9b3/herbally/analytics
**Note**: May require Pro plan for full features

---

## Current Lighthouse Scores (Lab Data)

| Metric | Score | Status |
|--------|-------|--------|
| **Performance** | 100/100 | ✅ Excellent |
| **Accessibility** | 96/100 | ✅ Good |
| **Best Practices** | 96/100 | ✅ Good |
| **SEO** | 100/100 | ✅ Excellent |

---

## Real-World Monitoring Script

```bash
# Check Core Web Vitals via PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://herbally.app&key=YOUR_API_KEY&strategy=mobile"
```

---

## Weekly Monitoring Checklist

### Every Monday:
- [ ] Check GSC Core Web Vitals report
- [ ] Review PageSpeed Insights for homepage
- [ ] Check PageSpeed Insights for top 10 herb pages
- [ ] Review Vercel deployment analytics
- [ ] Document any regressions

### Monthly:
- [ ] Full site crawl for performance
- [ ] Compare month-over-month trends
- [ ] Optimize any pages with "Needs Improvement" ratings
- [ ] Update performance budget if needed

---

## Performance Budget (Current)

| Metric | Target | Warning |
|--------|--------|---------|
| LCP | < 2.5s | > 2.5s |
| FID | < 100ms | > 100ms |
| CLS | < 0.1 | > 0.1 |
| TTFB | < 600ms | > 600ms |
| FCP | < 1.8s | > 1.8s |

---

## Alert Thresholds

**Critical (Immediate Action Required)**:
- LCP > 4s on any page
- FID > 300ms on any page
- CLS > 0.25 on any page

**Warning (Optimize Within 1 Week)**:
- LCP 2.5-4s
- FID 100-300ms
- CLS 0.1-0.25

---

## Current Status: 2026-04-12

✅ **Lab Data (Lighthouse)**: Excellent scores
⏳ **Real User Data (GSC)**: Pending verification
⏳ **Vercel Analytics**: Check if enabled

**Next Actions**:
1. Verify site in Google Search Console
2. Add web-vitals tracking to app
3. Set up weekly monitoring schedule
4. Create performance regression alerts
