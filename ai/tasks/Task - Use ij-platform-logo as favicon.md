# Task - Use ij-platform-logo as favicon

## Goal
Use the `ij-platform-logo.svg` icon as the browser favicon for the app.

## Requirements
- Use `src/icons/ij-platform-logo.svg` as the favicon
- The favicon should display in the browser tab

## Plan
1. Copy SVG to `public/favicon.svg` (CRA only serves files from `public/`)
2. Update `public/index.html` favicon link to point to the SVG

## Progress
- 2026-03-25: Task started

## Results
- Copied SVG to `public/favicon.svg`
- Updated `public/index.html` to use `favicon.svg` instead of `favicon.ico`
