"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(false) // changed default state of isDark to false for light theme by default
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }, // lower threshold to ensure visibility on smaller screens
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const setSectionRef =
  (index: number) =>
  (el: HTMLElement | null): void => {
    sectionsRef.current[index] = el
  }


  return (
    <div className="min-h-screen bg-background text-foreground relative font-mono">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "research", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={setSectionRef(0)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Malik
                  <br />
                  <span className="text-muted-foreground">Diyaolu</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Focused on building
                  <span className="text-foreground"> intelligent, scalable solutions</span> that bridge
                  <span className="text-foreground"> machine learning</span> and
                  <span className="text-foreground"> real-world applications</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Lagos, Nigeria</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">AI/ML Engineer</div>
                  <div className="text-muted-foreground">@ CreaCubed USA</div>
                  <div className="text-xs text-muted-foreground">May 2024 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Generative AI", "Next.js", "Go (Basic)", "Rust (Learning)"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={setSectionRef(1)}
          className="min-h-screen py-20 sm:py-32 opacity-0 transition-opacity duration-1000" // ensure transition is smooth
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono tracking-tighter">2018 — PRESENT</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2024",
                  role: "AI/ML Engineer",
                  company: "CreaCubed USA",
                  period: "May 2024 — Present",
                  description:
                    "Spearheaded development of AI-driven solutions and optimized AI trading system architectures. Designed and built comprehensive bot platforms handling full lifecycle from concept to deployment.",
                  tech: ["Generative AI", "Scalable Systems", "Bot Platforms"],
                },
                {
                  year: "2024",
                  role: "Product ML Engineer",
                  company: "HabitatHunt",
                  period: "Jan 2024 — Jan 2025",
                  description:
                    "Led AI-driven lead generation from social media using scraping algorithms and data management. Optimized lead generation with Redis, Next.js, Python, and APIFY.",
                  tech: ["Python", "Redis", "Next.js", "APIFY"],
                },
                {
                  year: "2023",
                  role: "Machine Learning Software Engineer",
                  company: "Pusheat",
                  period: "Aug 2023 — Nov 2023",
                  description:
                    "Developed food GPT MVP with RAG interface using Llama and GPT-3.5 for optimal user experience.",
                  tech: ["Langchain", "FastAPI", "Llama", "GPT-3.5"],
                },
                {
                  year: "2022",
                  role: "Full-Stack Software Engineer",
                  company: "Listwise",
                  period: "Mar 2022 — Nov 2022",
                  description:
                    "Redesigned website sections for improved UX and focused on AI integration for existing platforms.",
                  tech: ["React.js", "AI Integration", "UX Design"],
                },
                {
                  year: "2021",
                  role: "Software Engineer / ML Intern",
                  company: "Numbers NG",
                  period: "Feb 2021 — Sep 2021",
                  description:
                    "Improved frontend-backend API interaction and enhanced AI capabilities with NLTK. Achieved 18% performance increase in Vendor-Client matching service.",
                  tech: ["Python", "Django", "AWS", "NLTK"],
                },
                {
                  year: "2021",
                  role: "Software Engineer",
                  company: "TechieHealth Pharmacy",
                  period: "Apr 2021 — Aug 2021",
                  description:
                    "Developed Admin dashboard for pharmacy performance analysis. Optimized product management by 60% and streamlined stock-taking by 35%.",
                  tech: ["Inventory Systems", "Performance Analysis", "Bluetooth Printing"],
                },
                {
                  year: "2020",
                  role: "Full-Stack Developer",
                  company: "MicrobicPro",
                  period: "Apr 2020 — Jan 2021",
                  description:
                    "Developed responsive web application using React.js and Node.js. Integrated Twilio for promotional and transactional SMS.",
                  tech: ["React.js", "Node.js", "Twilio", "FTP"],
                },
                {
                  year: "2020",
                  role: "Backend Developer",
                  company: "Push Eat",
                  period: "Aug 2020 — Dec 2020",
                  description:
                    "Developed 100+ RESTful API endpoints. Implemented real-time vehicle tracking using AWS SQS, SNS, Redis, and Apache Kafka, reducing development time by 50%.",
                  tech: ["REST APIs", "AWS SQS", "Redis", "Apache Kafka"],
                },
                {
                  year: "2019",
                  role: "Co-Founder & Backend Engineer",
                  company: "Fashy",
                  period: "Aug 2019 — Feb 2021",
                  description:
                    "Built RESTful APIs for mobile app supporting dynamic data across multiple countries. Improved business workflows through messaging and notification services.",
                  tech: ["REST APIs", "Node.js", "Messaging Services"],
                },
                {
                  year: "2018",
                  role: "Software Engineer Intern",
                  company: "Petabyte Esports",
                  period: "May 2018 — Apr 2019",
                  description:
                    "Built foundational skills in Python, PHP, and JavaScript while developing customized WordPress website for interior design company.",
                  tech: ["WordPress", "Python", "PHP", "JavaScript"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                      {"period" in job && <div className="text-xs text-muted-foreground mt-1">{job.period}</div>}
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={setSectionRef(4)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Technical Projects</h2>

            <div className="grid lg:grid-cols-3 gap-0 border-l border-r border-border">
              {[
                {
                  title: "The Oxy7d",
                  description:
                    "An integrated platform housing my portfolio, user authentication system, and support infrastructure. Supporters gain complimentary access to hosted ML projects, creating a sustainable model for open-source development and community engagement.",
                },
                {
                  title: "Lumen",
                  description:
                    "Large language model research focused on low-resource African languages. Pre-trained architecture optimized for empathetic responses, addressing linguistic diversity gaps in current AI systems while preserving cultural nuances.",
                },
                {
                  title: "FLARE",
                  description:
                    "Federated Learning framework enabling collaborative model training across organizational boundaries. Participants train locally and share encrypted gradient updates instead of raw data, maintaining privacy while advancing collective intelligence.",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="p-8 border-b border-border lg:border-b-0 lg:border-r last:border-r-0 hover:bg-muted/30 transition-colors duration-500"
                >
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium tracking-wide uppercase">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section
          id="research"
          ref={setSectionRef(2)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Research & Papers</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Comparative Evaluation of ML and DL Models for Blood Glucose Prediction",
                  excerpt: "Evaluating models on the OhioT1DM Dataset with the HelioMediX Research Team.",
                  date: "In Review",
                  journal: "Computer Methods and Programs in Biomedicine",
                },
                {
                  title: "Enhancing the OhioT1DM Dataset for Predictive Modeling",
                  excerpt: "Exploratory analysis, feature engineering, and correlation insights for medical datasets.",
                  date: "In Review",
                  journal: "Academic Platform Journal of Engineering and Smart Systems",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.journal}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        <section
          id="thoughts"
          ref={setSectionRef(5)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>
            <div className="space-y-12">
              {[
                {
                  title: "The Future of Low-Resource LLMs",
                  excerpt: "Exploring how cultural nuance can be preserved in model architectures...",
                  date: "Dec 15, 2024",
                },
                {
                  title: "Privacy in Distributed Learning",
                  excerpt: "Why federated learning is the backbone of next-gen enterprise AI...",
                  date: "Nov 28, 2024",
                },
              ].map((thought, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-6 group-hover:border-foreground transition-colors duration-500">
                    <h3 className="text-xl sm:text-2xl font-light group-hover:pl-4 transition-all duration-500">
                      {thought.title}
                    </h3>
                    <span className="text-sm text-muted-foreground font-mono">{thought.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={setSectionRef(3)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Open to collaborations in AI/ML, Systems Programming, and scalable backend architecture.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:holla@0xy7d.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">holla@0xy7d.wtf</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "LinkedIn", handle: "malikdiyaolu", url: "https://linkedin.com/in/malikdiyaolu" },
                  { name: "GitHub", handle: "@0xy7d", url: "https://github.com/0xy7d" },
                  { name: "Twitter", handle: "@0xy7d", url: "https://x.com/0xy7d" },
                  { name: "Phone", handle: "+2348106629712", url: "tel:+2348106629712" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Malik Diyaolu. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev with inspirations from <Link key="source" href="https://v0.app/@felixmacaspac">@felixmacaspac</Link></div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
