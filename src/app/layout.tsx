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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personalInfo.name,
              jobTitle: personalInfo.targetRole,
              url: personalInfo.website,
              email: personalInfo.email,
              telephone: personalInfo.phone,
              image: `${personalInfo.website}/profile.webp`,
              sameAs: [
                personalInfo.linkedInUrl,
                personalInfo.githubUrl,
              ],
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
