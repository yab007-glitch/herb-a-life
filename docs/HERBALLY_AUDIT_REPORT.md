# HerbAlly Deep Audit Report

**Date:** 2026-04-11  
**Auditor:** KEYS (AI)  
**Sources:** Live site analysis, NIH/NCCIH, PMC/NIH, StatPearls, Texas Medicinals  

---

## Executive Summary

HerbAlly is **conceptually strong** — combining database depth, safety tooling, and AI assistance in a way users actually need. However, it faces critical trust, consistency, and clarity challenges that must be addressed before broader adoption.

| Category | Score | Status |
|----------|-------|--------|
| Content Depth | 7/10 | Good scale, needs evidence transparency |
| Trust & Safety | 5/10 | Warnings present but not prominent enough |
| UX/Navigation | 6/10 | Clean but lacks symptom-first pathways |
| Technical SEO | 6/10 | Structured data present, needs optimization |
| AI Transparency | 4/10 | Weak disclaimers, no grounding shown |
| Overall | **28/50** | **Needs priority fixes before scale** |

---

## Critical Issues (Fix Immediately)

### 1. Herb Count Mismatch [FIXED]
- **Issue:** Homepage claims "2,700+" herbs, About page said "over 500"
- **Impact:** Immediate credibility damage
- **Fix:** ✅ Updated About page to "2,700+" — verify actual database count
- **Priority:** P0

### 2. AI Guidance Not Grounded
- **Issue:** Chat responses don't show sources or evidence levels
- **Impact:** Users can't verify AI claims; clinical risk
- **Fix:** Add source citations to chat responses (WHO, PubMed, etc.)
- **Priority:** P0

### 3. Safety Warnings Buried
- **Issue:** Drug interaction warnings are in footer/tabs, not prominent
- **Impact:** Users may miss critical safety information
- **Fix:** Move warnings above fold on herb pages; use alert banners
- **Priority:** P0

### 4. No Evidence Grading
- **Issue:** No indication of study quality (RCT vs. traditional use vs. anecdotal)
- **Impact:** Users can't assess reliability
- **Fix:** Add A/B/C/D evidence grades (like UpToDate) with tooltips
- **Priority:** P1

---

## High-Priority Improvements

### 5. Symptom-First Discovery
- **Current:** Users must know herb names
- **Needed:** "I have anxiety" → herb recommendations
- **Reference:** NCCIH HerbList symptom search
- **Priority:** P1

### 6. Separate User Journeys
| User Type | Needs | Current Gap |
|-----------|-------|-------------|
| Consumers | Simple safety, quick answers | Too technical |
| Practitioners | Detailed interactions, dosages | No advanced filters |
| Herbalists | Traditional uses, preparation | Limited depth |

### 7. Trust Signals Missing
- **Missing:**
  - Author credentials ("Reviewed by herbalist/MD")
  - Last updated dates
  - Review process transparency
  - Medical advisory board

### 8. Citation System
- **Current:** Generic "WHO monographs" reference
- **Needed:** Per-claim citations with links to studies
- **Example:** "Shown to reduce inflammation [PMID: 12345678]"

---

## Technical SEO Audit

### Strengths
- ✅ Structured data (MedicalWebPage, Organization)
- ✅ Sitemap with revalidation
- ✅ Canonical URLs
- ✅ Mobile-responsive

### Weaknesses
- ❌ Low internal linking between related herbs
- ❌ Missing symptom-based landing pages
- ❌ No FAQ schema for common questions
- ❌ Page titles too generic ("HerbAlly - [Herb Name]")

### Keyword Opportunities
| Intent | Current | Opportunity |
|--------|---------|-------------|
| "[herb] benefits" | Weak | Add dedicated sections |
| "[herb] side effects" | Present | Expand with severity grades |
| "[herb] drug interactions" | Present | Make searchable by drug name |
| "herbs for [symptom]" | Missing | Create symptom landing pages |
| "is [herb] safe" | Missing | Add safety Q&A schema |

---

## AI Transparency Requirements

### Current State
- Disclaimer exists but is generic
- No source citations in responses
- No way to verify AI claims

### Required Improvements
1. **Source Attribution** — Every claim links to PubMed/WHO/Commission E
2. **Confidence Indicators** — "High evidence" vs. "Traditional use only"
3. **Limitations Statement** — "AI cannot replace clinical judgment"
4. **Review Process** — Show when content was last medically reviewed

---

## Competitive Benchmark

| Feature | HerbAlly | NCCIH HerbList | Examine.com | 
|---------|----------|----------------|-------------|
| Herb Count | 2,700+ | 20 popular | 300+ |
| Drug Interactions | ✅ | ✅ | ✅ |
| Dosage Calculator | ✅ | ❌ | ❌ |
| AI Chat | ✅ | ❌ | ❌ |
| Evidence Grading | ❌ | ✅ | ✅ |
| Source Citations | Weak | ✅ | ✅ |
| Symptom Search | Basic | ✅ | ✅ |
| Mobile App | ❌ | ✅ | ❌ |
| Offline Access | ❌ | ✅ | ❌ |

**HerbAlly's Advantage:** Combined depth + tools + AI
**HerbAlly's Gap:** Trust signals and evidence transparency

---

## Recommended Action Plan

### Week 1: Critical Fixes
- [x] Fix herb count mismatch
- [ ] Add source citations to AI chat responses
- [ ] Move safety warnings to alert banners (above fold)
- [ ] Add "Last reviewed: [date]" to herb pages

### Week 2: Trust Building
- [ ] Implement evidence grading (A/B/C/D)
- [ ] Add author/reviewer credits
- [ ] Create "How we source information" page
- [ ] Expand drug interaction search by drug name

### Week 3: UX Improvements
- [ ] Symptom-first herb discovery
- [ ] Related herbs internal linking
- [ ] User type filters (consumer/practitioner/herbalist)
- [ ] FAQ schema markup

### Week 4: SEO Expansion
- [ ] Symptom landing pages ("herbs for anxiety")
- [ ] Safety Q&A pages
- [ ] Enhanced structured data
- [ ] Internal linking strategy

### Month 2: Advanced Features
- [ ] Evidence library with full citations
- [ ] Comparison tool (herb vs. herb)
- [ ] Print-friendly herb monographs
- [ ] Practitioner dashboard (if re-adding accounts)

---

## Safety Compliance Checklist

- [x] FDA disclaimer present
- [ ] Drug interaction checker functional
- [ ] Contraindications visible
- [ ] Pregnancy warnings prominent
- [ ] Dosage limits clear
- [ ] Emergency guidance ("call poison control")
- [ ] AI limitations stated
- [ ] No medical claims (treat/cure language)

---

## Conclusion

**Verdict:** HerbAlly has strong product-market fit but needs trust infrastructure before scaling.

**The 80/20:**
- 80% of trust issues = 4 fixes: citations, evidence grades, prominent warnings, reviewer credits
- 20% of effort = biggest credibility boost

**Risk:** Without these fixes, "AI herbalist" positioning may backfire if users get bad advice without realizing limitations.

**Opportunity:** With fixes, HerbAlly could become the go-to reference for both consumers and practitioners — something no competitor currently achieves.

---

## Sources Referenced

1. HerbAlly Live Site — https://herbally.app
2. NCCIH HerbList — https://www.nccih.nih.gov/health/herblist-app
3. PMC Herb-Drug Interactions — https://pmc.ncbi.nlm.nih.gov/articles/PMC3575928/
4. PMC Adverse Reactions — https://pmc.ncbi.nlm.nih.gov/articles/PMC12605554/
5. StatPearls Herbal Supplements — https://www.ncbi.nlm.nih.gov/books/NBK536964/
6. Texas Medicinals Safety Guide — https://texasmedicinals.com/blogs/blog/a-grounded-guide-to-herbal-medicine-safety
7. PMC Herbal Medicine Use — https://pmc.ncbi.nlm.nih.gov/articles/PMC3887317/
8. PubMed Herb Interactions — https://pubmed.ncbi.nlm.nih.gov/38482621/

---

**Next Steps:** Approve priority fixes and I can begin implementation.
