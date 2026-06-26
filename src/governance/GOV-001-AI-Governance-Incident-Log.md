# GOV-001 — AI Governance Incident Log (Markdown)
## TaleemiMarkaz NTS Prep
## Companion to: NTS-GOV-001-AI-Governance-Incident-Log.docx (v1.1)

This markdown file captures all governance incidents in code-reviewable format.
The .docx file remains the primary governance record. This file is kept in sync.

---

## Incident Format

Each incident records:
- **ID, Date, Severity, Type**
- **Description** — what happened
- **Root Cause** — why it happened
- **Impact** — what could have affected students
- **Resolution** — what was done
- **Rule Triggered** — which governance rule applies
- **Status / Resolved By / Date**

---

## INC-001
**Date:** 2026-06-21
**Severity:** High
**Type:** Data Integrity
**Description:** AI used context memory instead of verified database to answer a question about question count.
**Root Cause:** No guardrail enforcing database-first lookup before responding.
**Impact:** Incorrect data could have been presented as fact to the product owner.
**Resolution:** GOV-RULE-001 formalised. All AI responses must reference Turso data, not context memory.
**Rule Triggered:** GOV-RULE-001
**Status:** Resolved
**Resolved By:** Process — rule added
**Resolved Date:** 2026-06-21

---

## INC-002
**Date:** 2026-06-22
**Severity:** Medium
**Type:** Process Failure
**Description:** Admin panel tasks table went out of sync after a plan update — tasks shown as pending that were already complete.
**Root Cause:** Plan change not propagated to Turso tasks table before next session.
**Impact:** False view of project progress in admin panel.
**Resolution:** Plan Change Propagation Checklist added to CLAUDE.md. Admin panel tasks must be updated as part of every plan change.
**Rule Triggered:** GOV-RULE-008
**Status:** Resolved
**Resolved By:** Process — checklist added
**Resolved Date:** 2026-06-22

---

## INC-003
**Date:** 2026-06-25
**Severity:** High
**Type:** Scope Error
**Description:** Subject-specific (4th section) was incorrectly scoped to Phase 2 when it should be Phase 1 — all 11 screens were missing the subject section.
**Root Cause:** Initial CLAUDE.md spec did not include subject section in Phase 1 scope. Was added during build but not caught until testing.
**Impact:** All 11 screens were missing a core section of the NAT-I paper. Would have been discovered only when question seeding began.
**Resolution:** Subject-specific section added to all 11 screens. CLAUDE.md updated. All screens rebuilt and verified.
**Rule Triggered:** GOV-RULE-008
**Status:** Resolved
**Resolved By:** Human testing (Ayyaz) + full rebuild
**Resolved Date:** 2026-06-25

---

## INC-004
**Date:** 2026-06-25
**Severity:** Medium
**Type:** Review Failure
**Description:** AI review marked Profile screen as ✅ passing but missed two out-of-spec sections — "Practice Stats" block (Questions attempted, Solutions viewed, Topics covered, Accuracy) and "Mock Test Stats" block (Tests completed, Best score, Average score). Both belong on Progress screen per CLAUDE.md spec line 332.
**Root Cause:** Surface-level visual review without cross-checking every element against CLAUDE.md spec line by line. Review focused on required elements being present rather than unrequired elements being absent.
**Impact:** Two out-of-spec content blocks would have been visible to students. Students would see duplicated stats across Profile and Progress screens, causing confusion.
**Resolution:** Both blocks removed from Profile.jsx in commit 961095d. AI review process updated: must check for BOTH required elements present AND unrequired elements absent.
**Rule Triggered:** GOV-RULE-003
**Status:** Resolved
**Resolved By:** Human testing (Ayyaz)
**Resolved Date:** 2026-06-25

---

## INC-005
**Date:** 2026-06-25
**Severity:** High
**Type:** Factual Error
**Description:** Mock Test screen displayed "NEG MARKING — 0.25 per wrong answer" in score display, and MockTestResults.jsx showed a full Negative Marking section ("−5.25 marks lost / 21 wrong × 0.25 per wrong answer"). NAT-I officially has NO negative marking across all 6 categories.
**Root Cause:** CLAUDE.md spec was written without verifying official NTS rules. The line "Negative marking -0.25 per wrong answer" was in the spec from the beginning and treated as fact.
**Impact:** Students would have adopted the wrong exam strategy — skipping questions they should attempt, fearing negative marking that does not exist. This directly harms student performance on the real NAT-I exam.
**Resolution:** Negative marking removed from all screens (QuestionMockTest.jsx, MockTest.jsx, MockTestResults.jsx) in commit 961095d. NAT-I paper structure verified from official NTS sources. SC-01 correction applied throughout CLAUDE.md.
**Rule Triggered:** GOV-RULE-001 (human-verified ground truth), GOV-RULE-007 (factual questions require human-verified answer keys)
**Status:** Resolved
**Resolved By:** Web research + fix commit 961095d
**Resolved Date:** 2026-06-26

---

## INC-006
**Date:** 2026-06-25
**Severity:** Medium
**Type:** Review Failure
**Description:** AI review missed XP/speed bonus card on Solution Correct screen — marked screen as partially passing without catching out-of-spec gamification element ("+10 XP earned / Under 60 seconds — speed bonus!" badge).
**Root Cause:** Review focused on presence of required elements, not absence of unrequired elements. The XP card was not in the spec so was not in the checklist.
**Impact:** Unapproved gamification feature visible to students. Could create expectation of reward system that does not exist elsewhere.
**Resolution:** XP badge block removed from SolutionCorrect.jsx in commit 961095d. Review process updated — checklists must now include "confirm absence of unrequired elements."
**Rule Triggered:** GOV-RULE-003
**Status:** Resolved
**Resolved By:** Human testing (Ayyaz) + fix commit 961095d
**Resolved Date:** 2026-06-26

---

## INC-007
**Date:** 2026-06-25
**Severity:** Medium
**Type:** Scope Creep
**Description:** SolutionCorrect.jsx contained XP earned badge and speed bonus feature never approved in spec or governance review. Feature was added by Claude Code during implementation without explicit approval.
**Root Cause:** AI (Claude Code) expanded scope during implementation — added a feature it determined would be "engaging" without being asked to.
**Impact:** Unapproved feature visible to users. Students saw "+10 XP earned" badge suggesting a points/XP system that doesn't exist.
**Resolution:** Feature removed in commit 961095d. GOV-RULE-004 extended: AI never expands scope without explicit approval. AI is an implementation tool, not a product designer.
**Rule Triggered:** GOV-RULE-004
**Status:** Resolved
**Resolved By:** Fix commit 961095d
**Resolved Date:** 2026-06-26

---

## INC-008
**Date:** 2026-06-25
**Severity:** Low
**Type:** Review Failure
**Description:** AI review missed wave emoji on separate line issue on both Onboarding (heading) and Home (greeting) screens — marked both as passing. Emoji appeared on a new line below the text instead of inline.
**Root Cause:** Screenshot review missed single-line vs two-line rendering difference. The issue was subtle and required actually reading the rendered text flow, not just confirming text presence.
**Impact:** Minor visual inconsistency — heading and greeting looked misaligned on mobile viewport.
**Resolution:** Fixed in commit 961095d. Wave emoji moved inline with text on both screens.
**Rule Triggered:** GOV-RULE-003
**Status:** Resolved
**Resolved By:** Human testing (Ayyaz) + fix commit 961095d
**Resolved Date:** 2026-06-26

---

## INC-009
**Date:** 2026-06-26
**Severity:** High
**Type:** Implementation Failure
**Description:** Multiple Round 1 fixes confirmed by commit 961095d did not actually land in the codebase — greeting still "Assalam-o-Alaikum", XP badge still present, skip link still present, negative marking still displayed, "Math" not renamed, profile stats blocks still present — all observed in Round 2 testing.
**Root Cause:** Commit may have had a merge conflict or files were overwritten by subsequent commits. Claude Code confirmed changes were made but the running code showed otherwise.
**Impact:** Students see factually wrong information (negative marking displayed for a test that has none), out-of-spec features (XP badge), and broken onboarding flow (skip link that bypasses mandatory onboarding).
**Resolution:** Re-apply all Round 1 fixes explicitly in Round 2 fix prompt.
**Rule Triggered:** GOV-RULE-003, GOV-RULE-008
**Status:** Open
**Resolved By:** Pending Round 2 fix commit
**Resolved Date:** Pending

---

## INC-010
**Date:** 2026-06-26
**Severity:** Critical
**Type:** Logic Bug
**Description:** Selecting the correct answer on Practice Question screen routes student to the wrong answer / solution screen instead of the correct answer screen.
**Root Cause:** Answer validation logic not correctly comparing selected option against correct_option — routing decision uses wrong conditional.
**Impact:** Students who answer correctly are told they are wrong — destroys student confidence and trust in the platform. Core learning loop is broken.
**Resolution:** Pending Round 2 fix.
**Rule Triggered:** GOV-RULE-001 (human-verified ground truth not correctly applied in routing logic)
**Status:** Open
**Resolved By:** Pending
**Resolved Date:** Pending

---

## INC-011
**Date:** 2026-06-26
**Severity:** High
**Type:** Spec Drift
**Description:** CLAUDE.md contained factually incorrect specification — negative marking listed as a feature, skip link listed as present, "Full name" field label wrong, date picker referenced instead of NTS preset selector.
**Root Cause:** CLAUDE.md was not fully updated when product decisions were made during testing sessions. The spec and the code/decisions diverged.
**Impact:** Future Claude Code sessions reading CLAUDE.md would reintroduce removed features and implement incorrect behaviour — a self-reinforcing error loop.
**Resolution:** CLAUDE.md corrected in this documentation update (Round 2 doc commit). All 10 targeted corrections applied.
**Rule Triggered:** GOV-RULE-008 (plan changes must propagate to CLAUDE.md before next session)
**Status:** Resolved
**Resolved By:** This documentation commit
**Resolved Date:** 2026-06-26

---

## Summary Table

| ID | Date | Severity | Type | Status |
|---|---|---|---|---|
| INC-001 | Jun 21 2026 | High | Data Integrity | Resolved |
| INC-002 | Jun 22 2026 | Medium | Process Failure | Resolved |
| INC-003 | Jun 25 2026 | High | Scope Error | Resolved |
| INC-004 | Jun 25 2026 | Medium | Review Failure | Resolved |
| INC-005 | Jun 25 2026 | High | Factual Error | Resolved |
| INC-006 | Jun 25 2026 | Medium | Review Failure | Resolved |
| INC-007 | Jun 25 2026 | Medium | Scope Creep | Resolved |
| INC-008 | Jun 25 2026 | Low | Review Failure | Resolved |
| INC-009 | Jun 26 2026 | High | Implementation Failure | Open |
| INC-010 | Jun 26 2026 | Critical | Logic Bug | Open |
| INC-011 | Jun 26 2026 | High | Spec Drift | Resolved |
