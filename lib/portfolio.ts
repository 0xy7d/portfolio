export const lab = { name: "Klorion Labs", url: "https://klorion.com" }

export const site = {
  name: "Maleek Diyaolu",
  handle: "0xy7d",
  url: "https://0xy7d.xyz",
  email: "holla@0xy7d.xyz",
  source: "https://github.com/0xy7d/portfolio",
  location: "Lagos, Nigeria",
  summary: "Software Engineer",
  interests: ["embodied intelligence", "cybersecurity", "Web3"],
}

export const socials = [
  { name: "GitHub", url: "https://github.com/0xy7d" },
  { name: "LinkedIn", url: "https://linkedin.com/in/malikdiyaolu" },
  { name: "Twitter", url: "https://x.com/0xy7d" },
] as const

export const tools = ["Python", "PyTorch", "FastAPI", "TypeScript", "Next.js"] as const

export const experience = [
  {
    role: "Software Engineer",
    company: "Crescent University",
    period: "Jun 2025 to Present",
    highlights: [
      "Built the operations platforms behind student onboarding, registration, and human resources.",
      "Built cross-platform peer-to-peer file transfer for low-latency environments.",
    ],
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    role: "AI/ML Engineer",
    company: "CreaCubed USA",
    period: "May 2024 to Jul 2026",
    highlights: [
      "Built web systems for digital health and the agent harnesses behind medical support assistants.",
      "Applied neuro-symbolic knowledge extraction to refine LLM reasoning.",
      "Shipped real-time translation and transcription, and researched food classification and nutrient estimation.",
    ],
    tech: ["Python", "FastAPI", "PyTorch"],
  },
  {
    role: "Product ML Engineer",
    company: "HabitatHunt",
    period: "Jan 2024 to Aug 2026",
    highlights: ["Built ML-driven lead generation for realtors, from models to the product around them."],
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    role: "Machine Learning Software Engineer",
    company: "Pusheat",
    period: "Aug 2023 to Nov 2023",
    highlights: ["Built retrieval-augmented conversational AI for food-related queries."],
    tech: ["Python", "FastAPI"],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Listwise",
    period: "Mar 2022 to Nov 2022",
    highlights: ["Built web platforms with integrated AI capabilities and clearer user experiences."],
    tech: ["React", "TypeScript"],
  },
] as const

export const earlierExperience = [
  { role: "Software Engineer / ML Intern", company: "Numbers NG", period: "2021", note: "Improved vendor-client matching by 18%." },
  { role: "Software Engineer", company: "TechieHealth Pharmacy", period: "2021", note: "Improved product management by 60% and stock-taking by 35%." },
  { role: "Backend Developer", company: "Pusheat", period: "2020", note: "Real-time vehicle tracking and 100+ API endpoints, halving development time." },
  { role: "Full-Stack Developer", company: "MicrobicPro", period: "2020 to 2021" },
  { role: "Co-Founder & Backend Engineer", company: "Fashy", period: "2019 to 2021", note: "Multi-country mobile services with messaging and notifications." },
  { role: "Software Engineer Intern", company: "Petabyte Esports", period: "2018 to 2019" },
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
    headline: "Is this person real, and are they who the document says?",
    description: "Identity verification that pairs document intelligence with real-time liveness detection, so the document and the person presenting it are checked together.",
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
