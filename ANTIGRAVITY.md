# 🛸 Antigravity Developer Hub & Project Specifications

This developer specification is maintained by **Antigravity**, the autonomous agentic coding assistant designed by the **Google DeepMind** team. It serves as the primary technical source of truth for features, layout details, data models, and component hierarchies in the portfolio-next-js project.

---

## 🛠️ Project Tech Stack

*   **Framework**: Next.js 16.2.7 (Turbopack integration enabled for rapid local build compilation)
*   **Language**: TypeScript 5 (Strict type checking, full interface definitions)
*   **Styling**: Tailwind CSS 4.3.0, custom vanilla CSS overlays for scrolling and transition effects
*   **Component libraries / tools**:
    *   **Lucide React** (Consistent modern icon elements)
    *   **Swiper.js** (Responsive sliders/carousels)
    *   **AOS** (Animate On Scroll for staggered transition effects)
*   **Analytics**: `@vercel/analytics` for production tracking

---

## 📁 Repository Directory Structure

```
portfolio-next-js/
├── public/                     # Static files (PDFs, Images, SVGs, Avatars)
│   ├── cv.pdf                  # Curriculum Vitae
│   ├── user.webp               # Profile Avatar
│   └── *.webp                  # Project previews (react-games, ecommerce, social-media, etc.)
├── src/
│   ├── app/                    # Next.js App Router Structure
│   │   ├── globals.css        # Tailwind directives, custom scrollbars, fonts
│   │   ├── layout.tsx         # Document envelope (Geist font initialization, Analytics)
│   │   └── page.tsx           # Home view composing all major section wrappers
│   ├── components/            # Interface elements
│   │   ├── Navbar.tsx         # Glassmorphic top navigation bar
│   │   ├── sections/          # Page sections (Hero, HireMe, Projects, WorkExperience, Contact, Footer)
│   │   └── ui/                # Core interactive UI components (PortfolioCard, GenericSlider, FloatControls)
│   └── data/                  # Static Content & TypeScript Interfaces
│       └── data.ts            # Project details, experience history, skills configuration
├── ANTIGRAVITY.md              # [THIS FILE] AI Developer Hub & Spec Sheet
└── README.md                  # Project overview, installation, and deployment details
```

---

## 🎨 Premium Design System & Aesthetics

### Theme & Colors
*   **Primary Theme**: Default Dark mode (`dark-100` / `neutral-900` / opacity backdrops).
*   **Primary Accents**: High-contrast Blue-to-Sky gradients (`from-blue-600 to-sky-500`).
*   **Neutral Text Colors**: Light warm/off-whites (`#FCFCFD`, `#F9FAFB`) for body content; crisp whites for headers.
*   **Glassmorphism**: Backdrop blur overlays (`backdrop-blur-md` / `backdrop-blur-xl`) with subtle border lines (`border-white/10`) to overlay rich content on dark gradient backgrounds.

### Typography
*   **Fonts**: Geist Sans (primary display headings/text) and Geist Mono (monospace technical details).
*   **Hierarchy**: Heading titles scale from `4xl` (Mobile) to `7xl` (Desktop).

### Custom Elements
1.  **Sky Blue Custom Scrollbar**
    *   Styled to apply across Webkit browsers and standard Firefox:
        ```css
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #171717; }
        ::-webkit-scrollbar-thumb { background: #0284c7; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #0369a1; }
        ```
2.  **FloatControls**
    *   Sticky, floating actions located in screen corners:
        *   **Bottom-Left**: Persistent theme toggler (Dark/Light).
        *   **Bottom-Right**: Dynamic Scroll-to-Top trigger button.

---

## 📊 TypeScript Data Structure Reference (`src/data/data.ts`)

The project uses modular TypeScript contracts to define static mock data:

```typescript
export interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string;
}

export interface ContactItem {
  icon: LucideIcon;
  name: string;
  href: string;
}

export interface PortfolioItem {
  image: string;
  title: string;
  href?: string;
  github?: string;
  desc: string;
  tech: string[];
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
}
```

### Experience Duration Algorithm
Calculates the exact total career experience years dynamically dynamically in `data.ts` using:
```typescript
const calculateExperienceYears = (jobs: Job[]): number => { ... }
```

---

## ⚙️ Main Components & Core Features

### 1. Hero Section (`src/components/sections/Hero.tsx`)
*   Contains profile images, dynamic text typing carousel, rating stars, and interactive links.
*   Features:
    *   "Download CV" and "Hire Me" primary action buttons.
    *   Avatar image scaling tailored for PC, iPad, and Mobile layout grids to prevent overlap.

### 2. HireMe / Bio (`src/components/sections/HireMe.tsx`)
*   Grid showing biographical details alongside numeric statistics (Experience duration + total projects count).
*   Displays a technical skill cloud showcasing the developer's core proficiencies (e.g. PHP, Laravel, Next.js, React, Python, Claude Code, Antigravity).

### 3. Work & Education Timeline (`src/components/sections/WorkExperience.tsx`)
*   Unified tab switcher toggle: **Work Experience** vs. **Education Details**.
*   Utilizes a central dot timeline with staggered scrolling reveal animations powered by `AOS`.

### 4. Slider & Project Cards (`src/components/ui/GenericSlider.tsx` & `PortfolioCard.tsx`)
*   **Swiper Configuration**:
    *   Configured with responsive layout breakpoints (Slides: Desktop=3, Tablet=2, Mobile=1).
    *   Autoplay delay of `3000ms`.
    *   **Autoplay Pause**: Autoplay pauses automatically when hovering over any project slider or card (`pauseOnMouseEnter: true`) and resumes on mouse leave.
*   **Portfolio Card Details**:
    *   **Top-Right corner**: Features floating glassmorphic buttons targeting **GitHub Code** and **Live Demo** URLs.
    *   **Bottom drawer**: Slides up gracefully on card hover. Displays the project title, project description, and a flex container of project technology tags (`tech` strings array) as glassmorphic pills.
    *   Duplicate "Live" and "Code" buttons inside the drawer are replaced by these technology badges, keeping UI clean.

### 5. Contact & Footer (`src/components/sections/Contact.tsx` & `Footer.tsx`)
*   Action links targeting developer email, phone, LinkedIn, and GitHub.
*   Simplistic clean page footer marking the developer credentials.

---

## 🛠️ Instructions for Feature Development

When extending this project or creating new components:
1.  **Modify Data**: Keep text details in `src/data/data.ts` to populate fields automatically.
2.  **Add Styles**: Write Tailwind CSS directives or declare variables in `src/app/globals.css`.
3.  **Ensure Responsiveness**: Ensure components scale down comfortably from Desktop breakpoints to iPad and Mobile viewports (< 640px).
4.  **Premium Aesthetics**: Follow dark theme accents, smooth animations (AOS / custom hover transitions), glassmorphic backdrops, and harmonious gradients.
5.  **Build Verification**: Always run `npm run build` after editing component files to check for typescript compile issues or hydration mismatch errors.
