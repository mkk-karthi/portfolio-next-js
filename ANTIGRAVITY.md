# 🛸 Antigravity Developer Hub & Technical Specifications

This specification sheet is maintained by **Antigravity**, the autonomous agentic coding assistant designed by the **Google DeepMind** team. It serves as the primary technical source of truth for features, layout details, design standards, data models, and component hierarchies for this portfolio application.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16.2.12 (App Router with Turbopack enabled)
- **Language**: TypeScript 5 (Strict mode enabled, full type definitions)
- **Styling**: Tailwind CSS 4 + Vanilla CSS directives (`globals.css`)
- **UI Components & Icons**:
  - **Lucide React**: Modern, lightweight UI icon elements
  - **Swiper.js**: Touch-enabled responsive project slider
  - **AOS (Animate On Scroll)**: Staggered scroll entrance animations
- **Optimization**: WebP media assets (`/profile.webp`), fluid typography with `clamp()`, static generation (SSG)

---

## 📁 Repository Structure

```
portfolio-next-js/
├── public/                     # Static media & asset files
│   ├── profile.webp            # Developer profile avatar (500x500 WebP, 13.8 KB)
│   ├── cv.pdf                  # Downloadable curriculum vitae
│   └── *.webp                  # Compressed project previews & background glows
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── globals.css         # Tailwind directives, custom scrollbar & animations
│   │   ├── layout.tsx          # Root HTML shell, fonts, Vercel Analytics
│   │   └── page.tsx            # Main portfolio single-page composer
│   ├── components/             # React UI components
│   │   ├── Navbar.tsx          # Translucent glass top navigation with brand logo
│   │   ├── sections/           # Modular page sections
│   │   │   ├── Hero.tsx        # High-impact streamlined hero section
│   │   │   ├── AboutMe.tsx     # Bio summary, counters & technical skills switcher
│   │   │   ├── Services.tsx    # Streamlined freelance & enterprise service offerings
│   │   │   ├── WorkExperience.tsx # Work & Education timeline tabs
│   │   │   ├── Projects.tsx    # Featured projects section wrapper
│   │   │   ├── Contact.tsx     # Direct channel contact grid
│   │   │   └── Footer.tsx      # Clean page footer
│   │   └── ui/                 # Shared UI primitives
│   │       ├── FloatControls.tsx # Scroll-to-top floating control
│   │       ├── GenericSlider.tsx # Swiper slider wrapper with autoplay pause/resume control
│   │       ├── PageLoader.tsx  # Application load state handling
│   │       └── PortfolioCard.tsx # Responsive project display card (desktop hover / mobile tap overlay)
│   └── data/                   # Dynamic data source & TypeScript interfaces
│       └── data.ts             # Profile, experience, projects & skills data
├── ANTIGRAVITY.md              # [THIS FILE] AI Developer Hub & Spec Sheet
└── README.md                   # Public project overview & instructions
```

---

## 🎨 Design System & Aesthetic Guidelines

### Theme Palette
- **Background Base**: Deep Midnight Slate (`bg-slate-950` / `bg-slate-900`)
- **Primary Accents**: High-contrast Gradient (`from-blue-600 via-sky-500 to-cyan-400`)
- **Glassmorphism**: Translucent panels (`bg-slate-950/85 backdrop-blur-2xl`, `border-sky-500/30`)
- **Typography**: Geist Sans (primary text) and Geist Mono (monospace accents)

### Responsive Rules
- **Desktop View (`>= 768px`)**: Project cards utilize smooth hover drawers (`md:group-hover:translate-y-0`) without obscuring the full card.
- **Mobile View (`< 768px`)**: Project cards use a tap-to-open full-height glass modal overlay with a close (`X`) button that pauses carousel autoplay while open and resumes scrolling when closed.
- **Fluid Sizing**: Headings scale dynamically using CSS `clamp()` to eliminate visual overflow on small screens.
- **Explicit Image Containers**: Parent wrappers for Next.js `<Image fill />` define explicit pixel or breakpoint sizes.

---

## 📊 Core Components Summary

### 1. Hero (`src/components/sections/Hero.tsx`)
- Streamlined, high-converting layout.
- Features: Greeting, name in gradient typography, dynamic typing carousel, location badge, Download CV button, Contact Me button, and quick stat counters.

### 2. About Me (`src/components/sections/AboutMe.tsx`)
- Contains biography overview, animated numeric counters (`Counter` component), and an interactive skill category tab switcher.

### 3. Services (`src/components/sections/Services.tsx`)
- Streamlined service offering cards with professional descriptions under 200 characters and direct inquiry action triggers.

### 4. Work Experience & Education (`src/components/sections/WorkExperience.tsx`)
- Tabbed timeline switcher between **Work Experience** and **Education** details with dot connectors and staggered `AOS` entrance animations.

### 5. Projects & PortfolioCard (`src/components/sections/Projects.tsx` & `PortfolioCard.tsx`)
- Responsive Swiper carousel displaying project cards. Synchronized autoplay controls pause swiper during detail overlay view.

### 6. Contact (`src/components/sections/Contact.tsx`)
- Streamlined grid of direct communication channels (Email, Phone, LinkedIn, GitHub).

---

## ⚙️ Development Guidelines

1. **Clean Code**: Keep utility classes compliant with standard Tailwind CSS v4 to prevent build warnings.
2. **Build Verification**: Always run `npm run build` after modifying components to verify zero compile or TypeScript errors.
3. **Data Centralization**: All static text, skills, and project content must remain centralized in `src/data/data.ts`.
