export interface Project {
  /** Two-digit ordinal shown as a watermark on the card, e.g. "01". */
  n: string;
  title: string;
  /** The input side of the input → process → output triptych. */
  inp: string;
  /** The processing step. */
  proc: string;
  /** The output side. */
  outp: string;
  note: string;
  tags: string[];
  /** Two comma-separated hex colours used for the card's gradient thumbnail. */
  grad: [from: string, to: string];
  /**
   * Optional path/URL to a thumbnail image (e.g. "/thumbnails/aics.png" from
   * public/). Shown on the card preview and as the modal poster. When absent,
   * the gradient is used as the thumbnail.
   */
  thumb?: string;
  /**
   * Optional path/URL to a short demo video (e.g. "/demos/aics.mp4" from
   * public/, or an imported asset). When absent, the modal shows a
   * "Demo coming soon" state instead of a player.
   */
  demo?: string;
}

export interface SkillGroup {
  num: string;
  title: string;
  /** CSS colour (custom-property reference) for the group's accent dot. */
  dot: string;
  items: string[];
}

export const PROJECTS: Project[] = [
  {
    n: "01",
    title: "AI Clinic Receptionist Chatbot",
    inp: "Patient inquiry",
    proc: "n8n + LLM agent",
    outp: "Answer + logged booking",
    note: "Persona-locked agent — books appointments and answers questions, never gives medical advice.",
    tags: ["n8n", "LLM", "Booking"],
    grad: ["#2A2BF7", "#B9A3FF"],
    thumb: "/thumbnails/clinic-receptionist.jpg",
  },
  {
    n: "02",
    title: "YouTube Channel Discovery",
    inp: "Keyword",
    proc: "Search & dedupe",
    outp: "Tracked channels",
    note: "90% lower API quota through smart batching; new channels land straight in Google Sheets.",
    tags: ["Search API", "Sheets", "Batching"],
    grad: ["#C8FF3A", "#2A2BF7"],
    thumb: "/thumbnails/youtube-automation.jpg",
  },
  {
    n: "03",
    title: "Automated UGC Video Generator",
    inp: "Product listing",
    proc: "Script · imagery · render",
    outp: "Finished UGC video",
    note: "DALL·E 3 + GPT-4 Vision write and shoot; async Sora renders stitch the final cut.",
    tags: ["DALL·E 3", "GPT-4V", "Sora"],
    grad: ["#FF5A34", "#B9A3FF"],
    thumb: "/thumbnails/ugc-generator.jpg",
  },
  {
    n: "04",
    title: "RAG Chatbot for Business",
    inp: "Customer question",
    proc: "Vector search + Claude",
    outp: "Grounded answer",
    note: "Supabase pgvector retrieval keeps every reply anchored to real docs — no hallucinations.",
    tags: ["RAG", "pgvector", "Claude"],
    grad: ["#2A2BF7", "#C8FF3A"],
    thumb: "/thumbnails/rag-chatbot.jpg",
  },
  {
    n: "05",
    title: "AI Inbox: Triage & Draft",
    inp: "Incoming email",
    proc: "Classify · draft · schedule",
    outp: "Triaged inbox + reply",
    note: "Runs every minute, fully unattended — sorts mail and stages a ready-to-send draft.",
    tags: ["Classify", "Draft", "Cron"],
    grad: ["#B9A3FF", "#FF5A34"],
    thumb: "/thumbnails/ai-inbox-triage.jpg",
  },
  {
    n: "06",
    title: "Pabakal — Food Delivery App",
    inp: "Customer order",
    proc: "Match & route",
    outp: "Courier delivers",
    note: "Three-sided marketplace for customers, vendors and couriers. React Native Expo · Supabase.",
    tags: ["React Native", "Supabase", "Marketplace"],
    grad: ["#FF5A34", "#2A2BF7"],
    thumb: "/thumbnails/pabakal.jpg",
  },
  {
    n: "07",
    title: "Ready Read! — Pronunciation App",
    inp: "Spoken word",
    proc: "Groq Whisper scoring",
    outp: "Word-level feedback",
    note: "Real-time, word-level pronunciation scoring so learners hear exactly what to fix.",
    tags: ["Whisper", "Realtime", "Supabase"],
    grad: ["#C8FF3A", "#FF5A34"],
    thumb: "/thumbnails/ready-read.jpg",
  },
  {
    n: "08",
    title: "Health MIS UI Design",
    inp: "User flows",
    proc: "Wireframes",
    outp: "Hi-fi prototype",
    note: "Flows to a clickable, hi-fi prototype on one coherent design system. Built in Figma.",
    thumb: "/thumbnails/hris.jpg",
    tags: ["Figma", "Design System", "Prototype"],
    grad: ["#2A2BF7", "#FF5A34"],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    num: "01",
    title: "Automation & AI",
    dot: "var(--blue)",
    items: [
      "n8n",
      "Webhooks",
      "REST APIs",
      "OpenAI",
      "GPT-4 Vision",
      "DALL·E 3",
      "Sora API",
      "Claude",
      "Claude Code",
      "Postman",
    ],
  },
  {
    num: "02",
    title: "Frontend",
    dot: "var(--coral)",
    items: ["React", "React Native", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    num: "03",
    title: "Backend & Data",
    dot: "var(--lime)",
    items: ["Node.js", "Supabase", "PostgreSQL", "PHP", "MySQL", "Vercel"],
  },
  {
    num: "04",
    title: "Design",
    dot: "var(--lilac)",
    items: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Design Systems",
    ],
  },
];

export const RESUME_HREF = "/Resume-Villasor-Airone-Vonn.pdf";
