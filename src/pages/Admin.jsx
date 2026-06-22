import { useState, useEffect } from 'react'
import { db } from '../utils/db'

const PHASES = [
  { id: '0', name: 'Setup' },
  { id: '1', name: 'Core Loop' },
  { id: '2', name: 'Intelligence' },
  { id: '3', name: 'Personalisation' },
  { id: '4', name: 'Governance' },
]

const SEED_TASKS = [
  // Phase 0 — Setup
  { id: 'p0-01', phase_id: '0', phase_name: 'Setup', label: 'Initialize React + Vite + Tailwind', tool: 'Vite' },
  { id: 'p0-02', phase_id: '0', phase_name: 'Setup', label: 'Scaffold src folder structure', tool: 'Claude Code' },
  { id: 'p0-03', phase_id: '0', phase_name: 'Setup', label: 'Configure .env.local and .claudeignore', tool: 'Claude Code' },
  { id: 'p0-04', phase_id: '0', phase_name: 'Setup', label: 'Set up Turso DB client', tool: 'Turso' },
  { id: 'p0-05', phase_id: '0', phase_name: 'Setup', label: 'Build Admin panel', tool: 'React' },
  { id: 'p0-06', phase_id: '0', phase_name: 'Setup', label: 'Initialise git and push to GitHub', tool: 'Git' },
  { id: 'p0-07', phase_id: '0', phase_name: 'Setup', label: 'Deploy to Vercel', tool: 'Vercel' },
  { id: 't0-claude-design', phase_id: '0', phase_name: 'Setup', label: 'Design core UI screens in Claude Design (Home, Question, Solution, Canvas, Progress)', tool: 'Claude Design' },
  { id: 't0-design-handoff', phase_id: '0', phase_name: 'Setup', label: 'Handoff Claude Design to Claude Code', tool: 'Claude Design → Claude Code' },
  // Phase 1 — Core Loop
  { id: 'p1-01', phase_id: '1', phase_name: 'Core Loop', label: 'Design questions table schema', tool: 'Turso' },
  { id: 'p1-02', phase_id: '1', phase_name: 'Core Loop', label: 'Seed English Verbal questions', tool: 'Claude Code' },
  { id: 'p1-03', phase_id: '1', phase_name: 'Core Loop', label: 'Seed Math Quantitative questions', tool: 'Claude Code' },
  { id: 'p1-04', phase_id: '1', phase_name: 'Core Loop', label: 'Seed Analytical Reasoning questions', tool: 'Claude Code' },
  { id: 'p1-05', phase_id: '1', phase_name: 'Core Loop', label: 'Build QuestionCard component', tool: 'React' },
  { id: 'p1-06', phase_id: '1', phase_name: 'Core Loop', label: 'Build AnswerOptions component', tool: 'React' },
  { id: 'p1-07', phase_id: '1', phase_name: 'Core Loop', label: 'Build scoring and results logic', tool: 'React' },
  { id: 'p1-08', phase_id: '1', phase_name: 'Core Loop', label: 'Build practice session page', tool: 'React' },
  // Phase 2 — Intelligence
  { id: 'p2-01', phase_id: '2', phase_name: 'Intelligence', label: 'Integrate Claude Sonnet 4.6 API', tool: 'Claude API' },
  { id: 'p2-02', phase_id: '2', phase_name: 'Intelligence', label: 'Build explanation agent in src/agents', tool: 'Claude API' },
  { id: 'p2-03', phase_id: '2', phase_name: 'Intelligence', label: 'Wire explanations to answer reveals', tool: 'React' },
  { id: 'p2-04', phase_id: '2', phase_name: 'Intelligence', label: 'Cache explanations in Turso', tool: 'Turso' },
  // Phase 3 — Personalisation
  { id: 'p3-01', phase_id: '3', phase_name: 'Personalisation', label: 'Track per-question attempt history', tool: 'Turso' },
  { id: 'p3-02', phase_id: '3', phase_name: 'Personalisation', label: 'Compute and store weak area scores', tool: 'React' },
  { id: 'p3-03', phase_id: '3', phase_name: 'Personalisation', label: 'Build weak area dashboard', tool: 'React' },
  { id: 'p3-04', phase_id: '3', phase_name: 'Personalisation', label: 'Implement adaptive practice mode', tool: 'React' },
  // Phase 4 — Governance
  { id: 'p4-01', phase_id: '4', phase_name: 'Governance', label: 'CT-AI v2.0 audit logging', tool: 'Turso' },
  { id: 'p4-02', phase_id: '4', phase_name: 'Governance', label: 'AI usage rate limiting', tool: 'React' },
  { id: 'p4-03', phase_id: '4', phase_name: 'Governance', label: 'Input/output content filtering', tool: 'Claude API' },
  { id: 'p4-04', phase_id: '4', phase_name: 'Governance', label: 'ISO 42001 management layer', tool: 'Claude Code' },
]

const COLORS = {
  '0': { bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700', heading: 'text-blue-700', check: 'bg-blue-500' },
  '1': { bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700', heading: 'text-emerald-700', check: 'bg-emerald-500' },
  '2': { bg: 'bg-violet-50', border: 'border-violet-200', bar: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', heading: 'text-violet-700', check: 'bg-violet-500' },
  '3': { bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700', heading: 'text-amber-700', check: 'bg-amber-500' },
  '4': { bg: 'bg-rose-50', border: 'border-rose-200', bar: 'bg-rose-500', badge: 'bg-rose-100 text-rose-700', heading: 'text-rose-700', check: 'bg-rose-500' },
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
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
          <p className="text-xs text-gray-400">Project tracker</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Sign out
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
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
          <p className="text-right text-xs text-gray-400 mt-1">{globalPct}% complete</p>
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

            return (
              <div key={phase.id} className={`bg-white rounded-2xl border ${c.border} overflow-hidden`}>
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
                    <span className="text-xs text-gray-400 tabular-nums">{done}/{total}</span>
                    <div className="w-20 bg-white bg-opacity-60 rounded-full h-1.5">
                      <div
                        className={`${c.bar} h-1.5 rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </div>
                </button>

                {isOpen && (
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
                          <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {task.label}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                            {task.tool}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
