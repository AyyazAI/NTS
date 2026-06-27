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

  const isFirst = QUESTION.number === 1

  // Warn on browser back / tab close during active session
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])

  function handleSubmit() {
    if (!selected) return
    if (selected === QUESTION.correct_option) {
      navigate('/solution/correct')
    } else {
      navigate('/solution/wrong')
    }
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
        {/* Topic tag + progress */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            {QUESTION.topic} · {QUESTION.subtopic}
          </span>
          <span className="text-xs font-bold text-gray-700">
            Question {QUESTION.number} of {QUESTION.total}
          </span>
        </div>

        {/* Question card */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4 relative">
          <button
            onClick={() => setFlagged(f => !f)}
            title={flagged ? 'Flagged' : 'Flag for later'}
            className={`absolute top-3 right-3 text-xl font-bold leading-none transition-all hover:scale-110 ${
              flagged ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {flagged ? '⚑' : '⚐'}
          </button>

          <p className="text-base font-semibold text-gray-900 leading-relaxed pr-8">
            {QUESTION.text}
          </p>
        </div>

        {/* Answer options */}
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
                selected === opt.id
                  ? 'border-white bg-white text-teal-700'
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
        <RoughWork isMock={false} />
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

          {/* Show Solution — navigates to dedicated solution page */}
          <button
            onClick={() => navigate('/solution/wrong', { state: { fromShowSolution: true } })}
            className="flex-1 h-12 rounded-xl border-2 text-sm font-bold transition-colors border-gray-300 text-gray-700 hover:border-gray-400"
          >
            Show Solution
          </button>

          {/* Submit Answer */}
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
              selected
                ? 'bg-teal-600 text-white hover:bg-teal-700'
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
                className="w-full py-4 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700"
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
    </div>
  )
}
