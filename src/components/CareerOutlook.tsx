import React, { useState, useMemo } from "react";
import { CAREER_OUTLOOK_DATA, COS_OFFERED_MAJORS } from "../data/resources";
import { TrendingUp, FileSpreadsheet, MapPin, Sparkles, GraduationCap, BookMarked } from "lucide-react";

export function CareerOutlookVisualizer() {
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortByMetric, setSortByMetric] = useState<"growth" | "salary">("growth");

  const sectors = useMemo(() => {
    const list = CAREER_OUTLOOK_DATA.map((c) => c.sector);
    return ["all", ...Array.from(new Set(list))];
  }, []);

  const sortedAndFilteredCareers = useMemo(() => {
    const filtered = CAREER_OUTLOOK_DATA.filter((c) => {
      if (selectedSector !== "all" && c.sector !== selectedSector) {
        return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortByMetric === "growth") {
        return b.growth - a.growth;
      } else {
        return b.medianSalary - a.medianSalary;
      }
    });
  }, [selectedSector, sortByMetric]);

  const maxSalary = useMemo(() => {
    return Math.max(...CAREER_OUTLOOK_DATA.map((c) => c.medianSalary));
  }, []);

  const maxGrowth = useMemo(() => {
    return Math.max(...CAREER_OUTLOOK_DATA.map((c) => c.growth));
  }, []);

  const formatSalary = (salary: number) => {
    return `$${salary.toLocaleString()}`;
  };

  return (
    <div className="animate-fade-in mx-auto max-w-[1240px] px-6 py-12" id="careers-panel-wrapper">
      {/* Intro Header */}
      <div className="border-b-2 border-utah-ink pb-6 text-center" id="careers-intro">
        <div className="mb-4 inline-flex items-center gap-2 bg-utah-red rounded-full px-2.5 py-1.5 font-sans text-[12.5px] font-semibold text-white">
          <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden="true" />
          Bureau of Labor Statistics (BLS) Occupational Outlook Handbook, 2025 data and 2025-35 projections
        </div>
        <h2 className="flex items-center justify-center gap-2.5 font-slab text-[30px] font-bold text-utah-ink">
          <TrendingUp className="w-6 h-6 text-utah-red" />
          Utah Science Career & Salary Roadmap
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-[16px] leading-relaxed text-gray-650">
          Where can your math, chemistry, physics, or biology degree take you? Browse high-paying jobs and fastest-growing industry sectors. Each job lists the majors the BLS says lead into it, and the ones the College of Science offers are highlighted.
        </p>
      </div>

      {/* Grid Layout splits into left instructions and right visual list */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats Cards & BLS Career Advice */}
        <div className="space-y-6 lg:col-span-1" id="careers-guidelines">
          <div className="space-y-4 border border-utah-rule bg-white p-6">
            <h3 className="flex items-center gap-2 font-slab text-[18px] font-bold leading-none text-utah-ink">
              <FileSpreadsheet className="w-4.5 h-4.5 text-utah-red" />
              How to Leverage Job Statistics
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-650">
              Your science degree constructs core skills in data visualization, quantitative analysis, chemical diagnostics, and structural reasoning. These skills translate directly into high-paying industries.
            </p>
            <div className="pt-2 border-t border-red-100/40 space-y-3.5">
              <div className="flex gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-utah-red text-[10px] font-bold text-white">1</span>
                <p className="text-[14.5px] leading-normal text-gray-650">
                  <strong className="font-bold text-gray-900">High Growth:</strong> Fields with +20% growth rates indicate extremely active hiring markets. Excellent targeting for internship tracks.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-utah-red text-[10px] font-bold text-white">2</span>
                <p className="text-[14.5px] leading-normal text-gray-650">
                  <strong className="font-bold text-gray-900">Career Launch Support:</strong> Book appointments with our College of Science peer Career Coaches for interview prep.
                </p>
              </div>
            </div>

            <a
              href="https://science.utah.edu/career-paths/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block w-full bg-utah-red rounded-full px-4 py-3 text-center font-sans text-[13px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
              id="career-map-link"
            >
              Open Official Career Path Maps
            </a>
          </div>

          {/* Quick-Access Resources Card */}
          <div className="space-y-3 border-l-4 border-utah-red bg-utah-shade p-6">
            <h4 className="flex items-center gap-2 font-slab text-[18px] font-bold leading-none text-utah-ink">
              <MapPin className="w-4.5 h-4.5 text-utah-red shrink-0" />
              Interview Ready?
            </h4>
            <p className="text-[15px] leading-relaxed text-gray-650">
              Get free professional headshots on LinkedIn, free tailored suits from the Career Closet, and book high-definition soundproof Zoom rooms inside the Career Studio. These three services are free to enrolled students.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Directory of Career stats */}
        <div className="lg:col-span-2 space-y-6" id="careers-table-board">
          
          {/* Controls Selector Ribbon */}
          <div className="flex flex-col items-center justify-between gap-4 border border-utah-rule bg-utah-shade p-5 sm:flex-row">
            {/* Sorting Toggles */}
            <div className="flex w-full gap-2.5 sm:w-auto" id="metric-sorting-pills">
              <button
                onClick={() => setSortByMetric("growth")}
                className={`flex-1 border-2 rounded-full px-4 py-2.5 font-sans text-[12.5px] font-semibold transition-colors sm:flex-none ${
                  sortByMetric === "growth"
                    ? "border-utah-red bg-utah-red text-white"
                    : "border-utah-rule bg-white text-gray-650 hover:border-utah-red hover:text-utah-red"
                }`}
                id="sort-by-growth"
              >
                Sort by Job Growth
              </button>
              <button
                onClick={() => setSortByMetric("salary")}
                className={`flex-1 border-2 rounded-full px-4 py-2.5 font-sans text-[12.5px] font-semibold transition-colors sm:flex-none ${
                  sortByMetric === "salary"
                    ? "border-utah-red bg-utah-red text-white"
                    : "border-utah-rule bg-white text-gray-650 hover:border-utah-red hover:text-utah-red"
                }`}
                id="sort-by-salary"
              >
                Sort by Median Salary
              </button>
            </div>

            {/* Sector filter */}
            <div className="w-full sm:w-56 shrink-0 flex items-center gap-2">
              <span className="font-sans text-[12.5px] font-semibold text-utah-warm">Sector:</span>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full border-2 border-utah-rule bg-white p-2.5 text-[14px] font-semibold text-utah-ink transition-colors focus:border-utah-red"
                id="sector-filter-select"
              >
                <option value="all">All Sectors</option>
                {sectors.filter((s) => s !== "all").map((sect) => (
                  <option key={sect} value={sect}>
                    {sect}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Visual Progress Bar Board */}
          <div className="space-y-4" id="careers-bars-list">
            {sortedAndFilteredCareers.map((c, index) => {
              // Percentage calculation for progress bars
              const salaryPercentage = Math.min(100, (c.medianSalary / maxSalary) * 100);
              const growthPercentage = Math.min(100, (c.growth / maxGrowth) * 100);

              return (
                <div 
                  key={`${c.career}-${index}`}
                  className="border border-gray-150 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                  id={`career-item-${index}`}
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-gray-150 pb-3 sm:flex-row sm:items-center">
                    <div>
                      <span className="mr-2 inline-block bg-utah-ink rounded-full px-2 py-1 font-sans text-[12px] font-semibold text-white">
                        {c.sector}
                      </span>
                      <h4 className="mt-2 inline-block font-slab text-[18px] font-bold text-utah-ink sm:mt-0">
                        {c.career}
                      </h4>
                    </div>

                    <div className="flex gap-4 shrink-0 text-left sm:text-right">
                      {/* Metric 1: Salary */}
                      <div>
                        <span className="block font-sans text-[12.5px] font-semibold text-utah-warm">Median Salary</span>
                        <span className="font-display text-[22px] font-bold leading-tight text-utah-ink">
                          {formatSalary(c.medianSalary)}
                        </span>
                      </div>

                      {/* Metric 2: Growth */}
                      <div>
                        <span className="block font-sans text-[12.5px] font-semibold text-utah-warm">10-Yr Outlook</span>
                        <span className="flex items-center justify-start gap-0.5 font-display text-[22px] font-bold leading-tight text-utah-red sm:justify-end">
                          +{c.growth}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 flex flex-wrap items-center gap-2" aria-label="Related majors">
                    <span className="flex items-center gap-1.5 font-sans text-[12.5px] font-semibold text-utah-warm">
                      <GraduationCap className="h-4 w-4 text-utah-red" aria-hidden="true" />
                      Related majors:
                    </span>
                    {c.majors.map((major) => (
                      <span
                        key={major}
                        className={`rounded-full px-2.5 py-1 font-sans text-[12.5px] font-semibold ${
                          COS_OFFERED_MAJORS.includes(major)
                            ? "bg-utah-red text-white"
                            : "border border-utah-rule bg-white text-gray-650"
                        }`}
                      >
                        {major}
                      </span>
                    ))}
                    <span className="ml-auto font-sans text-[12.5px] text-utah-warm">
                      Entry: {c.entryEducation} ·{" "}
                      <a
                        href={`https://www.bls.gov/ooh/${c.blsPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-utah-red underline underline-offset-2"
                      >
                        BLS source
                      </a>
                    </span>
                  </div>

                  {/* Render interactive bar gauges */}
                  <div className="mt-3.5 space-y-2.5">
                    {/* Salary bar */}
                    <div>
                      <div className="mb-1 flex justify-between font-sans text-[12.5px] text-utah-warm">
                        <span>Salary Index</span>
                        <span className="font-semibold text-utah-ink">{Math.round(salaryPercentage)}% of Peak BLS</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden bg-gray-150">
                        <div 
                          className="h-full bg-utah-ink transition-all duration-500" 
                          style={{ width: `${salaryPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Growth bar */}
                    <div>
                      <div className="mb-1 flex justify-between font-sans text-[12.5px] text-utah-warm">
                        <span>Job Market growth Index</span>
                        <span className="font-semibold text-utah-red">+{c.growth}% growth pace</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden bg-gray-150">
                        <div 
                          className="h-full bg-utah-red transition-all duration-500" 
                          style={{ width: `${growthPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <div className="mt-10 rounded-2xl border border-utah-rule bg-utah-shade p-6 text-center" id="careers-sources">
        <BookMarked className="mx-auto mb-2 h-6 w-6 text-utah-red" aria-hidden="true" />
        <p className="mx-auto max-w-2xl text-[15px] text-gray-650">
          Pay, growth and major data come from the U.S. Bureau of Labor Statistics Occupational Outlook Handbook. Every
          figure and the page it came from is documented in the sources README.
        </p>
        <a
          href="https://github.com/L33tPufferFish1214/College-of-Science-Student-Resources/blob/main/docs/career-outlook/README.md"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-utah-red px-6 py-3 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-utah-red-dark"
          id="career-sources-link"
        >
          View data sources on GitHub
        </a>
      </div>
    </div>
  );
}
