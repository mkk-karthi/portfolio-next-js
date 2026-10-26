"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { navItems, NavItem } from "@/data/data";
import LogoSvg from "./ui/LogoSVG";

interface DropState {
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

// Dynamically derived split of navItems around the center logo.
const splitIndex = Math.ceil(navItems.length / 2);
const leftItems = navItems.slice(0, splitIndex);
const rightItems = navItems.slice(splitIndex);
const leftLabels = new Set(leftItems.map((i) => i.label));
const rightLabels = new Set(rightItems.map((i) => i.label));

// Smooth liquid cubic-bezier easing
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Extracts DOM section ID from NavItem href (e.g. "#about" -> "about", "/" -> "home")
const getSectionId = (item: NavItem): string =>
  item.href.replace(/^#?\/?/, "").toLowerCase() || "home";

// Custom Hook for Active Section Scroll Detection & URL Hash Synchronization
function useActiveSection(items: NavItem[]) {
  const [selected, setSelected] = useState<string>(() => items[0]?.label || "");
  const isClickScrolling = useRef(false);
  const lastUpdatedHash = useRef<string>("");

  useEffect(() => {
    // Scroll to initial section on page load if hash exists
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const matched = items.find((item) => getSectionId(item) === hash);
      if (matched) {
        setSelected(matched.label);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
        }
      }
    }

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const lastItem = items[items.length - 1];

      // Highlight last item if user scrolled near bottom of page
      if (lastItem && scrollY + windowHeight >= documentHeight - 60) {
        setSelected((prev) => (prev !== lastItem.label ? lastItem.label : prev));
        if (lastUpdatedHash.current !== lastItem.href && window.location.hash !== lastItem.href) {
          lastUpdatedHash.current = lastItem.href;
          window.history.replaceState(null, "", lastItem.href);
        }
        return;
      }

      let activeLabel = items[0]?.label || "";
      let activeHref = items[0]?.href || "/";

      for (const item of items) {
        const id = getSectionId(item);
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 250) {
          activeLabel = item.label;
          activeHref = item.href;
        }
      }

      setSelected((prev) => (prev !== activeLabel ? activeLabel : prev));

      const targetUrl = activeHref === "/" ? "/" : activeHref;
      if (
        lastUpdatedHash.current !== targetUrl &&
        window.location.hash !== (activeHref === "/" ? "" : activeHref)
      ) {
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

    const sectionId = getSectionId(item);
    const isHome = item.href === "/" || !sectionId || sectionId === "home";

    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", item.href);
      }
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  }, []);

  return { selected, scrollToSection };
}

/**
 * Liquid Droplet Element
 */
const LiquidDrop: React.FC<{ drop: DropState }> = React.memo(({ drop }) => {
  if (drop.opacity <= 0) return null;
  return (
    <div
      className="absolute rounded-full bg-linear-to-r from-blue-600 to-sky-500 shadow-md shadow-blue-500/25 border border-sky-400/40 pointer-events-none z-0"
      style={{
        left: `${drop.left}px`,
        top: `${drop.top}px`,
        width: `${drop.width}px`,
        height: `${drop.height}px`,
        opacity: drop.opacity,
        transform: `scale(${drop.scaleX}, ${drop.scaleY})`,
        transformOrigin: "center center",
      }}
    />
  );
});
LiquidDrop.displayName = "LiquidDrop";

/**
 * Reusable Nav Group for Menu Items
 */
interface NavItemsGroupProps {
  items: NavItem[];
  selected: string;
  onSelect: (item: NavItem, e: React.MouseEvent) => void;
  isMobile?: boolean;
  className?: string;
  registerItemRef?: (label: string, el: HTMLAnchorElement | null) => void;
}

const NavItemsGroup: React.FC<NavItemsGroupProps> = React.memo(
  ({ items, selected, onSelect, isMobile = false, className = "", registerItemRef }) => {
    return (
      <nav aria-label="Main Navigation" className={`relative flex items-center ${className}`}>
        {items.map((item) => {
          const isSelected = selected === item.label;
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              ref={(el) => registerItemRef?.(item.label, el)}
              aria-label={item.label}
              onClick={(e) => onSelect(item, e)}
              className={`relative z-10 ${isMobile ? "p-2" : "px-4 py-2"} rounded-full text-xs lg:text-sm font-bold tracking-wide transition-colors duration-200 cursor-pointer select-none ${
                isSelected ? "text-white" : "text-slate-300 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              {isMobile ? <Icon size={18} /> : item.label}
            </a>
          );
        })}
      </nav>
    );
  },
);
NavItemsGroup.displayName = "NavItemsGroup";

/**
 * Center Brand Emblem Badge
 */
interface BrandLogoProps {
  onClick: (e: React.MouseEvent) => void;
  isPassing?: boolean;
  href?: string;
  label?: string;
}

const BrandLogo = React.forwardRef<HTMLDivElement, BrandLogoProps>(
  ({ onClick, isPassing = false, href = "/", label = "Home" }, ref) => (
    <div ref={ref} className="relative flex items-center justify-center shrink-0 z-10">
      <a
        href={href}
        onClick={onClick}
        className={`group relative flex items-center justify-center cursor-pointer shrink-0 p-0.5 rounded-full transition-transform duration-300 ${
          isPassing ? "scale-108" : "hover:scale-105"
        }`}
        title="MKK Creation - Home"
        aria-label="Home"
      >
        <div
          className={`rounded-full bg-slate-950 flex items-center justify-center transition-all duration-200 ${
            isPassing ? "ring-2 ring-sky-300 shadow-lg shadow-sky-400/50" : "ring-1 ring-slate-950"
          }`}
        >
          <LogoSvg
            className={`size-7 sm:size-8 fill-white transition-colors duration-200 ${
              isPassing ? "fill-sky-300" : ""
            }`}
          />
        </div>
      </a>
    </div>
  ),
);
BrandLogo.displayName = "BrandLogo";

/**
 * Main Navbar Component
 * - 100% data-driven from data.ts (no hardcoded section lists or menu names)
 * - Two-drop liquid animation (Source drop contracts at origin, Main drop glides and attaches)
 * - Sticky navigation (fixed top-4 inset-x-0 z-999)
 */
const Navbar: React.FC = () => {
  const { selected, scrollToSection } = useActiveSection(navItems);
  const [isLogoPassing, setIsLogoPassing] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const desktopItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const mobileItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const prevSelectedRef = useRef<string | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Drop 1: Stays at the source menu and contracts/shrinks away
  const [sourceDrop, setSourceDrop] = useState<DropState | null>(null);

  // Drop 2: Main traveling drop that glides and attaches to destination
  const [mainDrop, setMainDrop] = useState<DropState>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 0,
  });

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      if (navItems[0]) scrollToSection(navItems[0], e);
    },
    [scrollToSection],
  );

  const registerDesktopRef = useCallback((label: string, el: HTMLAnchorElement | null) => {
    desktopItemRefs.current[label] = el;
  }, []);

  const registerMobileRef = useCallback((label: string, el: HTMLAnchorElement | null) => {
    mobileItemRefs.current[label] = el;
  }, []);

  const getElementRect = useCallback(
    (label: string): { left: number; top: number; width: number; height: number } | null => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const targetEl = isMobile ? mobileItemRefs.current[label] : desktopItemRefs.current[label];
      const headerEl = headerRef.current;
      if (!targetEl || !headerEl) return null;

      const hRect = headerEl.getBoundingClientRect();
      const tRect = targetEl.getBoundingClientRect();

      return {
        left: tRect.left - hRect.left,
        top: tRect.top - hRect.top,
        width: tRect.width,
        height: tRect.height,
      };
    },
    [],
  );

  useEffect(() => {
    const toRect = getElementRect(selected);
    if (!toRect) return;

    // Initial load: render static pill immediately
    if (prevSelectedRef.current === null) {
      prevSelectedRef.current = selected;
      setSourceDrop(null);
      setMainDrop({
        left: toRect.left,
        top: toRect.top,
        width: toRect.width,
        height: toRect.height,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      });
      return;
    }

    const prevLabel = prevSelectedRef.current;
    if (prevLabel === selected) {
      setMainDrop((p) => ({
        ...p,
        left: toRect.left,
        top: toRect.top,
        width: toRect.width,
        height: toRect.height,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      }));
      return;
    }

    const fromRect = getElementRect(prevLabel);
    prevSelectedRef.current = selected;

    if (!fromRect) {
      setSourceDrop(null);
      setMainDrop({
        left: toRect.left,
        top: toRect.top,
        width: toRect.width,
        height: toRect.height,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      });
      return;
    }

    // Check if crossing center logo dynamically based on left/right groups from data.ts
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isCrossingLogo =
      !isMobile &&
      ((leftLabels.has(prevLabel) && rightLabels.has(selected)) ||
        (rightLabels.has(prevLabel) && leftLabels.has(selected)));

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const logoEl = logoRef.current;
    const headerEl = headerRef.current;
    let logoCenterX = 0;
    let logoCenterY = 0;
    if (logoEl && headerEl) {
      const hRect = headerEl.getBoundingClientRect();
      const lRect = logoEl.getBoundingClientRect();
      logoCenterX = lRect.left - hRect.left + lRect.width / 2;
      logoCenterY = lRect.top - hRect.top + lRect.height / 2;
    }

    const startTime = performance.now();

    const fromCenterX = fromRect.left + fromRect.width / 2;
    const fromCenterY = fromRect.top + fromRect.height / 2;
    const toCenterX = toRect.left + toRect.width / 2;
    const toCenterY = toRect.top + toRect.height / 2;

    const duration = isCrossingLogo ? 680 : 460;

    const animateTwoDropSplit = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      const progress = easeInOutCubic(t);

      // DROP 1: SOURCE DROP (contracts & shrinks down to 0 at origin)
      const shrinkPhase = Math.min(1, t / 0.42);
      const sourceScale = 1 - shrinkPhase;
      const sourceOpacity = 1 - shrinkPhase * shrinkPhase;

      if (shrinkPhase < 1) {
        setSourceDrop({
          left: fromRect.left,
          top: fromRect.top,
          width: fromRect.width,
          height: fromRect.height,
          scaleX: Math.max(0, sourceScale),
          scaleY: Math.max(0, sourceScale),
          opacity: Math.max(0, sourceOpacity),
        });
      } else {
        setSourceDrop(null);
      }

      // DROP 2: MAIN TRAVELING DROP (glides, stretches in flight, and attaches at destination)
      let curCenterX: number;
      let curCenterY: number;

      if (isCrossingLogo && logoCenterX > 0) {
        if (progress < 0.5) {
          const sub1 = progress / 0.5;
          curCenterX = fromCenterX + (logoCenterX - fromCenterX) * easeInOutCubic(sub1);
          curCenterY = fromCenterY + (logoCenterY - fromCenterY) * easeInOutCubic(sub1);
          setIsLogoPassing(sub1 > 0.65);
        } else {
          const sub2 = (progress - 0.5) / 0.5;
          curCenterX = logoCenterX + (toCenterX - logoCenterX) * easeInOutCubic(sub2);
          curCenterY = logoCenterY + (toCenterY - logoCenterY) * easeInOutCubic(sub2);
          setIsLogoPassing(sub2 < 0.35);
        }
      } else {
        curCenterX = fromCenterX + (toCenterX - fromCenterX) * progress;
        curCenterY = fromCenterY + (toCenterY - fromCenterY) * progress;
        setIsLogoPassing(false);
      }

      const curW = fromRect.width + (toRect.width - fromRect.width) * progress;
      const curH = fromRect.height + (toRect.height - fromRect.height) * progress;

      let scaleX = 1;
      let scaleY = 1;

      if (t < 0.82) {
        const stretch = Math.sin((t / 0.82) * Math.PI);
        scaleX = 1 + 0.16 * stretch;
        scaleY = 1 - 0.1 * stretch;
      } else {
        const attachP = (t - 0.82) / 0.18;
        const bounce = Math.sin(attachP * Math.PI) * 0.08;
        scaleX = 1 + bounce;
        scaleY = 1 - bounce;
      }

      setMainDrop({
        left: curCenterX - curW / 2,
        top: curCenterY - curH / 2,
        width: curW,
        height: curH,
        scaleX,
        scaleY,
        opacity: 1,
      });

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animateTwoDropSplit);
      } else {
        setSourceDrop(null);
        setIsLogoPassing(false);
        setMainDrop({
          left: toRect.left,
          top: toRect.top,
          width: toRect.width,
          height: toRect.height,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
        });
      }
    };

    animFrameRef.current = requestAnimationFrame(animateTwoDropSplit);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selected, getElementRect]);

  // Handle window resize cleanly
  useEffect(() => {
    const handleResize = () => {
      const rect = getElementRect(selected);
      if (rect) {
        setSourceDrop(null);
        setMainDrop({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selected, getElementRect]);

  return (
    <header
      ref={headerRef}
      className="fixed top-4 inset-x-0 w-11/12 sm:w-5/6 lg:max-w-4xl h-16 bg-slate-900/90 dark:bg-slate-950/90 text-white px-3 sm:px-6 py-2 rounded-full backdrop-blur-2xl shadow-2xl shadow-blue-950/30 mx-auto flex items-center justify-between z-999 border border-slate-700/60 dark:border-sky-500/30"
    >
      {/* Drop 1: Source Drop (shrinks away at initial menu) */}
      {sourceDrop && <LiquidDrop drop={sourceDrop} />}

      {/* Drop 2: Main Traveling Drop (glides and attaches to destination) */}
      <LiquidDrop drop={mainDrop} />

      {/* Left Navigation (Desktop) - Dynamically derived from navItems */}
      <NavItemsGroup
        items={leftItems}
        selected={selected}
        onSelect={scrollToSection}
        registerItemRef={registerDesktopRef}
        className="hidden md:flex gap-1.5 lg:gap-2"
      />

      {/* Center Brand Emblem */}
      <BrandLogo
        ref={logoRef}
        onClick={handleLogoClick}
        isPassing={isLogoPassing}
        href={navItems[0]?.href}
        label={navItems[0]?.label}
      />

      {/* Right Navigation (Desktop) - Dynamically derived from navItems */}
      <NavItemsGroup
        items={rightItems}
        selected={selected}
        onSelect={scrollToSection}
        registerItemRef={registerDesktopRef}
        className="hidden md:flex gap-1.5 lg:gap-2"
      />

      {/* Mobile Navigation - Entire navItems list */}
      <NavItemsGroup
        items={navItems}
        selected={selected}
        onSelect={scrollToSection}
        registerItemRef={registerMobileRef}
        isMobile
        className="flex md:hidden gap-1 sm:gap-1.5"
      />
    </header>
  );
};

export default Navbar;
