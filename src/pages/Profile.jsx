import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import {
  NAT_CATEGORIES,
  getNatCategory,
  setNatCategory as saveCategory,
  getCategoryLabel,
} from '../utils/natCategory'

const STREAK_DAYS = (() => {
  const active = [0,1,2,3,5,6,7,8,9,12,13,14,15,16,19,20,21,22,23,26,27,28]
  return Array.from({ length: 30 }, (_, i) => active.includes(i))
})()

function StreakCalendar() {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
      {STREAK_DAYS.map((active, i) => (
        <div key={i} className={`aspect-square rounded ${active ? 'bg-teal-500' : 'bg-gray-100'}`} />
      ))}
    </div>
  )
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-black text-gray-900">{value}</span>
    </div>
  )
}

// 6-card category selector used in both onboarding and edit mode
function CategorySelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {NAT_CATEGORIES.map(cat => {
        const selected = value === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`relative text-left p-3 rounded-xl border-2 transition-all ${
              selected ? 'border-teal-600 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {selected && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center text-white text-[9px] font-black">✓</span>
            )}
            <p className={`text-[10px] font-black mb-0.5 ${selected ? 'text-teal-600' : 'text-gray-700'}`}>{cat.id}</p>
            <p className={`text-xs font-bold leading-tight ${selected ? 'text-teal-800' : 'text-gray-700'}`}>{cat.label}</p>
          </button>
        )
      })}
    </div>
  )
}

function ViewMode({ natCategory, onEdit }) {
  return (
    <div className="space-y-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 pt-2 pb-4 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
          H
        </div>
        <div>
          <p className="text-xl font-black text-gray-900">Hamza Ahmed</p>
          <p className="text-sm text-gray-500 mt-0.5">0312-3456789</p>
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
        <p className="text-3xl font-black text-teal-700">18</p>
        <p className="text-sm font-bold text-teal-600">days to NAT-I</p>
        <p className="text-xs text-gray-500 mt-1">Test date: 12 Jul 2026</p>
      </div>

      {/* Goal tracker */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Goal Tracker</p>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-600">Target score</span>
          <span className="font-black text-gray-900">75/90</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
          <div className="h-full bg-teal-500 rounded-full" style={{ width: '74%' }} />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Current avg: 67</span>
          <span>Target: 75</span>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wider">Streak</p>
          <span className="font-black text-gray-800">🔥 7 days</span>
        </div>
        <StreakCalendar />
        <p className="text-xs text-gray-600 mt-2">Last 30 days</p>
      </div>

      {/* Test details — includes NAT-I category */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Test Details</p>
        <StatRow label="Test date"        value="12 Jul 2026" />
        <StatRow label="Category"         value={getCategoryLabel(natCategory)} />
        <StatRow label="Target university" value="LUMS" />
      </div>

      <button
        onClick={onEdit}
        className="w-full py-3.5 rounded-xl border-2 border-teal-600 text-teal-700 font-bold text-sm hover:bg-teal-50 transition-colors"
      >
        ✏️ Edit Profile
      </button>
    </div>
  )
}

function EditMode({ initialCategory, onCancel }) {
  const [name,        setName]        = useState('Hamza Ahmed')
  const [mobile,      setMobile]      = useState('0312-3456789')
  const [email,       setEmail]       = useState('')
  const [testDate,    setTestDate]    = useState('2026-07-12')
  const [university,  setUniversity]  = useState('LUMS')
  const [targetScore, setTargetScore] = useState(75)
  const [reminders,   setReminders]   = useState(true)
  const [category,    setCategory]    = useState(initialCategory)
  const [dirty,       setDirty]       = useState(false)

  const mobileValid   = /^03\d{9}$/.test(mobile.replace(/-/g, ''))
  const scoreValid    = targetScore >= 40 && targetScore <= 90
  const categoryChanged = category !== initialCategory

  function mark() { setDirty(true) }
  function handleCategoryChange(id) { setCategory(id); mark() }

  return (
    <div className="space-y-4">
      {/* Edit badge */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-black">
          H
        </div>
        <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
          Editing
        </span>
      </div>

      {/* Unsaved warning */}
      {dirty && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <p className="text-xs font-bold text-amber-700">You have unsaved changes</p>
          <div className="flex gap-2">
            <button onClick={onCancel} className="text-xs font-bold text-gray-500 px-2 py-1">Discard</button>
            <button className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded-lg">Save</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Full Name</label>
          <input
            value={name}
            onChange={e => { setName(e.target.value); mark() }}
            className="w-full border-2 border-gray-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Mobile Number</label>
          <input
            value={mobile}
            onChange={e => { setMobile(e.target.value); mark() }}
            placeholder="03XX-XXXXXXX"
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors ${
              mobile && !mobileValid ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-teal-600'
            }`}
          />
          {mobile && !mobileValid && (
            <p className="text-xs text-red-500 mt-1 font-bold">Use format: 03XXXXXXXXX</p>
          )}
        </div>

        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Email (optional)</label>
          <input
            value={email}
            onChange={e => { setEmail(e.target.value); mark() }}
            placeholder="you@example.com"
            type="email"
            className="w-full border-2 border-gray-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Test Date</label>
          <input
            value={testDate}
            onChange={e => { setTestDate(e.target.value); mark() }}
            type="date"
            className="w-full border-2 border-gray-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">Target University</label>
          <input
            value={university}
            onChange={e => { setUniversity(e.target.value); mark() }}
            className="w-full border-2 border-gray-200 focus:border-teal-600 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-colors"
          />
        </div>

        {/* NAT-I Category selector */}
        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">NAT-I Category</label>
          <CategorySelector value={category} onChange={handleCategoryChange} />
          {categoryChanged && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-2 font-bold">
              ⚠️ This will update your subject section across practice and mock tests
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">
            Target Score: {targetScore}/90
          </label>
          <input
            value={targetScore}
            onChange={e => { setTargetScore(Number(e.target.value)); mark() }}
            type="range" min={40} max={90} step={1}
            className="w-full accent-teal-600"
          />
          {!scoreValid && (
            <p className="text-xs text-red-500 mt-1 font-bold">Score must be between 40 and 90</p>
          )}
        </div>

        {/* Streak reminders */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <div>
            <p className="text-sm font-bold text-gray-800">Streak reminders</p>
            <p className="text-xs text-gray-600">Daily notification to keep your streak</p>
          </div>
          <button
            onClick={() => { setReminders(r => !r); mark() }}
            className={`w-12 h-6 rounded-full transition-colors relative ${reminders ? 'bg-teal-600' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${reminders ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-3 pt-2 pb-2">
        <button
          onClick={onCancel}
          className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!mobileValid || !scoreValid}
          onClick={() => { if (categoryChanged) saveCategory(category) }}
          className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-colors ${
            mobileValid && scoreValid
              ? 'bg-teal-600 text-white hover:bg-teal-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save Profile
        </button>
      </div>
    </div>
  )
}

export default function Profile() {
  const [editing,     setEditing]     = useState(false)
  const [natCategory, setNatCategory] = useState(() => getNatCategory() || 'NAT-IE')

  function handleSave() {
    // Re-read from localStorage after EditMode may have called saveCategory()
    setNatCategory(getNatCategory() || 'NAT-IE')
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        {editing
          ? <EditMode initialCategory={natCategory} onCancel={handleSave} />
          : <ViewMode natCategory={natCategory} onEdit={() => setEditing(true)} />
        }
      </main>

      <BottomNav />
    </div>
  )
}
