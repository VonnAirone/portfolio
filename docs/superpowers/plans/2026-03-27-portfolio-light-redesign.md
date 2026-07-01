# Portfolio Light Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from dark to light using shadcn theming — zero hardcoded colors, full shadcn component usage, new nav bar, and content fixes (screenshot replacement, slide removal, AICS live link).

**Architecture:** Single-page React SPA with Vite + Tailwind v4. All colors go through shadcn CSS variables mapped to Tailwind utilities via `@theme inline`. shadcn `ui/` components created manually (button, card, badge, separator). Nav component added. All existing components rewritten in-place.

**Tech Stack:** React 18, Tailwind v4 (`@tailwindcss/vite`), shadcn (manual component creation), Lucide React, Playwright (for n8n screenshots)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/index.css` | Modify | Light theme CSS variables + `@theme inline` Tailwind v4 mapping |
| `src/components/ui/button.tsx` | Create | shadcn Button component |
| `src/components/ui/card.tsx` | Create | shadcn Card component |
| `src/components/ui/badge.tsx` | Create | shadcn Badge component |
| `src/components/ui/separator.tsx` | Create | shadcn Separator component |
| `src/components/Nav.tsx` | Create | Sticky top navigation bar |
| `src/App.tsx` | Modify | Add `<Nav />` above sections |
| `src/components/Hero.tsx` | Modify | Light redesign, shadcn Button, remove grid overlay |
| `src/components/About.tsx` | Modify | shadcn Card + Badge for stats |
| `src/components/Skills.tsx` | Modify | shadcn Card for skill pairs |
| `src/components/Projects.tsx` | Modify | shadcn Card/Badge, remove payroll slide, add AICS link |
| `src/components/Carousel.tsx` | Modify | Light-themed nav buttons, semantic dot colors |
| `src/components/Contact.tsx` | Modify | shadcn Button for email/phone links |
| `src/assets/screenshots/*.png` | Replace | Clean n8n screenshots (Playwright task) |

---

## Task 1: Update CSS variables and Tailwind v4 @theme block

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace index.css with light theme variables and @theme inline block**

```css
@import "tailwindcss";

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Inter', system-ui, sans-serif;
}
```

- [ ] **Step 2: Start dev server and verify page renders**

```bash
cd /projects/portfolio && npm run dev
```

Open browser at `http://localhost:5173` — page should now render with a white background. It will look broken/mixed until all components are updated — that's expected.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/index.css
git commit -m "style: add light theme CSS variables and Tailwind v4 @theme inline mapping"
```

---

## Task 2: Create shadcn UI components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/separator.tsx`

- [ ] **Step 1: Create `src/components/ui/button.tsx`**

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-border bg-background hover:bg-muted hover:text-foreground',
        ghost: 'hover:bg-muted hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

- [ ] **Step 2: Create `src/components/ui/card.tsx`**

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

- [ ] **Step 3: Create `src/components/ui/badge.tsx`**

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'text-foreground border-border',
        muted: 'border-transparent bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
```

- [ ] **Step 4: Create `src/components/ui/separator.tsx`**

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
))
Separator.displayName = 'Separator'

export { Separator }
```

- [ ] **Step 5: Commit**

```bash
cd /projects/portfolio
git add src/components/ui/
git commit -m "feat: add shadcn ui components (button, card, badge, separator)"
```

---

## Task 3: Create Nav component and wire into App

**Files:**
- Create: `src/components/Nav.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
// src/components/Nav.tsx
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-foreground">
          Figliounico
        </span>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Button key={href} variant="ghost" size="sm" asChild>
              <a href={href}>{label}</a>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Update `src/App.tsx` to include Nav**

```tsx
// src/App.tsx
import './index.css'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Nav.tsx src/App.tsx
git commit -m "feat: add sticky Nav component and wire into App"
```

---

## Task 4: Redesign Hero

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

```tsx
// src/components/Hero.tsx
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

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
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-14"
    >
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          Andrei Mar M. Dava
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-mono min-h-[2rem] mb-10">
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <a href="#projects">View My Work</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser** — Hero should show white background, dark name text, muted typewriter subtitle, blue primary button + outline button. No grid overlay.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Hero.tsx
git commit -m "style: redesign Hero — light theme, shadcn Buttons, remove grid overlay"
```

---

## Task 5: Redesign About

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Rewrite About.tsx**

```tsx
// src/components/About.tsx
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const STATS = [
  'Full-Stack Engineer',
  'AI Automation Specialist',
  'Clean Architecture',
  'Deployed & Running',
]

export function About() {
  return (
    <section id="about" className="bg-muted py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6">About</p>
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
        <Separator className="my-8" />
        <div className="flex flex-wrap gap-3">
          {STATS.map(s => (
            <Badge key={s} variant="secondary">{s}</Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser** — About section should have muted background, badges using secondary variant.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/About.tsx
git commit -m "style: redesign About — light muted section, shadcn Badge + Separator"
```

---

## Task 6: Redesign Skills

**Files:**
- Modify: `src/components/Skills.tsx`

- [ ] **Step 1: Rewrite Skills.tsx**

```tsx
// src/components/Skills.tsx
import { Card, CardContent } from '@/components/ui/card'

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
    <section id="skills" className="bg-background py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-12">What I Do</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map(({ problem, solution }) => (
            <Card key={problem} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="font-mono text-sm text-primary mb-3 leading-snug">{problem}</p>
                <p className="text-muted-foreground leading-relaxed">{solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser** — 4 cards on white background, problem text in primary blue, hover shadow works.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Skills.tsx
git commit -m "style: redesign Skills — shadcn Card grid, primary color for problem labels"
```

---

## Task 7: Redesign Projects

**Files:**
- Modify: `src/components/Projects.tsx`

- [ ] **Step 1: Rewrite Projects.tsx** (removes palaba-payroll slide, adds AICS "View Live" link)

```tsx
// src/components/Projects.tsx
import { Carousel, type CarouselSlide } from '@/components/Carousel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import palabaDashboard from '@/assets/screenshots/palaba-dashboard.png'
import palabaSales from '@/assets/screenshots/palaba-sales.png'
import palabaPortal from '@/assets/screenshots/palaba-portal.png'
import palabaEquipment from '@/assets/screenshots/palaba-equipment.png'
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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-12">Projects</p>

        <div className="space-y-24">
          {/* Palaba */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-foreground">Palaba</h3>
                <Badge variant="secondary">Live</Badge>
              </div>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                An all-in-one laundry management platform for Philippine businesses — orders,
                inventory, customer portal, and real-time equipment tracking. Built for
                full-service and self-service operations.
              </p>
              <Button asChild variant="outline" size="sm">
                <a href="https://palaba.figliounicotech.online" target="_blank" rel="noopener noreferrer">
                  View Live →
                </a>
              </Button>
            </div>
            <Carousel slides={PALABA_SLIDES} />
          </div>

          {/* AICS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2 italic">
                "What if your AI never sleeps, never forgets to follow up, and tells you how it's doing every Monday?"
              </p>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-foreground">AICS</h3>
                <Badge variant="secondary">Live</Badge>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                AI-powered customer support system — fully automated, self-maintaining, and always reporting back.
                Powered by n8n workflows integrated with Palaba sales order numbers.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Fully Automated', 'Always On', 'Self-Reporting'].map(tag => (
                  <Badge key={tag} variant="muted">{tag}</Badge>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="mb-6">
                <a href="https://aics.figliounicotech.online" target="_blank" rel="noopener noreferrer">
                  View Live →
                </a>
              </Button>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">What happens</th>
                      <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">How it works</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AICS_WORKFLOWS.map(({ what, how }) => (
                      <tr key={what} className="border-b border-border last:border-0 hover:bg-muted/50">
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
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser** — Palaba has 5 slides (no payroll), AICS has "View Live" link to aics.figliounicotech.online, badges render correctly.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Projects.tsx
git commit -m "feat: redesign Projects — remove payroll slide, add AICS live link, shadcn Badge/Button"
```

---

## Task 8: Redesign Carousel

**Files:**
- Modify: `src/components/Carousel.tsx`

- [ ] **Step 1: Rewrite Carousel.tsx with semantic token colors**

```tsx
// src/components/Carousel.tsx
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card group shadow-sm">
      <div className="relative aspect-video">
        <img
          src={slides[current].src}
          alt={slides[current].caption}
          className="w-full h-full object-cover object-top transition-opacity duration-500"
        />
        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
          <p className="text-sm text-white font-medium">{slides[current].caption}</p>
        </div>
      </div>

      {/* Prev/Next */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background shadow-sm h-8 w-8"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background shadow-sm h-8 w-8"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
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

- [ ] **Step 2: Verify in browser** — Carousel chevrons use ghost Button, card has shadow, dots visible over caption.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Carousel.tsx
git commit -m "style: redesign Carousel — shadcn Button for nav, semantic card colors"
```

---

## Task 9: Redesign Contact

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

```tsx
// src/components/Contact.tsx
import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Contact() {
  return (
    <section id="contact" className="bg-muted py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6">Contact</p>
        <h3 className="text-4xl font-bold text-foreground mb-4">Let's build something.</h3>
        <p className="text-muted-foreground text-lg mb-10">
          Have a project in mind or want to see what's possible? Reach out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <a href="mailto:davaxdev@gmail.com">
              <Mail size={16} />
              davaxdev@gmail.com
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="tel:+639914826323">
              <Phone size={16} />
              +63 991 482 6323
            </a>
          </Button>
        </div>
        <Separator className="mt-20 mb-8" />
        <p className="text-xs text-muted-foreground font-mono">
          © 2026 Figliounico · Built by Andrei Mar M. Dava
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser** — Contact section has muted background, outline buttons with icons, footer text visible.

- [ ] **Step 3: Commit**

```bash
cd /projects/portfolio
git add src/components/Contact.tsx
git commit -m "style: redesign Contact — shadcn Button/Separator, muted section background"
```

---

## Task 10: Replace n8n screenshots using Playwright

**Files:**
- Modify: `src/assets/screenshots/aics-*.png`

**Goal:** Take clean screenshots of AICS n8n workflows with sidebar collapsed, replacing any slides that show the n8n production checklist popover.

- [ ] **Step 1: Get n8n credentials**

Ask the user for:
1. n8n instance URL (e.g. `https://n8n.figliounicotech.online`)
2. Email and password for the n8n account

- [ ] **Step 2: Write screenshot script at `scripts/screenshot-n8n.ts`**

```ts
// scripts/screenshot-n8n.ts
import { chromium } from 'playwright'
import path from 'path'

const N8N_URL = process.env.N8N_URL!
const N8N_EMAIL = process.env.N8N_EMAIL!
const N8N_PASSWORD = process.env.N8N_PASSWORD!

const SCREENSHOTS_DIR = path.resolve('src/assets/screenshots')

// Map of output filename → workflow name (partial match on n8n workflow list)
const WORKFLOWS: { file: string; name: string }[] = [
  { file: 'aics-chat.png', name: 'chat' },
  { file: 'aics-escalation.png', name: 'escalation' },
  { file: 'aics-feedback.png', name: 'feedback' },
  { file: 'aics-cleaner.png', name: 'cleaner' },
  { file: 'aics-analytics.png', name: 'analytics' },
]

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  // Login
  await page.goto(`${N8N_URL}/signin`)
  await page.fill('[data-test-id="email"]', N8N_EMAIL)
  await page.fill('[data-test-id="password"]', N8N_PASSWORD)
  await page.click('[data-test-id="submit-button"]')
  await page.waitForURL(`${N8N_URL}/workflows`)

  // Go to workflows list and screenshot each
  for (const { file, name } of WORKFLOWS) {
    // Find workflow by name
    await page.goto(`${N8N_URL}/workflows`)
    await page.waitForSelector('[data-test-id="workflow-card"]')

    const card = page.locator('[data-test-id="workflow-card"]', { hasText: new RegExp(name, 'i') }).first()
    await card.click()
    await page.waitForSelector('.workflow-canvas', { timeout: 10000 }).catch(() => {
      // fallback selector if workflow-canvas not found
    })
    await page.waitForTimeout(1500)

    // Collapse sidebar if open
    const sidebarToggle = page.locator('[data-test-id="sidebar-collapse-button"]')
    if (await sidebarToggle.isVisible()) {
      await sidebarToggle.click()
      await page.waitForTimeout(300)
    }

    // Dismiss any popover/modal (production checklist)
    const dismissBtn = page.locator('button:has-text("Got it"), button:has-text("Dismiss"), button:has-text("Close")').first()
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click()
      await page.waitForTimeout(300)
    }

    await page.screenshot({ path: `${SCREENSHOTS_DIR}/${file}`, fullPage: false })
    console.log(`✓ ${file}`)
  }

  await browser.close()
}

run().catch(console.error)
```

- [ ] **Step 3: Run the script**

```bash
cd /projects/portfolio
N8N_URL=https://YOUR_N8N_URL N8N_EMAIL=your@email.com N8N_PASSWORD=yourpassword \
  npx tsx scripts/screenshot-n8n.ts
```

Expected output:
```
✓ aics-chat.png
✓ aics-escalation.png
✓ aics-feedback.png
✓ aics-cleaner.png
✓ aics-analytics.png
```

- [ ] **Step 4: Verify screenshots look correct** — open each PNG in `src/assets/screenshots/`, confirm no production checklist popover, sidebar is collapsed.

- [ ] **Step 5: Commit**

```bash
cd /projects/portfolio
git add src/assets/screenshots/aics-*.png scripts/screenshot-n8n.ts
git commit -m "chore: replace AICS n8n screenshots (sidebar collapsed, no popover)"
```

---

## Task 11: Final build verification

- [ ] **Step 1: Run TypeScript check + build**

```bash
cd /projects/portfolio && npm run build
```

Expected: No TypeScript errors. Build output in `dist/`.

- [ ] **Step 2: Preview production build**

```bash
cd /projects/portfolio && npm run preview
```

Open `http://localhost:4173` — verify:
- White background throughout
- Nav bar sticky at top
- Hero: name bold, typewriter effect, two buttons
- About: muted section, badges
- Skills: 4 cards with hover shadow
- Projects: Palaba 5 slides (no payroll), AICS "View Live" link present
- Contact: muted section, outline buttons
- Zero dark elements visible

- [ ] **Step 3: Final commit**

```bash
cd /projects/portfolio
git add -A
git commit -m "feat: complete light theme redesign — shadcn components, nav, content fixes"
```
