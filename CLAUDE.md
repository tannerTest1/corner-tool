# NASCAR Corner Coach

## Project Purpose
- Build a static visual coaching tool that teaches NASCAR Cup car cornering at Kansas Speedway Turn 1.
- The app is instructional, not a game.
- Every scenario must make four things obvious: what the driver did, what the car did, why it happened, and what to change next time.

## Tech Constraints
- Keep the project GitHub Pages compatible.
- Use a single `index.html` for all app code.
- Load `p5.js` by CDN.
- Load Tailwind by CDN.
- Do not introduce frameworks, bundlers, or a build step.

## Iterative Workflow Rules
- Work in small milestones.
- After every meaningful change: run locally, refresh the app, inspect the UI, inspect animation smoothness, check for errors, fix issues, and repeat.
- Do not move forward while the current state is visually confusing or broken.

## Chrome Validation Requirement
- Use Google Chrome as the primary validation tool whenever the environment allows it.
- After meaningful UI or playback changes, open or refresh the local page in Chrome and inspect layout, animation, visibility, and clarity.
- If browser tooling is limited, document the expected visual result and keep iterating toward clarity anyway.

## Scenario Structure
- Use preset timeline data, not a physics engine.
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
- Use interpolation between keyframes for smooth playback.
- Keep the ideal reference line visible while the active scenario plays.

## UI Layout Rules
- Left side: p5 canvas with track, ideal line, scenario line, and animated car.
- Right side: grip circle, steering/brake/throttle bars, phase readout, and coaching panel.
- Bottom: play/pause, restart, and scenario selector.
- The active scenario must be visually distinct from the ideal line and from the other scenarios.

## Definition Of Done
- Page loads locally with no JavaScript errors.
- Canvas renders correctly.
- Car animation is smooth.
- Play/pause/restart work correctly.
- Scenario selector changes the replay correctly.
- Telemetry updates live with playback.
- Coaching text stays synchronized and beginner-friendly.
- The first four scenarios are clearly distinguishable at a glance.
