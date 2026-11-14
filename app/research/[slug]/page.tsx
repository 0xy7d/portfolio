import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { research, site } from "@/lib/portfolio"

type ResearchDetailProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return research.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ResearchDetailProps): Promise<Metadata> {
  const { slug } = await params
  const item = research.find((entry) => entry.slug === slug)
  if (!item) return {}
  return {
    title: `${item.title} | ${site.name}`,
    description: item.description,
    alternates: { canonical: `/research/${item.slug}` },
  }
}

export default async function ResearchDetailPage({ params }: ResearchDetailProps) {
  const { slug } = await params
  const item = research.find((entry) => entry.slug === slug)
  if (!item) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <nav aria-label="Research navigation" className="page-width flex items-center justify-between gap-6 py-4">
          <a href="/" className="text-sm tracking-wide">{site.handle}</a>
          <div className="flex items-center gap-4 text-xs sm:gap-6 sm:text-sm">
            <a href="/research" className="text-muted-foreground transition-colors hover:text-foreground">Research index</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="page-width">
        <article className="section-space max-w-3xl">
          <a href="/research" className="mb-10 inline-flex items-center gap-2 text-sm inline-link"><ArrowLeft aria-hidden="true" className="h-4 w-4" />All research</a>
          <div className="space-y-5">
            <p className="eyebrow">{item.status} / {item.year}</p>
            <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-6xl">{item.title}</h1>
            <p className="text-sm text-muted-foreground">{item.type}</p>
          </div>
          <div className="mt-12 space-y-8 border-t border-border pt-8">
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{item.description}</p>
            <ul aria-label="Research areas" className="flex flex-wrap gap-2">
              {item.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
            </ul>
            <div className="space-y-3 border-t border-border pt-8 text-sm leading-7 text-muted-foreground">
              <p>This entry describes work in progress. Publication details will be added when a manuscript, preprint, or accepted paper is available.</p>
              <a href="mailto:holla@0xy7d.xyz" className="inline-flex items-center gap-2 inline-link">Contact about this work<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
