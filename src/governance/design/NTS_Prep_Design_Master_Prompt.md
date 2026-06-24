# TaleemiMarkaz — NTS Prep
# Claude Design Master Prompt — Final Version
# Combines all design iterations v1 through v5
# Date: June 2026

---

## PRODUCT CONTEXT

NTS Prep is the first product under TaleemiMarkaz — a free AI-powered education 
platform for Pakistani students. This is a mobile-first test preparation web app 
for NAT-I university admissions targeting Pakistani students aged 17-19.

---

## GLOBAL RULES (apply to every screen without exception)

- TaleemiMarkaz logo + "NTS Prep" in header on EVERY screen
- Teal accent colour #0D9488 throughout
- Nunito font — English only, no Urdu toggle on any screen
- White background, rounded elements, generous spacing
- Large tap targets minimum 48px on all interactive elements
- Accessible font sizes minimum 16px body text
- Bottom navigation on EVERY screen:
  [🏠 Home] [📚 Practice] [⏱️ Mock] [📊 Progress] [👤 Profile]
  Bottom nav has 80px minimum padding to avoid overlap with 
  device system controls
- Mobile portrait orientation primary
- Scales gracefully to tablet and desktop — centred content, 
  max-width container on larger screens
- Never use red for wrong answers — use neutral/amber colours
- TaleemiMarkaz branding consistent across all screens
- Two mode indicators used throughout:
  Practice screens: "📚 Practice Mode" teal outline pill below header
  Mock Test screens: "⏱️ NAT-I Mock Test" amber outline pill below header

---

## SCREEN 1 — ONBOARDING (First-time user — 2 steps)

Progress dots at top showing step 1 of 2 / step 2 of 2.
TaleemiMarkaz logo centred at top.

STEP 1 — Essential information (mandatory):
Title: "Welcome to TaleemiMarkaz 👋"
Sub-title: "Let's get you started in 2 quick steps"
Progress: ● ○

Fields:
- Full name: "What should we call you?" (text input)
- Mobile number: Pakistani format hint "03XX-XXXXXXX"
  Inline validation error shown if wrong format

[Continue →] teal full-width button
No back button on step 1.
Below button: "Skip setup — take me to practice →" small grey link
(skips both steps, enters app directly)

STEP 2 — Optional goals:
Title: "Set your goals (optional)"
Sub-title: "You can always update these later in your Profile"
Progress: ○ ●

Field 1 — Test date:
  "Do you have a target NAT-I test date?"
  Toggle: [Yes] [Not yet]
  If Yes → date picker (no past dates, max 1 year ahead)
  If Not yet → field stays hidden

Field 2 — Target score:
  "Do you have a target score in mind?"
  Toggle: [Yes] [Not yet]
  If Yes → slider 40-100, default 70
            Live label: "I want to score 75/100"
  If Not yet → field stays hidden

No university field — removed entirely from onboarding.

[Let's go! →] teal full-width button
[← Back] grey outline button

---

## SCREEN 2 — HOME (Returning user)

Header: TaleemiMarkaz logo + "NTS Prep"
Greeting: "Assalam-o-Alaikum, Hamza 👋"

Daily Goal card (no streak shown in this version):
  "Practice 20 questions today"
  Progress bar: "8 of 20 done" — teal fill
  Motivational sub-text: "You're doing great — keep going!"

Mode selector — two prominent cards:
  [📚 Practice Mode]  [⏱️ Mock Test]
  Active mode: teal background, white text
  Inactive mode: white background, grey outline

When Practice Mode selected (default):
  Three topic cards: English, Math, Reasoning
  Each card: topic icon, name, progress bar, percentage
  Under percentage: "17 of 25 questions attempted"
  Bar colour: green >70%, amber 50-70%, red <50%

When Mock Test selected:
  Topic cards disappear completely
  Single "Start Mock Test →" teal button
  "Last score: 67/100" shown if previous test exists

No "See All" link — all three topics already visible.
Bottom navigation.

---

## SCREEN 3 — SUB-TOPIC SELECTION (Practice Mode only)

Header: TaleemiMarkaz + "NTS Prep"
Mode pill: "📚 Practice Mode"
Back arrow ← to Home.
Title: "Choose what to practice"
Topic shown at top (e.g. "Math")

Sub-topic cards in scrollable list:
  Math: Arithmetic, Percentages, Ratios, Algebra, Averages, Geometry
  English: Synonyms, Antonyms, Grammar, Sentence Completion, 
           Comprehension, Analogies
  Reasoning: Selection, Sequencing, Blood Relations, 
             Directions, Syllogisms, Combinations

Each card: sub-topic name + progress bar + percentage
Weakest sub-topic: "⚠️ Focus here" amber label

Difficulty selector:
  [Easy]  [Medium]  [Hard]  [Mixed]
  Active difficulty: teal background

[Start Practice →] teal full-width button at bottom.
Bottom navigation.

---

## SCREEN 4 — QUESTION SCREEN (Practice Mode)

Header: TaleemiMarkaz + "NTS Prep"
Mode pill: "📚 Practice Mode"
Topic + sub-topic tag: "Reasoning · Permutations"
Question progress: "Question 4 of 20"
Flag icon 🚩 at TOP RIGHT of question card — not in bottom bar

Question text — large, readable, full width.

4 answer options A/B/C/D — full-width rounded cards.
Two-step selection:
  Step 1: Tap option → highlights with teal outline
  Step 2: Submit Answer activates (greyed until selection made)

Canvas scratch pad below options:
Label: "Scratch pad — work it out below"
Three tabs: [✏️ Draw] [⌨️ Type] [📷 Upload]
  Draw: white canvas, toolbar (thick pen, thin pen, eraser, undo, clear)
  Type: text input area
  Upload: drop zone "Upload photo of your working (JPG/PNG/PDF, max 5MB)"
          Inline error for invalid type or size
Note: "Your work is saved if you navigate away"

Simplified bottom bar:
  Question 1: [Show Solution]  [Submit Answer]  [›]
  Question 2+: [‹]  [Show Solution]  [Submit Answer]  [›]
  ‹ and › are small icon-only arrow buttons
  Submit Answer greyed until option selected
  › always visible — student can skip forward anytime
  ‹ hidden on Q1, visible from Q2 onwards

---

## SCREEN 5 — QUESTION SCREEN (Mock Test Mode)

Header: TaleemiMarkaz + "NTS Prep"
Mode pill: "⏱️ NAT-I Mock Test" in amber
Timer top right — colour changes by time remaining:
  30:00 → 6:00: teal (#0D9488)
  5:59 → 1:01: amber (#D97706) — timer slightly larger
  1:00 → 0:00: red (#DC2626) — timer larger still
Score: "+18.25" and "NEG: -0.25/wrong" in amber card
Flag 🚩 at top right of question card

Same question layout as Practice mode BUT:
  NO "Show Solution" button
  Bottom bar: [‹]  [Submit Answer]  [›]
  Canvas scratch pad still available (Draw/Type/Upload)
  Canvas work persists across navigation

---

## SCREEN 6 — SOLUTION SCREEN — VARIANT A (Wrong Answer)

Header: TaleemiMarkaz + "NTS Prep"
Mode pill: "📚 Practice Mode"

Result banner: "Not quite — let's see why" — neutral/amber, never red
"You selected B (21) — Correct answer is C (15)"

If canvas working submitted — "YOUR WORKING" section:
  Display submitted canvas image or typed text
  ⚠️ marker on exact wrong step
  Plain language: "You went wrong here — you multiplied 
  instead of dividing in this step"

Method tabs — active state clear:
  [✓ Method 1: Count] [Method 2: Formula] [Method 3: Visual]
  Active tab: teal background, white text
  Inactive: white background, grey text, grey border
  Method 1 always default active with ✓

FULL SOLUTION — all steps visible immediately, nothing hidden.
Each step uses this exact visual structure:
  [Large teal circle — step number]  [Bold step title]
  Plain language explanation paragraph
  Boxed/shaded working area
  💡 "Why this step?" expandable note

--- METHOD 1: COUNTING ---

STEP 1 — Read the question carefully
"We have 7 people: let's call them A, B, C, D, E, F, G.
We need to pick exactly 5 of them to form a committee.
The question is: how many different groups of 5 can we make?"
[Boxed: 7 people available → pick any 5 → how many ways?]
💡 Important: A committee of A,B,C,D,E is exactly the same 
as E,D,C,B,A. ORDER does not matter. Only WHO is in matters.

STEP 2 — A smart trick to make this easier
"Picking 5 people IN is the same as deciding which 2 people 
to leave OUT. Think about it: if we have 7 people and pick 5, 
exactly 2 are always left out. So instead of asking 'how many 
ways to pick 5?' we ask 'how many ways to pick 2 to leave out?' 
— because 2 is smaller and easier to count."
[Boxed: Picking 5 IN = Leaving 2 OUT. Same question, easier to count.]
💡 Why easier? Counting pairs of 2 gives fewer combinations 
than groups of 5. Always work with the smaller number.

STEP 3 — List every possible pair we could leave out
"Take person A first. Who can A be left out WITH?"
[Boxed table — show every pair with resulting committee:]
Leave out A+B → committee: C, D, E, F, G
Leave out A+C → committee: B, D, E, F, G
Leave out A+D → committee: B, C, E, F, G
Leave out A+E → committee: B, C, D, F, G
Leave out A+F → committee: B, C, D, E, G
Leave out A+G → committee: B, C, D, E, F
→ 6 pairs starting with A

"Now move to B. A+B already counted — only pair B with 
people AFTER B:"
[Boxed:]
Leave out B+C → committee: A, D, E, F, G
Leave out B+D → committee: A, C, E, F, G
Leave out B+E → committee: A, C, D, F, G
Leave out B+F → committee: A, C, D, E, G
Leave out B+G → committee: A, C, D, E, F
→ 5 new pairs

"Continue:"
[Boxed:]
C pairs with D,E,F,G → 4 new pairs
D pairs with E,F,G   → 3 new pairs
E pairs with F,G     → 2 new pairs
F pairs with G       → 1 new pair

💡 Pattern: 6,5,4,3,2,1. Each person has one fewer option 
because we never repeat pairs already counted.

STEP 4 — Add them all up
[Boxed calculation:]
Pairs starting with A:  6
Pairs starting with B:  5
Pairs starting with C:  4
Pairs starting with D:  3
Pairs starting with E:  2
Pairs starting with F:  1
─────────────────────
Total:                 21
✅ Answer: 21 possible committees

STEP 5 — Verify
"We listed every pair starting from A, always moving forward, 
never backward. This means we never repeated and never missed 
any pair. Answer: 21 ✅"

[Bridge card — teal outline:]
🎯 Challenge yourself
On the next similar question, try solving with the formula.
Method 1 is always here if you get stuck.

--- METHOD 2: FORMULA (maps directly onto Method 1) ---

Opening: "Now that you understand WHY the answer is 21 through 
counting, here is the shortcut mathematicians use — especially 
useful when numbers are much larger."

STEP 1 — What does C(7,2) mean?
"In Method 1 we said: picking 5 IN = leaving 2 OUT.
Mathematicians write 'leaving 2 out of 7' as:"
[Boxed: C(7, 2)]
"C = Combination (choosing without caring about order)
7 = total people available
2 = how many we are leaving out
(Always use the SMALLER number)"
💡 Why C(7,2) not C(7,5)? We converted to the smaller 
selection — leaving 2 out — just like Method 1 Step 2.

STEP 2 — Calculate C(7,2)
[Boxed:]
C(7, 2) = (7 × 6) ÷ (2 × 1)
         = 42 ÷ 2
         = 21 ✅
"Why 7×6? First person left out: any of 7. 
Second: any of remaining 6."
"Why divide by 2×1? A+B and B+A are the same pair. 
7×6 counted each pair twice. Dividing by 2 fixes that."

STEP 3 — The general formula
[Boxed:]
C(n, r) = (n × (n-1)) ÷ (r × (r-1) × ... × 1)
n = total available
r = how many to choose (ALWAYS use the smaller number)

Example: picking 5 from 7
→ convert: leaving 2 from 7
→ n=7, r=2
→ C(7,2) = (7×6) ÷ (2×1) = 21 ✅
💡 This formula saved us from listing 21 pairs manually.
For 50 people picking 48, it saves hours.

--- METHOD 3: VISUAL ---
Actual SVG diagram — 7 labelled circles A-G.
Lines connecting each rejected pair.
Groups highlighted.
High contrast colours:
  Dark teal (#0D6B5E) for selected committee members
  Amber (#B45309) for rejected pair
  Dark navy (#1A2F4A) for labels and text
  Black (#111111) borders on all elements
No formula notation. No C(7,x). Pure visual only.

FIXED bottom button (never scrolls, never hidden):
[Try a similar question →] teal full-width

---

## SCREEN 7 — SOLUTION SCREEN — VARIANT B (Correct Answer)

Header: TaleemiMarkaz + "NTS Prep"
Mode pill: "📚 Practice Mode"

Result: "Correct — nice work! 🎉" in teal
"You answered in 47 seconds"

Two options:
  [Explore other methods]     [Next Question →]

If Explore → full solution screen (same as Variant A 
minus wrong working section, student's method auto-selected)
If Next Question → straight to next, no solution shown

---

## SCREEN 8 — PROGRESS SCREEN

Header: TaleemiMarkaz + "NTS Prep"
Toggle: [Practice] [Mock Tests]

PRACTICE TAB:

Score Trend:
  Line chart, score over time
  Toggle tabs: [This Week] [This Month] [All Time]
  Improvement: "+26% this week ↑" in teal

Topic + Sub-topic (merged — no duplication):
  Three accordion sections: English, Math, Reasoning
  Each header: topic name + overall % + colour indicator
    Green >70%, Amber 50-70%, Red <50%
  Expanded: sub-topic progress bars with %
  Weakest: red/amber with "⚠️ Focus here"

Today's Focus (sticky bottom):
  "Practice these today"
  Top 3 weakest sub-topics:
    Each: name + [Start →] teal button

Empty state:
  Encouraging illustration
  "Complete your first practice session to see your progress"
  [Start Practicing →]

MOCK TESTS TAB:

Score trend across mock tests (line chart)
Toggle: [This Week] [This Month] [All Time]
Tests completed, best score, average score
Total negative marks lost
Readiness score gauge (0-100) with guidance text

Sub-topic breakdown (same accordion pattern as Practice):
  Three sections: English, Math, Reasoning
  Sub-topic scores from mock tests
  Weakest: "⚠️ Needs work"
  Guidance card: "Based on your mock tests, focus on:
    1. Algebra (38%)  2. Combinations (42%)  3. Comprehension (51%)"

---

## SCREEN 9 — MOCK TEST SCREEN

Header: TaleemiMarkaz + "NTS Prep — NAT-I Mock Test"
Mode pill: "⏱️ NAT-I Mock Test" amber
Timer: colour changes as per Screen 5 rules
Section tabs: [English] [Math] [Reasoning]
Each section: own 10-question navigator grid

Score: "+18.25"
Negative marking: "−0.25/wrong" in amber card

Navigator grid (10 squares per section):
  ● Teal filled = Answered
  ◻ Teal border, white fill = Current
  ◐ Amber = Flagged
  ○ Grey = Unseen
Legend below grid.

Question text + 4 options below navigator.
Canvas (Draw/Type/Upload) — work persists.
Flag 🚩 at top right of question.
Bottom bar: [‹] [Submit Answer] [›]

Before submit — confirmation overlay:
  "You have 3 flagged questions.
   What would you like to do?"
  [Review Flagged Questions]  [Submit Test Anyway]

On timeout:
  "Time's up! Your test has been submitted automatically."
  → Automatic redirect to Results screen

---

## SCREEN 10 — MOCK TEST RESULTS

Header: TaleemiMarkaz + "NTS Prep"
"Test Complete ✓" in teal

Overall score: "67/100" large and prominent
Comparison: "↑ 5 points from your last test" if applicable

Section breakdown table:
  English:   22/30 (73%)  ████████░░
  Math:      19/30 (63%)  ██████░░░░
  Reasoning: 26/30 (87%)  █████████░

Stats row: Attempted: 28  Skipped: 2  Flagged: 3

Negative marking:
  "−5.25 marks lost (21 wrong × 0.25)"

Attempt history:
  "Test 1: 52 | Test 2: 61 | Test 3: 67 ↑"

Two CTAs:
  [Review All Questions →]
  [Practice Weak Areas →]

---

## SCREEN 11 — PROFILE SCREEN (TWO STATES)

Header: TaleemiMarkaz + "NTS Prep"

STATE A — VIEW MODE (default):
All information read-only.
Student avatar: initial in teal circle + full name
Mobile number (primary — not email)
Optional email if provided
Test countdown: "18 days to NAT-I"
  Never shows negative — if passed: "Schedule your next test"
GOAL: Target score, current tracking, readiness bar
STREAK: 🔥 X days, GitHub-style calendar grid (last 30 days)
TEST DETAILS: Test date, test type, target university
PRACTICE STATS: Questions attempted, solutions viewed, topics covered
MOCK TEST STATS: Tests completed, best score, average, neg marks lost
Single button: [✏️ Edit Profile] teal outline

STATE B — EDIT MODE:
All fields become editable inputs
Active field: teal border highlight
[Save Profile] teal filled  +  [Cancel] grey outline
Unsaved changes warning if navigating away:
  "You have unsaved changes"  [Save] [Discard]

Input validation (inline errors):
  Mobile: Pakistani format required
  Email: valid format if entered
  Test date: no past dates, max 1 year ahead
  Target score: 40-100 only

---

## DESIGN SYSTEM REFERENCE

Accent: #0D9488 (teal)
Warning: #D97706 (amber)
Danger: #DC2626 (red) — timer only, never for wrong answers
Success: #0D9488 (teal) — same as accent
Text primary: #111827
Text secondary: #6B7280
Border: #E5E7EB
Background: #FFFFFF
Card background: #F9FAFB

Diagram colours (high contrast):
  Primary: #0D6B5E (dark teal)
  Highlight: #B45309 (amber)
  Labels: #1A2F4A (dark navy)
  Borders: #111111 (near black)

Font: Nunito (all weights)
Border radius: 12px cards, 8px buttons, 999px pills
Shadow: subtle, 0 1px 3px rgba(0,0,0,0.1)
ENDOFFILE
echo "Done"