# Portfolio - Full Stack Developer

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. This project showcases Karthikeyan's work as a Full Stack Developer with a beautiful, interactive interface.

## 🚀 Features

- **Default Dark Mode**: Persistent theme switching initialized to Dark Mode by default.
- **Sky Blue Custom Scrollbar**: Customized scrollbar track and thumb in sky blue with hover effects, fully compatible with Webkit browsers (Chrome, Safari) and standard Firefox (`scrollbar-color`).
- **Animated Journey Timeline Tabs**: Interactive tab toggling between **Work Experience** and **Education** details using the same unified dot-timeline layout with smooth fade-in-up animations.
- **Optimized Carousel Slides**: Responsive Swiper carousel counts showing **3** slides on Laptop, **2** on iPad, and **1** on Mobile.
- **Responsive Profile Layout**: Profile image scaling optimized dynamically across all screen sizes (PC, iPad, Mobile) to prevent layout overflows and overlapping.
- **Scroll-to-Top**: Viewport scroll height listener triggers a smooth scroll-to-top floating button.
- **Gradient Theme Upgrade**: Highlights, headings, and active buttons styled with premium blue-to-sky gradients.
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop).
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions.
- **Interactive Components**: Hover effects, sliders, and dynamic content.
- **Performance Optimized**: Built with Next.js 16 and optimized for speed.
- **TypeScript**: Full type safety throughout the application.
- **Tailwind CSS**: Utility-first CSS framework for consistent styling.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.7
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Sliders**: Swiper.js
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
my-project/
├── public/                 # Static assets
│   ├── *.svg              # SVG images and icons
│   ├── *.png              # Background images
│   └── favicon.ico        # Site favicon
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page component
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── sections/      # Page sections layout modules
│   │   │   ├── Contact.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HireMe.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── WorkExperience.tsx
│   │   └── ui/            # Generic UI components
│   │       ├── ClientOnly.tsx
│   │       ├── FloatControls.tsx
│   │       ├── GenericSlider.tsx
│   │       └── PortfolioCard.tsx
│   └── data/              # Data and types
│       └── data.ts        # Mock data and interfaces
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
└── README.md              # Project documentation
```

## 🎨 Components Overview

### Page Section Components
- **Hero**: Welcoming hero block with Karthikeyan's illustration, rating stars, dynamic typing loops, and integrated Download CV / Hire Me CTAs.
- **HireMe**: Grid layout featuring biographical description, numeric counter cards (Experience & Projects), and technical skills tag clouds.
- **WorkExperience**: Awesome Journey timeline showing staggered entry animations (AOS) and dot connectors.
- **Projects**: Carousel slide viewer showcasing card actions overlays.
- **Contact**: Clean inline connect links using mail, tel, and social network redirections.

### UI Components
- **Navbar**: Translucent black glass responsive navigation menu with smooth scroll.
- **FloatControls**: Dynamic client-side container holding the persistent theme switcher (bottom-left) and scroll-to-top (bottom-right) actions.
- **GenericSlider**: Swiper-based layout slider component supporting cards.
- **PortfolioCard**: Rounded hover display project showcase card with side-by-side Live Demo and GitHub actions.

## 📊 Data Structure

The application uses TypeScript interfaces for type safety:

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
  href: string;
  github?: string;
  desc: string;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features

### Hero Section
- Animated text with custom typography
- Interactive hover effects
- Professional image display

### Services Section
- Slider showcasing different services
- Hover animations and transitions
- Professional service cards

### Work Experience
- Timeline-style experience display
- Responsive layout for mobile and desktop
- Interactive dot indicators

### Portfolio
- Project showcase with filtering
- Image galleries and descriptions
- Call-to-action buttons

### Testimonials
- Customer review cards with star ratings
- Slider functionality
- Professional testimonial layout

### Contact Section
- Email subscription form
- Social media integration
- Professional contact information

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563eb
- **Dark Gray**: #171717
- **Light Gray**: #F2F4F7
- **Text Colors**: #344054, #1D2939, #98A2B3
- **White**: #FCFCFD, #F9FAFB

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (monospace)
- **Responsive Text Sizes**: 4xl to 7xl for headings, base to xl for body text

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Responsive padding and margins
- Proper component spacing

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Adding New Content
1. Update data in `src/data/data.ts`
2. Add new SVG images to `public/` directory
3. Modify components as needed

### Styling Changes
- Use Tailwind CSS classes for styling
- Modify `globals.css` for custom styles
- Update component-specific styles

### Adding New Sections
1. Create new components in `src/components/ui/`
2. Add data interfaces in `src/data/data.ts`
3. Import and use in `src/app/page.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
1. Run `npm run build`
2. Deploy the `out` directory to your hosting platform


