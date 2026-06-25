# GOV-HITL-001 — Human in the Loop Evidence Log
## TaleemiMarkaz NTS Prep
## Session: June 25-26, 2026
## Tester: Ayyaz (Product Owner, QA Engineer, CT-AI v2.0 candidate)

---

## Purpose

This document is the formal evidence log demonstrating Human in the Loop (HITL) oversight of AI systems in TaleemiMarkaz NTS Prep.

It records what automation and AI review caught vs what human exploratory testing caught — and why the difference matters for AI governance.

---

## The Three-Layer QA Pyramid Results

| Layer | Tool | Findings | Time |
|---|---|---|---|
| Automation | Playwright | 9 spec failures | ~20 seconds |
| AI Review | Claude Chat | 12 spec mismatches | ~15 minutes |
| Human Exploratory | Owner testing | 20+ critical findings | ~4 hours |

---

## What Automation Caught (9 findings)

All confirmed spec mismatches — things explicitly listed in test cases:
1. Name field not mandatory
2. Date max 1 year missing
3. 30 Feb accepted
4. Slider min=40 (should be 50)
5. Back arrow visible on Q1
6. Profile practice stats present (out of spec)
7. Profile mock test stats present (out of spec)
8. Today's Focus shows 4 items (overwhelming)
9. XP/speed bonus present (never approved)

---

## What Only the Human Caught (20+ findings)

| Finding | Human Insight Required | AI/Automation Could Catch? |
|---|---|---|
| "Assalam-o-Alaikum" is religion-specific | Cultural and religious inclusion awareness | No |
| Skip link breaks 17-19 year old psychology | User age psychology | No |
| Guest mode concept fundamentally flawed | Teenage user behaviour empathy | No |
| Today's Focus causes anxiety not motivation | Emotional intelligence | No |
| Sub-topics not selectable — core flow broken | Usage intent understanding | No |
| Negative marking factually wrong for NAT-I | Domain knowledge | No |
| Date picker → replace with NTS schedule | Problem reframing | No |
| Target score default "Not yet" wrong | Engagement psychology | No |
| "Full name" vs "What should we call you?" | Language empathy | No |
| Grid shows "leave out 2" not "pick 5" | Pedagogy depth | No |
| Visual type selection intelligence needed | Educational theory | No |
| Score graph needs axis labels | Data literacy | No |
| Target score on graph as reference line | Cricket match analogy insight | No |
| Dynamic target after crossing goal | Retention psychology | No |
| Mathematics appears twice across sections | Domain knowledge | No |
| NAT-I Math → Quantitative Reasoning rename | NTS terminology | No |
| Progress screen overwhelms not motivates | UX empathy | No |
| "Why ask test date at all?" | Root cause thinking | No |
| University merit benchmark feature idea | Product strategy | No |
| Avoidance pattern recognition concept | Learning psychology | No |
| Hint mode feature concept | Tutoring methodology | No |
| B2B institute licensing model | Business model thinking | No |
| Platform expansion beyond NAT-I | Strategic vision | No |

---

## The Core HITL Principle (Evidenced Here)

> **"Automation and AI review verify what was specified. Only a human can question whether the specification itself was right."**

Every finding in the table above required something no AI system currently has:
- Cultural context and sensitivity
- Emotional empathy for the target user
- Domain expertise in Pakistani education system
- User psychology for teenagers
- Problem reframing ability
- Real-world knowledge outside the written spec
- Business and strategic thinking

---

## Personal Note — Learning Through Practice

The tester arrived at these findings without formal ISO 42001 or CT-AI v2.0 certification — through product instinct, user empathy, and domain knowledge accumulated through building the product.

This is the correct order of learning:
Experience first → Certification gives the vocabulary for what you already understand through practice.

When ISO 42001 auditors ask "how do you ensure human oversight of your AI system?" — this document is the answer. Dated, specific, evidenced with concrete examples.

---

## Standards Alignment

| Standard | Principle | Evidence |
|---|---|---|
| ISO 42001 | Human oversight of AI systems | 20+ findings that automation missed |
| CT-AI v2.0 | AI testing requires human judgment | Automation confirmed bugs; human found root causes |
| EU AI Act | High-risk AI requires human review | Educational AI affecting student outcomes |
| NIST AI RMF | Continuous human monitoring | Single session produced governance updates, spec corrections, product decisions |

---

## Outcome

This session resulted in:
- 50+ issues fixed (commit 961095d)
- 3 new governance rules (GOV-RULE-010, 011, 012)
- 6 product decisions (PD-001 through PD-006)
- 7 UX decisions (UX-001 through UX-007)
- 2 strategic notes (SN-001, BM-001)
- CLAUDE.md significantly updated
- Playwright suite expanded to 57 tests (57/57 passing)
- NAT-I paper structure verified for all 6 categories
- 5 incidents logged (INC-004 through INC-008)

---

## Next Review

Round 2 human exploratory testing — after all Phase 1 features deployed.
Expected: significantly fewer spec issues, focus on new features and edge cases automation cannot cover.
