import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

const RAW = [
  {
    topic: 'Analytical Reasoning', subtopic: 'Combinations',
    text: 'A committee of 5 people is to be formed from a group of 7 people. How many different committees can be formed?',
    options: [{ id: 'A', text: '21' }, { id: 'B', text: '35' }, { id: 'C', text: '42' }, { id: 'D', text: '15' }],
    correct_option: 'A', student_answer: 'B',
  },
  {
    topic: 'English', subtopic: 'Synonyms',
    text: 'Choose the word closest in meaning to BENEVOLENT.',
    options: [{ id: 'A', text: 'Hostile' }, { id: 'B', text: 'Kind' }, { id: 'C', text: 'Cruel' }, { id: 'D', text: 'Brave' }],
    correct_option: 'B', student_answer: 'B',
  },
  {
    topic: 'Quantitative Reasoning', subtopic: 'Percentages',
    text: 'What is 35% of 420?',
    options: [{ id: 'A', text: '147' }, { id: 'B', text: '152' }, { id: 'C', text: '142' }, { id: 'D', text: '158' }],
    correct_option: 'A', student_answer: 'C',
  },
  {
    topic: 'English', subtopic: 'Antonyms',
    text: 'Choose the word most opposite in meaning to VERBOSE.',
    options: [{ id: 'A', text: 'Talkative' }, { id: 'B', text: 'Concise' }, { id: 'C', text: 'Wordy' }, { id: 'D', text: 'Fluent' }],
    correct_option: 'B', student_answer: null,
  },
  {
    topic: 'Analytical Reasoning', subtopic: 'Sequencing',
    text: 'If the sequence 2, 6, 18, 54 continues at the same rate, what is the next term?',
    options: [{ id: 'A', text: '108' }, { id: 'B', text: '162' }, { id: 'C', text: '216' }, { id: 'D', text: '324' }],
    correct_option: 'B', student_answer: 'B',
  },
]

const QUESTIONS = Array.from({ length: 20 }, (_, i) => ({ ...RAW[i % RAW.length], id: i + 1 }))
const TOTAL = QUESTIONS.length

function optBg(optId, studentAns, correctOpt) {
  if (optId === correctOpt) return 'bg-[#006D5B] border-[#006D5B]'
  if (optId === studentAns) return 'bg-red-50 border-red-400'
  return 'bg-blue-100 border-blue-300'
}

function optText(optId, studentAns, correctOpt) {
  if (optId === correctOpt) return 'text-white'
  if (optId === studentAns) return 'text-red-700'
  return 'text-gray-900'
}

function letterBadge(optId, studentAns, correctOpt) {
  if (optId === correctOpt) return 'border-white bg-white text-[#006D5B]'
  if (optId === studentAns) return 'border-red-400 bg-red-50 text-red-700'
  return 'border-blue-300 text-gray-700'
}

export default function MockTestReview() {
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)
  const q = QUESTIONS[idx]

  const isSkipped = q.student_answer === null
  const isCorrect = !isSkipped && q.student_answer === q.correct_option

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pb-48 overflow-y-auto">
        {/* Back to Results */}
        <div className="mt-3 mb-4">
          <button
            onClick={() => navigate('/mock-test/results')}
            className="flex items-center gap-1.5 text-sm font-bold text-gray-900 bg-blue-100 border-2 border-blue-300 px-3 py-2 rounded-xl hover:bg-blue-200 transition-colors"
          >
            ‹ Back to Results
          </button>
        </div>

        {/* Topic + Q counter */}
        <div className="mb-3">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            {q.topic} · {q.subtopic}
          </p>
          <p className="text-xs font-bold text-gray-700 mt-0.5">
            Question {q.id} of {TOTAL} — Test Review
          </p>
        </div>

        {/* Status banner */}
        {isSkipped ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-3">
            <p className="text-xs font-bold text-amber-700">⚠️ You skipped this question</p>
          </div>
        ) : isCorrect ? (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 mb-3">
            <p className="text-xs font-bold text-green-700">✓ Correct — well done!</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-3">
            <p className="text-xs font-bold text-red-700">
              ✗ You chose {q.student_answer} — correct answer is {q.correct_option}
            </p>
          </div>
        )}

        {/* Question card */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
          <p className="text-base font-semibold text-gray-900 leading-relaxed">{q.text}</p>
        </div>

        {/* Answer options — readonly, colour-coded */}
        <div className="space-y-2.5">
          {q.options.map(opt => (
            <div
              key={opt.id}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 ${optBg(opt.id, q.student_answer, q.correct_option)}`}
            >
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 ${letterBadge(opt.id, q.student_answer, q.correct_option)}`}>
                {opt.id}
              </span>
              <span className={`text-base font-semibold ${optText(opt.id, q.student_answer, q.correct_option)}`}>
                {opt.text}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Action bar: ‹ | Show Solution | › */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 text-lg font-bold flex-shrink-0 transition-colors ${
              idx === 0
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'bg-blue-100 border-blue-300 text-gray-700 hover:bg-blue-200'
            }`}
          >
            ‹
          </button>
          <button
            onClick={() => navigate('/solution', { state: { readonly: true, fromReview: true, correctAnswer: q.correct_option } })}
            className="flex-1 h-12 rounded-xl border-2 text-sm font-bold bg-[#006D5B] border-[#006D5B] text-white hover:bg-[#005548] transition-colors"
          >
            Show Solution →
          </button>
          <button
            onClick={() => setIdx(i => Math.min(TOTAL - 1, i + 1))}
            disabled={idx === TOTAL - 1}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 text-lg font-bold flex-shrink-0 transition-colors ${
              idx === TOTAL - 1
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'bg-blue-100 border-blue-300 text-gray-700 hover:bg-blue-200'
            }`}
          >
            ›
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
