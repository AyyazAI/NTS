# TaleemiMarkaz NTS Prep — Full Findings Document
## Testing Session: June 25-26, 2026
## Status: Pending Fix

---

## SEVERITY LEGEND
- 🔴 Critical — blocks core functionality or contains factual error
- 🟠 High — significant UX or spec violation
- 🟡 Medium — notable issue, workaround exists
- 🟢 Low — minor polish or enhancement

---

## CATEGORY A — FACTUAL / SPEC ERRORS (fix immediately)

| ID | Screen | Issue | Severity |
|---|---|---|---|
| A-01 | Mock Test | Negative marking shown (–0.25/wrong) — NAT-I has NO negative marking | 🔴 |
| A-02 | Mock Test Navigator | Q counter shows "Q4 of 20" — should be "Q4 of 90" | 🔴 |
| A-03 | Home / Progress | "Math" label — should be "Quantitative Reasoning" to avoid duplication with Engineering (NAT-IE) Mathematics subject | 🔴 |
| A-04 | Progress / Engineering | Engineering sub-topics show Physics, Chemistry, Mathematics, English — should be Physics, Chemistry, FSc Mathematics only (verified NTS spec) | 🔴 |
| A-05 | Onboarding Step 2 | Target score slider min=40 — NAT-I passing mark is 50, minimum should be 50 | 🔴 |

---

## CATEGORY B — BROKEN FUNCTIONALITY

| ID | Screen | Issue | Severity |
|---|---|---|---|
| B-01 | Mock Test | Flag icon does not update question grid cell to amber | 🔴 |
| B-02 | Practice / Mock | Canvas drawing not functional — UI shell only | 🔴 |
| B-03 | Practice / Mock | File upload does nothing — no preview, no confirmation | 🔴 |
| B-04 | Sub-topic Selection | Sub-topic rows not selectable — cannot choose specific area to practice | 🔴 |
| B-05 | Onboarding Step 1 | Name field not mandatory — can continue with mobile only | 🟠 |
| B-06 | Onboarding Step 2 | Date field accepts past dates via manual typing | 🟠 |
| B-07 | Onboarding Step 2 | Date field accepts dates beyond 1 year via manual typing | 🟠 |
| B-08 | Onboarding Step 2 | Invalid dates (30 Feb) accepted — no calendar date validation | 🟠 |
| B-09 | Onboarding Step 2 | Date allows today's date — minimum should be today + 7 days | 🟠 |
| B-10 | Practice Question | Back arrow visible on Q1 — should be hidden | 🟡 |

---

## CATEGORY C — OUT OF SPEC (remove or relocate)

| ID | Screen | Issue | Severity |
|---|---|---|---|
| C-01 | Solution Correct | "+10 XP earned / speed bonus" card — never approved, not in spec | 🟠 |
| C-02 | Profile | "Questions attempted / Solutions viewed / Topics covered / Accuracy" block — belongs on Progress screen | 🟠 |
| C-03 | Profile | "Mock Test Stats" block — belongs on Progress screen | 🟠 |
| C-04 | Mock Test | "Submit Test" as persistent bottom bar button — should only appear as confirmation dialog | 🟠 |
| C-05 | Progress | "Today's Focus" shows 4 items across 4 subjects — overwhelming, needs redesign | 🟠 |

---

## CATEGORY D — CONTRAST / VISIBILITY (GOV-RULE-012)

| ID | Screen | Issue | Severity |
|---|---|---|---|
| D-01 | ALL screens | Global rule: no light gray text on white/light backgrounds anywhere | 🟠 |
| D-02 | Onboarding Step 2 | NAT code labels (NAT-IE, NAT-IM etc) — light gray on white | 🟠 |
| D-03 | Onboarding Step 2 | "Required — select your test category" hint — too light | 🟠 |
| D-04 | Onboarding Step 2 | Category card names — not dark enough | 🟠 |
| D-05 | Practice / Mock | "Draw your working here" placeholder — light gray on light gray | 🟠 |
| D-06 | Practice / Mock | "Your work is saved if you navigate away" — light gray on white | 🟠 |
| D-07 | Admin header | "Project tracker · NTS-GOV-001 v1.1" subtitle — too light | 🟡 |

---

## CATEGORY E — UX / INTERACTION ISSUES

| ID | Screen | Issue | Severity |
|---|---|---|---|
| E-01 | Solution Wrong | "Try a similar question" not fixed at bottom — scrolls away (automation confirmed fixed — verify) | 🟠 |
| E-02 | Solution Wrong | "YOUR WORKING" always shows canvas language regardless of input method used | 🟠 |
| E-03 | Mock Test Submit | "Review Flagged Questions" and "Submit Test Anyway" buttons too close — tap target risk | 🟠 |
| E-04 | Mock Test Results | "Review All Questions" and "Practice Weak Areas" buttons too close | 🟠 |
| E-05 | Practice / Mock | Canvas and scratch pad renders below bottom nav — outside viewport | 🟡 |
| E-06 | Mock Test | "Engg" tab label truncated — should be "Engineering" | 🟡 |
| E-07 | Progress | Score trend chart has no axis labels — Y-axis and X-axis unlabelled | 🟠 |
| E-08 | Progress | "Focus here" only marks single weakest — should flag all below 50% | 🟠 |
| E-09 | Progress | Topic-level percentage needs warning label if below 50% or between 50-65% | 🟡 |

---

## CATEGORY F — ONBOARDING REDESIGN

| ID | Screen | Issue | Severity |
|---|---|---|---|
| F-01 | Onboarding Step 1 | Wave emoji 👋 on separate line — should be inline with heading | 🟡 |
| F-02 | Onboarding Step 1 | "Full name" placeholder — should be "Name" | 🟡 |
| F-03 | Onboarding Step 1 | No maxLength on name field — set to 50, minLength 2 | 🟡 |
| F-04 | Onboarding Step 1 | Mobile only — should offer Mobile OR Email choice | 🟡 |
| F-05 | Onboarding Step 1 | Skip link present — remove entirely, onboarding mandatory | 🟠 |
| F-06 | Onboarding Step 2 | Heading "Set your goals" — should be "Welcome aboard, [Name]!" | 🟡 |
| F-07 | Onboarding Step 2 | Question label "Which NAT-I are you preparing for?" — add word "category" | 🟡 |
| F-08 | Onboarding Step 2 | Category cards waste vertical space — redesign as compact pills | 🟡 |
| F-09 | Onboarding Step 2 | Date picker — replace with NTS preset test date selector | 🟠 |
| F-10 | Onboarding Step 2 | Target score default "Not yet" — should default to "Yes" with 60/90 | 🟠 |
| F-11 | Onboarding Step 2 | Target score step=1 — should be step=5 | 🟡 |
| F-12 | Onboarding Step 2 | Target date default "Not yet" — should default to "Yes" with today+90 days | 🟠 |

---

## CATEGORY G — GREETING / COPY

| ID | Screen | Issue | Severity |
|---|---|---|---|
| G-01 | Home | "Assalam-o-Alaikum" — religion-specific, replace with "Welcome, [Name]!" | 🟠 |
| G-02 | Home | Wave emoji on separate line — inline with greeting | 🟡 |
| G-03 | Home | Progress bar context ambiguous — unclear if practice or mock or overall | 🟠 |

---

## CATEGORY H — FIELD VALIDATIONS (global)

| Field | Rule | Current State |
|---|---|---|
| Name | Required, min 2, max 50, letters/spaces/hyphens only, no numbers/special chars | Not enforced |
| Mobile | Optional, Pakistani format 03XX-XXXXXXX, auto-hyphen, numeric keyboard | Partially enforced |
| Email | Optional (if chosen over mobile), valid format, max 100 chars | Not built |
| Date | Calendar only — no typing, min today+7, max today+365, NTS preset dates | Not enforced |
| Target score | Min 50, max 90, step 5 | Min=40, step=1 |
| File upload | JPG/PNG/PDF only, max 5MB, preview on success | Not enforced |

---

## CATEGORY I — PRODUCT DECISIONS (Phase 2+, document now)

| ID | Decision | Phase |
|---|---|---|
| PD-001 | Dynamic target progression — when student crosses target, suggest new one with university merit context | Phase 3 |
| PD-002 | University merit benchmarks — show NAT-I accepting universities only (COMSATS, Air University, Bahria etc) | Phase 5 |
| PD-003 | NAT-I accepting universities only in University Finder — UET/NUST use own tests | Phase 5 |
| PD-004 | Readiness score = correct/total (not correct/attempted) — unattempted = 0 | Phase 2 |
| PD-004b | Attempt counting — first attempt for scoring, last for progress, all stored | Phase 2 |
| PD-005 | Avoidance Pattern Recognition — detect systematically skipped topics, gentle intervention | Phase 3 |
| PD-006 | Hint Mode — 3 levels, Practice only, tracked separately, never in Mock Test | Phase 2 |
| SN-001 | Platform expansion — ECAT, NET, MDCAT, FPSC using same engine | Phase 5+ |
| BM-001 | B2B white-label for institutes (KIPS etc) — teacher dashboard, classroom mode | Phase 5+ |
| UX-001 | No guest mode — onboarding mandatory but frictionless | Phase 1 |
| UX-002 | Mobile OR Email choice on onboarding | Phase 1 |
| UX-003 | Defaults drive engagement — pre-select Yes on date and score | Phase 1 |
| UX-004 | Replace date picker with NTS schedule selector | Phase 1 |
| UX-005 | Personalisation at every touchpoint — use name naturally | Phase 1 |
| UX-006 | Home screen purpose = motivation and direction, not progress tracking | Phase 1 |
| UX-007 | Mock test: subject-focused 25-min, Mixed 30-min, Full simulation as milestone | Phase 2 |

---

## CATEGORY J — GOVERNANCE ADDITIONS

| ID | Rule | Description |
|---|---|---|
| GOV-RULE-010 | Visual Intelligence | AI must select appropriate visual type per question — not default to one format |
| GOV-RULE-011 | Content Moderation | All UGC passes moderation before AI processing or permanent storage |
| GOV-RULE-012 | High Contrast UI | No light gray text on white/light backgrounds. Ever. No exceptions |
| GOV-HITL-001 | HITL Evidence Log | Session June 25-26 2026 — 20+ human findings vs 9 automation findings |

---

## CATEGORY K — SCOPE CORRECTIONS (CLAUDE.md updates)

| ID | Correction |
|---|---|
| SC-01 | NAT-I has NO negative marking — confirmed across all 6 categories |
| SC-02 | Common section "Math" → rename to "Quantitative Reasoning" |
| SC-03 | NAT-ICS Computer Science subject split: Physics(10) + FSc Maths(10) + CS(4+3+3) |
| SC-04 | All 6 category subject sections verified and documented |
| SC-05 | Login/auth deferred to Phase 2 — Phase 1 uses localStorage |
| SC-06 | students table needs: login_method, login_identifier, otp_hash, otp_expires_at columns |
| SC-07 | attempts table needs: attempt_number, is_first_attempt, previous_result, hints_used, hint_assisted, skipped, time_spent |
| SC-08 | Two-mode comparison table (Practice vs Mock Test) locked in CLAUDE.md |
| SC-09 | QA buffer mandatory — no phase moves forward without 3-layer QA complete |
| SC-10 | Product mission statement: "Every student gets the same quality explanation a patient expert tutor would give" |

---

## AUTOMATION — NEW TEST CASES NEEDED

| Test | Covers |
|---|---|
| Date minimum today+7 | Issue B-09 |
| Typed past date rejected | Issue B-06 |
| Name field mandatory | Issue B-05 |
| Name field max 50 chars | Category H |
| Name field rejects numbers/special chars | Category H |
| Mobile/email choice present | UX-002 |
| No XP/speed bonus on solution correct | C-01 |
| No practice stats on profile | C-02, C-03 |
| Submit Test not in persistent bottom bar | C-04 |
| Flag updates grid cell colour | B-01 |
| Today's Focus max 3 items | C-05 |
| Greeting says Welcome not Assalam | G-01 |
| Skip link absent | F-05 |

---

## PRIORITY ORDER FOR CLAUDE CODE

### Fix in one session — ordered by dependency:

**Round 1 — Critical factual fixes (no dependencies)**
- A-01: Remove negative marking from mock test
- A-02: Fix Q counter to show of 90
- A-03: Rename Math → Quantitative Reasoning
- A-05: Fix slider min to 50, step to 5

**Round 2 — Onboarding rebuild**
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

**Round 3 — Profile and Progress cleanup**
- C-02, C-03: Remove stats blocks from Profile
- C-05: Redesign Today's Focus
- E-07: Add axis labels to score chart
- E-08, E-09: Fix Focus Here logic

**Round 4 — Mock Test fixes**
- B-01: Flag updates grid colour
- C-04: Remove Submit Test from bottom bar
- E-03, E-04: Button spacing fixes
- E-06: Fix Engg → Engineering tab label

**Round 5 — Solution screen fixes**
- C-01: Remove XP/speed bonus
- E-02: Working section context-aware per input method

**Round 6 — Global contrast**
- D-01 through D-07: All contrast fixes

**Round 7 — Field validations**
- All Category H items

**Round 8 — Automation**
- All Category K new test cases

