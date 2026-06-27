import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import RoughWork from '../components/RoughWork'

const QUESTION = {
  number: 1,
  total: 20,
  topic: 'Analytical Reasoning',
  subtopic: 'Combinations',
  correct_option: 'A',
  text: 'A committee of 5 people is to be formed from a group of 7 people. How many different committees can be formed?',
  options: [
    { id: 'A', text: '21' },
    { id: 'B', text: '35' },
    { id: 'C', text: '42' },
    { id: 'D', text: '15' },
  ],
}

export default function QuestionPractice() {
  const navigate        = useNavigate()
  const [selected,  setSelected]  = useState(null)
  const [flagged,   setFlagged]   = useState(false)
  const [showLeave, setShowLeave] = useState(false)
  const [toast,     setToast]     = useState(null)

  const isFirst = QUESTION.number === 1

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])

  function showToastMsg(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  function handleSelectOption(optId) {
    setSelected(optId)
    if (flagged) {
      setFlagged(false)
      showToastMsg('Flag removed — question answered')
    }
  }

  function handleSubmit() {
    if (!selected) return
    navigate('/solution', { state: { correct: selected === QUESTION.correct_option, correctAnswer: QUESTION.correct_option } })
  }

  function handleBack(e) {
    e.preventDefault()
    setShowLeave(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="practice" />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Topic/subtopic + Q counter row with Try Later flag */}
        <div className="mb-3">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            {QUESTION.topic} · {QUESTION.subtopic}
          </p>
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-xs font-bold text-gray-700">
              Question {QUESTION.number} of {QUESTION.total}
            </p>
            <button
              onClick={() => setFlagged(f => !f)}
              title="Mark to revisit later"
              className={`flex items-center gap-0.5 transition-all hover:scale-110 ${
                flagged ? 'text-orange-500' : 'text-gray-700 hover:text-gray-800'
              }`}
            >
              <span className="text-base font-bold leading-none">{flagged ? '⚑' : '⚐'}</span>
              <span className="text-[9px] font-bold leading-none ml-0.5">Try Later</span>
            </button>
          </div>
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
                selected === opt.id
                  ? 'border-white bg-white text-[#005548]'
                  : 'border-blue-300 text-gray-700'
              }`}>
                {opt.id}
              </span>
              <span className={`text-base font-semibold ${
                selected === opt.id ? 'text-white' : 'text-gray-900'
              }`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        {/* Rough work area */}
        <RoughWork isMock={false} questionKey={QUESTION.number} />
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        {!selected && (
          <p className="text-xs text-center text-gray-700 mb-1.5">Select an answer above to submit</p>
        )}
        <div className="flex items-center gap-2">
          {/* Back arrow — hidden on Q1 */}
          {!isFirst ? (
            <button
              onClick={handleBack}
              className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0"
            >
              ‹
            </button>
          ) : (
            <div className="w-10 flex-shrink-0" />
          )}

          {/* Show Solution — solid teal (R8-02) */}
          <button
            onClick={() => navigate('/solution', { state: { fromShowSolution: true } })}
            className="flex-1 h-12 rounded-xl border-2 text-sm font-bold transition-colors bg-[#006D5B] border-[#006D5B] text-white hover:bg-[#005548]"
          >
            Show Solution
          </button>

          {/* Submit Answer */}
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
              selected
                ? 'bg-[#006D5B] text-white hover:bg-[#005548]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>

          {/* Forward arrow */}
          <button
            onClick={() => navigate('/practice/question')}
            className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0"
          >
            ›
          </button>
        </div>
      </div>

      <BottomNav />

      {/* Leave Practice confirmation */}
      {showLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50 max-w-sm mx-auto">
          <div className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <h3 className="text-lg font-black text-gray-900 mb-1">Leave practice?</h3>
            <p className="text-sm text-gray-700 mb-6">Your session progress will be lost.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowLeave(false)}
                className="w-full py-4 rounded-xl bg-[#006D5B] text-white text-sm font-bold hover:bg-[#005548]"
              >
                Stay
              </button>
              <button
                onClick={() => navigate('/practice')}
                className="w-full py-4 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flag auto-remove toast */}
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
