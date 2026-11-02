import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, ChevronRight, ChevronLeft } from "lucide-react";
import { IMAGES } from "../data/images";
import { RESOURCES_DATA, type Resource } from "../data/resources";
import { createResourceSearch } from "../lib/search";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPopularSelect: (category: string) => void;
  onCategorySelect: (category: string) => void;
  setActiveView: (view: string) => void;
}

type Slide = {
  image: string;
  heading: string;
  body: string;
  cta: string;
  category?: string;
};

// Counted from the data so the headline can never advertise a stale number.
const RESOURCE_COUNT = RESOURCES_DATA.length;

const SLIDES: Slide[] = [
  {
    image: IMAGES.studentsChemLab,
    heading: "Every resource, one place.",
    body: `${RESOURCE_COUNT} advising, tutoring, scholarship, research and wellness resources for College of Science students, collected and kept current.`,
    cta: "Browse the directory"
  },
  {
    image: IMAGES.bioinformatics,
    heading: "Start research in your first year.",
    body: "SRI, UROP and SPUR place undergraduates in working labs. No prior experience required.",
    cta: "Browse research resources",
    category: "Research & Internships"
  },
  {
    image: IMAGES.crockerExterior,
    heading: "Money you haven’t applied for yet.",
    body: "ScholarshipUniverse, ACCESS Scholars, Beckman and every departmental award, in one list.",
    cta: "Browse scholarships",
    category: "Scholarships & Financial Aid"
  }
];

const POPULAR_SEARCHES = [
  "permission code",
  "free tutoring",
  "summer research",
  "food pantry",
  "counseling",
  "emergency funds"
];

const SLIDE_MS = 6000;

export function SearchSection({
  searchQuery,
  setSearchQuery,
  onPopularSelect,
  onCategorySelect,
  setActiveView
}: SearchSectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Resource[]>([]);
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuse = useMemo(() => createResourceSearch(RESOURCES_DATA), []);

  // Live fuzzy suggestions as you type, debounced so fast typing doesn't flash intermediate results
  useEffect(() => {
    const query = searchQuery.trim();
    if (query === "") {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      setSuggestions(fuse.search(query, { limit: 6 }).map((result) => result.item));
    }, 150);
    return () => clearTimeout(timer);
  }, [searchQuery, fuse]);

  // Auto-advance, but never against a reduced-motion preference and never while
  // the student is hovering or tabbing through the hero.
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setSlide((n) => (n + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleSlideCta = (item: Slide) => {
    if (item.category) {
      onCategorySelect(item.category);
    } else {
      setActiveView("resources");
    }
  };

  const active = SLIDES[slide];

  return (
    <>
      {/* Full-bleed hero carousel, the U template's signature opening block */}
      <section
        className="on-dark relative h-[420px] overflow-hidden bg-utah-char sm:h-[520px] lg:h-[560px]"
        id="hero-carousel"
        aria-roledescription="carousel"
        aria-label="Featured resources"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        {SLIDES.map((item, index) => (
          <div
            key={item.heading}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              index === slide ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ backgroundImage: `url("${item.image}")` }}
            aria-hidden={index !== slide}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/60" />
          </div>
        ))}

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <h1
              className="font-slab text-[34px] font-bold leading-[1.08] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)] sm:text-[44px] lg:text-[54px]"
              id="hero-headline"
            >
              {active.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] sm:text-[18px]">
              {active.body}
            </p>
            <button
              type="button"
              onClick={() => handleSlideCta(active)}
              className="mt-7 bg-utah-red rounded-full px-7 py-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
              id="hero-cta"
            >
              {active.cta}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSlide((n) => (n - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-1 top-1/2 z-20 -translate-y-1/2 px-4 py-2 text-4xl leading-none text-white/75 transition-opacity hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          onClick={() => setSlide((n) => (n + 1) % SLIDES.length)}
          className="absolute right-1 top-1/2 z-20 -translate-y-1/2 px-4 py-2 text-4xl leading-none text-white/75 transition-opacity hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div className="absolute inset-x-0 bottom-7 z-20 flex justify-center gap-2.5">
          {SLIDES.map((item, index) => (
            <button
              key={item.heading}
              type="button"
              onClick={() => setSlide(index)}
              aria-label={`Show slide ${index + 1}: ${item.heading}`}
              aria-current={index === slide}
              className={`h-1 w-11 transition-colors ${
                index === slide ? "bg-utah-red" : "bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search band sits immediately under the hero, above every other section */}
      <div className="border-b border-utah-rule bg-utah-shade py-8" id="search-section-wrapper">
        <div className="mx-auto max-w-[860px] px-6">
          <div className="relative">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setActiveView("resources");
              }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-0"
            >
              <div
                className={`flex flex-1 items-center rounded-[10px] border-2 bg-white pl-5 pr-4 transition-colors sm:rounded-r-none sm:border-r-0 ${
                  isFocused ? "border-utah-red" : "border-utah-rule"
                }`}
              >
                <Search className="mr-3 h-5 w-5 shrink-0 text-utah-warm" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder="Search scholarships, tutoring, advising, internships, wellness support…"
                  className="w-full rounded-none bg-transparent py-3.5 text-[16px] text-utah-ink outline-none focus-visible:outline-none placeholder:text-utah-warm [&::-webkit-search-cancel-button]:hidden"
                  aria-label="Search resources"
                  id="global-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="ml-2 shrink-0 p-1.5 text-utah-warm transition-colors hover:text-utah-ink"
                    aria-label="Clear search"
                    id="search-clear-button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="rounded-[10px] bg-utah-red px-9 py-3.5 font-sans text-[14px] font-semibold text-white sm:rounded-l-none transition-colors hover:bg-utah-red-dark"
                id="search-submit-button"
              >
                Search
              </button>
            </form>

            {isFocused && searchQuery.trim() !== "" && suggestions.length > 0 && (
              <div
                className="absolute inset-x-0 top-full z-30 mt-1 border border-utah-rule bg-white text-left shadow-lg"
                id="live-search-suggestions"
              >
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onPopularSelect(item.name)}
                    className="flex w-full items-center justify-between gap-3 border-b border-gray-150 px-4 py-3 text-left transition-colors last:border-0 hover:bg-utah-shade"
                    id={`live-suggestion-${item.id}`}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="w-full truncate text-[15px] font-semibold text-utah-ink">{item.name}</span>
                      <span className="w-full truncate text-[12px] text-utah-warm">{item.category}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-utah-warm" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="mt-3.5 text-center text-[13px] text-utah-warm">
            <span className="mr-1">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onPopularSelect(term)}
                className="mx-1.5 text-gray-650 underline underline-offset-4 transition-colors hover:text-utah-red"
              >
                {term}
              </button>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
