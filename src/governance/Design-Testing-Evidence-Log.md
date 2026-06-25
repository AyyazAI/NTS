# Design Testing Evidence Log
## TaleemiMarkaz NTS Prep

This file records evidence of design QA across all review rounds.
Each round records: date, screens, reviewer, findings, resolution.

---

## Round v1 — Initial Design Review (Jun 22 2026)
**Date:** June 22, 2026
**Screens reviewed:** 6 screens (Home, Question, Solution, Progress, Profile, Admin)
**Reviewer:** Claude Chat (AI)

**Issues found:**
- Missing 5 screens (Onboarding, Sub-topic Selection, Mock Test, Mock Test Navigator, Mock Test Results)
- Bottom nav not consistent across screens
- Canvas persistence not addressed
- Progress screen had duplicate data vs Profile

**Resolution:** Actioned — Batch design round produced all 11 screens.

---

## Round v2 — 7-Screen Review (Jun 23 2026)
**Date:** June 23, 2026
**Screens reviewed:** 7 screens
**Reviewer:** Claude Chat (AI)

**Issues found:**
- Colour not matching teal #0D9488 — appeared blue
- Canvas tabs (Draw/Type/Upload) missing from question screens
- Solution explanation depth insufficient — steps too brief
- Method 2 not mapping onto Method 1 steps

**Resolution:** Actioned — colour corrected, canvas tabs added, solution depth increased.

---

## Round v3 — 11-Screen Review (Jun 23 2026)
**Date:** June 23, 2026
**Screens reviewed:** 11 screens (first full review)
**Reviewer:** Claude Chat (AI)

**Issues found:**
- Onboarding single-step — should be 2-step
- Mode indicator pill missing from question and solution screens
- Bottom bar overcrowded in mock test mode
- Category selector in onboarding too large

**Resolution:** Actioned — Onboarding rebuilt as 2-step, mode pills added, bar redesigned.

---

## Round v4 — Post-Rebuild Review (Jun 24 2026)
**Date:** June 24, 2026
**Screens reviewed:** 11 screens
**Reviewer:** Claude Chat (AI)

**Issues found:**
- Onboarding changes not yet applied to built screens
- Save Profile button missing from edit state
- Button rendering bug on mobile — text clipping
- Daily goal card not matching spec

**Resolution:** Actioned — All applied in subsequent batch.

---

## Round v5 — Pre-Phase 1 Review (Jun 24 2026)
**Date:** June 24, 2026
**Screens reviewed:** 11 screens
**Reviewer:** Claude Chat (AI)

**Issues found:**
- Onboarding Step 2 goals should default to optional, not required
- Formula depth still insufficient — C(7,5) repeated across methods
- C(7,5) label wrong — should be C(7,2) for the "leave out 2" approach
- Some overlapping elements on mobile viewport
- Method 1 and Method 2 not fully independent

**Resolution:** Actioned — Formula corrected, methods made independent, overlap fixed.

---

## Round v6 — QA Testing Session (Jun 25-26 2026)
**Date:** June 25-26, 2026
**Screens reviewed:** All 11 screens + Admin panel
**Reviewers:** Claude Chat (AI) + Playwright (Automation) + Ayyaz (Human)

### Three-Layer Results

| Layer | Tool | Findings | Time |
|---|---|---|---|
| Playwright automation | 9 spec failures | All fixed — commit 961095d | ~20 seconds |
| AI review | 12 spec mismatches | All fixed — commit 961095d | ~15 minutes |
| Human exploratory | 20+ critical findings | All fixed — commit 961095d | ~4 hours |

**Total issues found:** 50+
**Total issues resolved:** 50+
**Fix commit:** 961095d
**Tests after fix:** 57/57 passing

### Key findings that changed the spec (not just the code)

| Finding | Impact | SC Reference |
|---|---|---|
| NAT-I has no negative marking | Wrong exam strategy would have reached students | SC-01 |
| "Math" renamed to "Quantitative Reasoning" | Duplicate name with Engineering subject avoided | SC-02 |
| NAT-ICS CS split is 4+3+3 not 10+10+10 | Verified spec corrected | SC-03 |
| All 6 category subject sections verified | Accurate spec documented | SC-04 |
| No guest mode — onboarding mandatory | Teenage retention psychology | UX-001 |
| NTS preset dates replace date picker | 4 date validation issues eliminated | UX-004 |
| Home screen purpose = direction not progress | Reduces cognitive load | UX-006 |
| Mock test redesign (25min default) | Student habit formation | UX-007 |
| Avoidance pattern recognition needed | Learning psychology captured | PD-005 |
| Hint mode needed | Tutoring methodology captured | PD-006 |
| Readiness = correct/total (not correct/attempted) | Accurate exam preparedness metric | PD-004 |

### Incidents logged from this session
- INC-004: AI review missed Profile out-of-spec stats blocks
- INC-005: Negative marking factual error — NAT-I has no negative marking
- INC-006: AI review missed XP/speed bonus on Solution Correct
- INC-007: AI scope creep — XP feature added without approval
- INC-008: AI review missed wave emoji line-break issue

Full HITL evidence: src/governance/GOV-HITL-001-Evidence-Log.md
Full findings: src/governance/FINDINGS.md
Full incident log: src/governance/GOV-001-AI-Governance-Incident-Log.md
