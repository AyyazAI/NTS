import { useLocation, useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import MethodTabs from '../components/MethodTabs'
import { Method1, Method2, VisualMethod } from './SolutionWrong'

const CORRECT_OPTION = 'A'
const CORRECT_TEXT   = '21'

function getCanvasTab() {
  try { return localStorage.getItem('canvas_last_tab') || null } catch { return null }
}

function YourWorking({ canvasTab }) {
  if (!canvasTab) return null
  return (
    <div className="bg-[#F0FAF8] border border-[#99D4CE] rounded-2xl p-4 mb-5">
      <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Your working</p>
      {canvasTab === 'draw' && (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl h-20 flex items-center justify-center">
          <span className="text-xs text-gray-700 italic">Your drawing</span>
        </div>
      )}
      {canvasTab === 'type' && (
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-sm text-gray-700 font-mono">Your typed notes</p>
        </div>
      )}
    </div>
  )
}

function ResultPanel({ correct }) {
  if (correct === undefined) return null
  if (correct) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
        <p className="font-black text-green-700 text-lg mb-1">Correct! 🎉</p>
        <p className="text-sm text-green-700">Well done — see the full solution below</p>
      </div>
    )
  }
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
      <p className="font-black text-amber-700 text-lg mb-1">Not quite 🤔</p>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className="bg-white border border-amber-300 rounded-lg px-3 py-1.5 font-bold text-sm text-gray-700">
          Correct answer:
        </span>
        <span className="inline-flex items-center gap-1.5 bg-[#006D5B] text-white rounded-xl px-3 py-1.5 font-bold text-sm">
          <span className="w-5 h-5 rounded-full bg-white text-[#005548] flex items-center justify-center text-xs font-black">
            {CORRECT_OPTION}
          </span>
          {CORRECT_TEXT}
        </span>
      </div>
    </div>
  )
}

export default function Solution() {
  const location  = useLocation()
  const canvasTab = getCanvasTab()
  const navigate  = useNavigate()
  const correct     = location.state?.correct
  const fromReview  = location.state?.fromReview

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      {!fromReview && <ModeIndicator mode="practice" />}

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {fromReview && (
          <p className="text-lg font-black text-gray-900 mt-4 mb-3">Solution</p>
        )}
        {/* Result panel — only shown when arriving via Submit Answer */}
        <ResultPanel correct={correct} />

        {/* Correct answer card */}
        <div className="bg-[#F0FAF8] border border-[#99D4CE] rounded-2xl p-4 mb-4">
          <p className="text-xs font-black text-[#005548] uppercase tracking-wider mb-2">Correct answer</p>
          <span className="inline-flex items-center gap-2 bg-[#006D5B] text-white rounded-xl px-3 py-1.5 font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-white text-[#005548] flex items-center justify-center text-xs font-black">
              {CORRECT_OPTION}
            </span>
            {CORRECT_TEXT}
          </span>
        </div>

        <YourWorking canvasTab={canvasTab} />

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

      {/* Fixed CTA */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        {fromReview ? (
          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-xl border-2 bg-blue-100 border-blue-300 text-gray-900 font-bold text-sm hover:bg-blue-200 transition-colors"
          >
            ← Back to Review
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-4 rounded-xl border-2 bg-blue-100 border-blue-300 text-gray-900 font-bold text-sm hover:bg-blue-200 transition-colors"
            >
              ← Back to Practice
            </button>
            <Link to="/practice/question" className="flex-1">
              <button className="w-full py-4 rounded-xl bg-[#006D5B] text-white font-bold text-sm hover:bg-[#005548] transition-colors">
                Next Question →
              </button>
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
