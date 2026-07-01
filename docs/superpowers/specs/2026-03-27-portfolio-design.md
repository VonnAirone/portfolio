# Portfolio Site Design Spec
**Date:** 2026-03-27
**Project:** figliounicotech.online — Developer Portfolio
**Owner:** Andrei Mar M. Dava

---

## Overview

A single-page scrolling portfolio deployed at `figliounicotech.online`. Targets both potential clients and employers/recruiters. Tone: clean, minimal, professional — dark background, subtle animations, code-like aesthetic. Built with React + Vite + Tailwind + shadcn/ui.

---

## Architecture

- **Type:** Single-page application (SPA), React + Vite
- **Styling:** Tailwind CSS v4 + shadcn/ui primitives
- **Deployment:** Dockerized, served via nginx reverse proxy at `figliounicotech.online` with Let's Encrypt SSL
- **Screenshots:** Captured via Playwright headless browser (Palaba + n8n), stored as static assets
- **No backend required** — static contact info only, no form submission

---

## Sections

### 1. Hero
- Top-left: `FIGLIOUNICO` brand mark in small caps
- Center: Name `Andrei Mar M. Dava` + title `Senior Software Engineer | AI Automation & Claude AI Specialist`
- Subtle animated grid/code background
- Typewriter effect on title line
- Two CTAs: `View My Work` (smooth scroll → Projects) · `Get In Touch` (smooth scroll → Contact)

### 2. About
- Bio:
  > I don't just write code — I build systems that solve real problems. Whether it's a multi-role SaaS platform managing an entire laundry business or an AI support pipeline that handles customer conversations, escalates intelligently, and reports weekly analytics — I see it through from architecture to deployment.
  >
  > I work at the intersection of serious software engineering and practical AI. Clean code, production-ready infrastructure, and automation that actually earns its place in your stack.
  >
  > Based in the Philippines. Available for projects that matter.
- Stat row: `Full-Stack Engineer · AI Automation Specialist · Clean Architecture · Deployed & Running`

### 3. Skills (Problem-First Cards)
Four cards, each framed as a problem solved — non-tech-friendly language:

1. **"I need a web app that runs my entire business"**
   > I build custom platforms where your team can manage operations, track everything, and work from one place — built around how your business actually runs.

2. **"I need AI that works for me, not the other way around"**
   > I build AI systems that handle repetitive work, respond to people, make decisions, and keep you informed — so you focus on what actually needs you.

3. **"I need it live on the internet, not just a demo"**
   > I handle the full deployment — servers, security, domains, SSL. You get a real URL that works.

4. **"I need something I can actually trust long-term"**
   > I build with structure so the system doesn't break when your business grows or changes. It's made to last.

### 4. Projects

Two project cards, each with a screenshot carousel (manual arrows + auto-advance), hook caption, one-liner description, and workflow summary table for AICS. Designed to extend — adding a project = adding a card.

#### Card 1 — Palaba
- **One-liner:** An all-in-one laundry management platform for Philippine businesses — orders, inventory, payroll, customer portal, and real-time equipment tracking.
- **Live link:** palaba.figliounicotech.online
- **Carousel (6 slides):**
  | Slide | Caption |
  |---|---|
  | Staff dashboard | "Everything your team needs — one screen, one login" |
  | Sales orders view | "From drop-off to delivery, every order tracked in real time" |
  | Customer portal | "Customers check their own orders, no phone calls needed" |
  | Equipment board | "Live view of every machine — what's running, what's free" |
  | Payroll screen | "Philippine payroll with statutory deductions, handled automatically" |
  | Inventory view | "Stock levels, supplies, purchasing — nothing falls through the cracks" |

#### Card 2 — AICS
- **Hook caption:** "What if your AI never sleeps, never forgets to follow up, and tells you how it's doing every Monday?"
- **One-liner:** AI-powered customer support system — fully automated, self-maintaining, and always reporting back.
- **Tags:** `Fully Automated · Always On · Self-Reporting`
- **Carousel (5 slides):**
  | Slide | Caption |
  |---|---|
  | Advanced AICS Chat workflow | "The brain — receives, thinks, replies, or escalates" |
  | Escalation Notifier workflow | "Never miss a frustrated customer again" |
  | Feedback Collection workflow | "Bad rating? A ticket is already open before you know it" |
  | Stale Session Cleaner workflow | "Cleans up on its own, every 6 hours, no reminders needed" |
  | Weekly Analytics workflow | "Monday morning report — delivered while you were still asleep" |
- **Workflow summary table:**
  | What happens | How it works |
  |---|---|
  | A customer sends a message | AI reads it, understands the context, and replies instantly |
  | The customer seems frustrated | System automatically flags it and alerts a real person |
  | Customer leaves a bad rating | A support ticket is created without anyone lifting a finger |
  | Conversations go cold | System quietly closes them every 6 hours on its own |
  | Monday morning arrives | You get a clean report — how many chats, how they went, what people felt |

### 5. Contact
- Heading: `Let's build something.`
- Subtext: `Have a project in mind or want to see what's possible? Reach out.`
- Email: davaxdev@gmail.com
- Phone: +63 991 482 6323
- Footer: `© 2026 Figliounico · Built by Andrei Mar M. Dava`

---

## Screenshot Plan

Screenshots captured via Playwright before build, saved as static assets in `src/assets/screenshots/`.

**Palaba** (requires login — credentials from env):
- `/` → staff dashboard
- `/sales` → sales orders
- `/portal` → customer portal
- `/equipment` → equipment board
- `/hr/payroll` → payroll screen
- `/inventory` → inventory view

**AICS / n8n** (requires n8n login):
- Advanced AICS Chat workflow canvas
- Escalation Notifier workflow canvas
- Feedback Collection workflow canvas
- Stale Session Cleaner workflow canvas
- Weekly Analytics workflow canvas

---

## Deployment

- Dockerized React + Vite SPA, served via nginx
- Registered under existing nginx reverse proxy at `figliounicotech.online`
- SSL via Let's Encrypt (already configured on VPS)
- Port assigned from VPS port pool (next available after 5300)
