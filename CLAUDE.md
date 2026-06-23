# TaleemiMarkaz — NTS Prep

## Platform Overview

**TaleemiMarkaz** (taleemimarkaz.com / taleemimarkaz.com.pk) is a free AI-powered education platform for Pakistani students.

**NTS Prep** is the first product under TaleemiMarkaz — a free NAT-I test preparation platform targeting Pakistani students aged 17-19 preparing for bachelor admissions.

**GitHub:** github.com/AyyazAI/NTS
**Live URL:** nts-xi.vercel.app
**Admin Panel:** nts-xi.vercel.app/admin

---

## Product Scope

**Target test:** NAT-I (National Aptitude Test — bachelor admissions)
**Sections covered:**
- English (Verbal) — synonyms, antonyms, grammar, sentence completion, comprehension, analogies
- Math (Quantitative) — arithmetic, percentages, ratios, algebra, averages, geometry
- Analytical Reasoning — selection, sequencing, blood relations, directions, syllogisms, combinations

**Out of scope (for now):**
- GAT, HAT, recruitment tests
- Subject-specific sections (Physics, Biology, CS etc.)
- GK, Islamiat, Current Affairs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Font | Nunito (English only — Urdu removed from scope) |
| Accent colour | Teal #0D9488 |
| Database | Turso / libSQL |
| AI Primary | Claude Sonnet 4.6 |
| Deployment | Vercel (Hobby plan) |
| Dev tool | Claude Code v2.1.183 |
| Design tool | Claude Design (claude.ai/design) |
| Version control | GitHub (AyyazAI/NTS) |

**All Claude API and Turso calls route through Vercel serverless functions — NEVER directly from the browser.**

---

## Learning Goals (Primary Purpose)

This project exists to learn:
1. **Claude Code** — filesystem-aware coding, no copy-paste workflow
2. **Claude Design** — UI prototyping, design-to-code handoff ✅ Learned Phase 0
3. **MCP** — Turso connector, GitHub connector (Phase 2)
4. **Multi-agent architecture** — 5 agents with clear boundaries (Phase 2)
5. **RAG** — similar question retrieval, weak zone surfacing (Phase 3)
6. **AI Governance** — CT-AI v2.0 + ISO 42001 implementation (Phase 4)
7. **Promptfoo / AI evaluation tools** — automated prompt testing (Phase 2)

---

## AI Role — Critical Constraint

**Claude is an explanation engine only.**

- Claude NEVER determines the correct answer
- Claude NEVER curates or validates the question bank
- Correct answers are pre-verified by humans and stored in Turso
- Claude only explains WHY a pre-verified answer is correct
- This constraint applies to ALL AI agents in the system

---

## Explanation Quality Standard (GOV-RULE-009)

Every AI-generated explanation must follow these rules:

1. **Never assume prior knowledge** — explain every step as if the student has never seen this method before
2. **Never skip steps** — every calculation and logical leap must be shown explicitly
3. **Never use "obviously" or "clearly"** — if it were obvious, they wouldn't need help
4. **Show multiple methods** — minimum 2 solution approaches per question where applicable
5. **Plain language first** — intuitive method before formula
6. **Formula as shortcut** — introduce formulas only after intuitive method is understood
7. **Full working at each step** — not just the answer, the complete working
8. **Visual solutions** — AI generates actual SVG diagrams, tables, grids — NOT text instructions to draw

**Target reader:** An intelligent Pakistani student aged 17-19 encountering this method for the first time.
**Language:** English only. Urdu toggle removed from scope.

---

## Two Distinct Practice Modes

### Practice Mode (Learning)
- Show Solution button always available
- No time pressure
- No negative marking
- Canvas working analysed on wrong answers
- Sub-topic selection available (English > Synonyms, Math > Algebra etc.)
- Progress tracked under Practice tab
- Wrong answer → auto-shown solution with working analysis
- Correct answer → option to explore other methods or skip to next

### Mock Test Mode (Exam Simulation)
- No Show Solution during test — exam conditions
- 30 minute countdown timer
- Negative marking -0.25 per wrong answer
- Flag (🚩) and navigate questions freely
- No sub-topic selection — full mixed paper like real NTS
- Progress tracked under Mock Tests tab
- When timer runs out → test auto-submits immediately
- Full solution review available only AFTER test submitted
- If browser closed mid-test → test resumes on return, not auto-submitted

---

## Answer Flow

### Wrong Answer:
1. Wrong detected
2. If canvas working exists → Claude Vision analyses, identifies exact wrong step
3. Student automatically taken to Solution screen (no choice)
4. Working shown with error highlighted: "You went wrong here — [specific error]"
5. Full solution shown — all methods visible, all steps expanded
6. "Try a similar question →" CTA at bottom

### Correct Answer:
1. Correct detected → "Correct — nice work! 🎉"
2. Two options: [Explore other methods] [Next Question →]
3. If Explore → Solution screen with their method auto-selected
4. If Next Question → straight to next, no solution shown

### Show Solution (student gives up):
- Available in Practice Mode only
- Question marked as "Learned" (not Attempted, not Skipped)
- Tracked separately in progress — does not affect accuracy %
- Goes to full Solution screen immediately

---

## Navigation & UX Rules

- Bottom navigation visible on ALL screens: Home, Practice, Mock Test, Progress, Profile
- Bottom nav has enough padding to avoid overlap with device system controls
- Both ← Previous and → Next navigation on question screens
- Canvas working persists when navigating between questions — never erased
- Unsaved profile changes → warning dialog before navigating away
- File upload: JPG, PNG, PDF only. Max 5MB. Clear error for invalid type/size

---

## Screen Inventory (Design v3 — In Progress)

### Screen 1 — Home
Two states:
- First-time user → redirect to Onboarding
- Returning user → show Home with real data

Returning user Home:
- TaleemiMarkaz logo + "NTS Prep" on every screen header
- Student greeting: "Assalam-o-Alaikum, [Name]"
- Streak card (only show if streak > 0, never show negative days)
- Mode selector: [📚 Practice Mode] [⏱️ Mock Test] — active mode highlighted teal
- Practice Mode selected → show topic cards (English, Math, Reasoning) with progress
- Mock Test selected → topic cards hide, replaced with "Start Mock Test →" CTA
- Progress on topic cards = questions attempted / total available (Practice) or score % (Mock Test)
- Remove "See All" link — all three topics already visible
- Bottom navigation

### Screen 2 — Onboarding (NEW — first time user)
- Welcome to TaleemiMarkaz / NTS Prep
- Step 1: Name entry
- Step 2: Mobile number (used for OTP login)
- Step 3: Test date (NAT-I date picker — no past dates, no dates > 1 year ahead)
- Step 4: Target score (slider 40-100)
- Step 5: Target university (optional text field)
- Progress indicator showing onboarding steps
- On complete → Home screen

### Screen 3 — Sub-topic Selection (NEW — Practice Mode only)
- Appears after student selects a topic on Home
- "Choose what to practice"
- Topic header: English / Math / Reasoning
- Sub-topic cards with progress bars:
  - English: Synonyms, Antonyms, Grammar, Sentence Completion, Comprehension, Analogies
  - Math: Arithmetic, Percentages, Ratios, Algebra, Averages, Geometry
  - Reasoning: Selection, Sequencing, Blood Relations, Directions, Syllogisms, Combinations
- Difficulty selector below: [Easy] [Medium] [Hard] [Mixed]
- "Start Practice →" teal button

### Screen 4 — Question Screen (Practice Mode)
- TaleemiMarkaz header on all screens
- Topic + sub-topic tag (e.g. "Reasoning · Permutations")
- Question number: "Question 4 of 20"
- Question text — large, readable
- 4 answer options A/B/C/D as full-width tap targets
- Two-step selection: tap option to highlight, then Submit activates
- Canvas scratch pad with three tabs: [✏️ Draw] [⌨️ Type] [📷 Upload]
  - Draw: finger canvas, toolbar (thick pen, thin pen, eraser, undo, clear)
  - Type: text input area
  - Upload: image picker (JPG/PNG/PDF, max 5MB, error shown for invalid)
  - Canvas work PERSISTS when navigating away and returning
- Bottom bar: [← Prev] [🚩 Flag] [Show Solution] [Submit Answer →]
- Submit Answer only activates after an option is selected

### Screen 5 — Question Screen (Mock Test Mode)
- Same as Practice but:
  - No "Show Solution" button
  - Timer visible top right (countdown)
  - Score and negative marking display visible
  - Bottom bar: [← Prev] [🚩 Flag] [Next →]
  - No sub-topic tag — just question number

### Screen 6 — Solution Screen Variant A (Wrong Answer)
- Header: "Not quite — let's see why" (neutral colour, never red)
- "You selected B (21) — Correct answer is C (15)"
- If canvas working submitted:
  - "YOUR WORKING" section shows submitted image/text
  - ⚠️ marker on exact wrong step: "You went wrong here — [specific error explained in plain language]"
- FULL SOLUTION shown immediately — all steps visible, not one at a time
- Method tabs: [Method 1: Counting] [Method 2: Formula] [Method 3: Visual]
  - Method 1 default (most intuitive, plain language)
  - Method 2: formula with full explanation of every symbol and operation
  - Method 3: actual AI-generated diagram (SVG table, grid, Venn diagram) — NOT text saying "draw a diagram"
- Every step fully expanded — no "reveal next step" — student sees complete working
- "Try a similar question →" teal button at bottom

### Screen 7 — Solution Screen Variant B (Correct Answer)
- Header: "Correct — nice work! 🎉" in teal
- "You answered in 47 seconds"
- Two options: [Explore other methods] [Next Question →]
- If Explore → full solution screen, student's method auto-highlighted

### Screen 8 — Progress Screen (Redesigned)
Toggle at top: [Practice] [Mock Tests]

PRACTICE TAB:
- Score Trend (line chart)
  - Toggle: [This Week] [This Month] [All Time]
  - Improvement label: "+26% this week ↑"
- Topic + Sub-topic Section (merged — no duplication):
  - Three topic headers (English, Math, Reasoning) each expandable accordion
  - Topic header shows overall % with colour: green >70%, amber 50-70%, red <50%
  - Expanded: sub-topic progress bars with %, weakest highlighted red with "⚠️ Focus here"
- Today's Focus (sticky bottom):
  - Top 3 weakest sub-topics listed
  - "Practice [sub-topic] today" with [Start →] button per item

MOCK TESTS TAB:
- Tests completed count
- Best score / Average score
- Score trend across mock tests (line chart)
- Negative marks lost total
- Readiness score gauge (0-100) with guidance text

Empty state: if no data yet → encouraging message "Complete your first practice session to see your progress"

### Screen 9 — Mock Test Screen
- TaleemiMarkaz header
- "NAT-I Mock Test" title
- Section tabs: [English] [Math] [Reasoning] — each section 10 questions
- Timer countdown prominent top right
- Score: "+18.25" and NEG. MARKING: "-0.25/wrong" in amber
- Question navigator grid per section (10 squares):
  - ● Teal = Answered
  - ○ White outlined = Current
  - ◐ Amber = Flagged
  - ○ Grey = Unseen
- Question text and answer options
- Bottom bar: [← Prev] [🚩 Flag] [Next →]
- Before submit: confirmation "You have X flagged questions. Review or submit anyway?" [Review Flagged] [Submit Anyway]
- On timeout: auto-submit immediately → results screen

### Screen 10 — Mock Test Results (NEW)
- "Test Complete" header
- Overall score: XX/100
- Section breakdown:
  - English: X/30 (X%)
  - Math: X/30 (X%)
  - Reasoning: X/30 (X%)
- Negative marking: total marks lost
- Attempted / Skipped / Flagged counts
- Comparison to previous tests (if any)
- "Review All Questions →" button → shows every question with correct answer and full solution
- "Practice Weak Areas →" button → takes to sub-topic selection for weakest area

### Screen 11 — Profile Screen
- TaleemiMarkaz header
- Student avatar (initial in teal circle) + name
- Mobile number (primary identifier — not email)
- Optional email field
- Test countdown: "18 days to NAT-I" (never shows negative days)
- GOAL: Target score, current tracking, readiness gauge
- STREAK: 🔥 X days, GitHub-style streak calendar grid
- TEST DETAILS: Test date, test type, target university (all editable)
- PRACTICE STATS: Questions attempted, solutions viewed (Learned), topics covered
- MOCK TEST STATS: Tests completed, best score, average, marks lost to neg marking
- [Save Profile] button — always visible when editing
- Unsaved changes warning if navigating away without saving
- Input validation:
  - Mobile: Pakistani format validation
  - Email: valid format if entered
  - Test date: no past dates, no dates > 1 year ahead
  - Target score: 40-100 only

---

## Agent Architecture

| Agent | Role | Phase |
|---|---|---|
| Agent 1 | Question Validator — checks question clarity and answer key correctness | Phase 2 |
| Agent 2 | Explanation Generator — Mode A (standard explanation) and Mode B (handwriting analysis + error diagnosis) | Phase 2 |
| Agent 3 | Difficulty Classifier — tags questions Easy/Medium/Hard per topic | Phase 2 |
| Agent 4 | Progress Analyser — weak zones, readiness score, daily recommendations | Phase 3 |
| Agent 5 | Similar Question Generator — creates structurally identical questions at specified difficulty | Phase 2 |

---

## Database Schema

### tasks (admin panel tracker)
- id, phase_id, phase_name, label, tool, done, updated_at

### questions (Phase 1)
- id, topic, sub_topic, difficulty
- question_text, option_a, option_b, option_c, option_d, correct_option
- explanation_en, explanation_methods
- source, verified, verified_by, verified_at
- ai_generated, review_flag, review_note
- times_attempted, times_correct
- created_at, updated_at

### question_methods (Phase 1)
- id, question_id, method_number, method_title, method_steps (JSON)

### question_flags (Phase 1)
- id, question_id, flagged_by, flag_reason, status, resolved_by, resolved_at

### attempts (Phase 2)
- id, student_id, question_id, mode (practice/mock_test), action (attempted/skipped/learned)
- selected_option, is_correct, time_spent, created_at

---

## Governance Rules

| Rule | Statement | Status |
|---|---|---|
| GOV-RULE-001 | AI must reference verified data sources, not context memory, when a database or admin record exists | Active |
| GOV-RULE-002 | AI output contradicting a verified source must be flagged and corrected before actioning | Active |
| GOV-RULE-003 | Governance incidents are captured immediately in any phase — not deferred | Active |
| GOV-RULE-004 | AI never determines the correct answer — only explains a pre-verified answer | Active |
| GOV-RULE-005 | All AI explanations must be logged with model name, version, timestamp, confidence | Planned Phase 4 |
| GOV-RULE-006 | Low-confidence AI explanations must be queued for human review before shown to students | Planned Phase 4 |
| GOV-RULE-007 | Factual questions (GK, Islamiat, Current Affairs) require human-verified answer keys | Active |
| GOV-RULE-008 | Any change to the project plan must be propagated to CLAUDE.md and all dependent documents before the next Claude Code session | Active |
| GOV-RULE-009 | AI explanations must never assume prior knowledge, never skip steps, show multiple methods, plain language before formula, visual solutions as actual diagrams not text instructions | Active |

**Governance document:** src/governance/NTS-GOV-001-AI-Governance-Incident-Log.docx (v1.1)

---

## Design Review Record

### Design Review v1 (Jun 22 2026) — Ayyaz
Feedback document: Claude_Design_-_Feedback_and_updates_Version_2.docx
Key findings actioned:
- Urdu toggle removed from scope — NTS exam is English only
- Missing screens identified: Onboarding, Sub-topic Selection, Mock Test Results
- Navigation gaps: forward button missing, bottom nav not on all screens
- Canvas work must persist on navigation
- Progress screen duplicated data — merged topic overview and sub-topic breakdown
- Solution screen: show full solution not one step at a time
- Visual solution must be actual AI-generated diagram not text instruction
- Profile: mobile number not email, input validation, unsaved changes warning
- Mock test: auto-submit on timeout, resume if browser closed
- Multiple attempt history must be preserved on profile

### Design Review v2 (Jun 23 2026) — Ayyaz + Claude
Additional findings:
- "See All" link on home is redundant — removed
- "AI Generated" label on Challenge page — removed
- Challenge page merged into question flow — not a separate screen
- Today's Focus shows top 3 weakest sub-topics not just one
- Score trend needs This Week / This Month / All Time toggle
- First-time user needs onboarding flow before seeing home
- Mock test results screen needed after test submission

---

## Plan Change Propagation Checklist

When the project plan changes, ALWAYS update these before the next session:
- [ ] CLAUDE.md (this file)
- [ ] Turso tasks table (admin panel)
- [ ] NTS-GOV-001 if governance-relevant
- [ ] Log as incident if a dependent document was missed

---

## Phase Roadmap

### Phase 0 — Setup ✅ COMPLETE
- Claude Code installed and authenticated
- React 18 + Vite + Tailwind scaffolded
- Turso connected (database: nts, region: AWS ap-south-1 Mumbai)
- Admin panel built at /admin
- CLAUDE.md written and updated twice
- GitHub repo live at AyyazAI/NTS
- Deployed to Vercel (nts-xi.vercel.app)
- Claude Design v1 complete — 6 screens
- Claude Design v2 complete — 7 screens with updates
- Claude Design v3 in progress — 11 screens full redesign
- Governance document NTS-GOV-001 v1.1 committed
- vercel.json routing config added

### Phase 1 — Core Loop (Next)
- Claude Design v3 finalised and approved
- Questions table schema in Turso (3 tables)
- Question entry form in admin panel
- Seed 60 verified questions (20 per section)
- React components built from Claude Design handoff
- Topic selector and sub-topic selector (Home + Sub-topic screens)
- Question display with 4 MCQ options (Practice mode)
- Answer submission — two-step selection
- Canvas scratch pad (Draw / Type / Upload tabs) with persistence
- Practice mode answer flow (wrong → solution, correct → option)
- Show Solution flow (marks as Learned)
- Solution screen with full expanded methods
- Session score display
- Deploy Phase 1 to Vercel

### Phase 2 — Intelligence Layer
- MCP connector: Claude Code ↔ Turso
- MCP connector: Claude Code ↔ GitHub
- Multi-agent pipeline (Agents 1-5)
- Claude Vision: read handwritten canvas working
- Error diagnosis: "You went wrong at step X"
- Mock test mode (full implementation)
- Auto difficulty progression (AI-driven)
- Student-controlled difficulty selector
- Test-date aware difficulty nudges
- Phone + OTP authentication
- Promptfoo automated prompt testing
- Question bank grows to 150+

### Phase 3 — Personalisation
- Full student profile with history across attempts
- Weak zone dashboard
- Readiness score engine
- RAG: surface similar questions on wrong answers
- Agent 4: Progress Analyser
- Error pattern analysis from canvas working
- Question bank grows to 300+

### Phase 4 — Governance
- Confidence scoring on every AI explanation
- Human review queue
- Audit log
- Promptfoo regression testing suite
- CT-AI v2.0 + ISO 42001 alignment
- NTS-GOV-001 finalised

### Phase 5 — Tutor Marketplace
- Tutor registration and verification
- AI-diagnosed student profile handoff
- WhatsApp-based session facilitation
- Rating system
- Revenue: commission per session

---

## Question Bank Strategy

**Source 1:** NTS past papers (manual curation) — Phase 1
**Source 2:** Agent 5 generated (human spot-checked) — Phase 2
**Source 3:** Community contributions (human-gated) — Phase 3+
**Minimum for Phase 1 launch:** 60 verified questions (20 per section)
**Verification rule:** Only verified=1 questions served to students. No exceptions.

---

## Key Product Features

- **Two modes:** Practice (learning, Show Solution available) and Mock Test (exam simulation, no solutions during test)
- **Answer flow:** Wrong → forced solution with error diagnosis. Correct → optional exploration.
- **Adaptive difficulty:** AI-driven auto + student-controlled Easy/Medium/Hard + test-date urgency
- **Canvas working:** Draw / Type / Upload — persists across navigation, feeds Claude Vision
- **Multiple solution methods:** Minimum 2 per question, all fully expanded, visual methods as actual diagrams
- **Negative marking:** -0.25 per wrong answer, skip strategy taught
- **Student profile:** Goals, test date, target score, attempt history, weak zones, readiness score, streaks
- **Mock test:** Auto-submit on timeout, resume on browser close, full review after submission
- **Tutor marketplace:** Phase 5

---

## Environment Variables

```
VITE_TURSO_URL=your_turso_database_url
VITE_TURSO_TOKEN=your_turso_auth_token
VITE_ADMIN_PASSWORD=nts2024
```

Never commit .env.local — excluded by .gitignore and .claudeignore.

---

## Session Start Ritual

At the start of every Claude Code session:
1. Read this CLAUDE.md
2. Confirm current phase and next task
3. Check admin panel task status before proceeding
4. Never rely on context memory when Turso data exists

---

## Incidents Log Summary

| ID | Date | Description | Status |
|---|---|---|---|
| INC-001 | Jun 21 2026 | AI used context memory instead of verified database | Resolved |
| INC-002 | Jun 22 2026 | Admin panel tasks out of sync — Claude Design tasks missing after plan update | Resolved |

Full incident details: src/governance/NTS-GOV-001-AI-Governance-Incident-Log.docx

---

## Premium Membership Model (Phase 3-4)

**Positioning:** "Support the platform and get extra features"
**Price:** Rs. 1000/month — framed as "one McDonald's meal"
**First 1-2 weeks free** for all students to experience premium

### Free vs Premium Split

| Feature | Free | Premium |
|---|---|---|
| All questions | ✅ | ✅ |
| Step-by-step explanations | ✅ | ✅ |
| Canvas working | ✅ | ✅ |
| Mock tests | ✅ | ✅ |
| Basic progress (current session) | ✅ | ✅ |
| Social sharing achievement cards | ✅ | ✅ |
| Full history — all attempts | ❌ | ✅ |
| Canvas working archive | ❌ | ✅ |
| Live chatbot follow-up (Claude-powered) | ❌ | ✅ |
| Detailed monthly PDF report | ❌ | ✅ |
| Offline practice pack download + upload | ❌ | ✅ |
| Early feature access (beta) | ❌ | ✅ |
| Community work contribution (opt-in) | ❌ | ✅ |
| Achievement badges + rewards | ❌ | ✅ |
| Ad-free (if ads ever introduced) | ❌ | ✅ |

### Premium Feature Details

**Full history** — every attempt, canvas working, solution viewed — searchable and reviewable

**Live chatbot** — Claude-powered follow-up on specific solutions. "I still don't understand step 3 — explain differently." API cost justifies premium placement.

**Rewards system** — achievement badges for good NTS scores. Student uploads NTS result slip. Honour system with community visibility. No cash rewards — profile badges, featured on leaderboard, extended premium trial.

**Community work contribution** — premium students opt in to share anonymised handwritten working. Used to enrich explanations for all students. Explicit consent required, documented in governance.

**Social sharing** — beautiful shareable card: score, streak, improvement. "I scored 78/100 on NAT-I Mock Test on TaleemiMarkaz." Free feature — serves as organic marketing.

**Monthly PDF report** — what they studied, how they improved, what to focus on. Shareable with parents/teachers. Parents in Pakistan are deeply involved in exam prep — this speaks to that.

**Offline practice pack + upload** — see Offline Feature section below.

### Fundraising Compatibility

Freemium model strengthens fundraising story:
"We serve students free. Premium covers server and AI costs. Your donation funds access for students who cannot afford even our nominal premium."

IGNITE, UNDP, Agha Khan Foundation all fund platforms demonstrating self-sustainability alongside social mission. Revenue model makes the platform more fundable, not less.

### Payment Methods (Pakistan)
- JazzCash
- EasyPaisa
- Credit/debit card

### Timeline
- Phase 1-2: Free only — prove the product works
- Phase 3: Introduce premium after 1000+ active users
- Phase 4: Full premium feature set

---

## Offline Practice Pack Feature (Phase 3-4)

### The Problem It Solves
Many Pakistani students in smaller cities have unreliable internet. A printed practice pack usable anywhere — bus, home, without WiFi — addresses a real access gap.

### How It Works

**Download:**
- Student downloads PDF practice pack (10-20 questions)
- PDF includes: question text, answer bubbles (A/B/C/D), working space
- Designed to replicate real NTS exam worksheet experience
- Premium feature

**Solve offline:**
- Student prints or solves on screen offline
- Works anywhere, no internet needed

**Upload and analyse:**
```
Student photographs completed paper
        ↓
Uploads photo to TaleemiMarkaz
        ↓
Claude Vision reads:
  - Filled answer bubbles (highly reliable — binary task)
  - Handwritten working in margins (best effort)
        ↓
Confirmation step shown to student:
  "Here's what we read:
   Q1: B ✓  Q2: A ✗  Q3: C ✓
   Is this correct?"
  [Yes, save results] [No, let me correct]
        ↓
Answers marked against verified answer key
Wrong answers → full solution shown
Working analysed for error diagnosis (if readable)
        ↓
Results saved to online profile
```

**Handwriting limitation handling:**
- Answer bubble reading: always reliable
- Working analysis: best-effort with graceful fallback
- If working unreadable: "We couldn't read your working clearly. Here's the full solution anyway."
- Student confirmation step prevents misread answers from corrupting profile data

### Timeline
- PDF download: Phase 3
- Upload and analyse: Phase 4

