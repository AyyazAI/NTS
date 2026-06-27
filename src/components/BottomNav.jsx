import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { icon: '🏠', label: 'Home', path: '/' },
  { icon: '📚', label: 'Practice', path: '/practice' },
  { icon: '⏱️', label: 'Mock', path: '/mock-test' },
  { icon: '📊', label: 'Progress', path: '/progress' },
  { icon: '👤', label: 'Profile', path: '/profile' },
]

// Routes where navigation away is blocked (active mock test)
const MOCK_TEST_ROUTES = ['/mock-test/question', '/mock-test']

export default function BottomNav() {
  const { pathname } = useLocation()
  const [showLock, setShowLock] = useState(false)

  const inMockTest = pathname === '/mock-test/question' || pathname === '/mock-test/overview'

  function isActive(path) {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  function handleNavClick(e, path) {
    if (inMockTest && path !== pathname && !path.startsWith('/mock-test')) {
      e.preventDefault()
      setShowLock(true)
    }
  }

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-30">
        <div className="flex items-stretch pb-5 pt-1">
          {NAV.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={`flex-1 flex flex-col items-center gap-0.5 pt-2 pb-1 transition-colors ${
                isActive(item.path) ? 'text-[#006D5B]' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mock test nav-lock toast */}
      {showLock && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 max-w-xs w-full z-40 px-4">
          <div className="bg-gray-900 text-white rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
            <p className="text-xs font-bold leading-snug flex-1">
              Complete or submit your test first
            </p>
            <button
              onClick={() => setShowLock(false)}
              className="text-xs font-bold text-gray-400 hover:text-white flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
