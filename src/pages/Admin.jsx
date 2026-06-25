import { useState, useEffect } from 'react'
import { db } from '../utils/db'

// ─── Governance rule: When workflow HTML files in src/governance/docs/ are updated,
// the iframes below automatically reflect the changes on next page load.
// No manual update to Admin.jsx is required UNLESS a new phase is added or
// a doc filename changes. See GOV-RULE-008 and CLAUDE.md for propagation checklist.

const WORKFLOW_DOCS = {
  master: '/src/governance/docs/00-master-workflow.html',
  '0': '/src/governance/docs/01-phase0-workflow.html',
  '1': '/src/governance/docs/02-phase1-workflow.html',
  '2': '/src/governance/docs/03-phase2-workflow.html',
  '3': '/src/governance/docs/04-phase345-workflow.html',
  '4': '/src/governance/docs/04-phase345-workflow.html',
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

function WorkflowEmbed({ src, title }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
          📋 {title}
        </span>
        <span className={`text-gray-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="border-t border-gray-100">
          <iframe
            src={src}
            title={title}
            className="w-full border-0"
            style={{ height: '520px' }}
            loading="lazy"
          />
        </div>
      )}
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
  const [masterWorkflowOpen, setMasterWorkflowOpen] = useState(false)

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
          <p className="text-xs text-gray-400">Project tracker · NTS-GOV-001 v1.1</p>
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

        {/* Master workflow diagram */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setMasterWorkflowOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-bold text-gray-900 text-left">Master Project Workflow</p>
              <p className="text-xs text-gray-400 text-left mt-0.5">All phases · All actors · End-to-end delivery map</p>
            </div>
            <span className={`text-gray-400 text-xs transition-transform duration-200 ${masterWorkflowOpen ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {masterWorkflowOpen && (
            <div className="border-t border-gray-100">
              <iframe
                src={WORKFLOW_DOCS.master}
                title="Master Project Workflow"
                className="w-full border-0"
                style={{ height: '600px' }}
                loading="lazy"
              />
            </div>
          )}
        </div>

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
                  <>
                    {/* Phase workflow diagram — collapsible */}
                    {WORKFLOW_DOCS[phase.id] && (
                      <WorkflowEmbed
                        src={WORKFLOW_DOCS[phase.id]}
                        title={`Phase ${phase.id} Workflow`}
                      />
                    )}

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
                            <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-900 font-medium'}`}>
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
