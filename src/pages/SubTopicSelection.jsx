import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import { getNatCategory, getCategoryName, SUBJECT_SUBTOPICS } from '../utils/natCategory'

const SUBTOPICS = {
  english: [
    { name: 'Synonyms', pct: 80 },
    { name: 'Antonyms', pct: 60 },
    { name: 'Grammar', pct: 40 },
    { name: 'Sentence Completion', pct: 20 },
    { name: 'Comprehension', pct: 70 },
    { name: 'Analogies', pct: 50 },
  ],
  math: [
    { name: 'Arithmetic', pct: 70 },
    { name: 'Percentages', pct: 40 },
    { name: 'Ratios', pct: 20 },
    { name: 'Algebra', pct: 60 },
    { name: 'Averages', pct: 80 },
    { name: 'Geometry', pct: 30 },
  ],
  reasoning: [
    { name: 'Selection', pct: 90 },
    { name: 'Sequencing', pct: 70 },
    { name: 'Blood Relations', pct: 80 },
    { name: 'Directions', pct: 60 },
    { name: 'Syllogisms', pct: 40 },
    { name: 'Combinations', pct: 20 },
  ],
}

const TOPIC_LABELS = {
  english:   'English',
  math:      'Math',
  reasoning: 'Reasoning',
  subject:   null, // filled dynamically
}

const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Mixed']

function barColor(pct) {
  if (pct >= 70) return 'bg-green-500'
  if (pct >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function SubTopicSelection() {
  const [searchParams] = useSearchParams()
  const topicId = searchParams.get('topic') || 'math'
  const [difficulty, setDifficulty] = useState('Mixed')

  const natCategory = getNatCategory() || 'NAT-IE'
  const categoryName = getCategoryName(natCategory)

  // Resolve subtopics and label based on topicId
  let subtopics, topicLabel
  if (topicId === 'subject') {
    subtopics  = SUBJECT_SUBTOPICS[natCategory] ?? SUBJECT_SUBTOPICS['NAT-IE']
    topicLabel = categoryName
  } else {
    subtopics  = SUBTOPICS[topicId] ?? SUBTOPICS.math
    topicLabel = TOPIC_LABELS[topicId] ?? 'Math'
  }

  const weakest = subtopics.reduce((min, s) => (s.pct < min.pct ? s : min), subtopics[0])

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="practice" />

      <main className="flex-1 px-4 pb-56">
        {/* Back + breadcrumb */}
        <div className="flex items-center gap-2 mb-1">
          <Link to="/" className="text-2xl text-gray-400 hover:text-gray-600 leading-none">←</Link>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{topicLabel}</span>
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-5">Choose what to practice</h2>

        {/* Sub-topic cards */}
        <div className="space-y-2 mb-6">
          {subtopics.map(sub => {
            const isWeakest = sub.name === weakest.name
            return (
              <div
                key={sub.name}
                className={`rounded-xl border p-4 ${
                  isWeakest ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                    {isWeakest && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        ⚠️ Focus here
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-600 ml-2 shrink-0">{sub.pct}%</p>
                </div>
                <div className="bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`${barColor(sub.pct)} h-1.5 rounded-full transition-all`}
                    style={{ width: `${sub.pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Difficulty selector */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Difficulty</p>
          <div className="flex gap-2">
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                  difficulty === d
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Start button — sits above bottom nav */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <Link to="/practice/question">
          <button className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 transition-colors">
            Start Practice →
          </button>
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}
