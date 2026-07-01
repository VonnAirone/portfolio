import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { PROJECTS, type Project } from "@/data/portfolio";

const eyebrow: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 12.5,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--coral)",
  marginBottom: 14,
};

const flowCol: CSSProperties = { flex: 1, minWidth: 0 };

const flowLabel = (color: string): CSSProperties => ({
  fontSize: 9.5,
  letterSpacing: ".05em",
  color,
  marginBottom: 3,
});

const flowValue: CSSProperties = { color: "var(--ink)", lineHeight: 1.25 };

const tagStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  padding: "5px 10px",
  borderRadius: 999,
  border: "1px solid var(--line)",
  color: "var(--ink2)",
};

/**
 * Returns an embeddable iframe URL for hosted demos (e.g. Loom), or null for
 * direct video files that should play in a native <video> element.
 */
function embedUrl(demo: string): string | null {
  const loom = demo.match(/loom\.com\/(?:share|embed)\/([\w-]+)/);
  if (loom) return `https://www.loom.com/embed/${loom[1]}`;
  return null;
}

function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <article
      data-reveal
      data-tilt
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: 22,
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <button
        type="button"
        className="proj-media"
        data-cursor
        onClick={() => onOpen(p)}
        aria-label={`${p.title} — watch demo`}
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          backgroundImage: `linear-gradient(135deg, ${p.grad[0]} 0%, ${p.grad[1]} 100%)`,
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
          overflow: "hidden",
          border: "none",
          width: "100%",
          fontFamily: "inherit",
          cursor: "pointer",
        }}
      >
        {p.thumb && (
          <>
            <img
              src={p.thumb}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,.5) 0%, rgba(0,0,0,.08) 55%, rgba(0,0,0,.12) 100%)",
              }}
            />
          </>
        )}
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 5vw, 68px)",
            lineHeight: 0.8,
            color: "rgba(255,255,255,.9)",
            letterSpacing: "-.03em",
            mixBlendMode: "overlay",
          }}
        >
          {p.n}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            className="card-play"
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "rgba(255,255,255,.94)",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 19,
              paddingLeft: 3,
              boxShadow: "0 12px 32px -10px rgba(0,0,0,.45)",
            }}
          >
            ▶
          </span>
        </span>
        <span
          style={{
            position: "relative",
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: ".05em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.92)",
            background: "rgba(0,0,0,.22)",
            padding: "6px 10px",
            borderRadius: 999,
            backdropFilter: "blur(4px)",
          }}
        >
          ▶ Watch demo
        </span>
      </button>
      <div
        style={{
          padding: "22px 22px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-.02em",
            lineHeight: 1.08,
          }}
        >
          {p.title}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 8,
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "var(--ink2)",
          }}
        >
          <div style={flowCol}>
            <div style={flowLabel("var(--coral)")}>IN</div>
            <div style={flowValue}>{p.inp}</div>
          </div>
          <div style={{ alignSelf: "center", color: "var(--ink2)" }}>→</div>
          <div style={flowCol}>
            <div style={flowLabel("var(--blue)")}>DO</div>
            <div style={flowValue}>{p.proc}</div>
          </div>
          <div style={{ alignSelf: "center", color: "var(--ink2)" }}>→</div>
          <div style={flowCol}>
            <div style={flowLabel("var(--ink2)")}>OUT</div>
            <div style={flowValue}>{p.outp}</div>
          </div>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--ink2)",
          }}
        >
          {p.note}
        </p>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
          }}
        >
          {p.tags.map((t) => (
            <span key={t} style={tagStyle}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-close]")?.focus();

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const titleId = "project-modal-title";
  const demoEmbed = project.demo ? embedUrl(project.demo) : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 40px)",
        background: "rgba(8,6,3,.62)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "modalBackdrop .25s ease",
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: 24,
          animation: "modalPanel .3s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <button
          type="button"
          data-close
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 2,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.4)",
            background: "rgba(0,0,0,.32)",
            color: "#fff",
            fontSize: 18,
            backdropFilter: "blur(4px)",
          }}
        >
          ✕
        </button>

        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            backgroundImage: `linear-gradient(135deg, ${project.grad[0]} 0%, ${project.grad[1]} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {project.thumb && (
            <img
              src={project.thumb}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          )}
          {demoEmbed ? (
            <iframe
              src={demoEmbed}
              title={`${project.title} demo`}
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                zIndex: 1,
                background: "#000",
              }}
            />
          ) : project.demo ? (
            <>
              <video
                ref={videoRef}
                src={project.demo}
                poster={project.thumb}
                controls
                playsInline
                onPlay={() => setStarted(true)}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  background: "#000",
                }}
              />
              {!started && (
                <button
                  type="button"
                  className="play-btn"
                  aria-label={`Play ${project.title} demo`}
                  onClick={() => void videoRef.current?.play()}
                  style={{
                    position: "relative",
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,.94)",
                    color: "var(--ink)",
                    fontSize: 26,
                    paddingLeft: 4,
                    boxShadow: "0 14px 40px -10px rgba(0,0,0,.5)",
                    cursor: "pointer",
                  }}
                >
                  ▶
                </button>
              )}
            </>
          ) : (
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                color: "#fff",
                textAlign: "center",
                padding: 24,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  paddingLeft: 4,
                  color: "rgba(255,255,255,.85)",
                }}
              >
                ▶
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12.5,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  background: "rgba(0,0,0,.55)",
                  padding: "8px 14px",
                  borderRadius: 999,
                  backdropFilter: "blur(4px)",
                }}
              >
                Demo coming soon
              </span>
            </div>
          )}
        </div>

        <div style={{ padding: "clamp(22px, 4vw, 34px)" }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "var(--coral)",
              marginBottom: 10,
            }}
          >
            / {project.n} — Selected work
          </div>
          <h3
            id={titleId}
            style={{
              margin: "0 0 14px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              letterSpacing: "-.02em",
              lineHeight: 1.05,
            }}
          >
            {project.title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 10,
              marginBottom: 18,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11.5,
              color: "var(--ink2)",
            }}
          >
            <div style={flowCol}>
              <div style={flowLabel("var(--coral)")}>IN</div>
              <div style={flowValue}>{project.inp}</div>
            </div>
            <div style={{ alignSelf: "center" }}>→</div>
            <div style={flowCol}>
              <div style={flowLabel("var(--blue)")}>DO</div>
              <div style={flowValue}>{project.proc}</div>
            </div>
            <div style={{ alignSelf: "center" }}>→</div>
            <div style={flowCol}>
              <div style={flowLabel("var(--ink2)")}>OUT</div>
              <div style={flowValue}>{project.outp}</div>
            </div>
          </div>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "var(--ink2)",
            }}
          >
            {project.note}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {project.tags.map((t) => (
              <span key={t} style={tagStyle}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((p: Project) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setActive(p);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    lastFocus.current?.focus();
  }, []);

  return (
    <section
      id="work"
      style={{
        width: "100%",
        maxWidth: 1240,
        margin: "0 auto",
        padding: "clamp(72px, 10vw, 140px) clamp(18px, 5vw, 60px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: "clamp(40px, 5vw, 72px)",
        }}
      >
        <div>
          <div data-reveal style={eyebrow}>
            / 01 — Selected work
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
            Things I<br />put into orbit
          </h2>
        </div>
        <p
          data-reveal
          style={{
            maxWidth: "32ch",
            margin: "0 0 6px",
            color: "var(--ink2)",
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          Eight systems, each a small machine: an{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
            input
          </em>{" "}
          goes in, a{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
            process
          </em>{" "}
          does the work, an{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
            output
          </em>{" "}
          comes out — reliably.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(20px, 2.5vw, 34px)",
        }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.n} p={p} onOpen={open} />
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}
