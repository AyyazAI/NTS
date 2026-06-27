import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import RoughWork from '../components/RoughWork'
import { getNatCategory, getCategoryLabel } from '../utils/natCategory'

function getSectionLabel(qNum, subjectLabel) {
  if (qNum <= 20) return 'Section 1: Verbal'
  if (qNum <= 40) return 'Section 2: Analytical Reasoning'
  if (qNum <= 60) return 'Section 3: Quantitative Reasoning'
  return `Section 4: ${subjectLabel}`
}

function getSectionInfo(qNum) {
  if (qNum <= 20) return { local: qNum,        sectionTotal: 20 }
  if (qNum <= 40) return { local: qNum - 20,   sectionTotal: 20 }
  if (qNum <= 60) return { local: qNum - 40,   sectionTotal: 20 }
  return { local: qNum - 60, sectionTotal: 30 }
}

const QUESTION = {
  number: 4,
  total: 90,
  topic: 'Analytical Reasoning',
  subtopic: 'Combinations',
  text: 'A committee of 5 people is to be formed from a group of 7 people. How many different committees can be formed?',
  options: [
    { id: 'A', text: '21' },
    { id: 'B', text: '35' },
    { id: 'C', text: '42' },
    { id: 'D', text: '15' },
  ],
}

function Timer({ time = '120:00', state = 'normal' }) {
  const colour =
    state === 'urgent'  ? 'text-red-600'   :
    state === 'warning' ? 'text-amber-600' :
    'text-teal-600'
  const size =
    state === 'urgent'  ? 'text-2xl' :
    state === 'warning' ? 'text-xl'  :
    'text-lg'
  return (
    <span className={`font-black tabular-nums ${colour} ${size}`}>{time}</span>
  )
}

export default function QuestionMockTest() {
  const [selected,    setSelected]    = useState(null)
  const [flagged,     setFlagged]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [natCategory] = useState(() => getNatCategory() || 'NAT-IE')

  const subjectLabel = getCategoryLabel(natCategory)
  const sectionLabel = getSectionLabel(QUESTION.number, subjectLabel)
  const sectionInfo  = getSectionInfo(QUESTION.number)

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="mock" />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Score + timer row */}
        <div className="flex items-center justify-between mb-3">
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-teal-700">Score</p>
            <p className="text-lg font-black text-teal-700">18 / 90</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide mb-0.5">Time left</p>
            <Timer time="120:00" state="normal" />
          </div>
        </div>

        {/* Section label + progress */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-1">
            {sectionLabel}
          </span>
          <span className="text-xs font-bold text-gray-700">
            Q{sectionInfo.local} / {sectionInfo.sectionTotal} · {QUESTION.number} of 90
          </span>
        </div>

        {/* Question card */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4 relative">
          <button
            onClick={() => setFlagged(f => !f)}
            title={flagged ? 'Flagged' : 'Flag for later'}
            className={`absolute top-3 right-3 text-xl font-bold leading-none transition-all hover:scale-110 ${
              flagged ? 'text-orange-500' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {flagged ? '⚑' : '⚐'}
          </button>
          <p className="text-base font-semibold text-gray-900 leading-relaxed pr-8">
            {QUESTION.text}
          </p>
        </div>

        {/* Answer options — no Show Solution in mock mode */}
        <div className="space-y-2.5 mb-4">
          {QUESTION.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                selected === opt.id
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                selected === opt.id
                  ? 'border-teal-600 bg-teal-600 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}>
                {opt.id}
              </span>
              <span className={`text-base font-semibold ${
                selected === opt.id ? 'text-teal-700' : 'text-gray-800'
              }`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        {/* Rough work area */}
        <RoughWork isMock={true} />
      </main>

      {/* Bottom action bar — [‹] [Submit Answer] [›] only, no Submit Test */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <div className="flex items-center gap-2">
          <Link to="/mock-test">
            <button className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0">
              ‹
            </button>
          </Link>

          <button
            disabled={!selected}
            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
              selected
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>

          <button className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0">
            ›
          </button>
        </div>
      </div>

      <BottomNav />

      {/* Submit confirmation overlay */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50 max-w-sm mx-auto">
          <div className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <h3 className="text-lg font-black text-gray-900 mb-1">Submit test?</h3>
            <p className="text-sm text-gray-700 mb-6">
              You have <span className="font-bold text-amber-600">3 flagged questions</span>. What would you like to do?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-4 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Review Flagged Questions
              </button>
              <Link to="/mock-test/results">
                <button className="w-full py-4 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700">
                  Submit Test Anyway
                </button>
              </Link>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-sm font-bold text-gray-500 hover:text-gray-700 text-center w-full py-2"
              >
                Cancel — Continue Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
