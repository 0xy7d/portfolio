"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "work", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "thoughts", label: "Thoughts" },
  { id: "guestbook", label: "Guestbook" },
  { id: "connect", label: "Connect" },
]

export function SiteNav({ brand }: { brand: string }) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-15% 0px -65% 0px" },
    )
    for (const { id } of sections) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav aria-label="Main navigation" className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <a href="#intro" className="shrink-0 text-sm tracking-wide">{brand}</a>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:gap-x-6 sm:text-sm">
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}
              className={`transition-colors hover:text-foreground ${activeSection === id ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
