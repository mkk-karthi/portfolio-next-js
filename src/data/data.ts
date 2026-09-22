import {
  LucideIcon,
  HouseIcon,
  InfoIcon,
  Zap,
  Briefcase,
  PanelsTopLeftIcon,
  Mail,
  Phone,
  Linkedin,
  Github,
  Code2,
  Layers,
  Cpu,
  Rocket,
  ShieldCheck,
  Target,
  MapPin,
  Clock,
} from "lucide-react";
import { Metadata } from "next";

// ── TypeScript Interfaces & Data Models ──

export interface NavItem {
  label: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string;
  highlights?: string[];
  techStack?: string[];
}

export interface Education {
  title: string;
  school: string;
  duration: string;
  desc: string;
}

export interface PortfolioItem {
  image: string;
  title: string;
  href?: string;
  github?: string;
  desc: string;
  tech: string[];
  category?: string;
}

export interface InfoCard {
  icon: LucideIcon;
  label: string;
  primary: string;
  accent: string;
  accentColor: string;
  gradient: string;
  shadow: string;
  primaryColor?: string;
}

export interface ContactItem {
  icon: LucideIcon;
  name: string;
  href: string;
}

// ── Experience Calculation ──

interface CareerRolePeriod {
  start: string;
  end: string | null;
}

const calculateExperienceYears = (periods: CareerRolePeriod[]): number => {
  const today = new Date();

  const normalizedPeriods = periods
    .map((period) => [new Date(period.start), new Date(period.end ?? today)] as const)
    .sort((a, b) => a[0].getTime() - b[0].getTime());

  let total = 0;
  let end: Date | null = null;

  for (const [start, periodEnd] of normalizedPeriods) {
    if (!end || start.getTime() > end.getTime()) {
      total += periodEnd.getTime() - start.getTime();
    } else if (periodEnd.getTime() > end.getTime()) {
      total += periodEnd.getTime() - end.getTime();
    }

    end = !end || periodEnd.getTime() > end.getTime() ? periodEnd : end;
  }

  return Math.floor(total / (1000 * 60 * 60 * 24 * 365.25));
};

const totalExperience = calculateExperienceYears([
  { start: "2021-07-15", end: "2022-07-15" },
  { start: "2022-08-01", end: "2024-10-30" },
  { start: "2025-02-10", end: "2025-07-07" },
  { start: "2025-09-02", end: null },
]);

// ── Personal Info (Single Source of Truth) ──

export const personalInfo = {
  name: "Karthikeyan M",
  firstName: "Karthikeyan",
  lastName: "M",
  location: "Chennai, Tamil Nadu, India",
  locationShort: "Chennai",
  email: "mkarthi.dev@gmail.com",
  phone: "+91 97919 34388",
  linkedInUrl: "https://www.linkedin.com/in/mkk-karthi",
  linkedInHandle: "linkedin.com/in/mkk-karthi",
  githubUrl: "https://github.com/mkk-karthi",
  githubHandle: "github.com/mkk-karthi",
  cvFile: "/cv.pdf",
  cvDownloadName: "Karthikeyan-M-CV.pdf",
  title: "Senior Full Stack Engineer - Open to Full-Time Opportunities",
  status: "Senior Full Stack Engineer · Chennai, India · Open to Work",
  description: `Senior Full Stack Developer with ${totalExperience}+ years of experience building AI-Powered B2B SaaS, e-commerce, job portal, transport booking and online driving course application. Strong experience in React.js, Node.js, Express.js, PostgreSQL, MySQL and Redis. Experienced in integrating Stripe, Google Play Billing, Shopify API and OpenAI API. Hands-on experience developing scalable full-stack applications, REST APIs, payment workflows, AI-powered features and background processing in Agile/Scrum environments.`,
  corePitch: `Actively seeking Senior Full-Stack Developer or Software Engineer roles. I bring ${totalExperience}+ years of enterprise-grade experience building scalable SaaS platforms, integrating payment systems, and delivering features - ready to contribute from day one.`,
  totalExperience,
  totalProjects: 10,
  clientsSatisfied: "100%",
  availability: "Immediate",
  targetRole: "Senior Full-Stack Developer",
  targetRoleFull: "Senior Full-Stack Developer or Software Engineer",
  primaryTechSummary: "React • Node.js • PostgreSQL",
  website: "https://mkkcreation.com",
};

// ── Navigation Items ──

export const navItems: NavItem[] = [
  { label: "Home", icon: HouseIcon },
  { label: "About", icon: InfoIcon },
  { label: "Services", icon: Zap },
  { label: "Experience", icon: Briefcase },
  { label: "Projects", icon: PanelsTopLeftIcon },
  { label: "Contact", icon: Mail },
];

// ── Hero Section ──

export const typingWords: string[] = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "React + Node Developer",
  "Next.js & React Architect",
  "API & AI Integration Expert",
];

export const heroData = {
  badgeText: "Full Stack",
};

// ── About Me & Technical Skills ──

export const aboutData = {
  badge: "Full Stack & Freelance Engineering",
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Vue.js",
      "HTML5/CSS3",
    ],
  },
  {
    category: "Backend",
    icon: Layers,
    skills: [
      "Node.js",
      "Express.js",
      "Python (FastAPI)",
      "PHP / Laravel",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    category: "Databases",
    icon: Briefcase,
    skills: ["PostgreSQL", "MySQL", "Redis", "Database Architecture", "Query Optimization"],
  },
  {
    category: "Cloud, AI & Security",
    icon: Cpu,
    skills: [
      "AWS",
      "OpenAI API",
      "Stripe & Google Billing",
      "Docker",
      "Git / GitHub",
      "Vercel",
      "OWASP Security",
    ],
  },
];

// ── Services & Employment Focus ──

export const services: ServiceItem[] = [
  {
    icon: Rocket,
    title: "Full-Stack Web Application Architecture",
    description:
      "End-to-end design and development of scalable web applications using Next.js, React, Node.js, and FastAPI. Delivered platforms serving 10K+ active users with high-availability APIs and optimized database design.",
    badge: "Core Strength",
  },
  {
    icon: Zap,
    title: "Payment Integration & SaaS Features",
    description:
      "Built subscription billing systems (Stripe, Google Play Billing), abandoned cart recovery workflows, invoicing engines, and loyalty modules - directly contributing to measurable revenue outcomes.",
    badge: "Revenue Impact",
  },
  {
    icon: Cpu,
    title: "AI-Powered Feature Development",
    description:
      "Integrated OpenAI and Claude APIs for intelligent LLM workflows, automated content generation, AI-driven SEO, and business logic pipelines - accelerating product capabilities at scale.",
    badge: "AI & Automation",
  },
  {
    icon: ShieldCheck,
    title: "Database Design & Performance Optimization",
    description:
      "PostgreSQL schema design, Redis caching layers, query optimization, OWASP security hardening, and legacy refactoring into clean, maintainable architecture for long-term scalability.",
    badge: "Engineering Excellence",
  },
];

export const servicesData = {
  hiringManagerBanner: {
    title: "Looking for a Full-Stack Engineer?",
    description: `I'm actively seeking full-time ${personalInfo.targetRoleFull} roles. Available ${personalInfo.availability.toLowerCase()} · ${personalInfo.locationShort}-based, open to remote.`,
  },
};

// ── Work Experience & Education ──

export const experiences: Experience[] = [
  {
    company: "GK Technologies, Chennai",
    duration: "SEP 2025 - Present",
    role: "Senior Software Engineer",
    desc: "Leading full-stack feature development for an online driving course platform with 10K+ active users, driving revenue growth and deployment velocity improvements.",
    highlights: [
      "Scaled platform to 10K+ active users - architected React.js + FastAPI full-stack features end-to-end with zero critical downtime.",
      "Recovered abandoned revenue: implemented automated cart recovery system with coupon offers, converting previously lost orders back into completed purchases.",
      "Integrated Stripe & Google Play Billing - delivered secure, dual-channel payment flow (web + Android) with real-time webhook processing.",
      "2× deployment velocity - leveraged AI coding assistants (Claude Code, Antigravity) to cut feature turnaround time by ~50% while maintaining code quality.",
    ],
    techStack: ["React.js", "FastAPI", "Python", "Stripe", "MySQL", "REST APIs"],
  },
  {
    company: "Clarity TTS, Chennai",
    duration: "Feb 2025 - Jul 2025",
    role: "Full Stack Developer",
    desc: "Engineered core booking and invoice modules for a high-traffic B2B & B2C multi-provider transport platform handling thousands of daily transactions.",
    highlights: [
      "Multi-provider booking engine: built modules for flights, hotels, and transfers in a platform processing thousands of daily bookings across B2B and B2C channels.",
      "Automated invoice generation: designed and shipped a flight booking data processing pipeline that produced accurate invoices, reducing manual effort significantly.",
      "Agile delivery: collaborated in scrum sprints, consistently meeting sprint commitments and maintaining high code quality under tight deadlines.",
    ],
    techStack: ["Laravel", "Node.js", "Express.js", "PostgreSQL", "Redis"],
  },
  {
    company: "Constient Global Solutions, Chennai",
    duration: "Aug 2022 - Oct 2024",
    role: "Software Engineer",
    desc: "Delivered enterprise B2B e-commerce platforms, job portals, and AI-powered content systems - including leading a 3-person team on Shopify integration.",
    highlights: [
      "Led 3-person team on Shopify API integration - mentored 2 junior developers, delivered the project on schedule, and improved team's code review standards.",
      "AI-powered growth: integrated Google Ads API and OpenAI-powered product content generation, automating SEO workflows that previously required manual effort.",
      "Loyalty & compliance: built e-KYC verification, reward points system, and complete job application management for a multi-module enterprise portal.",
      "Broad platform exposure: contributed to a social media platform (Core PHP), e-commerce, and job portal - demonstrating adaptability across product types.",
    ],
    techStack: ["React.js", "Next.js", "Node.js", "Laravel", "PostgreSQL", "Redis"],
  },
  {
    company: "Vaagai Tecknowledge, Virudhunagar",
    duration: "Jun 2021 - Jul 2022",
    role: "Junior Developer",
    desc: "Shipped full-stack web portals with payment gateways, event management, and inventory systems - building the technical foundation for the career ahead.",
    highlights: [
      "Members portal (end-to-end): built full-stack application using Laravel, Vue.js, and React.js - covering auth, dashboards, and member data management.",
      "Event & ticketing module: developed payment-integrated ticketing workflows for live events, including seat selection and booking confirmation.",
      "Order management system: built bulk order processing, stock tracking, and automated invoice generation - handling multi-SKU inventories at scale.",
    ],
    techStack: ["Laravel", "React.js", "Vue.js", "MySQL", "Bootstrap"],
  },
];

export const education: Education[] = [
  {
    title: "B.Sc. Computer Science",
    school: "VHNSN College",
    duration: "2018 - 2021",
    desc: "Graduated with 72% aggregate, focusing on Data Structures, Web Technology, Software Engineering, and Database Management.",
  },
  {
    title: "HSC (Higher Secondary Certificate)",
    school: "KVS Higher Secondary School",
    duration: "2016 - 2018",
    desc: "Completed Higher Secondary education with 70.25% aggregate in Computer Science stream.",
  },
];

export const experienceData = {
  description:
    "Proven track record delivering full-stack enterprise solutions and scalable web infrastructure.",
};

// ── Portfolio Projects ──

export const projectData: PortfolioItem[] = [
  {
    image: "/photography-portfolio.webp",
    title: "Photography & Framing Studio",
    href: "https://photography.mkkcreation.com/",
    desc: "Luxury photography and custom photo framing studio website featuring interactive service packages, event galleries, dynamic pricing calculator, and booking inquiry workflows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Antigravity"],
    category: "Next.js Web Application",
  },
  {
    image: "/react-games.webp",
    title: "React Games Platform",
    href: "https://games.mkkcreation.com/",
    github: "https://github.com/mkk-karthi/react-games",
    desc: "Interactive gaming portal featuring 10+ custom web games. Demonstrates complex React state management, custom hooks, and high-FPS UI rendering.",
    tech: ["React.js", "TypeScript", "Tailwind CSS"],
    category: "Frontend Application",
  },
  {
    image: "/personal-portfolio.webp",
    title: "Enterprise & Freelance Portfolio",
    href: "https://mkkcreation.com/",
    github: "https://github.com/mkk-karthi/portfolio-next-js",
    desc: "High-performance developer portfolio with dark/light blue slate theme, glassmorphism, SEO optimizations, and Vercel analytics.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AOS"],
    category: "Next.js Application",
  },
  {
    image: "/create-new-express-project-npm.webp",
    title: "Create Express Project (npm Package)",
    href: "https://www.npmjs.com/package/create-new-express-project",
    github: "https://github.com/mkk-karthi/create-new-express-project",
    desc: "Production-ready CLI scaffolding package on npm for initializing structured Express.js MVC backends with zero manual configuration.",
    tech: ["Node.js", "npm CLI", "Express.js", "JavaScript ES6"],
    category: "Developer Tools & Backend",
  },
];

export const projectsData = {
  description:
    "Explore interactive web applications, npm packages, and developer tools built with React, Next.js, and Node.js.",
};

// ── Open to Work ──

export const openToWorkCards: InfoCard[] = [
  {
    icon: Target,
    label: "Role Target",
    primary: "Senior Full-Stack Engineer",
    accent: "React + Node / MERN",
    accentColor: "text-sky-400",
    gradient: "from-blue-600 to-sky-500",
    shadow: "shadow-blue-900/40",
  },
  {
    icon: MapPin,
    label: "Location",
    primary: `${personalInfo.locationShort}, India`,
    accent: "Open to Remote",
    accentColor: "text-sky-400",
    gradient: "from-blue-600 to-sky-500",
    shadow: "shadow-blue-900/40",
  },
  {
    icon: Clock,
    label: "Availability",
    primary: personalInfo.availability,
    accent: `Notice: ${personalInfo.availability}`,
    accentColor: "text-emerald-400",
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-900/40",
    primaryColor: "text-emerald-400",
  },
  {
    icon: Zap,
    label: "Employment Type",
    primary: "Full-Time (Primary)",
    accent: "Freelance during transition",
    accentColor: "text-sky-400",
    gradient: "from-blue-600 to-sky-500",
    shadow: "shadow-blue-900/40",
  },
];

export const openToWorkData = {
  badge: "Actively Seeking Full-Time Roles",
  titlePrefix: "Open to",
  titleHighlight: "Full-Time",
  titleSuffix: "Opportunities",
  description: `I'm actively seeking ${personalInfo.targetRoleFull} roles where I can architect scalable products, build robust full-stack systems, and drive measurable business impact from day one.`,
};

// ── Contact Channels ──

export const contacts: ContactItem[] = [
  {
    icon: Mail,
    name: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    name: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: Linkedin,
    name: personalInfo.linkedInHandle,
    href: personalInfo.linkedInUrl,
  },
  {
    icon: Github,
    name: personalInfo.githubHandle,
    href: personalInfo.githubUrl,
  },
];

// ── SEO & Metadata ──

export const metadatas: Metadata = {
  title: `${personalInfo.name} | Senior Full-Stack Developer - Open to Hire`,
  description: `Portfolio of ${personalInfo.name}, Senior Full Stack Developer with ${totalExperience}+ years experience. Actively seeking Full-Stack Developer / Software Engineer roles in ${personalInfo.locationShort}. Specializes in React.js, Next.js, Node.js, Python (FastAPI), PostgreSQL, and AI integrations.`,
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/android-chrome-192x192.svg",
    },
    {
      rel: "apple-touch-icon",
      url: "/android-chrome-192x192.svg",
    },
  ],
  keywords: [
    "Karthikeyan M",
    "Senior Full Stack Developer",
    "Senior Full Stack Engineer",
    "React + Node Developer",
    "Software Engineer",
    "MERN Developer",
    "Open to Work",
    "Hire Full Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "FastAPI Python",
    "Laravel Developer",
    "Chennai Full Stack Developer",
    "Tamilnadu Full Stack Developer",
    "Full-Time Senior Engineer",
    "Web App Development",
  ],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} | Senior Full-Stack Developer - Open to Full-Time Hire`,
    description: `Senior Full Stack Developer with ${totalExperience}+ years of experience. Actively seeking full-time Senior Full-Stack Developer / Software Engineer roles. React.js, Node.js, PostgreSQL, AI integrations.`,
    url: "https://mkkcreation.com/",
    siteName: `${personalInfo.name} Portfolio`,
    type: "website",
    images: [
      {
        url: "/user.webp",
        width: 400,
        height: 400,
      },
    ],
  },
};
