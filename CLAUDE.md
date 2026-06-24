# TaleemiMarkaz — NTS Prep

## Platform Overview

**TaleemiMarkaz** (taleemimarkaz.com / taleemimarkaz.com.pk) is a free AI-powered education platform for Pakistani students.

**NTS Prep** is the first product under TaleemiMarkaz — a free NAT-I test preparation platform targeting Pakistani students aged 17-19 preparing for bachelor admissions.

**GitHub:** github.com/AyyazAI/NTS
**Live URL:** nts-xi.vercel.app
**Admin Panel:** nts-xi.vercel.app/admin

---

## Design Status

**Claude Design: FINAL — 11 screens approved**
Design exported and saved in src/governance/design/
- NTS_Prep_Design.pdf — visual reference all 11 screens
- NTS_Prep_Design.html — interactive prototype with CSS/fonts/spacing
- NTS_Prep_Design.zip — complete project archive
- NTS_Prep_Design_Master_Prompt.md — consolidated design prompt (QA evidence)

**Design share link:** [saved in Claude Design — claude.ai/design]

When building UI components, reference the HTML file for exact:
- Colours (#0D9488 teal, #D97706 amber, #DC2626 red timer only)
- Font: Nunito, all weights
- Spacing, border radius, shadow values
- Component structure and layout

---

## Product Scope

**Target test:** NAT-I (National Aptitude Test — bachelor admissions)

**Sections covered (Phase 1 — all 4 sections):**
- English (Verbal) — synonyms, antonyms, grammar, sentence completion, comprehension, analogies
- Math (Quantitative) — arithmetic, percentages, ratios, algebra, averages, geometry
- Analytical Reasoning — selection, sequencing, blood relations, directions, syllogisms, combinations
- Subject-Specific — 30 MCQs, varies by NAT-I category (Phase 1 seeds NAT-IE only)

**NAT-I Categories (6 total):**
- Engineering (NAT-IE) — Physics, Chemistry, Mathematics, English ← Phase 1 active
- Medical (NAT-IM) ← Phase 2
- Computer Science (NAT-ICS) ← Phase 2
- Commerce (NAT-ICOM) ← Phase 2
- General Sciences (NAT-IGS) ← Phase 2
- Arts (NAT-IA) ← Phase 2

**Out of scope (for now):**
- GAT, HAT, recruitment tests
- GK, Islamiat, Current Affairs
- NAT-IM, NAT-ICS, NAT-ICOM, NAT-IGS, NAT-IA subject sections (Phase 2)

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
| Design tool | Claude Design (claude.ai/design) — FINAL |
| Version control | GitHub (AyyazAI/NTS) |

**All Claude API and Turso calls route through Vercel serverless functions — NEVER directly from the browser.**

---

## Working Mechanism

- **Claude (claude.ai chat)** handles: planning, discussion, document generation, prompts for Claude Code, design decisions, governance, CLAUDE.md updates
- **Claude Code (terminal at E:\Claude - NTS)** handles: all file creation, editing, code execution, and Git commits
- Claude Code reads CLAUDE.md at the start of every session
- CLAUDE.md is written/updated by Claude (chat) and committed by Claude Code
- Claude Code never asks Ayyaz to paste code files — it reads them directly

---

## Learning Goals (Primary Purpose)

This project exists to learn:
1. **Claude Code** — filesystem-aware coding, no copy-paste workflow
2. **Claude Design** — UI prototyping, design-to-code handoff ✅ Complete Phase 0
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

1. **Never assume prior knowledge** — explain every step as if student has never seen this method
2. **Never skip steps** — every calculation and logical leap shown explicitly
3. **Never use "obviously" or "clearly"**
4. **Show multiple methods** — minimum 2 solution approaches per question
5. **Plain language first** — intuitive method before formula
6. **Formula as shortcut** — introduce only after intuitive method is understood
7. **Full working at each step** — not just the answer, complete working
8. **Visual solutions** — actual SVG diagrams, tables, grids — NOT text instructions to draw
9. **Formula mapped onto intuitive method** — after Method 1 counting, Method 2 maps C(n,r) directly onto the steps student just learned. Each method stands completely alone — Method 1 never mentions C(n,r).

**Target reader:** An intelligent Pakistani student aged 17-19 encountering this method for the first time.
**Language:** English only. No Urdu toggle.

---

## Two Distinct Practice Modes

### Practice Mode (Learning)
- Show Solution button always available
- No time pressure, no negative marking
- Canvas working analysed on wrong answers
- Sub-topic selection available
- Progress tracked under Practice tab
- Wrong answer → auto-shown solution with working analysis
- Correct answer → option to explore other methods or skip to next
- Show Solution → marks question as "Learned" (separate from Attempted)

### Mock Test Mode (Exam Simulation)
- No Show Solution during test — exam conditions
- 120 minute countdown timer (90 MCQs, all 4 sections)
- Negative marking -0.25 per wrong answer
- Flag (🚩) and navigate questions freely
- No sub-topic selection — full mixed paper
- Progress tracked under Mock Tests tab
- Timer colour: teal → amber at 5 min → red at 1 min (no popup)
- Section label shown above each question (Section 1–4)
- When timer runs out → test auto-submits immediately
- Full solution review only AFTER test submitted
- If browser closed mid-test → test resumes on return

---

## Answer Flow

### Wrong Answer:
1. Wrong detected
2. If canvas working exists → Claude Vision analyses, identifies exact wrong step
3. Student automatically taken to Solution screen (no choice)
4. Working shown with error highlighted: "You went wrong here — [specific error]"
5. Full solution shown — all methods visible, all steps expanded
6. "Try a similar question →" fixed button at bottom

### Correct Answer:
1. "Correct — nice work! 🎉"
2. Two options: [Explore methods] [Next Question →]
3. Explore → Solution screen, student's method auto-selected
4. Next Question → straight to next, no solution shown

### Show Solution (student gives up):
- Practice Mode only
- Marked as "Learned" — does not affect accuracy %
- Goes to full Solution screen immediately

---

## Navigation & UX Rules

- Bottom navigation on ALL screens: Home, Practice, Mock, Progress, Profile
- Bottom nav: 80px minimum padding — never overlaps device controls
- Question screens: ‹ hidden on Q1, always show ›
- Flag 🚩 at TOP RIGHT of question card — not in bottom bar
- Canvas working persists when navigating between questions
- Unsaved profile changes → warning dialog before navigating away
- File upload: JPG, PNG, PDF only. Max 5MB. Inline error for invalid.

---

## Screen Inventory — FINAL (11 screens)

### Screen 1 — Onboarding (First-time user — 2 steps)
Step 1 — Mandatory:
- Full name + Mobile number (Pakistani format, inline validation)
- "Skip setup — take me to practice →" link

Step 2 — Mixed (category mandatory, goals optional):
- **NAT-I category selector — MANDATORY**
  - Label: "Which NAT-I are you preparing for?"
  - 6 options as selectable cards: Engineering (NAT-IE), Medical (NAT-IM),
    Computer Science (NAT-ICS), Commerce (NAT-ICOM),
    General Sciences (NAT-IGS), Arts (NAT-IA)
  - Selected state: teal border + teal tick
  - "Let's go! →" disabled until category selected
- Test date toggle (Yes/Not yet) → date picker if Yes
- Target score toggle (Yes/Not yet) → slider 40-100 if Yes
- No university field in onboarding (Profile only)
- "Let's go! →" button

### Screen 2 — Home (Returning user)
- TaleemiMarkaz logo + "NTS Prep" header — every screen
- "Assalam-o-Alaikum, [Name] 👋"
- Daily Goal card: "Practice 20 questions today" + progress bar
- Mode cards: [📚 Practice Mode] [⏱️ Mock Test]
- Practice selected → 4 topic cards:
  - English — X of 20 questions attempted
  - Math — X of 20 questions attempted
  - Analytical Reasoning — X of 20 questions attempted
  - [Subject label e.g. "Engineering (NAT-IE)"] — X of 30 questions attempted
- Mock Test selected → topic cards hidden, "Start Mock Test → 90 MCQs · 120 min" CTA
- Bar colour: green >70%, amber 50-70%, red <50%

### Screen 3 — Sub-topic Selection (Practice Mode only)
- "📚 Practice Mode" pill below header
- "Choose what to practice" + topic name
- Sub-topic list with progress bars, "⚠️ Focus here" on weakest
- For subject-specific section (NAT-IE): Physics, Chemistry, Mathematics, English
- Difficulty: [Easy] [Medium] [Hard] [Mixed]
- "Start Practice →" button

### Screen 4 — Question Screen (Practice Mode)
- "📚 Practice Mode" pill
- Topic + sub-topic tag, question number
- Flag 🚩 top right of question card
- 4 answer options — two-step selection
- Canvas: [✏️ Draw] [⌨️ Type] [📷 Upload] tabs
  - Draw: toolbar (thick pen, thin pen, eraser, undo, clear)
  - Upload: JPG/PNG/PDF max 5MB, inline error
  - Canvas persists across navigation
- Bottom bar Q1: [Show Solution] [Submit Answer] [›]
- Bottom bar Q2+: [‹] [Show Solution] [Submit Answer] [›]
- Submit Answer greyed until option selected

### Screen 5 — Question Screen (Mock Test Mode)
- "⏱️ NAT-I Mock Test" amber pill
- Section label above question card:
  - Q1–20: "Section 1: Verbal"
  - Q21–40: "Section 2: Analytical Reasoning"
  - Q41–60: "Section 3: Quantitative"
  - Q61–90: "Section 4: [Subject label]" ← dynamic per nat_category
- Timer top right (colour changes at 5min and 1min), starts at 120:00
- Question counter: Q X of 90
- Score + NEG MARKING display
- Flag 🚩 top right of question card
- NO Show Solution button
- Bottom bar: [‹] [Submit Answer] [›]
- Canvas available (Draw/Type/Upload)

### Screen 6 — Solution Screen Variant A (Wrong Answer)
- "Not quite — let's see why 🤔" — neutral/amber, never red
- "You selected B — Correct answer is A" side by side
- YOUR WORKING section: submitted canvas shown, ⚠️ error marker
- "Three ways to see the solution"
- Method tabs: [✓ Count] [Formula] [Grid]
  - Method 1 (Count): full listing method, zero formula, zero C(n,r)
  - Method 2 (Formula): maps C(n,r) onto Method 1 steps explicitly
  - Method 3 (Visual): actual SVG diagram, high contrast colours
- All steps fully expanded — nothing hidden
- Each step: teal circle number + bold title + explanation + boxed working + 💡 note
- Bridge card after Method 1: "🎯 Challenge yourself — try the formula next time"
- "Try a similar question →" FIXED at bottom, never scrolls

### Screen 7 — Solution Screen Variant B (Correct Answer)
- "Correct — nice work! 🎉" teal
- "You answered in 47 seconds"
- [Explore methods] [Next Question →]

### Screen 8 — Progress Screen
Toggle: [Practice] [Mock Tests]

Practice tab:
- Score trend line chart + This Week/Month/All Time toggle
- Sub-topic breakdown accordion — 4 sections:
  - English, Math, Reasoning, [Subject label e.g. "Engineering (NAT-IE)"]
- Each topic: expandable, sub-topic bars, weakest in red "⚠️ Focus here"
- TODAY'S FOCUS sticky: top 3 weakest + [Start →] per item
- Empty state: "Complete your first session to see progress"

Mock Tests tab:
- Score trend across tests
- Tests completed, best/average score
- Negative marks lost
- Readiness score gauge
- Sub-topic breakdown from mock test performance

### Screen 9 — Mock Test Screen
- "⏱️ NAT-I Mock Test" amber pill
- Section tabs: [English] [Math] [Reasoning] [Subject label]
- Timer (colour changes), starts at 120:00
- Score + NEG MARKING
- 10-question navigator grid per section (30-question grid for subject section)
  - ● Teal = Answered, ◻ Teal border = Current, ◐ Amber = Flagged, ○ Grey = Unseen
- Question + 4 options below
- Canvas (Draw/Type/Upload)
- Bottom bar: [‹] [Submit Answer] [›]
- Before submit: "You have X flagged questions" → [Review Flagged] [Submit Anyway]
- Timeout: auto-submit → Results screen

### Screen 10 — Mock Test Results
- "Test Complete ✓" teal
- Score out of 90, large + "↑ X points from last test"
- Section breakdown (4 rows):
  - English: score/20, %
  - Math: score/20, %
  - Reasoning: score/20, %
  - [Subject label]: score/30, % ← out of 30, dynamic label
- Attempted/Skipped/Flagged stats
- Negative marking: "−X marks lost (Y wrong × 0.25)"
- Attempt history: "Test 1: 52 | Test 2: 61 | Test 3: 67 ↑"
- [Review All Questions →] [Practice Weak Areas →]

### Screen 11 — Profile Screen (Two States)
View state:
- Avatar (initial teal circle) + name
- Mobile number
- NAT-I Category display: e.g. "Engineering (NAT-IE)"
- "18 days to NAT-I" countdown
- Goal tracker, Streak calendar, Test details, Practice stats, Mock stats
- [✏️ Edit Profile] teal outline button

Edit state:
- "Editing" badge
- All fields editable, active field teal border
- **NAT-I Category field** — tap to open 6-option selector
  - On change: inline warning "This will update your subject section across practice and mock tests"
  - Category change counts as unsaved change
- Streak reminders toggle
- "You have unsaved changes" warning + [Discard] [Save] inline
- [Cancel] [Save Profile] at bottom
- Input validation: mobile format, date range, score 40-100

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
id, phase_id, phase_name, label, tool, done, updated_at

### questions (Phase 1)
id, topic, sub_topic, difficulty,
question_text, option_a, option_b, option_c, option_d, correct_option,
explanation_en, explanation_methods,
source, verified (1=human verified only), verified_by, verified_at,
section (verbal | analytical | quantitative | subject_specific),
category (NAT-IE | NAT-IM | NAT-ICS | NAT-ICOM | NAT-IGS | NAT-IA — null for common sections),
ai_generated, review_flag, review_note,
times_attempted, times_correct,
created_at, updated_at

### question_methods (Phase 1)
id, question_id, method_number, method_title, method_steps (JSON)

### question_flags (Phase 1)
id, question_id, flagged_by, flag_reason, status, resolved_by, resolved_at

### students (Phase 1)
id, full_name, mobile,
nat_category (NAT-IE | NAT-IM | NAT-ICS | NAT-ICOM | NAT-IGS | NAT-IA),
test_date, target_score,
created_at, updated_at

### attempts (Phase 2)
id, student_id, question_id, mode (practice/mock_test),
action (attempted/skipped/learned),
selected_option, is_correct, time_spent, created_at

---

## Governance Rules

| Rule | Statement | Status |
|---|---|---|
| GOV-RULE-001 | AI must reference verified data sources, not context memory | Active |
| GOV-RULE-002 | AI output contradicting verified source must be flagged | Active |
| GOV-RULE-003 | Governance incidents captured immediately — not deferred | Active |
| GOV-RULE-004 | AI never determines correct answer — only explains pre-verified answer | Active |
| GOV-RULE-005 | All AI explanations logged with model, version, timestamp, confidence | Phase 4 |
| GOV-RULE-006 | Low-confidence explanations queued for human review | Phase 4 |
| GOV-RULE-007 | Factual questions require human-verified answer keys | Active |
| GOV-RULE-008 | Plan changes propagated to CLAUDE.md and all dependent docs before next session | Active |
| GOV-RULE-009 | Explanations never assume prior knowledge, never skip steps, multiple methods, plain language before formula, visual as actual diagrams, formula mapped onto intuitive method | Active |

**Governance document:** src/governance/NTS-GOV-001-AI-Governance-Incident-Log.docx (v1.1)

---

## Design Review Record (QA Evidence)

| Round | Date | Screens | Issues Found | Status |
|---|---|---|---|---|
| v1 | Jun 22 2026 | 6 screens | Missing screens, nav gaps, canvas persistence, progress duplication | Actioned |
| v2 | Jun 23 2026 | 7 screens | Colour not teal, canvas tabs missing, solution depth | Actioned |
| v3 | Jun 23 2026 | 11 screens | Onboarding multi-step, mode indicator missing, bottom bar overcrowded | Actioned |
| v4 | Jun 24 2026 | 11 screens | Onboarding not applied, save profile missing, button rendering bug | Actioned |
| v5 | Jun 24 2026 | 11 screens | Onboarding optional fields, formula depth, C(7,5) repeated, overlapping | Actioned |

Full evidence: src/governance/design/ folder

---

## Plan Change Propagation Checklist

When plan changes, ALWAYS update before next session:
- [ ] CLAUDE.md (written by Claude chat, committed by Claude Code)
- [ ] Turso tasks table (admin panel)
- [ ] NTS-GOV-001 if governance-relevant
- [ ] Log as incident if a dependent document was missed

---

## Phase Roadmap

### Phase 0 — Setup (Complete ✅)
- ✅ Claude Code installed and authenticated
- ✅ React 18 + Vite + Tailwind scaffolded
- ✅ Turso connected (nts database, AWS ap-south-1 Mumbai)
- ✅ Admin panel built at /admin
- ✅ GitHub repo live at AyyazAI/NTS
- ✅ Deployed to Vercel (nts-xi.vercel.app)
- ✅ Claude Design FINAL — 11 screens approved
- ✅ Design exported (PDF, HTML, ZIP, Master Prompt)
- ✅ Governance document NTS-GOV-001 v1.1 committed
- ✅ Handoff Claude Design to Claude Code

### Phase 1 — Core Loop (In Progress)
- ✅ All 11 screens built as static UI (Batch 5)
- ✅ Subject-specific 4th section added to all 11 screens
- ✅ NAT-IE (Engineering) seeded as Phase 1 active category
- ✅ Onboarding updated with mandatory NAT-I category selector
- ✅ Mock test updated to 90 MCQs, 120 minutes (4 sections)
- ⬜ Pending fixes: SolutionWrong tabs, QuestionMockTest colour audit (in progress via Claude Code)
- ⬜ Visual verification across all 11 screens
- ⬜ Questions table schema (questions, question_methods, question_flags)
- ⬜ Admin question entry form (/admin/questions/new)
- ⬜ Seed 90 verified questions:
    - Verbal: 20 questions
    - Analytical Reasoning: 20 questions
    - Quantitative: 20 questions
    - Subject-Specific (NAT-IE Engineering): 30 questions
- ⬜ Wire Practice Mode core loop
- ⬜ Claude API explanation generation (Vercel serverless, GOV-RULE-009 system prompt)
- ⬜ Canvas implementation (Draw/Type/Upload with persistence)
- ⬜ Deploy Phase 1 to Vercel
- ⬜ Two documents: BRD + Design Testing Evidence Log
- ⬜ Remaining 5 categories content added to CLAUDE.md

### Phase 2 — Intelligence Layer
- Activate remaining NAT-I categories one at a time:
  NAT-IM (Medical), NAT-ICS (Computer Science), NAT-ICOM (Commerce),
  NAT-IGS (General Sciences), NAT-IA (Arts)
- Seed subject-specific questions for each category (30 per category)
- MCP connectors (Turso + GitHub)
- Multi-agent pipeline (Agents 1-5)
- Claude Vision: canvas working analysis + error diagnosis
- Mock test mode full implementation
- Adaptive difficulty engine
- Phone + OTP authentication
- Promptfoo automated testing suite
- Question bank 150+

### Phase 3 — Personalisation
- Full student profile with attempt history
- Weak zone dashboard + readiness score
- RAG implementation
- Agent 4: Progress Analyser
- Premium membership model introduction
- Offline practice pack (PDF download)
- Question bank 300+

### Phase 4 — Governance
- Confidence scoring + human review queue
- Audit log (model, version, timestamp, confidence)
- Promptfoo regression testing
- CT-AI v2.0 + ISO 42001 alignment
- NTS-GOV-001 finalised
- Upload and analyse offline packs (Claude Vision)

### Phase 5 — Tutor Marketplace
- Tutor registration and verification
- AI-diagnosed student profile handoff
- WhatsApp-based session facilitation
- Rating system
- Commission revenue model

---

## Question Bank Strategy

**Source 1:** NTS past papers (manual curation) — Phase 1
**Source 2:** Agent 5 generated (human spot-checked) — Phase 2
**Source 3:** Community contributions (human-gated) — Phase 3+

**Phase 1 question targets:**
- Verbal: 20 questions
- Analytical Reasoning: 20 questions
- Quantitative: 20 questions
- Subject-Specific (NAT-IE Engineering): 30 questions
- Total Phase 1: 90 verified questions

**Rule:** Only verified=1 questions served to students. No exceptions.

---

## Key Product Features

- **Two modes:** Practice (learning) and Mock Test (exam simulation)
- **Answer flow:** Wrong → forced solution + error diagnosis. Correct → optional exploration.
- **Adaptive difficulty:** AI-driven auto + student-controlled + test-date urgency (Phase 2)
- **Canvas:** Draw/Type/Upload — persists, feeds Claude Vision
- **Solution methods:** Minimum 2, all expanded, Method 2 maps formula onto Method 1 steps
- **Negative marking:** -0.25 per wrong answer, skip strategy taught
- **Student profile:** Goals, test date, target score, NAT-I category, attempt history, weak zones, streaks
- **Mock test:** 90 MCQs, 120 min, 4 sections, auto-submit on timeout, resume on close, full review after
- **Premium:** Rs. 1000/month — history, chatbot, PDF reports, offline packs (Phase 3)
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

Every Claude Code session:
1. Read this CLAUDE.md
2. Confirm current phase and next task
3. Check admin panel task status
4. Reference src/governance/design/NTS_Prep_Design.html for UI
5. Never rely on context memory when Turso data exists

---

## Incidents Log Summary

| ID | Date | Description | Status |
|---|---|---|---|
| INC-001 | Jun 21 2026 | AI used context memory instead of verified database | Resolved |
| INC-002 | Jun 22 2026 | Admin panel tasks out of sync after plan update | Resolved |
| INC-003 | Jun 25 2026 | Subject-specific section incorrectly scoped to Phase 2 — corrected to Phase 1, all 11 screens updated, CLAUDE.md propagated | Resolved |

Full details: src/governance/NTS-GOV-001-AI-Governance-Incident-Log.docx

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

---

## Offline Practice Pack (Phase 3-4)

PDF download (10-20 questions, answer bubbles, working space).
Student solves offline → photographs → uploads.
Claude Vision reads bubbles (reliable) + working (best effort).
Confirmation step before saving results.
Graceful fallback if handwriting unreadable.
