import { useCallback, useEffect, useState } from "react";
import "./index.css";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact, Footer } from "@/components/Contact";
import { useSiteEffects } from "@/hooks/useSiteEffects";

const GRAIN_URL =
  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );
  const toggleMenu = useCallback(() => setMenuOpen((m) => !m), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useSiteEffects(closeMenu);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 120,
          pointerEvents: "none",
          opacity: 0.045,
          mixBlendMode: "soft-light",
          backgroundImage: GRAIN_URL,
        }}
      />

      <Nav
        theme={theme}
        menuOpen={menuOpen}
        onToggleTheme={toggleTheme}
        onToggleMenu={toggleMenu}
      />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
