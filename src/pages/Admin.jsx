import { useState, useEffect } from 'react'
import { db } from '../utils/db'

const PHASE_FLOWS = {
  '0': [
    { id: 1, label: 'React + Vite\n+ Tailwind', tool: 'Vite' },
    { id: 2, label: 'Scaffold\nFolders', tool: 'Claude Code' },
    { id: 3, label: '.env.local\n+ .claudeignore', tool: 'Claude Code' },
    { id: 4, label: 'Turso DB\nClient', tool: 'Turso' },
    { id: 5, label: 'Admin\nPanel', tool: 'React' },
    { id: 6, label: 'Git Init\n+ GitHub', tool: 'Git' },
    { id: 7, label: 'Deploy\nVercel', tool: 'Vercel' },
    { id: 8, label: 'Design 11\nScreens', tool: 'Claude Design' },
    { id: 9, label: 'Design\nHandoff', tool: 'Claude Code' },
  ],
  '1': [
    { id: 1,  label: 'Finalise\n11 UIs', tool: 'React' },
    { id: 2,  label: 'DB Schema\n4 tables', tool: 'Turso' },
    { id: 3,  label: 'Admin\nEntry Form', tool: 'React' },
    { id: 4,  label: 'Seed 90\nQuestions', tool: 'Claude Code' },
    { id: 5,  label: 'Practice\nMode Loop', tool: 'React' },
    { id: 6,  label: 'AI Explain\n/api/explain', tool: 'Claude API' },
    { id: 7,  label: 'Canvas\nDraw/Type/Upload', tool: 'React' },
    { id: 8,  label: 'Score\nTracking', tool: 'React' },
    { id: 9,  label: 'Onboarding\nLive', tool: 'React' },
    { id: 10, label: 'Deploy\ntaleemimarkaz.com', tool: 'Vercel' },
  ],
  '2': [
    { id: 1, label: 'Mock Test\nMode', tool: 'React' },
    { id: 2, label: 'Activate\nNAT-IM', tool: 'Claude Code' },
    { id: 3, label: 'Activate\nNAT-ICS', tool: 'Claude Code' },
    { id: 4, label: 'Activate\nNAT-ICOM', tool: 'Claude Code' },
    { id: 5, label: 'Activate\nNAT-IGS', tool: 'Claude Code' },
    { id: 6, label: 'Activate\nNAT-IA', tool: 'Claude Code' },
    { id: 7, label: 'Attempt\nHistory', tool: 'Turso' },
  ],
  '3': [
    { id: 1, label: 'Performance\nDashboard', tool: 'React' },
    { id: 2, label: 'Adaptive\nWeighting', tool: 'Claude API' },
    { id: 3, label: 'Flag &\nReview', tool: 'React' },
    { id: 4, label: 'Admin\nAnalytics', tool: 'React' },
  ],
  '4': [
    { id: 1, label: 'CT-AI v2.0\nAudit Log', tool: 'Turso' },
    { id: 2, label: 'Review\nQueue', tool: 'React' },
    { id: 3, label: 'Content\nFiltering', tool: 'Claude API' },
    { id: 4, label: 'ISO 42001\nLayer', tool: 'Claude Code' },
  ],
}

const TOOL_COLORS = {
  'Vite': '#646cff', 'Claude Code': '#0d9488', 'Turso': '#4f9cf9',
  'React': '#0ea5e9', 'Git': '#f05032', 'Vercel': '#000000',
  'Claude Design': '#7c3aed', 'Claude API': '#d97706',
}

const ACCENT_HEX = {
  '0': '#1e293b', '1': '#0d9488', '2': '#7c3aed', '3': '#d97706', '4': '#0ea5e9',
}

const PHASES = [
  { id: '0', name: 'Foundation & Governance' },
  { id: '1', name: 'Core Learning Engine' },
  { id: '2', name: 'Mock Test + All Categories' },
  { id: '3', name: 'Analytics & Personalisation' },
  { id: '4', name: 'Governance & Compliance' },
]

const SEED_TASKS = [
  // Phase 0 — Foundation & Governance
  { id: 'p0-01', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Initialize React + Vite + Tailwind', tool: 'Vite' },
  { id: 'p0-02', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Scaffold src folder structure', tool: 'Claude Code' },
  { id: 'p0-03', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Configure .env.local and .claudeignore', tool: 'Claude Code' },
  { id: 'p0-04', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Set up Turso DB client', tool: 'Turso' },
  { id: 'p0-05', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Build Admin panel', tool: 'React' },
  { id: 'p0-06', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Initialise git and push to GitHub', tool: 'Git' },
  { id: 'p0-07', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Deploy to Vercel', tool: 'Vercel' },
  { id: 't0-claude-design', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Design core UI screens in Claude Design (Home, Question, Solution, Canvas, Progress)', tool: 'Claude Design' },
  { id: 't0-design-handoff', phase_id: '0', phase_name: 'Foundation & Governance', label: 'Handoff Claude Design to Claude Code', tool: 'Claude Design → Claude Code' },
  // Phase 1 — Core Learning Engine
  { id: 'p1-01', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Finalise & verify all 11 screen UIs', tool: 'React' },
  { id: 'p1-02', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Create Turso database schema (questions, question_methods, question_flags, students)', tool: 'Turso' },
  { id: 'p1-03', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Build admin question entry form (/admin/questions/new)', tool: 'React' },
  { id: 'p1-04', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Seed verified question bank — Verbal 20 + Analytical 20 + Quantitative 20 + NAT-IE Subject 30', tool: 'Claude Code' },
  { id: 'p1-05', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Wire Practice Mode core loop (Topic → Sub-topic → Question → Answer → Solution)', tool: 'React' },
  { id: 'p1-06', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Deploy AI explanation serverless function (/api/explain · GOV-RULE-009)', tool: 'Claude API' },
  { id: 'p1-07', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Implement Canvas (Draw / Type / Upload with session persistence)', tool: 'React' },
  { id: 'p1-08', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Implement session score tracking', tool: 'React' },
  { id: 'p1-09', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Student onboarding live (writes to students table)', tool: 'React' },
  { id: 'p1-10', phase_id: '1', phase_name: 'Core Learning Engine', label: 'Production deployment to taleemimarkaz.com', tool: 'Vercel' },
  // Phase 2 — Mock Test + All Categories
  { id: 'p2-01', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Activate Mock Test Mode (90 MCQs · 120 min · 4 sections · auto-submit)', tool: 'React' },
  { id: 'p2-02', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Activate Medical (NAT-IM) — seed 30 verified subject questions', tool: 'Claude Code' },
  { id: 'p2-03', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Activate Computer Science (NAT-ICS) — seed 30 verified subject questions', tool: 'Claude Code' },
  { id: 'p2-04', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Activate Commerce (NAT-ICOM) — seed 30 verified subject questions', tool: 'Claude Code' },
  { id: 'p2-05', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Activate General Sciences (NAT-IGS) — seed 30 verified subject questions', tool: 'Claude Code' },
  { id: 'p2-06', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Activate Arts (NAT-IA) — seed 30 verified subject questions', tool: 'Claude Code' },
  { id: 'p2-07', phase_id: '2', phase_name: 'Mock Test + All Categories', label: 'Attempt history & tracking (attempts table · Powers Progress screen)', tool: 'Turso' },
  // Phase 3 — Analytics & Personalisation
  { id: 'p3-01', phase_id: '3', phase_name: 'Analytics & Personalisation', label: 'Student performance dashboard (section-wise accuracy · weak area detection)', tool: 'React' },
  { id: 'p3-02', phase_id: '3', phase_name: 'Analytics & Personalisation', label: 'Adaptive question weighting (AI classifies difficulty · serves weak sections more)', tool: 'Claude API' },
  { id: 'p3-03', phase_id: '3', phase_name: 'Analytics & Personalisation', label: 'Question flag & review system (student flags · admin resolves · closed loop)', tool: 'React' },
  { id: 'p3-04', phase_id: '3', phase_name: 'Analytics & Personalisation', label: 'Admin analytics dashboard (attempts per question · flag queue · category breakdown)', tool: 'React' },
  // Phase 4 — Governance & Compliance
  { id: 'p4-01', phase_id: '4', phase_name: 'Governance & Compliance', label: 'CT-AI v2.0 audit logging (model · version · timestamp · confidence per explanation)', tool: 'Turso' },
  { id: 'p4-02', phase_id: '4', phase_name: 'Governance & Compliance', label: 'Low-confidence explanation review queue (GOV-RULE-006)', tool: 'React' },
  { id: 'p4-03', phase_id: '4', phase_name: 'Governance & Compliance', label: 'Input/output content filtering', tool: 'Claude API' },
  { id: 'p4-04', phase_id: '4', phase_name: 'Governance & Compliance', label: 'ISO 42001 management layer · NTS-GOV-001 finalised', tool: 'Claude Code' },
]

// Governance colour system — high contrast: solid dark headers, white text
const COLORS = {
  '0': { bg: 'bg-slate-800',   border: 'border-slate-800',   bar: 'bg-teal-400',  badge: 'bg-slate-700 text-white',   heading: 'text-white', check: 'bg-teal-400' },
  '1': { bg: 'bg-teal-700',    border: 'border-teal-700',    bar: 'bg-white',     badge: 'bg-teal-600 text-white',    heading: 'text-white', check: 'bg-white'    },
  '2': { bg: 'bg-violet-700',  border: 'border-violet-700',  bar: 'bg-white',     badge: 'bg-violet-600 text-white',  heading: 'text-white', check: 'bg-white'    },
  '3': { bg: 'bg-amber-600',   border: 'border-amber-600',   bar: 'bg-white',     badge: 'bg-amber-500 text-white',   heading: 'text-white', check: 'bg-white'    },
  '4': { bg: 'bg-sky-700',     border: 'border-sky-700',     bar: 'bg-white',     badge: 'bg-sky-600 text-white',     heading: 'text-white', check: 'bg-white'    },
}

function Checkmark() {
  return (
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProgressBar({ pct, barClass }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`${barClass} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function PhaseFlowchart({ phaseId, accentColor }) {
  const steps = PHASE_FLOWS[phaseId] || []
  if (!steps.length) return null
  const BOX_W = 110, BOX_H = 56, GAP_X = 44, GAP_Y = 48, PAD = 16
  const containerW = 860
  const perRow = Math.max(1, Math.floor((containerW - PAD * 2 + GAP_X) / (BOX_W + GAP_X)))
  const rows = []
  for (let i = 0; i < steps.length; i += perRow) rows.push(steps.slice(i, i + perRow))
  const svgH = rows.length * (BOX_H + GAP_Y) - GAP_Y + PAD * 2
  const elements = []
  rows.forEach((row, rowIdx) => {
    const y = PAD + rowIdx * (BOX_H + GAP_Y)
    if (rowIdx > 0) {
      const prevRow = rows[rowIdx - 1]
      const prevX = PAD + (prevRow.length - 1) * (BOX_W + GAP_X) + BOX_W
      const rightEdge = prevX + 20
      const prevY = PAD + (rowIdx - 1) * (BOX_H + GAP_Y) + BOX_H / 2
      const curY = y + BOX_H / 2
      elements.push(<polyline key={`wrap-${rowIdx}`} points={`${prevX},${prevY} ${rightEdge},${prevY} ${rightEdge},${curY} ${PAD},${curY}`} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow)" />)
    }
    row.forEach((step, colIdx) => {
      const x = PAD + colIdx * (BOX_W + GAP_X)
      const isLast = rowIdx * perRow + colIdx === steps.length - 1
      const toolColor = TOOL_COLORS[step.tool] || '#64748b'
      elements.push(
        <g key={`box-${step.id}`}>
          <rect x={x} y={y} width={BOX_W} height={BOX_H} rx={8} fill="#ffffff" stroke={accentColor} strokeWidth="1.5" />
          <circle cx={x + 14} cy={y + 14} r={9} fill={accentColor} />
          <text x={x + 14} y={y + 18} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">{step.id}</text>
          {step.label.split('\n').map((line, li) => (
            <text key={li} x={x + BOX_W / 2} y={y + 22 + li * 13} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">{line}</text>
          ))}
          <circle cx={x + BOX_W - 10} cy={y + BOX_H - 10} r={4} fill={toolColor} />
        </g>
      )
      if (colIdx < row.length - 1 && !isLast) {
        const ax = x + BOX_W, ay = y + BOX_H / 2
        elements.push(<line key={`arrow-${step.id}`} x1={ax} y1={ay} x2={ax + GAP_X - 6} y2={ay} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />)
      }
    })
  })
  return (
    <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 overflow-x-auto">
      <svg width={containerW} height={svgH} style={{ minWidth: containerW, display: 'block' }}>
        <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" /></marker></defs>
        {elements}
      </svg>
      <div className="flex flex-wrap gap-3 mt-3">
        {[...new Set((PHASE_FLOWS[phaseId] || []).map(s => s.tool))].map(tool => (
          <div key={tool} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: TOOL_COLORS[tool] || '#64748b' }} />
            <span className="text-xs text-gray-900 font-medium">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('nts_admin') === '1'
  )
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [dbError, setDbError] = useState('')
  const [expanded, setExpanded] = useState({ '0': true, '1': true, '2': true, '3': true, '4': true })
  const [toggling, setToggling] = useState(null)
  const [flowOpen, setFlowOpen] = useState({ '0': false, '1': false, '2': false, '3': false, '4': false })

  useEffect(() => {
    if (authenticated) initAndLoad()
  }, [authenticated])

  async function initAndLoad() {
    setLoading(true)
    setDbError('')
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          phase_id TEXT NOT NULL,
          phase_name TEXT NOT NULL,
          label TEXT NOT NULL,
          tool TEXT NOT NULL,
          done INTEGER DEFAULT 0,
          updated_at TEXT
        )
      `)
      const { rows } = await db.execute('SELECT COUNT(*) as count FROM tasks')
      if (Number(rows[0].count) === 0) {
        await db.batch(
          SEED_TASKS.map(t => ({
            sql: 'INSERT OR IGNORE INTO tasks (id, phase_id, phase_name, label, tool, done) VALUES (?, ?, ?, ?, ?, 0)',
            args: [t.id, t.phase_id, t.phase_name, t.label, t.tool],
          }))
        )
      }
      const all = await db.execute('SELECT * FROM tasks ORDER BY id')
      setTasks(all.rows)
    } catch (e) {
      setDbError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function toggleTask(task) {
    setToggling(task.id)
    const newDone = task.done ? 0 : 1
    const now = new Date().toISOString()
    try {
      await db.execute({
        sql: 'UPDATE tasks SET done = ?, updated_at = ? WHERE id = ?',
        args: [newDone, now, task.id],
      })
      setTasks(prev =>
        prev.map(t => t.id === task.id ? { ...t, done: newDone, updated_at: now } : t)
      )
    } catch (e) {
      setDbError(e.message)
    } finally {
      setToggling(null)
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('nts_admin', '1')
      setAuthenticated(true)
    } else {
      setAuthError('Incorrect password.')
      setPassword('')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('nts_admin')
    setAuthenticated(false)
    setTasks([])
  }

  const tasksByPhase = PHASES.map(p => ({
    ...p,
    tasks: tasks.filter(t => t.phase_id === p.id),
  }))

  const totalDone = tasks.filter(t => t.done).length
  const totalTasks = tasks.length
  const globalPct = totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-gray-900">NTS Prep</p>
            <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setAuthError('') }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-gray-900">NTS Prep — Admin</h1>
          <p className="text-xs text-gray-700 font-medium">Project tracker · NTS-GOV-001 v1.1</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Sign out
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-5">
        {dbError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            {dbError}
          </div>
        )}

        {/* Global progress card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Overall progress</span>
            <span className="text-sm font-bold text-gray-900">{totalDone} / {totalTasks}</span>
          </div>
          <ProgressBar pct={globalPct} barClass="bg-gray-800" />
          <p className="text-right text-xs text-gray-700 font-medium mt-1">{globalPct}% complete</p>
        </div>

        {/* Phase cards */}
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">Connecting to database…</div>
        ) : (
          tasksByPhase.map(phase => {
            const done = phase.tasks.filter(t => t.done).length
            const total = phase.tasks.length
            const pct = total ? Math.round((done / total) * 100) : 0
            const c = COLORS[phase.id]
            const isOpen = expanded[phase.id]
            const accent = ACCENT_HEX[phase.id]

            return (
              <div key={phase.id} className={`bg-white rounded-2xl border ${c.border} overflow-hidden`}>
                {/* Phase header */}
                <button
                  onClick={() => setExpanded(prev => ({ ...prev, [phase.id]: !prev[phase.id] }))}
                  className={`w-full ${c.bg} px-5 py-4 flex items-center justify-between hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                      Phase {phase.id}
                    </span>
                    <span className={`font-semibold text-sm ${c.heading}`}>{phase.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white text-opacity-80 tabular-nums">{done}/{total}</span>
                    <div className="w-20 bg-white bg-opacity-30 rounded-full h-1.5">
                      <div
                        className={`${c.bar} h-1.5 rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={`text-white text-opacity-80 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <>
                    {/* Flowchart toggle */}
                    <button
                      onClick={() => setFlowOpen(prev => ({ ...prev, [phase.id]: !prev[phase.id] }))}
                      className="w-full flex items-center justify-between px-5 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200"
                    >
                      <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">◈ Phase {phase.id} Flowchart</span>
                      <span className={`text-gray-700 text-xs font-bold transition-transform duration-200 ${flowOpen[phase.id] ? 'rotate-180' : ''}`}>▾</span>
                    </button>
                    {flowOpen[phase.id] && <PhaseFlowchart phaseId={phase.id} accentColor={accent} />}

                    {/* Task list */}
                    <ul className="divide-y divide-gray-100">
                      {phase.tasks.map(task => (
                        <li key={task.id}>
                          <button
                            onClick={() => toggleTask(task)}
                            disabled={toggling === task.id}
                            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left group disabled:opacity-50"
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              task.done
                                ? `${c.check} border-transparent`
                                : 'border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {task.done && <Checkmark />}
                            </div>
                            <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-500' : 'text-gray-900 font-medium'}`}>
                              {task.label}
                            </span>
                            <span className="text-xs text-white bg-gray-700 px-2.5 py-0.5 rounded-full shrink-0 font-medium">
                              {task.tool}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
