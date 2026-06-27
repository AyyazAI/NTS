import { useState } from 'react'

const METHODS = [
  { id: 'count', label: '✓ Count' },
  { id: 'formula', label: 'Formula' },
  { id: 'visual', label: 'Grid' },
]

export default function MethodTabs({ defaultMethod = 'count', children }) {
  const [active, setActive] = useState(defaultMethod)

  return (
    <div>
      <div className="flex gap-2">
        {METHODS.map(m => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`flex-1 min-w-0 px-2 py-2 rounded-lg text-xs font-bold border transition-all ${
              active === m.id
                ? 'bg-[#006D5B] text-white border-[#006D5B]'
                : 'bg-blue-100 text-gray-900 border-blue-300 hover:border-blue-400'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      {children && (
        <div className="mt-3">
          {typeof children === 'function' ? children(active) : children}
        </div>
      )}
    </div>
  )
}
