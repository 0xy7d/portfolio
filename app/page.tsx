import { ArrowDown, ArrowUpRight } from "lucide-react"
import { RecentThoughts } from "@/components/recent-thoughts"
import { Listening } from "@/components/listening"
import { Guestbook } from "@/components/guestbook"
import { Avatar } from "@/components/avatar"
import { SiteNav } from "@/components/site-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { earlierExperience, experience, lab, projects, site, socials, tools } from "@/lib/portfolio"

const external = { target: "_blank", rel: "noopener noreferrer" } as const
const current = experience[0]
const [firstName, ...lastNames] = site.name.split(" ")

function Interests() {
  return site.interests.map((interest, index) => (
    <span key={interest}>
      {index > 0 && (index === site.interests.length - 1 ? ", and " : ", ")}
      <span className="text-foreground">{interest}</span>
    </span>
  ))
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteNav brand={site.handle} />

      <main id="main" tabIndex={-1} className="page-width">
        <header id="intro" className="section-anchor grid gap-12 pt-10 pb-20 sm:pt-14 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16 lg:py-32">
          <div className="min-w-0 space-y-8">
            <p className="eyebrow">Portfolio / 2026</p>
            <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {firstName}<br /><span className="text-muted-foreground">{lastNames.join(" ")}</span>
            </h1>
            <div className="max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <p>{site.summary}</p>
              <p>My research interests span <Interests />. I build and explore ideas at <a href={lab.url} {...external} className="inline-link">{lab.name}</a>.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-600" />Available for work</span>
              <span>{site.location}</span>
            </div>
            <a href="#projects" className="inline-flex items-center gap-2 text-sm inline-link">Explore my work<ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <div className="contents lg:block lg:min-w-0 lg:space-y-8 lg:border-l lg:border-border lg:pl-8">
            <div className="order-first lg:order-none"><Avatar /></div>
            <aside aria-label="Current role, tools and music" className="min-w-0 space-y-8 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
              <div className="space-y-3">
                <p className="eyebrow">Currently</p>
                <div className="space-y-1 text-sm leading-relaxed">
                  <p>{current.role}</p>
                  <p className="text-muted-foreground">{current.company}</p>
                  <p className="text-xs text-muted-foreground">{current.period}</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="eyebrow">Tools</p>
                <ul aria-label="Tools" className="flex flex-wrap gap-2">
                  {tools.map((tool) => <li key={tool} className="tag">{tool}</li>)}
                </ul>
              </div>
              <Listening />
            </aside>
          </div>
        </header>

        <section id="work" aria-labelledby="work-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="work-title" className="section-title">Experience</h2>
            <p className="eyebrow">2018 to present</p>
          </div>
          <div className="divide-y divide-border">
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="grid items-start gap-3 py-8 first:pt-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                <p className="text-xs leading-7 text-muted-foreground">{job.period}</p>
                <div className="min-w-0 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-snug sm:text-xl">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <ul className="max-w-2xl list-disc space-y-2 pl-4 text-sm leading-7 text-muted-foreground marker:text-border sm:text-base">
                    {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <ul aria-label={`${job.company} technologies`} className="flex flex-wrap items-start gap-2">
                    {job.tech.map((tech) => <li key={tech} className="tag">{tech}</li>)}
                  </ul>
                </div>
              </article>
            ))}
            <div className="grid items-start gap-3 pt-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
              <h3 className="eyebrow leading-7">Earlier</h3>
              <ul aria-label="Earlier roles" className="min-w-0 divide-y divide-border">
                {earlierExperience.map((job) => (
                  <li key={`${job.company}-${job.role}`} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
                    <div className="min-w-0 text-sm leading-6">
                      <p>{job.role}<span className="text-muted-foreground">, {job.company}</span></p>
                      {"note" in job && <p className="text-muted-foreground">{job.note}</p>}
                    </div>
                    <p className="text-xs leading-6 text-muted-foreground">{job.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="projects-title" className="section-title">Selected Projects</h2>
            <a href={lab.url} {...external} className="inline-flex items-center gap-2 text-sm inline-link">{lab.name}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <div className="space-y-6">
            {projects.map((project) => (
              <article key={project.title} className="grid gap-6 rounded-lg border border-border p-6 sm:p-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
                <div className="space-y-2">
                  <p className="eyebrow">{lab.name}</p>
                  <h3 className="text-2xl font-light">{project.title}</h3>
                  {project.status && <p className="text-xs text-muted-foreground">{project.status}</p>}
                </div>
                <div className="min-w-0 space-y-5">
                  {project.headline && <p className="text-lg leading-snug">{project.headline}</p>}
                  {project.description && <p className="max-w-xl text-base leading-7 text-muted-foreground">{project.description}</p>}
                  {project.tech && <ul aria-label={`${project.title} technologies`} className="flex flex-wrap items-start gap-2">
                    {project.tech.map((tech) => <li key={tech} className="tag">{tech}</li>)}
                  </ul>}
                  <a href={project.url} {...external} className="inline-flex items-center gap-2 text-sm inline-link">{project.title} at {lab.name}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="thoughts" aria-labelledby="thoughts-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="thoughts-title" className="section-title">Recent Thoughts</h2>
            <a href="https://thoughts.0xy7d.xyz/" {...external} className="inline-flex items-center gap-2 text-sm inline-link">All writing<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <RecentThoughts />
        </section>

        <section id="guestbook" aria-labelledby="guestbook-title" className="section-anchor section-space border-t border-border">
          <div className="section-heading">
            <h2 id="guestbook-title" className="section-title">Guestbook</h2>
            <p className="eyebrow">You were here</p>
          </div>
          <Guestbook />
        </section>

        <section id="connect" aria-labelledby="connect-title" className="section-anchor section-space border-t border-border">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="min-w-0 space-y-6">
              <h2 id="connect-title" className="section-title">Let&apos;s Connect</h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Open to engineering roles on ML systems, and to research and collaborations in <Interests />.</p>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-base inline-link">{site.email}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Elsewhere</p>
              <ul className="divide-y divide-border">
                {socials.map((social) => <li key={social.name}><a href={social.url} {...external} className="group flex items-center justify-between py-3 text-sm hover:text-muted-foreground">{social.name}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></li>)}
              </ul>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-end justify-between gap-6 border-t border-border py-8">
          <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>© 2026 {site.name}.</p>
            <p>Static Next.js on Cloudflare&apos;s edge, with Pages Functions, D1, and Three.js. <a href={site.source} {...external} className="inline-link">Source</a></p>
            <p>Inspired by <a href="https://v0.app/@felixmacaspac" {...external} className="inline-link">@felixmacaspac</a></p>
          </div>
          <ThemeToggle />
        </footer>
      </main>
    </div>
  )
}
