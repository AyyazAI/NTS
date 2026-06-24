import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { getNatCategory, getCategoryName, SUBJECT_SUBTOPICS } from '../utils/natCategory'

function LineChart({ points, colour = '#0D9488' }) {
  const w = 260, h = 64, pad = 4
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2))
  const min = Math.min(...points), max = Math.max(...points)
  const ys = points.map(v => pad + ((max - v) / (max - min || 1)) * (h - pad * 2))
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ')
  const fill = `${path} L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 64 }}>
      <path d={fill} fill={colour} fillOpacity="0.08" />
      <path d={path} stroke={colour} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r={4} fill={colour} />
    </svg>
  )
}

const COMMON_TOPICS = [
  {
    name: 'English', overall: 68,
    subs: [
      { name: 'Synonyms',            pct: 82 },
      { name: 'Antonyms',            pct: 74 },
      { name: 'Grammar',             pct: 61 },
      { name: 'Sentence Completion', pct: 55 },
      { name: 'Comprehension',       pct: 48, weak: true },
      { name: 'Analogies',           pct: 70 },
    ],
  },
  {
    name: 'Math', overall: 54,
    subs: [
      { name: 'Arithmetic',  pct: 80 },
      { name: 'Percentages', pct: 66 },
      { name: 'Ratios',      pct: 58 },
      { name: 'Algebra',     pct: 38, weak: true },
      { name: 'Averages',    pct: 62 },
      { name: 'Geometry',    pct: 44 },
    ],
  },
  {
    name: 'Reasoning', overall: 72,
    subs: [
      { name: 'Selection',      pct: 85 },
      { name: 'Sequencing',     pct: 78 },
      { name: 'Blood Relations',pct: 70 },
      { name: 'Directions',     pct: 65 },
      { name: 'Syllogisms',     pct: 55 },
      { name: 'Combinations',   pct: 42, weak: true },
    ],
  },
]

function barColour(pct)    { return pct >= 70 ? 'bg-teal-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400' }
function headerColour(pct) { return pct >= 70 ? 'text-teal-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500' }

function Accordion({ topic }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-black text-gray-900">{topic.name}</span>
          <span className={`text-sm font-black ${headerColour(topic.overall)}`}>{topic.overall}%</span>
        </div>
        <span className="text-gray-400 text-sm">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-50">
          {topic.subs.map(s => (
            <div key={s.name} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 font-bold">{s.name}</span>
                  {s.weak && (
                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-1.5 py-0.5">
                      ⚠️ Focus here
                    </span>
                  )}
                </div>
                <span className="text-xs font-black text-gray-500">{s.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColour(s.pct)}`} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PracticeTab({ natCategory }) {
  const [range, setRange] = useState('Week')
  const chartData = {
    Week:  [42, 48, 45, 60, 65, 63, 74],
    Month: [35, 40, 45, 52, 55, 58, 62, 65, 68, 70, 67, 74],
    All:   [28, 35, 42, 50, 55, 60, 65, 70, 74],
  }

  // Build subject topic accordion dynamically
  const subjectSubs   = SUBJECT_SUBTOPICS[natCategory] ?? SUBJECT_SUBTOPICS['NAT-IE']
  const minSubjectPct = Math.min(...subjectSubs.map(s => s.pct))
  const subjectTopic  = {
    name:    getCategoryName(natCategory),
    overall: Math.round(subjectSubs.reduce((acc, s) => acc + s.pct, 0) / subjectSubs.length),
    subs:    subjectSubs.map(s => ({ ...s, weak: s.pct === minSubjectPct })),
  }
  const allTopics = [...COMMON_TOPICS, subjectTopic]

  // Today's Focus — 3 common weakest + 1 subject weakest
  const weakestSubject = subjectSubs.reduce((min, s) => s.pct < min.pct ? s : min, subjectSubs[0])
  const focusItems = [
    { name: 'Comprehension', topic: 'English',                    pct: 48 },
    { name: 'Algebra',       topic: 'Math',                       pct: 38 },
    { name: 'Combinations',  topic: 'Reasoning',                  pct: 42 },
    { name: weakestSubject.name, topic: getCategoryName(natCategory), pct: weakestSubject.pct },
  ]

  return (
    <div>
      {/* Score trend */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-wider">Score Trend</p>
            <p className="text-teal-600 font-black text-sm">+26% this week ↑</p>
          </div>
          <div className="flex gap-1">
            {['Week', 'Month', 'All'].map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  range === r ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-200 text-gray-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <LineChart points={chartData[range]} />
      </div>

      {/* All 4 topic accordions */}
      <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Topics & Sub-topics</p>
      {allTopics.map(t => <Accordion key={t.name} topic={t} />)}

      {/* Today's Focus */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mt-2">
        <p className="text-xs font-black text-teal-700 uppercase tracking-wider mb-3">Today's Focus</p>
        {focusItems.map(w => (
          <div key={w.name} className="flex items-center justify-between mb-2.5">
            <div>
              <p className="text-sm font-black text-gray-900">{w.name}</p>
              <p className="text-xs text-gray-500">{w.topic} · {w.pct}%</p>
            </div>
            <Link to={`/practice?topic=${w.topic === getCategoryName(natCategory) ? 'subject' : w.topic.toLowerCase()}`}>
              <button className="px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-colors">
                Start →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function MockTab() {
  const [range, setRange] = useState('Week')
  const chartData = {
    Week:  [52, 61, 67],
    Month: [45, 50, 52, 58, 61, 67],
    All:   [42, 45, 50, 52, 58, 61, 67],
  }
  return (
    <div>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-wider">Score Trend</p>
            <p className="text-teal-600 font-black text-sm">↑ 15 points across 3 tests</p>
          </div>
          <div className="flex gap-1">
            {['Week', 'Month', 'All'].map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  range === r ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-200 text-gray-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <LineChart points={chartData[range]} colour="#D97706" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Tests Completed', value: '3'      },
          { label: 'Best Score',      value: '67/90'  },
          { label: 'Average Score',   value: '60/90'  },
          { label: 'Neg Marks Lost',  value: '−12.5'  },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
            <p className="text-xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs font-bold text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-4">
        <p className="text-xs font-black text-teal-700 uppercase tracking-wider mb-3">Readiness Score</p>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#CCFBF1" strokeWidth="10"/>
              <circle cx="40" cy="40" r="32" fill="none" stroke="#0D9488" strokeWidth="10"
                strokeDasharray={`${(67/90) * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
                strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-black text-teal-700">67</span>
            </div>
          </div>
          <div>
            <p className="font-black text-gray-900 mb-1">Getting there!</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Focus on Algebra and Combinations to push your score above 75.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2">Based on your mock tests, focus on:</p>
        {[
          { rank: 1, name: 'Algebra',      pct: 38 },
          { rank: 2, name: 'Combinations', pct: 42 },
          { rank: 3, name: 'Comprehension',pct: 51 },
        ].map(f => (
          <div key={f.rank} className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-black flex items-center justify-center flex-shrink-0">
              {f.rank}
            </span>
            <span className="text-sm font-bold text-gray-800">{f.name}</span>
            <span className="text-xs font-bold text-amber-600 ml-auto">{f.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Progress() {
  const [tab]          = useState('practice')
  const [activeTab,    setActiveTab]    = useState('practice')
  const [natCategory]  = useState(() => getNatCategory() || 'NAT-IE')

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        <div className="flex gap-2 mt-1 mb-4">
          {[
            { id: 'practice', label: '📚 Practice'   },
            { id: 'mock',     label: '⏱️ Mock Tests' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black border-2 transition-all ${
                activeTab === t.id
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'practice'
          ? <PracticeTab natCategory={natCategory} />
          : <MockTab />
        }
      </main>

      <BottomNav />
    </div>
  )
}
