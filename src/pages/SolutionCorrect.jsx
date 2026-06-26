import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import ModeIndicator from '../components/ModeIndicator'

export default function SolutionCorrect() {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <Header />
      <ModeIndicator mode="practice" />

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        {/* Success banner */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-5 text-center">
          <p className="font-black text-teal-700 text-2xl mb-1">Correct — nice work! 🎉</p>
          <p className="text-sm text-teal-600 font-semibold">You answered in 47 seconds</p>
        </div>

        {/* Correct answer confirmation */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-black flex-shrink-0">
            A
          </div>
          <div>
            <p className="font-black text-gray-900">21 committees</p>
            <p className="text-xs text-gray-500 mt-0.5">You selected A — that's correct ✅</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6" />

        {/* Explore or continue */}
        <p className="text-sm font-black text-gray-700 mb-3">Want to go deeper?</p>
        <div className="flex flex-col gap-4">
          <Link to="/solution/wrong" className="block">
            <button className="w-full py-4 rounded-xl border-2 border-teal-600 text-teal-700 font-bold text-sm hover:bg-teal-50 transition-colors">
              Explore other methods
            </button>
          </Link>
          <Link to="/practice/question" className="block">
            <button className="w-full py-4 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition-colors">
              Next Question →
            </button>
          </Link>
        </div>

        <p className="text-center text-sm text-gray-600 mt-5">
          Keep going — every question makes you stronger 💪
        </p>

      </main>

      <BottomNav />
    </div>
  )
}
