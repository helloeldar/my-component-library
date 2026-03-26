# Task - Use toolWindowChat icon for AI Assistant stripe

## Goal
Replace the AI Assistant icon in the Right Top Stripe with the new `toolWindowChat@20x20` icon from the `aiAssistant` folder.

## Requirements
- Use `src/icons/aiAssistant/toolWindowChat@20x20.svg` for the AI Assistant button in the Right Stripe
- The icon path in the stripe item should be `aiAssistant/toolWindowChat@20x20`

## Plan
1. Update `DEFAULT_RIGHT_STRIPE_ITEMS` in `MainWindow.jsx` to use the new icon path

## Progress
- 2026-03-26: Updated icon path in DEFAULT_RIGHT_STRIPE_ITEMS

## Results
- Changed `ai` stripe item icon from `toolwindows/aiAssistantToolWindow@20x20` to `aiAssistant/toolWindowChat@20x20`
