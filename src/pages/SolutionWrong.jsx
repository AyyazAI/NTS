import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import MethodTabs from '../components/MethodTabs'

// Individual solution step
function Step({ number, title, explanation, working, tip }) {
  const [tipOpen, setTipOpen] = useState(false)
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-sm mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-gray-900 mb-1.5">{title}</p>
        <p className="text-sm text-gray-700 leading-relaxed mb-2">{explanation}</p>
        {working && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-2 text-sm text-gray-800 font-mono whitespace-pre-wrap leading-relaxed">
            {working}
          </div>
        )}
        {tip && (
          <>
            <button
              onClick={() => setTipOpen(o => !o)}
              className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors"
            >
              💡 {tipOpen ? 'Hide tip' : 'Why this step?'}
            </button>
            {tipOpen && (
              <p className="text-xs text-gray-600 mt-1.5 italic border-l-2 border-teal-300 pl-2 leading-relaxed">
                {tip}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Method 3 — Complete grid of all 21 rejected pairs
function VisualMethod() {
  const rows = [
    { label: 'A paired with', pairs: ['A+B', 'A+C', 'A+D', 'A+E', 'A+F', 'A+G'], count: 6 },
    { label: 'B paired with', pairs: ['B+C', 'B+D', 'B+E', 'B+F', 'B+G'],         count: 5 },
    { label: 'C paired with', pairs: ['C+D', 'C+E', 'C+F', 'C+G'],                count: 4 },
    { label: 'D paired with', pairs: ['D+E', 'D+F', 'D+G'],                        count: 3 },
    { label: 'E paired with', pairs: ['E+F', 'E+G'],                               count: 2 },
    { label: 'F paired with', pairs: ['F+G'],                                       count: 1 },
  ]

  return (
    <div>
      <p className="text-sm font-black text-gray-800 mb-3">
        All 21 possible committees — shown as who's left out
      </p>

      <div className="space-y-2">
        {rows.map(row => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 w-16 flex-shrink-0 leading-tight">
              {row.label}
            </span>
            <div className="flex flex-wrap gap-1 flex-1">
              {row.pairs.map(pair => (
                <span
                  key={pair}
                  className="bg-amber-100 text-amber-900 border border-amber-300 rounded px-1.5 py-0.5 text-[11px] font-black"
                >
                  {pair}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 w-10 text-right flex-shrink-0">
              {row.count} pairs
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-sm font-black text-teal-700">
          Total: 6+5+4+3+2+1 = 21 committees ✅
        </p>
      </div>

      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        Each cell above = one rejected pair = one unique committee.
        Every cell is different. No pair is repeated.
        Count the cells — that is your answer.
      </p>
    </div>
  )
}

// Bridge card shown after Method 1
function BridgeCard() {
  return (
    <div className="border-2 border-teal-600 rounded-xl p-4 mt-2 mb-2">
      <p className="text-sm font-black text-teal-700 mb-1">🎯 Challenge yourself</p>
      <p className="text-sm text-gray-600">
        On the next similar question, try solving with the formula.
        Method 1 is always here if you get stuck.
      </p>
    </div>
  )
}

function Method1() {
  return (
    <div>
      <Step
        number={1}
        title="Read the question carefully"
        explanation="We have 7 people: A, B, C, D, E, F, G. We need to pick exactly 5 to form a committee. The question is: how many different groups of 5 can we make?"
        working="7 people available → pick any 5 → how many ways?"
        tip="A committee of A,B,C,D,E is exactly the same as E,D,C,B,A. ORDER does not matter. Only WHO is in the committee matters."
      />
      <Step
        number={2}
        title="A smart trick to make this easier"
        explanation="Picking 5 people IN is the same as deciding which 2 people to leave OUT. If we have 7 people and pick 5, exactly 2 are always left out. So instead of asking 'how many ways to pick 5?' we ask 'how many ways to pick 2 to leave out?' — because 2 is smaller and easier to count."
        working="Picking 5 IN  =  Leaving 2 OUT\nSame question, easier to count."
        tip="Always work with the smaller number. Counting pairs of 2 gives far fewer combinations than groups of 5."
      />
      <Step
        number={3}
        title="List every possible pair we could leave out"
        explanation="Start with A. Who can A be left out with?"
        working={`Leave out A+B → committee: C, D, E, F, G
Leave out A+C → committee: B, D, E, F, G
Leave out A+D → committee: B, C, E, F, G
Leave out A+E → committee: B, C, D, F, G
Leave out A+F → committee: B, C, D, E, G
Leave out A+G → committee: B, C, D, E, F
→ 6 pairs starting with A

Leave out B+C → committee: A, D, E, F, G
Leave out B+D → committee: A, C, E, F, G
Leave out B+E → committee: A, C, D, F, G
Leave out B+F → committee: A, C, D, E, G
Leave out B+G → committee: A, C, D, E, F
→ 5 new pairs (A+B already counted)

C pairs with D,E,F,G → 4 new pairs
D pairs with E,F,G   → 3 new pairs
E pairs with F,G     → 2 new pairs
F pairs with G       → 1 new pair`}
        tip="Pattern: 6, 5, 4, 3, 2, 1. Each person has one fewer option because we never repeat pairs already counted."
      />
      <Step
        number={4}
        title="Add them all up"
        explanation="Count up all the unique pairs we found:"
        working={`Pairs starting with A:  6
Pairs starting with B:  5
Pairs starting with C:  4
Pairs starting with D:  3
Pairs starting with E:  2
Pairs starting with F:  1
─────────────────────────
Total:                 21

✅ Answer: 21 possible committees`}
      />
      <Step
        number={5}
        title="Verify"
        explanation="We listed every pair starting from A, always moving forward, never backward. This means we never repeated and never missed any pair."
        working="Answer: 21 ✅"
      />
      <BridgeCard />
    </div>
  )
}

function Method2() {
  return (
    <div>
      <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">
        Now that you understand WHY the answer is 21 through counting, here is the shortcut
        mathematicians use — especially useful when numbers are much larger.
      </p>
      <Step
        number={1}
        title="What does C(7, 2) mean?"
        explanation="In Method 1 we said: picking 5 IN = leaving 2 OUT. Mathematicians write 'leaving 2 out of 7' as C(7, 2)."
        working={`C(7, 2)
C = Combination (choosing without caring about order)
7 = total people available
2 = how many we are leaving out
(Always use the SMALLER number)`}
        tip="Why C(7,2) not C(7,5)? We converted to the smaller selection — leaving 2 out — just like Method 1 Step 2."
      />
      <Step
        number={2}
        title="Calculate C(7, 2)"
        explanation="The formula: top number × next number, divided by how many we're choosing × one less."
        working={`C(7, 2) = (7 × 6) ÷ (2 × 1)
         = 42 ÷ 2
         = 21 ✅

Why 7×6?  First person left out: any of 7.
           Second: any of remaining 6.
Why ÷ 2×1? A+B and B+A are the same pair.
           7×6 counted each pair twice.
           Dividing by 2 fixes that.`}
        tip="This maps exactly onto Method 1 Step 3. The 7×6 is the same counting we did — we just skipped writing it all out."
      />
      <Step
        number={3}
        title="The general formula"
        explanation="For any combination problem: C(n, r) where n = total available, r = how many to choose (always use the smaller number)."
        working={`C(n, r) = (n × (n−1) × ... ) ÷ (r × (r−1) × ... × 1)

Our problem: picking 5 from 7
→ convert: leaving 2 from 7
→ n = 7, r = 2
→ C(7, 2) = (7 × 6) ÷ (2 × 1) = 21 ✅

For 50 people picking 48 → C(50, 2) = (50×49)÷2 = 1225
Formula saves hours compared to listing.`}
      />
    </div>
  )
}

export default function SolutionWrong() {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="practice" />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Result banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <p className="font-black text-amber-800 text-lg mb-1">Not quite — let's see why 🤔</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-white border border-amber-300 rounded-lg px-3 py-1.5 font-bold text-gray-500 line-through">
              Your answer: B (35)
            </span>
            <span className="text-amber-600 font-black">→</span>
            <span className="bg-teal-600 text-white rounded-lg px-3 py-1.5 font-bold">
              Correct: A (21)
            </span>
          </div>
        </div>

        {/* Your working section */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Your working</p>
          <div className="bg-white border border-dashed border-gray-300 rounded-xl h-20 flex items-center justify-center relative mb-2">
            <span className="text-xs text-gray-300 italic">Canvas working submitted</span>
            <div className="absolute top-2 right-2 bg-amber-100 border border-amber-300 rounded-lg px-2 py-1 flex items-center gap-1">
              <span className="text-amber-600">⚠️</span>
              <span className="text-xs font-bold text-amber-700">Error here</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            You went wrong here — <span className="font-bold">you multiplied 7 × 5 = 35 instead of using combinations.</span>
          </p>
        </div>

        {/* Methods */}
        <p className="text-sm font-black text-gray-700 mb-3">Three ways to see the solution</p>
        <MethodTabs defaultMethod="count">
          {(active) => (
            <div>
              {active === 'count'   && <Method1 />}
              {active === 'formula' && <Method2 />}
              {active === 'visual'  && <VisualMethod />}
            </div>
          )}
        </MethodTabs>
      </main>

      {/* Fixed CTA — never scrolls */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <Link to="/practice/question">
          <button className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 transition-colors">
            Try a similar question →
          </button>
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}
