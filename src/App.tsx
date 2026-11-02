import { useEffect, useMemo, useState } from "react";
import {
  Briefcase, Building2, CalendarCheck, HandCoins, HeartPulse, Home,
  type LucideIcon, Microscope, ShieldAlert, Users, Wallet, Accessibility, BookOpen
} from "lucide-react";
import { Header } from "./components/Header";
import { SearchSection } from "./components/SearchSection";
import { OverwhelmedRescue } from "./components/OverwhelmedRescue";
import { ResourceGrid } from "./components/ResourceGrid";
import { CareerOutlookVisualizer } from "./components/CareerOutlook";
import { IMAGES, U_LOGO_INSTITUTIONAL } from "./data/images";
import { RESOURCES_DATA } from "./data/resources";

type SpotlightGroup = {
  icon: LucideIcon;
  title: string;
  image: string;
  blurb: string;
  resourceIds: string[];
};

type CategoryTile = {
  icon: LucideIcon;
  label: string;
  category: string;
  blurb: string;
};

type FeaturedProgram = {
  tagline: string;
  title: string;
  blurb: string;
  image: string;
  query: string;
  category: string;
  tier: 1 | 2 | "all";
};

const SPOTLIGHT_GROUPS: SpotlightGroup[] = [
  {
    icon: Microscope,
    title: "Research Starters",
    image: IMAGES.labStock,
    blurb:
      "SRI, UROP, SPUR and the Undergraduate Research Symposium, five ways into a lab, whatever year you’re in.",
    resourceIds: [
      "science-research-initiative",
      "urop-undergrad-research",
      "spur-summer-research",
      "undergrad-research-symposium",
      "research-at-the-u-overview"
    ]
  },
  {
    icon: CalendarCheck,
    title: "Advising & Registration",
    image: IMAGES.advisingHive,
    blurb:
      "Book an appointment, request a permission code, find drop-in hours and plan your degree with your department advisor.",
    resourceIds: [
      "academic-advising-hub",
      "schedule-advising-appointment",
      "permission-code-requests",
      "drop-in-advising",
      "math-permission-codes-registration"
    ]
  },
  {
    icon: BookOpen,
    title: "Academic Help",
    image: IMAGES.studentsCandid,
    blurb:
      "The Learning Center, Math and Chemistry tutoring centers, E-Tutoring and the Writing Center, all free to you.",
    resourceIds: [
      "the-learning-center",
      "mathematics-tutoring-center",
      "chemistry-tutoring-center",
      "e-tutoring-online",
      "writing-center"
    ]
  },
  {
    icon: Wallet,
    title: "Money & Opportunities",
    image: IMAGES.crockerExterior,
    blurb:
      "ScholarshipUniverse, ACCESS Scholars and every departmental award, in one list you can work through in an afternoon.",
    resourceIds: [
      "scholarship-universe-portal",
      "access-scholars-program",
      "csar-scholarships",
      "chemistry-scholarships",
      "biology-scholarships"
    ]
  },
  {
    icon: Users,
    title: "Campus Life & Support",
    image: IMAGES.studentsAdvising,
    blurb:
      "CSAR, Campus Connect, the Feed U Pantry, wellness coaching and campus recreation, the things that keep a term survivable.",
    resourceIds: [
      "csar-home",
      "campus-connect-student-organizations",
      "feed-u-food-pantry",
      "center-for-campus-wellness",
      "campus-recreation-services"
    ]
  },
  {
    icon: Briefcase,
    title: "Careers & Teaching",
    image: IMAGES.campusStock,
    blurb:
      "The Learning Assistant program, science internships, Handshake and U Career Success coaching.",
    resourceIds: [
      "learning-assistant-program",
      "science-internships-page",
      "handshake-job-board",
      "u-career-success",
      "career-coaching-hub"
    ]
  }
];

const CATEGORY_TILES: CategoryTile[] = [
  { icon: BookOpen, label: "Academic Help", category: "Academic Help", blurb: "Tutoring, study skills, writing" },
  { icon: HandCoins, label: "Scholarships & Aid", category: "Scholarships & Financial Aid", blurb: "Awards, FAFSA, emergency funds" },
  { icon: Microscope, label: "Research & Internships", category: "Research & Internships", blurb: "Labs, stipends, symposia" },
  { icon: CalendarCheck, label: "Advising & Planning", category: "Advising & Course Planning", blurb: "Advisors, codes, degree maps" },
  { icon: Briefcase, label: "Career Development", category: "Career Development", blurb: "Handshake, coaching, résumés" },
  { icon: HeartPulse, label: "Wellness & Counseling", category: "Wellness & Mental Health", blurb: "Therapy, crisis lines, recreation" },
  { icon: Users, label: "Community & Orgs", category: "Community & Student Orgs", blurb: "Clubs, identity centers, events" },
  { icon: Home, label: "Housing & Campus Life", category: "Housing & Campus Life", blurb: "Housing, food, transport" },
  { icon: Accessibility, label: "Student Access & Support", category: "Student Access & Support", blurb: "Accommodations, CSAR, advocacy" },
  { icon: ShieldAlert, label: "Emergency & Safety", category: "Emergency & Safety", blurb: "Crisis lines, SafeU, police" },
  { icon: Building2, label: "Department Hubs", category: "Department Hubs", blurb: "Biology, Chemistry, Math, Physics…" }
];

const FEATURED_PROGRAMS: FeaturedProgram[] = [
  {
    tagline: "Research from day one",
    title: "Science Research Initiative",
    blurb:
      "Join a working lab with a faculty mentor in your first year. No prior research experience required.",
    image: IMAGES.campusStock,
    query: "SRI",
    category: "Research & Internships",
    tier: 1
  },
  {
    tagline: "$21,000 stipend",
    title: "Beckman Scholars Program",
    blurb:
      "A 15-month mentored research scholarship in biology or chemistry, with stipend and travel funds.",
    image: IMAGES.beckmanLogo,
    query: "beckman",
    category: "Scholarships & Financial Aid",
    tier: 2
  },
  {
    tagline: "800+ alumni",
    title: "ACCESS Scholars Program",
    blurb:
      "A first-year STEM cohort with a tuition award, lab placement and multi-year mentorship.",
    image: IMAGES.studentsAdvising,
    query: "ACCESS",
    category: "Scholarships & Financial Aid",
    tier: 1
  }
];

const FOOTER_DEPARTMENTS: { label: string; href: string }[] = [
  { label: "Biology", href: "https://biology.utah.edu/" },
  { label: "Chemistry", href: "https://chem.utah.edu/" },
  { label: "Mathematics", href: "https://www.math.utah.edu/" },
  { label: "Physics & Astronomy", href: "https://www.physics.utah.edu/" },
  { label: "Mining & Earth Sciences", href: "https://www.mines.utah.edu/" }
];

// ponytail: footer links resolve out of RESOURCES_DATA by id rather than being
// re-typed here, so a URL only ever has to be corrected in one place.
const resourceUrl = (id: string) => RESOURCES_DATA.find((item) => item.id === id)?.url;

const FOOTER_OFFICIAL: { label: string; id?: string; href?: string }[] = [
  { label: "science.utah.edu", href: "https://science.utah.edu/" },
  { label: "Academic advising", id: "academic-advising-hub" },
  { label: "Financial aid", id: "financial-aid-counselor" },
  { label: "Campus wellness", id: "center-for-campus-wellness" },
  { label: "U Career Success", id: "u-career-success" }
];

const FOOTER_URGENT: { label: string; id?: string; href?: string }[] = [
  { label: "Crisis support", id: "crisis-mental-health" },
  { label: "SafeUT crisis chat", id: "safeut-crisis-chat" },
  { label: "SafeU reporting", id: "safeu-reporting" },
  { label: "Feed U Pantry", id: "feed-u-food-pantry" },
  { label: "Emergency 911", id: "emergency-911" }
];

export default function App() {
  const [activeView, setActiveView] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<1 | 2 | "all">("all");
  const [quickResourceIds, setQuickResourceIds] = useState<string[] | null>(null);

  // ponytail: native History API instead of a router, this app only ever
  // needs the browser back/forward buttons to retrace in-app view switches
  // (e.g. home -> resources), not deep-linkable URLs per view.
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      setActiveView(event.state?.view ?? "home");
    };
    history.replaceState({ view: "home" }, "");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (history.state?.view !== activeView) {
      history.pushState({ view: activeView }, "");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  // Counts come from the data, so a tile can never advertise a number the
  // directory doesn't actually have.
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const resource of RESOURCES_DATA) {
      counts.set(resource.category, (counts.get(resource.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  const handleViewChange = (view: string) => {
    setQuickResourceIds(null);
    setActiveView(view);
  };

  const handleSuggestQuery = (queryText: string, categoryVal?: string, tierVal?: 1 | 2 | "all") => {
    setQuickResourceIds(null);
    setSearchQuery(queryText);
    if (categoryVal) setSelectedCategory(categoryVal);
    if (tierVal !== undefined) setSelectedTier(tierVal);
    setActiveView("resources");
  };

  const handlePopularSelect = (queryText: string) => {
    setQuickResourceIds(null);
    setSearchQuery(queryText);
    setSelectedCategory("all");
    setSelectedTier("all");
    setActiveView("resources");
  };

  const handleQuickCategoryClick = (categoryVal: string) => {
    setQuickResourceIds(null);
    setSelectedCategory(categoryVal);
    setSelectedTier("all");
    setSearchQuery("");
    setActiveView("resources");
  };

  const handleQuickResourceClick = (resourceIds: string[]) => {
    setQuickResourceIds(resourceIds);
    setSelectedCategory("all");
    setSelectedTier("all");
    setSearchQuery("");
    setActiveView("resources");
  };

  const handleDirectorySearchChange = (queryText: string) => {
    setQuickResourceIds(null);
    setSearchQuery(queryText);
  };

  const handleDirectoryCategoryChange = (categoryVal: string) => {
    setQuickResourceIds(null);
    setSelectedCategory(categoryVal);
  };

  const handleDirectoryTierChange = (tierVal: 1 | 2 | "all") => {
    setQuickResourceIds(null);
    setSelectedTier(tierVal);
  };

  const directoryResources = quickResourceIds
    ? RESOURCES_DATA.filter((resource) => quickResourceIds.includes(resource.id))
    : RESOURCES_DATA;

  return (
    <div className="flex min-h-screen flex-col bg-white" id="app-viewport">
      <Header activeView={activeView} setActiveView={handleViewChange} />

      <main className="flex-1" id="main-content-layout">
        {activeView === "home" && (
          <div id="homepage-view">
            <SearchSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onPopularSelect={handlePopularSelect}
              onCategorySelect={handleQuickCategoryClick}
              setActiveView={handleViewChange}
            />

            {/* ---------- Start Here: photo cards, the U template's news block ---------- */}
            <section className="py-16 sm:py-[72px]" id="homepage-spotlight-section">
              <div className="mx-auto max-w-[1240px] px-6">
                <div className="mb-11 text-center">
                  <h2 className="font-slab text-[26px] font-bold text-utah-ink sm:text-[34px]">Start Here</h2>
                  <div className="mx-auto mb-4 mt-3.5 h-[3px] w-14 bg-utah-red" />
                  <p className="mx-auto max-w-2xl text-[16px] text-gray-650">
                    The hubs and programs students reach for first.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3" id="homepage-spotlight-grid">
                  {SPOTLIGHT_GROUPS.map((group) => (
                    <button
                      key={group.title}
                      type="button"
                      onClick={() => handleQuickResourceClick(group.resourceIds)}
                      className="group flex flex-col border border-gray-150 bg-white text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.13)]"
                      id={`spotlight-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    >
                      <span
                        className="h-[190px] w-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${group.image}")` }}
                        aria-hidden="true"
                      />
                      <span className="flex flex-1 flex-col p-6">
                        <span className="-mt-14 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-utah-red text-white shadow-lg">
                          <group.icon size={24} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="font-slab text-[20px] font-bold leading-tight text-utah-ink">
                          {group.title}
                        </span>
                        <span className="mt-2.5 flex-1 text-[15px] text-gray-650">{group.blurb}</span>
                        <span className="mt-5 self-start rounded-full bg-utah-red px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors group-hover:bg-utah-red-dark">
                          See these resources
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------- Browse by need: bordered category strip ---------- */}
            <section className="bg-utah-shade py-16 sm:py-[72px]" id="quick-categories-section">
              <div className="mx-auto max-w-[1240px] px-6">
                <div className="mb-11 text-center">
                  <h2 className="font-slab text-[26px] font-bold text-utah-ink sm:text-[34px]">Browse by Need</h2>
                  <div className="mx-auto mt-3.5 h-[3px] w-14 bg-utah-red" />
                </div>

                <div className="flex flex-wrap justify-center gap-5" id="home-quick-grid">
                  {CATEGORY_TILES.map((tile) => (
                    <button
                      key={tile.category}
                      type="button"
                      onClick={() => handleQuickCategoryClick(tile.category)}
                      className="group flex w-full flex-col gap-2 rounded-2xl border border-utah-rule bg-white p-6 text-left sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] transition-all hover:-translate-y-0.5 hover:border-utah-red hover:shadow-[0_10px_26px_rgba(0,0,0,0.10)]"
                      id={`home-category-${tile.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    >
                      <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl bg-utah-red-soft text-utah-red transition-colors group-hover:bg-utah-red group-hover:text-white">
                        <tile.icon size={22} aria-hidden="true" />
                      </span>
                      <span className="font-slab text-[17px] font-bold text-utah-ink">{tile.label}</span>
                      <span className="flex-1 text-[14px] text-gray-550">{tile.blurb}</span>
                      <span className="mt-3 border-t border-gray-150 pt-3 text-[13px] text-gray-550">
                        Resources available:{" "}
                        <span className="font-bold text-utah-red">{categoryCounts.get(tile.category) ?? 0}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------- Featured programs on the U's pattern band ---------- */}
            <section
              className="on-dark bg-utah-char bg-[length:300px] py-16 sm:py-[72px]"
              style={{ backgroundImage: `url("${IMAGES.pattern}")`, backgroundBlendMode: "luminosity" }}
              id="featured-programs-section"
            >
              <div className="mx-auto max-w-[1240px] px-6">
                <div className="mb-11 text-center">
                  <h2 className="font-slab text-[26px] font-bold text-white sm:text-[34px]">Career Accelerators</h2>
                  <div className="mx-auto mb-4 mt-3.5 h-[3px] w-14 bg-utah-red" />
                  <p className="mx-auto max-w-2xl text-[16px] text-white/85">
                    Three College of Science programs worth putting a deadline in your calendar for.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-3" id="featured-cards-grid">
                  {FEATURED_PROGRAMS.map((program) => (
                    <div key={program.title} className="flex flex-col bg-white" id={`featured-${program.query.toLowerCase()}`}>
                      <span
                        className="h-[150px] w-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${program.image}")` }}
                        aria-hidden="true"
                      />
                      <div className="flex flex-1 flex-col p-6">
                        <span className="self-start rounded-full bg-utah-red px-3 py-1.5 font-sans text-[12px] font-semibold text-white">
                          {program.tagline}
                        </span>
                        <h3 className="mt-3.5 font-slab text-[20px] font-bold text-utah-ink">{program.title}</h3>
                        <p className="mt-2.5 flex-1 text-[14.5px] text-gray-650">{program.blurb}</p>
                        <button
                          type="button"
                          onClick={() => handleSuggestQuery(program.query, program.category, program.tier)}
                          className="mt-5 self-start rounded-full border-2 border-utah-red px-5 py-2.5 font-sans text-[13px] font-semibold text-utah-red transition-colors hover:bg-utah-red hover:text-white"
                        >
                          Search {program.title.split(" ")[0]} resources
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------- Crimson triage band ---------- */}
            <section className="on-dark bg-utah-red py-14" id="emotional-rescue-block-section">
              <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-10 px-6">
                <div>
                  <h2 className="font-slab text-[26px] font-bold text-white sm:text-[30px]">
                    Not sure what you need?
                  </h2>
                  <p className="mt-2 max-w-2xl text-[16.5px] text-white/92">
                    Tell us what’s going on, behind on a class, out of money, can’t register, not coping, and we’ll
                    point you at the right office.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleViewChange("overwhelmed")}
                  className="ml-auto rounded-full border-2 border-white px-7 py-3.5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-utah-red"
                  id="distress-button"
                >
                  Feeling lost? Start here
                </button>
              </div>
            </section>
          </div>
        )}

        {activeView === "resources" && (
          <ResourceGrid
            resources={directoryResources}
            searchQuery={searchQuery}
            setSearchQuery={handleDirectorySearchChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleDirectoryCategoryChange}
            selectedTier={selectedTier}
            setSelectedTier={handleDirectoryTierChange}
          />
        )}

        {activeView === "careers" && <CareerOutlookVisualizer />}

        {activeView === "overwhelmed" && (
          <div id="overwhelmed-dedicated-view">
            <OverwhelmedRescue onSuggestQuery={handleSuggestQuery} setActiveView={handleViewChange} />
          </div>
        )}
      </main>

      {/* ---------- Black U footer ---------- */}
      <footer className="on-dark mt-auto bg-utah-black pt-14 text-[#cfcaca]" id="app-footer">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="grid grid-cols-2 items-start gap-8 lg:grid-cols-5">
            <div>
              <h2 className="mb-4 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-white">
                Resources
              </h2>
              <ul className="list-none space-y-2.5 p-0">
                <li>
                  <button
                    type="button"
                    onClick={() => handleViewChange("resources")}
                    className="text-[12px] uppercase tracking-[0.07em] text-[#cfcaca] transition-colors hover:text-white"
                  >
                    Full directory
                  </button>
                </li>
                {CATEGORY_TILES.slice(0, 4).map((tile) => (
                  <li key={tile.category}>
                    <button
                      type="button"
                      onClick={() => handleQuickCategoryClick(tile.category)}
                      className="text-left text-[12px] uppercase tracking-[0.07em] text-[#cfcaca] transition-colors hover:text-white"
                    >
                      {tile.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-white">
                Departments
              </h2>
              <ul className="list-none space-y-2.5 p-0">
                {FOOTER_DEPARTMENTS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] uppercase tracking-[0.07em] text-[#cfcaca] transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 order-first text-center lg:order-none lg:col-span-1">
              <img
                src={U_LOGO_INSTITUTIONAL}
                alt="University of Utah"
                className="mx-auto mb-3.5 h-[92px] w-auto"
                referrerPolicy="no-referrer"
              />
              <address className="text-[12.5px] not-italic leading-relaxed text-[#cfcaca]">
                1430 Presidents Circle
                <br />
                Salt Lake City, UT 84112
                <br />
                801-581-6958
              </address>
            </div>

            <div>
              <h2 className="mb-4 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-white">
                Official Pages
              </h2>
              <ul className="list-none space-y-2.5 p-0">
                {FOOTER_OFFICIAL.map((item) => {
                  const href = item.href ?? (item.id ? resourceUrl(item.id) : undefined);
                  if (!href) return null;
                  return (
                    <li key={item.label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] uppercase tracking-[0.07em] text-[#cfcaca] transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-white">Urgent</h2>
              <ul className="list-none space-y-2.5 p-0">
                {FOOTER_URGENT.map((item) => {
                  const href = item.href ?? (item.id ? resourceUrl(item.id) : undefined);
                  if (!href) return null;
                  return (
                    <li key={item.label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] uppercase tracking-[0.07em] text-[#cfcaca] transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-[#2a2a2a] px-0 pb-8 pt-6 text-center text-[11.5px] text-[#8e8686]">
            An independent student project, not an official University of Utah website. Always confirm deadlines and
            policies on the official page.
          </div>
        </div>
      </footer>
    </div>
  );
}
