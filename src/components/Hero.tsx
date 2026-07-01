import type { CSSProperties } from "react";

const marqueeSpan: CSSProperties = {
  display: "inline-flex",
  gap: ".5em",
  paddingRight: ".5em",
};

const statLabel: CSSProperties = {
  marginTop: 8,
  fontFamily: "'Space Mono', monospace",
  fontSize: 12.5,
  letterSpacing: ".04em",
  color: "color-mix(in srgb, var(--bg) 62%, transparent)",
};

const statNumber = (color: string): CSSProperties => ({
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(52px, 7vw, 88px)",
  lineHeight: 1,
  letterSpacing: "-.03em",
  color,
});

const strokeText: CSSProperties = {
  color: "transparent",
  WebkitTextStroke: "1.5px var(--ink)",
};

const mono: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
};

interface Service {
  sq: string;
  title: string;
  sub: string;
}

const SERVICES: Service[] = [
  {
    sq: "var(--blue)",
    title: "Automation & AI agents",
    sub: "n8n · webhooks · REST APIs · LLMs",
  },
  {
    sq: "var(--coral)",
    title: "Full-stack apps",
    sub: "React · React Native · Supabase · Node",
  },
  {
    sq: "var(--lilac)",
    title: "Product & UX design",
    sub: "Research → wireframes → hi-fi prototypes",
  },
];

const ctaBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  padding: "15px 26px",
  borderRadius: 999,
  fontWeight: 600,
  fontSize: 15,
};

function MarqueeRow() {
  return (
    <span style={marqueeSpan}>
      AUTOMATION
      <span style={{ color: "var(--coral)" }}>✳</span>
      <span style={strokeText}>FULL-STACK</span>
      <span style={{ color: "var(--blue)" }}>✳</span>
      AI AGENTS
      <span style={{ color: "var(--coral)" }}>✳</span>
      <span style={strokeText}>DESIGN</span>
      <span style={{ color: "var(--blue)" }}>✳</span>
    </span>
  );
}

export function Hero() {
  return (
    <>
      <section
        id="top"
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <canvas
          id="heroCanvas"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            filter: "blur(52px) saturate(1.35)",
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1240,
            margin: "0 auto",
            padding:
              "120px clamp(18px, 5vw, 60px) clamp(48px, 7vh, 96px)",
          }}
        >
          <div className="hero-grid">
            <div>
              <div
                data-reveal
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 26,
                  ...mono,
                  fontSize: 12.5,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "var(--ink2)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--lime)",
                    animation: "floaty 2.4s ease-in-out infinite",
                  }}
                />
                Available for freelance &amp; full-time
              </div>
              <h1
                data-reveal
                style={{
                  margin: 0,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-.035em",
                  lineHeight: 0.96,
                  fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                  textWrap: "balance",
                }}
              >
                Repetitive work,
                <br />
                <span style={{ color: "var(--blue)" }}>handled</span>
                <br />
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-.01em",
                  }}
                >
                  end-to-end.
                </span>
              </h1>
              <p
                data-reveal
                style={{
                  maxWidth: "46ch",
                  margin: "clamp(24px, 3.5vh, 34px) 0 0",
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  lineHeight: 1.55,
                  color: "var(--ink2)",
                }}
              >
                I'm{" "}
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Airone
                </span>{" "}
                — an AI automation engineer &amp; full-stack developer. I wire
                APIs, webhooks and language models into reliable, hands-off
                systems, then ship the full-stack apps around them.
              </p>
              <div
                data-reveal
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: "clamp(26px, 3.5vh, 38px)",
                }}
              >
                <a
                  href="#work"
                  data-scroll
                  data-magnetic
                  data-cursor
                  style={{
                    ...ctaBase,
                    background: "var(--ink)",
                    color: "var(--bg)",
                  }}
                >
                  See the work <span style={{ fontSize: 13 }}>↘</span>
                </a>
                <a
                  href="#contact"
                  data-scroll
                  data-magnetic
                  data-cursor
                  style={{
                    ...ctaBase,
                    border: "1px solid var(--line)",
                    background:
                      "color-mix(in srgb, var(--card) 60%, transparent)",
                    color: "var(--ink)",
                  }}
                >
                  Get in touch
                </a>
              </div>
            </div>

            <div
              data-reveal
              data-tilt
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "clamp(24px, 2.4vw, 34px)",
                boxShadow: "0 30px 60px -30px rgba(20,17,11,.28)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ...mono,
                  fontSize: 12,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--ink2)",
                  marginBottom: 6,
                }}
              >
                <span>What I do</span>
                <span>03 / services</span>
              </div>
              {SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  style={{
                    padding: "18px 0",
                    borderTop: i ? "1px solid var(--line)" : "none",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 3,
                        background: s.sq,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 19,
                        letterSpacing: "-.01em",
                      }}
                    >
                      {s.title}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      paddingLeft: 23,
                      ...mono,
                      fontSize: 12.5,
                      letterSpacing: ".02em",
                      color: "var(--ink2)",
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            data-reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px 20px",
              marginTop: "clamp(32px, 5vh, 60px)",
              paddingTop: 24,
              borderTop: "1px solid var(--line)",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12.5,
              color: "var(--ink2)",
            }}
          >
            <span style={{ color: "var(--coral)" }}>★</span> Programmer of the
            Year
            <span style={{ opacity: 0.4 }}>/</span> Master in IT candidate · WVSU
            <span style={{ opacity: 0.4 }}>/</span> Shipping since 2024
            <span style={{ opacity: 0.4 }}>/</span> Sibalom, Antique · PH
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 18,
            transform: "translateX(-50%)",
            zIndex: 2,
            fontSize: 20,
            color: "var(--ink2)",
            animation: "bob 2s ease-in-out infinite",
          }}
        >
          ↓
        </div>
      </section>

      <div
        aria-hidden="true"
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "16px 0",
          background: "var(--bg2)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 26s linear infinite",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 5.5vw, 64px)",
            letterSpacing: "-.02em",
            whiteSpace: "nowrap",
          }}
        >
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      <section style={{ background: "var(--ink)", color: "var(--bg)" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1240,
            margin: "0 auto",
            padding: "clamp(48px, 7vw, 88px) clamp(18px, 5vw, 60px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "36px 28px",
          }}
        >
          <div data-reveal>
            <div style={statNumber("var(--lime)")}>
              <span data-count="8" data-pad="1">
                00
              </span>
            </div>
            <div style={statLabel}>SYSTEMS SHIPPED</div>
          </div>
          <div data-reveal>
            <div style={statNumber("var(--coral)")}>
              <span data-count="90" data-suffix="%">
                0%
              </span>
            </div>
            <div style={statLabel}>LESS API QUOTA</div>
          </div>
          <div data-reveal>
            <div style={statNumber("var(--lilac)")}>
              <span data-count="27" data-suffix="+">
                0
              </span>
            </div>
            <div style={statLabel}>TOOLS &amp; APIs WIRED</div>
          </div>
          <div data-reveal>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(30px, 3.6vw, 46px)",
                lineHeight: 1.02,
                letterSpacing: "-.01em",
              }}
            >
              Programmer
              <br />
              of the Year
            </div>
            <div style={statLabel}>UNIVERSITY OF ANTIQUE</div>
          </div>
        </div>
      </section>
    </>
  );
}
