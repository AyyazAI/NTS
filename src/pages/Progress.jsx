import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { getNatCategory, getCategoryLabel, getCategoryName, SUBJECT_SUBTOPICS } from '../utils/natCategory'

// Chart with axis labels, pass mark line, data point values on ALL points
function LineChart({ points, labels = null, colour = '#0D9488' }) {
  const w = 300, h = 130, padL = 36, padR = 22, padT = 22, padB = 24
  const innerW = w - padL - padR
  const innerH = h - padT - padB
  const yMin = 0, yMax = 100

  const xs = points.map((_, i) => padL + (i / Math.max(points.length - 1, 1)) * innerW)
  const toY = v => padT + ((yMax - v) / (yMax - yMin)) * innerH

  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${toY(points[i]).toFixed(1)}`).join(' ')
  const fill = `${path} L${xs[xs.length - 1].toFixed(1)},${(padT + innerH).toFixed(1)} L${xs[0].toFixed(1)},${(padT + innerH).toFixed(1)} Z`

  const passY = toY(50)
  const yTicks = [100, 75]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 130 }}>
      {yTicks.map(pct => {
        const y = toY(pct)
        return (
          <g key={pct}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
            <text x={padL - 4} y={y + 4} fontSize="9" fill="#374151" textAnchor="end" fontWeight="600">{pct}</text>
          </g>
        )
      })}

      <line x1={padL} y1={passY} x2={w - padR} y2={passY}
        stroke="#DC2626" strokeWidth="1" strokeDasharray="3,2" />
      <text x={padL - 4} y={passY + 4} fontSize="9" fill="#DC2626" textAnchor="end" fontWeight="700">Pass</text>

      <path d={fill} fill={colour} fillOpacity="0.08" />
      <path d={path} stroke={colour} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {xs.map((x, i) => {
        const y = toY(points[i])
        const isLast = i === xs.length - 1
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={isLast ? 4 : 3} fill={colour} />
            <text x={x} y={y - 7} fontSize="9" fill={colour} textAnchor="middle" fontWeight="800">
              {points[i]}%
            </text>
          </g>
        )
      })}

      <text
        x={9} y={padT + innerH / 2}
        fontSize="8" fill="#6b7280" textAnchor="middle" fontWeight="600"
        transform={`rotate(-90, 9, ${padT + innerH / 2})`}
      >Score %</text>

      {labels && labels.map((label, i) => (
        <text key={i} x={xs[i]} y={h - 2} fontSize="8" fill="#374151" textAnchor="middle" fontWeight="600">
          {label}
        </text>
      ))}
    </svg>
  )
}

const COMMON_TOPICS = [
  {
    id: 'english',
    name: 'English', overall: 68,
    subs: [
      { name: 'Synonyms',            pct: 82, attempted: 5, total: 6 },
      { name: 'Antonyms',            pct: 74, attempted: 5, total: 6 },
      { name: 'Grammar',             pct: 61, attempted: 4, total: 6 },
      { name: 'Sentence Completion', pct: 55, attempted: 3, total: 5 },
      { name: 'Comprehension',       pct: 48, attempted: 2, total: 5 },
      { name: 'Analogies',           pct: 70, attempted: 4, total: 6 },
    ],
  },
  {
    id: 'math',
    name: 'Quantitative Reasoning', overall: 54,
    subs: [
      { name: 'Arithmetic',  pct: 80, attempted: 4, total: 5 },
      { name: 'Percentages', pct: 66, attempted: 4, total: 6 },
      { name: 'Ratios',      pct: 58, attempted: 3, total: 5 },
      { name: 'Algebra',     pct: 38, attempted: 2, total: 5 },
      { name: 'Averages',    pct: 62, attempted: 4, total: 6 },
      { name: 'Geometry',    pct: 44, attempted: 2, total: 5 },
    ],
  },
  {
    id: 'reasoning',
    name: 'Analytical Reasoning', overall: 72,
    subs: [
      { name: 'Selection',       pct: 85, attempted: 5, total: 6 },
      { name: 'Sequencing',      pct: 78, attempted: 5, total: 6 },
      { name: 'Blood Relations', pct: 70, attempted: 4, total: 6 },
      { name: 'Directions',      pct: 65, attempted: 3, total: 5 },
      { name: 'Syllogisms',      pct: 55, attempted: 3, total: 5 },
      { name: 'Combinations',    pct: 42, attempted: 2, total: 5 },
    ],
  },
]

function barColour(pct)    { return pct >= 70 ? 'bg-teal-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400' }
function headerColour(pct) { return pct >= 70 ? 'text-teal-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500' }

function subFocusLabel(pct) {
  if (pct < 50)  return { text: '⚠️ Focus here', cls: 'text-red-700 bg-red-50 border border-red-200' }
  if (pct < 65)  return { text: '💡 Needs work',  cls: 'text-amber-700 bg-amber-50 border border-amber-200' }
  return null
}

function topicHeaderLabel(overall) {
  if (overall < 50)  return { text: '⚠️ At risk',        cls: 'text-red-700 bg-red-50 border border-red-200' }
  if (overall < 65)  return { text: '💡 Needs attention', cls: 'text-amber-700 bg-amber-50 border border-amber-200' }
  return null
}

function Accordion({ topic }) {
  const [open, setOpen] = useState(false)

  const weakestPct  = Math.min(...topic.subs.map(s => s.pct))
  const weakestName = topic.subs.find(s => s.pct === weakestPct)?.name
  const topicLabel  = topicHeaderLabel(topic.overall)

  return (
    <div className="border border-gray-300 rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-black text-gray-900">{topic.name}</span>
          <span className={`text-sm font-black ${headerColour(topic.overall)}`}>{topic.overall}%</span>
          {topicLabel && (
            <span className={`text-[10px] font-black rounded-full px-1.5 py-0.5 ${topicLabel.cls}`}>
              {topicLabel.text}
            </span>
          )}
        </div>
        <span className="text-gray-700 text-sm ml-2 flex-shrink-0">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-50">
          {topic.subs.map(s => {
            const focusLabel = subFocusLabel(s.pct)
            const isWeakest  = s.name === weakestName

            return (
              <div key={s.name} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-700 font-bold">{s.name}</span>
                    {focusLabel && (
                      <span className={`text-[10px] font-black rounded-full px-1.5 py-0.5 ${focusLabel.cls}`}>
                        {focusLabel.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-[10px] font-bold text-gray-700">
                      {s.attempted}/{s.total} tried
                    </span>
                    <Link to={`/practice?topic=${topic.id}`}>
                      <button className={`text-[10px] font-black rounded-full px-2 py-0.5 transition-colors ${
                        isWeakest
                          ? 'text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100'
                          : 'text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200'
                      }`}>
                        {isWeakest ? 'Start here →' : 'Practice →'}
                      </button>
                    </Link>
                    <span className="text-xs font-black text-gray-600">{s.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${barColour(s.pct)}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const PRACTICE_EMPTY = false  // set true to preview empty state

function PracticeTab({ natCategory }) {
  const [range, setRange] = useState('Week')

  const chartData = {
    Week:  { data: [42, 48, 45, 60, 65, 63, 74], labels: ['Mon 23','Tue 24','Wed 25','Thu 26','Fri 27','Sat 28','Sun 29'] },
    Month: { data: [38, 52, 62, 74],              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
  }

  const subjectSubs  = SUBJECT_SUBTOPICS[natCategory] ?? SUBJECT_SUBTOPICS['NAT-IE']
  const subjectTopic = {
    id: 'subject',
    name:    getCategoryLabel(natCategory),
    overall: Math.round(subjectSubs.reduce((acc, s) => acc + s.pct, 0) / subjectSubs.length),
    subs:    subjectSubs,
  }
  const allTopics = [...COMMON_TOPICS, subjectTopic]

  if (PRACTICE_EMPTY) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl mb-4">📊</span>
        <p className="text-lg font-black text-gray-900 mb-2">No practice data yet</p>
        <p className="text-sm text-gray-700 mb-6 max-w-xs">
          Complete your first practice session to see your score trend and sub-topic breakdown here.
        </p>
        <Link to="/practice">
          <button className="px-8 py-3.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors">
            Start Practicing →
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Score Trend</p>
            <p className="text-teal-600 font-black text-sm">+26% this week ↑</p>
          </div>
          <div className="flex gap-1">
            {['Week', 'Month'].map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  range === r ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-300 text-gray-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <LineChart points={chartData[range].data} labels={chartData[range].labels} />
      </div>

      <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3">Topics & Sub-topics</p>
      {allTopics.map(t => <Accordion key={t.name} topic={t} />)}
    </div>
  )
}

function MockTab() {
  const [range, setRange] = useState('Week')
  const chartData = {
    Week:  { data: [52, 61, 67],     labels: ['Test 1', 'Test 2', 'Test 3'] },
    Month: { data: [45, 52, 61, 67], labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
  }
  return (
    <div>
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Score Trend</p>
            <p className="text-teal-600 font-black text-sm">↑ 15 points across 3 tests</p>
          </div>
          <div className="flex gap-1">
            {['Week', 'Month'].map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  range === r ? 'bg-teal-600 text-white border-teal-600' : 'border-gray-300 text-gray-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <LineChart points={chartData[range].data} labels={chartData[range].labels} colour="#D97706" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Tests Completed',  value: '3'             },
          { label: 'Best Score',       value: '67/90'         },
          { label: 'Average Score',    value: '60/90'         },
          { label: 'Highest Section',  value: 'Analytical Reasoning 85%' },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 border border-gray-300 rounded-xl p-3">
            <p className="text-xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs font-bold text-gray-700 mt-0.5">{s.label}</p>
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
            <p className="text-xs text-gray-700 leading-relaxed">
              Complete more practice sessions to see your personalised readiness analysis.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 pb-6">
        <p className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2">Based on your mock tests, focus on:</p>
        {[
          { rank: 1, name: 'Algebra',       pct: 38 },
          { rank: 2, name: 'Combinations',  pct: 42 },
          { rank: 3, name: 'Comprehension', pct: 51 },
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
  const [activeTab,   setActiveTab]   = useState('practice')
  const [natCategory] = useState(() => getNatCategory() || 'NAT-IE')

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
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
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
