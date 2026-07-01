import type { CSSProperties, ReactNode } from "react";

interface TimelineItem {
  period: string;
  title: ReactNode;
  detail: ReactNode;
  color: string;
}

const EXPERIENCE: TimelineItem[] = [
  {
    period: "2024 — present",
    title: "Freelance — AI Automation & Full-Stack",
    detail: "Agents, pipelines, and apps for clients end-to-end.",
    color: "var(--coral)",
  },
  {
    period: "2025 — 2026",
    title: "Enfinity Limited · fintech",
    detail: "UI/UX Designer & Design Analyst.",
    color: "var(--blue)",
  },
  {
    period: "2024",
    title: "Mulave Studios",
    detail: "UI/UX + WordPress intern.",
    color: "var(--lilac)",
  },
];

const EDUCATION: TimelineItem[] = [
  {
    period: "2024 — present",
    title: "Master in IT · WVSU",
    detail: "West Visayas State University — candidate.",
    color: "var(--ink)",
  },
  {
    period: "Undergraduate",
    title: "BS Information Technology",
    detail: (
      <>
        University of Antique · <span style={{ color: "var(--coral)" }}>★</span>{" "}
        Programmer of the Year.
      </>
    ),
    color: "var(--lime)",
  },
];

const CERTS = [
  {
    title: "n8n — Integrations: APIs & Connected",
    meta: "Foundations · 2026",
    href: "https://badges.n8n.io/91fbe357-c565-4e0d-b0c5-532cb33c1eb0#acc.OZMdPz0b",
    img: "/thumbnails/n8n-integrations-badge.png",
  },
  {
    title: "n8n — Essentials: Your First Workflows",
    meta: "Foundations · 2026",
    href: "https://badges.n8n.io/6071b7bf-37fb-442f-8862-a87aed8ca6b5#acc.CBnzHJsO",
    img: "/thumbnails/n8n-essentials-badge.png",
  },
];

const colHeading: CSSProperties = {
  margin: "0 0 20px",
  fontFamily: "'Space Mono', monospace",
  fontSize: 13,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "var(--ink2)",
};

const period: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
  color: "var(--ink2)",
  marginBottom: 4,
};

const itemTitle: CSSProperties = { fontWeight: 600, fontSize: 18 };

const itemDetail: CSSProperties = {
  color: "var(--ink2)",
  fontSize: 14,
  lineHeight: 1.5,
};

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{ paddingLeft: 20, borderLeft: `2px solid ${it.color}` }}
        >
          <div style={period}>{it.period}</div>
          <div style={itemTitle}>{it.title}</div>
          <div style={itemDetail}>{it.detail}</div>
        </div>
      ))}
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      style={{
        width: "100%",
        maxWidth: 1240,
        margin: "0 auto",
        padding: "clamp(72px, 10vw, 140px) clamp(18px, 5vw, 60px)",
      }}
    >
      <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
        <div
          data-reveal
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12.5,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--coral)",
            marginBottom: 14,
          }}
        >
          / 03 — Background
        </div>
        <h2
          data-reveal
          style={{
            margin: 0,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
            letterSpacing: "-.035em",
            lineHeight: 0.94,
          }}
        >
          Where I've<br />been building
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(24px, 3vw, 44px)",
        }}
      >
        <div data-reveal>
          <h3 style={colHeading}>Experience</h3>
          <Timeline items={EXPERIENCE} />
        </div>
        <div data-reveal>
          <h3 style={colHeading}>Education</h3>
          <Timeline items={EDUCATION} />
        </div>
        <div data-reveal>
          <h3 style={colHeading}>Certifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CERTS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="cert-card"
                aria-label={`${c.title} — view credential`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img
                    src={c.img}
                    alt=""
                    aria-hidden="true"
                    width={56}
                    height={56}
                    style={{
                      width: 56,
                      height: 56,
                      flexShrink: 0,
                      borderRadius: 12,
                      objectFit: "contain",
                      background: "var(--bg2)",
                      border: "1px solid var(--line)",
                      padding: 4,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.25 }}
                      >
                        {c.title}
                      </span>
                      <span
                        className="cert-arrow"
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          marginTop: 1,
                          fontSize: 15,
                          color: "var(--ink2)",
                        }}
                      >
                        ↗
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginTop: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 12,
                          color: "var(--ink2)",
                        }}
                      >
                        {c.meta}
                      </span>
                      <span
                        className="cert-go"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 11.5,
                          letterSpacing: ".05em",
                          textTransform: "uppercase",
                          color: "var(--blue)",
                        }}
                      >
                        View credential
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
