# TaleemiMarkaz NTS Prep — UX & Product Decisions

> All decisions with rationale. REVERSED decisions marked clearly.
> Technical spec and screen inventory → see SPEC.md
> Governance incidents → see src/governance/

---

## UX Decisions

### UX-001 — No Guest Mode
Onboarding is mandatory. No skip link. No guest mode.
**Rationale:** 17-19 year old students will not distinguish session-based vs persistent data. One "doesn't save progress" experience = permanent churn. Onboarding must be frictionless (target: 15 seconds) not skippable.

### UX-002 — Mobile OR Email Choice
Contact field offers Mobile OR Email — student's choice. Neither mandatory in Phase 1, but if provided must be valid.
- Mobile: Pakistani format 03XX-XXXXXXX, numeric keyboard
- Email: standard validation, email keyboard
- Either becomes Phase 2 login identifier.

### UX-003 — Defaults Drive Engagement
Pre-select the richest-experience option:
- Target score: default Yes, slider at 60/90
- Test date: default first upcoming NTS date
**Principle:** "Default to engagement, not avoidance."

### UX-004 — NTS Preset Date Selector
Replace date picker entirely with radio list of upcoming NAT-I dates. Student taps one date — done. Zero validation complexity. Admin manages dates via admin panel.
**Closed:** B-06, B-07, B-08, B-09 — all date validation bugs eliminated by design.

### UX-005 — Personalisation at Natural Touchpoints
Use student's name where it genuinely warms the interaction:
- Step 2 heading: "Welcome aboard, [Name]!"
- Home greeting: "Welcome, [Name]! 👋"
- Solution correct: "Nice work, [Name]!"
- Target crossed: "You hit your target, [Name]! 🎉"
Never mechanical — only where it feels natural.

### UX-006 — Home Screen Purpose
Home screen: motivate and direct to action. NOT a dashboard — Progress screen handles that.
Shows: greeting, daily prompt, 4 section cards, mode toggle.
Removes: ambiguous progress bars (unclear if practice/mock/overall).

### UX-007 — Mock Test Redesign (Phase 2)
Default mock test: subject-focused, 25 minutes, difficulty choice.
Student selects: section + Easy/Medium/Hard/Mixed.
Mixed (all sections): 30 minutes — extra time for context switching.
Full 90-question simulation: available as milestone, not default.
**Rationale:** No student voluntarily sits 120 minutes. 25-min sessions build habit and return visits. Full test is earned achievement.

### UX-008 — Rough Work Area (Bottom-Sheet Pattern)
Canvas is a compact always-visible "Rough work area" box below answer options.
- **Trigger:** Double-tap (desktop: dblclick; mobile: two taps <300ms)
- **Modal:** Opens as bottom-sheet, max 62vh — question and answer options remain visible above
- **Modal header:** Cancel | Rough Work | Done
- **Draw tab:** thick pen, thin pen, eraser, undo, clear + HTML5 canvas (500px height minimum, scrollable container)
- **Type tab:** textarea
- **Done:** captures preview — canvas data URL or text. Preview shown inline in the box.
- **Preview:** auto-expands to show full content. No fixed height cap. No truncation.
- **Persistence:** drawing and typed content persist within the component mount (per question)
- **Mock mode:** modal footer shows "⚠️ Timer keeps running while this is open"
- **Both modes:** Draw/Type only in Phase 1. Upload returns in Phase 2 with Claude Vision.

---

## Product Decisions

### PD-001 — Dynamic Target Progression (Phase 3)
When student crosses their target score, app detects it, celebrates, and immediately suggests a new target with university merit context.
Example: Hit 70% → "Top engineering universities need 75%+. Ready?"

**Phase 2 — Readiness Gauge Behaviour:**
Readiness gauge fills based on current score vs target score — NOT vs 90.
Updates automatically when student changes target in Profile.
- Score ≥ target → full donut + "Goal achieved! 🎉"
- Score < target → partial fill showing progress toward target with gap message

### PD-002 — University Merit Benchmarks (Phase 5)
Show NAT-I accepting universities with closing merit benchmarks on the progress graph as reference lines. Data from public merit lists, updated annually.
- FAST, COMSATS, Air University, Bahria accept NAT-I ✅
- UET, NUST, GIKI conduct own tests — NEVER show as NAT-I targets

### PD-003 — University Finder: NAT-I Only (Phase 5)
University Finder shows only universities that accept NAT-I scores. Showing NUST/UET targets based on NAT-I would mislead students into thinking NAT-I is the path to those institutions.

### PD-004 — Readiness Score as Primary Metric (Phase 2)
Three metrics tracked separately:
- **Accuracy:** correct / attempted (how well they answer when they try)
- **Coverage:** attempted / total (how much syllabus covered)
- **Readiness:** correct / total (true exam preparedness — unattempted = 0, same as real NAT-I)

Weakest area detection uses Readiness, not Accuracy.

Attempt counting rules:
- First attempt: used for accuracy and readiness scoring
- Last attempt: used for progress tracking
- All attempts: stored for avoidance pattern and hint analysis

### PD-005 — Avoidance Pattern Recognition (Phase 3)
Detect topics a student systematically skips — not weakness, but avoidance.

Two avoidance types:
- **Conscious** (<5 seconds then skip): "I saw it and ran"
- **Frustrated** (>30 seconds then skip): "I tried and gave up"

Different interventions:
- Conscious → "Just try one easy one — we'll walk you through it"
- Frustrated → "Let's look at the concept first, then try again"

Tone: never accusatory, always encouraging.
DB columns: `skipped (0|1), time_spent (seconds), skip_type (conscious|frustrated|null)`

### PD-006 — Hint Mode (Phase 2)
Three-level hint system in Practice Mode only.
- Level 1 — Nudge: directional, no method revealed
- Level 2 — Direction: identifies the approach needed
- Level 3 — First step: gives the opening move only

Rules:
- Toggle on/off per session
- Tracked: `hints_used (0,1,2,3)`, `hint_assisted (0|1)`
- Score recorded but flagged as hint-assisted
- NEVER available in Mock Test — architecturally absent, not hidden

### PD-007 — Home Progress Bars: Coverage vs Accuracy (Phase 1)
Home bars show coverage (attempted/total) until 10+ questions attempted per section.
After 10+, switches to accuracy display.
**Rationale:** 2/20 at 100% accuracy is not a meaningful accuracy score. Coverage is the honest metric early on.

### PD-008 — Target University Feature Dropped ~~REMOVED~~
Target university field removed from onboarding, profile, and all screens.
**Rationale:** NUST, UET, GIKI, LUMS conduct their own entry tests and do not accept NAT-I. Showing university targets based on NAT-I score misleads students.
**Future:** University Finder in Phase 5 — NAT-I accepting institutions only (PD-002, PD-003).

### PD-009 — Canvas Upload Tab Deferred to Phase 2
Upload tab removed from Canvas in Phase 1.
**Rationale:** Upload is only useful when Claude Vision is active to analyse the working. Without AI analysis, upload is a dead feature. Returns in Phase 2 with full Claude Vision integration.

---

## GOV-RULE-014 — Selection Theme

All selectable and option components follow one consistent visual language:

| State | Background | Border | Text |
|---|---|---|---|
| Unselected | bg-blue-100 | border-blue-300 | text-gray-900 |
| Selected | bg-teal-600 | border-teal-600 | text-white |
| Back buttons | bg-blue-100 | border-blue-300 | text-gray-900 |
| Disabled (Let's go!) | bg-gray-200 | border-gray-300 | text-gray-500 |

**Applies to:** Answer options (A/B/C/D), NAT category pills, test date radio rows, Yes/Not yet toggles, difficulty buttons, Mobile/Email toggles, back navigation buttons, and all other selectable cards or pills.

**Rationale:** Inconsistent prior states (gray-50, bg-white, gray-100) created ambiguous visual hierarchy. Blue-100→teal-600 makes selection intent unambiguous at every interaction point. Established Round 7 (2026-06-27).

---

## Solution Screen Navigation

**Decision (R7-04, 2026-06-27):** Show Solution navigates to `/solution/wrong` as a dedicated page. Solution screen is neutral — no wrong/correct framing on entry via Show Solution.

**"← Back to Practice" button:** Shown on `/solution/wrong` when accessed via Show Solution (detected via React Router location state `fromShowSolution: true`). Returns student to practice session via `navigate(-1)`.

**REVERSED — Inline Solution Panel:**
~~R6 built an inline solution panel that expanded on the same page as the question.~~
Reversed in R7-04. Reasons:
1. Inline panel cluttered the question screen and conflicted with the canvas rough work area
2. Dedicated solution page allows full method tabs, step expansion, and fixed CTA bar without scroll conflicts
3. Back to Practice preserves full session state via React Router history

---

## Progress Screen: Week/Month Only

**Decision (R7-12, 2026-06-27):** Progress chart time range offers Week and Month only. "All" tab removed.

**Rationale:** "All time" data is only meaningful once a student has weeks of history. In Phase 1 with static data it is misleading. Will be reconsidered when live data exists and a student has enough sessions to make "All time" meaningful.

---

## Chart Colours

- Practice progress charts: **teal** (#0D9488)
- Mock test charts: **amber** (#D97706)

This is intentional — amber is the mock test mode colour (timer, pill), so mock test data inherits it. Teal is the primary brand/practice colour.

---

## NAT Category: Readonly on Profile

**Decision:** NAT-I Category is readonly in Profile edit mode. Displays current category + note: "Contact support to change your category."

**Rationale:** Changing category mid-session would invalidate practice history (all subject-specific questions, progress bars, mock test results) and require a full data migration. Phase 2 will add a formal category change flow. For Phase 1, this is a one-time setup choice.

---

## Strategic Decisions

### SN-001 — Platform Expansion Beyond NAT-I (Phase 5+)
The core engine (question bank, AI explanations, visual solutions, canvas, progress, mock tests) is test-agnostic. Expansion candidates: ECAT, NET (NUST), GIKI, MDCAT, LUMS SSE, FPSC/CSS, NTS Job Tests.
Vision: Pakistan's AI-powered exam preparation platform — one engine, multiple tests, same mission.

### BM-001 — B2B White-Label for Institutes (Phase 5+)
White-labelled version for KIPS, Allied Schools, Beaconhouse academies, etc.
Features: teacher dashboard, classroom mode, batch management, content management, progress reports.
Revenue: B2B subscription per campus/batch. Student platform stays free forever.
**Sequencing:** Build for students first — institutes buy proven results.

---

## Premium Membership Model (Phase 3-4)

**Price:** Rs. 1000/month — "one McDonald's meal"
**First 1-2 weeks free** for all students

| Feature | Free | Premium |
|---|---|---|
| All questions + explanations | ✅ | ✅ |
| Canvas working | ✅ | ✅ |
| Mock tests | ✅ | ✅ |
| Basic progress (session) | ✅ | ✅ |
| Social sharing cards | ✅ | ✅ |
| Full attempt history | ❌ | ✅ |
| Canvas archive | ❌ | ✅ |
| Live chatbot follow-up | ❌ | ✅ |
| Monthly PDF report | ❌ | ✅ |
| Offline practice pack | ❌ | ✅ |
| Early feature access | ❌ | ✅ |
| Achievement badges | ❌ | ✅ |

Payment: JazzCash, EasyPaisa, credit/debit card

### Offline Practice Pack (Phase 3-4)
PDF download (10-20 questions, answer bubbles, working space).
Student solves offline → photographs → uploads.
Claude Vision reads bubbles (reliable) + working (best effort).
Confirmation step before saving results. Graceful fallback if handwriting unreadable.
