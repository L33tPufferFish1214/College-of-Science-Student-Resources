# Redesign Plan — College of Science Student Resource Guide

Source: Dieter Rams audit `DESIGN-IS-2026-07-02/` (verdict: REDESIGN, 12/30). This plan implements the audit's top 5 moves as 4 self-contained implementation phases + a final verification phase. Each phase can be executed in a fresh chat session — it carries its own file:line references and exact current code so no prior context is required.

Ponytail note baked into every phase below: prefer the smallest correct fix (native CSS, existing Tailwind scale, existing tokens) over new abstractions. Where the original audit suggested a broader unification than is actually justified, this plan scopes it down and says why.

---

## Phase 0: Documentation Discovery — Allowed APIs & Facts

Confirmed via direct reads of the current source (not assumed):

- **Styling**: Tailwind v4 via `@tailwindcss/vite`, CSS-first config — **no `tailwind.config.*` file exists**. All custom tokens live in one `@theme { ... }` block in `src/index.css:3-13`. Existing tokens: `--font-sans`, `--font-mono`, `--color-utah-red` (#be0000), `--color-utah-red-dark` (#8c0000), `--color-utah-red-soft` (#f3dddd), `--color-gray-150/550/650`, `--shadow-xs`. New tokens must be added to this same block — do not create a second config file.
- **Icons**: `lucide-react` ^0.546.0 already a dependency. 19 icons already imported across the app (`GraduationCap, Award, FlaskConical, Heart, HeartHandshake, UserCheck, Users, ArrowRight, Search, X, ChevronRight, PhoneCall, DollarSign, Compass, Smile, TrendingUp, FileSpreadsheet, MapPin, Sparkles`). Any new icon must come from this same package — don't add an icon library.
- **Search**: `src/lib/search.ts` exports `createResourceSearch(resources: Resource[])`, a thin Fuse.js wrapper (keys weighted: name 0.4, relevanceTags 0.3, category 0.1, subcategory 0.1, description 0.1; threshold 0.4; already has a `ponytail:` comment documenting the threshold tradeoff). Called from `ResourceGrid.tsx:342` and `SearchSection.tsx:18`. Reuse as-is — do not modify its config unless a phase below says so (none do).
- **Types**: `Resource` interface at `src/data/resources.ts:14-25` (`id, name, description, url, category, subcategory?, tier, deadline?, contact?, relevanceTags`). `ResourceCategory` union at lines 1-12 (11 values). `activeView` in `App.tsx` is plain `string`, not a union type — no dedicated view-routing type exists.
- **No test framework configured** (no jest/vitest/testing-library in package.json, no test script). Verification below uses `npm run build`, `npm run lint` (= `tsc --noEmit`), and live browser checks — do not add a test framework as part of this redesign; that's a separate, unrequested decision.
- **Anti-patterns confirmed to avoid**: `motion` (Framer Motion successor) and `@google/genai` are installed dependencies but **zero imports exist anywhere in `src/`** — do not wire them in for this redesign; all animation needs are covered by existing CSS/Tailwind. `express`/`dotenv` are server-only leftovers, irrelevant to this static-site redesign — do not touch them.

---

## Phase 1: Fix honesty violations + jargon copy

**Scope:** copy/label changes only — no behavior or structural changes. Lowest risk, highest audit leverage (fixes principle #6 Honest and most of #4 Understandable).

**Files:** `src/App.tsx`, `src/components/OverwhelmedRescue.tsx`, `src/components/Header.tsx`, `src/components/ResourceGrid.tsx`, `src/data/resources.ts`, `src/components/CareerOutlook.tsx`

### 1a. Relabel the 3 featured CTAs in `App.tsx` to match their real behavior

All three call `handleSuggestQuery(queryText, categoryVal?, tierVal?)` (`App.tsx:45-51`), which sets a search query and switches to the directory view — none navigate to dedicated program content. Keep `onClick` unchanged; change only the visible `<span>` text:

- `App.tsx:206-213` (SRI card) — button text `"Explore SRI and SRI-CAP"` → **`"Search SRI & SRI-CAP resources"`**
- `App.tsx:229-236` (Beckman card) — button text `"How to apply for Beckman"` → **`"Search Beckman Scholars resources"`**
- `App.tsx:252-259` (ACCESS card) — button text `"Learn about ACCESS Scholars"` → **`"Search ACCESS Scholars resources"`**

Exact current block for reference (SRI shown, other two are structurally identical per Phase 0 discovery):
```tsx
<button
  onClick={() => handleSuggestQuery("SRI", "Research & Internships", 1)}
  className="mt-4 text-xs font-bold text-utah-red inline-flex items-center gap-1.5 hover:underline text-left self-start"
  id="sri-feature-btn"
>
  <span>Explore SRI and SRI-CAP</span>
  <ArrowRight className="w-3.5 h-3.5" />
</button>
```
Only the text inside `<span>` changes.

### 1b. Fix "Go to page" in `OverwhelmedRescue.tsx:151-154`

Clicking a scenario card does not navigate — `handleRescueSelect` (`OverwhelmedRescue.tsx:84-91`) only sets `activeRescueTag`, which reveals a separate panel below (`OverwhelmedRescue.tsx:160-218`) containing the actual navigation link/button. Relabel:
```tsx
<div className="mt-5 pt-3 border-t border-gray-50/50 flex items-center gap-1.5 text-xs font-semibold text-utah-red">
  <span>Go to page</span>
  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
</div>
```
→ change `<span>Go to page</span>` to **`<span>See recommended resource</span>`**.

### 1c. Rename "Explore Path" nav label (`Header.tsx`, home-nav button ~line 31-41)

`"Explore Path"` is unclear as a home-navigation label. Grep for the literal string `"Explore Path"` in `Header.tsx` and change the visible text to **`"Home"`**. No behavior change (still sets `activeView` to `"home"`).

### 1d. Replace "Tier" jargon in `ResourceGrid.tsx` tier toggles (~lines 664-705)

Grep for these exact current strings and replace:
- `"Tier 1: Freshman & Sophomore"` → **`"First & Second Year"`**
- `"Tier 2: Junior, Senior & Graduate"` → **`"Upperclassmen & Graduate"`**
- Leave `"All Academic Levels"` unchanged (already clear).

### 1e. Strip unbacked superlatives in `src/data/resources.ts`

Grep for each exact phrase below and replace with the factual version (keep meaning, drop the inflation):

| Line | Current | Replace with |
|---|---|---|
| 238 | "...absolute best writing class" | "...best-fit writing class" |
| 321 | "The ultimate single application software... instantly matched with ALL eligible..." | "A single application that matches you with eligible..." |
| 453 | "The absolute gold standard for freshmen... world-class faculty" | "A strong option for freshmen... experienced faculty" |
| 567 | "...providing a powerful sisterhood" | "...providing a peer support network" |
| 601 | "Fulfill elite student leadership parameters" | "Fulfill student leadership requirements" |
| 1123 | "America's absolute premier undergraduate research scholarship" | "A highly competitive national undergraduate research scholarship" |
| 1153 | "The world's premier post-graduate study scholarship" | "A highly competitive post-graduate study scholarship" |
| 1241 | "...massive physical national stage. A gold-standard resume builder." | "...a national stage. A strong resume builder." |
| 1259 | "...establish your absolute scientific credential" | "...establish a research publication credential" |

Also `CareerOutlook.tsx:107` — `"Everything is free for Utah College of Science students."` → qualify it: **`"These specific services (headshots, Career Closet, Career Studio bookings) are free for Utah College of Science students."`**

### 1f. Expand acronyms on first mention in `resources.ts`

- Line 1163 (`"EDGES Graduate Fellowship"`) — add expansion inline, e.g. `"EDGES (Enhancing Diversity in Graduate Education) Graduate Fellowship"` — verify the correct expansion before committing (don't guess if the real program name differs; check the resource's own `url` field for the official name).
- Line 1173 (`"NDSEG Fellowship"`) — expand to `"NDSEG (National Defense Science and Engineering Graduate) Fellowship"` (already spelled out in the description per audit evidence — surface it in the title too).

### Verification checklist
- `grep -rn "Explore SRI and SRI-CAP\|How to apply for Beckman\|Learn about ACCESS Scholars\|>Go to page<\|Explore Path\|Tier 1:\|Tier 2:" src/` → zero matches
- `npm run build` succeeds
- Live browser check: click each relabeled CTA and confirm the resulting behavior (a search) still matches what the new label promises

### Anti-pattern guards
- Do not change any `onClick` handler or add new routes/pages in this phase — relabeling to match existing behavior is the correct-sized fix; building dedicated SRI/Beckman/ACCESS pages is a much bigger, unrequested scope increase.
- Do not touch any `resources.ts` fields other than the description/label strings named above.

---

## Phase 2: Collapse arbitrary type scale + spacing to Tailwind defaults; reduce category color palette

**Scope:** token-level design changes (fixes principle #3 Aesthetic, #5 Unobtrusive).

**Files:** `src/index.css`, `src/data/categoryStyles.ts`, plus any `text-[...]`/spacing-bracket usage across `src/`

### 2a. Add one small token for tiny badge/eyebrow text, replacing 3 ad hoc sizes

Homepage audit measured 9 distinct font sizes (`9,10,11,12,14,16,18,20,24,27px`) — of these, `12,14,16,18,20,24px` already match Tailwind's default scale (`text-xs/sm/base/lg/xl/2xl`) and need no change. Only `9px/10px/11px` (tiny uppercase eyebrow/badge labels) and `27px` (hero heading) are true one-off arbitrary values.

Add to `src/index.css` `@theme` block (after line 11, `--color-gray-650`):
```css
--text-2xs: 0.625rem; /* 10px — tiny badge/eyebrow labels */
```
Then replace every `text-[9px]`, `text-[10px]`, `text-[11px]` occurrence (known sites: `App.tsx:196,219,242` badge spans; `ResourceGrid.tsx` category/tier badge spans; `Header.tsx` eyebrow label; `SearchSection.tsx:82` sm breakpoint variant) with `text-2xs`.

### 2b. Replace the hero heading's one-off size

`SearchSection.tsx:57` — `className="text-[27px] leading-[33px] font-bold text-gray-950 tracking-normal animate-fade-in"` → change `text-[27px] leading-[33px]` to **`text-3xl leading-tight`** (Tailwind default, 30px — no new token needed).

### 2c. Sweep remaining arbitrary-value classes

Grep across `src/` for `text-\[`, `w-\[`, `h-\[`, `p-\[`, `m-\[`, `scale-\[` (discovery confirmed matches exist in `SearchSection.tsx`, `ResourceGrid.tsx`, `OverwhelmedRescue.tsx`, `Header.tsx`, `CareerOutlook.tsx`, `App.tsx`, but did not enumerate every site — do that grep as the first step of this phase). For each match, replace with the nearest standard Tailwind utility from the default spacing/sizing scale. One already-known example: `SearchSection.tsx:47` uses `hover:scale-102` — `102` is not a standard Tailwind scale step (steps are `100,105,110,125,150`); replace with **`hover:scale-105`**.

### 2d. Reduce category color palette from 11 unique hues to 3 semantic groups

Current `CATEGORY_STYLES` (`src/data/categoryStyles.ts:15-77`) assigns each of 11 categories its own hue — this is the biggest driver of the 41-distinct-colors finding. Regroup into 3 reused hues + the existing `DEFAULT_CATEGORY_STYLE` neutral (no new hex values invented — reuse existing ones):

| Group | Categories | Reuse hex from | accent / background / border / text |
|---|---|---|---|
| Guidance (slate) | Academic Help, Advising & Course Planning, Student Access & Support, Department Hubs | current "Advising & Course Planning" | `#697782` / `#ECEFF2` / `#CBD3D9` / `#3F4E58` |
| Funding & Career (gold) | Scholarships & Financial Aid, Research & Internships, Career Development | current "Scholarships & Financial Aid" | `#91815A` / `#F3EBD9` / `#DCCDAA` / `#5C4E2E` |
| Wellbeing (green) | Wellness & Mental Health, Community & Student Orgs, Housing & Campus Life, Emergency & Safety | current "Wellness & Mental Health" | `#6F8F76` / `#EAF3E9` / `#C8DDCA` / `#415E47` |

Edit `CATEGORY_STYLES` (`categoryStyles.ts:15-77`) so each of the 11 keys points to one of these 3 shared style objects (define the 3 objects once, reference them by key) instead of 11 separately-declared objects. Delete the now-unused 8 hue definitions. `DEFAULT_CATEGORY_STYLE` (lines 8-13) stays as-is for any fallback.

### Verification checklist
- `grep -rn "text-\[9px\]\|text-\[10px\]\|text-\[11px\]\|text-\[27px\]\|scale-102" src/` → zero matches
- `npm run build` and `npm run lint` succeed
- Live browser check: re-run the audit's color-count eval (`getComputedStyle` sweep over `color`/`backgroundColor`/`borderColor` on the homepage) and confirm the distinct-color count drops from 41 toward ~15

### Anti-pattern guards
- Do not create a second token-definition mechanism — everything new goes in the existing `@theme` block in `index.css`.
- Do not invent new hex values for the 3 grouped hues — reuse the existing category colors named above, to keep this a mechanical reduction, not a fresh color-design exercise.

---

## Phase 3: Consolidate genuinely-duplicated logic (search input shell, full-reset button, subcategory bug), delete dead code

**Scope:** the highest-value structural change (fixes principle #10 As-little-design-as-possible). Scoped deliberately narrower than the original audit's "unify everything" framing — see anti-pattern guards for why.

**Files:** new small component (e.g. `src/components/SearchInputShell.tsx`), `src/components/SearchSection.tsx`, `src/components/ResourceGrid.tsx`, `src/data/resources.ts`, `src/components/CareerOutlook.tsx`, `src/components/OverwhelmedRescue.tsx`, `src/App.tsx`

### 3a. Extract only the truly-identical search input shell

`SearchSection.tsx:62-103` (hero bar, has a submit button + live-suggestions dropdown) and `ResourceGrid.tsx:617-650` (directory bar, plain input + clear button) independently implement the same icon+input+clear-button visual shell. Extract just that shared shell into one small component:

```tsx
// src/components/SearchInputShell.tsx
interface SearchInputShellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputId: string;
  inputRef?: React.Ref<HTMLInputElement>;
}
```
Body = the `<Search icon> + <input> + conditional <X clear button>` markup currently duplicated at `ResourceGrid.tsx:621-649` (this is the simpler of the two — use it as the base, since `SearchSection.tsx`'s version wraps the same shell plus extra features).

Wire `ResourceGrid.tsx:617-650` to use it directly. In `SearchSection.tsx`, use it as the inner shell and keep the submit button and suggestions dropdown as surrounding composition — **do not** add `showSubmit`/`showSuggestions` boolean props to force both variants through one mega-component; composition (children/wrapping) is simpler than a flag-driven component here.

### 3b. Consolidate only the 2 identical-purpose reset buttons

`ResourceGrid.tsx:606-614` (`reset-filters-btn`) and `ResourceGrid.tsx:849-855` (`empty-state-reset-btn`) both call the exact same `handleResetFilters` (lines 449-453) for the exact same purpose (clear search + category + tier). Extract one small `ResetFiltersButton` component/shared className, parameterized only by label text and icon-or-not (RotateCcw icon on the first, none on the second).

Leave the other 2 "clear" buttons **as inline JSX, unchanged** — `directory-search-clear-button` (`ResourceGrid.tsx:640-648`, clears search text only via `setSearchQuery("")`) and `return-to-open-category-btn` (`ResourceGrid.tsx:804-812`, same clear-search-only action but different label/styling in context). These are a different action (clear-search-only vs. full-reset) and are each only a few lines — forcing all 4 into one component would be the unrequested abstraction the audit's original framing over-reached on.

### 3c. Fix the one confirmed subcategory bug — don't rewrite the system

`MINI_CATEGORY_ORDER["Student Access & Support"]` (`ResourceGrid.tsx:110-117`) lists display-order labels (`"Start Here", "Scholarships & Cohorts", "Basic Needs", "Campus & Community Resources", "Student Navigation", "Events & Outreach"`) that `getMiniCategory`'s switch (`ResourceGrid.tsx:314-315`, `case "Student Access & Support": return "CSAR Support";`) can never actually produce — the order list and the classifier are completely out of sync for this one category, meaning today it silently falls back to unordered/default grouping for all ~9 resources in that category.

Smallest correct fix: replace the order list to match what the switch actually returns —
```ts
"Student Access & Support": ["CSAR Support"],
```
This is the whole fix. Do not redesign `MINI_CATEGORY_ORDER`/`getMiniCategory` into a unified single-source-of-truth architecture for this pass — every other category's order list and switch cases already agree (confirmed in discovery); only this one category was broken.

### 3d. Delete confirmed dead code

- `ADVISOR_DIRECTORY` array + `Advisor` interface (`resources.ts:27-54`) — zero references anywhere in `src/`, confirmed by grep.
- Unused default `React` import in `CareerOutlook.tsx:1` and `OverwhelmedRescue.tsx:1` (React 19 + `jsx: react-jsx` doesn't need it).
- Unused `CareerOutlook` type import in `CareerOutlook.tsx:2`.
- Unreachable `QuickCard.resourceIds` field, `handleQuickResourceClick` handler, and its conditional branch (`App.tsx:25,70-76,143-144`) — no `QUICK_CARDS` entry ever sets `resourceIds`.

### Verification checklist
- `npm run lint` (`tsc --noEmit`) passes with zero unused-import errors
- `grep -rn "ADVISOR_DIRECTORY\|handleQuickResourceClick" src/` → zero matches
- Live browser check: hero search and directory search both still filter/suggest correctly after extracting `SearchInputShell`; both reset buttons still clear all filters; the Student Access & Support category now shows a real (non-empty) subcategory label instead of falling back
- `npm run build` succeeds

### Anti-pattern guards
- Do not build a generic all-purpose `Card` component to unify the 6 visually-distinct card treatments (featured cards, scenario cards, resource cards, career list items) the audit flagged — each serves a different content shape and forcing them into one component with many conditional props is over-abstraction for 4 genuinely different contexts. Only the 2 items above (search shell, full-reset button) are true byte-for-byte duplicates in purpose and are worth sharing.
- Do not rebuild the subcategory system's architecture — fix the one confirmed data mismatch and stop.

---

## Phase 4: Accessibility + motion pass

**Scope:** two global CSS rules, zero per-component changes (fixes principle #8 Thorough, most of #9 Environmentally friendly).

**Files:** `src/index.css`

### 4a. Remove the sitewide scrollbar-hiding rule

Delete `src/index.css:21-30`:
```css
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

*::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
```
This suppresses the native scroll affordance on every element with no replacement signal — deleting it costs nothing and restores default browser scrollbars everywhere.

### 4b. Add one global focus-visible rule

Nearly every interactive element currently resolves `outline-style: none` with no visible replacement (confirmed live via `getComputedStyle` on a focused button and input — only `CareerOutlook.tsx:149`'s `<select>` has any focus styling). Rather than hand-adding `focus:ring-*` to ~35 elements individually, add one rule to `src/index.css`:
```css
:focus-visible {
  outline: 2px solid var(--color-utah-red);
  outline-offset: 2px;
}
```

### 4c. Gate all animation behind `prefers-reduced-motion`

Two animations currently run indefinitely with no gating (`animate-pulse` on `CareerOutlook.tsx:49`'s Sparkles icon, `animate-bounce` on `OverwhelmedRescue.tsx:113`'s PhoneCall icon), plus the `fadeIn` entrance animation (`index.css:38-45`, used in 4 places). One global media query handles all of them without touching component code:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Verification checklist
- `grep -n "scrollbar-width" src/index.css` → zero matches
- Live browser check (`preview_eval`): a focused button/input no longer reports `outline-style: none`
- `preview_resize` with `prefers-reduced-motion: reduce` emulated (or `preview_eval` setting the media feature) confirms the pulse/bounce/fade animations stop
- `npm run build` succeeds

### Anti-pattern guards
- Do not add per-component `focus:ring-*` Tailwind classes to all interactive elements — the global `:focus-visible` rule is the smaller diff and the correct fix for a sitewide gap.
- Do not add a JS `useReducedMotion` hook or React context — the CSS media query is native and sufficient; no framework/state needed.

---

## Final Phase: Verification

1. `npm run build` — must succeed with zero TypeScript errors.
2. `npm run lint` (`tsc --noEmit`) — zero errors.
3. Re-run every phase's grep check above and confirm all return zero matches.
4. Start the dev server and walk the golden path live in-browser:
   - Home → click a relabeled featured CTA (e.g. "Search SRI & SRI-CAP resources") → confirm it runs a search, matching its new label (not a dead promise).
   - Use the directory search → confirm the empty state ("No matched University Resources" + reset) still works.
   - Tab through the page with the keyboard → confirm every interactive element now shows a visible focus ring.
   - Emulate `prefers-reduced-motion: reduce` → confirm the pulsing sparkle, bouncing phone, and fade-in entrances all stop.
   - Resize to mobile width → confirm no layout regressions from the type-scale/spacing changes.
5. Re-run the audit's live-preview eval script (color count, font-size scale, spacing scale) against the redesigned homepage and confirm: distinct colors 41→~15, font sizes 9→~7 (all but one — the new `text-2xs` token — now standard Tailwind defaults).
6. Informally compare against the original `DESIGN-IS-2026-07-02/02-scorecard.md` — principles #6 (Honest), #8 (Thorough), and #10 (As little design as possible) should now score visibly higher; re-running the full audit is optional, not required, to close this plan.
