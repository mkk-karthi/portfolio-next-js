import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { metadatas } from "@/data/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mkkcreation.com"),
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-thumb-sky-700 scrollbar-track-sky-100`}
        suppressHydrationWarning={true}
      >
        <div className="overflow-x-hidden">
          {children}
          <Analytics debug={true} />
        </div>
      </body>
    </html>
  );
}
