import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'

const TOTAL_QS = 20
const DURATION  = 1800

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function MockTestOverview() {
  const navigate = useNavigate()
  const location = useLocation()
  const state    = location.state || {}

  const topic          = state.topic          || 'English'
  const startTimestamp = state.startTimestamp || Date.now()
  const answers        = state.answers        || {}
  const flags          = state.flags          || []
  const originIdx      = state.originIdx      ?? 0

  const flagsSet      = new Set(flags)
  const answeredCount = Object.keys(answers).length

  const [timerSecs,  setTimerSecs]  = useState(
    () => Math.max(0, DURATION - Math.floor((Date.now() - startTimestamp) / 1000))
  )
  const [showCancel, setShowCancel] = useState(false)

  const timerState  = timerSecs < 60 ? 'urgent' : timerSecs < 300 ? 'warning' : 'normal'
  const timerColour = timerState === 'urgent' ? 'text-red-600' : timerState === 'warning' ? 'text-amber-600' : 'text-[#006D5B]'

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = Math.max(0, DURATION - Math.floor((Date.now() - startTimestamp) / 1000))
      setTimerSecs(remaining)
      if (remaining === 0) {
        clearInterval(id)
        navigate('/mock-test/results', {
          state: { topic, answers, score: Object.keys(answers).length },
        })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [startTimestamp])

  function handleGoBack() {
    navigate('/mock-test/question', {
      state: { topic, startTimestamp, answers, flags, currentIdx: originIdx },
    })
  }

  function handleGoToQuestion(idx) {
    navigate('/mock-test/question', {
      state: {
        topic,
        startTimestamp,
        answers,
        flags,
        currentIdx:   idx,
        fromOverview: true,
        originIdx,
      },
    })
  }

  function handleSubmit() {
    navigate('/mock-test/results', {
      state: { topic, answers, score: answeredCount },
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="mock" />

      <main className="flex-1 px-4 pb-36 overflow-y-auto">
        <div className="pt-2 mb-4">
          <h1 className="text-xl font-black text-gray-900 mb-0.5">Test Overview</h1>
          <p className="text-xs font-bold text-[#005548]">{topic}</p>
        </div>

        {/* Stats + timer */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#F0FAF8] border border-[#99D4CE] rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-[#005548]">Answered</p>
            <p className="text-lg font-black text-[#005548]">{answeredCount} / {TOTAL_QS}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-amber-700">Try Later</p>
            <p className="text-lg font-black text-amber-700">{flags.length}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide mb-0.5">Time left</p>
            {timerSecs > 0 && timerSecs <= 10 ? (
              <p className="text-4xl font-black text-red-600 tabular-nums">{timerSecs}</p>
            ) : (
              <p className={`font-black tabular-nums text-lg ${timerColour}`}>{formatTime(timerSecs)}</p>
            )}
          </div>
        </div>

        {/* Question dots */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
          <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3">
            Questions — tap to navigate
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {Array.from({ length: TOTAL_QS }, (_, i) => {
              const isAnswered = !!answers[i]
              const isFlagged  = flagsSet.has(i)
              let cls = 'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 cursor-pointer transition-all '
              if      (isFlagged)  cls += 'border-amber-400 bg-amber-100 text-amber-700'
              else if (isAnswered) cls += 'border-[#006D5B] bg-[#006D5B] text-white'
              else                 cls += 'border-gray-300 bg-gray-50 text-gray-600'
              return (
                <button key={i} className={cls} onClick={() => handleGoToQuestion(i)}>
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {[
              { cls: 'bg-[#006D5B]',                             label: 'Answered'  },
              { cls: 'bg-amber-100 border-2 border-amber-400',  label: 'Try Later' },
              { cls: 'bg-gray-50 border-2 border-gray-300',     label: 'Unseen'    },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className={`w-3.5 h-3.5 rounded-full ${l.cls}`} />
                <span className="text-[10px] text-gray-700 font-bold">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Test */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl bg-[#006D5B] text-white text-sm font-bold hover:bg-[#005548] transition-colors"
        >
          Submit Test
        </button>

        {/* Cancel Test */}
        <button
          onClick={() => setShowCancel(true)}
          className="w-full mt-3 py-3.5 rounded-xl border-2 bg-red-100 border-red-400 text-red-700 text-sm font-bold hover:bg-red-200 transition-colors"
        >
          Cancel Test
        </button>
      </main>

      {/* Back to exact question */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <button
          onClick={handleGoBack}
          className="w-full py-3.5 rounded-xl border-2 bg-blue-100 border-blue-300 text-gray-900 font-bold text-sm hover:bg-blue-200 transition-colors"
        >
          ← Back to Question {originIdx + 1}
        </button>
      </div>

      <BottomNav />

      {showCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50 max-w-sm mx-auto">
          <div className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <h3 className="text-lg font-black text-gray-900 mb-1">Cancel test?</h3>
            <p className="text-sm text-gray-700 mb-6">Your progress will be lost.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="w-full py-4 rounded-xl bg-[#006D5B] text-white text-sm font-bold hover:bg-[#005548]"
              >
                Keep Testing
              </button>
              <button
                onClick={() => navigate('/mock-test')}
                className="w-full py-4 rounded-xl border-2 border-red-400 bg-red-100 text-red-700 text-sm font-bold hover:bg-red-200"
              >
                Cancel Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
