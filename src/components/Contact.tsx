import type { CSSProperties } from "react";
import { RESUME_HREF } from "@/data/portfolio";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const LINKS: ContactLink[] = [
  {
    label: "EMAIL",
    value: "villasoraironevonn@gmail.com",
    href: "mailto:villasoraironevonn@gmail.com",
  },
  { label: "PHONE", value: "+63 949 1488 343", href: "tel:+639491488343" },
  {
    label: "GITHUB ↗",
    value: "VonnAirone",
    href: "https://github.com/VonnAirone",
    external: true,
  },
  {
    label: "LINKEDIN ↗",
    value: "in/vonnairone",
    href: "https://linkedin.com/in/vonnairone",
    external: true,
  },
];

const linkLabel: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11.5,
  letterSpacing: ".05em",
  color: "color-mix(in srgb, var(--bg) 60%, transparent)",
  marginBottom: 8,
};

const linkTop: CSSProperties = {
  display: "block",
  paddingTop: 20,
  borderTop: "1px solid color-mix(in srgb, var(--bg) 26%, transparent)",
};

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--ink)",
        color: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1240,
          margin: "0 auto",
          padding: "clamp(72px, 11vw, 150px) clamp(18px, 5vw, 60px)",
        }}
      >
        <div
          data-reveal
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12.5,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--lime)",
            marginBottom: 20,
          }}
        >
          / 04 — Let's build something hands-off
        </div>
        <a
          href="mailto:villasoraironevonn@gmail.com"
          data-cursor
          data-reveal
          style={{
            display: "inline-block",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.2rem, 9vw, 7.5rem)",
            letterSpacing: "-.04em",
            lineHeight: 0.92,
            textWrap: "balance",
          }}
        >
          Say hello{" "}
          <span
            data-arrow
            style={{ display: "inline-block", transition: "transform .4s" }}
          >
            ↗
          </span>
        </a>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: 24,
            marginTop: "clamp(44px, 6vw, 80px)",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-cursor
              {...(l.external
                ? { target: "_blank", rel: "noopener" }
                : {})}
              style={linkTop}
            >
              <div style={linkLabel}>{l.label}</div>
              <div
                style={{ fontSize: 16, fontWeight: 600, wordBreak: "break-word" }}
              >
                {l.value}
              </div>
            </a>
          ))}
        </div>
        <a
          href={RESUME_HREF}
          download
          data-magnetic
          data-cursor
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: "clamp(40px, 5vw, 60px)",
            padding: "16px 28px",
            borderRadius: 999,
            background: "var(--lime)",
            color: "#14110B",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          ↓ Download résumé (PDF)
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        maxWidth: 1240,
        margin: "0 auto",
        padding: "32px clamp(18px, 5vw, 60px)",
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        color: "var(--ink2)",
      }}
    >
      <span>© 2026 Airone Vonn Villasor — Sibalom, Antique · Philippines</span>
      <span>Designed &amp; built by hand ✳</span>
    </footer>
  );
}
