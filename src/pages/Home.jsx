import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { getNatCategory, getCategoryLabel } from '../utils/natCategory'

const SECTION_TOTALS = { english: 20, math: 20, reasoning: 20, subject: 30 }

const COMMON_TOPICS = [
  { id: 'english',   name: 'English',                icon: '📖', attempted: 17, pct: 68 },
  { id: 'math',      name: 'Quantitative Reasoning', icon: '🔢', attempted: 8,  pct: 32 },
  { id: 'reasoning', name: 'Analytical Reasoning',   icon: '🧩', attempted: 18, pct: 84 },
]

function getStudentName() {
  try { return localStorage.getItem('student_name') || '' } catch { return '' }
}

function TopicCard({ topic, total }) {
  const attempted = Math.min(topic.attempted, total)
  const showAccuracy = attempted >= 10

  function barColor(pct) {
    if (!showAccuracy) return 'bg-[#006D5B]'
    if (pct >= 70) return 'bg-green-500'
    if (pct >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const barWidth = showAccuracy ? topic.pct : Math.round((attempted / total) * 100)

  return (
    <Link to={`/practice?topic=${topic.id}`}>
      <div className="bg-blue-100 border border-blue-300 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-400 hover:bg-blue-200 transition-all cursor-pointer">
        <span className="text-3xl">{topic.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <p className="font-bold text-gray-900">{topic.name}</p>
            {showAccuracy && (
              <p className="text-sm font-bold text-gray-700">{topic.pct}%</p>
            )}
          </div>
          <div className="bg-gray-200 rounded-full h-1.5 mb-1.5">
            <div
              className={`${barColor(topic.pct)} h-1.5 rounded-full transition-all`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
          {showAccuracy ? (
            <p className="text-xs text-gray-700">
              {attempted} of {total} attempted · {topic.pct}% accuracy
            </p>
          ) : (
            <p className="text-xs text-gray-700">
              {attempted} of {total} questions attempted
            </p>
          )}
        </div>
        <span className="text-gray-700 text-xl">›</span>
      </div>
    </Link>
  )
}

export default function Home() {
  const [mode, setMode]           = useState('practice')
  const [natCategory]             = useState(() => getNatCategory() || 'NAT-IE')
  const [studentName]             = useState(() => getStudentName())

  const greeting = studentName ? `Welcome, ${studentName}! 👋` : 'Welcome! 👋'

  const subjectTopic = {
    id: 'subject',
    name: getCategoryLabel(natCategory),
    icon: '🔬',
    attempted: 8,
    pct: 58,
  }

  const allTopics = [...COMMON_TOPICS, subjectTopic]

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pt-4 pb-28">
        <h1 className="text-2xl font-black text-gray-900 mb-5">{greeting}</h1>

        {/* Mode selector */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setMode('practice')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
              mode === 'practice'
                ? 'bg-[#006D5B] text-white border-[#006D5B]'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            📚 Practice Mode
          </button>
          <Link to="/mock-test" className="flex-1">
            <button className="w-full py-3 rounded-xl text-sm font-bold border-2 transition-all bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400">
              ⏱️ Mock Test
            </button>
          </Link>
        </div>

        {/* Practice: topic cards */}
        {mode === 'practice' && (
          <div className="space-y-3">
            {COMMON_TOPICS.map(topic => (
              <TopicCard key={topic.id} topic={topic} total={SECTION_TOTALS[topic.id]} />
            ))}
            <TopicCard topic={subjectTopic} total={SECTION_TOTALS.subject} />
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  )
}
