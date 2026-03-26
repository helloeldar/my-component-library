/**
 * Template: IDE with custom panels + split left tool window
 *
 * Demonstrates all v0.3.0 MainWindow flexibility features:
 *  1. defaultLeftPanelContent — extend built-ins, don't replace them
 *  2. StripeItemDef.icon as ReactNode — use any image/element as a stripe icon
 *  3. Split left panel — separator in leftStripeItems splits the left column
 *  4. PanelContext — typed context passed to leftPanelContent / rightPanelContent
 */

import { useState } from 'react'
import {
  MainWindow,
  defaultLeftPanelContent,
  ToolWindow,
  Icon,
  Button,
} from '@jetbrains/int-ui-kit'

import claudeIconUrl from './assets/claude.svg' // your own SVG asset

/* ── Custom Claude stripe icon (ReactNode) ─────────────────────────────────── */

const claudeStripeIcon = (
  <img src={claudeIconUrl} width={20} height={20} alt="Claude" style={{ display: 'block' }} />
)

/* ── Stripe items — with separator splitting the left panel ────────────────── */

const LEFT_STRIPE_ITEMS = [
  // Items BEFORE the separator → open in the TOP left sub-panel
  { id: 'project', icon: 'toolwindows/project@20x20', tooltip: 'Project', section: 'top' },
  { id: 'commit',  icon: 'toolwindows/commit@20x20',  tooltip: 'Commit',  section: 'top' },

  // The separator — splits the left panel vertically into two independent sub-panels
  { id: '_sep', separator: true, section: 'top' },

  // Items AFTER the separator → open in the BOTTOM left sub-panel (split)
  { id: 'agent-tasks', icon: claudeStripeIcon, tooltip: 'Agent Tasks', section: 'top' },

  // Section 'bottom' items → go to the bottom bar panel (Terminal, Git, etc.)
  { id: 'terminal', icon: 'toolwindows/terminal@20x20', tooltip: 'Terminal', panel: 'bottom', section: 'bottom' },
  { id: 'git',      icon: 'toolwindows/vcs@20x20',      tooltip: 'Git',      panel: 'bottom', section: 'bottom' },
]

/* ── Custom Agent Tasks panel ──────────────────────────────────────────────── */

const TASKS = [
  { id: 1, label: 'Task 1.md',                     status: 'selected', time: '2m' },
  { id: 2, label: 'Understanding codebase.md',      status: 'running',  time: '3h' },
  { id: 3, label: 'Understanding Configuration.md', status: 'waiting',  time: '1h' },
  { id: 4, label: 'Create a class with 3 int.md',   status: 'done',     time: '1h' },
]

function StatusIcon({ status }) {
  if (status === 'running') return <Icon name="process/step_1" size={16} />
  if (status === 'waiting') return <Icon name="general/warning" size={16} />
  if (status === 'done')    return <Icon name="general/inspectionsOK" size={16} />
  return null
}

/**
 * ctx is PanelContext — typed as of v0.3.0:
 *   { focusedPanel, setFocusedPanel, setShowLeftPanel, projectTreeData, ... }
 */
function AgentTasksPanel({ ctx }) {
  const [selected, setSelected] = useState(0)

  return (
    <ToolWindow
      title="Agent Tasks"
      width="100%"
      height="auto"
      actions={['minimize']}
      focused={ctx.focusedPanel === 'left'}
      onFocus={() => ctx.setFocusedPanel('left')}
      onActionClick={(action) => {
        if (action === 'minimize') ctx.setShowLeftPanel(false)
      }}
      className="main-window-tool-window main-window-tool-window-left"
    >
      <div style={{ padding: '4px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TASKS.map((task, i) => (
          <div
            key={task.id}
            onClick={() => setSelected(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 4px',
              borderRadius: 4,
              cursor: 'pointer',
              background: selected === i ? 'var(--list-selection-inactive-bg)' : 'transparent',
            }}
          >
            <Icon name="fileTypes/markdown" size={16} />
            <span style={{ flex: 1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
              {task.label}
            </span>
            <StatusIcon status={task.status} />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
              {task.time}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: '6px 8px', borderTop: '1px solid var(--border-primary)' }}>
        <Button style={{ width: '100%', justifyContent: 'center', gap: 6 }}>
          <img src={claudeIconUrl} width={14} height={14} alt="" /> New Task
        </Button>
      </div>
    </ToolWindow>
  )
}

/* ── leftPanelContent — delegate built-ins, inject custom ─────────────────── */

function leftPanelContent(id, ctx) {
  if (id === 'agent-tasks') return <AgentTasksPanel ctx={ctx} />

  // defaultLeftPanelContent handles 'project', 'commit', and any other built-in id
  return defaultLeftPanelContent(id, ctx)
}

/* ── App ───────────────────────────────────────────────────────────────────── */

export default function IDEWithCustomPanels() {
  return (
    <MainWindow
      height={720}
      projectName="my-app"
      projectIcon="MA"
      projectColor="violet"
      branchName="main"
      runConfig="Current File"
      leftStripeItems={LEFT_STRIPE_ITEMS}
      // Open Project (top sub-panel), Agent Tasks (split sub-panel), Terminal (bottom)
      defaultOpenToolWindows={['project', 'agent-tasks', 'terminal']}
      leftPanelContent={leftPanelContent}
    />
  )
}
