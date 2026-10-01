export const lab = { name: "Klorion Labs", url: "https://klorion.com" }

export const experience = [
  {
    year: "2025",
    role: "Software Engineer",
    company: "Crescent University",
    period: "Jun 2025 to Present",
    description:
      "University operations platforms for student onboarding, registration, and human resources. Cross-platform peer-to-peer file transfer for low-latency environments.",
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    year: "2024",
    role: "AI/ML Engineer",
    company: "CreaCubed USA",
    period: "May 2024 to Jul 2026",
    description:
      "Web technologies for digital health systems and medical support agent harnesses. Neuro-symbolic knowledge extraction for refined LLM reasoning, real-time translation and transcription, and research into food classification and nutrient estimation.",
    tech: ["Python", "FastAPI", "PyTorch"],
  },
  {
    year: "2024",
    role: "Product ML Engineer",
    company: "HabitatHunt",
    period: "Jan 2024 to Aug 2026",
    description:
      "Lead generation for realtors.",
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    year: "2023",
    role: "Machine Learning Software Engineer",
    company: "Pusheat",
    period: "Aug 2023 to Nov 2023",
    description:
      "Retrieval-augmented conversational AI for food-related queries.",
    tech: ["Python", "FastAPI"],
  },
  {
    year: "2022",
    role: "Full-Stack Software Engineer",
    company: "Listwise",
    period: "Mar 2022 to Nov 2022",
    description:
      "Web platforms with clearer user experiences and integrated AI capabilities.",
    tech: ["React", "TypeScript"],
  },
  {
    year: "2021",
    role: "Software Engineer / ML Intern",
    company: "Numbers NG",
    period: "Feb 2021 to Sep 2021",
    description:
      "Vendor-client matching and language-aware services, with an 18% performance improvement in matching.",
    tech: ["Python", "Django"],
  },
  {
    year: "2021",
    role: "Software Engineer",
    company: "TechieHealth Pharmacy",
    period: "Apr 2021 to Aug 2021",
    description:
      "Pharmacy operations and performance analytics, improving product management by 60% and streamlining stock-taking by 35%.",
    tech: ["React", "TypeScript"],
  },
  {
    year: "2020",
    role: "Full-Stack Developer",
    company: "MicrobicPro",
    period: "Apr 2020 to Jan 2021",
    description:
      "Responsive web experiences with integrated customer messaging.",
    tech: ["React", "Node.js", "JavaScript"],
  },
  {
    year: "2020",
    role: "Backend Developer",
    company: "Push Eat",
    period: "Aug 2020 to Dec 2020",
    description:
      "Real-time vehicle tracking and 100+ API endpoints, reducing development time by 50%.",
    tech: ["Node.js", "JavaScript"],
  },
  {
    year: "2019",
    role: "Co-Founder & Backend Engineer",
    company: "Fashy",
    period: "Aug 2019 to Feb 2021",
    description:
      "Multi-country mobile services with messaging and notifications that streamlined business workflows.",
    tech: ["Node.js", "JavaScript"],
  },
  {
    year: "2018",
    role: "Software Engineer Intern",
    company: "Petabyte Esports",
    period: "May 2018 to Apr 2019",
    description:
      "Custom web experiences for an interior design business.",
    tech: ["Python", "JavaScript"],
  },
] as const

type Project = {
  title: string
  status?: string
  headline?: string
  description?: string
  tech?: readonly string[]
  url: string
}

export const projects: readonly Project[] = [
  {
    title: "Optics",
    description: "Identity verification with document intelligence and real-time liveness detection.",
    tech: ["Computer Vision", "Document Intelligence", "Real-Time Systems"],
    url: lab.url,
  },
  {
    title: "Mira",
    status: "In preview",
    headline: "Understanding before answering.",
    description:
      "Exploring smaller, more decisive language models through fast context classification and generative reasoning. The first context is Vuu: deciding when to respond, ask for more context, or defer to deeper reasoning. Architecture research is ongoing, with pretraining from scratch under consideration.",
    tech: ["Context Models", "Decision Models", "Generative Reasoning"],
    url: lab.url,
  },
]
