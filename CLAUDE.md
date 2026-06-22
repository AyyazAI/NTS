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
| Font | Nunito (English) + Jameel Noori Nastaleeq (Urdu) |
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
8. **Urdu available** — all explanations available in Urdu on toggle

**Target reader:** An intelligent Pakistani student aged 17-19 encountering this method for the first time.

---

## Agent Architecture

| Agent | Role | Phase |
|---|---|---|
| Agent 1 | Question Validator — checks question clarity and answer key correctness | Phase 2 |
| Agent 2 | Explanation Generator — step-by-step solutions, Mode A (standard) and Mode B (handwriting analysis) | Phase 2 |
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
- explanation_en, explanation_ur, explanation_methods
- source, verified, verified_by, verified_at
- ai_generated, review_flag, review_note
- times_attempted, times_correct
- created_at, updated_at

### question_methods (Phase 1)
- id, question_id, method_number, method_title, method_steps (JSON), language

### question_flags (Phase 1)
- id, question_id, flagged_by, flag_reason, status, resolved_by, resolved_at

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
| GOV-RULE-009 | AI explanations must never assume prior knowledge, never skip steps, show multiple methods, plain language before formula | Active |

**Governance document:** src/governance/NTS-GOV-001-AI-Governance-Incident-Log.docx (v1.1)

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
- Admin panel built at /admin (password: VITE_ADMIN_PASSWORD)
- CLAUDE.md written
- GitHub repo live at AyyazAI/NTS
- Deployed to Vercel (nts-xi.vercel.app)
- Claude Design session complete — 6 screens designed
- Governance document NTS-GOV-001 v1.1 committed
- vercel.json routing config added

### Phase 1 — Core Loop (Next)
- Questions table schema in Turso
- Question entry form in admin panel
- Seed 60 verified questions (20 per section)
- Topic selector (Home screen)
- Question display with 4 MCQ options
- Answer submission + negative marking (-0.25)
- Canvas scratch pad (Draw / Type / Upload tabs)
- Claude API explanation generation (via Vercel serverless function)
- Urdu/English toggle on explanations
- Solution screen with step-by-step reveal
- Similar question CTA
- Session score display
- Deploy updated Phase 1 to Vercel

### Phase 2 — Intelligence Layer
- MCP connector: Claude Code ↔ Turso
- MCP connector: Claude Code ↔ GitHub
- Multi-agent pipeline (Agents 1-5)
- Claude Vision: read handwritten canvas working
- Confirmation step: "Is this what you wrote?"
- Diagnostic feedback: "You went wrong at step 2"
- Auto difficulty progression (AI-driven)
- Student-controlled difficulty selector (Easy/Medium/Hard/Auto)
- Test-date aware difficulty nudges
- Mock test mode (30 questions, 30 min, negative marking)
- Phone + OTP authentication
- Promptfoo automated prompt testing
- Question bank grows to 150+

### Phase 3 — Personalisation
- Full student profile (goals, test date, target score)
- Weak zone dashboard (radar chart, line chart, streak calendar)
- Readiness score gauge
- RAG: surface similar questions on wrong answers
- Agent 4: Progress Analyser with daily recommendation
- Error pattern analysis from canvas working
- Device-based or OTP-based session persistence
- Question bank grows to 300+

### Phase 4 — Governance
- Confidence scoring on every AI explanation
- Human review queue for low-confidence outputs
- Audit log: model, version, timestamp, confidence, review status
- Promptfoo regression testing suite
- CT-AI v2.0 alignment mapping
- ISO 42001 alignment mapping
- Incident response plan documented
- Governance document NTS-GOV-001 finalised

### Phase 5 — Tutor Marketplace
- Tutor registration and verification
- AI-diagnosed student profile handoff to tutor
- WhatsApp-based session facilitation
- Rating system post-session
- Revenue: commission per session facilitated

---

## UI Design

**Completed in Claude Design (Phase 0)**
6 screens designed, teal (#0D9488) accent, Nunito font, mobile-first:
1. Home — TaleemiMarkaz branding, topic cards, streak, EN/اردو toggle
2. Question — large answer options, Draw/Type/Upload canvas tabs
3. Solution — step-by-step reveal, "Try a similar question" CTA
4. Canvas Challenge — AI-generated similar question, full canvas
5. Progress — readiness score, score trend, radar chart, focus zones
6. Mock Test — section switcher, 30Q grid, timer, negative marking display

**Handoff to Claude Code:** Pending final design review

---

## Question Bank Strategy

**Source 1:** NTS past papers (manual curation) — Phase 1
**Source 2:** Agent 5 generated questions (human spot-checked) — Phase 2
**Source 3:** Community contributions (human-gated) — Phase 3+

**Minimum for Phase 1 launch:** 60 verified questions (20 per section)

**Verification rule:** Only questions with verified=1 in Turso are served to students. No exceptions.

---

## Key Product Features

- **Adaptive difficulty:** AI-driven auto mode + student-controlled Easy/Medium/Hard + test-date urgency
- **Canvas working:** Draw (finger) / Type (keyboard) / Upload (photo of paper) — all feed Claude Vision
- **Urdu support:** Level 2 — UI + explanations toggle, questions stay in English, RTL with Nastaleeq font
- **Multiple solution methods:** Every question has minimum 2 methods explained in full
- **Negative marking simulation:** -0.25 per wrong answer, skip strategy taught
- **Student profile:** Goals, test date, target score, weak zones, readiness score, streaks
- **Tutor marketplace:** Phase 5 — WhatsApp handoff with AI-diagnosed student profile

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

Full incident details in src/governance/NTS-GOV-001-AI-Governance-Incident-Log.docx
