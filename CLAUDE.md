# TaleemiMarkaz — NTS Prep

## Links

**GitHub:** github.com/AyyazAI/NTS
**Live URL:** nts-xi.vercel.app
**Admin Panel:** nts-xi.vercel.app/admin
**Dev server:** localhost:5175
**Terminal path:** E:\Claude - NTS

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Font | Nunito |
| Accent colour | Teal #0D9488 |
| Database | Turso / libSQL |
| AI | Claude Sonnet 4.6 |
| Deployment | Vercel (Hobby plan) |
| Version control | GitHub (AyyazAI/NTS) |

All Claude API and Turso calls route through Vercel serverless functions — NEVER directly from the browser.

---

## Working Rules

1. **Read CLAUDE.md at the start of every session.**
2. Work step by step, one task at a time. Do not skip confirmation steps unless the prompt explicitly says to proceed autonomously.
3. **GOV-RULE-013:** Only modify files explicitly listed in the prompt. Flag any out-of-scope change before committing. Undocumented changes are a governance violation.
4. **Never run the test suite** unless explicitly instructed.
5. **Never commit** unless explicitly instructed.

---

## Governance Rules

| Rule | One-line summary | Status |
|---|---|---|
| GOV-RULE-001 | No hardcoded AI-sounding text — all AI output must reference verified data, not fabricated context | Active |
| GOV-RULE-002 | AI output contradicting a verified source must be flagged immediately | Active |
| GOV-RULE-003 | Governance incidents captured immediately — not deferred | Active |
| GOV-RULE-004 | AI never determines the correct answer — only explains pre-verified answers | Active |
| GOV-RULE-005 | All AI explanations logged with model, version, timestamp, confidence | Phase 4 |
| GOV-RULE-006 | Low-confidence explanations queued for human review | Phase 4 |
| GOV-RULE-007 | Factual questions require human-verified answer keys | Active |
| GOV-RULE-008 | Plan changes propagated to CLAUDE.md and all dependent docs before next session | Active |
| GOV-RULE-009 | Explanations: no assumed knowledge, no skipped steps, multiple methods, plain language before formula, visuals as actual SVG (not text instructions) | Active |
| GOV-RULE-010 | AI selects appropriate visual type per question — never one default format | Active |
| GOV-RULE-011 | All UGC passes moderation before AI processing or permanent storage | Phase 2 |
| GOV-RULE-012 | No light gray text on white/light backgrounds — minimum text-gray-700 | Active |
| GOV-RULE-013 | Claude Code modifies only files explicitly listed in the prompt. Undocumented changes = governance violation. | Active |
| GOV-RULE-014 | Unselected: bg-blue-100 / border-blue-300 / text-gray-900. Selected: solid bg-teal-600 / text-white. Back buttons: bg-blue-100 / border-blue-300. | Active |

Full rule details: SPEC.md (GOV-RULE-009, 010, 011, 012) · DECISIONS.md (GOV-RULE-014)

---

## Reference Files

| Need | File |
|---|---|
| Screen specs, NAT-I structure, phase roadmap, DB schema, AI quality standards | SPEC.md |
| UX decisions, product decisions, reversed decisions, canvas rules, selection theme | DECISIONS.md |
| Governance incidents, HITL evidence, findings | src/governance/ |

---

## Environment Variables

```
VITE_TURSO_URL=your_turso_database_url
VITE_TURSO_TOKEN=your_turso_auth_token
VITE_ADMIN_PASSWORD=nts2024
```

Never commit .env.local — excluded by .gitignore and .claudeignore.
