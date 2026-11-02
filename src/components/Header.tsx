import { useState } from "react";
import { Menu, X } from "lucide-react";
import { U_LOGO_HORIZONTAL } from "../data/images";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

type NavItem =
  | { label: string; view: string }
  | { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", view: "home" },
  { label: "Full Directory", view: "resources" },
  { label: "Academic Advising", href: "https://science.utah.edu/students/academic-advising/" },
  { label: "Career Outlook", view: "careers" },
  { label: "Feeling Lost?", view: "overwhelmed" }
];

const LINK_BASE =
  "font-sans text-[14.5px] font-semibold tracking-normal text-white " +
  "rounded-[10px] px-3.5 py-2 transition-colors hover:bg-utah-red-dark";

export function Header({ activeView, setActiveView }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const go = (view: string) => {
    setIsMenuOpen(false);
    setActiveView(view);
  };

  return (
    <header className="on-dark sticky top-0 z-40 bg-utah-black" id="app-header">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex h-[72px] items-center gap-5">
          {/* University lockup + unit name, the standard U masthead arrangement */}
          <button
            type="button"
            onClick={() => go("home")}
            className="flex shrink-0 items-center gap-4 text-left"
            id="logo-container"
          >
            <img
              src={U_LOGO_HORIZONTAL}
              alt="The University of Utah"
              className="h-[42px] w-auto"
              referrerPolicy="no-referrer"
            />
            <span className="hidden h-[34px] w-px bg-[#4a4a4a] sm:block" aria-hidden="true" />
            <span className="hidden font-display text-[18px] font-bold tracking-tight text-white sm:block">
              College of Science
            </span>
          </button>

          <nav className="ml-auto hidden items-center gap-1.5 lg:flex" id="desktop-nav">
            {NAV_ITEMS.map((item) =>
              "href" in item ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_BASE}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => go(item.view)}
                  aria-current={activeView === item.view ? "page" : undefined}
                  className={`${LINK_BASE} ${
                    activeView === item.view ? "bg-utah-red" : ""
                  }`}
                  id={`nav-${item.view}`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="ml-auto p-2 text-white lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            id="mobile-nav-toggle"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-[#2a2a2a] bg-utah-black lg:hidden" id="mobile-nav">
          {NAV_ITEMS.map((item) =>
            "href" in item ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block border-b border-[#2a2a2a] px-6 py-4 font-sans text-[15px] font-semibold text-white"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.view)}
                className={`block w-full border-b border-[#2a2a2a] px-6 py-4 text-left font-sans text-[15px] font-semibold ${
                  activeView === item.view ? "bg-utah-red text-white" : "text-white"
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      )}
    </header>
  );
}
