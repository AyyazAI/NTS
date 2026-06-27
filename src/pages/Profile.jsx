import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { getNatCategory, getCategoryLabel } from '../utils/natCategory'

const NTS_DATES = [
  { label: 'July 12, 2026',     value: '2026-07-12' },
  { label: 'August 16, 2026',   value: '2026-08-16' },
  { label: 'September 6, 2026', value: '2026-09-06' },
  { label: 'October 4, 2026',   value: '2026-10-04' },
  { label: 'November 1, 2026',  value: '2026-11-01' },
  { label: "I'll decide later", value: '' },
]

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
      <span className="text-sm text-gray-700">{label}</span>
      <span className="text-sm font-black text-gray-900">{value}</span>
    </div>
  )
}

function ViewMode({ natCategory, onEdit }) {
  const storedDate = (() => { try { return localStorage.getItem('student_test_date') || '' } catch { return '' } })()
  let daysLabel = '—', dateDisplay = 'Not set', shortDate = ''
  if (storedDate) {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const target = new Date(storedDate)
    const diff = Math.ceil((target - today) / 86400000)
    daysLabel = diff > 0 ? String(diff) : '0'
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    shortDate = `${MONTHS[target.getMonth()]} ${target.getDate()}`
    dateDisplay = target.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 pt-2 pb-4 border-b border-gray-200">
        <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
          H
        </div>
        <div>
          <p className="text-xl font-black text-gray-900">Hamza Ahmed</p>
          <p className="text-sm text-gray-700 mt-0.5">0312-3456789</p>
        </div>
      </div>

      {/* Countdown — reads from localStorage */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
        <p className="text-3xl font-black text-teal-700">{daysLabel}</p>
        <p className="text-sm font-bold text-teal-600">days to your NAT test{shortDate ? ` (${shortDate})` : ''}</p>
        <p className="text-xs text-gray-700 mt-1">Test date: {dateDisplay}</p>
      </div>

      {/* Goal tracker */}
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4">
        <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3">Goal Tracker</p>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-700">Target score</span>
          <span className="font-black text-gray-900">75/90</span>
        </div>
        <div className="relative h-3 mb-1">
          <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500" style={{ width: '74%' }} />
          </div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-amber-500 rounded-full z-10" style={{ left: '83.3%' }} />
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Current avg: 67</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            Target: 75
          </span>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Streak</p>
          <span className="font-black text-gray-800">🔥 7-day practice streak</span>
        </div>
        <p className="text-xs text-gray-700 mb-3">Practice questions count toward your streak</p>
        <StreakCalendar />
        <p className="text-xs text-gray-700 mt-2">Last 30 days</p>
      </div>

      {/* Test details */}
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-4">
        <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Test Details</p>
        <StatRow label="Test date" value={dateDisplay} />
        <StatRow label="Category"  value={getCategoryLabel(natCategory)} />
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

function EditMode({ initialCategory, onCancel, onSave }) {
  const [name,        setName]        = useState('Hamza Ahmed')
  const [contactType, setContactType] = useState('mobile')
  const [mobile,      setMobile]      = useState('0312-3456789')
  const [email,       setEmail]       = useState('')
  const [testDate,    setTestDate]    = useState(() => {
    try { return localStorage.getItem('student_test_date') || '2026-07-12' } catch { return '2026-07-12' }
  })
  const [targetScore, setTargetScore] = useState(75)
  const [reminders,   setReminders]   = useState(true)
  const [dirty,       setDirty]       = useState(false)
  const [showCancel,  setShowCancel]  = useState(false)
  const [errors,      setErrors]      = useState({})

  function mark() { setDirty(true) }

  function validate() {
    const errs = {}
    if (!name.trim() || name.trim().length < 2) errs.name = 'Name must be at least 2 characters'
    if (!/^[a-zA-Z\s'\-]+$/.test(name.trim())) errs.name = 'Name should only contain letters'
    if (contactType === 'mobile' && mobile) {
      const mobileStripped = mobile.replace(/-/g, '')
      if (!/^03\d{9}$/.test(mobileStripped)) errs.mobile = 'Use format: 03XXXXXXXXX (11 digits)'
    }
    if (contactType === 'email' && email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter a valid email address'
    }
    if (targetScore < 50 || targetScore > 90) errs.score = 'Score must be between 50 and 90'
    return errs
  }

  function handleSave() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    onSave()
  }

  function handleCancelClick() {
    if (dirty) {
      setShowCancel(true)
    } else {
      onCancel()
    }
  }

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
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-amber-700">You have unsaved changes</p>
        </div>
      )}

      <div className="space-y-3">
        {/* Your Name */}
        <div>
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-1.5">Your Name</label>
          <input
            value={name}
            maxLength={50}
            onChange={e => { setName(e.target.value); mark(); setErrors(prev => ({ ...prev, name: '' })) }}
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-colors ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-teal-600'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1 font-bold">{errors.name}</p>}
        </div>

        {/* Contact — Mobile OR Email toggle */}
        <div>
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-1.5">Contact</label>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 mb-2">
            {[
              { id: 'mobile', label: 'Mobile' },
              { id: 'email',  label: 'Email'  },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setContactType(t.id); mark() }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                  contactType === t.id ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {contactType === 'mobile' ? (
            <input
              value={mobile}
              onChange={e => { setMobile(e.target.value); mark(); setErrors(prev => ({ ...prev, mobile: '' })) }}
              placeholder="03XX-XXXXXXX"
              inputMode="numeric"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors ${
                errors.mobile ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-teal-600'
              }`}
            />
          ) : (
            <input
              value={email}
              onChange={e => { setEmail(e.target.value); mark(); setErrors(prev => ({ ...prev, email: '' })) }}
              placeholder="you@example.com"
              type="email"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition-colors ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-teal-600'
              }`}
            />
          )}
          {errors.mobile && <p className="text-xs text-red-500 mt-1 font-bold">{errors.mobile}</p>}
          {errors.email  && <p className="text-xs text-red-500 mt-1 font-bold">{errors.email}</p>}
        </div>

        {/* Test Date — NTS preset dates */}
        <div>
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-1.5">Test Date</label>
          <div className="space-y-1.5">
            {NTS_DATES.map(d => (
              <label
                key={d.value}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                  testDate === d.value
                    ? 'border-teal-600 bg-teal-600'
                    : 'border-blue-300 bg-blue-100 hover:border-blue-400'
                }`}
              >
                <input
                  type="radio"
                  name="profileTestDate"
                  value={d.value}
                  checked={testDate === d.value}
                  onChange={() => { setTestDate(d.value); mark() }}
                  className="accent-teal-600"
                />
                <span className={`text-sm font-bold ${testDate === d.value ? 'text-white' : 'text-gray-900'}`}>
                  {d.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* NAT-I Category — readonly */}
        <div>
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-1.5">NAT-I Category</label>
          <div className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3">
            <p className="text-sm font-semibold text-gray-600">{getCategoryLabel(initialCategory)}</p>
          </div>
          <p className="text-xs text-gray-700 mt-1">Contact support to change your category</p>
        </div>

        {/* Target Score */}
        <div>
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-1.5">
            Target Score: <span className="text-teal-600 normal-case">{targetScore}/90</span>
          </label>
          <input
            value={targetScore}
            onChange={e => { setTargetScore(Number(e.target.value)); mark(); setErrors(prev => ({ ...prev, score: '' })) }}
            type="range" min={50} max={90} step={5}
            className="w-full accent-teal-600"
          />
          <div className="flex justify-between text-xs text-gray-700 mt-0.5">
            <span>50 (Pass)</span>
            <span>90</span>
          </div>
          <p className="text-xs text-gray-700 mt-1">NAT-I passing mark is 50/90</p>
          {errors.score && <p className="text-xs text-red-500 mt-1 font-bold">{errors.score}</p>}
        </div>

        {/* Streak reminders */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-xl px-4 py-3">
          <div>
            <p className="text-sm font-bold text-gray-800">Streak reminders</p>
            <p className="text-xs text-gray-700">Daily notification to keep your streak</p>
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
          onClick={handleCancelClick}
          className="flex-1 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors"
        >
          Save Profile
        </button>
      </div>

      {/* Cancel confirmation dialog */}
      {showCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50 max-w-sm mx-auto">
          <div className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <h3 className="text-lg font-black text-gray-900 mb-1">Discard changes?</h3>
            <p className="text-sm text-gray-700 mb-6">Your unsaved changes will be lost.</p>
            <div className="space-y-3">
              <button
                onClick={() => setShowCancel(false)}
                className="w-full py-4 rounded-xl border-2 border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Keep Editing
              </button>
              <button
                onClick={onCancel}
                className="w-full py-4 rounded-xl bg-gray-700 text-white text-sm font-bold hover:bg-gray-800"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Profile() {
  const [editing,     setEditing]     = useState(false)
  const [natCategory, setNatCategory] = useState(() => getNatCategory() || 'NAT-IE')

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        {editing ? (
          <EditMode
            initialCategory={natCategory}
            onCancel={() => setEditing(false)}
            onSave={() => {
              setNatCategory(getNatCategory() || 'NAT-IE')
              setEditing(false)
            }}
          />
        ) : (
          <ViewMode natCategory={natCategory} onEdit={() => setEditing(true)} />
        )}
      </main>

      <BottomNav />
    </div>
  )
}
