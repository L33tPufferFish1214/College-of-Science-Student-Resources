import { useState } from "react";
import { PhoneCall, GraduationCap, DollarSign, Compass, Smile, ArrowRight, type LucideIcon } from "lucide-react";
import { IMAGES } from "../data/images";
import { RESOURCES_DATA } from "../data/resources";

interface OverwhelmedRescueProps {
  onSuggestQuery: (query: string, category?: string, tier?: 1 | 2 | "all") => void;
  setActiveView: (view: string) => void;
}

type Scenario = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  urgent: boolean;
  highlightedResource: {
    name: string;
    contact: string;
    desc: string;
    actionLabel: string;
    actionUrl?: string;
    actionQuery?: string;
  };
  quickQuery: string;
  categoryFilter: string;
  tierFilter?: 1 | 2;
};

const HELP_SCENARIOS: Scenario[] = [
  {
    id: "mental-health",
    title: "I'm not coping",
    description:
      "Confidential counseling, or Steven Trujillo, the therapist embedded in the College of Science.",
    icon: Smile,
    urgent: true,
    highlightedResource: {
      name: "Counseling Center: embedded therapist (Steven Trujillo)",
      contact: "strujillo@sa.utah.edu · 801-581-6826",
      desc: "Free, private mental health support from someone who works with STEM students' workloads every day.",
      actionLabel: "Book an appointment",
      actionUrl: "https://counselingcenter.utah.edu/services/appointment.php"
    },
    quickQuery: "therapist",
    categoryFilter: "Wellness & Mental Health"
  },
  {
    id: "grades",
    title: "I'm behind in a class",
    description:
      "Math, chemistry and physics courses are hard by design. Free tutoring exists for every one of them.",
    icon: GraduationCap,
    urgent: false,
    highlightedResource: {
      name: "Mathematics & Chemistry Tutoring Centers",
      contact: "Free drop-in peer tutoring, no appointment",
      desc: "Department-run rooms with peer tutors, past exams and quiet study space.",
      actionLabel: "See all academic help",
      actionQuery: "tutoring"
    },
    quickQuery: "tutoring",
    categoryFilter: "Academic Help"
  },
  {
    id: "money",
    title: "I'm out of money",
    description:
      "Scholarships, grants, emergency funds and payment plans, most of it goes unclaimed each year.",
    icon: DollarSign,
    urgent: false,
    highlightedResource: {
      name: "ScholarshipUniverse",
      contact: "Financial aid advisors available",
      desc: "One application that matches your profile against eligible University of Utah and external scholarships.",
      actionLabel: "Open ScholarshipUniverse",
      actionUrl: "https://utah.scholarshipuniverse.com/student/application/25730/847257"
    },
    quickQuery: "ScholarshipUniverse",
    categoryFilter: "Scholarships & Financial Aid"
  },
  {
    id: "lost-freshman",
    title: "I can't figure out my schedule",
    description:
      "Class planning, AP credit, permission codes and prerequisites, an advisor sorts this in one appointment.",
    icon: Compass,
    urgent: false,
    highlightedResource: {
      name: "Drop-in advising & the Academic Advising Center",
      contact: "science.utah.edu/students/academic-advising/",
      desc: "Talk to an academic or peer advisor and leave with a class roadmap you can actually register for.",
      actionLabel: "Go to Academic Advising",
      actionUrl: "https://science.utah.edu/students/academic-advising/"
    },
    quickQuery: "advising",
    categoryFilter: "Advising & Course Planning",
    tierFilter: 1
  }
];

export function OverwhelmedRescue({ onSuggestQuery, setActiveView }: OverwhelmedRescueProps) {
  const [activeRescueTag, setActiveRescueTag] = useState<string | null>(null);
  const activeScenario = HELP_SCENARIOS.find((item) => item.id === activeRescueTag);

  const handleRescueSelect = (scenario: Scenario) => {
    setActiveRescueTag(scenario.id);
  };

  return (
    <div id="overwhelmed-rescue-block">
      {/* Page banner, styled like an interior U page header */}
      <div
        className="on-dark relative bg-utah-char bg-cover bg-center py-16"
        style={{ backgroundImage: `url("${IMAGES.studentsCandid}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/55" />
        <div className="relative mx-auto max-w-[1240px] px-6">
          <span className="font-sans text-[12.5px] font-semibold text-[#ff9a9a]">
            Student Resource Guide
          </span>
          <h1 className="mt-3 font-slab text-[32px] font-bold text-white sm:text-[42px]">
            Start where you are.
          </h1>
          <p className="mt-3 max-w-2xl text-[17px] text-white/90">
            Pick whichever is closest to how things are going. Each one points at the office that actually handles it.
            No forms, no runaround.
          </p>
        </div>
      </div>

      {/* Crisis line stays above everything else on the page */}
      <div className="on-dark border-b-4 border-utah-red-dark bg-utah-red">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-4 px-6 py-5">
          <PhoneCall className="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
          <div>
            <span className="block font-sans text-[12.5px] font-semibold text-white/80">
              24/7 crisis support
            </span>
            <span className="block font-slab text-[20px] font-bold text-white">Call or text 988</span>
          </div>
          <span className="text-[15px] text-white/85 sm:ml-2">Free, confidential, any time.</span>
          <a
            href="https://safeut.med.utah.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto border-2 border-white rounded-full px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-utah-red"
          >
            SafeUT crisis chat
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <div
          className="grid grid-cols-1 gap-px border border-utah-rule bg-utah-rule md:grid-cols-2 lg:grid-cols-4"
          id="rescue-scenarios-grid"
        >
          {HELP_SCENARIOS.map((item) => {
            const isSelected = activeRescueTag === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleRescueSelect(item)}
                aria-pressed={isSelected}
                className={`group flex h-full flex-col justify-between p-7 text-left transition-colors ${
                  isSelected ? "bg-utah-ink" : "bg-white hover:bg-utah-shade"
                }`}
                id={`rescue-btn-${item.id}`}
              >
                <div>
                  <span
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center ${
                      isSelected ? "bg-utah-red text-white" : "bg-utah-red-soft text-utah-red"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2
                    className={`font-slab text-[19px] font-bold leading-tight ${
                      isSelected ? "text-white" : "text-utah-ink"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p className={`mt-2.5 text-[14.5px] leading-relaxed ${isSelected ? "text-white/80" : "text-gray-650"}`}>
                    {item.description}
                  </p>
                </div>

                <span
                  className={`mt-6 flex items-center gap-1.5 font-sans text-[12.5px] font-semibold ${
                    isSelected ? "text-white" : "text-utah-red"
                  }`}
                >
                  {isSelected ? "Showing below" : "See what helps"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>

        {activeScenario && (
          <div className="animate-fade-in mt-10 border-l-4 border-utah-red bg-utah-shade p-7 sm:p-9" id="rescue-feedback-card">
            <div className="flex flex-col items-start justify-between gap-7 lg:flex-row">
              <div>
                <span className="inline-block bg-utah-red rounded-full px-2.5 py-1 font-sans text-[12.5px] font-semibold text-white">
                  Start with this
                </span>
                <h3 className="mt-3.5 font-slab text-[22px] font-bold text-utah-ink">
                  {activeScenario.highlightedResource.name}
                </h3>
                <p className="mt-1.5 font-sans text-[13.5px] font-semibold text-utah-warm">
                  {activeScenario.highlightedResource.contact}
                </p>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-gray-650">
                  {activeScenario.highlightedResource.desc}
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                <button
                  onClick={() =>
                    onSuggestQuery(
                      activeScenario.quickQuery,
                      activeScenario.categoryFilter,
                      activeScenario.tierFilter
                    )
                  }
                  className="border-2 border-utah-ink rounded-full px-5 py-3 text-center font-sans text-[13px] font-semibold text-utah-ink transition-colors hover:bg-utah-ink hover:text-white"
                  id="secondary-rescue-action"
                >
                  Search related resources
                </button>
                {activeScenario.highlightedResource.actionUrl ? (
                  <a
                    href={activeScenario.highlightedResource.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-utah-red rounded-full px-6 py-3 text-center font-sans text-[13px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
                    id="primary-rescue-action-link"
                  >
                    {activeScenario.highlightedResource.actionLabel}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      if (activeScenario.highlightedResource.actionQuery) {
                        onSuggestQuery(
                          activeScenario.highlightedResource.actionQuery,
                          activeScenario.categoryFilter
                        );
                      }
                    }}
                    className="bg-utah-red rounded-full px-6 py-3 text-center font-sans text-[13px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
                    id="primary-rescue-action-btn"
                  >
                    {activeScenario.highlightedResource.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-utah-rule pt-7 text-center">
          <p className="text-[15px] text-gray-650">
            None of these quite fit?{" "}
            <button
              type="button"
              onClick={() => setActiveView("resources")}
              className="font-semibold text-utah-red underline underline-offset-4 hover:text-utah-red-dark"
            >
              Browse all {RESOURCES_DATA.length} resources
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
