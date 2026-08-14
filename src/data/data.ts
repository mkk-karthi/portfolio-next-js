import {
  LucideIcon,
  Mail,
  Phone,
  Linkedin,
  Github,
  HouseIcon,
  InfoIcon,
  PanelsTopLeftIcon,
  Briefcase,
  Layers,
  Code2,
  Cpu,
  Zap,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { Metadata } from "next";

export interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string;
  highlights?: string[];
  techStack?: string[];
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
  category?: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Home", icon: HouseIcon },
  { label: "About", icon: InfoIcon },
  { label: "Services", icon: Zap },
  { label: "Experience", icon: Briefcase },
  { label: "Projects", icon: PanelsTopLeftIcon },
  { label: "Contact", icon: Mail },
];

interface Job {
  start: string;
  end: string | null;
}

const calculateExperienceYears = (jobs: Job[]): number => {
  const today = new Date();

  const normalizedJobs = jobs
    .map((job) => [
      new Date(job.start),
      new Date(job.end ?? today),
    ] as const)
    .sort((a, b) => a[0].getTime() - b[0].getTime());

  let total = 0;
  let end: Date | null = null;

  for (const [start, jobEnd] of normalizedJobs) {
    if (!end || start.getTime() > end.getTime()) {
      total += jobEnd.getTime() - start.getTime();
    } else if (jobEnd.getTime() > end.getTime()) {
      total += jobEnd.getTime() - end.getTime();
    }

    end = !end || jobEnd.getTime() > end.getTime() ? jobEnd : end;
  }

  return Math.floor(total / (1000 * 60 * 60 * 24 * 365.25));
};

const totalExperience = calculateExperienceYears([
  { start: "2021-07-15", end: "2022-07-15" },
  { start: "2022-08-01", end: "2024-10-30" },
  { start: "2025-02-10", end: "2025-07-07" },
  { start: "2025-09-02", end: null },
]);

export const personalInfo = {
  name: "Karthikeyan M",
  title: "Senior Full Stack Engineer & Freelance Web Specialist",
  status: "Senior Full Stack Engineer · Chennai, India",
  description: `Senior Full Stack Engineer with ${totalExperience}+ years of experience architecting high-performance web applications, enterprise microservices, and AI-driven automation systems. Specialized in React.js, Next.js, Node.js, Python (FastAPI), and Laravel. Known for accelerating product velocity using AI workflow tools (Claude Code, Antigravity), optimizing backend performance by up to 25%, and delivering turn-key client solutions.`,
  freelancePitch: `Looking to launch a high-converting web app, scale an existing platform, or integrate AI/payment APIs? I bring enterprise engineering standards with agile freelance execution speed.`,
  totalExperience: totalExperience,
  totalProjects: 10,
  clientsSatisfied: "100%",
  quote:
    "Engineering scalable web apps, high-throughput APIs, and AI integrations with modern speed & precision.",
  website: "https://mkkcreation.com",
};

export const metadatas: Metadata = {
  title: "Karthikeyan M | Senior Full Stack Developer & Freelancer",
  description: `Portfolio of Karthikeyan M, Senior Full Stack Engineer & Freelancer with ${totalExperience}+ years experience specializing in React.js, Next.js, Node.js, Python (FastAPI), and Laravel. Available for full-time roles & freelance projects.`,
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
    "Freelance Web Developer",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "FastAPI Python",
    "Laravel Developer",
    "Chennai Full Stack Developer",
    "Freelance Full Stack Engineer",
    "Web App Development",
  ],
  authors: [{ name: "Karthikeyan M" }],
  openGraph: {
    title: "Karthikeyan M | Senior Full Stack Developer Portfolio & Freelance Services",
    description: `Portfolio of Karthikeyan M, a Senior Full Stack Engineer with ${totalExperience}+ years of experience building web apps and AI-powered systems.`,
    url: "https://mkkcreation.com/",
    siteName: "Karthikeyan M Portfolio",
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

export const typingWords: string[] = [
  "Senior Full Stack Engineer",
  "Freelance Web Specialist",
  "Next.js & React Architect",
  "API & AI Integration Specialist",
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: Code2,
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Vue.js", "HTML5/CSS3"],
  },
  {
    category: "Backend & Microservices",
    icon: Layers,
    skills: ["Node.js", "Express.js", "Python (FastAPI)", "PHP / Laravel", "REST APIs", "Microservices"],
  },
  {
    category: "Databases & Caching",
    icon: Briefcase,
    skills: ["PostgreSQL", "MySQL", "Redis", "Database Architecture", "Query Optimization"],
  },
  {
    category: "Cloud, AI & Security",
    icon: Cpu,
    skills: ["OpenAI API", "Stripe & Google Billing", "Docker", "Git / GitHub", "Vercel", "OWASP Security"],
  },
];

export interface Education {
  title: string;
  school: string;
  duration: string;
  desc: string;
}

export const services: ServiceItem[] = [
  {
    icon: Rocket,
    title: "Full-Stack Web App & MVP Development",
    description:
      "End-to-end development of modern web applications built with Next.js, React, Node.js, and FastAPI. Delivering high-performance APIs, database architecture, and SEO optimized scalable MVPs.",
    badge: "Most Popular for Freelance",
  },
  {
    icon: Zap,
    title: "E-Commerce & Subscription Systems",
    description:
      "Building conversion-focused platforms with automated subscription billing (Stripe/Google Play Billing), automated abandoned cart recovery, user loyalty modules, invoicing systems, and real-time dashboards to maximize revenue.",
    badge: "Revenue Focused",
  },
  {
    icon: Cpu,
    title: "API & AI System Integration",
    description:
      "Empowering web apps with intelligent LLM workflows (OpenAI, Claude), custom REST/gRPC API architectures, automated business logic pipelines, and third-party integrations for scalable growth.",
    badge: "AI Powered",
  },
  {
    icon: ShieldCheck,
    title: "Performance & Code Refactoring",
    description:
      "Elevating web platforms by optimizing database queries, implementing Redis caching layers, resolving OWASP security vulnerabilities, and refactoring legacy code into clean architecture.",
    badge: "Enterprise Quality",
  },
];

export const experiences: Experience[] = [
  {
    company: "GK Technologies, Chennai",
    duration: "AUG 2025 - Present",
    role: "Senior Software Engineer",
    desc: "Built full-stack features for a B2C subscription-based driving course platform serving 10K+ active users.",
    highlights: [
      "Engineered abandoned cart recovery funnel with custom promotional triggers, recovering 15% of lost orders.",
      "Integrated Stripe and Google Play Billing for cross-platform web and mobile subscriptions.",
      "Leveraged AI coding assistants (Claude Code, Antigravity) to double deployment velocity.",
    ],
    techStack: ["React.js", "FastAPI", "Python", "Stripe", "MySQL", "REST APIs"],
  },
  {
    company: "Clarity TTS, Chennai",
    duration: "Feb 2025 - Jul 2025",
    role: "Full Stack Developer",
    desc: "Engineered core modules for a high-traffic B2B and B2C transport booking platform handling thousands of daily bookings.",
    highlights: [
      "Optimized order management & invoice generation pipelines, improving operational efficiency by 25%.",
      "Integrated multi-provider travel APIs (flights, hotels, transfers) with robust error handling.",
      "Collaborated in Agile/Scrum sprints for rapid feature iterations.",
    ],
    techStack: ["Laravel", "Node.js", "Express.js", "PostgreSQL", "Redis"],
  },
  {
    company: "Constient Global Solutions, Chennai",
    duration: "Aug 2022 - Oct 2024",
    role: "Software Engineer",
    desc: "Developed enterprise B2B e-commerce platforms, member portals, and AI content creation systems.",
    highlights: [
      "Built AI product content generator & automated SEO metadata engine, cutting manual efforts by 70%.",
      "Implemented member loyalty systems, automated KYC workflows, and full job recruitment engine.",
      "Mentored junior engineers on Laravel design patterns and code quality standards.",
    ],
    techStack: ["React.js", "Next.js", "Node.js", "Laravel", "PostgreSQL", "Redis"],
  },
  {
    company: "Vaagai Tecknowledge, Virudhunagar",
    duration: "Jun 2021 - Jul 2022",
    role: "Junior Developer",
    desc: "Built full-stack web portals using Laravel, Vue.js, and React.js with integrated payment gateways.",
    highlights: [
      "Developed event management and ticketing platform with automated email notifications.",
      "Created dynamic user portal with responsive layout and security controls.",
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

export const contacts: ContactItem[] = [
  {
    icon: Mail,
    name: "mkarthi.dev@gmail.com",
    href: "mailto:mkarthi.dev@gmail.com",
  },
  {
    icon: Phone,
    name: "+91 97919 34388",
    href: "tel:+919791934388",
  },
  {
    icon: Linkedin,
    name: "linkedin.com/in/mkk-karthi",
    href: "https://www.linkedin.com/in/mkk-karthi",
  },
  {
    icon: Github,
    name: "github.com/mkk-karthi",
    href: "https://github.com/mkk-karthi",
  },
];

export const projectData: PortfolioItem[] = [
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
