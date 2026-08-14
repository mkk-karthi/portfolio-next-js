# Karthikeyan M — Senior Full Stack Engineer Portfolio

A modern, high-performance, and fully responsive portfolio website built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS 4**. Designed with a modern Midnight Slate-Blue dark theme, fluid typography, rich micro-animations, glassmorphism, and responsive architecture.

---

## ✨ Key Features

- **Responsive Multi-Device Interaction Model**:
  - **Desktop (PC/Laptop)**: Elegant hover-driven bottom drawer overlay displaying project details and technical stack.
  - **Mobile/Tablet**: Interactive tap-to-open full-height dark glass modal with a dedicated close (`X`) button.
  - **Carousel Synchronization**: Swiper carousel automatically **pauses** auto-play when project details are opened and **resumes** upon closing.
- **Midnight Slate-Blue Aesthetic**: Modern dark mode palette (`#020617` / `#0f172a`) paired with vibrant blue-to-sky gradients (`from-blue-600 to-sky-500`) and high-blur glassmorphism (`backdrop-blur-2xl`).
- **Streamlined Hero Section**: High-impact hero featuring interactive typing animations, key statistics (Years Exp, Projects, Companies), location info, and direct CTAs (CV download & Contact trigger).
- **Concise Services Section**: High-impact service offerings with professional descriptions under 200 characters, emphasizing full-stack development, e-commerce/subscriptions, API/AI integration, and performance refactoring.
- **About Me & Skills Switcher**: Categorized technical skills switcher (Frontend, Backend, Database/Cloud, AI/Workflow Tools) with animated stats counters.
- **Work & Education Timeline**: Interactive tab toggling between **Work Experience** and **Education** with staggered scroll reveal animations (`AOS`).
- **Custom Scrollbar & Floating Controls**: Webkit & Firefox compatible sky-blue custom scrollbar with a dynamic scroll-to-top button.
- **SEO & Performance Optimized**: Full metadata configuration, WebP image formats, fluid typography via `clamp()`, and clean build outputs.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + Custom CSS directives (`globals.css`)
- **Icons**: Lucide React
- **Animations**: AOS (Animate On Scroll) + CSS Micro-animations
- **Sliders**: Swiper.js
- **Analytics**: `@vercel/analytics`

---

## 📁 Directory Structure

```
portfolio-next-js/
├── public/                 # Static assets (PDFs, WebP images, favicons)
│   ├── profile.webp       # Developer profile image
│   ├── cv.pdf             # Curriculum Vitae
│   └── *.webp             # Project screenshots & background assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global CSS, animations & custom scrollbar
│   │   ├── layout.tsx     # Root layout & Vercel Analytics setup
│   │   └── page.tsx       # Main single-page application entry point
│   ├── components/        # UI & Section Components
│   │   ├── Navbar.tsx     # Translucent sticky top navigation with brand logo
│   │   ├── sections/      # Section modules
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutMe.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WorkExperience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/            # Reusable UI primitives
│   │       ├── FloatControls.tsx
│   │       ├── GenericSlider.tsx
│   │       ├── PageLoader.tsx
│   │       └── PortfolioCard.tsx
│   └── data/              # Static content & TypeScript interfaces
│       └── data.ts        # Personal info, experience, services & projects data
├── ANTIGRAVITY.md         # Developer Hub & Specification
├── README.md              # Project Documentation
└── package.json           # Scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm** / **yarn** / **pnpm**

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/mkk-karthi/portfolio-next-js.git
   cd portfolio-next-js
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**
   ```bash
   npm run build
   npm run start
   ```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
