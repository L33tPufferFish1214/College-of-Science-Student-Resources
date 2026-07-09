# Homepage Mainstream Resources Plan

Keep this as a future homepage improvement after the department resource expansion is complete.

## Goal

The resource directory is getting deeper, especially where department cards connect back to major programs like UROP, SRI, LA Program, Campus Connect, scholarship portals, advising, tutoring, wellness, and department hubs. The homepage should surface the most important broad resources before students have to search or choose a department.

This should not replace the full directory. It should act like a clean "start here" layer for mainstream resources students are most likely to need.

## Recommended Homepage Section

Add a section near the top of the homepage, after the search hero and before the current quick-category grid.

Working title:

- `Start With These`
- `Most-Used Resources`
- `Major Programs & Student Hubs`

Best fit:

- `Start With These`

## Suggested Groups

Use 4-6 compact groups instead of one giant wall of cards.

- Research starters: SRI, UROP, SPUR, Undergraduate Research Symposium, Research at the U
- Academic help: Learning Center, Math Center, Chemistry tutoring/study rooms, E-Tutoring, Writing Center
- Advising and registration: Academic Advising Hub, Schedule Advising Appointment, Permission Numbers Request Sites, first-semester planning
- Money and opportunities: ScholarshipUniverse, ACCESS Scholars, department scholarships, Bennion opportunities if service-focused
- Campus life and support: Campus Connect, CSAR, Feed U Pantry, Campus Recreation, Center for Campus Wellness
- Career and teaching: Learning Assistant Program, Science Internships, U Career Success, Handshake

## Card Behavior

Each homepage card should have one of two actions:

- Direct link when the resource is already a true hub or program page.
- Filter/search action when the card represents a cluster, such as `Research starters` or `Academic help`.

Cards should reuse existing resource data where possible. Avoid duplicating descriptions manually unless we need short homepage-specific text.

## Selection Rules

A resource belongs in this section when it is:

- Useful across multiple majors or years.
- Frequently searched or survey-backed.
- A parent hub that many department-specific cards route back to.
- A strong starting point for first-year students or overwhelmed students.
- Broad enough that students should see it before digging through departments.

Avoid putting every department-specific card here. The homepage should show the main doors, while department pages and filters show the rooms inside.

## Implementation Plan

1. Add a `featuredResourceIds` or `homepageSpotlight` data list in one place.
2. Build a small homepage component that renders grouped resource shortcuts.
3. Reuse the existing resource card actions where possible.
4. Add compact visual hierarchy so it feels like a useful dashboard, not another long directory.
5. Add search/filter actions for grouped cards.
6. Add regression checks for the featured IDs so deleted or renamed resources fail fast.
7. Validate with `npm run lint`, `npm run build`, and the survey search script.

## Timing

Do this after the remaining department expansions. The department work will reveal which hub resources deserve homepage priority, so waiting will produce a better final list.

Next department to expand before this homepage work: Physics & Astronomy.
