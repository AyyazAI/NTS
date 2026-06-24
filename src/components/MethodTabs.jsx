import { useState } from 'react'

const METHODS = [
  { id: 'count', label: '✓ Method 1: Count' },
  { id: 'formula', label: 'Method 2: Formula' },
  { id: 'visual', label: 'Method 3: Visual' },
]

export default function MethodTabs({ defaultMethod = 'count', children }) {
  const [active, setActive] = useState(defaultMethod)

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {METHODS.map(m => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
              active === m.id
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
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
