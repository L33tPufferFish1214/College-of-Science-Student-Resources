```
/make-plan Redesign the College of Science Student Resource Guide (React/TS/Vite/Tailwind single-page app). Current design failed a Dieter Rams audit at 12/30 with critical gaps in principles #3 (aesthetic), #4 (understandable), #5 (unobtrusive), #6 (honest), #8 (thorough), and #10 (as little design as possible).

Verdict paragraph (quoted from audit):
> Total score 12/30, with no principle above 2/3 and two principles (Honest, As-little-design-as-possible) at or near the floor — this is not one weak spot, it's a pattern across usefulness, understandability, aesthetics, unobtrusiveness, honesty, and thoroughness, so the bones need rework rather than a targeted polish pass.

Why redesign and not refine: Total is well under the refine threshold (≥20/30), and the failures are structural, not cosmetic — CTAs promise navigation to specific content and instead run a generic search or do nothing, and every recurring UI pattern (search bar, reset button, card, subcategory logic) was hand-rebuilt in 2-6 places instead of shared. Restyling in place would leave the label/behavior mismatches and duplicated-component debt untouched.

Preserve from current design:
- Brand tokens: utah-red (`#be0000`), utah-red-dark (`#8c0000`), neutral grays, University of Utah logo lockup — `src/index.css:3-13`, `src/components/Header.tsx`
- The 162-entry resource dataset and its content (`src/data/resources.ts`) — the underlying information is good; only the presentation/copy layer needs rework
- Fuse.js fuzzy-search engine (`src/lib/search.ts`) — verified working (typo/related-term matching) in a prior session; keep the search logic, rebuild only its UI shell
- The "Feeling Overwhelmed" scenario-based triage concept (`src/components/OverwhelmedRescue.tsx`) — the idea of routing by student situation rather than a flat category list is the one genuinely differentiated part of this product; keep the concept, rebuild the execution (see Discard)

Discard:
- Two independently hand-built search bars (`src/components/SearchSection.tsx:62-103` and `src/components/ResourceGrid.tsx:621-649`) with no shared code. Caused failure on principle #10.
- Card markup hand-duplicated in 6+ places (`App.tsx:149,194,217,240`; `OverwhelmedRescue.tsx:132`; `ResourceGrid.tsx:467`; `CareerOutlook.tsx:66,101,170`) instead of one shared Card component. Caused failure on principle #10.
- Reset/clear-filter button hand-built 4 separate times (`ResourceGrid.tsx:606-613,641-648,849-855`; `SearchSection.tsx:87-95`). Caused failure on principle #10.
- Two parallel, hand-synced subcategory systems — `MINI_CATEGORY_ORDER` (`ResourceGrid.tsx:109-173`) and the `getMiniCategory` switch (`ResourceGrid.tsx:199-320`) — both untyped strings with no compile-time check they agree. Caused failure on principle #10.
- Three homepage CTAs that promise dedicated content but only run a keyword search: "Explore SRI and SRI-CAP," "How to apply for Beckman," "Learn about ACCESS Scholars" (`App.tsx:206-259`). Caused failure on principle #6.
- "Go to page" CTA on every scenario card that does not navigate — it only expands an in-page panel (`OverwhelmedRescue.tsx:151-154`). Caused failure on principles #4 and #6.
- The 11-hue per-category color-coding system (`src/data/categoryStyles.ts`, `ResourceGrid.tsx:481-490,715-737,748-757,779-786`) that produces 41 distinct rendered colors on one screen. Caused failure on principles #3 and #5.
- Fully unused `ADVISOR_DIRECTORY` (12 entries) and `Advisor` interface (`resources.ts:27-54`), unused `metricType` field, unused `React` default imports in `CareerOutlook.tsx`/`OverwhelmedRescue.tsx`, and the unreachable `QuickCard.resourceIds` branch (`App.tsx:25,70-76,143-144`). Dead weight, caused failure on principle #10.
- Sitewide `scrollbar-width: none` (`index.css:21-30`) that hides the native scroll affordance on every element. Caused failure on principle #8.

Top 5 moves from the audit:
1. #6 Honest: Every CTA must do what its label says — either build real destination content for the SRI/Beckman/ACCESS programs or relabel those buttons as "Search for X"; make "Go to page" actually navigate. Evidence: `App.tsx:206-259`, `OverwhelmedRescue.tsx:151-154`.
2. #10 As little design as possible: Build one shared `SearchBar`, one shared `Card`, one shared `ResetFiltersButton`, and one single source of truth for subcategory ordering/labeling. Evidence: `ResourceGrid.tsx:109-320,606-855`, `SearchSection.tsx:62-103`.
3. #3/#5 Aesthetic & unobtrusive: Replace the 11-hue category color system with a constrained palette (utah-red + neutrals + at most 2-3 accents total) so category tags stop competing with the resource content. Evidence: 41 distinct rendered colors measured live on the homepage.
4. #8 Thorough: Add a real, visible focus-visible ring across all ~35 interactive elements (currently `outline-style: none` on everything but one `<select>`), and remove the global scrollbar-hiding CSS. Evidence: live `getComputedStyle` check, `index.css:21-30`.
5. #4 Understandable: Replace or gloss jargon exposed directly to students — "Explore Path" → "Home"; "Tier 1/Tier 2" → plain year-based labels ("First & Second Year" / "Upperclassmen & Graduate"); expand acronyms ("EDGES," "NDSEG") inline on first use.

Redesign principles in priority order:
1. #6 Honest — every interactive element's label matches its actual behavior with zero exceptions; no CTA implies unique content that doesn't exist.
2. #10 As little design as possible — one implementation per recurring pattern (search, card, filter-reset, category/subcategory resolution); delete all confirmed-dead code and data.
3. #8 Thorough — every interactive element has a real focus-visible state; native browser affordances (like scrollbars) are never globally suppressed without a deliberate, tested replacement; motion respects `prefers-reduced-motion`.

Deliverables for the plan:
- New information architecture for the homepage (not derived from the current four-section stack of header/hero/quick-cards/rescue/featured — decide what actually needs to appear before the directory, if anything)
- New primary flow: student describes their need → reaches the correct official resource page in the fewest steps, compared side-by-side against the current CTA-to-search-detour flow
- A small, explicit design-token set: one constrained color palette (replacing the 11-hue category system), a real type scale (replacing the current 9 ad hoc font sizes), a real spacing scale (replacing the current 14 ad hoc values)
- A motion spec: which elements animate, why, and how they degrade under `prefers-reduced-motion` (currently zero elements respect it) — e.g. the existing `fadeIn` entrance on hero content and cards is fine to keep as a *purposeful* directional cue, but gate it behind the media query; the two infinite/idle animations (`animate-pulse` on the Sparkles icon in `CareerOutlook.tsx:49`, `animate-bounce` on the crisis-line phone icon in `OverwhelmedRescue.tsx:113`) should either be removed or justified (the crisis-line bounce may be worth keeping deliberately, since drawing attention to a 988 hotline is a legitimate use of urgency — but it still needs the reduced-motion escape hatch)
- States checklist: empty (already solid, preserve it), loading (N/A, static data), error, success, focus (currently missing — highest-priority gap), disabled
- Migration path: this is a solo-maintained static site with no user accounts, so "migration" is just replacing the deployed build — no phased user cutover needed beyond a normal deploy
- Cutover criteria: new design ships once the honesty fixes (CTA relabeling/re-linking) and the focus-visible pass are both verified live in the browser preview, not just in code

Anti-patterns to guard against:
- Porting the old four-hue-per-category badge system under new class names
- Keeping the duplicated search bars/cards "for now" behind a flag
- Adding animation for its own sake — every new motion needs a functional reason (drawing attention to a real state change) and a `prefers-reduced-motion` fallback
- Treating this Preserve list as optional — the resource data, the Fuse.js search, and the triage concept are the real value here; don't throw those out with the shell
```
