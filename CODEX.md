# NASCAR Corner Coach

## Purpose
- Build a static visual coaching tool for NASCAR Cup cornering at Kansas Speedway Turn 1.
- Keep the app instructional, not game-like.
- Make every scenario teach four things clearly: what the driver did, what the car did, why it happened, and what to change next time.

## Codex Working Rules
- Codex should work in tight, small iterations instead of making one large blind pass.
- After each meaningful change, run the app locally, validate behavior, inspect the visuals, check for errors, and refine before moving on.
- If the UI is visually confusing, incomplete, or broken, treat that as a bug and fix it before adding more scope.
- Prefer actually implementing and validating changes in this workspace instead of only describing them.
- After each substantial pass, write a short memory log in `memories/` as a Markdown file so a future thread can recover project context quickly.
- Each memory log should capture: current state, what changed, validation performed, known problems, and the most important next steps.

## Tech Constraints
- Keep the project fully static and GitHub Pages compatible.
- Use a single `index.html` for app code unless the user explicitly expands scope.
- Load `p5.js` by CDN.
- Load Tailwind by CDN.
- Do not add frameworks, bundlers, or a build step.

## Browser Validation
- Use Google Chrome as the primary validation path whenever the environment allows it.
- After meaningful UI or playback changes, open or refresh the local page and inspect:
  - layout
  - animation smoothness
  - line clarity
  - telemetry readability
  - scenario distinction
  - console/runtime errors
- If direct browser inspection is limited, use the best available fallback such as screenshots or headless validation and note what was actually verified.

## Scenario Contract
- Use preset timeline playback, not a physics engine.
- Each scenario keyframe should include:
  - `t`
  - `x`, `y`
  - `heading`
  - `steering`
  - `brake`
  - `throttle`
  - `gripLat`, `gripLong`
  - `phase`
  - `calloutIndex`
- Interpolate between keyframes for smooth motion and telemetry updates.
- Keep the ideal reference line visible while the active scenario is shown.

## UI Rules
- Left side: p5 canvas with track geometry, ideal line, active scenario line, and animated car.
- Right side: grip circle, steering/brake/throttle bars, phase readout, and coaching panel.
- Bottom: playback controls and scenario selector.
- Scenario differences must be visually obvious without reading the code.
- Coaching text must stay simple, beginner-friendly, and ordered as:
  1. what the driver did
  2. what the car did
  3. why
  4. what to change

## Definition Of Done
- The page loads without JavaScript errors.
- The canvas renders correctly.
- Playback is smooth.
- Play/pause/restart work correctly.
- Scenario switching works correctly.
- Telemetry updates live with playback.
- Coaching text stays synchronized with the replay.
- The current set of scenarios is visually distinct and easy to understand.

## Memory Logs
- Store pass summaries in `memories/`.
- Use filenames like `YYYY-MM-DD-pass-001.md`, `YYYY-MM-DD-pass-002.md`, and so on.
- Keep each memory concise and practical for a future Codex session:
  - current baseline
  - important changes made
  - how the app was validated
  - what still feels wrong
  - the next recommended pass
