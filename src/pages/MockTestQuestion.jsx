import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import RoughWork from '../components/RoughWork'

const TOTAL_QS = 20
const DURATION  = 1800 // 30 minutes

const QUESTION = {
  text: 'A committee of 5 people is to be formed from a group of 7 people. How many different committees can be formed?',
  options: [
    { id: 'A', text: '21' },
    { id: 'B', text: '35' },
    { id: 'C', text: '42' },
    { id: 'D', text: '15' },
  ],
}

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function MockTestQuestion() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const state     = location.state || {}

  const topic          = state.topic          || 'English'
  const startTimestamp = state.startTimestamp || Date.now()
  const fromOverview   = state.fromOverview   || false
  const originIdx      = state.originIdx      ?? null

  const [currentIdx, setCurrentIdx] = useState(state.currentIdx ?? 0)
  const [answers,    setAnswers]    = useState(state.answers    || {})
  const [flags,      setFlags]      = useState(() => new Set(state.flags || []))
  const [toast,      setToast]      = useState(null)
  const [timerSecs,  setTimerSecs]  = useState(
    () => Math.max(0, DURATION - Math.floor((Date.now() - startTimestamp) / 1000))
  )
  const shownWarnings = useRef(new Set())

  const selected  = answers[currentIdx] || null
  const isFlagged = flags.has(currentIdx)

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = Math.max(0, DURATION - Math.floor((Date.now() - startTimestamp) / 1000))
      setTimerSecs(remaining)

      const warnAt = [300, 240, 180, 120, 60]
      for (const t of warnAt) {
        if (remaining <= t && !shownWarnings.current.has(t)) {
          shownWarnings.current.add(t)
          const mins = Math.floor(t / 60)
          showToastMsg(`${mins} minute${mins > 1 ? 's' : ''} left`)
        }
      }

      if (remaining === 0) {
        clearInterval(id)
        navigate('/mock-test/results', {
          state: { topic, answers, score: Object.keys(answers).length },
        })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [startTimestamp])

  function showToastMsg(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function handleSelectOption(optId) {
    setAnswers(a => ({ ...a, [currentIdx]: optId }))
  }

  function handleSubmitAnswer() {
    if (!selected) return
    const newAnswers = { ...answers, [currentIdx]: selected }
    const newFlags   = new Set(flags)
    let   flagRemoved = false
    if (newFlags.has(currentIdx)) {
      newFlags.delete(currentIdx)
      flagRemoved = true
    }
    setAnswers(newAnswers)
    setFlags(newFlags)
    if (flagRemoved) showToastMsg('Flag removed — answer recorded')

    if (fromOverview) {
      navigate('/mock-test/overview', {
        state: {
          topic,
          startTimestamp,
          answers:   newAnswers,
          flags:     Array.from(newFlags),
          originIdx: originIdx ?? currentIdx,
        },
      })
    } else if (currentIdx + 1 < TOTAL_QS) {
      setCurrentIdx(i => i + 1)
    }
  }

  function handleFlag() {
    const newFlags = new Set(flags)
    if (newFlags.has(currentIdx)) newFlags.delete(currentIdx)
    else                           newFlags.add(currentIdx)
    setFlags(newFlags)
  }

  function handleGoToOverview() {
    navigate('/mock-test/overview', {
      state: {
        topic,
        startTimestamp,
        answers,
        flags:     Array.from(flags),
        originIdx: currentIdx,
      },
    })
  }

  const timerState  = timerSecs < 60 ? 'urgent' : timerSecs < 300 ? 'warning' : 'normal'
  const timerColour = timerState === 'urgent' ? 'text-red-600' : timerState === 'warning' ? 'text-amber-600' : 'text-[#006D5B]'
  const answeredCount = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="mock" />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Answered + timer */}
        <div className="flex items-center justify-between mb-3">
          <div className="bg-[#F0FAF8] border border-[#99D4CE] rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-[#005548]">Answered</p>
            <p className="text-lg font-black text-[#005548]">{answeredCount} / {TOTAL_QS}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide mb-0.5">Time left</p>
            {timerSecs > 0 && timerSecs <= 10 ? (
              <p className="text-4xl font-black text-red-600 tabular-nums">{timerSecs}</p>
            ) : (
              <p className={`font-black tabular-nums text-lg ${timerColour}`}>{formatTime(timerSecs)}</p>
            )}
            <p className="text-[10px] text-gray-700">of 30 min</p>
          </div>
        </div>

        {/* Topic label */}
        <div className="mb-2">
          <span className="text-xs font-bold text-[#005548] bg-[#F0FAF8] border border-[#99D4CE] rounded-full px-2.5 py-1">
            {topic}
          </span>
        </div>

        {/* Question navigation dots */}
        <div className="flex flex-wrap gap-1 mb-3">
          {Array.from({ length: TOTAL_QS }, (_, i) => {
            const isAnswered = !!answers[i]
            const isFlaggedDot = flags.has(i)
            const isCurrent    = i === currentIdx
            let cls = 'w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black border-2 cursor-pointer transition-all '
            if      (isCurrent)    cls += 'border-[#006D5B] bg-white text-[#006D5B]'
            else if (isFlaggedDot) cls += 'border-amber-400 bg-amber-100 text-amber-700'
            else if (isAnswered)   cls += 'border-[#006D5B] bg-[#006D5B] text-white'
            else                   cls += 'border-gray-300 bg-gray-50 text-gray-600'
            return (
              <button key={i} className={cls} onClick={() => setCurrentIdx(i)}>
                {i + 1}
              </button>
            )
          })}
        </div>

        {/* Q counter + Try Later flag on same row */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-700">Question {currentIdx + 1} of {TOTAL_QS}</p>
          <button
            onClick={handleFlag}
            title="Mark to revisit later"
            className={`flex items-center gap-0.5 transition-all hover:scale-110 ${
              isFlagged ? 'text-orange-500' : 'text-gray-700 hover:text-gray-800'
            }`}
          >
            <span className="text-base font-bold leading-none">{isFlagged ? '⚑' : '⚐'}</span>
            <span className="text-[9px] font-bold leading-none ml-0.5">Try Later</span>
          </button>
        </div>

        {/* Question card */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
          <p className="text-base font-semibold text-gray-900 leading-relaxed">
            {QUESTION.text}
          </p>
        </div>

        {/* Answer options */}
        <div className="space-y-2.5 mb-4">
          {QUESTION.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                selected === opt.id
                  ? 'bg-[#006D5B] border-[#006D5B]'
                  : 'bg-blue-100 border-blue-300 hover:border-blue-400'
              }`}
            >
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${
                selected === opt.id ? 'border-white bg-white text-[#005548]' : 'border-blue-300 text-gray-700'
              }`}>{opt.id}</span>
              <span className={`text-base font-semibold ${selected === opt.id ? 'text-white' : 'text-gray-900'}`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        <RoughWork isMock={true} questionKey={currentIdx} />

        {/* Go to Overview */}
        <button
          onClick={handleGoToOverview}
          className="w-full mt-4 py-3 rounded-xl border-2 border-[#006D5B] text-[#005548] font-bold text-sm hover:bg-[#F0FAF8] transition-colors"
        >
          Go to Overview →
        </button>
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
            className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0"
          >
            ‹
          </button>
          <button
            disabled={!selected}
            onClick={handleSubmitAnswer}
            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
              selected ? 'bg-[#006D5B] text-white hover:bg-[#005548]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
          <button
            onClick={() => setCurrentIdx(i => Math.min(TOTAL_QS - 1, i + 1))}
            className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0"
          >
            ›
          </button>
        </div>
      </div>

      <BottomNav />

      {toast && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 max-w-xs w-full z-40 px-4">
          <div className="bg-gray-900 text-white rounded-2xl px-4 py-3 text-center shadow-lg">
            <p className="text-xs font-bold">{toast}</p>
          </div>
        </div>
      )}
    </div>
  )
}
