---
name: portfolio-guide
description: >-
  Comprehensive architectural blueprint, codebase map, single-source-of-truth data models, and engineering runbook for this portfolio-next-js project.
  Activate immediately when starting any task on this repository to instantly recognize the project structure, section IDs, data flow, and Tailwind v4 rules without reading all project files.
---

# Portfolio Next.js — Architecture & Agentic Skill Guide

This skill provides an instant, complete blueprint of the `portfolio-next-js` repository. Future coding agents should reference this document to understand the application layout, data schemas, navigation patterns, and styling guidelines without having to read or scan all project files.

---

## 1. Tech Stack & Environment

- **Framework**: Next.js 16 (App Router with Turbopack)
- **UI Library**: React 19
- **Language**: TypeScript 5 (Strict)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Animations / UI**: AOS (Animate on Scroll), Swiper (sliders), Lucide React (icons)
- **Analytics**: `@vercel/analytics`
- **Output Mode**: Static Site Generation (`output: "export"` in `next.config.ts`, outputs to `out/`)
- **Node Environment**: Node v24.21.0 located at `/home/mkk/.nvm/versions/node/v24.21.0/bin`
  - Always prefix shell commands with `export PATH="/home/mkk/.nvm/versions/node/v24.21.0/bin:$PATH"` if running in a fresh subshell.

---

## 2. Codebase Map & File Structure

```text
portfolio-next-js/
├── .agents/
│   ├── rules/
│   │   └── tailwind-rules.md         # Tailwind CSS v4 strict guidelines
│   └── skills/
│       └── portfolio-guide/
│           └── SKILL.md              # THIS SKILL: Single source of truth for all agents
├── public/                           # Static assets: /images/ (WebP), /assets/ (resume PDF)
│   ├── llms.txt                      # AI SEO: Markdown knowledge file for AI crawlers & LLMs
│   └── llm.txt                       # Mirror for alternative LLM crawler standard convention
├── src/
│   ├── app/
│   │   ├── globals.css               # Core styling tokens, theme colors, CSS scrollbars
│   │   ├── layout.tsx                # Root HTML, fonts (Geist), JSON-LD @graph SEO schemas
│   │   ├── manifest.ts               # Web app manifest
│   │   ├── page.tsx                  # Root Single-Page Application (assembles all sections)
│   │   ├── robots.ts                 # robots.txt configuration
│   │   └── sitemap.ts                # sitemap.xml configuration (https://mkkcreation.com)
│   ├── components/
│   │   ├── AOSInit.tsx               # Client-side AOS animation initialization
│   │   ├── Navbar.tsx                # Fixed header with sliding active indicator & URL hash sync
│   │   ├── sections/                 # All portfolio sections (rendered in src/app/page.tsx)
│   │   │   ├── Hero.tsx              # id="home" - Introduction, dynamic typewriter, CV, stats
│   │   │   ├── AboutMe.tsx           # id="about" - Bio, experience counters, skill tabs
│   │   │   ├── Services.tsx          # id="services" - Focus areas, expertise cards, resume CTA
│   │   │   ├── WorkExperience.tsx    # id="experience" - Work & Education tabbed timeline
│   │   │   ├── Projects.tsx          # id="projects" - Featured projects slider & repo links
│   │   │   ├── OpenToWork.tsx        # id="open-to-work" - Availability status, role pitch, CTAs
│   │   │   ├── Contact.tsx           # id="contact" - Direct contact channels (Email, Phone, etc.)
│   │   │   └── Footer.tsx            # Availability status bar, quick nav links, copyright
│   │   └── ui/
│   │       ├── FloatControls.tsx     # Floating "Scroll to Top" button
│   │       ├── GenericSlider.tsx     # Swiper-based responsive carousel component
│   │       ├── LogoSVG.tsx           # Center emblem brand SVG logo
│   │       └── PageLoader.tsx        # Initial load animation overlay
│   ├── data/
│   │   └── data.ts                   # ⭐ THE SINGLE SOURCE OF TRUTH (SSOT) FOR ALL CONTENT
│   └── hooks/
│       └── useScrollToSection.ts     # Hook to smoothly scroll to elements & update URL hash
├── GEMINI.md                         # Antigravity project rules
├── next.config.ts                    # Next.js configuration (static export, unoptimized images)
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## 3. The Single Source of Truth (`src/data/data.ts`)

**DO NOT hardcode personal details, project lists, or technical skills in UI components.**
All text, metadata, links, and content are defined in [`src/data/data.ts`](file:///var/www/html/react/portfolio-next-js/src/data/data.ts):

| Exported Object / Array | Purpose |
| :--- | :--- |
| `personalInfo` | Name, title, email, phone, location, LinkedIn/GitHub URLs, resume path (`/assets/Karthikeyan-M-Resume.pdf`), core pitch, total experience years |
| `navItems` | Navigation list with labels, Lucide icons, and anchor links (`#home`, `#about`, `#services`, `#experience`, `#projects`, `#contact`) |
| `typingWords` | Animated rotating titles for the Hero typewriter effect |
| `skillCategories` | Frontend, Backend, Database, Cloud & DevOps, AI & Tools with skill arrays |
| `experiences` | Career history: companies, roles, dates, descriptions, key impact highlights |
| `education` | Degree, universities, duration, details |
| `services` | Core expertise categories with descriptions and badge tags |
| `projectData` | Featured project items: title, desc, tech stack, image, live URL, GitHub URL |
| `contacts` | Contact channels with icons and direct URLs |
| `openToWorkCards` | Availability cards (role, location, start date, engagement type) |
| `metadatas` & `siteMetadata` | Global & section-specific SEO titles, descriptions, and OpenGraph tags |

---

## 4. Single-Page Navigation & URL Hash Architecture

The website is intentionally architected as a **high-performance Single-Page Application (SPA)**:
1. **Section IDs**:
   - `Hero`: `id="home"`
   - `AboutMe`: `id="about"`
   - `Services`: `id="services"`
   - `WorkExperience`: `id="experience"`
   - `Projects`: `id="projects"`
   - `OpenToWork`: `id="open-to-work"`
   - `Contact`: `id="contact"`
2. **URL Hash Synchronization (`Navbar.tsx`)**:
   - When a user scrolls or clicks, `window.history.replaceState` dynamically updates the address bar to `/#about`, `/#services`, `/#experience`, `/#projects`, `/#contact`.
   - On initial page load with a hash (e.g. `https://mkkcreation.com/#contact`), the page automatically smooth-scrolls directly to that section.
3. **Internal Section Cross-Links**:
   - Every section contains crawlable `<a href="#contact">` and `<a href="#about">` anchor links so search engines understand the page architecture.
4. **Structured Data SEO (`layout.tsx`)**:
   - Schema.org `@graph` defines `WebSite`, `Person` (with `JobPosting`, `knowsAbout`, `sameAs`), and `SiteNavigationElement` listing all section URLs for Google Sitelinks.

---

## 5. Tailwind CSS v4 Rules (STRICT ENFORCEMENT)

All styling **must** follow the project's Tailwind CSS v4 guidelines:

1. **Linear Gradients**:
   - ❌ Never use `bg-gradient-to-*`
   - ✅ Always use `bg-linear-to-*` (e.g., `bg-linear-to-r`, `bg-linear-to-br`, `bg-linear-to-b`).
2. **Equal Width & Height (`size-{n}`)**:
   - ❌ Never write `w-{n} h-{n}`
   - ✅ Always use `size-{n}` (e.g., `size-10`, `size-8`, `size-4`, `size-9`).
3. **Standard Spacing Scale ($px / 4$)**:
   - ❌ Never use arbitrary pixel brackets (e.g., `w-[40px]`, `min-w-[20px]`).
   - ✅ Divide pixels by 4: `w-10`, `w-6`, `min-w-5`, `min-h-5`, `min-h-8`, `min-h-10`.
4. **Aspect Ratio & Z-Index Utilities**:
   - ❌ Never write `aspect-[4/3]` or `z-[999]`
   - ✅ Use standard classes: `aspect-4/3`, `z-50`, `z-999`.
5. **Single Display Style per Element**:
   - ❌ Never combine conflicting display classes (e.g., `block ... flex items-center`).
   - ✅ Use a single, clear display utility (`flex items-center gap-1`).
6. **No Custom Raw CSS**:
   - Avoid inline `style={{ ... }}` and raw CSS classes; use Tailwind utilities.

---

## 6. How Future Agents Should Handle Common Tasks

| Task Type | Target Files To Edit | What NOT To Do |
| :--- | :--- | :--- |
| **Updating text, bio, or resume** | `src/data/data.ts` (`personalInfo`, `typingWords`) | Do NOT search across section TSX files. Edit in `data.ts`. |
| **Adding/updating a project** | `src/data/data.ts` (`projectData`) | Do NOT edit `Projects.tsx` markup. |
| **Adding/updating work experience** | `src/data/data.ts` (`experiences`, `education`) | Do NOT edit `WorkExperience.tsx` markup. |
| **Updating navigation items** | `src/data/data.ts` (`navItems`) & `src/components/Navbar.tsx` | Do NOT create separate page directories. Keep single-page. |
| **Modifying styling/layout of a section** | Directly open `src/components/sections/<SectionName>.tsx` | Do NOT read unrelated sections. |
| **Updating SEO / JSON-LD schemas** | `src/app/layout.tsx` and `src/data/data.ts` (`metadatas`) | Ensure Schema.org validity. |

---

## 7. Verification & Build Commands

- **Type Check**:
  ```bash
  export PATH="/home/mkk/.nvm/versions/node/v24.21.0/bin:$PATH" && npx tsc --noEmit
  ```
- **Production Build (Static Export)**:
  ```bash
  export PATH="/home/mkk/.nvm/versions/node/v24.21.0/bin:$PATH" && npm run build
  ```
  *(Note: Next.js static font fetching requires network access or BypassSandbox if running inside an isolated sandbox).*
