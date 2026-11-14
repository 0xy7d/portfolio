import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { research, site } from "@/lib/portfolio"

export const metadata: Metadata = {
  title: `Research & Publications | ${site.name}`,
  description: "Research in adaptive learning systems, evolutionary reinforcement learning, self-evolving language models, and embodied intelligence.",
  alternates: { canonical: "/research" },
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <nav aria-label="Research navigation" className="page-width flex items-center justify-between gap-6 py-4">
          <a href="/" className="text-sm tracking-wide">{site.handle}</a>
          <div className="flex items-center gap-4 text-xs sm:gap-6 sm:text-sm">
            <a href="/" className="text-muted-foreground transition-colors hover:text-foreground">Portfolio</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="page-width">
        <header className="section-space max-w-3xl">
          <a href="/" className="mb-10 inline-flex items-center gap-2 text-sm inline-link"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to portfolio</a>
          <p className="eyebrow">Research / 2026</p>
          <h1 className="mt-5 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl">Research &amp; Publications</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">A working record of research projects, academic work, and manuscripts as they develop.</p>
        </header>

        <section aria-labelledby="research-list-title" className="section-space border-t border-border">
          <h2 id="research-list-title" className="sr-only">Research list</h2>
          <div className="divide-y divide-border">
            {research.map((item) => (
              <article key={item.slug} className="grid items-start gap-6 py-10 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10">
                <div className="space-y-1">
                  <p className="eyebrow">{item.status}</p>
                  <p className="text-xs leading-6 text-muted-foreground">{item.year}</p>
                </div>
                <div className="min-w-0 space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light leading-snug sm:text-3xl"><a href={`/research/${item.slug}`} className="inline-link">{item.title}</a></h3>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <ul aria-label={`${item.title} research areas`} className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
                    </ul>
                    <a href={`/research/${item.slug}`} className="inline-flex items-center gap-2 text-sm inline-link">Read entry<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="page-width flex flex-wrap items-end justify-between gap-6 border-t border-border py-8">
        <p className="text-xs text-muted-foreground">© 2026 {site.name}.</p>
        <a href={site.source} target="_blank" rel="noopener noreferrer" className="text-xs inline-link">Source</a>
      </footer>
    </div>
  )
}
