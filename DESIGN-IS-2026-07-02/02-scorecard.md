## 1. Good design is innovative — Score: 2/3
   Evidence: `OverwhelmedRescue.tsx` scenario-based triage flow is a genuine (if modest) improvement over a flat resource list — see 01-evidence.md structural + copy sections. Undercut by three "featured" CTAs (`App.tsx:206-259`) that dress up a generic search as a unique feature.
   Justification: Refreshes an existing directory/FAQ pattern with a clear improvement (triage-by-scenario), but introduces nothing peer products don't already do, and part of the "new" surface is a facade over ordinary search.

## 2. Good design makes a product useful — Score: 1/3
   Evidence: Core search/browse/filter/empty-state flow works end-to-end (confirmed live). But `App.tsx:206-259` (3 CTAs) and `OverwhelmedRescue.tsx:151-154` ("Go to page") redirect into a generic search or a no-op reveal instead of the specific action their label promises.
   Justification: Primary task (find and reach a resource) completes for most paths, but several prominent CTAs add an unnecessary detour/false expectation rather than doing what they say — worse than "adjacent surface adds steps," better than "task not supported."

## 3. Good design is aesthetic — Score: 1/3
   Evidence: 41 distinct rendered colors, 9 font sizes (9–27px), 14 spacing values, and 5 border-radius values measured on a single homepage load (01-evidence.md, Visual Evidence).
   Justification: No single tight visible system — each of 11 categories carries its own hue pairing, multiplying the palette well past "1-2 minor inconsistencies"; this is systemic variance, not isolated noise, so it sits at the low end rather than the floor (a recognizable red/neutral base shell does exist).

## 4. Good design makes a product understandable — Score: 1/3
   Evidence: "Explore Path" (unclear home-nav label, `Header.tsx:40`), "Tier 1/Tier 2" (unexplained taxonomy, `ResourceGrid.tsx:684,705`), unexpanded acronyms ("EDGES," "NDSEG"), and "Go to page" (label implies navigation, delivers an in-page reveal, `OverwhelmedRescue.tsx:151-154`).
   Justification: More than 2-3 controls/labels are unclear or actively misleading about what they do, which is worse than "needs a tooltip" but the primary search action itself remains identifiable without help.

## 5. Good design is unobtrusive — Score: 1/3
   Evidence: Homepage stacks header nav + hero + 7 quick-access cards + overwhelmed-rescue section + featured-programs section, each independently colored, before the actual resource content — plus the 11-hue category-tag system recurring in 4 places (01-evidence.md, Structural + Visual).
   Justification: Decorative chrome (color-coded badges, accent bars, per-category hues) actively competes with the content it's labeling rather than receding behind it.

## 6. Good design is honest — Score: 1/3
   Evidence: 10+ unbacked superlatives ("absolute gold standard," "world's premier," "ultimate... ALL eligible," "Everything is free") plus three CTAs (`App.tsx:206-259`) and one scenario-card CTA (`OverwhelmedRescue.tsx:151-154`) whose label promises a specific action the code does not perform.
   Justification: Comfortably clears "2+ inflations" and adds label/behavior mismatches on top, but none of it is a classic deceptive commercial flow (no payments, no forced continuity, no hidden cost) — so it stays at 1 rather than the floor.

## 7. Good design is long-lasting — Score: 2/3
   Evidence: Visual language (rounded cards, soft pastel tags, red/white U-branding, plain sans-serif) has no glassmorphism/neumorphism/heavy-gradient trend markers. One aging risk: the 11-hue pastel category-tag system reads as a very "2020s SaaS tag" convention (01-evidence.md Visual Evidence).
   Justification: One dated-trend marker (multi-color tag system), otherwise a fairly neutral, era-agnostic shell.

## 8. Good design is thorough down to the last detail — Score: 1/3
   Evidence: Focus state is visually absent on all but one of ~35 interactive elements (`outline-style: none` measured live on a focused button and input, only `CareerOutlook.tsx:149`'s select has a focus style); `index.css:21-30` hides the native scrollbar sitewide via `scrollbar-width: none`. Empty state, by contrast, is well-handled (`ResourceGrid.tsx:845-855`, confirmed live).
   Justification: Two concrete, load-bearing detail gaps (missing focus rings almost everywhere, suppressed scroll affordance) against one well-executed state (empty) — matches "2-3 states missing or rough," not "1 missing" and not "4+."

## 9. Good design is environmentally friendly — Score: 2/3
   Evidence: Gzip total ≈113.88KB (JS 106.85KB + CSS 6.57KB), zero third-party network requests (01-evidence.md Weight & Friction). But zero `prefers-reduced-motion` support anywhere, two animations (`animate-pulse`, `animate-bounce`) run indefinitely while mounted, and dark mode is entirely unsupported.
   Justification: Comfortably under the 500KB mid-tier ceiling with no external requests, but fails the top tier's "motion gated" and "dark mode honored" criteria, so it lands in the middle rather than the top.

## 10. Good design is as little design as possible — Score: 0/3
   Evidence: The search bar is independently hand-built twice (`SearchSection.tsx:62-103` vs `ResourceGrid.tsx:621-649`); the reset/clear-filter button is hand-built 4 times; card markup is hand-duplicated in 6+ places instead of one shared component; two parallel, hand-synced subcategory systems coexist (`MINI_CATEGORY_ORDER` vs `getMiniCategory`, `ResourceGrid.tsx:109-320`); a fully unused 12-entry `ADVISOR_DIRECTORY` and interface ship in the data file (`resources.ts:27-54`).
   Justification: Nearly every recurring UI pattern on this surface was reimplemented rather than abstracted — the definition of "dominated by duplicated affordances," not merely "3-5 removable elements."

---

**Total: 12/30**
