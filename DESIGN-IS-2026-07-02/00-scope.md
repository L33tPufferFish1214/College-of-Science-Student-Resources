# Scope

**Audited:** College of Science Student Resource Guide — full single-page React app (repo: `college-of-science-student-resources`, live at l33tpufferfish1214.github.io/College-of-Science-Student-Resources/).

**Surfaces in scope:**
- `src/App.tsx` — page shell, section layout
- `src/components/Header.tsx` — hero/header
- `src/components/SearchSection.tsx` — search bar + Fuse.js live-suggestion dropdown
- `src/components/ResourceGrid.tsx` — category filters + resource card grid (890 lines, largest surface)
- `src/components/OverwhelmedRescue.tsx` — "quick access" / triage component
- `src/components/CareerOutlook.tsx` — career data section
- `src/index.css`, Tailwind config — design tokens

**Primary user:** University of Utah College of Science student, often stressed/time-pressured, trying to find a specific support resource (advising, scholarships, mental health, research, career).

**Primary task:** Locate the right resource and reach its official page in as few steps as possible — via search or category browse.

**Constraints:** Static site (GitHub Pages), no backend, solo student maintainer, React + TS + Vite + Tailwind, no design system/component library in use.

**Reference designs / competitors:** None supplied by user. Implicit competitor is the official University of Utah site information architecture, which this project exists to simplify.

**Input materials:** Live dev server (localhost via Vite), full source tree.
