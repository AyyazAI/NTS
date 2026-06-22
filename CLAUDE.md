# NTS Prep — Project Context

## Platform

**TaleemiMarkaz** is the umbrella platform for free educational tools for Pakistani students.
**NTS Prep** lives at [taleemimarkaz.com](https://taleemimarkaz.com) and targets NAT-I bachelor admissions via the National Testing Service (NTS).

## Project Overview

**NTS Prep** is a free test preparation platform for Pakistani students targeting NAT-I bachelor admissions via the National Testing Service (NTS).

## Scope

Three subject areas only:
- **English** (Verbal)
- **Math** (Quantitative)
- **Analytical Reasoning**

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Database | Turso / libSQL |
| AI | Claude API — Sonnet 4.6 |
| Design | Claude Design (UI screens → Claude Code handoff) |
| Deployment | Vercel |
| Dev Tool | Claude Code (all file operations) |

## Learning Goals

- **Claude Design** — Use Claude Design to design all core UI screens (Home, Question, Solution, Canvas, Progress) before implementation, then hand off to Claude Code for build.

## AI Role — Critical Constraint

Claude is an **explanation engine only**. It never determines, overrides, or validates correct answers. All correct answers are pre-verified by humans and stored in the database. Claude only explains *why* a pre-verified answer is correct.

## Roadmap

| Phase | Name | Description |
|---|---|---|
| 0 | Setup | Project scaffolding, DB schema, tooling, UI design in Claude Design |
| 1 | Core Loop | Question display, answer submission, scoring |
| 2 | Intelligence | AI-powered explanations via Claude API |
| 3 | Personalisation | Weak-area tracking, adaptive practice |
| 4 | Governance | CT-AI v2.0 + ISO 42001 aligned governance layer |

## Governance

Phase 4 implements a full AI governance layer aligned with:
- **CT-AI v2.0** (Conformité Technologique — Artificial Intelligence)
- **ISO 42001** (AI Management Systems)

### Governance Rules

| Rule ID | Description |
|---|---|
| GOV-RULE-008 | Any change to the project plan must be propagated to CLAUDE.md and all dependent documents before the next Claude Code session begins. |
