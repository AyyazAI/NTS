import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [mobileError, setMobileError] = useState('')

  // Step 2
  const [hasTestDate, setHasTestDate] = useState(false)
  const [testDate, setTestDate] = useState('')
  const [hasTargetScore, setHasTargetScore] = useState(false)
  const [score, setScore] = useState(70)

  function handleContinue() {
    const clean = mobile.replace(/[\s-]/g, '')
    if (!clean || !/^03\d{9}$/.test(clean)) {
      setMobileError('Enter a valid Pakistani mobile number (e.g. 0312-3456789)')
      return
    }
    setMobileError('')
    setStep(2)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center max-w-sm mx-auto px-6 pt-12 pb-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <span className="font-black text-3xl text-gray-900">Taleemi</span>
          <span className="font-black text-3xl text-teal-600">Markaz</span>
        </div>
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mt-1">NTS Prep</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${step === 1 ? 'bg-teal-600' : 'bg-gray-200'}`} />
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-teal-600' : 'bg-gray-200'}`} />
      </div>

      {step === 1 ? (
        <div className="w-full flex-1 flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome to TaleemiMarkaz 👋</h1>
          <p className="text-sm text-gray-500 mb-8">Let's get you started in 2 quick steps</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                What should we call you?
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Mobile number
              </label>
              <input
                type="tel"
                placeholder="03XX-XXXXXXX"
                value={mobile}
                onChange={e => { setMobile(e.target.value); setMobileError('') }}
                className={`w-full border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:border-transparent ${
                  mobileError
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-gray-200 focus:ring-teal-500'
                }`}
              />
              {mobileError && (
                <p className="text-xs text-red-500 mt-1.5 font-semibold">{mobileError}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mt-8 w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 active:bg-teal-800 transition-colors"
          >
            Continue →
          </button>

          <div className="text-center mt-5">
            <Link to="/" className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-600">
              Skip setup — take me to practice →
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Set your goals</h1>
          <p className="text-sm text-gray-500 mb-8">You can always update these later in your Profile</p>

          <div className="space-y-7 flex-1">
            {/* Test date */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">
                Do you have a target NAT-I test date?
              </p>
              <div className="flex gap-2">
                {['Yes', 'Not yet'].map(opt => {
                  const active = opt === 'Yes' ? hasTestDate : !hasTestDate
                  return (
                    <button
                      key={opt}
                      onClick={() => setHasTestDate(opt === 'Yes')}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        active
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {hasTestDate && (
                <input
                  type="date"
                  value={testDate}
                  min={today}
                  onChange={e => setTestDate(e.target.value)}
                  className="mt-3 w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
            </div>

            {/* Target score */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">
                Do you have a target score in mind?
              </p>
              <div className="flex gap-2">
                {['Yes', 'Not yet'].map(opt => {
                  const active = opt === 'Yes' ? hasTargetScore : !hasTargetScore
                  return (
                    <button
                      key={opt}
                      onClick={() => setHasTargetScore(opt === 'Yes')}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        active
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {hasTargetScore && (
                <div className="mt-3">
                  <p className="text-sm font-bold text-teal-600 mb-2">
                    I want to score {score}/100
                  </p>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={score}
                    onChange={e => setScore(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>40</span>
                    <span>100</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 mt-8">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-base hover:bg-teal-700 transition-colors"
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
