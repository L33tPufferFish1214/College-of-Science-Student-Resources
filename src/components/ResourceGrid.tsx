import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Check, ExternalLink, Filter, HelpCircle, RotateCcw, Search, Share2, X } from "lucide-react";
import { getCategoryStyle } from "../data/categoryStyles";
import type { Resource, ResourceCategory } from "../data/resources";
import { createResourceSearch } from "../lib/search";

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

type CategoryOption = {
  label: string;
  value: CategoryValue;
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

const ALL_CATEGORY_STYLE = {
  accent: "#47494A",
  background: "#F4F4F3",
  border: "#D9DCDE",
  text: "#47494A"
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

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

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
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedSearchQuery = searchQuery.trim();
  const isSearchActive = trimmedSearchQuery.length > 0;
  const selectedCategoryValue = (CATEGORIES.some((category) => category.value === selectedCategory)
    ? selectedCategory
    : "all") as CategoryValue;
  const selectedCategoryDetail = CATEGORY_DETAILS[selectedCategoryValue];
  const activeCategoryStyle = getDisplayCategoryStyle(selectedCategoryValue);
  const selectedFeaturedResourceIds = selectedCategoryDetail.featuredResourceIds ?? [];
  const fuse = useMemo(() => createResourceSearch(resources), [resources]);
  const fuzzyMatchIds = useMemo(() => {
    if (!isSearchActive) return new Set<string>();
    return new Set(fuse.search(trimmedSearchQuery).map((result) => result.item.id));
  }, [fuse, isSearchActive, trimmedSearchQuery]);
  const selectedFeaturedResources = useMemo(() => {
    if (isSearchActive || selectedFeaturedResourceIds.length === 0) return [];

    return selectedFeaturedResourceIds
      .map((resourceId) => resources.find((resource) => resource.id === resourceId))
      .filter((resource): resource is Resource => Boolean(resource));
  }, [isSearchActive, resources, selectedFeaturedResourceIds]);

  useEffect(() => {
    if (searchQuery && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      if (selectedTier !== "all") {
        if (item.tier !== "all" && item.tier !== selectedTier) {
          return false;
        }
      }

      if (!isSearchActive && selectedCategoryValue !== "all") {
        if (item.category !== selectedCategoryValue) {
          return false;
        }

        if (selectedFeaturedResourceIds.includes(item.id)) {
          return false;
        }
      }

      if (isSearchActive) {
        const query = normalizeSearchText(trimmedSearchQuery);
        const compactQuery = query.replace(/\s+/g, "");
        const searchableFields = [
          item.name,
          item.description,
          item.category,
          item.subcategory ?? "",
          item.deadline ?? "",
          item.contact ?? "",
          ...item.relevanceTags
        ].map(normalizeSearchText);
        const isDirectMatch = searchableFields.some((field) => field.includes(query));
        const isCompactMatch =
          compactQuery.length > 1 &&
          searchableFields.some((field) => field.replace(/\s+/g, "").includes(compactQuery));
        // Fuzzy fallback catches typos and related-tag matches the exact/compact checks above miss
        const isFuzzyMatch = fuzzyMatchIds.has(item.id);

        if (!isDirectMatch && !isCompactMatch && !isFuzzyMatch) {
          return false;
        }
      }

      return true;
    });
  }, [resources, isSearchActive, trimmedSearchQuery, selectedCategoryValue, selectedFeaturedResourceIds, selectedTier, fuzzyMatchIds]);

  const groupedResources = useMemo(() => {
    const groups = new Map<string, Resource[]>();

    filteredResources.forEach((item) => {
      const groupName = isSearchActive || selectedCategoryValue === "all" ? item.category : getMiniCategory(item);
      groups.set(groupName, [...(groups.get(groupName) ?? []), item]);
    });
    groups.forEach((groupItems) => {
      groupItems.sort((itemA, itemB) => getTierRank(itemA.tier) - getTierRank(itemB.tier));
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
  }, [filteredResources, isSearchActive, selectedCategoryValue]);

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
    setSelectedTier("all");
  };

  const resultsSummary = isSearchActive
    ? `Showing ${filteredResources.length} resources matching search across all categories`
    : selectedCategoryValue === "all"
      ? `Showing ${filteredResources.length} resources in the directory`
      : selectedFeaturedResources.length > 0
        ? `Showing ${filteredResources.length} additional resources in ${selectedCategoryDetail.title}`
        : `Showing ${filteredResources.length} resources in ${selectedCategoryDetail.title}`;

  const renderResourceCard = (item: Resource) => {
    const categoryStyle = getCategoryStyle(item.category);

    return (
      <div
        key={item.id}
        className="rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-xs relative"
        style={{ borderColor: categoryStyle.border }}
        id={`card-${item.id}`}
      >
        <div
          className="h-1 w-full opacity-80 group-hover:opacity-100 transition-opacity absolute top-0 left-0"
          style={{ backgroundColor: categoryStyle.accent }}
        />

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-3.5">
              <span
                className="inline-flex min-h-[30px] max-w-[66%] items-center justify-center px-2.5 py-1 rounded-md text-center text-[10px] font-sans font-bold leading-tight tracking-normal uppercase border"
                style={{
                  backgroundColor: categoryStyle.background,
                  borderColor: categoryStyle.border,
                  color: categoryStyle.text
                }}
              >
                {item.category}
              </span>

              {item.tier === 1 ? (
                <span className="inline-flex min-h-[30px] shrink-0 items-center justify-center px-2.5 py-1 rounded-md text-center text-[10px] font-bold bg-utah-red-soft text-utah-red font-sans uppercase tracking-normal leading-tight">
                  Freshman / Soph
                </span>
              ) : item.tier === 2 ? (
                <span
                  className="inline-flex min-h-[30px] shrink-0 items-center justify-center px-2.5 py-1 rounded-md text-center text-[10px] font-bold border font-sans uppercase tracking-normal leading-tight"
                  style={{
                    backgroundColor: "rgba(112, 142, 153, 0.14)",
                    borderColor: "rgba(112, 142, 153, 0.32)",
                    color: "#4F6871"
                  }}
                >
                  Junior / Senior / Graduate
                </span>
              ) : (
                <span className="inline-flex min-h-[30px] shrink-0 items-center justify-center px-2.5 py-1 rounded-md text-center text-[10px] font-bold bg-gray-100 text-gray-650 border border-gray-200 font-sans uppercase tracking-normal leading-tight">
                  All Levels
                </span>
              )}
            </div>

            {item.deadline && (
              <div className="mb-3 p-2 rounded-md bg-utah-red-soft border border-red-100 flex items-center gap-1.5 text-[11px] font-medium text-utah-red">
                <Calendar className="w-3.5 h-3.5 shrink-0 text-utah-red" />
                <span>
                  Deadline: <strong className="font-bold">{item.deadline}</strong>
                </span>
              </div>
            )}

            <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-utah-red transition-colors leading-snug">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                {item.name}
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </h3>

            <p className="mt-2.5 text-xs text-gray-500 leading-relaxed font-normal">
              {item.description}
            </p>

            {item.contact && (
              <div className="mt-3.5 p-2 bg-gray-50 rounded-lg border border-gray-100 text-[11px] text-gray-600 font-sans">
                <span className="font-extrabold tracking-normal block uppercase text-[8px] text-gray-400">Office Contact</span>
                <span className="truncate block mt-0.5 font-medium">{item.contact}</span>
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-50 flex flex-wrap gap-1">
            {item.relevanceTags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-sans tracking-normal text-gray-550 bg-gray-100/70 px-1.5 py-0.5 rounded cursor-pointer hover:bg-gray-200/70 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery(tag);
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50/60 px-5 sm:px-6 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            onClick={(e) => handleShare(item.id, item.url, e)}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            title="Copy URL link"
            id={`share-btn-${item.id}`}
          >
            {copiedId === item.id ? (
              <Check className="w-3.5 h-3.5 text-utah-red" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-md text-xs font-bold bg-gray-950 text-white hover:bg-utah-red transition-all cursor-pointer"
            id={`visit-btn-${item.id}`}
          >
            <span>Visit Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="directory-browser-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150/60" id="filter-header">
        <div>
          <h2 className="text-xl font-bold font-sans text-gray-950 tracking-normal flex items-center gap-2">
            <Filter className="w-5 h-5 text-utah-red" />
            Explore Resources Directory
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-normal">
            Browse by student need, academic level, or a direct search term.
          </p>
        </div>

        {(searchQuery || selectedCategoryValue !== "all" || selectedTier !== "all") && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors self-start cursor-pointer"
            id="reset-filters-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset active filters
          </button>
        )}
      </div>

      <div className="mt-6 uppercase font-sans tracking-normal" id="directory-search-outer-container">
        <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 block mb-2 px-1">
          Search all resources
        </span>
        <div
          className={`flex items-center bg-white rounded-lg shadow-sm border transition-all duration-300 pl-4 pr-2.5 py-2.5 ${
            isSearchFocused
              ? "border-utah-red ring-4 ring-utah-red-soft scale-[1.005]"
              : "border-gray-200/80 hover:border-gray-300"
          }`}
        >
          <Search className="w-5 h-5 text-gray-400 shrink-0 select-none mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search scholarships, tutoring, advising, internships..."
            className="w-full text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400 font-normal leading-relaxed text-left"
            id="directory-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-650 transition-colors mr-1 shrink-0 cursor-pointer"
              id="directory-search-clear-button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5 z-20 shadow-xs" id="filter-interface-controls">
        <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="shrink-0">
            <span className="text-xs font-sans font-bold text-gray-400 uppercase tracking-normal block">
              Academic Level
            </span>
            <span className="text-[13px] font-sans font-medium text-gray-700 block mt-0.5">
              Refined by student timeline relevance.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5" id="journey-tier-toggles">
            <button
              onClick={() => setSelectedTier("all")}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-normal transition-all active:scale-95 cursor-pointer ${
                selectedTier === "all"
                  ? "bg-utah-red text-white shadow-md shadow-red-600/15"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              id="tier-toggle-all"
            >
              All Academic Levels
            </button>
            <button
              onClick={() => setSelectedTier(1)}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-normal transition-all active:scale-95 cursor-pointer ${
                selectedTier === 1
                  ? "bg-utah-red text-white shadow-md shadow-red-600/15"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              id="tier-toggle-1"
            >
              Tier 1: Freshman & Sophomore
            </button>
            <button
              onClick={() => setSelectedTier(2)}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-normal transition-all active:scale-95 cursor-pointer ${
                selectedTier === 2
                  ? "text-white shadow-md shadow-[#708E99]/15"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              style={
                selectedTier === 2
                  ? { backgroundColor: "#708E99", borderColor: "#708E99" }
                  : {
                      backgroundColor: "rgba(112, 142, 153, 0.08)",
                      borderColor: "rgba(112, 142, 153, 0.28)",
                      color: "#4F6871"
                    }
              }
              id="tier-toggle-2"
            >
              Tier 2: Junior, Senior & Graduate
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 py-1" id="category-scroller">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryValue === cat.value;
            const categoryStyle = getDisplayCategoryStyle(cat.value);

            return (
              <button
                key={cat.value}
                onClick={() => handleCategorySelect(cat.value)}
                className="px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all border shrink-0 hover:brightness-95"
                style={
                  isSelected
                    ? {
                        backgroundColor: categoryStyle.accent,
                        borderColor: categoryStyle.accent,
                        color: "#ffffff"
                      }
                    : {
                        backgroundColor: categoryStyle.background,
                        borderColor: categoryStyle.border,
                        color: categoryStyle.text
                      }
                }
                aria-pressed={isSelected}
                id={`cat-pill-${cat.value.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <section
        className="mt-7 rounded-lg border bg-white px-5 py-6 sm:px-8 text-center"
        style={{ borderColor: activeCategoryStyle.border }}
        id="active-category-panel"
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-flex items-center rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-normal border"
            style={{
              backgroundColor: activeCategoryStyle.background,
              borderColor: activeCategoryStyle.border,
              color: activeCategoryStyle.text
            }}
          >
            {isSearchActive ? "Global Search" : selectedCategoryValue === "all" ? "Directory Overview" : "Category View"}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-950 tracking-normal">
            {isSearchActive ? "Search Results" : selectedCategoryDetail.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {isSearchActive
              ? "Searching across the full directory while preserving your opened category."
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
                  className="group w-full sm:w-[calc((100%-1.5rem)/3)] min-w-[14rem] max-w-[19rem] rounded-lg border bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: activeCategoryStyle.border }}
                  id={`category-featured-${resource.id}`}
                >
                  <span
                    className="inline-flex items-center rounded-md border px-2 py-1 text-[9px] font-bold uppercase tracking-normal"
                    style={{
                      backgroundColor: activeCategoryStyle.background,
                      borderColor: activeCategoryStyle.border,
                      color: activeCategoryStyle.text
                    }}
                  >
                    {getFeaturedResourceLabel(resource.id)}
                  </span>
                  <span className="mt-2 flex items-start justify-between gap-3">
                    <span className="text-sm font-bold leading-snug text-gray-950 group-hover:text-utah-red">
                      {resource.name}
                    </span>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400 group-hover:text-utah-red" />
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-gray-550">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-gray-950 hover:bg-utah-red text-white text-xs font-bold transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-gray-950 hover:bg-utah-red text-white text-xs font-bold transition-colors"
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
        <span className="text-xs font-sans font-medium text-gray-500">
          {resultsSummary}
        </span>
        {(searchQuery || selectedCategoryValue !== "all" || selectedTier !== "all") && (
          <span className="text-[11px] font-sans font-bold tracking-normal uppercase bg-utah-red-soft text-utah-red px-2.5 py-1 rounded-md self-start sm:self-auto">
            Active Filter Set
          </span>
        )}
      </div>

      {filteredResources.length === 0 ? (
        <div className="mt-10 p-12 bg-white rounded-lg border border-gray-200 text-center" id="no-results-panel">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 mx-auto shadow-xs border border-gray-100">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="mt-4 font-bold text-gray-950 text-sm">No matched University Resources</h3>
          <p className="mt-1.5 text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            We could not locate any science guides matching <span className="font-semibold text-gray-800">"{searchQuery}"</span> under current level settings.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 px-5 py-2 bg-gray-950 hover:bg-utah-red text-white text-xs font-semibold rounded-md transition-all cursor-pointer"
            id="empty-state-reset-btn"
          >
            Clear Search & Reset Filters
          </button>
        </div>
      ) : (
        <div id="resources-grouped-results">
          {groupedResources.map(([groupName, groupItems]) => {
            const groupStyle = isKnownCategory(groupName) ? getCategoryStyle(groupName) : activeCategoryStyle;

            return (
              <section key={groupName} className="mt-8" id={`group-${groupName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <div className="mb-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3 w-3 rounded-sm shrink-0"
                      style={{ backgroundColor: groupStyle.accent }}
                      aria-hidden="true"
                    />
                    <h3 className="text-sm sm:text-base font-bold text-gray-950 tracking-normal">
                      {groupName}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-normal text-gray-400">
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
