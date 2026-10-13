import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { metadatas, personalInfo } from "@/data/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0b1120",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mkkcreation.com"),
  alternates: {
    canonical: "https://mkkcreation.com",
  },
  title: metadatas.title,
  description: metadatas.description,
  icons: metadatas.icons,
  keywords: metadatas.keywords,
  authors: metadatas.authors,
  openGraph: metadatas.openGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preload"
          href="/profile.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM Context"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${personalInfo.website}/#website`,
                  url: personalInfo.website,
                  name: `${personalInfo.name} - Senior Full Stack Developer`,
                  description: metadatas.description,
                  inLanguage: "en-US",
                },
                {
                  "@type": "Person",
                  "@id": `${personalInfo.website}/#person`,
                  name: personalInfo.name,
                  jobTitle: personalInfo.targetRole,
                  url: personalInfo.website,
                  email: personalInfo.email,
                  telephone: personalInfo.phone,
                  image: `${personalInfo.website}/profile.webp`,
                  sameAs: [personalInfo.linkedInUrl, personalInfo.githubUrl],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: personalInfo.locationShort,
                    addressRegion: "Tamil Nadu",
                    addressCountry: "IN",
                  },
                  knowsAbout: [
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "PostgreSQL",
                    "Full Stack Developer",
                    "Full Stack Engineer",
                    "React + Node Developer",
                    "Software Engineer",
                    "MERN Developer",
                    "AI Integration",
                    "Stripe Payment Systems",
                  ],
                  seeks: {
                    "@type": "JobPosting",
                    title: personalInfo.targetRole,
                    employmentType: "FULL_TIME",
                    jobLocation: {
                      "@type": "Place",
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: personalInfo.locationShort,
                        addressCountry: "IN",
                      },
                    },
                  },
                },
                {
                  "@type": "ItemList",
                  "@id": `${personalInfo.website}/#navigation`,
                  name: "Site Navigation",
                  itemListElement: [
                    {
                      "@type": "SiteNavigationElement",
                      position: 1,
                      name: "Home",
                      url: `${personalInfo.website}/`,
                    },
                    {
                      "@type": "SiteNavigationElement",
                      position: 2,
                      name: "About",
                      url: `${personalInfo.website}/#about`,
                    },
                    {
                      "@type": "SiteNavigationElement",
                      position: 3,
                      name: "Services",
                      url: `${personalInfo.website}/#services`,
                    },
                    {
                      "@type": "SiteNavigationElement",
                      position: 4,
                      name: "Experience",
                      url: `${personalInfo.website}/#experience`,
                    },
                    {
                      "@type": "SiteNavigationElement",
                      position: 5,
                      name: "Projects",
                      url: `${personalInfo.website}/#projects`,
                    },
                    {
                      "@type": "SiteNavigationElement",
                      position: 6,
                      name: "Contact",
                      url: `${personalInfo.website}/#contact`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-thumb-sky-700 scrollbar-track-sky-100`}
        suppressHydrationWarning={true}
      >
        <div className="overflow-x-hidden">
          {children}
          {process.env.VERCEL && <Analytics />}
        </div>
      </body>
    </html>
  );
}
