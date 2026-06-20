# NTS Prep — Project Context

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
| Deployment | Vercel |
| Dev Tool | Claude Code (all file operations) |

## AI Role — Critical Constraint

Claude is an **explanation engine only**. It never determines, overrides, or validates correct answers. All correct answers are pre-verified by humans and stored in the database. Claude only explains *why* a pre-verified answer is correct.

## Roadmap

| Phase | Name | Description |
|---|---|---|
| 0 | Setup | Project scaffolding, DB schema, tooling |
| 1 | Core Loop | Question display, answer submission, scoring |
| 2 | Intelligence | AI-powered explanations via Claude API |
| 3 | Personalisation | Weak-area tracking, adaptive practice |
| 4 | Governance | CT-AI v2.0 + ISO 42001 aligned governance layer |

## Governance

Phase 4 implements a full AI governance layer aligned with:
- **CT-AI v2.0** (Conformité Technologique — Artificial Intelligence)
- **ISO 42001** (AI Management Systems)
