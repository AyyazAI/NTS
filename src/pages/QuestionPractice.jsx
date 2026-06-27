import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import Canvas from '../components/Canvas'

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
  const navigate   = useNavigate()
  const [selected, setSelected] = useState(null)
  const [flagged,  setFlagged]  = useState(false)
  const [padOpen,  setPadOpen]  = useState(false)

  const isFirst = QUESTION.number === 1

  function handleSubmit() {
    if (!selected) return
    if (selected === QUESTION.correct_option) {
      navigate('/solution/correct')
    } else {
      navigate('/solution/wrong')
    }
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
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4 relative">
          <button
            onClick={() => setFlagged(f => !f)}
            title="Flag this question"
            className={`absolute top-3 right-3 text-xl font-bold leading-none transition-all hover:scale-110 ${
              flagged ? 'text-red-500' : 'text-teal-300 hover:text-teal-500'
            }`}
          >
            ⚑
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

        {/* Scratch pad trigger */}
        <button
          onClick={() => setPadOpen(true)}
          className="w-full py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 hover:border-gray-300 flex items-center justify-center gap-2 transition-colors"
        >
          ✏️ Open scratch pad
        </button>
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        {!selected && (
          <p className="text-xs text-center text-gray-600 mb-1.5">Select an answer above to submit</p>
        )}
        <div className="flex items-center gap-2">
          {/* Back arrow — hidden on Q1 */}
          {!isFirst ? (
            <Link to="/practice">
              <button className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0">
                ‹
              </button>
            </Link>
          ) : (
            <div className="w-10 flex-shrink-0" />
          )}

          {/* Show Solution */}
          <Link to="/solution/wrong" className="flex-1">
            <button className="w-full h-12 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 transition-colors">
              Show Solution
            </button>
          </Link>

          {/* Submit Answer — routes based on correct/wrong */}
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
          <Link to="/practice/question">
            <button className="w-10 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 flex-shrink-0">
              ›
            </button>
          </Link>
        </div>
      </div>

      <BottomNav />

      {/* Scratch pad overlay — always mounted to preserve drawing */}
      <div className={`fixed inset-0 bg-white z-50 flex flex-col max-w-sm mx-auto${padOpen ? '' : ' hidden'}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="text-sm font-bold text-gray-700">Q{QUESTION.number}</span>
          <button
            onClick={() => setPadOpen(false)}
            className="text-sm font-bold text-teal-600 hover:text-teal-700 px-2 py-1"
          >
            Done ✓
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
          <Canvas />
        </div>
      </div>
    </div>
  )
}
