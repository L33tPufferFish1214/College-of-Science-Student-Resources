# Plan 02 — Make it look like a University of Utah site

**Goal:** re-skin the College of Science Student Resource Guide so a student landing on it recognises it instantly as a U of U page, using the visual language of `utah.edu` and `science.utah.edu`.

**Status:** **Version A chosen and implemented** (2026-09-21). See §7 for what shipped and what is still open.

---

## 1. What exists today

Single-page React 19 + TS + Vite + Tailwind v4 app, no router, no test framework, deployed to GitHub Pages under base `/College-of-Science-Student-Resources/`.

| File | Lines | Role |
|---|---|---|
| `src/data/resources.ts` | 3879 | 241 resources, 11 categories, 9 departments, advisor directory, career data |
| `src/components/ResourceGrid.tsx` | 1050 | directory: filters, search, grouped card grid |
| `src/App.tsx` | 471 | shell + `activeView` string switch (home / resources / careers / overwhelmed) |
| `src/components/CareerOutlook.tsx` | 244 | career salary/growth view |
| `src/components/OverwhelmedRescue.tsx` | 221 | "Feeling Lost?" triage |
| `src/components/SearchSection.tsx` | 131 | homepage hero + Fuse.js live suggestions |
| `src/components/Header.tsx` | 91 | sticky white header |
| `src/data/categoryStyles.ts` | 80 | 11 per-category colour objects |
| `src/index.css` | 45 | the entire design system: one Tailwind `@theme` block |

**View switching** is `useState` + `history.pushState`, not a router (`App.tsx:47-70`). A redesign does not need to change that.

**What's already right:** `--color-utah-red: #be0000` and body text `#47494a` are *exact* matches for what `science.utah.edu` actually renders. Whoever set those did the homework.

**What's wrong, visually:** the page reads as a generic SaaS dashboard, not a U page —
- everything is `rounded-lg`; the U template has **zero** border radius anywhere
- no photography at all (the U leads with full-bleed images on every page)
- the header is white and light; every U site opens with a **black masthead bar**
- the footer is one centred line; U footers are black, multi-column, with the institutional lockup
- `font-sans` declares `"myriad-pro"`, which is an Adobe Typekit font the site has no licence for — every visitor silently falls back to Segoe UI
- 11 category accent colours compete with the content (flagged in the Rams audit as well)

---

## 2. The U design system, as measured

Sampled live from `utah.edu` and `science.utah.edu` on 2026-09-21 (computed styles, not guesses).

### Colour
| Token | Value | Where it appears |
|---|---|---|
| Crimson | `#BE0000` | buttons, rules, accents, panels — 286 rendered uses |
| Ink | `#372C2C` | `utah.edu` body copy (warm near-black) |
| Body | `#47494A` | `science.utah.edu` body copy |
| Black | `#000000` | masthead bar, footer |
| Charcoal | `#1B1B1B` / `#333333` | secondary dark bands, dark buttons |
| Warm grey | `#9D9595` | captions, eyebrows |
| Rule | `#D5D5D5` | hairlines |

There is no secondary accent hue. The whole site is crimson, black, white and grey.

### Type
The U licenses four Adobe Typekit families. **We cannot use them** — they're per-domain licensed and this is a GitHub Pages student site. Free stand-ins, matched by voice:

| U font | Role | Our substitute |
|---|---|---|
| `myriad-pro` | body, 17px base | **Source Sans 3** (Adobe's own open humanist sans) |
| `factoria` | headings (slab) | **Zilla Slab** |
| `industry` | condensed display, stats, wordmark | **Barlow Condensed** |
| `trajan-pro-3` | ceremonial only | not needed |

Base size is **17px**, line-height ~1.6. Buttons are 13px, weight 700, uppercase, letter-spacing ~0.08em.

### Geometry and components
- **`border-radius: 0` on everything.** This single change does more than any other to make the site read as a U page.
- Masthead: black, 72px, U logo left → 1px divider → unit name in condensed uppercase, nav right in 12.5px uppercase with a crimson bottom-border on hover.
- Buttons: square, uppercase, generous horizontal padding (`13px 26px`), solid crimson or outlined.
- Section heads: centred, slab serif, short 56×3px crimson rule beneath.
- Cards: white, 1px hairline border, photo on top, square, red "READ MORE" button at the bottom.
- Stat/fact grid: condensed display numeral in crimson, label beneath, thin grid dividers.
- Split panel: solid crimson block (with the U monogram and a subtle pattern) beside a content grid — the "Get to Know the U" device.
- Footer: black, 5 columns of small uppercase links, centred institutional lockup with address, thin baseline bar.
- Hero: full-bleed photo, dark gradient scrim, centred white headline, one red CTA, carousel with line-dots.

---

## 3. Imagery

Real College of Science photography, confirmed loading cross-origin with `referrerpolicy="no-referrer"`:

| Use | URL (under `https://science.utah.edu/wp-content/uploads/`) |
|---|---|
| Students in chem lab | `2019/09/2000x1333-Students-ChemLab-E.jpg` |
| Students, candid | `2020/12/CollegeofScience_Students-303-scaled.jpg` |
| Students, advising desk | `2021/01/CollegeofScience_Students-318-scaled.jpg` |
| Advising Hive | `2021/01/Advising-Hive-Collage2-3.png` |
| Crocker Science Center exterior | `2025/11/Crocker-Exterior.jpg` |
| Bioinformatics / DNA | `2025/11/BioinformaticsWeb-scaled-1.jpg` |
| Lab stock | `2020/09/2000x1333-STOCK-Lab-A.jpg` |
| Beckman logo | `2020/03/2000x1333_Beckman-Logo-A.jpg` |
| Background pattern | `2019/05/pattern1.png` |
| U horizontal logo (white) | `wp-content/themes/umctheme3/img/uu-logo-hrz.png` |
| U institutional lockup | `wp-content/themes/umctheme3/img/uu-institutional.png` |

**Flag, not a blocker.** These are the College's photographs and the U's registered trademarks, and the README already states this is an unofficial student project. Hotlinking them is fine for these mockups. Before this goes live I'd do one of:
1. email College of Science communications, describe the project, ask for permission and a small set of approved images — the likeliest and cleanest outcome; or
2. swap to CC0 / university-neutral photography and keep only the "not an official University of Utah website" disclaimer, no U logo.

Either way: **download the chosen images into `public/img/`** rather than hotlinking, so the site doesn't break when a WordPress upload path changes, and so it isn't leeching the College's bandwidth. Convert to WebP at ~1600px wide.

---

## 4. The three directions

All three share the same masthead, footer, colour, type and square geometry — they differ in how much the page behaves like a *brochure* versus a *tool*.

| | A — Official Template | B — U Brand, Utility First | C — Crimson Editorial |
|---|---|---|---|
| File | `plans/mockups/a-official-template.html` | `plans/mockups/b-utility-first.html` | `plans/mockups/c-crimson-editorial.html` |
| Hero | 560px photo carousel, 3 slides | 62px-padded photo band, search sits on it | crimson/photo split, search on the seam |
| Browse | 8 tiles in a bordered grid | crimson panel + 9-tile grid | oversized numbered list, 8 rows |
| Resources | photo cards, 3-up | dense text rows with category chips | — |
| Featured | photo cards on a pattern band | glass panels on a fixed photo | alternating full-width photo rows |
| Photos | 8+, one per card | 3, as bands only | 5, large |
| Feel | "this is the College of Science website" | "this is the College of Science's search tool" | "this is a College of Science campaign" |

### A — Official Template
The `umctheme3` page pattern, cloned, with our content in it. Highest brand fidelity: if you put it next to `science.utah.edu/students/` most people wouldn't spot the difference.

*Cost:* a resource directory is not a news site. Photo-topped cards work for three featured items and fall apart at 241. Every entry needs an image it doesn't have, and the carousel delays the search box by 560px of scroll.

### B — U Brand, Utility First ← **recommended**
Identical U chrome; the body is honest about being a search tool. The search box is above the fold and *on* the hero photo. Categories reuse the "Get to Know the U" split panel with real resource counts. Results are dense text rows — the format that actually scales to 241 entries and scans fastest on a phone.

*Why this one:* it's the only version where the brand costs nothing in speed. A stressed student looking for a permission code at 11pm reaches the search box immediately, and the page still unmistakably belongs to the U. It also fits the existing components with the least surgery — `SearchSection` and `ResourceGrid` keep their structure and get new skins.

### C — Crimson Editorial
The U's boldest register: the "ON THE RISE!" split panel scaled up into the page's organising device, oversized condensed uppercase, alternating full-bleed bands. Genuinely striking, and the numbered category list is the best browse experience of the three.

*Cost:* heaviest scroll, most photography to source and licence, and the marketing-campaign tone sits oddly on a page whose job includes crisis lines and the food pantry.

**Mixing is fine and probably right:** B's shell with C's numbered category list is a strong combination, and A's photo cards are the right treatment for the three featured programs specifically.

---

## 5. Implementation, once a direction is picked

Phases are ordered so each one leaves the site working.

### Phase 1 — Brand tokens (`src/index.css`, ~40 lines)
Replace the `@theme` block. Add `--color-utah-black`, `--color-utah-char`, `--color-utah-ink`, `--color-utah-warm`, `--color-utah-rule`; point `--font-sans` at Source Sans 3, add `--font-slab` (Zilla Slab) and `--font-display` (Barlow Condensed) with a Google Fonts `@import`; set `--radius-*` to `0`. Delete the `scrollbar-width: none` block — the Rams audit flagged it and it's one line.

Self-check: the site renders unchanged in structure but square and re-typed. Nothing else has to move.

### Phase 2 — Masthead + footer (`Header.tsx`, `App.tsx` footer)
Black bar with the U logo, divider, "COLLEGE OF SCIENCE" in condensed uppercase, nav right with crimson hover underline, plus a working hamburger under 760px (the mockups omit mobile nav). Replace the one-line footer with the 5-column black footer, keeping the disclaimer prominent.

These two components are ~120 lines total and set 80% of the perceived brand.

### Phase 3 — Hero + search (`SearchSection.tsx`)
Photo band with gradient scrim, eyebrow, slab headline, search box on the scrim, popular-search chips. The Fuse.js suggestion dropdown logic is unchanged — only the container is restyled.

### Phase 4 — Category tiles + resource rows (`App.tsx`, `ResourceGrid.tsx`)
The big one. Replace the quick-card grid and spotlight grid with the split-panel tile grid; convert the resource card to the dense row format. Collapse `categoryStyles.ts` from 11 hue objects to crimson / ink / neutral — the audit already called for this, and the U palette forces it.

### Phase 5 — Images (`public/img/`)
Download the approved image set, convert to WebP, add `width`/`height` and `loading="lazy"` on everything below the fold.

### Phase 6 — Carry over the outstanding audit items
From `plans/01-redesign-resource-guide.md`, still valid and **not** superseded by this plan:
- Phase 1 (honesty: CTA labels that match behaviour, "Tier" → year language, strip superlatives)
- Phase 3 (visible `focus-visible` rings on all ~35 interactive elements)
- Phase 4 (one shared `SearchBar`, one `Card`, one reset button)

Plan 01's **Phase 2 is superseded** — its custom type/colour scale is replaced by the U brand kit above.

### Verification
`npm run lint` (`tsc --noEmit`) and `npm run build` after each phase, plus a browser pass at 1440px and 375px checking: no horizontal overflow, focus rings visible, contrast ≥ 4.5:1 on crimson-on-white text (`#BE0000` on white = 6.6:1, passes both AA levels; white on crimson is the same ratio).

---

## 6. Open questions for you

1. **Which direction** — A, B, C, or a specific hybrid?
2. **Images** — do you want to email College of Science communications for permission, or go with neutral stock and drop the U logo?
3. **Scope** — homepage only for now, or roll the same treatment through the directory, careers and "Feeling Lost?" views in the same pass?

---

## 7. What shipped (Version A, 2026-09-21)

Version A implemented across all four views. `npm run lint` and `npm run build` pass; every view checked at desktop and 375px with no horizontal overflow and no console errors.

| File | Change |
|---|---|
| `src/index.css` | U brand kit: Google Fonts import, `--font-slab` / `--font-display`, seven `--color-utah-*` tokens, **all `--radius-*` zeroed**, 17px base, global `:focus-visible` ring (white variant under `.on-dark`), `prefers-reduced-motion` block. Deleted the scrollbar-hiding rule. |
| `src/data/images.ts` | **New.** Every image URL in one module so the whole site's imagery swaps in one edit. |
| `src/components/Header.tsx` | Rewritten: black 72px masthead, U lockup + divider + condensed unit name, crimson underline nav, working hamburger below 1024px. |
| `src/components/SearchSection.tsx` | Rewritten: 3-slide photo carousel (pauses on hover/focus, respects reduced motion, labelled dots and arrows) + search band beneath. |
| `src/App.tsx` | Rewritten homepage: Start Here photo cards, Browse by Need category strip, Career Accelerators on the pattern band, crimson triage band, black 5-column footer. |
| `src/components/ResourceGrid.tsx` | Restyled throughout: square filters, slab card titles, solid category chips, crimson deadline bars, U button set, new empty state. |
| `src/components/OverwhelmedRescue.tsx` | Rewritten: photo page banner, crimson 988 bar pinned above the fold, 4-tile triage grid, in-place detail panel. |
| `src/components/CareerOutlook.tsx` | Restyled: slab headings, square controls, condensed display numerals, square progress bars. |
| `src/data/categoryStyles.ts` | 11 hue objects → 2 tones (neutral ink, crimson for the genuinely urgent categories). |

### Fixed along the way

- **The resource count was wrong everywhere.** The README, the audit and my own mockups all said 162; the data actually holds **241**. The homepage headline and the directory link now read `RESOURCES_DATA.length` instead of a typed-in number, so this can't drift again. Per-category tile counts are computed the same way.
- **"Feeling Lost?" scenarios never showed their answer.** `handleRescueSelect` set the active tag *and* called `onSuggestQuery`, which navigates to the directory — so the detail panel it had just opened was unmounted before anyone saw it. Clicking now reveals the panel in place; navigation is on explicit buttons.
- **Audit carry-overs** (plan 01, phases 1 and 3): "Tier 1/2" → year language, focus rings on every interactive element in one CSS rule, scrollbars restored, "Everything is free…" in `CareerOutlook` qualified to the three services it actually covers.

### Still open

1. **Image permission.** Still hotlinking `science.utah.edu`. Decide between asking College of Science communications or switching to neutral stock, then point `src/data/images.ts` at `public/img/`.
2. **The U logo and wordmark** are trademarks on a site the README calls unofficial. Same conversation as (1).
3. **Plan 01 phase 4** — shared `SearchBar` / `Card` / reset-button components — not done. `SearchSection` and `ResourceGrid` still build their own search input.
4. **Remaining audit copy fixes** — the unbacked superlatives in `resources.ts` (plan 01, step 1e) and the EDGES/NDSEG acronym expansions.
