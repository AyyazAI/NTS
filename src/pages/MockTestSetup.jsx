import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'

const TOPICS = [
  { id: 'English', label: 'English' },
  { id: 'Quantitative Reasoning', label: 'Quantitative Reasoning' },
  { id: 'Analytical Reasoning', label: 'Analytical Reasoning' },
  { id: 'Engineering (NAT-IE)', label: 'Engineering (NAT-IE)' },
]

export default function MockTestSetup() {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState(null)

  function handleStart() {
    if (!selectedTopic) return
    navigate('/mock-test/question', {
      state: {
        topic:          selectedTopic,
        startTimestamp: Date.now(),
        answers:        {},
        flags:          [],
        currentIdx:     0,
      },
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="mock" />

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        <div className="pt-4 mb-6">
          <h1 className="text-2xl font-black text-gray-900 mb-1">NAT-I Mock Test</h1>
          <p className="text-sm text-gray-700">Select one topic to test yourself</p>
        </div>

        <div className="space-y-3 mb-6">
          {TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border-2 text-left transition-all ${
                selectedTopic === topic.id
                  ? 'bg-[#006D5B] border-[#006D5B]'
                  : 'bg-blue-100 border-blue-300 hover:border-blue-400'
              }`}
            >
              <span className={`text-base font-black ${selectedTopic === topic.id ? 'text-white' : 'text-gray-900'}`}>
                {topic.label}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
          <p className="text-sm font-bold text-amber-700">30 minutes · 20 questions</p>
          <p className="text-xs text-amber-600 mt-0.5">No Show Solution during test · No negative marking</p>
        </div>

        <button
          disabled={!selectedTopic}
          onClick={handleStart}
          className={`w-full py-4 rounded-xl text-base font-black transition-all ${
            selectedTopic
              ? 'bg-[#006D5B] text-white hover:bg-[#005548]'
              : 'bg-gray-200 border-2 border-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Test →
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
