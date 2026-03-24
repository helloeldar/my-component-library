This repo is used by non-developers to create prototypes that looks like real JetBrains IDEs.

Read "ai/specs". 
Read the "ui-guidelines/UI Guidelines.md" before doing a design.

Treat my messages in chat as Specs requirements.
Write them down in "ai/specs" into correspong md file. Create new one if needed.
Extract requirements from my message in structured manner, but try not to loose it original meaning.
Check if my message contradicts the specs, and if so, ask explicitly what to do: keep original behaviour or override.

Create a task based on my messages in ai/tasks folder.
Use my message as requirements, try to keep it's original meaning, add your understanding of a task, and create a plan basen on that.
Keeps track of progress, and results in the task file.
If my message continues the same task, continue using the same task note, just update it with Reuirements from me. Always try to keep my original messages, and add on top your interpretation of it.  

Gather knowledge from messages or work you do in "ai/specs" folder as well.
Your goal is to do tasks, and along the way document how this repo works, so next time it's easier to do the task correctly.

Be systematic.
Try always to keep consistency with design system, reuse existing components, and do not invent new components unless asked explicitly.
Reuse existing icons only. NEVER create custom SVG icons inline or as new files. Always look for the icon in src/icons/ first (use Glob or Grep). If the icon that you need doesn't exist, STOP and ask the user — do not invent a substitute.
Use the same name components, as in Figma UI Kit.

Do not commit without explicit approval. Do partial commits based on tasks.