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
  tech: string[];
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
  description: `Senior Full Stack Engineer with ${totalExperience}+ years of experience building scalable web applications across e-commerce and enterprise domains. Proficient in building high-performance architectures using React.js, Node.js, Python (FastAPI), and Laravel. Adept at integrating complex third-party APIs (OpenAI, Shopify, Stripe) and leveraging AI-assisted development tools (Claude Code, Antigravity) to accelerate release cycles, with a proven track record of optimizing system performance and collaborating in Agile/Scrum environments.`,
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
        url: "/user.webp",
        width: 400,
        height: 400,
      },
    ],
  },
};

export const typingWords: string[] = [
  "Senior Full Stack Developer",
  "Senior Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

export const skills: string[] = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "Python",
  "FastAPI",
  "PHP",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Git",
  "GitHub",
  "OWASP security practices",
  "Claude Code",
  "GitHub Copilot",
  "Antigravity",
  "API Gateway Design",
  "MVC architecture",
  "JWT Authentication",
];

export const experiences: Experience[] = [
  {
    company: "ISYS Technologies, Chennai",
    duration: "Sep 2025 - Present",
    role: "Senior Software Engineer",
    desc: "Architecting full-stack applications using Laravel and FastAPI. Implemented an abandoned cart recovery system with coupon offers, recovering 18% of abandoned orders. Integrated Stripe payments and reduced disputes by 15% through robust error handling.",
  },
  {
    company: "Clarity TTS, Chennai",
    duration: "Feb 2025 - Jul 2025",
    role: "Full Stack Developer",
    desc: "Architected B2B/B2C transport booking platform (Laravel + Node.js + MySQL) handling 10K+ daily transactions. Developed order management and invoice generation modules improving operational efficiency by 25%. Collaborated in agile environments to deliver high-quality features.",
  },
  {
    company: "Constient Global Solutions, Chennai",
    duration: "Aug 2022 - Oct 2024",
    role: "Software Engineer",
    desc: "Built e-commerce platform with (Laravel + Vue.js + Node.js + PostgreSQL) improving conversion rates by 15%. Integrated Google Ads and AI automation, cutting manual work by 200+ hours monthly. Mentored junior developers on Laravel and architecture patterns.",
  },
  {
    company: "Vaagai Tecknowledge, Virudhunagar",
    duration: "Jun 2021 - Jul 2022",
    role: "Junior Developer",
    desc: "Launched members portal with Laravel + Vue.js + React.js improving engagement by 2x. Collaborated with teams to gather requirements and deliver timely solutions. Implemented responsive design patterns across major applications.",
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
    desc: "Interactive gaming platform with 10+ games. Showcases advanced state management, custom hooks, and fully responsive layouts.",
    tech: ["React.js", "TypeScript", "Tailwind CSS"]
  },
  {
    image: "/personal-portfolio.webp",
    title: "Developer Portfolio",
    href: "https://mkkcreation.com/",
    github: "https://github.com/mkk-karthi/portfolio-next-js",
    desc: "Modern personal portfolio with project showcase, dark mode, and analytics. Optimized for performance and SEO, built on Next.js.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
  },
  {
    image: "/create-new-express-project-npm.webp",
    title: "Create Express Project (npm Package)",
    href: "https://www.npmjs.com/package/create-new-express-project",
    github: "https://github.com/mkk-karthi/create-new-express-project",
    desc: "Production-ready Express.js CLI scaffolding tool that generates boilerplate code, structured folders, and custom configurations for rapid backend setup.",
    tech: ["Node.js", "npm", "MVC Architecture", "JavaScript"]
  },
  {
    image: "/ecommerce.webp",
    title: "E-commerce Web Application",
    desc: "Full-stack SaaS platform with product catalog, cart, payments, and analytics. Features include promotion creation, campaign management, and performance optimizations.",
    tech: ["Laravel", "Vue.js", "PostgreSQL", "Node.js", "Redis Caching", "OpenAI Integration"]
  },
  {
    image: "/social-media.webp",
    title: "Social Media Application",
    desc: "Full-featured social platform featuring user authentication, post creation, followers network, and real-time activity notifications built with PHP and MySQL.",
    tech: ["PHP", "MySQL"]
  },
  {
    image: "/members-portal.webp",
    title: "Members Portal",
    desc: "Enterprise member management system featuring role-based access control, secure authentication, and personalized user dashboards developed using Laravel and Vue.js.",
    tech: ["Laravel", "Vue.js", "MySQL", "React.js"]
  },
];
