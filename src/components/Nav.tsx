import type { CSSProperties } from "react";
import { RESUME_HREF } from "@/data/portfolio";

const NAV_LINKS = [
  { label: "Work", href: "#work", nav: "work" },
  { label: "Stack", href: "#stack", nav: "stack" },
  { label: "About", href: "#about", nav: "about" },
  { label: "Contact", href: "#contact", nav: "contact" },
];

const MENU_LINKS = [
  { label: "Work", href: "#work", color: undefined },
  { label: "Stack", href: "#stack", color: "var(--blue)" },
  { label: "About", href: "#about", color: undefined },
  { label: "Contact", href: "#contact", color: "var(--coral)" },
];

const iconBtn: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "1px solid var(--line)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const navPillLink: CSSProperties = {
  position: "relative",
  padding: "8px 15px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 500,
  color: "var(--ink2)",
  transition: "color .25s",
};

const menuLink: CSSProperties = {
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontWeight: 700,
  fontSize: "clamp(38px, 11vw, 72px)",
  letterSpacing: "-.03em",
  lineHeight: 1.05,
};

interface NavProps {
  theme: "light" | "dark";
  menuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
}

export function Nav({ theme, menuOpen, onToggleTheme, onToggleMenu }: NavProps) {
  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1240,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "16px clamp(18px, 5vw, 60px)",
          }}
        >
          <a
            href="#top"
          data-scroll
          data-cursor
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-.02em",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--ink)",
              color: "var(--bg)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 18,
              lineHeight: 1,
              paddingBottom: 2,
            }}
          >
            ✳
          </span>
          <span>Villasor</span>
        </a>

        <div
          className="desknav"
          style={{
            alignItems: "center",
            gap: 6,
            padding: 6,
            borderRadius: 999,
            background: "color-mix(in srgb, var(--bg2) 70%, transparent)",
            border: "1px solid var(--line)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-scroll
              data-nav={l.nav}
              data-cursor
              style={navPillLink}
            >
              <span>{l.label}</span>
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            aria-label="Toggle colour theme"
            onClick={onToggleTheme}
            data-cursor
            style={{
              ...iconBtn,
              background: "transparent",
              color: "var(--ink)",
              fontSize: 16,
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <a
            href={RESUME_HREF}
            download
            data-magnetic
            data-cursor
            className="resume-btn"
            style={{
              alignItems: "center",
              gap: 7,
              padding: "10px 18px",
              borderRadius: 999,
              background: "var(--ink)",
              color: "var(--bg)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Résumé <span style={{ fontSize: 12 }}>↓</span>
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={onToggleMenu}
            data-cursor
            className="burger"
            style={{
              ...iconBtn,
              background: "var(--ink)",
              color: "var(--bg)",
              fontSize: 18,
            }}
          >
            ≡
          </button>
        </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(24px, 8vw, 60px)",
            gap: 6,
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={onToggleMenu}
            style={{
              position: "absolute",
              top: 18,
              right: "clamp(18px, 5vw, 60px)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "transparent",
              color: "var(--ink)",
              fontSize: 22,
            }}
          >
            ✕
          </button>
          {MENU_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-scroll
              style={l.color ? { ...menuLink, color: l.color } : menuLink}
            >
              {l.label}
            </a>
          ))}
          <a
            href={RESUME_HREF}
            download
            style={{
              marginTop: 24,
              fontFamily: "'Space Mono', monospace",
              fontSize: 15,
              color: "var(--ink2)",
            }}
          >
            ↓ Download résumé (PDF)
          </a>
        </div>
      )}
    </>
  );
}
