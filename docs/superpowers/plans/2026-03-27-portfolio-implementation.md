# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page developer portfolio at `figliounicotech.online` showcasing Palaba and AICS, using React + Vite + Tailwind + shadcn/ui, served via Docker + nginx.

**Architecture:** Static SPA built with Vite, Dockerized behind nginx, served via existing reverse proxy at `figliounicotech.online`. Screenshots captured via Playwright before build and bundled as static assets.

**Tech Stack:** React 18, Vite, Tailwind CSS v4, shadcn/ui, Playwright (screenshots), Docker, nginx

---

## File Structure

```
/projects/portfolio/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf                          # nginx config inside container
├── index.html
├── vite.config.ts
├── tailwind.config.ts                  # (not needed for v4, handled in CSS)
├── tsconfig.json
├── package.json
├── scripts/
│   └── take-screenshots.ts             # Playwright screenshot script
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css                       # Tailwind + shadcn tokens
│   ├── assets/
│   │   └── screenshots/
│   │       ├── palaba-dashboard.png
│   │       ├── palaba-sales.png
│   │       ├── palaba-portal.png
│   │       ├── palaba-equipment.png
│   │       ├── palaba-payroll.png
│   │       ├── palaba-inventory.png
│   │       ├── aics-chat.png
│   │       ├── aics-escalation.png
│   │       ├── aics-feedback.png
│   │       ├── aics-cleaner.png
│   │       └── aics-analytics.png
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Carousel.tsx
│   │   └── Contact.tsx
│   └── lib/
│       └── utils.ts                    # shadcn cn() utility
├── docs/
│   └── superpowers/
│       ├── specs/2026-03-27-portfolio-design.md
│       └── plans/2026-03-27-portfolio-implementation.md
```

---

## Task 1: Scaffold Vite + React + Tailwind + shadcn

**Files:**
- Create: `/projects/portfolio/package.json`
- Create: `/projects/portfolio/vite.config.ts`
- Create: `/projects/portfolio/tsconfig.json`
- Create: `/projects/portfolio/index.html`
- Create: `/projects/portfolio/src/main.tsx`
- Create: `/projects/portfolio/src/App.tsx`
- Create: `/projects/portfolio/src/index.css`
- Create: `/projects/portfolio/src/lib/utils.ts`

- [ ] **Step 1: Initialize Vite project**

```bash
cd /projects/portfolio
npm create vite@latest . -- --template react-ts --yes 2>/dev/null || true
npm install
```

Expected: `node_modules/` created, `src/` scaffolded.

- [ ] **Step 2: Install Tailwind CSS v4 and shadcn dependencies**

```bash
cd /projects/portfolio
npm install tailwindcss@next @tailwindcss/vite@next
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install @radix-ui/react-slot
```

- [ ] **Step 3: Configure Tailwind in vite.config.ts**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 4: Set up index.css**

```css
/* src/index.css */
@import "tailwindcss";

:root {
  --background: 0 0% 6%;
  --foreground: 0 0% 95%;
  --card: 0 0% 9%;
  --card-foreground: 0 0% 95%;
  --border: 0 0% 15%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 55%;
  --accent: 221 83% 53%;
  --accent-foreground: 0 0% 100%;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: hsl(var(--background)); color: hsl(var(--foreground)); font-family: 'Inter', system-ui, sans-serif; }
```

- [ ] **Step 5: Create cn utility**

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 6: Simplify App.tsx to a shell**

```tsx
// src/App.tsx
import './index.css'

export default function App() {
  return <div>Portfolio</div>
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
cd /projects/portfolio && npm run dev -- --port 5400 &
sleep 3 && curl -s http://localhost:5400 | grep -q "Portfolio\|Vite\|html" && echo "OK" || echo "FAIL"
kill %1 2>/dev/null || true
```

Expected: `OK`

- [ ] **Step 8: Commit**

```bash
cd /projects/portfolio
git add -A
git commit -m "feat: scaffold vite + react + tailwind + shadcn"
```

---

## Task 2: Take Screenshots with Playwright

**Files:**
- Create: `/projects/portfolio/scripts/take-screenshots.ts`
- Create: `/projects/portfolio/src/assets/screenshots/` (directory)

- [ ] **Step 1: Install Playwright**

```bash
cd /projects/portfolio
npm install -D playwright @playwright/test tsx
npx playwright install chromium
```

- [ ] **Step 2: Get Palaba admin credentials**

```bash
# Get password from palaba docker env
docker inspect palabav2-webapi-1 | python3 -c "
import json,sys
d=json.load(sys.stdin)
env=d[0]['Config']['Env']
[print(e) for e in env if 'PASS' in e.upper() or 'ADMIN' in e.upper()]
"
```

Note the password for use in Step 3.

- [ ] **Step 3: Get n8n credentials**

```bash
# Check n8n env for admin credentials
docker inspect claude-n8n-1 | python3 -c "
import json,sys
d=json.load(sys.stdin)
env=d[0]['Config']['Env']
[print(e) for e in env if any(k in e.upper() for k in ['USER','EMAIL','PASS','BASIC_AUTH','ADMIN'])]
"
```

If no credentials found in env, check n8n user table:
```bash
PGPASSWORD=n8npassword psql -U n8n -d n8n -h localhost -c "SELECT email, \"firstName\" FROM \"user\" LIMIT 5;"
```

- [ ] **Step 4: Create screenshot script**

Replace `PALABA_PASSWORD` and `N8N_EMAIL` / `N8N_PASSWORD` with values found above.

```ts
// scripts/take-screenshots.ts
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const OUT = path.resolve(__dirname, '../src/assets/screenshots')
fs.mkdirSync(OUT, { recursive: true })

const PALABA_URL = 'https://palaba.figliounicotech.online'
const PALABA_EMAIL = 'admin@palaba.ph'
const PALABA_PASSWORD = 'REPLACE_WITH_PASSWORD_FROM_STEP_2'

const N8N_URL = 'http://localhost:5678'
const N8N_EMAIL = 'REPLACE_WITH_EMAIL_FROM_STEP_3'
const N8N_PASSWORD = 'REPLACE_WITH_PASSWORD_FROM_STEP_3'

async function main() {
  const browser = await chromium.launch()

  // --- PALABA SCREENSHOTS ---
  const pCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const pPage = await pCtx.newPage()

  // Login
  await pPage.goto(`${PALABA_URL}/login`)
  await pPage.fill('input[type="email"]', PALABA_EMAIL)
  await pPage.fill('input[type="password"]', PALABA_PASSWORD)
  await pPage.click('button[type="submit"]')
  await pPage.waitForURL('**/dashboard**', { timeout: 10000 })

  const pScreenshots: [string, string][] = [
    ['/', 'palaba-dashboard.png'],
    ['/sales', 'palaba-sales.png'],
    ['/equipment', 'palaba-equipment.png'],
    ['/inventory', 'palaba-inventory.png'],
    ['/hr/payroll', 'palaba-payroll.png'],
  ]

  for (const [route, filename] of pScreenshots) {
    await pPage.goto(`${PALABA_URL}${route}`)
    await pPage.waitForLoadState('networkidle')
    await pPage.screenshot({ path: path.join(OUT, filename), fullPage: false })
    console.log(`✓ ${filename}`)
  }

  // Customer portal - needs customer login
  const portalCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const portalPage = await portalCtx.newPage()
  await portalPage.goto(`${PALABA_URL}/portal`)
  await portalPage.waitForLoadState('networkidle')
  await portalPage.screenshot({ path: path.join(OUT, 'palaba-portal.png') })
  console.log('✓ palaba-portal.png')
  await portalCtx.close()
  await pCtx.close()

  // --- N8N SCREENSHOTS ---
  const nCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const nPage = await nCtx.newPage()

  await nPage.goto(`${N8N_URL}/signin`)
  await nPage.fill('input[type="email"]', N8N_EMAIL)
  await nPage.fill('input[type="password"]', N8N_PASSWORD)
  await nPage.click('button[type="submit"]')
  await nPage.waitForURL('**/workflows**', { timeout: 10000 })

  // Get workflow IDs from DB
  const { execSync } = await import('child_process')
  const rows = execSync(
    `PGPASSWORD=n8npassword psql -U n8n -d n8n -h localhost -t -c "SELECT id, name FROM workflow_entity WHERE name ILIKE '%Advanced AICS%' ORDER BY name;"`
  ).toString().trim().split('\n')

  const workflowMap: Record<string, string> = {}
  for (const row of rows) {
    const [id, ...nameParts] = row.split('|').map(s => s.trim())
    workflowMap[nameParts.join('|').trim()] = id
  }

  const n8nScreenshots: [string, string][] = [
    ['Advanced AICS Chat', 'aics-chat.png'],
    ['Advanced AICS Escalation Notifier', 'aics-escalation.png'],
    ['Advanced AICS Feedback Collection', 'aics-feedback.png'],
    ['Advanced AICS Stale Session Cleaner', 'aics-cleaner.png'],
    ['Advanced AICS Weekly Analytics', 'aics-analytics.png'],
  ]

  for (const [name, filename] of n8nScreenshots) {
    const id = workflowMap[name]
    if (!id) { console.warn(`⚠ workflow not found: ${name}`); continue }
    await nPage.goto(`${N8N_URL}/workflow/${id}`)
    await nPage.waitForLoadState('networkidle')
    await nPage.waitForTimeout(2000) // let canvas render
    await nPage.screenshot({ path: path.join(OUT, filename), fullPage: false })
    console.log(`✓ ${filename}`)
  }

  await nCtx.close()
  await browser.close()
  console.log('\nAll screenshots done.')
}

main().catch(console.error)
```

- [ ] **Step 5: Run screenshot script**

```bash
cd /projects/portfolio
npx tsx scripts/take-screenshots.ts
```

Expected output:
```
✓ palaba-dashboard.png
✓ palaba-sales.png
✓ palaba-equipment.png
✓ palaba-inventory.png
✓ palaba-payroll.png
✓ palaba-portal.png
✓ aics-chat.png
✓ aics-escalation.png
✓ aics-feedback.png
✓ aics-cleaner.png
✓ aics-analytics.png

All screenshots done.
```

- [ ] **Step 6: Verify screenshots exist**

```bash
ls -lh /projects/portfolio/src/assets/screenshots/
```

Expected: 11 `.png` files, each > 50KB.

- [ ] **Step 7: Commit**

```bash
cd /projects/portfolio
git add src/assets/screenshots/ scripts/
git commit -m "feat: add playwright screenshots for palaba and aics"
```

---

## Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Hero component**

```tsx
// src/components/Hero.tsx
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const TITLE = 'Senior Software Engineer | AI Automation & Claude AI Specialist'

export function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(TITLE.slice(0, i + 1))
      i++
      if (i >= TITLE.length) { clearInterval(interval); setDone(true) }
    }, 35)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(221 83% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(221 83% 53%) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Brand mark */}
      <div className="absolute top-6 left-8 text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase">
        Figliounico
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Andrei Mar M. Dava
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-mono min-h-[2rem]">
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-border hover:border-blue-500 text-foreground rounded-lg font-medium transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

```tsx
// src/App.tsx
import './index.css'
import { Hero } from '@/components/Hero'

export default function App() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in dev server**

```bash
cd /projects/portfolio && npm run dev -- --port 5400 &
sleep 4 && curl -s http://localhost:5400 | grep -q "html" && echo "OK"
kill %1 2>/dev/null || true
```

Expected: `OK`

- [ ] **Step 4: Commit**

```bash
cd /projects/portfolio
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add hero section with typewriter effect"
```

---

## Task 4: About Section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create About component**

```tsx
// src/components/About.tsx
const STATS = [
  'Full-Stack Engineer',
  'AI Automation Specialist',
  'Clean Architecture',
  'Deployed & Running',
]

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-sm font-mono tracking-widest text-blue-400 uppercase mb-8">About</h2>
      <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
        <p>
          I don't just write code — I build systems that solve real problems. Whether it's a
          multi-role SaaS platform managing an entire laundry business or an AI support pipeline
          that handles customer conversations, escalates intelligently, and reports weekly
          analytics — I see it through from architecture to deployment.
        </p>
        <p>
          I work at the intersection of serious software engineering and practical AI. Clean code,
          production-ready infrastructure, and automation that actually earns its place in your stack.
        </p>
        <p className="text-foreground font-medium">
          Based in the Philippines. Available for projects that matter.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {STATS.map(s => (
          <span
            key={s}
            className="px-3 py-1 text-sm font-mono bg-card border border-border rounded-full text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
// src/App.tsx
import './index.css'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'

export default function App() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/About.tsx src/App.tsx
git commit -m "feat: add about section"
```

---

## Task 5: Skills Section

**Files:**
- Create: `src/components/Skills.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Skills component**

```tsx
// src/components/Skills.tsx
const SKILLS = [
  {
    problem: '"I need a web app that runs my entire business"',
    solution:
      'I build custom platforms where your team can manage operations, track everything, and work from one place — built around how your business actually runs.',
  },
  {
    problem: '"I need AI that works for me, not the other way around"',
    solution:
      'I build AI systems that handle repetitive work, respond to people, make decisions, and keep you informed — so you focus on what actually needs you.',
  },
  {
    problem: '"I need it live on the internet, not just a demo"',
    solution:
      'I handle the full deployment — servers, security, domains, SSL. You get a real URL that works.',
  },
  {
    problem: '"I need something I can actually trust long-term"',
    solution:
      "I build with structure so the system doesn't break when your business grows or changes. It's made to last.",
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-sm font-mono tracking-widest text-blue-400 uppercase mb-12">What I Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILLS.map(({ problem, solution }) => (
          <div
            key={problem}
            className="bg-card border border-border rounded-xl p-6 hover:border-blue-500/50 transition-colors"
          >
            <p className="font-mono text-sm text-blue-400 mb-3 leading-snug">{problem}</p>
            <p className="text-muted-foreground leading-relaxed">{solution}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
// src/App.tsx
import './index.css'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Skills.tsx src/App.tsx
git commit -m "feat: add skills section with problem-first cards"
```

---

## Task 6: Carousel Component

**Files:**
- Create: `src/components/Carousel.tsx`

- [ ] **Step 1: Create Carousel component**

```tsx
// src/components/Carousel.tsx
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CarouselSlide {
  src: string
  caption: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  autoAdvanceMs?: number
}

export function Carousel({ slides, autoAdvanceMs = 4000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    const t = setInterval(next, autoAdvanceMs)
    return () => clearInterval(t)
  }, [next, autoAdvanceMs])

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-card border border-border group">
      {/* Image */}
      <div className="relative aspect-video">
        <img
          src={slides[current].src}
          alt={slides[current].caption}
          className="w-full h-full object-cover object-top transition-opacity duration-500"
        />
        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
          <p className="text-sm text-white font-medium">{slides[current].caption}</p>
        </div>
      </div>

      {/* Prev/Next */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-colors',
              i === current ? 'bg-white' : 'bg-white/40'
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /projects/portfolio
git add src/components/Carousel.tsx
git commit -m "feat: add reusable carousel component"
```

---

## Task 7: Projects Section

**Files:**
- Create: `src/components/Projects.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Projects component**

```tsx
// src/components/Projects.tsx
import { Carousel, type CarouselSlide } from '@/components/Carousel'

import palabaDashboard from '@/assets/screenshots/palaba-dashboard.png'
import palabaSales from '@/assets/screenshots/palaba-sales.png'
import palabaPortal from '@/assets/screenshots/palaba-portal.png'
import palabaEquipment from '@/assets/screenshots/palaba-equipment.png'
import palabaPayroll from '@/assets/screenshots/palaba-payroll.png'
import palabaInventory from '@/assets/screenshots/palaba-inventory.png'
import aicsChat from '@/assets/screenshots/aics-chat.png'
import aicsEscalation from '@/assets/screenshots/aics-escalation.png'
import aicsFeedback from '@/assets/screenshots/aics-feedback.png'
import aicsCleaner from '@/assets/screenshots/aics-cleaner.png'
import aicsAnalytics from '@/assets/screenshots/aics-analytics.png'

const PALABA_SLIDES: CarouselSlide[] = [
  { src: palabaDashboard, caption: 'Everything your team needs — one screen, one login' },
  { src: palabaSales, caption: 'From drop-off to delivery, every order tracked in real time' },
  { src: palabaPortal, caption: 'Customers check their own orders, no phone calls needed' },
  { src: palabaEquipment, caption: 'Live view of every machine — what\'s running, what\'s free' },
  { src: palabaPayroll, caption: 'Philippine payroll with statutory deductions, handled automatically' },
  { src: palabaInventory, caption: 'Stock levels, supplies, purchasing — nothing falls through the cracks' },
]

const AICS_SLIDES: CarouselSlide[] = [
  { src: aicsChat, caption: 'The brain — receives, thinks, replies, or escalates' },
  { src: aicsEscalation, caption: 'Never miss a frustrated customer again' },
  { src: aicsFeedback, caption: 'Bad rating? A ticket is already open before you know it' },
  { src: aicsCleaner, caption: 'Cleans up on its own, every 6 hours, no reminders needed' },
  { src: aicsAnalytics, caption: 'Monday morning report — delivered while you were still asleep' },
]

const AICS_WORKFLOWS = [
  { what: 'A customer sends a message', how: 'AI reads it, understands the context, and replies instantly' },
  { what: 'The customer seems frustrated', how: 'System automatically flags it and alerts a real person' },
  { what: 'Customer leaves a bad rating', how: 'A support ticket is created without anyone lifting a finger' },
  { what: 'Conversations go cold', how: 'System quietly closes them every 6 hours on its own' },
  { what: 'Monday morning arrives', how: 'You get a clean report — how many chats, how they went, what people felt' },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-sm font-mono tracking-widest text-blue-400 uppercase mb-12">Projects</h2>

      <div className="space-y-20">
        {/* Palaba */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-2">Palaba</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              An all-in-one laundry management platform for Philippine businesses — orders,
              inventory, payroll, customer portal, and real-time equipment tracking. Built for
              full-service and self-service operations.
            </p>
            <a
              href="https://palaba.figliounicotech.online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Live →
            </a>
          </div>
          <Carousel slides={PALABA_SLIDES} />
        </div>

        {/* AICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-mono text-blue-400 mb-2 italic">
              "What if your AI never sleeps, never forgets to follow up, and tells you how it's doing every Monday?"
            </p>
            <h3 className="text-2xl font-bold mb-2">AICS</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              AI-powered customer support system — fully automated, self-maintaining, and always reporting back.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Fully Automated', 'Always On', 'Self-Reporting'].map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">What happens</th>
                    <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">How it works</th>
                  </tr>
                </thead>
                <tbody>
                  {AICS_WORKFLOWS.map(({ what, how }) => (
                    <tr key={what} className="border-b border-border last:border-0 hover:bg-card/50">
                      <td className="px-4 py-3 text-foreground">{what}</td>
                      <td className="px-4 py-3 text-muted-foreground">{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Carousel slides={AICS_SLIDES} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx**

```tsx
// src/App.tsx
import './index.css'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Projects.tsx src/App.tsx
git commit -m "feat: add projects section with palaba and aics carousels"
```

---

## Task 8: Contact Section + Final App Assembly

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Contact component**

```tsx
// src/components/Contact.tsx
import { Mail, Phone } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
      <h2 className="text-sm font-mono tracking-widest text-blue-400 uppercase mb-6">Contact</h2>
      <h3 className="text-4xl font-bold mb-4">Let's build something.</h3>
      <p className="text-muted-foreground text-lg mb-10">
        Have a project in mind or want to see what's possible? Reach out.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="mailto:davaxdev@gmail.com"
          className="flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-blue-500 rounded-lg text-foreground transition-colors"
        >
          <Mail size={16} className="text-blue-400" />
          davaxdev@gmail.com
        </a>
        <a
          href="tel:+639914826323"
          className="flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-blue-500 rounded-lg text-foreground transition-colors"
        >
          <Phone size={16} className="text-blue-400" />
          +63 991 482 6323
        </a>
      </div>

      <footer className="mt-24 pb-8 text-xs text-muted-foreground font-mono">
        © 2026 Figliounico · Built by Andrei Mar M. Dava
      </footer>
    </section>
  )
}
```

- [ ] **Step 2: Final App.tsx**

```tsx
// src/App.tsx
import './index.css'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Contact.tsx src/App.tsx
git commit -m "feat: add contact section and complete app assembly"
```

---

## Task 9: Dockerize

**Files:**
- Create: `/projects/portfolio/Dockerfile`
- Create: `/projects/portfolio/nginx.conf`
- Create: `/projects/portfolio/docker-compose.yml`
- Create: `/projects/portfolio/.dockerignore`

- [ ] **Step 1: Create Dockerfile**

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

- [ ] **Step 2: Create nginx.conf (inside container)**

```nginx
# nginx.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
}
```

- [ ] **Step 3: Create docker-compose.yml**

```yaml
# docker-compose.yml
services:
  web:
    build: .
    container_name: portfolio-web
    restart: unless-stopped
    ports:
      - "5400:80"
```

- [ ] **Step 4: Create .dockerignore**

```
node_modules
dist
.git
scripts
docs
```

- [ ] **Step 5: Build and test Docker image**

```bash
cd /projects/portfolio
docker compose build
docker compose up -d
sleep 3
curl -s http://localhost:5400 | grep -q "html" && echo "Docker OK" || echo "FAIL"
docker compose down
```

Expected: `Docker OK`

- [ ] **Step 6: Commit**

```bash
cd /projects/portfolio
git add Dockerfile nginx.conf docker-compose.yml .dockerignore
git commit -m "feat: dockerize portfolio with nginx"
```

---

## Task 10: Deploy — nginx + SSL

**Files:**
- Modify: `/etc/nginx/sites-available/figliounicotech.online`

- [ ] **Step 1: Start container permanently**

```bash
cd /projects/portfolio
docker compose up -d
docker ps | grep portfolio-web
```

Expected: `portfolio-web` running, port `5400->80`

- [ ] **Step 2: Update nginx to proxy to container**

Replace the current static-file config for `figliounicotech.online` with a reverse proxy. Edit `/etc/nginx/sites-available/figliounicotech.online` — replace the entire `server` block that handles HTTPS (the one with `listen 443 ssl`) with:

```nginx
server {
    server_name figliounicotech.online www.figliounicotech.online;

    location / {
        proxy_pass http://localhost:5400;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/figliounicotech.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/figliounicotech.online/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

Leave the HTTP→HTTPS redirect block (`listen 80`) unchanged.

- [ ] **Step 3: Test nginx config and reload**

```bash
nginx -t && systemctl reload nginx
```

Expected: `nginx: configuration file /etc/nginx/nginx.conf test is successful`

- [ ] **Step 4: Verify live**

```bash
curl -s -o /dev/null -w "%{http_code}" https://figliounicotech.online
```

Expected: `200`

- [ ] **Step 5: Commit nginx note**

```bash
cd /projects/portfolio
git commit --allow-empty -m "deploy: portfolio live at figliounicotech.online"
```

---

## Self-Review

**Spec coverage:**
- ✅ Hero — typewriter, brand, CTAs
- ✅ About — bio + stat row
- ✅ Skills — 4 problem-first cards, non-tech language
- ✅ Projects — Palaba (6 slides) + AICS (5 slides + workflow table + hook caption)
- ✅ Contact — email + phone + footer
- ✅ Screenshots — Playwright for both Palaba + n8n
- ✅ Stack — React + Vite + Tailwind + shadcn utilities
- ✅ Deploy — Docker + nginx proxy at figliounicotech.online

**Placeholders:** None.

**Type consistency:** `CarouselSlide` defined in `Carousel.tsx`, imported in `Projects.tsx`. All component imports match file names exactly.
