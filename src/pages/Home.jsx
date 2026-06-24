import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { getNatCategory, getCategoryLabel } from '../utils/natCategory'

const COMMON_TOPICS = [
  { id: 'english',   name: 'English',   icon: '📖', attempted: 17, total: 20, pct: 68 },
  { id: 'math',      name: 'Math',      icon: '🔢', attempted: 8,  total: 20, pct: 32 },
  { id: 'reasoning', name: 'Reasoning', icon: '🧩', attempted: 21, total: 20, pct: 84 },
]

function barColor(pct) {
  if (pct >= 70) return 'bg-green-500'
  if (pct >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function Home() {
  const [mode, setMode] = useState('practice')
  const [natCategory] = useState(() => getNatCategory() || 'NAT-IE')

  const subjectTopic = {
    id: 'subject',
    name: getCategoryLabel(natCategory),
    icon: '🔬',
    attempted: 8,
    total: 30,
    pct: 58,
  }
  const allTopics = [...COMMON_TOPICS, subjectTopic]

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pt-4 pb-28">
        <h1 className="text-2xl font-black text-gray-900 mb-4">
          Assalam-o-Alaikum, Hamza 👋
        </h1>

        {/* Daily goal */}
        <div className="bg-teal-600 rounded-2xl p-4 mb-5 shadow-sm">
          <p className="font-bold text-sm text-white mb-2">Practice 20 questions today</p>
          <div className="bg-white bg-opacity-30 rounded-full h-2 mb-1.5">
            <div className="bg-white h-2 rounded-full" style={{ width: '40%' }} />
          </div>
          <p className="text-xs text-teal-100">8 of 20 done · You're doing great — keep going!</p>
        </div>

        {/* Mode selector */}
        <div className="flex gap-2 mb-5">
          {[
            { id: 'practice', label: '📚 Practice Mode' },
            { id: 'mock', label: '⏱️ Mock Test' },
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
            {allTopics.map(topic => (
              <Link key={topic.id} to={`/practice?topic=${topic.id}`}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:border-teal-200 hover:bg-teal-50 transition-all cursor-pointer">
                  <span className="text-3xl">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-bold text-gray-900">{topic.name}</p>
                      <p className="text-sm font-bold text-gray-700">{topic.pct}%</p>
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 mb-1.5">
                      <div
                        className={`${barColor(topic.pct)} h-1.5 rounded-full`}
                        style={{ width: `${topic.pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {topic.attempted} of {topic.total} questions attempted
                    </p>
                  </div>
                  <span className="text-gray-300 text-xl">›</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mock test */}
        {mode === 'mock' && (
          <div className="pt-2 text-center">
            <p className="text-sm text-gray-400 mb-4">
              Last score: <span className="font-bold text-gray-600">67/100</span>
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
