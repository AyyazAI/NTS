import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { getNatCategory, getCategoryLabel } from '../utils/natCategory'

const ATTEMPTED    = 28
const SKIPPED      = 2
const TOTAL        = 90
const UNATTEMPTED  = TOTAL - ATTEMPTED - SKIPPED

function SectionBar({ name, score, total, pct }) {
  const colour = pct >= 70 ? 'bg-[#006D5B]' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-bold text-gray-700">{name}</span>
        <span className="text-sm font-black text-gray-900">
          {score}/{total} <span className="text-gray-700 font-bold">({pct}%)</span>
        </span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colour} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function MockTestResults() {
  const [natCategory] = useState(() => getNatCategory() || 'NAT-IE')

  const SECTIONS = [
    { name: 'Verbal',                     score: 15, total: 20, pct: 75 },
    { name: 'Analytical Reasoning',       score: 17, total: 20, pct: 85 },
    { name: 'Quantitative Reasoning',     score: 13, total: 20, pct: 65 },
    { name: getCategoryLabel(natCategory), score: 22, total: 30, pct: 73 },
  ]

  const weakestSection = SECTIONS.reduce((min, s) => s.pct < min.pct ? s : min, SECTIONS[0])

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 overflow-y-auto" style={{ paddingBottom: '96px' }}>
        {/* Result header */}
        <div className="text-center py-6">
          <p className="text-[#006D5B] font-black text-lg mb-1">Test Complete ✓</p>
          <p className="text-6xl font-black text-gray-900 leading-none">67</p>
          <p className="text-xl font-bold text-gray-700">/90</p>
          <p className="mt-2 text-sm font-bold text-[#006D5B]">↑ 5 points from your last mock test</p>
        </div>

        {/* Coverage warning — shown if attempted < 60 */}
        {ATTEMPTED < 60 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
            <p className="text-sm font-black text-amber-700 mb-1">⚠️ Low Coverage</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              You attempted <span className="font-black">{ATTEMPTED} of 90</span> questions.
              Unattempted questions score 0 in the real NAT-I exam.
              Try to attempt all 90 in your next mock test.
            </p>
          </div>
        )}

        {/* Section breakdown */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
          <p className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3">Section Breakdown</p>
          {SECTIONS.map(s => <SectionBar key={s.name} {...s} />)}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Attempted',    value: String(ATTEMPTED)   },
            { label: 'Skipped',      value: String(SKIPPED)     },
            { label: 'Unattempted',  value: String(UNATTEMPTED) },
            { label: 'Flagged',      value: '3'                 },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 border border-gray-300 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-gray-900">{s.value}</p>
              <p className="text-[11px] font-bold text-gray-700 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Attempt history */}
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4 mb-4">
          <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Your Progress</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Test 1', score: 52, arrow: '' },
              { label: 'Test 2', score: 61, arrow: '↑' },
              { label: 'Test 3', score: 67, arrow: '↑', current: true },
            ].map((t, i) => (
              <div key={i} className="flex-1 text-center">
                <div className={`rounded-xl py-2.5 ${t.current ? 'bg-[#006D5B]' : 'bg-gray-100 border border-gray-300'}`}>
                  <p className={`text-lg font-black ${t.current ? 'text-white' : 'text-gray-700'}`}>
                    {t.score}
                    {t.arrow && <span className="text-sm text-[#006D5B] ml-0.5">{t.arrow}</span>}
                  </p>
                </div>
                <p className="text-[10px] font-bold text-gray-700 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation — weakest section */}
        <div className="bg-[#F0FAF8] border border-[#99D4CE] rounded-2xl p-4 mb-6">
          <p className="text-xs font-black text-[#005548] uppercase tracking-wider mb-2">Focus Next On</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            📚 <span className="font-black">{weakestSection.name}</span> ({weakestSection.pct}%) — your weakest section today.
          </p>
          <Link to={`/practice?topic=${weakestSection.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <button className="w-full py-3 rounded-xl bg-[#006D5B] text-white text-sm font-bold hover:bg-[#005548] transition-colors">
              Practice {weakestSection.name} →
            </button>
          </Link>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4 pb-4">
          <Link to="/mock-test/review">
            <button className="w-full py-4 rounded-xl bg-[#006D5B] text-white font-bold text-sm hover:bg-[#005548] transition-colors">
              Review All Questions →
            </button>
          </Link>
          <Link to="/practice">
            <button className="w-full py-4 rounded-xl border-2 bg-blue-100 border-blue-300 text-gray-900 font-bold text-sm hover:bg-blue-200 transition-colors">
              Practice Weak Areas →
            </button>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
