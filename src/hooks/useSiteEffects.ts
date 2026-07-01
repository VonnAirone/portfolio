import { useEffect } from "react";

interface Blob {
  c: string;
  r: number;
  bx: number;
  by: number;
  ph: number;
  sp: number;
  amp: number;
}

/**
 * Wires up every imperative flourish the design relies on — scroll reveals,
 * animated counters, active-section nav highlighting, smooth scrolling, skill
 * chip hovers, the custom cursor, magnetic buttons, tilt cards, and the blurred
 * canvas blob field behind the hero.
 *
 * All listeners, observers, animation frames, and injected nodes are tracked and
 * torn down on unmount so the effect stays safe under React StrictMode's
 * double-invocation in development.
 *
 * @param closeMenu Called when a nav link is followed, so the mobile menu closes.
 */
export function useSiteEffects(closeMenu: () => void): void {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const cleanups: Array<() => void> = [];
    const on = (target: EventTarget, type: string, fn: EventListener): void => {
      target.addEventListener(type, fn);
      cleanups.push(() => target.removeEventListener(type, fn));
    };
    const observe = (io: IntersectionObserver): void => {
      cleanups.push(() => io.disconnect());
    };

    // ===== scroll reveals =====
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const show = (el: HTMLElement): void => el.setAttribute("data-in", "");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(show);
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          let delay = 0;
          entries.forEach((en) => {
            if (en.isIntersecting) {
              const el = en.target as HTMLElement;
              const timer = window.setTimeout(() => show(el), delay);
              cleanups.push(() => window.clearTimeout(timer));
              delay += 70;
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      reveals.forEach((el) => io.observe(el));
      observe(io);
    }

    // ===== animated counters =====
    const fmt = (el: HTMLElement): string =>
      (el.dataset.pad
        ? String(el.dataset.count).padStart(2, "0")
        : String(el.dataset.count)) + (el.dataset.suffix ?? "");
    const run = (el: HTMLElement): void => {
      const target = parseFloat(el.dataset.count ?? "0");
      const dur = 1300;
      const t0 = performance.now();
      const step = (t: number): void => {
        let p = Math.min(1, (t - t0) / dur);
        p = 1 - Math.pow(1 - p, 3);
        const v = Math.round(target * p);
        el.textContent =
          (el.dataset.pad ? String(v).padStart(2, "0") : String(v)) +
          (el.dataset.suffix ?? "");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );
    if (reduce || !("IntersectionObserver" in window)) {
      counters.forEach((el) => (el.textContent = fmt(el)));
    } else {
      const co = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              run(en.target as HTMLElement);
              co.unobserve(en.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counters.forEach((el) => co.observe(el));
      observe(co);
    }

    // ===== active nav =====
    const ids = ["work", "stack", "about", "contact"];
    const links = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav]"),
    );
    const setActive = (id: string): void =>
      links.forEach((l) => {
        l.style.color = l.dataset.nav === id ? "var(--ink)" : "var(--ink2)";
      });
    const secs = ids
      .map((i) => document.getElementById(i))
      .filter((el): el is HTMLElement => el !== null);
    if ("IntersectionObserver" in window) {
      const so = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) setActive(en.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      secs.forEach((s) => so.observe(s));
      observe(so);
    }

    // ===== smooth-scroll nav + close menu =====
    document.querySelectorAll<HTMLAnchorElement>("a[data-scroll]").forEach((a) => {
      on(a, "click", ((e: Event) => {
        const href = a.getAttribute("href") ?? "";
        const el = document.getElementById(href.slice(1));
        if (el) {
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
          closeMenu();
        }
      }) as EventListener);
    });

    // ===== skill chip playful hover =====
    const palette = ["var(--blue)", "var(--coral)", "var(--lime)", "var(--lilac)"];
    document.querySelectorAll<HTMLElement>("[data-chip]").forEach((c, i) => {
      const col = palette[i % palette.length];
      on(c, "mouseenter", () => {
        c.style.transform = "translateY(-3px)";
        c.style.background = col;
        c.style.color = col === "var(--lime)" ? "#14110B" : "#fff";
        c.style.borderColor = col;
      });
      on(c, "mouseleave", () => {
        c.style.transform = "none";
        c.style.background = "var(--bg)";
        c.style.color = "var(--ink)";
        c.style.borderColor = "var(--line)";
      });
    });

    // ===== contact arrow nudge =====
    const arrow = document.querySelector<HTMLElement>("[data-arrow]");
    const arrowParent = arrow?.closest("a");
    if (arrow && arrowParent) {
      on(arrowParent, "mouseenter", () => {
        arrow.style.transform = "translate(6px,-6px)";
      });
      on(arrowParent, "mouseleave", () => {
        arrow.style.transform = "none";
      });
    }

    let raf = 0;

    const initCanvas = (staticOnly: boolean): void => {
      const cv = document.getElementById("heroCanvas") as HTMLCanvasElement | null;
      if (!cv) return;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const cols = ["#2A2BF7", "#C8FF3A", "#FF5A34", "#B9A3FF", "#2A2BF7"];
      let W = 0;
      let H = 0;
      const blobs: Blob[] = cols.map((c) => ({
        c,
        r: 0,
        bx: Math.random(),
        by: Math.random(),
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 0.5,
        amp: 0.16 + Math.random() * 0.12,
      }));
      let mouseX = 0.5;
      let mouseY = 0.4;
      let tx = 0.5;
      let ty = 0.4;
      const resize = (): void => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = cv.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        cv.width = W * dpr;
        cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        blobs.forEach((b) => (b.r = Math.max(W, H) * 0.42));
      };
      resize();
      on(window, "resize", resize);
      const heroEl = document.getElementById("top");
      if (heroEl) {
        on(heroEl, "mousemove", ((e: MouseEvent) => {
          const r = heroEl.getBoundingClientRect();
          mouseX = (e.clientX - r.left) / r.width;
          mouseY = (e.clientY - r.top) / r.height;
        }) as EventListener);
      }
      const draw = (t: number): void => {
        ctx.clearRect(0, 0, W, H);
        tx += (mouseX - tx) * 0.05;
        ty += (mouseY - ty) * 0.05;
        blobs.forEach((b, i) => {
          let cx: number;
          let cy: number;
          if (i === 0) {
            cx = tx * W;
            cy = ty * H;
          } else {
            cx = (b.bx + Math.cos(t * 0.0002 * b.sp + b.ph) * b.amp) * W;
            cy = (b.by + Math.sin(t * 0.00025 * b.sp + b.ph) * b.amp) * H;
          }
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
          g.addColorStop(0, b.c);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
          ctx.fill();
        });
      };
      draw(performance.now());
      if (staticOnly) return;
      const anim = (t: number): void => {
        draw(t);
        raf = requestAnimationFrame(anim);
      };
      raf = requestAnimationFrame(anim);
      cleanups.push(() => cancelAnimationFrame(raf));
    };

    // Touch / reduced-motion: static gradient only, skip cursor & pointer FX.
    if (!fine || reduce) {
      initCanvas(true);
      return () => cleanups.forEach((c) => c());
    }

    // ===== custom cursor =====
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    Object.assign(dot.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "#fff",
      zIndex: "9999",
      pointerEvents: "none",
      transform: "translate(-50%,-50%)",
      mixBlendMode: "difference",
      transition: "width .2s, height .2s",
    } satisfies Partial<CSSStyleDeclaration>);
    Object.assign(ring.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      border: "1.5px solid #fff",
      zIndex: "9998",
      pointerEvents: "none",
      transform: "translate(-50%,-50%)",
      mixBlendMode: "difference",
      transition: "width .25s, height .25s, background .25s, opacity .3s",
      opacity: "0",
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.documentElement.style.cursor = "none";
    cleanups.push(() => {
      ring.remove();
      dot.remove();
      document.documentElement.style.cursor = "";
    });

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    on(window, "mousemove", ((e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      ring.style.opacity = "1";
    }) as EventListener);
    const loop = (): void => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    const cursorRaf = requestAnimationFrame(loop);
    cleanups.push(() => cancelAnimationFrame(cursorRaf));

    const grow = (): void => {
      ring.style.width = "58px";
      ring.style.height = "58px";
      ring.style.background = "rgba(255,255,255,.14)";
      dot.style.width = "0px";
      dot.style.height = "0px";
    };
    const shrink = (): void => {
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.background = "transparent";
      dot.style.width = "7px";
      dot.style.height = "7px";
    };
    document
      .querySelectorAll<HTMLElement>("a,button,[data-cursor]")
      .forEach((el) => {
        on(el, "mouseenter", grow);
        on(el, "mouseleave", shrink);
      });

    // ===== magnetic buttons =====
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      el.style.transition = "transform .25s cubic-bezier(.2,.7,.2,1)";
      on(el, "mousemove", ((e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + x * 0.32 + "px," + y * 0.4 + "px)";
      }) as EventListener);
      on(el, "mouseleave", () => (el.style.transform = "none"));
    });

    // ===== tilt cards =====
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
      on(card, "mousemove", ((e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-py * 5).toFixed(2) +
          "deg) rotateY(" +
          (px * 6).toFixed(2) +
          "deg) translateY(-6px)";
      }) as EventListener);
      on(card, "mouseleave", () => (card.style.transform = "none"));
    });

    initCanvas(false);

    return () => cleanups.forEach((c) => c());
  }, [closeMenu]);
}
