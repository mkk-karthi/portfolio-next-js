"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { navItems, NavItem } from "@/data/data";
import LogoSvg from "./ui/LogoSVG";

const SECTION_IDS: Record<string, string> = {
  Home: "home",
  About: "about",
  Services: "services",
  Experience: "experience",
  Projects: "projects",
  Contact: "contact",
};

interface PillState {
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
}

/**
 * Custom Hook for Active Section Scroll Detection & URL Hash Synchronization
 */
function useActiveSection(items: NavItem[]) {
  const [selected, setSelected] = useState<string>("Home");
  const isClickScrolling = useRef(false);
  const lastUpdatedHash = useRef<string>("");

  useEffect(() => {
    // Initial scroll on page load if hash exists
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matched = items.find(
        (item) => (SECTION_IDS[item.label] || item.label.toLowerCase()) === hash
      );
      if (matched) {
        setSelected(matched.label);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    }

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Highlight Contact if near bottom of page
      if (scrollY + windowHeight >= documentHeight - 60) {
        setSelected("Contact");
        if (lastUpdatedHash.current !== "#contact" && window.location.hash !== "#contact") {
          lastUpdatedHash.current = "#contact";
          window.history.replaceState(null, "", "#contact");
        }
        return;
      }

      let activeLabel = items[0].label;
      let activeId = "home";

      for (const item of items) {
        const id = SECTION_IDS[item.label] || item.label.toLowerCase();
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 250) {
          activeLabel = item.label;
          activeId = id;
        }
      }

      setSelected(activeLabel);

      const targetHash = activeId === "home" ? "" : `#${activeId}`;
      const targetUrl = activeId === "home" ? "/" : `#${activeId}`;
      if (lastUpdatedHash.current !== targetUrl && window.location.hash !== targetHash) {
        lastUpdatedHash.current = targetUrl;
        window.history.replaceState(null, "", targetUrl);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = useCallback((item: NavItem, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelected(item.label);
    isClickScrolling.current = true;
    lastUpdatedHash.current = item.href;

    const targetId = SECTION_IDS[item.label] || item.label.toLowerCase();
    const el = document.getElementById(targetId);

    if (item.label === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", item.href);
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  }, []);

  return { selected, scrollToSection };
}

/**
 * Reusable Nav Group with Smooth Sliding Active Indicator Pill
 */
interface NavItemsGroupProps {
  items: NavItem[];
  selected: string;
  onSelect: (item: NavItem, e: React.MouseEvent) => void;
  isMobile?: boolean;
  className?: string;
}

const NavItemsGroup: React.FC<NavItemsGroupProps> = React.memo(
  ({ items, selected, onSelect, isMobile = false, className = "" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const [pill, setPill] = useState<PillState>({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      opacity: 0,
    });

    useEffect(() => {
      const updatePill = () => {
        const activeEl = itemRefs.current[selected];
        if (containerRef.current && activeEl && containerRef.current.contains(activeEl)) {
          setPill({
            top: activeEl.offsetTop,
            left: activeEl.offsetLeft,
            width: activeEl.offsetWidth,
            height: activeEl.offsetHeight,
            opacity: 1,
          });
        } else {
          setPill((p) => ({ ...p, opacity: 0 }));
        }
      };

      updatePill();
      window.addEventListener("resize", updatePill);
      return () => window.removeEventListener("resize", updatePill);
    }, [selected]);

    return (
      <nav ref={containerRef} aria-label="Main Navigation" className={`relative flex items-center ${className}`}>
        {/* Smooth Sliding Active Pill Indicator */}
        {pill.opacity > 0 && (
          <div
            className="absolute rounded-full bg-linear-to-r from-blue-600 to-sky-500 shadow-md shadow-blue-500/25 border border-sky-400/40 transition-all duration-150 ease-out pointer-events-none z-0"
            style={{
              top: `${pill.top}px`,
              left: `${pill.left}px`,
              width: `${pill.width}px`,
              height: `${pill.height}px`,
              opacity: pill.opacity,
            }}
          />
        )}

        {items.map((item) => {
          const isSelected = selected === item.label;
          const Icon = item.icon;

          if (isMobile) {
            return (
              <a
                key={item.label}
                href={item.href}
                ref={(el) => {
                  itemRefs.current[item.label] = el;
                }}
                aria-label={item.label}
                title={item.label}
                onClick={(e) => onSelect(item, e)}
                className={`relative z-10 flex items-center justify-center size-9 rounded-full transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80"
                }`}
              >
                <Icon size={15} />
              </a>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              ref={(el) => {
                itemRefs.current[item.label] = el;
              }}
              aria-label={item.label}
              onClick={(e) => onSelect(item, e)}
              className={`relative z-10 px-4 py-2 rounded-full text-xs lg:text-sm font-bold tracking-wide transition-colors duration-150 cursor-pointer select-none ${
                isSelected ? "text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    );
  }
);
NavItemsGroup.displayName = "NavItemsGroup";

/**
 * Professional Center Brand Emblem Badge
 */
const BrandLogo: React.FC<{ onClick: (e: React.MouseEvent) => void }> = React.memo(({ onClick }) => (
  <a
    href="/"
    onClick={onClick}
    className="group relative flex items-center justify-center cursor-pointer shrink-0 p-0.5 rounded-full bg-linear-to-br from-blue-500 via-sky-400 to-cyan-300 shadow-md shadow-blue-500/20 hover:shadow-sky-400/40 transition-all duration-300"
    title="MKK Creation - Home"
    aria-label="Home"
  >
    <div className="size-9 sm:size-10 rounded-full bg-slate-950 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors duration-200">
      <LogoSvg className="size-7 sm:size-8 fill-white" />
    </div>
  </a>
));
BrandLogo.displayName = "BrandLogo";

/**
 * Main Navbar Component
 */
const Navbar: React.FC = () => {
  const { selected, scrollToSection } = useActiveSection(navItems);

  const leftItems = useMemo(() => navItems.slice(0, 3), []);
  const rightItems = useMemo(() => navItems.slice(3), []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => scrollToSection(navItems[0], e),
    [scrollToSection]
  );

  return (
    <header className="fixed top-4 inset-x-0 w-11/12 sm:w-5/6 lg:max-w-4xl h-16 bg-slate-900/90 dark:bg-slate-950/90 text-white px-3 sm:px-6 py-2 rounded-full backdrop-blur-2xl shadow-2xl shadow-blue-950/30 mx-auto flex items-center justify-between z-50 border border-slate-700/60 dark:border-sky-500/30">
      {/* Left Navigation (Desktop) */}
      <NavItemsGroup
        items={leftItems}
        selected={selected}
        onSelect={scrollToSection}
        className="hidden md:flex gap-1.5 lg:gap-2"
      />

      {/* Center Brand Emblem */}
      <BrandLogo onClick={handleLogoClick} />

      {/* Right Navigation (Desktop) */}
      <NavItemsGroup
        items={rightItems}
        selected={selected}
        onSelect={scrollToSection}
        className="hidden md:flex gap-1.5 lg:gap-2"
      />

      {/* Mobile Navigation */}
      <NavItemsGroup
        items={navItems}
        selected={selected}
        onSelect={scrollToSection}
        isMobile
        className="flex md:hidden gap-1 sm:gap-1.5"
      />
    </header>
  );
};

export default Navbar;
