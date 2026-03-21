import { useState, useEffect, useCallback, useRef } from 'react'
import { TerminalWindow, Checkbox, RadioGroup, Dialog } from '@jetbrains/int-ui-kit'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import './App.css'
import './styles/MarkdownPage.css'

import overviewContent from './content/overview.md?raw'

/* ────────────────────────────────────────────
   Terminal content for Tab States page
   ──────────────────────────────────────────── */

const idleBlocks = [
  {
    path: '~/IdeaProjects/my-app',
    lines: [
      { type: 'command', text: 'npm test' },
      { type: 'success', text: 'Tests: 42 passed, 42 total' },
      { type: 'success', text: 'Time:  3.271s' },
    ],
  },
]

const idleInput = { path: '~/IdeaProjects/my-app', branch: 'main' }

const noAppTitleBlocks = [
  {
    path: '~/IdeaProjects/my-app',
    lines: [
      { type: 'command', text: 'git status' },
      { type: 'output', text: 'On branch main' },
      { type: 'output', text: 'Changes not staged for commit:' },
      { type: 'output', text: '  modified:   src/auth/login.ts' },
      { type: 'output', text: '  modified:   src/auth/session.ts' },
    ],
  },
]

const vimBlocks = [
  { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'vim src/config.ts' }] },
  {
    path: '',
    lines: [
      { type: 'output', text: 'export const config = {' },
      { type: 'output', text: '  port: 3000,' },
      { type: 'output', text: '  host: "localhost",' },
      { type: 'output', text: '}' },
      { type: 'output', text: '~' },
      { type: 'output', text: '-- INSERT --                          1,1   All' },
    ],
  },
]

const claudeBlocks = [
  { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
  {
    path: '',
    lines: [
      { type: 'output', text: '╭──────────────────────────────────────────╮' },
      { type: 'output', text: '│  Claude Code         v1.0.32            │' },
      { type: 'output', text: '╰──────────────────────────────────────────╯' },
      { type: 'output', text: '' },
      { type: 'output', text: '> Writing unit tests for auth module...' },
      { type: 'output', text: '  ✓ login.test.ts (4 tests)' },
      { type: 'output', text: '  ◐ session.test.ts (writing...)' },
    ],
  },
]

const longTitleBlocks = [
  { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
  {
    path: '',
    lines: [
      { type: 'output', text: '> Refactoring authentication module...' },
      { type: 'output', text: '  Reading src/auth/login.ts' },
      { type: 'output', text: '  Reading src/auth/session.ts' },
      { type: 'output', text: '  Reading src/auth/middleware.ts' },
      { type: 'output', text: '  Analyzing dependencies...' },
    ],
  },
]

/* ────────────────────────────────────────────
   Reusable demo player component
   ──────────────────────────────────────────── */

function DemoPlayer({ phases, renderTerminal, height = 280 }) {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef(null)

  const advance = useCallback(() => {
    setPhase(prev => {
      const next = prev + 1
      if (next >= phases.length) {
        setPlaying(false)
        return 0
      }
      return next
    })
  }, [phases.length])

  useEffect(() => {
    if (playing) {
      timerRef.current = setTimeout(advance, phases[phase].duration)
      return () => clearTimeout(timerRef.current)
    }
  }, [playing, phase, advance, phases])

  const play = () => { setPhase(0); setPlaying(true) }
  const stop = () => { setPlaying(false); setPhase(0); clearTimeout(timerRef.current) }

  return (
    <div className="demo-container">
      <div className="demo-terminal">
        {renderTerminal(phases[phase], phase)}
      </div>
      <div className="demo-controls">
        <div className="demo-phase-indicator">
          <span className="demo-phase-label">{phases[phase].label}</span>
          <span className="demo-phase-step">Step {phase + 1} / {phases.length}</span>
        </div>
        <div className="demo-timeline">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`demo-dot ${i === phase ? 'active' : ''} ${i < phase ? 'passed' : ''}`}
              title={p.label}
              onClick={() => { setPlaying(false); setPhase(i) }}
            />
          ))}
        </div>
        <div className="demo-buttons">
          {!playing ? (
            <button className="demo-btn demo-btn-play" onClick={play}>▶ Play</button>
          ) : (
            <button className="demo-btn demo-btn-stop" onClick={stop}>■ Stop</button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Interactive Demo — Revert Behavior (original)
   ──────────────────────────────────────────── */

const REVERT_PHASES = [
  { tab: 'Local', label: 'Idle — waiting at prompt', duration: 2000,
    blocks: [{ path: '~/IdeaProjects/my-app', lines: [{ type: 'output', text: '' }] }],
    input: { path: '~/IdeaProjects/my-app', branch: 'main' } },
  { tab: 'Local', label: 'Command started (no title yet)', duration: 1500,
    blocks: [{ path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] }],
    input: null },
  { tab: 'Claude Code', label: 'App title reported', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '╭──────────────────────────────────────────╮' },
        { type: 'output', text: '│  Claude Code         v1.0.32            │' },
        { type: 'output', text: '╰──────────────────────────────────────────╯' },
      ]},
    ], input: null },
  { tab: 'Claude Code: Analyzing codebase…', label: 'Progress update', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '╭──────────────────────────────────────────╮' },
        { type: 'output', text: '│  Claude Code         v1.0.32            │' },
        { type: 'output', text: '╰──────────────────────────────────────────╯' },
        { type: 'output', text: '' },
        { type: 'output', text: '> Analyzing codebase…' },
      ]},
    ], input: null },
  { tab: 'Claude Code: Writing tests… 34%', label: 'Progress 34%', duration: 1500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '> Writing unit tests for auth module...' },
        { type: 'output', text: '  ◐ login.test.ts (writing...)' },
      ]},
    ], input: null },
  { tab: 'Claude Code: Writing tests… 67%', label: 'Progress 67%', duration: 1500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '> Writing unit tests for auth module...' },
        { type: 'output', text: '  ✓ login.test.ts (4 tests)' },
        { type: 'output', text: '  ◐ session.test.ts (writing...)' },
      ]},
    ], input: null },
  { tab: 'Claude Code: Writing tests… 100%', label: 'Progress 100%', duration: 1200,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '  ✓ login.test.ts (4 tests)' },
        { type: 'output', text: '  ✓ session.test.ts (3 tests)' },
        { type: 'output', text: '  ✓ middleware.test.ts (5 tests)' },
        { type: 'success', text: '' },
        { type: 'success', text: 'All 12 tests passed.' },
      ]},
    ], input: null },
  { tab: 'Claude Code: Done ✓', label: 'Command finishing', duration: 1500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'success', text: 'All 12 tests passed.' },
        { type: 'success', text: '✓ Done.' },
      ]},
    ], input: null },
  { tab: 'Local', label: 'Reverted to default', duration: 3000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'success', text: 'All 12 tests passed.' },
        { type: 'success', text: '✓ Done.' },
      ]},
    ], input: { path: '~/IdeaProjects/my-app', branch: 'main' } },
]

/* ────────────────────────────────────────────
   Scenario data — AI agent asks for input
   ──────────────────────────────────────────── */

const AGENT_INPUT_PHASES = [
  { tabs: [
      { label: 'Local', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'User starts Claude Code in first tab', duration: 2000,
    blocks: [{ path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] }],
    input: null },
  { tabs: [
      { label: 'Claude Code', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'Agent begins working', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '> Refactoring auth module…' },
        { type: 'output', text: '  Reading src/auth/login.ts' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'Claude Code: Refactoring…', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'User switches to second tab to work', duration: 2500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'git diff --stat' },
        { type: 'output', text: ' src/components/Header.tsx | 12 ++++++------' },
        { type: 'output', text: ' src/utils/format.ts      |  3 ++-' },
        { type: 'output', text: ' 2 files changed, 8 insertions(+), 7 deletions(-)' },
      ]},
    ], input: { path: '~/IdeaProjects/my-app', branch: 'main' } },
  { tabs: [
      { label: 'Claude Code: Waiting for input', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'Agent needs input — tab title updates!', duration: 3500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'git diff --stat' },
        { type: 'output', text: ' src/components/Header.tsx | 12 ++++++------' },
        { type: 'output', text: ' src/utils/format.ts      |  3 ++-' },
        { type: 'output', text: ' 2 files changed, 8 insertions(+), 7 deletions(-)' },
      ]},
    ], input: { path: '~/IdeaProjects/my-app', branch: 'main' } },
  { tabs: [
      { label: 'Claude Code: Waiting for input', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'User notices and switches back', duration: 2500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '> Refactoring auth module…' },
        { type: 'output', text: '  ✓ Extracted session logic' },
        { type: 'output', text: '  ✓ Updated imports' },
        { type: 'output', text: '' },
        { type: 'output', text: '? Delete the old auth/legacy.ts file? (y/n)' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'Claude Code: Refactoring…', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'User responds — agent resumes', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '  ✓ Extracted session logic' },
        { type: 'output', text: '  ✓ Updated imports' },
        { type: 'output', text: '' },
        { type: 'output', text: '? Delete the old auth/legacy.ts file? (y/n) y' },
        { type: 'output', text: '' },
        { type: 'output', text: '> Continuing refactoring…' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'Claude Code: Done ✓', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'Agent finishes', duration: 1800,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'output', text: '  ✓ Deleted auth/legacy.ts' },
        { type: 'output', text: '  ✓ Updated 4 files' },
        { type: 'success', text: '' },
        { type: 'success', text: '✓ Refactoring complete.' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'Local', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'Tab reverts to default', duration: 2500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'claude' }] },
      { path: '', lines: [
        { type: 'success', text: '✓ Refactoring complete.' },
      ]},
    ], input: { path: '~/IdeaProjects/my-app', branch: 'main' } },
]

/* ────────────────────────────────────────────
   Scenario data — Background progress
   ──────────────────────────────────────────── */

const BG_PROGRESS_PHASES = [
  { tabs: [
      { label: 'Local', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'User starts test suite', duration: 1800,
    blocks: [{ path: '~/IdeaProjects/my-app', lines: [{ type: 'command', text: 'npm test -- --coverage' }] }],
    input: null },
  { tabs: [
      { label: 'npm test: Running…', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'Switches to other tab while tests run', duration: 2500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'vim src/auth/login.ts' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'npm test: 45/120 passed', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'Progress visible in background tab', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'vim src/auth/login.ts' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'npm test: 98/120 passed', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'Tests nearing completion', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'vim src/auth/login.ts' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'npm test: Done ✓', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'Tests complete — visible without switching', duration: 2000,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'vim src/auth/login.ts' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'Local', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 1, label: 'Tab reverts to default', duration: 2500,
    blocks: [
      { path: '~/IdeaProjects/my-app', lines: [
        { type: 'command', text: 'vim src/auth/login.ts' },
      ]},
    ], input: null },
]

/* ────────────────────────────────────────────
   Scenario data — Custom-named tab preserved
   ──────────────────────────────────────────── */

const CUSTOM_NAME_PHASES = [
  { tabs: [
      { label: 'prod-ssh', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'User has a custom-named tab "prod-ssh"', duration: 2500,
    blocks: [{ path: 'user@prod-01:~', lines: [{ type: 'output', text: '' }] }],
    input: { path: 'user@prod-01:~' } },
  { tabs: [
      { label: 'prod-ssh', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'Runs htop — app sends title "htop"', duration: 2500,
    blocks: [
      { path: 'user@prod-01:~', lines: [{ type: 'command', text: 'htop' }] },
      { path: '', lines: [
        { type: 'output', text: '  PID  USER     CPU%  MEM%  COMMAND' },
        { type: 'output', text: ' 1423  app      34.2   8.1  node server.js' },
        { type: 'output', text: ' 1891  app      12.7   3.4  postgres' },
        { type: 'output', text: '  892  root      2.1   1.0  sshd' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'prod-ssh', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'Custom name preserved — not overridden', duration: 2500,
    blocks: [
      { path: 'user@prod-01:~', lines: [{ type: 'command', text: 'htop' }] },
      { path: '', lines: [
        { type: 'output', text: '  PID  USER     CPU%  MEM%  COMMAND' },
        { type: 'output', text: ' 1423  app      34.2   8.1  node server.js' },
        { type: 'output', text: ' 1891  app      12.7   3.4  postgres' },
        { type: 'output', text: '  892  root      2.1   1.0  sshd' },
      ]},
    ], input: null },
  { tabs: [
      { label: 'prod-ssh', closable: true },
      { label: 'Local (2)', closable: true },
    ], activeTab: 0, label: 'After exit — still "prod-ssh"', duration: 2500,
    blocks: [
      { path: 'user@prod-01:~', lines: [{ type: 'command', text: 'htop' }] },
      { path: 'user@prod-01:~', lines: [{ type: 'output', text: '' }] },
    ], input: { path: 'user@prod-01:~' } },
]

/* ────────────────────────────────────────────
   Sidebar nav items
   ──────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'tab-states', label: 'Tab States' },
  { id: 'demo', label: 'Revert Behavior' },
  { id: 'agent-input', label: 'Agent Asks for Input' },
  { id: 'bg-progress', label: 'Background Progress' },
  { id: 'custom-name', label: 'Custom Tab Name' },
  { id: 'settings', label: 'Settings' },
]

/* ────────────────────────────────────────────
   State card component
   ──────────────────────────────────────────── */

function StateCard({ number, title, description, children }) {
  return (
    <div className="state-card">
      <div className="state-card-header">
        <span className="state-number">{number}</span>
        <div>
          <h3 className="state-title">{title}</h3>
          <p className="state-description">{description}</p>
        </div>
      </div>
      <div className="state-terminal">
        {children}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Page: Overview — task description & summary
   ──────────────────────────────────────────── */

function OverviewPage() {
  return (
    <div className="markdown-page">
      <ReactMarkdown remarkPlugins={[remarkBreaks]}>{overviewContent}</ReactMarkdown>
    </div>
  )
}

/* ────────────────────────────────────────────
   Page: Tab States (static showcase)
   ──────────────────────────────────────────── */

function TabStatesPage() {
  return (
    <>
      <h2 className="section-heading">Tab States</h2>
      <p className="section-description">
        All possible states for terminal tab titles based on the agreed 2026.1.1 solution.
      </p>

      <div className="states-grid">
        <StateCard number="1" title="Idle — Default name" description="Baseline. Multiple tabs get incremented numbers.">
          <TerminalWindow width="100%" height={200}
            tabs={[{ label: 'Local', closable: true }, { label: 'Local (2)', closable: true }, { label: 'Local (3)', closable: true }]}
            activeTab={0} blocks={idleBlocks} input={idleInput} actions={['more', 'minimize']} focused />
        </StateCard>

        <StateCard number="2" title="Idle — User-renamed tab" description="Custom name is never overridden by app title.">
          <TerminalWindow width="100%" height={200}
            tabs={[{ label: 'my-api', closable: true }, { label: 'Local (2)', closable: true }]}
            activeTab={0} blocks={idleBlocks} input={idleInput} actions={['more', 'minimize']} focused />
        </StateCard>

        <StateCard number="3" title="Command running — no app title" description="Command doesn't send OSC title (e.g. git status). Tab stays as default.">
          <TerminalWindow width="100%" height={200}
            tabs={[{ label: 'Local', closable: true }]}
            activeTab={0} blocks={noAppTitleBlocks} input={null} actions={['more', 'minimize']} focused />
        </StateCard>

        <StateCard number="4" title="Command running — app title reported" description="App sends a short title via escape sequence.">
          <TerminalWindow width="100%" height={200}
            tabs={[{ label: 'vim', closable: true }, { label: 'Local (2)', closable: true }]}
            activeTab={0} blocks={vimBlocks} input={null} actions={['more', 'minimize']} focused />
        </StateCard>

        <StateCard number="5" title="App title with progress" description="The key use case — AI agents reporting progress in the tab title.">
          <TerminalWindow width="100%" height={200}
            tabs={[{ label: 'Claude Code: Writing tests… 67%', closable: true }, { label: 'Local (2)', closable: true }]}
            activeTab={0} blocks={claudeBlocks} input={null} actions={['more', 'minimize']} focused />
        </StateCard>

        <StateCard number="6" title="Long app title — truncation" description="Verbose title gets truncated with ellipsis.">
          <TerminalWindow width="100%" height={200}
            tabs={[{ label: 'Claude Code: Refactoring authentication module in /src/auth/', closable: true }, { label: 'Local (2)', closable: true }]}
            activeTab={0} blocks={longTitleBlocks} input={null} actions={['more', 'minimize']} focused />
        </StateCard>
      </div>
    </>
  )
}

/* ────────────────────────────────────────────
   Page: Revert Behavior Demo
   ──────────────────────────────────────────── */

function RevertDemoPage() {
  return (
    <>
      <h2 className="section-heading">Revert Behavior</h2>
      <p className="section-description">
        Core 2026.1.1 behavior: tab title shows app-reported progress while running,
        then reverts to default when the command finishes.
      </p>
      <DemoPlayer
        phases={REVERT_PHASES}
        renderTerminal={(p) => (
          <TerminalWindow width="100%" height={280}
            tabs={[{ label: p.tab, closable: true }, { label: 'Local (2)', closable: true }]}
            activeTab={0} blocks={p.blocks} input={p.input}
            actions={['more', 'minimize']} focused />
        )}
      />
    </>
  )
}

/* ────────────────────────────────────────────
   Page: Agent Asks for Input (main scenario)
   ──────────────────────────────────────────── */

function AgentInputPage() {
  return (
    <>
      <h2 className="section-heading">Agent Asks for Input</h2>
      <p className="section-description">
        The key scenario: user runs an AI agent, switches to another tab to work, and the
        agent needs input. The tab title changes to "Waiting for input" — the user sees it
        without switching back.
      </p>
      <DemoPlayer
        phases={AGENT_INPUT_PHASES}
        renderTerminal={(p) => (
          <TerminalWindow width="100%" height={280}
            tabs={p.tabs} activeTab={p.activeTab}
            blocks={p.blocks} input={p.input}
            actions={['more', 'minimize']} focused />
        )}
      />
    </>
  )
}

/* ────────────────────────────────────────────
   Page: Background Progress
   ──────────────────────────────────────────── */

function BgProgressPage() {
  return (
    <>
      <h2 className="section-heading">Background Progress</h2>
      <p className="section-description">
        Long test suite runs in one tab while the user works in another.
        Progress is visible in the background tab title — no need to switch.
      </p>
      <DemoPlayer
        phases={BG_PROGRESS_PHASES}
        renderTerminal={(p) => (
          <TerminalWindow width="100%" height={280}
            tabs={p.tabs} activeTab={p.activeTab}
            blocks={p.blocks} input={p.input}
            actions={['more', 'minimize']} focused />
        )}
      />
    </>
  )
}

/* ────────────────────────────────────────────
   Page: Custom Tab Name
   ──────────────────────────────────────────── */

function CustomNamePage() {
  return (
    <>
      <h2 className="section-heading">Custom Tab Name Preserved</h2>
      <p className="section-description">
        When a user manually renames a tab, app-reported titles never override it.
        The custom name is always respected.
      </p>
      <DemoPlayer
        phases={CUSTOM_NAME_PHASES}
        renderTerminal={(p) => (
          <TerminalWindow width="100%" height={280}
            tabs={p.tabs} activeTab={p.activeTab}
            blocks={p.blocks} input={p.input}
            actions={['more', 'minimize']} focused />
        )}
      />
    </>
  )
}

/* ────────────────────────────────────────────
   Page: Settings
   ──────────────────────────────────────────── */

function SettingsPage() {
  const [showAppTitle, setShowAppTitle] = useState(true)
  const [titleMode, setTitleMode] = useState('when-running')

  return (
    <>
      <h2 className="section-heading">Settings Configuration</h2>
      <p className="section-description">
        Settings → Tools → Terminal. Users can enable/disable app title display and choose
        when it's shown.
      </p>

      <div className="settings-container">
        <Dialog
          title="Settings"
          width={520}
          height="auto"
          showMacOSButtons={false}
          showHelp={false}
          buttons={[
            { children: 'Cancel', type: 'default' },
            { children: 'OK', type: 'primary' },
          ]}
        >
          <div className="settings-content">
            <div className="settings-breadcrumb">Tools › Terminal</div>
            <div className="settings-group">
              <Checkbox
                checked={showAppTitle}
                onChange={() => setShowAppTitle(!showAppTitle)}
                label="Show application title"
              />
              {showAppTitle && (
                <div className="settings-radio-indent">
                  <RadioGroup
                    name="title-mode"
                    value={titleMode}
                    onChange={setTitleMode}
                    options={[
                      { value: 'when-running', label: 'When command is running' },
                      { value: 'always', label: 'Always' },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </Dialog>
      </div>
    </>
  )
}

/* ────────────────────────────────────────────
   Main App — sidebar + content
   ──────────────────────────────────────────── */

function App() {
  const [activePage, setActivePage] = useState('overview')

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-badge">UX-3730</span>
          <h1 className="sidebar-title">Terminal Tab Titles</h1>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.filter(i => i.id === 'overview').map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="sidebar-divider" />
          <div className="sidebar-group-label">Scenarios</div>
          {NAV_ITEMS.filter(i => !['tab-states', 'settings', 'overview'].includes(i.id)).map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="sidebar-divider" />
          <div className="sidebar-group-label">Reference</div>
          {NAV_ITEMS.filter(i => ['tab-states', 'settings'].includes(i.id)).map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="sidebar-meta">2026.1.1 release scope</p>
        </div>
      </aside>

      <main className="content">
        {activePage === 'overview' && <OverviewPage />}
        {activePage === 'tab-states' && <TabStatesPage />}
        {activePage === 'demo' && <RevertDemoPage />}
        {activePage === 'agent-input' && <AgentInputPage />}
        {activePage === 'bg-progress' && <BgProgressPage />}
        {activePage === 'custom-name' && <CustomNamePage />}
        {activePage === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

export default App
