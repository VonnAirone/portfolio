import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Build-time entry point. Rendered by tools/prerender.mjs and injected into
 * dist/index.html so crawlers that do not execute JavaScript (social scrapers,
 * GPTBot, ClaudeBot, PerplexityBot) receive real markup instead of an empty root.
 */
export function render(): string {
  return renderToString(<App />);
}
