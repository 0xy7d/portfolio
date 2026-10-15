import type React from "react"
import type { Metadata } from "next"
import { Share_Tech_Mono } from "next/font/google"
import { themeScript } from "@/lib/theme"
import { site, socials } from "@/lib/portfolio"
import "./globals.css"

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
})

const title = `${site.handle} | ${site.name}`
const description = `${site.summary}. Research interests in ${site.interests.slice(0, -1).join(", ")}, and ${site.interests.at(-1)}.`

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title, description },
  twitter: { card: "summary_large_image", creator: `@${site.handle}`, title, description },
}

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  knowsAbout: ["Machine Learning", "Retrieval-Augmented Generation", "Document Intelligence", ...site.interests],
  sameAs: socials.map((social) => social.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={shareTechMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
