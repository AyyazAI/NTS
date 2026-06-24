import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

const SECTIONS = [
  { name: 'Verbal',       score: 15, total: 20, pct: 75 },
  { name: 'Quantitative', score: 13, total: 20, pct: 65 },
  { name: 'Analytical',   score: 17, total: 20, pct: 85 },
]

function SectionBar({ name, score, total, pct }) {
  const colour = pct >= 70 ? 'bg-teal-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-bold text-gray-700">{name}</span>
        <span className="text-sm font-black text-gray-900">{score}/{total} <span className="text-gray-400 font-bold">({pct}%)</span></span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colour} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function MockTestResults() {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        {/* Result header */}
        <div className="text-center py-6">
          <p className="text-teal-600 font-black text-lg mb-1">Test Complete ✓</p>
          <p className="text-6xl font-black text-gray-900 leading-none">67</p>
          <p className="text-xl font-bold text-gray-400">/100</p>
          <p className="mt-2 text-sm font-bold text-teal-600">↑ 5 points from your last test</p>
        </div>

        {/* Section breakdown */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Section Breakdown</p>
          {SECTIONS.map(s => <SectionBar key={s.name} {...s} />)}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Attempted', value: '28' },
            { label: 'Skipped',   value: '2'  },
            { label: 'Flagged',   value: '3'  },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-gray-900">{s.value}</p>
              <p className="text-[11px] font-bold text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Negative marking */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <p className="text-xs font-black text-amber-700 uppercase tracking-wider mb-1">Negative Marking</p>
          <p className="text-lg font-black text-amber-800">−5.25 marks lost</p>
          <p className="text-xs text-amber-600 mt-0.5">21 wrong × 0.25 per wrong answer</p>
        </div>

        {/* Attempt history */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Your Progress</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Test 1', score: 52, arrow: '' },
              { label: 'Test 2', score: 61, arrow: '↑' },
              { label: 'Test 3', score: 67, arrow: '↑', current: true },
            ].map((t, i) => (
              <div key={i} className="flex-1 text-center">
                <div className={`rounded-xl py-2.5 ${t.current ? 'bg-teal-600' : 'bg-white border border-gray-200'}`}>
                  <p className={`text-lg font-black ${t.current ? 'text-white' : 'text-gray-700'}`}>
                    {t.score}
                    {t.arrow && <span className="text-sm text-teal-400 ml-0.5">{t.arrow}</span>}
                  </p>
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link to="/solution/wrong">
            <button className="w-full py-4 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors">
              Review All Questions →
            </button>
          </Link>
          <Link to="/practice">
            <button className="w-full py-4 rounded-xl border-2 border-teal-600 text-teal-700 font-bold text-sm hover:bg-teal-50 transition-colors">
              Practice Weak Areas →
            </button>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
