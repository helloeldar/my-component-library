# Task - Terminal Caret Blink on Focus Only

## Goal
The terminal cursor (caret) should only blink when the terminal input is focused. Currently it blinks all the time, which is incorrect UX behavior.

## Requirements
- The blinking animation on `.terminal-cursor` should only play when the terminal is focused (i.e., the hidden input inside it has focus)
- When the terminal loses focus, the cursor should stop blinking (stay solid or hidden)

## Plan
1. Use CSS `:focus-within` pseudo-class on `.terminal-content-wrapper` to conditionally apply the blink animation only when the hidden input is focused

## Progress
- 2026-03-25: Task created, implementing fix

## Results
- Applied `:focus-within` CSS selector to gate the blink animation — cursor only blinks when the terminal has keyboard focus
