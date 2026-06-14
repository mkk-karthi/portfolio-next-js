import {
  LucideIcon,
  Mail,
  Phone,
  Linkedin,
  Github,
  HouseIcon,
  InfoIcon,
  PanelsTopLeftIcon,
} from "lucide-react";
import { Metadata } from "next";

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
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Home", icon: HouseIcon },
  { label: "About", icon: InfoIcon },
  { label: "Project", icon: PanelsTopLeftIcon },
  { label: "Contact", icon: Mail },
];

interface Job {
  start: string;
  end: string | null;
};

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
  description: `Senior Full Stack Developer with ${totalExperience}+ years of experience building scalable web applications across e-commerce, transport booking portals, social media, and enterprise platforms. Proficient in React.js, Node.js, Python (FastAPI), and Laravel, with expertise integrating third-party APIs (OpenAI, Shopify, Google Ads) and leveraging AI-assisted development tools (Claude Code, Codex) to accelerate feature delivery.`,
  totalExperience: totalExperience,
  totalProjects: 10,
  quote:
    "Karthikeyan's exceptional engineering capabilities and technical expertise ensured our platform's seamless delivery. Highly recommended.",
  website: "https://mkkcreation.com/",
};

export const metadatas: Metadata = {
  title: "Karthikeyan M | Senior Full Stack Developer Portfolio",
  description: `Portfolio of Karthikeyan M, a Senior Full Stack Developer with ${totalExperience}+ years of experience specializing in React.js, Node.js, Python (FastAPI), and Laravel. Discover high-performance web applications and backend solutions.`,
  icons: [
    {
      url: "/android-chrome-192x192.svg",
    },
  ],
  keywords: [
    "Karthikeyan M",
    "Full Stack Developer",
    "Front End Developer",
    "Back End Developer",
    "React.js",
    "Node.js",
    "FastAPI",
    "Python",
    "Php",
    "Laravel",
    "Chennai",
    "Web App Development",
    "NPM Packages",
  ],
  authors: [{ name: "Karthikeyan M" }],
  openGraph: {
    title: "Karthikeyan M | Senior Full Stack Developer Portfolio",
    description: `Portfolio of Karthikeyan M, a Senior Full Stack Developer with ${totalExperience}+ years of experience specializing in React.js, Node.js, Python (FastAPI), and Laravel.`,
    url: "https://mkkcreation.com/",
    siteName: "Karthikeyan Portfolio",
    type: "website",
    images: [
      {
        url: "/user.jpg",
        width: 400,
        height: 400,
      },
    ],
  },
};

export const typingWords: string[] = [
  "Web App Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Photo Editor",
];

export const skills: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
  "Python",
  "React.js",
  "Vue.js",
  "Next.js",
  "Laravel",
  "Express.js",
  "FastAPI",
  "Node.js",
  "Tailwind CSS",
  "Bootstrap",
  "MySQL",
  "PostgreSQL",
  "Git",
  "Claude Code",
  "Codex",
];

export const experiences: Experience[] = [
  {
    company: "ISYS Technologies, Chennai",
    duration: "Sep 2025 - Present",
    role: "Senior Software Engineer",
    desc: "Architecting and developing full-stack web applications using Laravel and FastAPI. Designing RESTful APIs and integrating third-party services to meet B2B requirements. Utilizing AI-assisted development tools (Claude Code, Codex) to improve code quality and delivery speed.",
  },
  {
    company: "Clarity TTS, Chennai",
    duration: "Feb 2025 - Jul 2025",
    role: "Full Stack Developer",
    desc: "Developing B2B and B2C transport websites for booking flights, and hotels. Integrated real-time third-party APIs for live flight availability. Developed order management and invoice generation modules to streamline workflows.",
  },
  {
    company: "Constient Global Solutions, Chennai",
    duration: "Aug 2022 - Oct 2024",
    role: "Software Engineer",
    desc: "Developed e-commerce platforms, enhancing user experience and conversion rates. Integrated OpenAI API for intelligent recommendations, and Shopify/Google Ads APIs to optimize marketing funnels. Collaborated on real-time social web applications.",
  },
  {
    company: "Vaagai Tecknowledge, Virudhunagar",
    duration: "Jun 2021 - Jul 2022",
    role: "Junior Developer",
    desc: "Developed an Order Management System for efficient order processing and inventory tracking. Built a Members Portal with integrated event management capabilities to boost user engagement and personalized access. Used modern frameworks to ensure scalable and maintainable applications.",
  },
];

export const education = [
  {
    title: "B.Sc. Computer Science",
    school: "VHNSN College (2018 - 2021)",
    desc: "I pursued my college education at VHNSNC in 2021, specializing in Bachelor of Computer Science with English as the medium of instruction. I am proud to have achieved a commendable score of 72%, reflecting my dedication and hard work throughout my academic journey.",
  },
  {
    title: "HSC",
    school: "KVS Higher Secondary School (2016 - 2018)",
    desc: "In 2018, I attended KVS HSS, where I studied in the Tamil medium and appeared for the HSC board exams. I am proud to have achieved a respectable score of 70.25%, reflecting my dedication and hard work throughout my academic journey.",
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
    name: "linkedin.com/in/karthikeyan-developer-mkk",
    href: "https://www.linkedin.com/in/karthikeyan-developer-mkk",
  },
  {
    icon: Github,
    name: "github.com/mkk-karthi",
    href: "https://github.com/mkk-karthi",
  },
];

export const projectData: PortfolioItem[] = [
  {
    image: "/react-games.png",
    title: "React Games",
    href: "https://games.mkkcreation.com/",
    github: "https://github.com/mkk-karthi/react-games",
    desc: "Interactive browser games built using React and TypeScript demonstrating advanced state management, animations, and modular component architecture.",
  },
  {
    image: "/personal-portfolio.png",
    title: "Developer Portfolio",
    href: "https://mkkcreation.com/",
    github: "https://github.com/mkk-karthi/mkk-karthi.github.io",
    desc: "Personal portfolio site with dynamic project showcase, dark mode switcher, and skills timeline built on Next.js for SEO and high performance.",
  },
  {
    image: "/create-new-express-project-npm.png",
    title: "Create Express Project",
    href: "https://www.npmjs.com/package/create-new-express-project",
    github: "https://github.com/mkk-karthi/create-new-express-project",
    desc: "CLI scaffolding tool for Express.js APIs. Generates boilerplate code, structured folders, and configurations for fast, production-ready backend project setup.",
  },
  {
    image: "/social-media.png",
    title: "Social Media Application",
    desc: "Full-featured social platform featuring user authentication, post creation, followers network, and real-time activity notifications built with PHP and MySQL.",
  },
  {
    image: "/members-portal.png",
    title: "Members Portal",
    desc: "Enterprise member management system featuring role-based access control, secure authentication, and personalized user dashboards developed using Laravel and Vue.js.",
  },
  {
    image: "/ecommerce.png",
    title: "E-commerce Web Application",
    desc: "B2B e-commerce platform built with Laravel, Vue.js, and PostgreSQL. Features product catalogs, shopping carts, order pipelines, and Shopify/payment API integrations.",
  },
];
