import { useState, useRef, useEffect, useCallback } from 'react'

const TABS = [
  { id: 'draw', label: '✏️ Draw' },
  { id: 'type', label: '⌨️ Type' },
]

const DRAW_TOOLS = [
  { id: 'thick',  icon: '✏️', title: 'Thick pen' },
  { id: 'thin',   icon: '🖊️', title: 'Thin pen'  },
  { id: 'eraser', icon: '◻',  title: 'Eraser'    },
  { id: 'undo',   icon: '↩',  title: 'Undo'      },
  { id: 'clear',  icon: '✕',  title: 'Clear'     },
]

export default function Canvas({ footerText = 'Your work is saved if you navigate away' }) {
  const [tab, setTab]             = useState('draw')
  const [activeTool, setActiveTool] = useState('thick')
  const canvasRef   = useRef(null)
  const isDrawing   = useRef(false)
  const history     = useRef([])   // ImageData snapshots for undo
  const textRef     = useRef(null)

  function switchTab(id) {
    setTab(id)
    try { localStorage.setItem('canvas_last_tab', id) } catch {}
  }

  // Restore saved tab on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('canvas_last_tab')
      if (saved === 'draw' || saved === 'type') setTab(saved)
    } catch {}
  }, [])

  // Push current canvas state to undo history
  function saveSnapshot() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
    if (history.current.length > 30) history.current.shift()
  }

  function undo() {
    const canvas = canvasRef.current
    if (!canvas || history.current.length === 0) return
    const ctx = canvas.getContext('2d')
    const snapshot = history.current.pop()
    ctx.putImageData(snapshot, 0, 0)
  }

  function clear() {
    const canvas = canvasRef.current
    if (!canvas) return
    saveSnapshot()
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width  / rect.width
    const scaleY = canvas.height / rect.height
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    }
  }

  function applyToolSettings(ctx, tool) {
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 16
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#1f2937'
      ctx.lineWidth   = tool === 'thick' ? 4 : 2
    }
    ctx.lineCap  = 'round'
    ctx.lineJoin = 'round'
  }

  const startDraw = useCallback((e) => {
    if (activeTool === 'undo' || activeTool === 'clear') return
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    saveSnapshot()
    isDrawing.current = true
    const ctx = canvas.getContext('2d')
    applyToolSettings(ctx, activeTool)
    const { x, y } = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }, [activeTool])

  const draw = useCallback((e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { x, y } = getPos(e, canvas)
    ctx.lineTo(x, y)
    ctx.stroke()
  }, [])

  const stopDraw = useCallback(() => {
    isDrawing.current = false
  }, [])

  function handleToolClick(toolId) {
    if (toolId === 'undo')  { undo();  return }
    if (toolId === 'clear') { clear(); return }
    setActiveTool(toolId)
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden mt-4">
      {/* Tab bar */}
      <div className="bg-gray-50 px-4 pt-3 pb-2 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-700 mb-2">
          Scratch pad — work it out below
        </p>
        <div className="flex gap-1 bg-gray-200 rounded-lg p-0.5">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                tab === t.id ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
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
                onClick={() => handleToolClick(tool.id)}
                title={tool.title}
                className={`w-9 h-9 text-sm rounded-lg border flex items-center justify-center transition-all ${
                  activeTool === tool.id && tool.id !== 'undo' && tool.id !== 'clear'
                    ? 'border-teal-500 bg-teal-50 text-teal-600'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {tool.icon}
              </button>
            ))}
          </div>
          <canvas
            ref={canvasRef}
            width={320}
            height={112}
            className="w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 touch-none cursor-crosshair"
            style={{ height: 112 }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
        </div>
      )}

      {/* Type */}
      {tab === 'type' && (
        <div className="bg-white p-3">
          <textarea
            ref={textRef}
            rows={4}
            placeholder="Type your working here..."
            className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}

      <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
        <p className="text-xs text-gray-700">{footerText}</p>
      </div>
    </div>
  )
}
