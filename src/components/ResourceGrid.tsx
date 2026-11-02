import React, { useMemo, useRef, useState } from "react";
import { Calendar, Check, ExternalLink, Filter, HelpCircle, RotateCcw, Search, Share2, Sparkles, X } from "lucide-react";
import { getCategoryStyle } from "../data/categoryStyles";
import type { Resource, ResourceCategory, ResourceDepartment } from "../data/resources";
import {
  createResourceSearch,
  getResourceSearchFields,
  getResourceSearchRank,
  normalizeSearchText
} from "../lib/search";

interface ResourceGridProps {
  resources: Resource[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedTier: 1 | 2 | "all";
  setSelectedTier: (tier: 1 | 2 | "all") => void;
}

type CategoryValue = ResourceCategory | "all";
type DepartmentValue = ResourceDepartment | "all";

type CategoryOption = {
  label: string;
  value: CategoryValue;
};

type DepartmentOption = {
  label: string;
  value: DepartmentValue;
};

type CategoryDetail = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  featuredResourceIds?: string[];
};

const CATEGORIES: CategoryOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Student Access & Support", value: "Student Access & Support" },
  { label: "Academic Help", value: "Academic Help" },
  { label: "Advising & Course Planning", value: "Advising & Course Planning" },
  { label: "Scholarships & Financial Aid", value: "Scholarships & Financial Aid" },
  { label: "Research & Internships", value: "Research & Internships" },
  { label: "Career Development", value: "Career Development" },
  { label: "Wellness & Mental Health", value: "Wellness & Mental Health" },
  { label: "Community & Student Orgs", value: "Community & Student Orgs" },
  { label: "Housing & Campus Life", value: "Housing & Campus Life" },
  { label: "Emergency & Safety", value: "Emergency & Safety" },
  { label: "Department Hubs", value: "Department Hubs" }
];

// "Tier 1/2" was internal jargon; students read year language.
const TIER_OPTIONS: { label: string; value: 1 | 2 | "all" }[] = [
  { label: "All Levels", value: "all" },
  { label: "First & Second Year", value: 1 },
  { label: "Upper Division & Grad", value: 2 }
];

const DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { label: "All Departments", value: "all" },
  { label: "Atmospheric Sciences", value: "Atmospheric Sciences" },
  { label: "Biology", value: "Biology" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Earth & Environmental Science", value: "Earth & Environmental Science" },
  { label: "Geology", value: "Geology" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "Metallurgical Engineering", value: "Metallurgical Engineering" },
  { label: "Mining Engineering", value: "Mining Engineering" },
  { label: "Physics & Astronomy", value: "Physics & Astronomy" }
];

const ALL_CATEGORY_STYLE = {
  accent: "#372c2c",
  background: "#f5f4f2",
  border: "#d5d5d5",
  text: "#372c2c"
};

const CATEGORY_DETAILS: Record<CategoryValue, CategoryDetail> = {
  all: {
    title: "All Resources",
    description: "A complete view of College of Science and University of Utah student support resources."
  },
  "Student Access & Support": {
    title: "Student Access & Support",
    description: "CSAR resources for student navigation, scholarships, basic needs, community support, events, and staying connected to the U.",
    actionHref: "https://studentresources.utah.edu/",
    actionLabel: "Visit CSAR"
  },
  "Academic Help": {
    title: "Academic Help",
    description: "Tutoring, writing support, study skills, accessibility support, and academic success offices."
  },
  "Advising & Course Planning": {
    title: "Advising & Course Planning",
    description: "Advisor connections, registration help, placement guidance, degree planning, policies, and graduate planning.",
    featuredResourceIds: ["academic-advising-hub", "schedule-advising-appointment", "drop-in-advising"]
  },
  "Scholarships & Financial Aid": {
    title: "Scholarships & Financial Aid",
    description: "Scholarship portals, department awards, national awards, financial aid guidance, and graduate funding."
  },
  "Research & Internships": {
    title: "Research & Internships",
    description: "Research programs, labs, presentation opportunities, publishing routes, internships, and science centers."
  },
  "Wellness & Mental Health": {
    title: "Wellness & Mental Health",
    description: "Counseling, mental health support, wellness tools, sleep resources, mindfulness, and burnout support."
  },
  "Community & Student Orgs": {
    title: "Community & Student Orgs",
    description: "Student organizations, identity and affinity groups, leadership groups, mentorship, outreach, event planning, and student expression."
  },
  "Career Development": {
    title: "Career Development",
    description: "Career coaching, resumes, interviews, headshots, job boards, internships, events, and career exploration.",
    featuredResourceIds: ["career-coaching-hub", "u-career-coaches"]
  },
  "Housing & Campus Life": {
    title: "Housing & Campus Life",
    description: "Housing, transportation, Union services and spaces, food support, recreation, and basic daily-life supports."
  },
  "Emergency & Safety": {
    title: "Emergency & Safety",
    description: "Crisis support, reporting offices, Title IX help, safe ride tools, emergency services, and lab safety."
  },
  "Department Hubs": {
    title: "Department Hubs",
    description: "Direct department home bases for majors, course information, department events, and student-facing updates."
  }
};

const MINI_CATEGORY_ORDER: Partial<Record<ResourceCategory, string[]>> = {
  "Student Access & Support": [
    "Start Here",
    "Scholarships & Cohorts",
    "Basic Needs",
    "Campus & Community Resources",
    "Student Navigation",
    "Events & Outreach"
  ],
  "Academic Help": [
    "Tutoring, Writing & Study Skills",
    "Access & Student Success",
    "Science Academic Hubs"
  ],
  "Advising & Course Planning": [
    "Advising & Appointments",
    "Registration & Placement",
    "Requirements & Policies",
    "Graduate Planning"
  ],
  "Scholarships & Financial Aid": [
    "Applying & Financial Aid",
    "Department Scholarships",
    "National & Competitive Awards",
    "Graduate Funding",
    "Scholarships"
  ],
  "Research & Internships": [
    "Getting Started in Research",
    "Research Programs & Internships",
    "Present & Publish",
    "Labs & Research Centers"
  ],
  "Career Development": [
    "Career Coaching",
    "Resume, Interviews & Professional Presence",
    "Jobs, Internships & Events",
    "Career Exploration"
  ],
  "Wellness & Mental Health": [
    "Mental Health Support",
    "Self-Care Tools",
    "Wellness Resources"
  ],
  "Community & Student Orgs": [
    "Identity & Affinity Groups",
    "Student Organizations",
    "Leadership, Mentoring & Outreach",
    "Events & Student Expression"
  ],
  "Housing & Campus Life": [
    "Basic Needs",
    "Union Services & Spaces",
    "Union Recreation & Events",
    "Housing & Campus Life",
    "Transportation"
  ],
  "Emergency & Safety": [
    "Crisis & Emergency Help",
    "Reporting & Title IX",
    "Lab & Environmental Safety",
    "Safety Resources"
  ],
  "Department Hubs": ["Department Home Pages"]
};

const TOP_MATCH_COUNT = 4; // size of the "Best Matches" strip shown above grouped search results

const isKnownCategory = (value: string): value is ResourceCategory =>
  CATEGORIES.some((category) => category.value === value && category.value !== "all");

const getDisplayCategoryStyle = (category: string) =>
  category === "all" ? ALL_CATEGORY_STYLE : getCategoryStyle(category);

const getTierRank = (tier: Resource["tier"]) => {
  if (tier === 1) return 0;
  if (tier === "all") return 1;
  return 2;
};

const getFeaturedResourceLabel = (resourceId: string) => {
  if (resourceId === "academic-advising-hub") return "Find advisors";
  if (resourceId === "schedule-advising-appointment") return "Book appointment";
  if (resourceId === "drop-in-advising") return "Drop-in help";
  if (resourceId === "career-coaching-hub") return "Schedule coaching";
  if (resourceId === "u-career-coaches") return "Find career coaches";
  return "Start here";
};

const getMiniCategory = (item: Resource) => {
  if (item.subcategory) return item.subcategory;

  const text = normalizeSearchText([item.name, item.description, ...item.relevanceTags].join(" "));
  const has = (...signals: string[]) =>
    signals.some((signal) => text.includes(normalizeSearchText(signal)));

  switch (item.category) {
    case "Academic Help":
      if (has("cda", "disability", "trio", "advocates", "accessibility", "first generation", "low income")) {
        return "Access & Student Success";
      }
      if (has("tutoring", "writing", "learning", "study", "math center")) {
        return "Tutoring, Writing & Study Skills";
      }
      return "Science Academic Hubs";

    case "Advising & Course Planning":
      if (["academic-advising-hub", "schedule-advising-appointment", "drop-in-advising"].includes(item.id)) {
        return "Advising & Appointments";
      }
      if (["math-placement", "writing-placement", "major-maps", "how-to-register-video", "first-semester-planning"].includes(item.id)) {
        return "Registration & Placement";
      }
      if (["graduation-worksheet", "ap-ib-prior-credit", "academic-catalogs", "gen-ed-petition", "late-withdrawal-petitions"].includes(item.id)) {
        return "Requirements & Policies";
      }
      if (has("graduate", "postgraduate", "phd", "thesis")) return "Graduate Planning";
      if (has("petition", "withdrawal", "catalog", "graduation", "ap", "ib", "requirement")) {
        return "Requirements & Policies";
      }
      return "Advising & Appointments";

    case "Scholarships & Financial Aid":
      if (has("atmospheric", "biology", "biological", "chemistry", "mathematics", "geology", "physics", "mining", "metallurgical", "department")) {
        return "Department Scholarships";
      }
      if (has("fulbright", "churchill", "rhodes", "goldwater", "nationally", "competitive")) {
        return "National & Competitive Awards";
      }
      if (has("graduate", "fellowship", "emergency", "ndseg", "edges")) {
        return "Graduate Funding";
      }
      if (has("fafsa", "financial aid", "scholarshipuniverse", "portal", "counselor")) {
        return "Applying & Financial Aid";
      }
      return "Scholarships";

    case "Research & Internships":
      if (
        item.id === "science-research-initiative" ||
        item.id === "sri-cap" ||
        item.id === "urop-undergrad-research" ||
        item.id === "research-at-the-u-overview"
      ) {
        return "Getting Started in Research";
      }
      if (has("internship", "cap", "reu", "summer", "urop", "spur")) {
        return "Research Programs & Internships";
      }
      if (has("symposium", "conference", "journal", "poster", "publish", "present")) {
        return "Present & Publish";
      }
      if (has("lab", "wilkes", "forge", "looper", "vershinin", "hammond", "shapiro", "gagnon")) {
        return "Labs & Research Centers";
      }
      return "Getting Started in Research";

    case "Career Development":
      if (["career-coaching-hub", "u-career-coaches"].includes(item.id)) return "Career Coaching";
      if (item.id === "u-career-success") return "Career Exploration";
      if (item.id === "peer-resume-review") return "Resume, Interviews & Professional Presence";
      if (has("resume", "headshot", "interview", "closet", "linkedin", "studio")) {
        return "Resume, Interviews & Professional Presence";
      }
      if (has("coach", "coaching")) return "Career Coaching";
      if (has("event", "fair", "handshake", "internship", "job")) {
        return "Jobs, Internships & Events";
      }
      return "Career Exploration";

    case "Wellness & Mental Health":
      if (has("counseling", "mental", "telus", "headspace", "ptsd", "how we feel")) {
        return "Mental Health Support";
      }
      if (has("sleep", "mindfulness", "breathing", "podcast", "pace")) {
        return "Self-Care Tools";
      }
      return "Wellness Resources";

    case "Community & Student Orgs":
      if (has("aises", "sacnas", "ostem", "women", "latino", "access alumni", "identity")) {
        return "Identity & Affinity Groups";
      }
      if (has("ambassadors", "mentors", "council", "outreach", "csme")) {
        return "Leadership, Mentoring & Outreach";
      }
      return "Student Organizations";

    case "Housing & Campus Life":
      if (has("food", "pantry", "basic needs")) return "Basic Needs";
      if (has("ride", "shuttle", "transloc", "uride", "saferide")) return "Transportation";
      return "Housing & Campus Life";

    case "Emergency & Safety":
      if (has("ehs", "laboratory", "lab", "hazard")) return "Lab & Environmental Safety";
      if (has("crisis", "988", "safeut", "911", "emergency")) return "Crisis & Emergency Help";
      if (has("title ix", "oeo", "report", "equal opportunity", "harassment", "misconduct")) {
        return "Reporting & Title IX";
      }
      return "Safety Resources";

    case "Department Hubs":
      return "Department Home Pages";

    case "Student Access & Support":
      return "CSAR Support";

    default:
      return item.category;
  }
};

export function ResourceGrid({
  resources,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier
}: ResourceGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentValue>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedSearchQuery = searchQuery.trim();
  const isSearchActive = trimmedSearchQuery.length > 0;
  const selectedCategoryValue = (CATEGORIES.some((category) => category.value === selectedCategory)
    ? selectedCategory
    : "all") as CategoryValue;
  const selectedCategoryDetail = CATEGORY_DETAILS[selectedCategoryValue];
  const activeCategoryStyle = getDisplayCategoryStyle(selectedCategoryValue);
  const selectedDepartmentDetail =
    DEPARTMENT_OPTIONS.find((department) => department.value === selectedDepartment) ?? DEPARTMENT_OPTIONS[0];
  const isDepartmentFiltered = selectedDepartment !== "all";
  const availableDepartmentOptions = useMemo(
    () =>
      DEPARTMENT_OPTIONS.filter(
        (department) =>
          department.value === "all" ||
          resources.some((resource) => resource.department === department.value)
      ),
    [resources]
  );
  const selectedFeaturedResourceIds = selectedCategoryDetail.featuredResourceIds ?? [];
  const fuse = useMemo(() => createResourceSearch(resources), [resources]);
  const relevanceById = useMemo(() => {
    const map = new Map<string, number>();
    if (!isSearchActive) return map;

    const query = normalizeSearchText(trimmedSearchQuery);
    const compactQuery = query.replace(/\s+/g, "");
    const allowCompactMatch = query.includes(" ") && compactQuery.length >= 4;
    const fuzzyScores = new Map<string, number>(
      fuse.search(trimmedSearchQuery).map((result) => [result.item.id, result.score ?? 1])
    );

    resources.forEach((item) => {
      const searchableFields = getResourceSearchFields(item);
      const isDirectMatch = searchableFields.some((field) => field.includes(query));
      const isCompactMatch =
        allowCompactMatch &&
        searchableFields.some((field) => field.replace(/\s+/g, "").includes(compactQuery));
      const fuzzyScore = fuzzyScores.get(item.id);

      if (isDirectMatch || isCompactMatch || fuzzyScore !== undefined) {
        map.set(item.id, getResourceSearchRank(item, trimmedSearchQuery, fuzzyScore));
      }
    });

    return map;
  }, [fuse, isSearchActive, resources, trimmedSearchQuery]);
  const searchMatchIds = useMemo(() => new Set(relevanceById.keys()), [relevanceById]);
  const selectedFeaturedResources = useMemo(() => {
    if (isSearchActive || selectedFeaturedResourceIds.length === 0) return [];

    return selectedFeaturedResourceIds
      .map((resourceId) => resources.find((resource) => resource.id === resourceId))
      .filter((resource): resource is Resource => Boolean(resource));
  }, [isSearchActive, resources, selectedFeaturedResourceIds]);

  // Avoid re-summoning the mobile keyboard after a search/suggestion click opens this view.

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      if (selectedTier !== "all") {
        if (item.tier !== "all" && item.tier !== selectedTier) {
          return false;
        }
      }

      if (isDepartmentFiltered && item.department !== selectedDepartment) {
        return false;
      }

      if (!isSearchActive && selectedCategoryValue !== "all") {
        if (item.category !== selectedCategoryValue) {
          return false;
        }

        if (selectedFeaturedResourceIds.includes(item.id)) {
          return false;
        }
      }

      if (isSearchActive && !searchMatchIds.has(item.id)) {
        return false;
      }

      return true;
    });
  }, [
    resources,
    isDepartmentFiltered,
    isSearchActive,
    selectedCategoryValue,
    selectedDepartment,
    selectedFeaturedResourceIds,
    selectedTier,
    searchMatchIds
  ]);

  const groupedResources = useMemo(() => {
    const groups = new Map<string, Resource[]>();

    filteredResources.forEach((item) => {
      const groupName = isSearchActive || selectedCategoryValue === "all" ? item.category : getMiniCategory(item);
      groups.set(groupName, [...(groups.get(groupName) ?? []), item]);
    });
    groups.forEach((groupItems) => {
      groupItems.sort((itemA, itemB) =>
        isSearchActive
          ? (relevanceById.get(itemA.id) ?? 1) - (relevanceById.get(itemB.id) ?? 1)
          : getTierRank(itemA.tier) - getTierRank(itemB.tier)
      );
    });

    const orderedGroups =
      isSearchActive || selectedCategoryValue === "all"
        ? CATEGORIES.filter((category) => category.value !== "all").map((category) => category.value)
        : MINI_CATEGORY_ORDER[selectedCategoryValue as ResourceCategory] ?? [];

    return Array.from(groups.entries()).sort(([groupA], [groupB]) => {
      const indexA = orderedGroups.indexOf(groupA as ResourceCategory);
      const indexB = orderedGroups.indexOf(groupB as ResourceCategory);

      if (indexA === -1 && indexB === -1) return groupA.localeCompare(groupB);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [filteredResources, isSearchActive, selectedCategoryValue, relevanceById]);

  // Best-first strip shown above the category groups during search, so the closest
  // match is at the top instead of buried in whichever category renders first.
  const topMatches = useMemo(() => {
    if (!isSearchActive || filteredResources.length <= TOP_MATCH_COUNT) return [];
    return [...filteredResources]
      .sort((itemA, itemB) => (relevanceById.get(itemA.id) ?? 1) - (relevanceById.get(itemB.id) ?? 1))
      .slice(0, TOP_MATCH_COUNT);
  }, [filteredResources, isSearchActive, relevanceById]);

  const handleShare = (id: string, url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCategorySelect = (category: CategoryValue) => {
    setSearchQuery("");
    setSelectedCategory(category);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDepartment("all");
    setSelectedTier("all");
  };

  const resultsSummary = isSearchActive
    ? `Showing ${filteredResources.length} resources matching search${isDepartmentFiltered ? ` in ${selectedDepartmentDetail.label}` : " across all categories"}`
    : selectedCategoryValue === "all"
      ? `Showing ${filteredResources.length} ${isDepartmentFiltered ? `${selectedDepartmentDetail.label} resources` : "resources in the directory"}`
      : selectedFeaturedResources.length > 0
        ? `Showing ${filteredResources.length} additional resources in ${selectedCategoryDetail.title}${isDepartmentFiltered ? ` for ${selectedDepartmentDetail.label}` : ""}`
        : `Showing ${filteredResources.length} resources in ${selectedCategoryDetail.title}${isDepartmentFiltered ? ` for ${selectedDepartmentDetail.label}` : ""}`;

  const renderResourceCard = (item: Resource) => {
    const categoryStyle = getCategoryStyle(item.category);
    const hasSourceLink = Boolean(item.sourceUrl && item.sourceUrl !== item.url);
    const sourceLabel = item.sourceLabel ?? "Dept home";

    return (
      <div
        key={item.id}
        className="group relative flex flex-col justify-between overflow-hidden border border-gray-150 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.13)]"
        id={`card-${item.id}`}
      >
        <div
          className="absolute left-0 top-0 h-1 w-full"
          style={{ backgroundColor: categoryStyle.accent }}
        />

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-3.5">
              <span
                className="inline-flex min-h-[26px] rounded-full max-w-[66%] items-center justify-center px-2.5 py-1 text-center font-sans text-[12.5px] font-semibold leading-tight text-white"
                style={{ backgroundColor: categoryStyle.accent }}
              >
                {item.category}
              </span>

              <span className="inline-flex min-h-[26px] shrink-0 items-center justify-center border border-utah-rule bg-white rounded-full px-2.5 py-1 text-center font-sans text-[12.5px] font-semibold leading-tight text-utah-warm">
                {item.tier === 1 ? "1st / 2nd Year" : item.tier === 2 ? "Upper Div / Grad" : "All Levels"}
              </span>
            </div>

            {item.isNew && (
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border-2 border-utah-red bg-utah-red-soft px-3 py-1 font-sans text-[12.5px] font-bold text-utah-red-dark">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                New at the U
              </div>
            )}

            {item.deadline && (
              <div className="mb-3 flex items-center gap-1.5 bg-utah-red rounded-[10px] px-3 py-2 font-sans text-[12.5px] font-semibold text-white">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Deadline: {item.deadline}</span>
              </div>
            )}

            <h3 className="font-slab text-[18px] font-bold leading-snug text-utah-ink transition-colors group-hover:text-utah-red">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                {item.name}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-utah-warm opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </h3>

            <p className="mt-2.5 text-[14.5px] leading-relaxed text-gray-650">
              {item.description}
            </p>

            {item.contact && (
              <div className="mt-3.5 border-l-2 border-utah-rule bg-utah-shade p-2.5 font-sans text-[12px] text-gray-650">
                <span className="block text-[12.5px] font-semibold text-utah-warm">
                  Office Contact
                </span>
                <span className="mt-0.5 block truncate">{item.contact}</span>
              </div>
            )}

            {item.department && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDepartment(item.department ?? "all");
                }}
                className="mt-3 inline-flex items-center border border-utah-rule bg-white rounded-full px-2.5 py-1 font-sans text-[12.5px] font-semibold text-utah-warm transition-colors hover:border-utah-ink hover:text-utah-ink"
                id={`department-card-chip-${item.id}`}
              >
                {item.department}
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-gray-150 pt-4">
            {item.relevanceTags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                type="button"
                className="bg-utah-shade px-2 py-1 font-sans text-[10.5px] text-gray-550 transition-colors hover:bg-utah-ink hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-150 bg-utah-shade px-5 py-3.5 sm:px-6">
          <button
            onClick={(e) => handleShare(item.id, item.url, e)}
            className="border border-utah-rule bg-white p-2 text-utah-warm transition-colors hover:border-utah-ink hover:text-utah-ink"
            title="Copy link to this resource"
            aria-label="Copy link to this resource"
            id={`share-btn-${item.id}`}
          >
            {copiedId === item.id ? (
              <Check className="h-3.5 w-3.5 text-utah-red" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
          </button>

          {hasSourceLink && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-utah-rule bg-white rounded-full px-3 py-2 font-sans text-[12.5px] font-semibold text-gray-650 transition-colors hover:border-utah-ink hover:text-utah-ink"
              id={`source-btn-${item.id}`}
              title={`Open ${sourceLabel}`}
            >
              <span>{sourceLabel}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-utah-red rounded-full px-4 py-2 font-sans text-[12.5px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
            id={`visit-btn-${item.id}`}
          >
            <span>Visit site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-12" id="directory-browser-container">
      <div className="flex flex-col justify-between gap-6 border-b-2 border-utah-ink pb-5 md:flex-row md:items-end" id="filter-header">
        <div>
          <h2 className="flex items-center gap-2.5 font-slab text-[30px] font-bold text-utah-ink">
            <Filter className="h-6 w-6 text-utah-red" />
            Resource Directory
          </h2>
          <p className="mt-1.5 text-[15px] text-gray-650">
            Browse by student need, academic level, or a direct search term.
          </p>
        </div>

        {(searchQuery || selectedCategoryValue !== "all" || selectedTier !== "all" || isDepartmentFiltered) && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 self-start border-2 border-utah-rule rounded-full px-4 py-2.5 font-sans text-[12.5px] font-semibold text-gray-650 transition-colors hover:border-utah-red hover:text-utah-red"
            id="reset-filters-btn"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset filters
          </button>
        )}
      </div>

      <div className="mt-8 font-sans" id="directory-search-outer-container">
        <span className="mb-2 block text-[12.5px] font-semibold text-utah-warm">
          Search all resources
        </span>
        <div
          className={`flex items-center border-2 bg-white px-4 py-1 transition-colors ${
            isSearchFocused ? "border-utah-red" : "border-utah-rule hover:border-utah-warm"
          }`}
        >
          <Search className="mr-3 h-5 w-5 shrink-0 text-utah-warm" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search scholarships, tutoring, advising, internships…"
            className="w-full bg-transparent py-3 text-[16px] text-utah-ink outline-none placeholder:text-utah-warm"
            aria-label="Search all resources"
            id="directory-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="ml-2 shrink-0 p-1.5 text-utah-warm transition-colors hover:text-utah-ink"
              aria-label="Clear search"
              id="directory-search-clear-button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6" id="filter-interface-controls">
        <div className="flex flex-col justify-between gap-5 border border-utah-rule bg-utah-shade p-5 md:flex-row md:items-center">
          <div className="shrink-0">
            <span className="block font-sans text-[12.5px] font-semibold text-utah-warm">
              Academic Level
            </span>
            <span className="mt-1 block text-[14px] text-gray-650">
              Filter to what's relevant for where you are in your degree.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5" id="journey-tier-toggles">
            {TIER_OPTIONS.map((option) => {
              const isSelected = selectedTier === option.value;
              return (
                <button
                  key={String(option.value)}
                  onClick={() => setSelectedTier(option.value)}
                  className={`border-2 rounded-full px-4 py-2.5 font-sans text-[12.5px] font-semibold transition-colors ${
                    isSelected
                      ? "border-utah-red bg-utah-red text-white"
                      : "border-utah-rule bg-white text-gray-650 hover:border-utah-red hover:text-utah-red"
                  }`}
                  aria-pressed={isSelected}
                  id={`tier-toggle-${option.value}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" id="category-scroller">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryValue === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => handleCategorySelect(cat.value)}
                className={`shrink-0 border rounded-full px-3.5 py-2 font-sans text-[13px] font-semibold transition-colors ${
                  isSelected
                    ? "border-utah-ink bg-utah-ink text-white"
                    : "border-utah-rule bg-white text-gray-650 hover:border-utah-ink hover:text-utah-ink"
                }`}
                aria-pressed={isSelected}
                id={`cat-pill-${cat.value.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {availableDepartmentOptions.length > 1 && (
          <div className="flex flex-col justify-between gap-4 border border-utah-rule bg-white p-5 lg:flex-row lg:items-center">
            <div className="shrink-0">
              <span className="block font-sans text-[12.5px] font-semibold text-utah-warm">
                Department Focus
              </span>
              <span className="mt-1 block text-[14px] text-gray-650">
                Narrow to resources pulled from a specific department site.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2" id="department-focus-toggles">
              {availableDepartmentOptions.map((department) => {
                const isSelected = selectedDepartment === department.value;

                return (
                  <button
                    key={department.value}
                    onClick={() => setSelectedDepartment(department.value)}
                    className={`border rounded-full px-3 py-2 font-sans text-[13px] font-semibold transition-colors ${
                      isSelected
                        ? "border-utah-ink bg-utah-ink text-white"
                        : "border-utah-rule bg-white text-gray-650 hover:border-utah-ink hover:text-utah-ink"
                    }`}
                    aria-pressed={isSelected}
                    id={`department-pill-${department.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    {department.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <section
        className="mt-8 border border-utah-rule bg-utah-shade px-5 py-8 text-center sm:px-8"
        id="active-category-panel"
      >
        <div className="mx-auto max-w-3xl">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[12.5px] font-semibold text-white"
            style={{ backgroundColor: activeCategoryStyle.accent }}
          >
            {isSearchActive
              ? "Global Search"
              : isDepartmentFiltered
                ? "Department Focus"
                : selectedCategoryValue === "all"
                  ? "Directory Overview"
                  : "Category View"}
          </span>
          <h2 className="mt-4 font-slab text-[26px] font-bold text-utah-ink sm:text-[32px]">
            {isSearchActive
              ? "Search Results"
              : isDepartmentFiltered
                ? `${selectedDepartmentDetail.label} Resources`
                : selectedCategoryDetail.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-gray-650">
            {isSearchActive
              ? isDepartmentFiltered
                ? `Searching within ${selectedDepartmentDetail.label} resources while preserving your opened category.`
                : "Searching across the full directory while preserving your opened category."
              : isDepartmentFiltered
                ? `Showing direct student task cards and department fallback links for ${selectedDepartmentDetail.label}.`
              : selectedCategoryDetail.description}
          </p>

          {selectedFeaturedResources.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-left" id="category-featured-resources">
              {selectedFeaturedResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full min-w-[14rem] max-w-[19rem] border border-utah-rule bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] sm:w-[calc((100%-1.5rem)/3)]"
                  id={`category-featured-${resource.id}`}
                >
                  <span
                    className="inline-flex items-center rounded-full px-2 py-1 font-sans text-[12.5px] font-semibold text-white"
                    style={{ backgroundColor: activeCategoryStyle.accent }}
                  >
                    {getFeaturedResourceLabel(resource.id)}
                  </span>
                  <span className="mt-2.5 flex items-start justify-between gap-3">
                    <span className="font-slab text-[16px] font-bold leading-snug text-utah-ink group-hover:text-utah-red">
                      {resource.name}
                    </span>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-utah-warm group-hover:text-utah-red" />
                  </span>
                  <span className="mt-2 block text-[14px] leading-relaxed text-gray-650">
                    {resource.description}
                  </span>
                </a>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {isSearchActive && selectedCategoryValue !== "all" && (
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1.5 bg-utah-ink rounded-full px-5 py-2.5 font-sans text-[12.5px] font-semibold text-white transition-colors hover:bg-utah-red"
                id="return-to-open-category-btn"
              >
                Back to {selectedCategoryDetail.title}
              </button>
            )}
            {!isSearchActive && selectedCategoryDetail.actionHref && (
              <a
                href={selectedCategoryDetail.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-utah-ink rounded-full px-5 py-2.5 font-sans text-[12.5px] font-semibold text-white transition-colors hover:bg-utah-red"
                id="category-primary-link"
              >
                {selectedCategoryDetail.actionLabel}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1" id="results-count-container">
        <span className="font-sans text-[14px] text-gray-650">
          {resultsSummary}
        </span>
        {(searchQuery || selectedCategoryValue !== "all" || selectedTier !== "all" || isDepartmentFiltered) && (
          <span className="self-start bg-utah-red rounded-full px-2.5 py-1 font-sans text-[12.5px] font-semibold text-white sm:self-auto">
            Active Filter Set
          </span>
        )}
      </div>

      {filteredResources.length === 0 ? (
        <div className="mt-10 border border-utah-rule bg-utah-shade p-14 text-center" id="no-results-panel">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-utah-rule bg-white text-utah-warm">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-slab text-[22px] font-bold text-utah-ink">No resources matched</h3>
          <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-gray-650">
            Nothing in the directory matches{" "}
            <span className="font-semibold text-utah-ink">“{searchQuery}”</span> with your current filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-6 bg-utah-red rounded-full px-6 py-3 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
            id="empty-state-reset-btn"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div id="resources-grouped-results">
          {topMatches.length > 0 && (
            <section className="mt-8" id="group-best-matches">
              <div className="mb-5 flex flex-col gap-2 border-b-2 border-utah-ink pb-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-4 w-1.5 shrink-0 bg-utah-red"
                    aria-hidden="true"
                  />
                  <h3 className="font-slab text-[20px] font-bold text-utah-ink">
                    Best Matches
                  </h3>
                </div>
                <span className="font-sans text-[12.5px] font-semibold text-utah-warm">
                  Closest to "{trimmedSearchQuery}"
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="resources-grid-best-matches">
                {topMatches.map(renderResourceCard)}
              </div>
            </section>
          )}
          {groupedResources.map(([groupName, groupItems]) => {
            const groupStyle = isKnownCategory(groupName) ? getCategoryStyle(groupName) : activeCategoryStyle;

            return (
              <section key={groupName} className="mt-8" id={`group-${groupName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <div className="mb-5 flex flex-col gap-2 border-b-2 border-utah-ink pb-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-4 w-1.5 shrink-0"
                      style={{ backgroundColor: groupStyle.accent }}
                      aria-hidden="true"
                    />
                    <h3 className="font-slab text-[20px] font-bold text-utah-ink">
                      {groupName}
                    </h3>
                  </div>
                  <span className="font-sans text-[12.5px] font-semibold text-utah-warm">
                    {groupItems.length} {groupItems.length === 1 ? "resource" : "resources"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id={`resources-grid-${groupName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {groupItems.map(renderResourceCard)}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
