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

function getTestDate() {
  try { return localStorage.getItem('student_test_date') || '' } catch { return '' }
}

function daysUntil(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr)
  const today  = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : null
}

function dynamicGoal(daysLeft) {
  if (!daysLeft) return 'Practice 10 questions today'
  const totalQ = 90
  const qPerDay = Math.ceil(totalQ / daysLeft)
  return `Practice ${qPerDay} questions today — ${daysLeft} days to your test`
}

function TopicCard({ topic, total }) {
  const attempted = Math.min(topic.attempted, total)
  const showAccuracy = attempted >= 10

  function barColor(pct) {
    if (!showAccuracy) return 'bg-teal-500'
    if (pct >= 70) return 'bg-green-500'
    if (pct >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const barWidth = showAccuracy ? topic.pct : Math.round((attempted / total) * 100)

  return (
    <Link to={`/practice?topic=${topic.id}`}>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:border-teal-200 hover:bg-teal-50 transition-all cursor-pointer">
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
            <p className="text-xs text-gray-600">
              {attempted} of {total} attempted · {topic.pct}% accuracy
            </p>
          ) : (
            <p className="text-xs text-gray-600">
              {attempted} of {total} questions attempted
            </p>
          )}
        </div>
        <span className="text-gray-300 text-xl">›</span>
      </div>
    </Link>
  )
}

export default function Home() {
  const [mode, setMode]           = useState('practice')
  const [natCategory]             = useState(() => getNatCategory() || 'NAT-IE')
  const [studentName]             = useState(() => getStudentName())

  const testDate = getTestDate()
  const daysLeft = daysUntil(testDate)
  const goal     = dynamicGoal(daysLeft)
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
        <h1 className="text-2xl font-black text-gray-900 mb-1">{greeting}</h1>
        <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mb-5">
          <p className="text-sm font-bold text-teal-800">{goal}</p>
        </div>

        {/* Mode selector */}
        <div className="flex gap-2 mb-5">
          {[
            { id: 'practice', label: '📚 Practice Mode' },
            { id: 'mock',     label: '⏱️ Mock Test'     },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                mode === m.id
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {m.label}
            </button>
          ))}
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

        {/* Mock test */}
        {mode === 'mock' && (
          <div className="pt-2 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Last score: <span className="font-bold text-gray-700">67/90</span>
            </p>
            <Link to="/mock-test">
              <button className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 transition-colors">
                Start Mock Test → 90 MCQs · 120 min
              </button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
