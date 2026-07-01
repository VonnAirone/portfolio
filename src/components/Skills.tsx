import type { CSSProperties } from "react";
import { SKILL_GROUPS, type SkillGroup } from "@/data/portfolio";

const chip: CSSProperties = {
  fontSize: 14,
  padding: "9px 16px",
  borderRadius: 999,
  border: "1px solid var(--line)",
  background: "var(--bg)",
  color: "var(--ink)",
  transition: "transform .25s, background .25s, color .25s",
  cursor: "default",
};

function GroupRow({ g }: { g: SkillGroup }) {
  return (
    <div
      data-reveal
      data-cursor
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: 18,
        padding: "clamp(22px, 3vw, 38px)",
        borderRadius: 22,
        background: "var(--card)",
        border: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              color: "var(--ink2)",
            }}
          >
            {g.num}
          </span>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.4vw, 44px)",
              letterSpacing: "-.025em",
              lineHeight: 1,
              color: "var(--ink)",
            }}
          >
            {g.title}
          </h3>
        </div>
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: g.dot,
            flex: "none",
            alignSelf: "center",
          }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
        {g.items.map((s) => (
          <span key={s} data-chip style={chip}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="stack"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
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
            / 02 — Capabilities
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
              maxWidth: "14ch",
            }}
          >
            The full{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--blue)",
              }}
            >
              workbench
            </span>
          </h2>
        </div>
        <div style={{ display: "grid", gap: "clamp(14px, 1.6vw, 20px)" }}>
          {SKILL_GROUPS.map((g) => (
            <GroupRow key={g.num} g={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
