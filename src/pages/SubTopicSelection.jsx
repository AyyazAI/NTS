import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'
import { getNatCategory, getCategoryName, SUBJECT_SUBTOPICS } from '../utils/natCategory'

const SUBTOPICS = {
  english: [
    { name: 'Synonyms',            pct: 80 },
    { name: 'Antonyms',            pct: 60 },
    { name: 'Grammar',             pct: 40 },
    { name: 'Sentence Completion', pct: 20 },
    { name: 'Comprehension',       pct: 70 },
    { name: 'Analogies',           pct: 50 },
  ],
  math: [
    { name: 'Arithmetic',  pct: 70 },
    { name: 'Percentages', pct: 40 },
    { name: 'Ratios',      pct: 20 },
    { name: 'Algebra',     pct: 60 },
    { name: 'Averages',    pct: 80 },
    { name: 'Geometry',    pct: 30 },
  ],
  reasoning: [
    { name: 'Selection',       pct: 90 },
    { name: 'Sequencing',      pct: 70 },
    { name: 'Blood Relations', pct: 80 },
    { name: 'Directions',      pct: 60 },
    { name: 'Syllogisms',      pct: 40 },
    { name: 'Combinations',    pct: 20 },
  ],
}

const TOPIC_LABELS = {
  english:   'English',
  math:      'Quantitative Reasoning',
  reasoning: 'Reasoning',
  subject:   null,
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
  const [difficulty,       setDifficulty]       = useState('Mixed')
  const [selectedSubtopics, setSelectedSubtopics] = useState([])

  const natCategory  = getNatCategory() || 'NAT-IE'
  const categoryName = getCategoryName(natCategory)

  let subtopics, topicLabel
  if (topicId === 'subject') {
    subtopics  = SUBJECT_SUBTOPICS[natCategory] ?? SUBJECT_SUBTOPICS['NAT-IE']
    topicLabel = categoryName
  } else {
    subtopics  = SUBTOPICS[topicId] ?? SUBTOPICS.math
    topicLabel = TOPIC_LABELS[topicId] ?? 'Quantitative Reasoning'
  }

  const weakest = subtopics.reduce((min, s) => (s.pct < min.pct ? s : min), subtopics[0])

  function toggleSubtopic(name) {
    setSelectedSubtopics(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  // Build query string for practice route
  const subtopicParam = selectedSubtopics.length > 0
    ? `&subtopics=${encodeURIComponent(selectedSubtopics.join(','))}`
    : ''
  const startHref = `/practice/question?topic=${topicId}&difficulty=${difficulty}${subtopicParam}`

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="practice" />

      <main className="flex-1 px-4 pb-56">
        {/* Back + breadcrumb */}
        <div className="flex items-center gap-2 mb-1">
          <Link to="/" className="text-2xl text-gray-600 hover:text-gray-800 leading-none">←</Link>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{topicLabel}</span>
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-1">Choose what to practice</h2>
        <p className="text-xs text-gray-600 mb-4">
          {selectedSubtopics.length === 0
            ? 'Tap a sub-topic to focus on it, or start mixed'
            : `${selectedSubtopics.length} selected — tap again to deselect`}
        </p>

        {/* Sub-topic cards — selectable */}
        <div className="space-y-2 mb-6">
          {subtopics.map(sub => {
            const isWeakest  = sub.name === weakest.name
            const isSelected = selectedSubtopics.includes(sub.name)
            return (
              <button
                key={sub.name}
                onClick={() => toggleSubtopic(sub.name)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50'
                    : isWeakest
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-bold ${isSelected ? 'text-teal-800' : 'text-gray-900'}`}>
                      {sub.name}
                    </p>
                    {isWeakest && !isSelected && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        ⚠️ Focus here
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                  <p className={`text-sm font-bold ml-2 shrink-0 ${isSelected ? 'text-teal-700' : 'text-gray-600'}`}>
                    {sub.pct}%
                  </p>
                </div>
                <div className="bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`${isSelected ? 'bg-teal-500' : barColor(sub.pct)} h-1.5 rounded-full transition-all`}
                    style={{ width: `${sub.pct}%` }}
                  />
                </div>
              </button>
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

      {/* Start button */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3 z-20">
        <Link to={startHref}>
          <button className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 transition-colors">
            {selectedSubtopics.length === 0
              ? 'Start Practice — Mixed →'
              : `Practice ${selectedSubtopics.length} topic${selectedSubtopics.length > 1 ? 's' : ''} →`}
          </button>
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}
