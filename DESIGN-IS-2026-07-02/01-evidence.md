# Evidence

Consolidated from 3 parallel evidence subagents (structural, copy & honesty, weight & friction) plus direct live-preview inspection (visual, accessibility) performed by the orchestrator against the running Vite dev server.

## Structural Evidence

- **Interactive elements:** 25 static `<button>` definitions (some rendered N times via `.map`, e.g. 12 category pills, 7 quick-access cards, up to 6 live-search suggestions), 7 static `<a>` definitions, 2 `<input>`, 1 `<select>`. Two non-semantic clickable elements: brand logo `<div onClick>` (`Header.tsx:14-16`) and tag `<span onClick>` (`ResourceGrid.tsx:548-556`).
- **Max nesting depth:** 11 DOM levels deep on the resource-card render path (`App.tsx→ResourceGrid.tsx:858→863→880→467→478→479→547→549`).
- **Repeated patterns (not abstracted into shared components):**
  - Card container markup hand-duplicated in 6+ places (`App.tsx:149,194,217,240`; `OverwhelmedRescue.tsx:132`; `ResourceGrid.tsx:467`; `CareerOutlook.tsx:66,101,170`)
  - Category-tag/badge pattern in 4 places (`App.tsx:150-165`; `ResourceGrid.tsx:481-490,715-737,748-757,779-786`)
  - Reset/clear-filter button pattern independently built 4 times (`ResourceGrid.tsx:606-613,641-648,849-855`; `SearchSection.tsx:87-95`)
  - External-link CTA pattern (icon + colored button, opens new tab) in 6+ places (`App.tsx:206-213,229-236,252-259`; `OverwhelmedRescue.tsx:190-199`; `CareerOutlook.tsx:89-97`; `ResourceGrid.tsx:577-586,770-798,813-824`)
  - **Search bar implemented twice, independently** — hero search (`SearchSection.tsx:62-103`, has submit + suggestions dropdown) and directory search (`ResourceGrid.tsx:621-649`, no submit/suggestions) share no code.
  - Toggle/segmented-control pattern hand-rolled 3 times (`ResourceGrid.tsx:664-705` tier toggles, `ResourceGrid.tsx:715-737` category pills, `CareerOutlook.tsx:119-140` sort toggles)
  - Progress/gauge bar markup duplicated back-to-back (`CareerOutlook.tsx:207-218` and `221-232`)
- **Dead code:** `ADVISOR_DIRECTORY` (12 entries) + `Advisor` interface (`resources.ts:27-54`) never imported anywhere; `metricType` field on all 23 `CAREER_OUTLOOK_DATA` entries never read; `QuickCard.resourceIds` + `handleQuickResourceClick` (`App.tsx:25,70-76,143-144`) unreachable — no `QUICK_CARDS` entry sets it; unused default `React` import in `CareerOutlook.tsx:1` and `OverwhelmedRescue.tsx:1`; unused `CareerOutlook` type import (`CareerOutlook.tsx:2`).
- **Data scale:** 162 resource entries, 23 career entries, 11 categories (`resources.ts`).
- **Duplicated subcategory logic:** two parallel, hand-synced systems — `MINI_CATEGORY_ORDER` (`ResourceGrid.tsx:109-173`, a static string list) and `getMiniCategory` (`ResourceGrid.tsx:199-320`, a large switch/keyword-matcher) — both use untyped strings with no compile-time check that they agree.
- Category-style resolution split across two files: `categoryStyles.ts` (`CATEGORY_STYLES`) plus a second, local `ALL_CATEGORY_STYLE` constant defined only in `ResourceGrid.tsx:47-52`.

## Visual Evidence (live preview, orchestrator-measured)

- **Font sizes on screen:** 9 distinct values — `9, 10, 11, 12, 14, 16, 18, 20, 24, 27px` (measured via `getComputedStyle` sweep of homepage).
- **Spacing values on screen:** 14 distinct padding/margin values — `2, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 48, 64px` (plus one negative offset).
- **Border-radius values on screen:** 5 distinct — `0px, 4px, 6px, 8px`, and a full-pill radius.
- **Distinct rendered colors on homepage:** 41 (via computed `color`/`backgroundColor`/`borderColor` sweep). Each of the 11 resource categories carries its own hue pairing (bg/icon/border), e.g. `rgb(246,229,230)/rgb(165,85,90)` (red), `rgb(243,235,217)/rgb(145,129,90)` (gold), `rgb(231,241,237)/rgb(95,131,116)` (green), `rgb(231,240,243)/rgb(95,138,155)` (blue), `rgb(242,232,240)/rgb(139,111,136)` (purple).
- **Contrast:** lowest ratio sampled was 5.08:1 (red-on-pink 9px badge text, "800+ Alumnae" / "Research Day 1"); all sampled text/background pairs cleared WCAG AA (≥4.5:1). No contrast failures found in this pass.
- **States checklist:**
  - Empty state: **present** — searching a nonsense query in the directory view renders "No matched University Resources" + a "Clear Search & Reset Filters" button (`ResourceGrid.tsx:845-855`, confirmed live).
  - Focus state: **missing almost everywhere** — `getComputedStyle` on a focused button and a focused input both returned `outline-style: none` with no visible replacement ring. Only one control sitewide has explicit focus styling: the sector `<select>` in `CareerOutlook.tsx:149` (`focus:border-utah-red`).
  - Loading state: not applicable — all data is static/bundled, no async fetch.
  - Error state: none found — no broken-link/failure UI anywhere.
  - Disabled state: not observed/not applicable — no form validation exists.
  - Global scrollbar suppression: `src/index.css:21-30` sets `scrollbar-width: none` and hides `::-webkit-scrollbar` on **every element** (`*` selector) — removes the native affordance signaling that content is scrollable, sitewide.

## Copy & Honesty Evidence

- **Inflated superlatives without stated backing** (10+ instances): "absolute gold standard," "world-class faculty" (`resources.ts:453`); "America's absolute premier" (`resources.ts:1123`); "world's premier" (`resources.ts:1153`); "absolute scientific credential" (`resources.ts:1259`); "massive physical national stage... gold-standard" (`resources.ts:1241`); "absolute best writing class" (`resources.ts:238`); "ultimate... ALL eligible" (`resources.ts:321`); "powerful sisterhood" (`resources.ts:567`); "elite student leadership" (`resources.ts:601`); "Everything is free" (`CareerOutlook.tsx:107`, unqualified blanket claim).
- **Label → behavior mismatches (honesty-critical):**
  - `App.tsx:206-213,229-236,252-259` — three homepage buttons labeled "Explore SRI and SRI-CAP" / "How to apply for Beckman" / "Learn about ACCESS Scholars" each just call `handleSuggestQuery(...)`, which sets a search term and opens the generic directory — none navigate to program-specific content the label implies.
  - `OverwhelmedRescue.tsx:151-154` — every scenario card's CTA reads **"Go to page"**; clicking it does not navigate anywhere — it only expands an in-page panel (`activeRescueTag` state), with the actual link appearing separately, later, under a different label.
  - `ResourceGrid.tsx:191-196` — `getFeaturedResourceLabel` renders "Find advisors" for a resource that is actually a general advising landing page, not an advisor-lookup tool.
- **Jargon / unclear labels:** "Explore Path" (unclear as a home-nav label, `Header.tsx:40`); "Tier 1: Freshman & Sophomore" / "Tier 2: ..." (`ResourceGrid.tsx:684,705` — "Tier" is internal taxonomy exposed raw); unexpanded acronyms "EDGES," "NDSEG" (`resources.ts:1163,1173`); "Carnegie Tier-1 research profile" (`resources.ts:1268`) never explained; dense "priority Apr 6 – May 4, general through Jul 31" deadline phrasing (`resources.ts:697`) with no plain gloss of "priority vs. general."
- **Dark patterns:** none of the classic commerce patterns (forced continuity, hidden cost, confirmshaming) apply — site has no accounts/payments. One urgency-styling device noted: `animate-bounce` on the crisis-hotline phone icon (`OverwhelmedRescue.tsx:113`) — attached to a real 988 crisis line, not deceptive, but stylistically manufactures urgency.

## Weight & Friction Evidence

- **Production build:** JS `354.48KB` raw / `106.85KB` gzip; CSS `33.32KB` raw / `6.57KB` gzip; total transferred ≈ **113.88KB gzip**. Single JS chunk, single CSS chunk (no code-splitting), 1683 modules.
- **Runtime dependencies include unused weight:** `motion` (Framer Motion successor) and `@google/genai` are listed in `package.json` `dependencies` but **grepped with zero imports anywhere in `src/`** — dead install-time weight, though tree-shaking keeps them out of the shipped bundle (confirmed by the modest 106.85KB gzip JS figure). `express`/`dotenv` are server-only deps irrelevant to this static site.
- **Animation inventory:** no JS animation library in use — all CSS/Tailwind. Two animations run indefinitely while mounted: `animate-pulse` (`CareerOutlook.tsx:49`, Sparkles icon) and `animate-bounce` (`OverwhelmedRescue.tsx:113`, phone icon). Plus ~68 grep hits for `transition-*`/`hover:`/`active:` across 6 files (standard micro-interaction, not idle animation).
- **`prefers-reduced-motion`:** zero matches repo-wide — none of the above animations are gated for motion-sensitive users.
- **Dark mode:** zero support — no `dark:` classes, no `prefers-color-scheme`, no toggle. The one incidental "dark" grep hit (`--color-utah-red-dark`) is a brand-color token name, not a dark-mode feature.
- **Network requests:** same-origin only — 1 HTML + 1 JS + 1 CSS + 1 PNG + 5 favicon/manifest files ≈ 8-9 total requests. Zero third-party requests, no analytics, no external font loading.
- **PWA manifest:** `public/site.webmanifest` is linked (`index.html:10`) and valid, but **no service worker exists anywhere** — the manifest provides "Add to Home Screen" metadata only, no offline caching, despite implying installability.
- **Font-stack note:** `index.css:4` declares `"myriad-pro", "Myriad Pro"` first in the font stack — a licensed Adobe font with no Typekit/`@font-face` link found anywhere, so it silently never loads for any visitor and the stack falls through to Segoe UI/Arial/system-ui.

## Known Gaps

- External URL liveness/correctness (~140 links) not verified by HTTP request — content read from source only.
- True Lighthouse metrics (TTI, LCP, TBT) not measured — bundle-size/request-count evidence above is a proxy, not a substitute.
- `src/lib/search.ts` internals not fully traced beyond its exported signature; Fuse.js fuzzy-match quality was validated in a prior session (see project memory), not re-verified here.
- Keyboard-only navigation was spot-checked (focus-outline computed styles) but a full tab-order walk across all ~35 interactive elements was not performed.
