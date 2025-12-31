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
  description: "Product ML Engineer based in Lagos, Nigeria.",
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
