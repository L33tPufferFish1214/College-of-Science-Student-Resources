import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { SearchSection } from "./components/SearchSection";
import { OverwhelmedRescue } from "./components/OverwhelmedRescue";
import { ResourceGrid } from "./components/ResourceGrid";
import { CareerOutlookVisualizer } from "./components/CareerOutlook";
import { getCategoryStyle } from "./data/categoryStyles";
import { RESOURCES_DATA } from "./data/resources";
import { 
  GraduationCap, 
  Award, 
  FlaskConical, 
  Heart, 
  HeartHandshake,
  BriefcaseBusiness,
  Compass,
  DollarSign,
  LifeBuoy,
  Microscope,
  UserCheck, 
  Users, 
  ArrowRight, 
  type LucideIcon
} from "lucide-react";

type QuickCard = {
  label: string;
  icon: LucideIcon;
  category: string;
  resourceIds?: string[];
};

type SpotlightGroup = {
  title: string;
  icon: LucideIcon;
  resourceIds: string[];
  examples: string[];
  accent: string;
};

export default function App() {
  const [activeView, setActiveView] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<1 | 2 | "all">("all");
  const [quickResourceIds, setQuickResourceIds] = useState<string[] | null>(null);

  // ponytail: native History API instead of a router — this app only ever
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

  const handleViewChange = (view: string) => {
    setQuickResourceIds(null);
    setActiveView(view);
  };

  // Connected navigation query planner
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

  // Fast category click routes from homepage cards
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

  // Homepage QUICK ACCESS CARDS definitions
  const QUICK_CARDS: QuickCard[] = [
    { label: "Academic Support", icon: GraduationCap, category: "Academic Help" },
    { label: "Scholarships", icon: Award, category: "Scholarships & Financial Aid" },
    { label: "Student Access", icon: HeartHandshake, category: "Student Access & Support" },
    { label: "Research Opportunities", icon: FlaskConical, category: "Research & Internships" },
    { label: "Advising & Planning", icon: UserCheck, category: "Advising & Course Planning" },
    { label: "Wellness & Counseling", icon: Heart, category: "Wellness & Mental Health" },
    { label: "Student Communities", icon: Users, category: "Community & Student Orgs" }
  ];

  const SPOTLIGHT_GROUPS: SpotlightGroup[] = [
    {
      title: "Research Starters",
      icon: Microscope,
      resourceIds: [
        "science-research-initiative",
        "urop-undergrad-research",
        "spur-summer-research",
        "undergrad-research-symposium",
        "research-at-the-u-overview"
      ],
      examples: ["SRI", "UROP", "SPUR", "Research Symposium"],
      accent: "#B72222"
    },
    {
      title: "Academic Help",
      icon: LifeBuoy,
      resourceIds: [
        "the-learning-center",
        "mathematics-tutoring-center",
        "chemistry-tutoring-center",
        "e-tutoring-online",
        "writing-center"
      ],
      examples: ["Learning Center", "Math Center", "E-Tutoring", "Writing Center"],
      accent: "#2563EB"
    },
    {
      title: "Advising & Registration",
      icon: Compass,
      resourceIds: [
        "academic-advising-hub",
        "schedule-advising-appointment",
        "permission-code-requests",
        "drop-in-advising",
        "math-permission-codes-registration"
      ],
      examples: ["Advising Hub", "Appointments", "Permission Codes", "Degree Plans"],
      accent: "#047857"
    },
    {
      title: "Money & Opportunities",
      icon: DollarSign,
      resourceIds: [
        "scholarship-universe-portal",
        "access-scholars-program",
        "csar-scholarships",
        "chemistry-scholarships",
        "biology-scholarships"
      ],
      examples: ["ScholarshipUniverse", "ACCESS", "Department Awards", "Financial Aid"],
      accent: "#A16207"
    },
    {
      title: "Campus Life & Support",
      icon: HeartHandshake,
      resourceIds: [
        "csar-home",
        "campus-connect-student-organizations",
        "feed-u-food-pantry",
        "center-for-campus-wellness",
        "campus-recreation-services"
      ],
      examples: ["CSAR", "Campus Connect", "Feed U Pantry", "Wellness"],
      accent: "#7C3AED"
    },
    {
      title: "Careers & Teaching",
      icon: BriefcaseBusiness,
      resourceIds: [
        "learning-assistant-program",
        "science-internships-page",
        "handshake-job-board",
        "u-career-success",
        "career-coaching-hub"
      ],
      examples: ["LA Program", "Internships", "Handshake", "Career Success"],
      accent: "#C2410C"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f5]" id="app-viewport">
      
      {/* Universal Sticky Header with University of Utah logo */}
      <Header 
        activeView={activeView} 
        setActiveView={handleViewChange}
      />

      {/* Main Container */}
      <main className="flex-1" id="main-content-layout">
        
        {/* VIEW ROUTING SYSTEM */}
        {activeView === "home" && (
          <div className="space-y-6 pb-16" id="homepage-view">
            
            {/* Search Centerpiece Section */}
            <SearchSection 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onPopularSelect={handlePopularSelect}
              setActiveView={handleViewChange}
            />

            {/* Mainstream resource shortcuts */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="homepage-spotlight-section">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-950 tracking-normal">
                    Start With These
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Broad resource hubs and programs students most often need first.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3" id="homepage-spotlight-grid">
                {SPOTLIGHT_GROUPS.map((group) => {
                  const IconComponent = group.icon;
                  return (
                    <button
                      key={group.title}
                      type="button"
                      onClick={() => handleQuickResourceClick(group.resourceIds)}
                      className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                      id={`spotlight-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <span
                            className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${group.accent}14`, color: group.accent }}
                          >
                            <IconComponent className="w-4.5 h-4.5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-gray-950 tracking-normal">
                              {group.title}
                            </span>
                            <span className="mt-2 flex flex-wrap gap-1.5">
                              {group.examples.map((example) => (
                                <span
                                  key={example}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[11px] font-medium leading-none"
                                >
                                  {example}
                                </span>
                              ))}
                            </span>
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0 mt-2" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Quick Access Grid Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="quick-categories-section">
              
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4" id="home-quick-grid">
                {QUICK_CARDS.map((card) => {
                  const IconComponent = card.icon;
                  const categoryStyle = getCategoryStyle(card.category);
                  return (
                    <button
                      key={card.label}
                      onClick={() => {
                        if (card.resourceIds) {
                          handleQuickResourceClick(card.resourceIds);
                        } else {
                          handleQuickCategoryClick(card.category);
                        }
                      }}
                      className="relative overflow-hidden p-5 bg-white border rounded-lg text-center hover:shadow-md transition-all group flex flex-col items-center justify-center gap-3.5 cursor-pointer"
                      style={{ borderColor: categoryStyle.border }}
                      id={`home-category-${card.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <span
                        className="absolute inset-x-0 top-0 h-1 opacity-85"
                        style={{ backgroundColor: categoryStyle.accent }}
                      />
                      <div
                        className="p-3 rounded-md transition-colors"
                        style={{
                          backgroundColor: categoryStyle.background,
                          color: categoryStyle.accent
                        }}
                      >
                        <IconComponent className="w-5 h-5 shrink-0" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 tracking-normal block">
                        {card.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Supportive Help rescue Banner */}
            <section className="py-2" id="emotional-rescue-block-section">
              <OverwhelmedRescue 
                onSuggestQuery={handleSuggestQuery} 
                setActiveView={handleViewChange}
              />
            </section>

            {/* Featured high value Opportunities Panels */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="featured-programs-section">
              <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-lg" id="featured-wrapper">
                <div className="flex items-center mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 tracking-normal">
                    Featured College of Science Career Accelerators
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="featured-cards-grid">
                  {/* SRI */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between" id="featured-sri">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-utah-red-soft text-utah-red text-[9px] font-sans font-bold uppercase tracking-normal mb-3">
                        Research Day 1
                      </span>
                      <h4 className="font-bold text-gray-950 text-sm sm:text-base leading-snug">
                        Science Research Initiative (SRI)
                      </h4>
                      <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                        Work inside dynamic research laboratories with world-recognized faculty mentors. Zero science experience required prior to admissions.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSuggestQuery("SRI", "Research & Internships", 1)}
                      className="mt-4 text-xs font-bold text-utah-red inline-flex items-center gap-1.5 hover:underline text-left self-start"
                      id="sri-feature-btn"
                    >
                      <span>Explore SRI and SRI-CAP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Beckman */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between" id="featured-beckman">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 text-[9px] font-sans font-bold uppercase tracking-normal mb-3">
                        $21,000 Stipend
                      </span>
                      <h4 className="font-bold text-gray-950 text-sm sm:text-base leading-snug">
                        Beckman Scholars Program
                      </h4>
                      <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                        High-stakes 15-month biology or chemistry honors research scholarships with generous stipend funds and travel allowances.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSuggestQuery("beckman", "Scholarships & Financial Aid", 2)}
                      className="mt-4 text-xs font-bold text-utah-red inline-flex items-center gap-1.5 hover:underline text-left self-start"
                      id="beckman-feature-btn"
                    >
                      <span>How to apply for Beckman</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* ACCESS */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between" id="featured-access">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-utah-red-soft text-utah-red text-[9px] font-sans font-bold uppercase tracking-normal mb-3">
                        800+ Alumnae
                      </span>
                      <h4 className="font-bold text-gray-950 text-sm sm:text-base leading-snug">
                        ACCESS Scholars Program
                      </h4>
                      <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                        Accelerate women and minority leaders in STEM with tuition awards, immediate research labs coordination, and multi-year networking mentorship.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSuggestQuery("ACCESS", "Scholarships & Financial Aid", 1)}
                      className="mt-4 text-xs font-bold text-utah-red inline-flex items-center gap-1.5 hover:underline text-left self-start"
                      id="access-feature-btn"
                    >
                      <span>Learn about ACCESS Scholars</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
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

        {activeView === "careers" && (
          <CareerOutlookVisualizer />
        )}

        {activeView === "overwhelmed" && (
          <div className="py-6" id="overwhelmed-dedicated-view">
            <OverwhelmedRescue 
              onSuggestQuery={handleSuggestQuery} 
              setActiveView={handleViewChange}
            />
          </div>
        )}

      </main>

      {/* Clean Centered Personal Style Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 mt-auto" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-gray-500">
            Created by students for students
          </p>
        </div>
      </footer>

    </div>
  );
}
