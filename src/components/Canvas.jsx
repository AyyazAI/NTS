import { useState } from 'react'

const TABS = [
  { id: 'draw', label: '✏️ Draw' },
  { id: 'type', label: '⌨️ Type' },
  { id: 'upload', label: '📷 Upload' },
]

const DRAW_TOOLS = [
  { id: 'thick', icon: '✏️', title: 'Thick pen' },
  { id: 'thin', icon: '🖊️', title: 'Thin pen' },
  { id: 'eraser', icon: '◻', title: 'Eraser' },
  { id: 'undo', icon: '↩', title: 'Undo' },
  { id: 'clear', icon: '✕', title: 'Clear' },
]

export default function Canvas() {
  const [tab, setTab] = useState('draw')
  const [activeTool, setActiveTool] = useState('thick')

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden mt-4">
      {/* Tab bar */}
      <div className="bg-gray-50 px-4 pt-3 pb-2 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-500 mb-2">
          Scratch pad — work it out below
        </p>
        <div className="flex gap-1 bg-gray-200 rounded-lg p-0.5">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                tab === t.id ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Draw */}
      {tab === 'draw' && (
        <div className="bg-white p-3">
          <div className="flex gap-1 mb-2">
            {DRAW_TOOLS.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                title={tool.title}
                className={`w-9 h-9 text-sm rounded-lg border flex items-center justify-center transition-all ${
                  activeTool === tool.id
                    ? 'border-teal-500 bg-teal-50 text-teal-600'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {tool.icon}
              </button>
            ))}
          </div>
          <div className="h-28 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center select-none">
            <span className="text-xs text-gray-300">Draw your working here</span>
          </div>
        </div>
      )}

      {/* Type */}
      {tab === 'type' && (
        <div className="bg-white p-3">
          <textarea
            rows={4}
            placeholder="Type your working here..."
            className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}

      {/* Upload */}
      {tab === 'upload' && (
        <div className="bg-white p-3">
          <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-teal-400 transition-colors">
            <p className="text-3xl mb-1">📷</p>
            <p className="text-sm font-semibold text-gray-600">Upload photo of your working</p>
            <p className="text-xs text-gray-400 mt-1">JPG / PNG / PDF · max 5MB</p>
            <span className="inline-block mt-3 text-xs font-bold text-teal-600 border border-teal-600 rounded-lg px-4 py-1.5">
              Choose file
            </span>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
          </label>
        </div>
      )}

      <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
        <p className="text-xs text-gray-400">Your work is saved if you navigate away</p>
      </div>
    </div>
  )
}
