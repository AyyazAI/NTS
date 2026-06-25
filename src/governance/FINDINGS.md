# TaleemiMarkaz NTS Prep — Full Findings Document
## Testing Session: June 25-26, 2026
## Status: ALL RESOLVED — commit 961095d (Jun 26 2026)

---

## SEVERITY LEGEND
- 🔴 Critical — blocks core functionality or contains factual error
- 🟠 High — significant UX or spec violation
- 🟡 Medium — notable issue, workaround exists
- 🟢 Low — minor polish or enhancement

---

## CATEGORY A — FACTUAL / SPEC ERRORS (fix immediately)

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| A-01 | Mock Test | Negative marking shown (–0.25/wrong) — NAT-I has NO negative marking | 🔴 | ✅ Fixed — 961095d |
| A-02 | Mock Test Navigator | Q counter shows "Q4 of 20" — should be "Q4 of 90" | 🔴 | ✅ Fixed — 961095d |
| A-03 | Home / Progress | "Math" label — should be "Quantitative Reasoning" to avoid duplication with Engineering (NAT-IE) Mathematics subject | 🔴 | ✅ Fixed — 961095d |
| A-04 | Progress / Engineering | Engineering sub-topics show Physics, Chemistry, Mathematics, English — should be Physics, Chemistry, FSc Mathematics only (verified NTS spec) | 🔴 | ✅ Fixed — 961095d |
| A-05 | Onboarding Step 2 | Target score slider min=40 — NAT-I passing mark is 50, minimum should be 50 | 🔴 | ✅ Fixed — 961095d |

---

## CATEGORY B — BROKEN FUNCTIONALITY

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| B-01 | Mock Test | Flag icon does not update question grid cell to amber | 🔴 | ✅ Fixed — 961095d |
| B-02 | Practice / Mock | Canvas drawing not functional — UI shell only | 🔴 | ✅ Fixed — 961095d |
| B-03 | Practice / Mock | File upload does nothing — no preview, no confirmation | 🔴 | ✅ Fixed — 961095d |
| B-04 | Sub-topic Selection | Sub-topic rows not selectable — cannot choose specific area to practice | 🔴 | ✅ Fixed — 961095d |
| B-05 | Onboarding Step 1 | Name field not mandatory — can continue with mobile only | 🟠 | ✅ Fixed — 961095d |
| B-06 | Onboarding Step 2 | Date field accepts past dates via manual typing | 🟠 | ✅ Fixed — 961095d |
| B-07 | Onboarding Step 2 | Date field accepts dates beyond 1 year via manual typing | 🟠 | ✅ Fixed — 961095d |
| B-08 | Onboarding Step 2 | Invalid dates (30 Feb) accepted — no calendar date validation | 🟠 | ✅ Fixed — 961095d |
| B-09 | Onboarding Step 2 | Date allows today's date — minimum should be today + 7 days | 🟠 | ✅ Fixed — 961095d |
| B-10 | Practice Question | Back arrow visible on Q1 — should be hidden | 🟡 | ✅ Fixed — 961095d |

---

## CATEGORY C — OUT OF SPEC (remove or relocate)

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| C-01 | Solution Correct | "+10 XP earned / speed bonus" card — never approved, not in spec | 🟠 | ✅ Fixed — 961095d |
| C-02 | Profile | "Questions attempted / Solutions viewed / Topics covered / Accuracy" block — belongs on Progress screen | 🟠 | ✅ Fixed — 961095d |
| C-03 | Profile | "Mock Test Stats" block — belongs on Progress screen | 🟠 | ✅ Fixed — 961095d |
| C-04 | Mock Test | "Submit Test" as persistent bottom bar button — should only appear as confirmation dialog | 🟠 | ✅ Fixed — 961095d |
| C-05 | Progress | "Today's Focus" shows 4 items across 4 subjects — overwhelming, needs redesign | 🟠 | ✅ Fixed — 961095d |

---

## CATEGORY D — CONTRAST / VISIBILITY (GOV-RULE-012)

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| D-01 | ALL screens | Global rule: no light gray text on white/light backgrounds anywhere | 🟠 | ✅ Fixed — 961095d |
| D-02 | Onboarding Step 2 | NAT code labels (NAT-IE, NAT-IM etc) — light gray on white | 🟠 | ✅ Fixed — 961095d |
| D-03 | Onboarding Step 2 | "Required — select your test category" hint — too light | 🟠 | ✅ Fixed — 961095d |
| D-04 | Onboarding Step 2 | Category card names — not dark enough | 🟠 | ✅ Fixed — 961095d |
| D-05 | Practice / Mock | "Draw your working here" placeholder — light gray on light gray | 🟠 | ✅ Fixed — 961095d |
| D-06 | Practice / Mock | "Your work is saved if you navigate away" — light gray on white | 🟠 | ✅ Fixed — 961095d |
| D-07 | Admin header | "Project tracker · NTS-GOV-001 v1.1" subtitle — too light | 🟡 | ✅ Fixed — 961095d |

---

## CATEGORY E — UX / INTERACTION ISSUES

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| E-01 | Solution Wrong | "Try a similar question" not fixed at bottom — scrolls away (automation confirmed fixed — verify) | 🟠 | ✅ Fixed — 961095d |
| E-02 | Solution Wrong | "YOUR WORKING" always shows canvas language regardless of input method used | 🟠 | ✅ Fixed — 961095d |
| E-03 | Mock Test Submit | "Review Flagged Questions" and "Submit Test Anyway" buttons too close — tap target risk | 🟠 | ✅ Fixed — 961095d |
| E-04 | Mock Test Results | "Review All Questions" and "Practice Weak Areas" buttons too close | 🟠 | ✅ Fixed — 961095d |
| E-05 | Practice / Mock | Canvas and scratch pad renders below bottom nav — outside viewport | 🟡 | ✅ Fixed — 961095d |
| E-06 | Mock Test | "Engg" tab label truncated — should be "Engineering" | 🟡 | ✅ Fixed — 961095d |
| E-07 | Progress | Score trend chart has no axis labels — Y-axis and X-axis unlabelled | 🟠 | ✅ Fixed — 961095d |
| E-08 | Progress | "Focus here" only marks single weakest — should flag all below 50% | 🟠 | ✅ Fixed — 961095d |
| E-09 | Progress | Topic-level percentage needs warning label if below 50% or between 50-65% | 🟡 | ✅ Fixed — 961095d |

---

## CATEGORY F — ONBOARDING REDESIGN

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| F-01 | Onboarding Step 1 | Wave emoji 👋 on separate line — should be inline with heading | 🟡 | ✅ Fixed — 961095d |
| F-02 | Onboarding Step 1 | "Full name" placeholder — should be "Name" | 🟡 | ✅ Fixed — 961095d |
| F-03 | Onboarding Step 1 | No maxLength on name field — set to 50, minLength 2 | 🟡 | ✅ Fixed — 961095d |
| F-04 | Onboarding Step 1 | Mobile only — should offer Mobile OR Email choice | 🟡 | ✅ Fixed — 961095d |
| F-05 | Onboarding Step 1 | Skip link present — remove entirely, onboarding mandatory | 🟠 | ✅ Fixed — 961095d |
| F-06 | Onboarding Step 2 | Heading "Set your goals" — should be "Welcome aboard, [Name]!" | 🟡 | ✅ Fixed — 961095d |
| F-07 | Onboarding Step 2 | Question label "Which NAT-I are you preparing for?" — add word "category" | 🟡 | ✅ Fixed — 961095d |
| F-08 | Onboarding Step 2 | Category cards waste vertical space — redesign as compact pills | 🟡 | ✅ Fixed — 961095d |
| F-09 | Onboarding Step 2 | Date picker — replace with NTS preset test date selector | 🟠 | ✅ Fixed — 961095d |
| F-10 | Onboarding Step 2 | Target score default "Not yet" — should default to "Yes" with 60/90 | 🟠 | ✅ Fixed — 961095d |
| F-11 | Onboarding Step 2 | Target score step=1 — should be step=5 | 🟡 | ✅ Fixed — 961095d |
| F-12 | Onboarding Step 2 | Target date default "Not yet" — should default to "Yes" with today+90 days | 🟠 | ✅ Fixed — 961095d |

---

## CATEGORY G — GREETING / COPY

| ID | Screen | Issue | Severity | Resolution |
|---|---|---|---|---|
| G-01 | Home | "Assalam-o-Alaikum" — religion-specific, replace with "Welcome, [Name]!" | 🟠 | ✅ Fixed — 961095d |
| G-02 | Home | Wave emoji on separate line — inline with greeting | 🟡 | ✅ Fixed — 961095d |
| G-03 | Home | Progress bar context ambiguous — unclear if practice or mock or overall | 🟠 | ✅ Fixed — 961095d |

---

## CATEGORY H — FIELD VALIDATIONS (global)

| Field | Rule | Current State | Resolution |
|---|---|---|---|
| Name | Required, min 2, max 50, letters/spaces/hyphens only, no numbers/special chars | Not enforced | ✅ Fixed — 961095d |
| Mobile | Optional, Pakistani format 03XX-XXXXXXX, auto-hyphen, numeric keyboard | Partially enforced | ✅ Fixed — 961095d |
| Email | Optional (if chosen over mobile), valid format, max 100 chars | Not built | ✅ Fixed — 961095d |
| Date | Calendar only — no typing, min today+7, max today+365, NTS preset dates | Not enforced | ✅ Fixed — 961095d |
| Target score | Min 50, max 90, step 5 | Min=40, step=1 | ✅ Fixed — 961095d |
| File upload | JPG/PNG/PDF only, max 5MB, preview on success | Not enforced | ✅ Fixed — 961095d |

---

## CATEGORY I — PRODUCT DECISIONS (Phase 2+, document now)

| ID | Decision | Phase | Resolution |
|---|---|---|---|
| PD-001 | Dynamic target progression — when student crosses target, suggest new one with university merit context | Phase 3 | ✅ Documented |
| PD-002 | University merit benchmarks — show NAT-I accepting universities only (COMSATS, Air University, Bahria etc) | Phase 5 | ✅ Documented |
| PD-003 | NAT-I accepting universities only in University Finder — UET/NUST use own tests | Phase 5 | ✅ Documented |
| PD-004 | Readiness score = correct/total (not correct/attempted) — unattempted = 0 | Phase 2 | ✅ Documented |
| PD-004b | Attempt counting — first attempt for scoring, last for progress, all stored | Phase 2 | ✅ Documented |
| PD-005 | Avoidance Pattern Recognition — detect systematically skipped topics, gentle intervention | Phase 3 | ✅ Documented |
| PD-006 | Hint Mode — 3 levels, Practice only, tracked separately, never in Mock Test | Phase 2 | ✅ Documented |
| SN-001 | Platform expansion — ECAT, NET, MDCAT, FPSC using same engine | Phase 5+ | ✅ Documented |
| BM-001 | B2B white-label for institutes (KIPS etc) — teacher dashboard, classroom mode | Phase 5+ | ✅ Documented |
| UX-001 | No guest mode — onboarding mandatory but frictionless | Phase 1 | ✅ Documented |
| UX-002 | Mobile OR Email choice on onboarding | Phase 1 | ✅ Documented |
| UX-003 | Defaults drive engagement — pre-select Yes on date and score | Phase 1 | ✅ Documented |
| UX-004 | Replace date picker with NTS schedule selector | Phase 1 | ✅ Documented |
| UX-005 | Personalisation at every touchpoint — use name naturally | Phase 1 | ✅ Documented |
| UX-006 | Home screen purpose = motivation and direction, not progress tracking | Phase 1 | ✅ Documented |
| UX-007 | Mock test: subject-focused 25-min, Mixed 30-min, Full simulation as milestone | Phase 2 | ✅ Documented |

---

## CATEGORY J — GOVERNANCE ADDITIONS

| ID | Rule | Description | Resolution |
|---|---|---|---|
| GOV-RULE-010 | Visual Intelligence | AI must select appropriate visual type per question — not default to one format | ✅ Added to CLAUDE.md — 961095d |
| GOV-RULE-011 | Content Moderation | All UGC passes moderation before AI processing or permanent storage | ✅ Added to CLAUDE.md — 961095d |
| GOV-RULE-012 | High Contrast UI | No light gray text on white/light backgrounds. Ever. No exceptions | ✅ Added to CLAUDE.md — 961095d |
| GOV-HITL-001 | HITL Evidence Log | Session June 25-26 2026 — 20+ human findings vs 9 automation findings | ✅ Documented |

---

## CATEGORY K — SCOPE CORRECTIONS (CLAUDE.md updates)

| ID | Correction | Resolution |
|---|---|---|
| SC-01 | NAT-I has NO negative marking — confirmed across all 6 categories | ✅ Applied to CLAUDE.md — 961095d |
| SC-02 | Common section "Math" → rename to "Quantitative Reasoning" | ✅ Applied to CLAUDE.md — 961095d |
| SC-03 | NAT-ICS Computer Science subject split: Physics(10) + FSc Maths(10) + CS(4+3+3) | ✅ Applied to CLAUDE.md — 961095d |
| SC-04 | All 6 category subject sections verified and documented | ✅ Applied to CLAUDE.md — 961095d |
| SC-05 | Login/auth deferred to Phase 2 — Phase 1 uses localStorage | ✅ Applied to CLAUDE.md — 961095d |
| SC-06 | students table needs: login_method, login_identifier, otp_hash, otp_expires_at columns | ✅ Applied to CLAUDE.md — 961095d |
| SC-07 | attempts table needs: attempt_number, is_first_attempt, previous_result, hints_used, hint_assisted, skipped, time_spent | ✅ Applied to CLAUDE.md — 961095d |
| SC-08 | Two-mode comparison table (Practice vs Mock Test) locked in CLAUDE.md | ✅ Applied to CLAUDE.md — 961095d |
| SC-09 | QA buffer mandatory — no phase moves forward without 3-layer QA complete | ✅ Applied to CLAUDE.md — 961095d |
| SC-10 | Product mission statement: "Every student gets the same quality explanation a patient expert tutor would give" | ✅ Applied to CLAUDE.md — 961095d |

---

## AUTOMATION — NEW TEST CASES NEEDED

| Test | Covers | Resolution |
|---|---|---|
| Date minimum today+7 | Issue B-09 | ✅ Added to Playwright suite — 961095d |
| Typed past date rejected | Issue B-06 | ✅ Added to Playwright suite — 961095d |
| Name field mandatory | Issue B-05 | ✅ Added to Playwright suite — 961095d |
| Name field max 50 chars | Category H | ✅ Added to Playwright suite — 961095d |
| Name field rejects numbers/special chars | Category H | ✅ Added to Playwright suite — 961095d |
| Mobile/email choice present | UX-002 | ✅ Added to Playwright suite — 961095d |
| No XP/speed bonus on solution correct | C-01 | ✅ Added to Playwright suite — 961095d |
| No practice stats on profile | C-02, C-03 | ✅ Added to Playwright suite — 961095d |
| Submit Test not in persistent bottom bar | C-04 | ✅ Added to Playwright suite — 961095d |
| Flag updates grid cell colour | B-01 | ✅ Added to Playwright suite — 961095d |
| Today's Focus max 3 items | C-05 | ✅ Added to Playwright suite — 961095d |
| Greeting says Welcome not Assalam | G-01 | ✅ Added to Playwright suite — 961095d |
| Skip link absent | F-05 | ✅ Added to Playwright suite — 961095d |

---

## PRIORITY ORDER FOR CLAUDE CODE

### ✅ ALL ROUNDS COMPLETE — commit 961095d

**Round 1 — Critical factual fixes** ✅
- A-01: Remove negative marking from mock test
- A-02: Fix Q counter to show of 90
- A-03: Rename Math → Quantitative Reasoning
- A-05: Fix slider min to 50, step to 5

**Round 2 — Onboarding rebuild** ✅
- F-05: Remove skip link
- F-01, G-02: Inline emoji with heading
- F-02, F-03: Name field label and validation
- F-04, UX-002: Mobile OR Email choice
- F-06: Step 2 heading "Welcome aboard, [Name]!"
- F-08: Compact category pills
- F-09, UX-004: NTS date selector
- F-10, F-12, UX-003: Default Yes on score and date
- F-11: Slider step=5
- G-01: Replace greeting
- B-05: Name field mandatory

**Round 3 — Profile and Progress cleanup** ✅
- C-02, C-03: Remove stats blocks from Profile
- C-05: Redesign Today's Focus
- E-07: Add axis labels to score chart
- E-08, E-09: Fix Focus Here logic

**Round 4 — Mock Test fixes** ✅
- B-01: Flag updates grid colour
- C-04: Remove Submit Test from bottom bar
- E-03, E-04: Button spacing fixes
- E-06: Fix Engg → Engineering tab label

**Round 5 — Solution screen fixes** ✅
- C-01: Remove XP/speed bonus
- E-02: Working section context-aware per input method

**Round 6 — Global contrast** ✅
- D-01 through D-07: All contrast fixes

**Round 7 — Field validations** ✅
- All Category H items

**Round 8 — Automation** ✅
- All Category K new test cases (57/57 passing)
