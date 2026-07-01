# Portfolio Light Redesign — Design Spec
**Date:** 2026-03-27
**Aesthetic:** Modern SaaS / Professional (Vercel/Stripe-style)

---

## Goals

- Convert dark theme to light using shadcn CSS variable theming
- No hardcoded colors anywhere — all values via semantic Tailwind/shadcn tokens
- Install and fully utilize shadcn components: `button`, `card`, `badge`, `separator`
- Add sticky navigation bar (currently missing)
- Significant visual improvement across all sections

---

## Color System

All colors defined via CSS variables in `src/index.css` using shadcn's light theme defaults:

| Token | Usage |
|---|---|
| `bg-background` | Page background (white) |
| `text-foreground` | Primary text (dark slate) |
| `bg-card` | Card backgrounds |
| `text-card-foreground` | Card text |
| `bg-muted` | Alternating section backgrounds (slate-50) |
| `text-muted-foreground` | Secondary/helper text |
| `text-primary` / `bg-primary` | Blue accent — CTAs, highlights |
| `border` | All borders |
| `bg-primary-foreground` | Text on primary buttons |

**Rule:** Zero hardcoded color classes (no `bg-white`, `text-slate-*`, `text-blue-*`, etc.). Every color goes through a semantic token.

---

## Architecture

Single-page React app (unchanged). Component files modified in-place. New nav component added.

```
src/
├── components/
│   ├── Nav.tsx          ← NEW: sticky top nav
│   ├── Hero.tsx         ← redesigned
│   ├── About.tsx        ← redesigned
│   ├── Skills.tsx       ← redesigned
│   ├── Projects.tsx     ← redesigned
│   ├── Carousel.tsx     ← light-themed updates
│   └── Contact.tsx      ← redesigned
├── index.css            ← CSS variables updated to light theme
└── App.tsx              ← add <Nav /> above sections
```

---

## shadcn Components

Install via CLI before implementation:
- `button` — CTAs, nav links, contact links
- `card` — stat blocks, skill pairs, project wrappers
- `badge` — tags on About, Skills, Projects
- `separator` — section dividers where needed

---

## Section Designs

### Nav (new)
- Sticky, `bg-background/80 backdrop-blur-sm border-b border-border`
- Left: brand name in `text-foreground font-semibold`
- Right: smooth-scroll anchor links using `Button variant="ghost"` — About, Projects, Contact
- Max-width container, horizontal padding consistent with other sections

### Hero
- Centered layout (`text-center`)
- Remove dark grid overlay
- Large bold name: `text-foreground` with tight leading
- Subtitle: `text-muted-foreground`
- Two CTAs: `Button` (default — primary fill) + `Button variant="outline"`
- Generous vertical padding (`py-32`)
- Keep typewriter effect on the subtitle/title

### About
- `bg-muted` section background
- Narrative text: `text-muted-foreground`
- Stat items wrapped in shadcn `Card` with `text-card-foreground`
- Use `Badge` for the 4 descriptor tags: Full-Stack, AI Automation, etc.
- 2-col grid on desktop, single col mobile

### Skills
- `bg-background` section
- Each problem/solution pair: shadcn `Card`
- Card hover: `hover:shadow-md transition-shadow`
- Problem label: `text-muted-foreground text-sm`
- Solution heading: `text-foreground font-semibold`
- 2-col grid on desktop

### Projects
- Alternating `bg-muted` / `bg-background` per project
- Project title + description in `text-foreground` / `text-muted-foreground`
- Project tags: `Badge variant="secondary"`
- Carousel wrapped in shadcn `Card`
- "View Live" link: `Button variant="outline" size="sm"`
- AICS workflow table: clean `border border-border` table, `bg-card` rows

### Carousel
- Chevron nav buttons: `Button variant="ghost" size="icon"`
- Active dot: `bg-primary`, inactive: `bg-muted-foreground/30`
- Caption: `text-card-foreground` on `bg-card/80 backdrop-blur-sm`

### Contact
- `bg-muted` section
- Centered layout
- Heading: `text-foreground`
- Email + phone: `Button variant="outline"` with Lucide icons
- Footer text: `text-muted-foreground text-sm`

---

## CSS Variables (index.css)

> **Tailwind v4 note:** This project uses Tailwind v4 (`^4.2.2`). Custom semantic tokens must be declared in a `@theme` block (not `tailwind.config.js`). CSS variables are set in `:root` and mapped into Tailwind utilities via `@theme inline` so classes like `bg-background`, `text-foreground` etc. work correctly.

Replace current dark `:root` with shadcn light theme values:

```css
@import "tailwindcss";

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
```

---

## Content Changes (Projects Section)

### AICS Screenshots
Some current AICS slides show an **n8n production checklist popover** that blocks the view. These slides need to be replaced with clean screenshots.
- **Before screenshotting:** collapse the n8n sidebar for a clean, unobstructed view
- User to drop replacement files into `src/assets/screenshots/` using the same filenames
- Implementation will use the files as-is — no code changes needed for screenshot swaps

### Palaba Slides
- Remove `palaba-payroll.png` slide — user referred to it as "employee" screenshot. No file named `palaba-employee.png` exists; `palaba-payroll.png` is the employee/payroll data screen and is the one to drop.
- Remaining Palaba slides: dashboard, sales, portal, equipment, inventory (5 total)

### AICS — Add "View Live" Link
- Add a `Button variant="outline" size="sm"` link to `https://aics.figliounicotech.online`
- Description context: this is the live n8n workflow powering the customer chat, integrated with Palaba sales order numbers
- Display alongside the existing AICS section header (same pattern as Palaba's "View Live →")

---

## Constraints

- No routing changes — keep single-page anchor scroll
- Keep all existing content (text, images, links) exactly as-is unless noted above
- Keep typewriter effect in Hero
- Keep carousel auto-advance behavior
- Keep all existing section IDs for smooth scroll

---

## Success Criteria

- All sections render correctly on light background
- Zero hardcoded color values in any component
- shadcn `button`, `card`, `badge`, `separator` all in use
- Nav bar present and sticky
- Consistent spacing and typography hierarchy
- Passes visual inspection: looks like a professional SaaS portfolio
