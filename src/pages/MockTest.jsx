import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import Canvas from '../components/Canvas'

const SECTIONS = ['English', 'Math', 'Reasoning']

// Per-section question state: answered/flagged/current/unseen
const INITIAL_STATE = {
  English:   { current: 3, answered: [0, 1, 2], flagged: [5], total: 10 },
  Math:      { current: 0, answered: [],         flagged: [],  total: 10 },
  Reasoning: { current: 0, answered: [],         flagged: [],  total: 10 },
}

const QUESTION = {
  text: 'A committee of 5 people is to be formed from a group of 7 people. How many different committees can be formed?',
  options: [
    { id: 'A', text: '21' },
    { id: 'B', text: '35' },
    { id: 'C', text: '42' },
    { id: 'D', text: '15' },
  ],
}

function Timer({ time = '24:38', state = 'normal' }) {
  const colour = state === 'urgent' ? 'text-red-600' : state === 'warning' ? 'text-amber-600' : 'text-teal-600'
  const size   = state === 'urgent' ? 'text-2xl'     : state === 'warning' ? 'text-xl'        : 'text-lg'
  return <span className={`font-black tabular-nums ${colour} ${size}`}>{time}</span>
}

// Navigator grid — 10 squares
function NavigatorGrid({ sectionData, onNavigate }) {
  const { current, answered, flagged, total } = sectionData
  return (
    <div>
      <div className="grid grid-cols-10 gap-1 mb-2">
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = answered.includes(i)
          const isFlagged  = flagged.includes(i)
          const isCurrent  = i === current
          let cls = 'w-full aspect-square rounded flex items-center justify-center text-[10px] font-black border-2 transition-all cursor-pointer '
          if (isCurrent)       cls += 'border-teal-600 bg-white text-teal-600'
          else if (isFlagged)  cls += 'border-amber-400 bg-amber-100 text-amber-700'
          else if (isAnswered) cls += 'border-teal-600 bg-teal-600 text-white'
          else                 cls += 'border-gray-200 bg-white text-gray-400'
          return (
            <button key={i} className={cls} onClick={() => onNavigate(i)}>
              {i + 1}
            </button>
          )
        })}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {[
          { colour: 'bg-teal-600',   label: 'Answered' },
          { colour: 'bg-white border-2 border-teal-600', label: 'Current' },
          { colour: 'bg-amber-100 border-2 border-amber-400', label: 'Flagged' },
          { colour: 'bg-white border-2 border-gray-200', label: 'Unseen' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1">
            <div className={`w-3.5 h-3.5 rounded ${l.colour}`} />
            <span className="text-[10px] text-gray-500 font-bold">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MockTest() {
  const [activeSection, setActiveSection] = useState('English')
  const [sectionState, setSectionState] = useState(INITIAL_STATE)
  const [selected, setSelected] = useState(null)
  const [flagged, setFlagged] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const current = sectionState[activeSection]

  function handleNavigate(i) {
    setSectionState(s => ({
      ...s,
      [activeSection]: { ...s[activeSection], current: i },
    }))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="mock" />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Score + timer */}
        <div className="flex items-center justify-between mb-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-amber-700">Score</p>
            <p className="text-lg font-black text-amber-700">+18.25</p>
            <p className="text-[10px] font-bold text-amber-500">NEG: −0.25/wrong</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Time left</p>
            <Timer time="24:38" state="normal" />
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-3">
          {SECTIONS.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-1 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                activeSection === s
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Navigator grid */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 mb-4">
          <NavigatorGrid sectionData={current} onNavigate={handleNavigate} />
        </div>

        {/* Question card */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">
              {activeSection} · Q{current.current + 1} of {current.total}
            </span>
            <button
              onClick={() => setFlagged(f => !f)}
              className={`text-lg transition-transform hover:scale-110 ${flagged ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
            >
              🚩
            </button>
          </div>
          <p className="text-base font-semibold text-gray-900 leading-relaxed">
            {QUESTION.text}
          </p>
        </div>

        {/* Options */}
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
                selected === opt.id ? 'border-teal-600 bg-teal-600 text-white' : 'border-gray-300 text-gray-500'
              }`}>{opt.id}</span>
              <span className={`text-base font-semibold ${selected === opt.id ? 'text-teal-700' : 'text-gray-800'}`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        <Canvas />
      </main>

      {/* Action bar */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <div className="flex items-center gap-2">
          <button className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0">
            ‹
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 h-12 rounded-xl border-2 border-teal-600 text-sm font-bold text-teal-600 hover:bg-teal-50 transition-colors"
          >
            Submit Test
          </button>
          <button
            disabled={!selected}
            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
              selected ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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

      {/* Submit confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50 max-w-sm mx-auto">
          <div className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <h3 className="text-lg font-black text-gray-900 mb-1">Submit test?</h3>
            <p className="text-sm text-gray-500 mb-6">
              You have <span className="font-bold text-amber-600">3 flagged questions</span>. What would you like to do?
            </p>
            <div className="space-y-3">
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
