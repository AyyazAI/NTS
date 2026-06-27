import { useState, useRef, useCallback, useEffect } from 'react'

const DRAW_TOOLS = [
  { id: 'thick',  icon: '✏️', title: 'Thick pen' },
  { id: 'thin',   icon: '🖊️', title: 'Thin pen'  },
  { id: 'eraser', icon: '◻',  title: 'Eraser'    },
  { id: 'undo',   icon: '↩',  title: 'Undo'      },
  { id: 'clear',  icon: '✕',  title: 'Clear'     },
]

export default function RoughWork({ isMock = false }) {
  const [modalOpen,  setModalOpen]  = useState(false)
  const [activeTab,  setActiveTab]  = useState('draw')
  const [activeTool, setActiveTool] = useState('thick')
  const [preview,    setPreview]    = useState(null)
  const canvasRef    = useRef(null)
  const isDrawing    = useRef(false)
  const history      = useRef([])
  const textRef      = useRef(null)
  const lastTap      = useRef(0)
  const savedDataUrl = useRef(null)

  // Restore canvas drawing when modal opens or tab switches to draw
  useEffect(() => {
    if (!modalOpen || activeTab !== 'draw') return
    const c = canvasRef.current
    if (!c || !savedDataUrl.current) return
    const img = new Image()
    img.onload = () => c.getContext('2d').drawImage(img, 0, 0)
    img.src = savedDataUrl.current
  }, [modalOpen, activeTab])

  function handleDoubleTap(e) {
    e.preventDefault()
    setModalOpen(true)
  }

  function handleTouchEnd(e) {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      e.preventDefault()
      setModalOpen(true)
      lastTap.current = 0
    } else {
      lastTap.current = now
    }
  }

  function saveSnapshot() {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    history.current.push(ctx.getImageData(0, 0, c.width, c.height))
    if (history.current.length > 30) history.current.shift()
  }

  function undo() {
    const c = canvasRef.current
    if (!c || history.current.length === 0) return
    c.getContext('2d').putImageData(history.current.pop(), 0, 0)
  }

  function clear() {
    const c = canvasRef.current
    if (!c) return
    saveSnapshot()
    c.getContext('2d').clearRect(0, 0, c.width, c.height)
    savedDataUrl.current = null
    setPreview(null)
  }

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.width  / rect.width
    const sy = canvas.height / rect.height
    if (e.touches) return {
      x: (e.touches[0].clientX - rect.left) * sx,
      y: (e.touches[0].clientY - rect.top)  * sy,
    }
    return {
      x: (e.clientX - rect.left) * sx,
      y: (e.clientY - rect.top)  * sy,
    }
  }

  function applyTool(ctx, tool) {
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
    const c = canvasRef.current
    if (!c) return
    saveSnapshot()
    isDrawing.current = true
    const ctx = c.getContext('2d')
    applyTool(ctx, activeTool)
    const { x, y } = getPos(e, c)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }, [activeTool])

  const draw = useCallback((e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const { x, y } = getPos(e, c)
    ctx.lineTo(x, y)
    ctx.stroke()
  }, [])

  const stopDraw = useCallback(() => { isDrawing.current = false }, [])

  function handleToolClick(toolId) {
    if (toolId === 'undo')  { undo();  return }
    if (toolId === 'clear') { clear(); return }
    setActiveTool(toolId)
  }

  function handleDone() {
    if (activeTab === 'draw') {
      const c = canvasRef.current
      if (c) {
        const ctx = c.getContext('2d')
        const pixels = ctx.getImageData(0, 0, c.width, c.height)
        const hasContent = pixels.data.some((v, i) => i % 4 === 3 && v > 0)
        if (hasContent) {
          const url = c.toDataURL()
          savedDataUrl.current = url
          setPreview({ type: 'canvas', url })
        } else {
          savedDataUrl.current = null
          setPreview(null)
        }
      }
    } else {
      const text = textRef.current?.value?.trim() || ''
      setPreview(text ? { type: 'text', text } : null)
    }
    setModalOpen(false)
  }

  return (
    <>
      {/* Always-visible rough work box */}
      <div className="mt-3">
        <div
          data-testid="rough-work-box"
          className="border-2 border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-teal-600 transition-colors select-none"
          onDoubleClick={handleDoubleTap}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-gray-800 px-3 py-1.5 flex items-center justify-between">
            <p className="text-xs font-bold text-white">Rough work area</p>
            <p className="text-[10px] text-gray-400">double-tap to open</p>
          </div>
          {preview?.type === 'canvas' ? (
            <div className="bg-white flex items-center justify-center overflow-hidden p-1 min-h-12">
              <img src={preview.url} className="max-w-full object-contain" alt="rough work preview" />
            </div>
          ) : preview?.type === 'text' ? (
            <div className="bg-teal-50 flex items-start p-3 min-h-12">
              <p className="text-xs text-gray-700 font-mono whitespace-pre-wrap">{preview.text}</p>
            </div>
          ) : (
            <div className="bg-teal-50 flex items-center justify-center py-4">
              <p className="text-xs text-gray-600 italic">No work yet — double-tap to start</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom-sheet modal — stays in lower portion so question remains visible */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end max-w-sm mx-auto">
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setModalOpen(false)}
          />
          <div data-testid="rough-work-modal" className="bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '62vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <button
                onClick={() => setModalOpen(false)}
                className="text-sm font-bold text-gray-500 hover:text-gray-700 px-1 py-1"
              >
                Cancel
              </button>
              <p className="text-sm font-black text-gray-900">Rough Work</p>
              <button
                onClick={handleDone}
                className="text-sm font-bold text-teal-600 hover:text-teal-700 px-1 py-1"
              >
                Done
              </button>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-3 pb-2 flex-shrink-0">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                {[{ id: 'draw', label: '✏️ Draw' }, { id: 'type', label: '⌨️ Type' }].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                      activeTab === t.id ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-5">
              {activeTab === 'draw' && (
                <div>
                  <div className="flex gap-1 mb-2">
                    {DRAW_TOOLS.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        title={tool.title}
                        className={`w-9 h-9 text-sm rounded-lg border flex items-center justify-center transition-all ${
                          activeTool === tool.id && tool.id !== 'undo' && tool.id !== 'clear'
                            ? 'border-teal-500 bg-teal-50 text-teal-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {tool.icon}
                      </button>
                    ))}
                  </div>
                  <div style={{ height: 500, overflowY: 'scroll' }}>
                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={2000}
                      className="w-full rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 touch-none cursor-crosshair"
                      onMouseDown={startDraw}
                      onMouseMove={draw}
                      onMouseUp={stopDraw}
                      onMouseLeave={stopDraw}
                      onTouchStart={startDraw}
                      onTouchMove={draw}
                      onTouchEnd={stopDraw}
                    />
                  </div>
                </div>
              )}
              {activeTab === 'type' && (
                <textarea
                  ref={textRef}
                  rows={6}
                  defaultValue={preview?.type === 'text' ? preview.text : ''}
                  placeholder="Type your working here..."
                  className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
              <p className="text-xs text-gray-700 mt-2">
                {isMock ? '⚠️ Timer keeps running while this is open' : 'Rough work only — not submitted'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
