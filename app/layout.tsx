import type React from "react"
import type { Metadata } from "next"
import { Share_Tech_Mono } from "next/font/google"
import "./globals.css"

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
})

export const metadata: Metadata = {
  title: "0xy7d | Malik Diyaolu",
  metadataBase: new URL("https://0xy7d.xyz"),
  description: "Software engineer at Klorion Labs building useful systems from complex ideas, with a focus on embodied intelligence research and Web3.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${shareTechMono.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
