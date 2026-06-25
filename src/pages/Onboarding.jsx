import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NAT_CATEGORIES, setNatCategory as saveCategory } from '../utils/natCategory'

const NTS_DATES = [
  { label: '15 Aug 2026', value: '2026-08-15' },
  { label: '12 Sep 2026', value: '2026-09-12' },
  { label: '10 Oct 2026', value: '2026-10-10' },
  { label: '14 Nov 2026', value: '2026-11-14' },
]

function validateName(val) {
  if (!val.trim()) return 'Please enter your name'
  if (!/^[a-zA-Z\s'\-]+$/.test(val.trim())) return 'Name should only contain letters'
  if (val.trim().length < 2) return 'Name must be at least 2 characters'
  return ''
}

function validateMobile(val) {
  const clean = val.replace(/[\s-]/g, '')
  if (!clean) return ''
  if (!/^03\d{9}$/.test(clean)) return 'Enter a valid Pakistani mobile number (e.g. 0312-3456789)'
  return ''
}

function validateEmail(val) {
  if (!val) return ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || val.length > 100)
    return 'Enter a valid email address'
  return ''
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1
  const [name,         setName]         = useState('')
  const [nameError,    setNameError]     = useState('')
  const [nameTouched,  setNameTouched]   = useState(false)
  const [contactType,  setContactType]   = useState('mobile')
  const [mobile,       setMobile]        = useState('')
  const [email,        setEmail]         = useState('')
  const [contactError, setContactError]  = useState('')

  // Step 2
  const [natCategory,    setNatCategory]    = useState(null)
  const [testDate,       setTestDate]       = useState(NTS_DATES[0].value)
  const [hasTargetScore, setHasTargetScore] = useState(true)
  const [score,          setScore]          = useState(60)

  function handleNameBlur() {
    setNameTouched(true)
    setNameError(validateName(name))
  }

  function handleContinue() {
    const nameErr = validateName(name)
    if (nameErr) {
      setNameError(nameErr)
      setNameTouched(true)
      return
    }
    const contactErr = contactType === 'mobile' ? validateMobile(mobile) : validateEmail(email)
    if (contactErr) { setContactError(contactErr); return }
    setContactError('')
    setStep(2)
  }

  function handleFinish() {
    if (!natCategory) return
    saveCategory(natCategory)
    try {
      localStorage.setItem('student_name', name.trim())
      if (mobile)  localStorage.setItem('student_mobile', mobile)
      if (email)   localStorage.setItem('student_email', email)
      if (testDate) localStorage.setItem('student_test_date', testDate)
      if (hasTargetScore) localStorage.setItem('student_target_score', String(score))
    } catch {}
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center max-w-sm mx-auto px-6 pt-12 pb-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <span className="font-black text-3xl text-gray-900">Taleemi</span>
          <span className="font-black text-3xl text-teal-600">Markaz</span>
        </div>
        <p className="text-xs font-bold text-gray-600 tracking-widest uppercase mt-1">NTS Prep</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${step === 1 ? 'bg-teal-600' : 'bg-teal-300'}`} />
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-teal-600' : 'bg-gray-200'}`} />
      </div>

      {step === 1 ? (
        <div className="w-full flex-1 flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome to TaleemiMarkaz 👋</h1>
          <p className="text-sm text-gray-600 mb-8">Let's get you started in 2 quick steps</p>

          <div className="space-y-5">
            {/* Name field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                What should we call you?
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                autoComplete="name"
                maxLength={50}
                onChange={e => {
                  setName(e.target.value)
                  if (nameTouched) setNameError(validateName(e.target.value))
                }}
                onBlur={handleNameBlur}
                className={`w-full border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:border-transparent ${
                  nameError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-teal-500'
                }`}
              />
              {nameError && (
                <p className="text-xs text-red-500 mt-1.5 font-semibold">{nameError}</p>
              )}
            </div>

            {/* Contact type toggle */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                How can we reach you? <span className="font-normal text-gray-600">(optional)</span>
              </label>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 mb-3">
                {[
                  { id: 'mobile', label: 'Mobile number' },
                  { id: 'email',  label: 'Email'         },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setContactType(t.id); setContactError('') }}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                      contactType === t.id ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {contactType === 'mobile' ? (
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="03XX-XXXXXXX"
                  value={mobile}
                  onChange={e => { setMobile(e.target.value); setContactError('') }}
                  className={`w-full border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:border-transparent ${
                    contactError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-teal-500'
                  }`}
                />
              ) : (
                <input
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  maxLength={100}
                  onChange={e => { setEmail(e.target.value); setContactError('') }}
                  className={`w-full border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:border-transparent ${
                    contactError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-teal-500'
                  }`}
                />
              )}
              {contactError && (
                <p className="text-xs text-red-500 mt-1.5 font-semibold">{contactError}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mt-8 w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 active:bg-teal-800 transition-colors"
          >
            Continue →
          </button>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome aboard, {name.trim()}!</h1>
          <p className="text-sm text-gray-600 mb-6">
            Let's personalise your prep so we show you the right content
          </p>

          <div className="space-y-6 flex-1">
            {/* NAT-I Category — mandatory */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">
                Which NAT-I category are you preparing for?{' '}
                <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {NAT_CATEGORIES.map(cat => {
                  const selected = natCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setNatCategory(cat.id)}
                      className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all ${
                        selected
                          ? 'border-teal-600 bg-teal-600'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {selected && (
                        <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-teal-600 text-[9px] font-black flex-shrink-0">✓</span>
                      )}
                      <div className="text-left min-w-0">
                        <p className={`text-[10px] font-black ${selected ? 'text-teal-100' : 'text-gray-700'}`}>
                          {cat.id}
                        </p>
                        <p className={`text-xs font-bold leading-tight truncate ${selected ? 'text-white' : 'text-gray-700'}`}>
                          {cat.label}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
              {!natCategory && (
                <p className="text-xs text-gray-700 mt-1.5 font-semibold">
                  Required — select your NAT-I category to continue
                </p>
              )}
            </div>

            {/* NTS Test Dates — preset radio buttons */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">When is your NAT-I test?</p>
              <div className="space-y-2">
                {NTS_DATES.map(d => (
                  <label
                    key={d.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                      testDate === d.value
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="testDate"
                      value={d.value}
                      checked={testDate === d.value}
                      onChange={() => setTestDate(d.value)}
                      className="accent-teal-600"
                    />
                    <span className={`text-sm font-bold ${testDate === d.value ? 'text-teal-700' : 'text-gray-700'}`}>
                      {d.label}
                    </span>
                  </label>
                ))}
                <label
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                    testDate === ''
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="testDate"
                    value=""
                    checked={testDate === ''}
                    onChange={() => setTestDate('')}
                    className="accent-teal-600"
                  />
                  <span className={`text-sm font-bold ${testDate === '' ? 'text-teal-700' : 'text-gray-700'}`}>
                    I'll decide later
                  </span>
                </label>
              </div>
            </div>

            {/* Target score */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Do you have a target score in mind?</p>
              <div className="flex gap-2 mb-3">
                {['Yes', 'Not yet'].map(opt => {
                  const active = opt === 'Yes' ? hasTargetScore : !hasTargetScore
                  return (
                    <button
                      key={opt}
                      onClick={() => setHasTargetScore(opt === 'Yes')}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        active ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {hasTargetScore && (
                <div>
                  <p className="text-sm font-bold text-teal-600 mb-2">
                    I want to score {score}/90
                  </p>
                  <input
                    type="range"
                    min="50"
                    max="90"
                    step="5"
                    value={score}
                    onChange={e => setScore(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-700 mt-1">
                    <span>50 (Pass)</span>
                    <span>90</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1.5">NAT-I passing mark is 50/90</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <button
              onClick={handleFinish}
              disabled={!natCategory}
              className={`w-full font-bold py-4 rounded-xl text-base transition-colors ${
                natCategory
                  ? 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Let's go! →
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full border-2 border-gray-200 text-gray-600 font-bold py-4 rounded-xl text-base hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
