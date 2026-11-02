# Verdict: REDESIGN

**Total score: 12/30**, with no principle above 2/3 and two principles (Honest, As-little-design-as-possible) at or near the floor — this is not one weak spot, it's a pattern across usefulness, understandability, aesthetics, unobtrusiveness, honesty, and thoroughness, so the bones need rework rather than a targeted polish pass.

## Why redesign and not refine

Total is well under the REFINE threshold (≥20), and the failures are structural, not cosmetic: the site's real content (162 resource entries, a working fuzzy search, a genuine triage concept) is undermined by a shell that promises more than it delivers (CTAs that don't navigate where they claim) and by a codebase where every recurring UI pattern — search bar, reset button, card, subcategory logic — was hand-rebuilt instead of shared. Restyling in place would leave the label/behavior mismatches and the duplicated-component debt untouched.

## Top 5 highest-leverage moves

1. **#6 Honest** — Fix every label→behavior mismatch: the three homepage CTAs ("Explore SRI and SRI-CAP," "How to apply for Beckman," "Learn about ACCESS Scholars," `App.tsx:206-259`) must either land on real program-specific content or be relabeled to say what they actually do (run a search). Same for "Go to page" (`OverwhelmedRescue.tsx:151-154`), which currently expands an in-page panel instead of navigating.
2. **#10 As little design as possible** — Consolidate duplicated implementations into single shared components: one `SearchBar` (currently built twice independently — `SearchSection.tsx:62-103` and `ResourceGrid.tsx:621-649`), one `Card`, one `ResetFiltersButton` (currently 4 hand-rolled copies), and one subcategory-resolution source of truth (currently `MINI_CATEGORY_ORDER` and `getMiniCategory` are two hand-synced systems, `ResourceGrid.tsx:109-320`). Delete the fully-unused `ADVISOR_DIRECTORY` (`resources.ts:27-54`).
3. **#3/#5 Aesthetic & unobtrusive** — Cut the color system from 41 rendered colors / 11 per-category hues down to a constrained palette (utah-red + neutrals, with at most 2-3 accent hues total) so category color-coding stops competing with the resource content it's labeling.
4. **#8 Thorough** — Add a real, visible focus-visible ring across all ~35 interactive elements (currently `outline-style: none` on everything except one `<select>`), and remove the sitewide `scrollbar-width: none` (`index.css:21-30`) that hides the native scroll affordance.
5. **#4 Understandable** — Replace or gloss jargon exposed directly to students: "Explore Path" → a clear label like "Home"; "Tier 1/Tier 2" → plain year-based language; expand acronyms ("EDGES," "NDSEG") inline.
