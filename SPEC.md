# TaleemiMarkaz NTS Prep — Product Specification

> Full spec for screens, NAT-I structure, phases, schema, and AI quality standards.
> Decisions and rationale → see DECISIONS.md
> Governance incidents → see src/governance/

---

## NAT-I Verified Paper Structure

Source: Official NTS documentation — verified June 2026

**Total: 90 MCQs · 120 minutes · No negative marking · Passing mark: 50/90 · Result valid: 1 year**

### Common Sections — identical across ALL 6 categories (60 MCQs)

| Section | MCQs | Sub-topics |
|---|---|---|
| Section 1: Verbal (English) | 20 | Synonyms, antonyms, grammar, sentence completion, comprehension, analogies |
| Section 2: Analytical Reasoning | 20 | Selection, sequencing, blood relations, directions, syllogisms, combinations |
| Section 3: Quantitative Reasoning | 20 | Arithmetic, percentages, ratios, algebra, averages, geometry |

### Subject-Specific Section — varies by category (30 MCQs)

| Category | Sub-topic 1 | Sub-topic 2 | Sub-topic 3 | Total |
|---|---|---|---|---|
| NAT-IE Engineering | Physics (10) | Chemistry (10) | FSc Mathematics (10) | 30 |
| NAT-IM Medical | Physics (10) | Chemistry (10) | Biology (10) | 30 |
| NAT-ICS Computer Science | Physics (10) | FSc Mathematics (10) | CS: Intro(4) + Programming(3) + Database(3) | 30 |
| NAT-ICOM Commerce | Accounting (10) | Commerce (10) | Economics (10) | 30 |
| NAT-IGS General Sciences | Mathematics (10) | Statistics (10) | Economics (10) | 30 |
| NAT-IA Arts | Islamiyat / Ethics (10) | Pakistan Studies (10) | General Knowledge (10) | 30 |

**Confirmed facts:**
- NAT-I has NO negative marking across all 6 categories (SC-01)
- NAT-ICS CS portion is 4+3+3, NOT equal 10+10+10 (SC-03)
- Common section is "Quantitative Reasoning" not "Math" (SC-02)
- Phase 1 active category: NAT-IE (Engineering only)

### NTS Test Dates (2026)

July 12 · August 16 · September 6 · October 4 · November 1
"I'll decide later" is always the final option in the selector.
Admin manages these dates via admin panel — no hardcoding.

---

## Two Practice Modes

### Practice Mode (Learning)
- Show Solution always available
- No timer, no negative marking
- Sub-topic selection available
- Wrong answer → forced solution screen with error diagnosis
- Correct answer → option to explore methods or skip to next
- Show Solution → marks as "Learned" (separate from Attempted, no accuracy penalty)
- Canvas working analysed on wrong answers (Phase 2: Claude Vision)

### Mock Test Mode (Exam Simulation)
- No Show Solution during test
- 120-minute countdown timer (90 MCQs, 4 sections)
- No negative marking (SC-01)
- Flag and navigate freely
- No sub-topic selection — full mixed paper
- Timer colour: teal → amber at 5 min → red at 1 min (no popup)
- Section label above each question (Section 1–4)
- Timer runs out → auto-submit immediately
- Full solution review only after test submitted
- Browser closed mid-test → resumes on return
- Score: whole numbers only (correct count out of 90)
- Coverage warning if < 60 questions attempted on Results screen

### Mode Comparison Table

| Feature | Practice Mode | Mock Test Mode |
|---|---|---|
| Purpose | Learn and improve | Simulate and assess |
| Mode pill | 📚 Practice Mode (teal) | ⏱️ NAT-I Mock Test (amber) |
| Timer | No timer | 120 min countdown |
| Negative marking | No | No (SC-01) |
| Hints | ✅ 3 levels (Phase 2) | ❌ Architecturally absent |
| Show Solution | ✅ Always available | ❌ Never during test |
| Canvas | ✅ Persists per question | ✅ Session only |
| Sub-topic filter | Yes — multi-selectable | No — full section |
| Question count | Per topic / session | 90 MCQs, 4 sections |
| Difficulty | Easy / Medium / Hard / Mixed | Full NAT-I mix |
| Flag questions | Yes | Yes — updates navigator grid immediately |
| Back navigation | ✅ Free (‹ hidden on Q1) | ✅ Via question navigator grid |
| Wrong answer | Auto-show solution | Stored — review after test |
| Correct answer | Explore methods or Next | Stored — review after test |
| Submit Test button | Not applicable | Confirmation dialog — not in persistent bar |
| Section tabs | No | Yes — 4 sections |
| Question grid | No | Yes — flagged/answered/unseen states |
| Scoring tracked | Practice tab | Mock Tests tab |

---

## Answer Flow

### Wrong Answer
1. Wrong detected
2. If canvas working exists → Claude Vision analyses, identifies wrong step (Phase 2)
3. Student taken to Solution screen automatically
4. Working shown with error: "You went wrong here — [specific error]"
5. Full solution — all methods visible, all steps expanded
6. "Try a similar question →" fixed at bottom

### Correct Answer
1. "Correct — nice work! 🎉"
2. Two options: [Explore methods] [Next Question →]
3. Explore → Solution screen, student's method auto-selected
4. Next Question → straight to next, no solution shown

### Show Solution (student gives up)
- Practice Mode only
- Marks as "Learned" — does not affect accuracy %
- Goes to full Solution screen immediately

---

## Navigation & Structural Rules

- Bottom navigation on ALL screens: Home, Practice, Mock, Progress, Profile
- Bottom nav: 80px minimum padding — never overlaps device controls
- Question screens: ‹ hidden on Q1, always show ›
- Flag 🚩 at TOP RIGHT of question card — not in bottom bar
- Canvas working persists when navigating between questions
- Unsaved profile changes → warning dialog before navigating away
- Profile edit: Cancel → "Discard changes?" confirmation dialog
- Profile edit: Save → inline validation errors only, auto-scroll to first invalid field

---

## Screen Inventory — FINAL (11 screens)

Design reference: src/governance/design/NTS_Prep_Design.html (interactive prototype)
Colours: #0D9488 teal, #D97706 amber, #DC2626 red (timer only). Font: Nunito.

### Screen 1 — Onboarding (2 steps)

**Step 1 — Mandatory fields:**
- Name (required, letters/spaces/hyphens only, min 2 chars, max 50 chars, blur validation)
- Contact toggle: [Mobile number] [Email] — both optional; either becomes Phase 2 login identifier
- No skip link — onboarding is mandatory (UX-001)
- Mobile format: 03XX-XXXXXXX, numeric keyboard
- Email: standard validation, email keyboard

**Step 2 — Category mandatory, goals optional:**
- Heading: "Welcome aboard, [Name]!" (UX-005)
- NAT-I category selector — MANDATORY
  - Label: "Which NAT-I category are you preparing for?"
  - 6 pills: Engineering (NAT-IE), Medical (NAT-IM), Computer Science (NAT-ICS), Commerce (NAT-ICOM), General Sciences (NAT-IGS), Arts (NAT-IA)
  - Selected: teal background + white text
  - "Let's go! →" disabled until category selected
- Test date: NTS preset radio list (5 dates + "I'll decide later") — no free-text picker (UX-004)
- Target score: defaults Yes, slider min=50 max=90 step=5 default=60 (UX-003)
  - Label: "Target Score: X/90"
  - Helper: "NAT-I passing mark is 50/90"
- No university field (PD-008)
- "Let's go! →" button: disabled = gray-200/gray-500/gray-300, enabled = teal

### Screen 2 — Home

- TaleemiMarkaz logo + "NTS Prep" header — every screen
- "Welcome, [Name]! 👋" (reads student_name from localStorage — UX-005)
- "Ready to practice? Pick a section below." (UX-006)
- Mode toggle: [📚 Practice Mode] [⏱️ Mock Test]
- Practice selected → 4 topic cards:
  - English — X of 20 questions attempted
  - Quantitative Reasoning — X of 20 questions attempted
  - Analytical Reasoning — X of 20 questions attempted
  - [Subject label e.g. "Engineering (NAT-IE)"] — X of 30 questions attempted
  - Bar colour: green >70%, amber 50–70%, red <50%
- Mock Test selected → topic cards hidden, "Start Mock Test → 90 MCQs · 120 min" CTA

### Screen 3 — Sub-topic Selection (Practice only)

- "📚 Practice Mode" pill below header
- "Choose what to practice" + topic name
- Sub-topic rows — multi-selectable (teal border + "✓ Selected" badge when selected)
- Sub-topic list with progress bars, "⚠️ Focus here" on weakest
- NAT-IE subject section: Physics (10), Chemistry (10), FSc Mathematics (10)
- Difficulty: [Easy] [Medium] [Hard] [Mixed]
- CTA: "Start Practice — Mixed →" (no selection) or "Practice N topic(s) →" (with selection)

### Screen 4 — Question Screen (Practice Mode)

- "📚 Practice Mode" pill
- Topic + sub-topic tag, question number (e.g. "Question 1 of 20")
- Flag 🚩 top right of question card
- 4 answer options (GOV-RULE-014 blue-100/teal-600 selection pattern)
- Rough work area (UX-008): always-visible inline box below options; double-tap opens modal
- Bottom bar Q1: [Show Solution] [Submit Answer] [›]
- Bottom bar Q2+: [‹] [Show Solution] [Submit Answer] [›]
- Submit Answer greyed until option selected
- Canvas: [✏️ Draw] [⌨️ Type] tabs — Upload deferred to Phase 2 (PD-009)
  - Draw: thick pen, thin pen, eraser, undo, clear toolbar
  - Tab tracked in localStorage (canvas_last_tab)

### Screen 5 — Question Screen (Mock Test Mode)

- "⏱️ NAT-I Mock Test" amber pill
- Section label above question card:
  - Q1–20: "Section 1: Verbal"
  - Q21–40: "Section 2: Analytical Reasoning"
  - Q41–60: "Section 3: Quantitative Reasoning"
  - Q61–90: "Section 4: [Subject label]" — dynamic per nat_category
- Timer top right (teal → amber 5min → red 1min), starts at 120:00
- Question counter: Q X / section_total + "of 90" global
- Score display (teal card, no negative marking — SC-01)
- Flag 🚩 top right of question card
- NO Show Solution button
- Bottom bar: [‹] [Submit Answer] [›] only — no Submit Test in persistent bar
- Canvas: Draw/Type only (Upload Phase 2)

### Screen 6 — Solution Screen (Wrong Answer)

- Header: "Not quite — let's see why 🤔" (neutral/amber, never red)
- "You selected B — Correct answer is A" side by side
- YOUR WORKING section: shown only if canvas_last_tab set in localStorage
  - draw tab → canvas sketch placeholder + ⚠️ Error here marker
  - type tab → typed text + ⚠️ Error here marker
  - null (no canvas used) → section hidden entirely
- "Three ways to see the solution"
- Method tabs: [✓ Count] [Formula] [Grid]
  - Method 1 (Count): full listing, zero formula, zero C(n,r)
  - Method 2 (Formula): maps C(n,r) onto Method 1 steps explicitly
  - Method 3 (Visual): actual SVG diagram, high contrast colours
- All steps fully expanded — nothing hidden
- Each step: teal circle number + bold title + explanation + boxed working + 💡 note
- Bridge card after Method 1: "🎯 Challenge yourself — try the formula next time"
- "Try a similar question →" FIXED at bottom, never scrolls
- If accessed via Show Solution: shows "← Back to Practice" + "Next Question →" instead

### Screen 7 — Solution Screen (Correct Answer)

- "Correct — nice work! 🎉" teal
- "You answered in X seconds"
- No XP badges, no speed bonus cards
- [Explore methods] [Next Question →]
- Motivational message below buttons

### Screen 8 — Progress Screen

Toggle: [📚 Practice] [⏱️ Mock Tests]

**Practice tab:**
- Score trend line chart + Week / Month toggle (no All tab — R7-12)
  - Y-axis: 100 / 75 / 50
  - Dashed red pass mark line at 50% with "Pass" label
  - X-axis: date-aware labels (e.g. "Mon 23")
  - Data point value on last point
- Sub-topic breakdown accordion — 4 sections
  - English, Quantitative Reasoning, Analytical Reasoning, [Subject label]
  - Each topic: expandable, warning header if below 65%
    - ⚠️ At risk (below 50%) or 💡 Needs attention (50–65%)
  - Sub-topic bars: ⚠️ Focus here (<50%) or 💡 Needs work (50–65%)
  - "Start here →" button for weakest sub-topic only
- Empty state: "Complete your first session to see progress"

**Mock Tests tab:**
- Score trend across tests
- Tests completed, best/average score, highest section
- Readiness score gauge (Phase 2: fills vs target score, not vs 90)
- Sub-topic breakdown from mock test performance

### Screen 9 — Mock Test Navigator Screen

- "⏱️ NAT-I Mock Test" amber pill
- Section tabs: [English] [Reasoning] [Quant] [Subject label] (short labels)
- Timer (teal → amber → red), starts at 120:00
- Score display (no negative marking)
- Question navigator grid:
  - 10-question grid per common section (30 for subject section)
  - ● Teal = Answered, ◻ Teal border = Current, ◐ Amber = Flagged, ○ Grey = Unseen
- Question + 4 options below
- Canvas: Draw/Type only
- Bottom bar: [‹] [Submit Answer] [›]
- Before submit: "You have X flagged questions" → [Review Flagged] [Submit Anyway]
- Timeout: auto-submit → Results screen

### Screen 10 — Mock Test Results

- "Test Complete ✓" teal
- Score out of 90 (large) + "↑ X points from last mock test"
- Section breakdown:
  - Verbal: score/20, %
  - Analytical Reasoning: score/20, %
  - Quantitative Reasoning: score/20, %
  - [Subject label]: score/30, % ← out of 30, dynamic label
- Coverage warning if < 60 attempted: "Low Coverage — X of 90"
- Attempted / Skipped / Flagged stats
- Attempt history: "Test 1: 52 | Test 2: 61 | Test 3: 67 ↑"
- Focus Next On: weakest section card
- [Review All Questions →] [Practice Weak Areas →]

### Screen 11 — Profile Screen

**View state:**
- Avatar (initial teal circle) + name
- Mobile number or email
- NAT-I Category: e.g. "Engineering (NAT-IE)" (readonly — contact support to change)
- Countdown: "X days to your NAT test" (computed from localStorage student_test_date)
- Goal Tracker, Streak calendar + "Practice questions count toward your streak"
- Test details (category, date, target score)
- Practice stats and Mock Test stats belong on Progress screen — NOT here
- [✏️ Edit Profile] teal outline button

**Edit state:**
- "Editing" badge
- Label: "Your Name" (not "Full Name")
- Active field: teal border
- NAT-I Category: readonly display + "Contact support to change your category" note
- No category selector in edit mode
- Test date: NTS preset radio list (not free-text picker)
- Target score slider: min=50, max=90, step=5
- No Target University field (PD-008)
- Streak reminders toggle
- "You have unsaved changes" banner + [Discard] [Save] inline
- [Cancel] → "Discard changes?" dialog if unsaved; immediate if no changes
- [Save Profile] at bottom

### Phase 2 Upcoming Screens

- Login screen — mobile number or email entry
- OTP verification — 6-digit input, resend timer, expiry message
- Magic link sent — "check your email" confirmation
- Account recovery — if OTP fails
- Mock Test landing — subject selector + difficulty picker (UX-007)
- Hint Mode UI — hint button + 3-level reveal (PD-006)

---

## Phase Roadmap

### Phase 0 — Setup (Complete ✅)
- ✅ React 18 + Vite + Tailwind scaffolded
- ✅ Turso connected (nts database, AWS ap-south-1 Mumbai)
- ✅ Admin panel at /admin
- ✅ GitHub AyyazAI/NTS, deployed nts-xi.vercel.app
- ✅ Claude Design FINAL — 11 screens approved and exported
- ✅ Governance NTS-GOV-001 v1.1 committed

### Phase 1 — Core Loop (In Progress)
- ✅ All 11 screens built as static UI
- ✅ Subject-specific 4th section on all screens
- ✅ Onboarding with mandatory NAT-I category selector
- ✅ Mock test: 90 MCQs, 120 minutes, 4 sections
- ✅ 123/123 Playwright tests passing (commit d16bbdb)
- ⬜ NTS test dates admin management
- ⬜ Questions/question_methods/question_flags schema in Turso
- ⬜ Admin question entry form (/admin/questions/new)
- ⬜ Seed 90 verified questions (20 Verbal, 20 Analytical, 20 Quantitative, 30 NAT-IE)
- ⬜ Wire Practice Mode core loop (question fetch, answer submit, routing)
- ⬜ Claude API explanation generation (Vercel serverless, GOV-RULE-009 prompt)
- ⬜ Canvas: Draw/Type with localStorage persistence
- ⬜ Content moderation — file type/size + Claude guardrails (GOV-RULE-011)
- ⬜ Field validation — name, mobile/email, all forms
- ⬜ Deploy Phase 1 to Vercel

### Phase 2 — Intelligence Layer
Login/OTP deferred here (Phase 1 uses localStorage only — SC-05)
- Phone + OTP auth (students table: login_method, login_identifier, otp_hash, otp_expires_at)
- Hint mode — 3 levels, Practice only (PD-006)
- Readiness score metric — correct/total (PD-004)
- Mock test redesign — subject-focused 25min + difficulty picker (UX-007)
- Remaining NAT-I categories: NAT-IM, NAT-ICS, NAT-ICOM, NAT-IGS, NAT-IA
- Subject-specific question seeding (30 per category)
- MCP connectors (Turso + GitHub)
- Multi-agent pipeline (Agents 1–5)
- Claude Vision: canvas working analysis + error diagnosis
- Adaptive difficulty engine
- Question bank 150+

### Phase 3 — Personalisation
- Avoidance pattern recognition (PD-005)
- Dynamic target progression (PD-001)
- Progress graph — target + passing mark reference lines
- Weak zone dashboard + readiness score
- RAG implementation
- Premium membership model introduction (Rs. 1000/month)
- Offline practice pack (PDF download)
- Question bank 300+

### Phase 4 — Governance
- Confidence scoring + human review queue
- Audit log (model, version, timestamp, confidence)
- Promptfoo regression testing
- CT-AI v2.0 + ISO 42001 alignment

### Phase 5 — Tutor Marketplace + Expansion
- Tutor registration, AI profile handoff, WhatsApp sessions
- University Finder — NAT-I accepting institutions only (PD-002, PD-003)
- B2B white-label for institutes (BM-001)
- Platform expansion beyond NAT-I (SN-001)

---

## Agent Architecture

| Agent | Role | Phase |
|---|---|---|
| Agent 1 | Question Validator | Phase 2 |
| Agent 2 | Explanation Generator (Mode A: standard, Mode B: handwriting analysis) | Phase 2 |
| Agent 3 | Difficulty Classifier | Phase 2 |
| Agent 4 | Progress Analyser | Phase 3 |
| Agent 5 | Similar Question Generator | Phase 2 |

---

## Database Schema

### tasks (admin panel tracker)
`id, phase_id, phase_name, label, tool, done, updated_at`

### questions (Phase 1)
```
id, topic, sub_topic, difficulty,
question_text, option_a, option_b, option_c, option_d, correct_option,
explanation_en, explanation_methods,
source, verified (1=human verified only), verified_by, verified_at,
section (verbal | analytical | quantitative | subject_specific),
category (NAT-IE | NAT-IM | NAT-ICS | NAT-ICOM | NAT-IGS | NAT-IA — null for common sections),
ai_generated, review_flag, review_note,
times_attempted, times_correct,
created_at, updated_at
```

### question_methods (Phase 1)
`id, question_id, method_number, method_title, method_steps (JSON)`

### question_flags (Phase 1)
`id, question_id, flagged_by, flag_reason, status, resolved_by, resolved_at`

### students (Phase 1)
```
id, full_name, mobile,
nat_category (NAT-IE | NAT-IM | NAT-ICS | NAT-ICOM | NAT-IGS | NAT-IA),
test_date, target_score,
created_at, updated_at
```

Phase 2 additions (schema-ready, not yet active — SC-06):
`login_method TEXT (mobile | email), login_identifier TEXT, otp_hash TEXT, otp_expires_at TEXT`

### attempts (Phase 2)
```
id, student_id, question_id, mode (practice/mock_test),
action (attempted/skipped/learned),
selected_option, is_correct, created_at,
attempt_number INTEGER DEFAULT 1,
is_first_attempt INTEGER DEFAULT 1,
previous_result TEXT,
hints_used INTEGER DEFAULT 0,
hint_assisted INTEGER DEFAULT 0,
skipped INTEGER DEFAULT 0,
time_spent INTEGER DEFAULT 0
```

**Rule: Only verified=1 questions served to students. No exceptions.**

---

## Question Bank Strategy

| Source | Method | Phase |
|---|---|---|
| NTS past papers | Manual curation | Phase 1 |
| Agent 5 generated | Human spot-checked | Phase 2 |
| Community contributions | Human-gated | Phase 3+ |

Phase 1 targets: 20 Verbal + 20 Analytical Reasoning + 20 Quantitative Reasoning + 30 NAT-IE = **90 verified questions**

---

## AI Quality Standards

### GOV-RULE-009 — Explanation Quality

Every AI-generated explanation must:
1. Never assume prior knowledge — explain every step as if student has never seen this method
2. Never skip steps — every calculation and logical leap shown explicitly
3. Never use "obviously" or "clearly"
4. Show multiple methods — minimum 2 approaches per question
5. Plain language first — intuitive method before formula
6. Formula as shortcut — introduce only after intuitive method is understood
7. Full working at each step — not just the answer
8. Visual solutions — actual SVG diagrams, tables, grids — NOT text instructions to draw
9. Formula mapped onto intuitive method — Method 2 explicitly maps formula onto steps from Method 1. Each method stands alone — Method 1 never mentions C(n,r).

Target reader: intelligent Pakistani student aged 17-19, first time encountering this method.
Language: English only.

### GOV-RULE-010 — Visual Intelligence

AI selects the appropriate visual type per question — never defaults to one format.

Decision process:
1. Classify question type and sub-type
2. Count elements — is a visual at this scale readable on mobile?
3. Identify the single "aha moment" the student needs
4. Choose the visual format that delivers that moment most directly
5. Check: renders clearly at 350px mobile width?
6. Generate SVG with high contrast, clear labels, dark text
7. Add one-line caption

Visual type guidance:
- Combinations/Permutations → Grid
- Sets/Overlap → Venn (2-3 sets only)
- Ratio/Proportion → Bar chart or part-whole
- Geometry → Labelled shape
- Sequences → Number line or step progression
- Probability → Tree diagram
- Percentage/Change → Before/after comparison
- Direction problems → Compass/map
- Time/Speed/Distance → Timeline or journey

### GOV-RULE-011 — Content Moderation

All UGC (canvas drawings, typed text, uploaded files, name field) passes moderation before AI processing or permanent storage.

- Phase 1: Claude prompt guardrails + file type/size validation (JPG/PNG/PDF, max 5MB)
- Phase 2: Image moderation API
- Phase 3: Admin content queue, repeat violation tracking

System prompt must include: *"If submitted working contains inappropriate content, do not process it. Return a neutral message asking the student to submit their actual working."*

### GOV-RULE-012 — High Contrast

No gray text on white/light backgrounds. Ever.
- Body text: text-gray-900
- Secondary/helper text: text-gray-700 minimum
- Placeholder text: text-gray-500 minimum
- Never: text-gray-400 or lighter on white or light background
- Exception: flag icon buttons (gray-400) — accepted design trade-off (R7-13)
