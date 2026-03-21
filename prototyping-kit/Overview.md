# [UX-3730](https://youtrack.jetbrains.com/issue/UX-3730) Application title in terminal tabs + settings


## Problem

Terminal tab titles default to a static name ("Local") or an incremented variant ("Local (1)", "Local (2)") that doesn't reflect what's actually happening inside. 
When users open multiple tabs or start long-running processes, there's no way to tell at a glance which tab is which or what state a process is in.

This becomes especially painful with AI coding agents like Claude Code, which run for extended periods and report meaningful progress through their titles. 
Users have to switch into each tab to check status — breaking their focus and workflow.

## Agreed Solution (2026.1.1)

- Show title reported by the shell plugins or CLI apps **only when the command is running**
- Switch back to the default "Local (n)" title when the command finishes
- User-renamed tabs are **never** overridden by app titles
- Configurable via Settings → Tools → Terminal

## Key Definitions

- **Running** — Inside an application (Claude Code, vim, htop, npm run dev…) — even if it's waiting for input
- **Not running** — Exited back to the shell prompt (Ctrl+C, the process finished, etc.)

## User Scenarios

1. **Multiple tabs**
All tabs show "Local (n)". User must click through each to find the right one.

2. **AI agent running in background**
Tab shows "Claude Code: Writing tests… 84%" — user knows status without switching.

3. **Build / test process running**
Tab shows progress (e.g. "pytest: 312/480"). Revert to "Local" signals completion.

4. **Custom-named tab**
User renamed tab "prod-ssh". App titles never override the custom name.

5. **Distraction-sensitive user**
Feature can be disabled entirely via the Settings checkbox.

## What This Prototype Covers

- **Tab States** — all 7 possible states for tab titles
- **Revert Behavior** — animated demo of title lifecycle (idle → progress → revert)
- **Agent Asks for Input** — multi-tab scenario with "Waiting for input" signal
- **Background Progress** — test suite progress visible without switching tabs
- **Custom Tab Name** — custom name preserved when apps send titles
- **Settings** — configuration UI for enabling/disabling the feature
