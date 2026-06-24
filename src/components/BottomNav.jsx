import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { icon: '🏠', label: 'Home', path: '/' },
  { icon: '📚', label: 'Practice', path: '/practice' },
  { icon: '⏱️', label: 'Mock', path: '/mock-test' },
  { icon: '📊', label: 'Progress', path: '/progress' },
  { icon: '👤', label: 'Profile', path: '/profile' },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  function isActive(path) {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-30">
      <div className="flex items-stretch pb-5 pt-1">
        {NAV.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 flex flex-col items-center gap-0.5 pt-2 pb-1 transition-colors ${
              isActive(item.path) ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
