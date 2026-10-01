"use client"

import Link from "next/link"
import { ArrowDown, ArrowUpRight, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { RecentThoughts } from "@/components/recent-thoughts"
import { experience, lab, projects } from "@/lib/portfolio"

const sections = [
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "thoughts", label: "Thoughts" },
  { id: "connect", label: "Connect" },
]

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    try {
      const dark = localStorage.getItem("portfolio-theme") === "dark"
      setIsDark(dark)
      document.documentElement.classList.toggle("dark", dark)
    } catch {
      // Keep the default theme when browser storage is unavailable.
    }

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

  function toggleTheme() {
    const dark = !isDark
    setIsDark(dark)
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light")
    } catch {
      // Theme switching still works without storage.
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <nav aria-label="Main navigation" className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <Link href="#intro" className="shrink-0 text-sm tracking-wide">0xy7d</Link>
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

      <main id="main" tabIndex={-1} className="page-width">
        <header id="intro" className="section-anchor grid gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16 lg:py-32">
          <div className="min-w-0 space-y-8">
            <p className="eyebrow">Portfolio / 2026</p>
            <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Malik<br /><span className="text-muted-foreground">Diyaolu</span>
            </h1>
            <div className="max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <p>Software engineer building useful systems from complex ideas. My next focus is <span className="text-foreground">embodied intelligence</span> research and <span className="text-foreground">Web3</span>: intelligence that acts in the physical world, and software that gives people more ownership.</p>
              <p>I build and explore ideas at <a href={lab.url} target="_blank" rel="noopener noreferrer" className="inline-link">{lab.name}</a>.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-600" />Available for work</span>
              <span>Lagos, Nigeria</span>
            </div>
            <a href="#projects" className="inline-flex items-center gap-2 text-sm inline-link">Explore my work<ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <aside aria-label="Current role and tools" className="min-w-0 space-y-8 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="space-y-3">
              <p className="eyebrow">Currently</p>
              <div className="space-y-1 text-sm leading-relaxed">
                <p>Software Engineer</p>
                <p className="text-muted-foreground">Crescent University</p>
                <p className="text-xs text-muted-foreground">Jun 2025 to Present</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Tools</p>
              <div className="flex flex-wrap gap-2">
                {["Python", "Generative AI", "Next.js", "Go", "Rust"].map((skill) => <span key={skill} className="tag">{skill}</span>)}
              </div>
            </div>
          </aside>
        </header>

        <section id="work" aria-labelledby="work-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="work-title" className="section-title">Experience</h2>
            <p className="eyebrow">2018 to present</p>
          </div>
          <div className="divide-y divide-border">
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="grid items-start gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8">
                <p className="text-sm leading-7 text-muted-foreground">{job.year}</p>
                <div className="min-w-0 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-snug sm:text-xl">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{job.period}</p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{job.description}</p>
                  <ul aria-label={`${job.company} technologies`} className="flex flex-wrap items-start gap-2">
                    {job.tech.map((tech) => <li key={tech} className="tag">{tech}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="projects-title" className="section-title">Selected Projects</h2>
            <a href={lab.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm inline-link">{lab.name}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <div className="space-y-6">
            {projects.map((project) => (
              <article key={project.title} className="grid gap-6 rounded-lg border border-border p-6 sm:p-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
                <div className="space-y-2">
                  <p className="eyebrow">{lab.name}</p>
                  <h3 className="text-2xl font-light">{project.title}</h3>
                </div>
                <div className="min-w-0 space-y-5">
                  {project.description && <p className="max-w-xl text-base leading-7 text-muted-foreground">{project.description}</p>}
                  {project.tech && <ul aria-label={`${project.title} technologies`} className="flex flex-wrap items-start gap-2">
                    {project.tech.map((tech) => <li key={tech} className="tag">{tech}</li>)}
                  </ul>}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm inline-link">Explore the lab<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="thoughts" aria-labelledby="thoughts-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="thoughts-title" className="section-title">Recent Thoughts</h2>
            <a href="https://thoughts.0xy7d.xyz/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm inline-link">All writing<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <RecentThoughts />
        </section>

        <section id="connect" aria-labelledby="connect-title" className="section-anchor section-space border-t border-border">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="min-w-0 space-y-6">
              <h2 id="connect-title" className="section-title">Let's Connect</h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Open to research and collaborations in embodied intelligence, Web3, and systems engineering.</p>
              <a href="mailto:holla@0xy7d.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base inline-link">holla@0xy7d.xyz<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Elsewhere</p>
              <ul className="divide-y divide-border">
                {[
                  { name: "GitHub", url: "https://github.com/0xy7d" },
                  { name: "LinkedIn", url: "https://linkedin.com/in/malikdiyaolu" },
                  { name: "Twitter", url: "https://x.com/0xy7d" },
                ].map((social) => <li key={social.name}><a href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3 text-sm hover:text-muted-foreground">{social.name}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></li>)}
              </ul>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-border py-8">
          <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>© 2026 Malik Diyaolu.</p>
            <p>Inspired by <a href="https://v0.app/@felixmacaspac" target="_blank" rel="noopener noreferrer" className="inline-link">@felixmacaspac</a></p>
          </div>
          <button onClick={toggleTheme} type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs hover:bg-muted">
            {isDark ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
            {isDark ? "Light" : "Dark"}
          </button>
        </footer>
      </main>
    </div>
  )
}
