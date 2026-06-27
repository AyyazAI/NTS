import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import RoughWork from '../components/RoughWork'
import { getNatCategory, getCategoryLabel, getCategoryShort } from '../utils/natCategory'

const SECTION_KEYS = ['Verbal', 'Analytical', 'Quantitative', 'Subject']

const SECTION_TOTALS = { Verbal: 20, Analytical: 20, Quantitative: 20, Subject: 30 }

const INITIAL_STATE = {
  Verbal:       { current: 3, answered: [0, 1, 2], flagged: [5], total: 20 },
  Analytical:   { current: 0, answered: [],         flagged: [],  total: 20 },
  Quantitative: { current: 0, answered: [],         flagged: [],  total: 20 },
  Subject:      { current: 0, answered: [],         flagged: [],  total: 30 },
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

const TOTAL_QUESTIONS = 90

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function Timer({ secs }) {
  const state  = secs < 300 ? 'urgent' : secs < 600 ? 'warning' : 'normal'
  const colour = state === 'urgent' ? 'text-red-600' : state === 'warning' ? 'text-amber-600' : 'text-teal-600'
  const size   = state === 'urgent' ? 'text-2xl'     : state === 'warning' ? 'text-xl'        : 'text-lg'
  return <span className={`font-black tabular-nums ${colour} ${size}`}>{formatTime(secs)}</span>
}

function NavigatorGrid({ sectionData, onNavigate }) {
  const { current, answered, flagged, total } = sectionData
  const cols = 10
  return (
    <div>
      <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = answered.includes(i)
          const isFlagged  = flagged.includes(i)
          const isCurrent  = i === current
          let cls = 'w-full aspect-square rounded flex items-center justify-center text-[9px] font-black border-2 transition-all cursor-pointer '
          if (isCurrent)       cls += 'border-teal-600 bg-white text-teal-600'
          else if (isFlagged)  cls += 'border-amber-400 bg-amber-100 text-amber-700'
          else if (isAnswered) cls += 'border-teal-600 bg-teal-600 text-white'
          else                 cls += 'border-gray-300 bg-gray-50 text-gray-600'
          return (
            <button key={i} className={cls} onClick={() => onNavigate(i)}>
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {[
          { colour: 'bg-teal-600',                            label: 'Answered' },
          { colour: 'bg-white border-2 border-teal-600',      label: 'Current'  },
          { colour: 'bg-amber-100 border-2 border-amber-400', label: 'Flagged'  },
          { colour: 'bg-gray-50 border-2 border-gray-300',     label: 'Unseen'   },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1">
            <div className={`w-3.5 h-3.5 rounded ${l.colour}`} />
            <span className="text-[10px] text-gray-700 font-bold">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MockTest() {
  const [natCategory]      = useState(() => getNatCategory() || 'NAT-IE')
  const [activeSection,    setActiveSection]    = useState('Verbal')
  const [sectionState,     setSectionState]     = useState(INITIAL_STATE)
  const [selected,         setSelected]         = useState(null)
  const [showConfirm,      setShowConfirm]      = useState(false)
  const [timerSecs,        setTimerSecs]        = useState(7200)
  const [allAnsweredToast, setAllAnsweredToast] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTimerSecs(s => {
      if (s <= 0) { clearInterval(id); return 0 }
      return s - 1
    }), 1000)
    return () => clearInterval(id)
  }, [])

  const currentIdx     = sectionState[activeSection].current
  const isFlagged      = sectionState[activeSection].flagged.includes(currentIdx)
  const current        = sectionState[activeSection]
  const subjectLabel   = getCategoryLabel(natCategory)
  const subjectShort   = getCategoryShort(natCategory)
  const totalAnswered  = Object.values(sectionState).reduce((sum, s) => sum + s.answered.length, 0)

  function handleFlag() {
    setSectionState(s => {
      const sec        = s[activeSection]
      const wasFlagged = sec.flagged.includes(currentIdx)
      return {
        ...s,
        [activeSection]: {
          ...sec,
          flagged: wasFlagged
            ? sec.flagged.filter(i => i !== currentIdx)
            : [...sec.flagged, currentIdx],
        },
      }
    })
  }

  function sectionDisplayLabel(key) {
    if (key === 'Verbal')       return 'English'
    if (key === 'Analytical')   return 'Reasoning'
    if (key === 'Quantitative') return 'Quant'
    return subjectShort
  }

  function handleNavigate(i) {
    setSectionState(s => ({
      ...s,
      [activeSection]: { ...s[activeSection], current: i },
    }))
  }

  function handleSubmitAnswer() {
    if (!selected) return
    const sec = sectionState[activeSection]
    const newAnswered = sec.answered.includes(sec.current)
      ? sec.answered
      : [...sec.answered, sec.current]
    const nextCurrent = sec.current + 1 < sec.total ? sec.current + 1 : sec.current
    const newState = {
      ...sectionState,
      [activeSection]: { ...sec, answered: newAnswered, current: nextCurrent },
    }
    setSectionState(newState)
    setSelected(null)
    const answered = Object.values(newState).reduce((sum, s) => sum + s.answered.length, 0)
    if (answered >= TOTAL_QUESTIONS) {
      setAllAnsweredToast(true)
      setTimeout(() => setAllAnsweredToast(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="mock" />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Answered count + timer */}
        <div className="flex items-center justify-between mb-3">
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-teal-700">Answered</p>
            <p className="text-lg font-black text-teal-700">{totalAnswered} / {TOTAL_QUESTIONS}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide mb-0.5">Time left</p>
            <Timer secs={timerSecs} />
            <p className="text-[10px] text-gray-700">of 120 min</p>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
          {SECTION_KEYS.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                activeSection === s
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-gray-100'
              }`}
            >
              {sectionDisplayLabel(s)}
            </button>
          ))}
        </div>

        {/* Section info */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-700">
            {activeSection === 'Subject' ? subjectLabel : activeSection} · {SECTION_TOTALS[activeSection]} MCQs
          </span>
          <span className="text-xs font-bold text-gray-700">
            Q{current.current + 1} of {current.total}
          </span>
        </div>

        {/* Navigator grid */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-3 mb-4">
          <NavigatorGrid sectionData={current} onNavigate={handleNavigate} />
        </div>

        {/* Question card */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4 relative">
          <button
            onClick={handleFlag}
            title={isFlagged ? 'Flagged' : 'Flag for later'}
            className={`absolute top-3 right-3 flex items-center gap-0.5 transition-all hover:scale-110 ${
              isFlagged ? 'text-orange-500' : 'text-gray-700 hover:text-gray-800'
            }`}
          >
            <span className="text-xl font-bold leading-none">{isFlagged ? '⚑' : '⚐'}</span>
            <span className="text-[9px] font-bold leading-none">Flag</span>
          </button>
          <p className="text-base font-semibold text-gray-900 leading-relaxed pr-12">
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
                  ? 'bg-teal-600 border-teal-600'
                  : 'bg-blue-100 border-blue-300 hover:border-blue-400'
              }`}
            >
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                selected === opt.id ? 'border-white bg-white text-teal-700' : 'border-blue-300 text-gray-700'
              }`}>{opt.id}</span>
              <span className={`text-base font-semibold ${selected === opt.id ? 'text-white' : 'text-gray-900'}`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        {/* Rough work area */}
        <div className="mb-4">
          <RoughWork isMock={true} />
        </div>

        {/* Submit Test — in scrollable area, not persistent bar */}
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-3.5 rounded-xl border-2 border-teal-600 text-sm font-bold text-teal-600 hover:bg-teal-50 transition-colors"
        >
          Submit Test
        </button>
      </main>

      {/* Action bar — Submit Answer wired to record + advance */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigate(Math.max(0, currentIdx - 1))}
            className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0"
          >
            ‹
          </button>
          <button
            disabled={!selected}
            onClick={handleSubmitAnswer}
            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
              selected ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
          <button
            onClick={() => handleNavigate(Math.min(current.total - 1, currentIdx + 1))}
            className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0"
          >
            ›
          </button>
        </div>
      </div>

      <BottomNav />

      {/* All answered toast */}
      {allAnsweredToast && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 max-w-xs w-full z-40 px-4">
          <div className="bg-teal-700 text-white rounded-2xl px-4 py-3 shadow-lg">
            <p className="text-xs font-bold leading-snug">
              You've answered all questions — ready to submit? 🎉
            </p>
          </div>
        </div>
      )}

      {/* Submit confirmation */}
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
                className="text-sm font-bold text-gray-700 hover:text-gray-900 text-center w-full py-2"
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
