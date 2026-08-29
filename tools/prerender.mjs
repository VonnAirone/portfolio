/**
 * Injects server-rendered markup into the built index.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * The client still boots with createRoot and replaces this markup, so the
 * prerender is purely an SEO/crawler payload — no hydration contract to keep.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "dist", "index.html");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

if (!existsSync(ssrEntry)) {
  throw new Error(`SSR bundle missing at ${ssrEntry} — did "vite build --ssr" run?`);
}

const { render } = await import(pathToFileURL(ssrEntry).href);
const markup = render();

if (!markup || markup.length < 500) {
  throw new Error(`Prerender produced suspiciously small markup (${markup.length} bytes)`);
}

const html = readFileSync(htmlPath, "utf8");
const target = '<div id="root"></div>';

if (!html.includes(target)) {
  throw new Error(`Could not find ${target} in dist/index.html`);
}

writeFileSync(htmlPath, html.replace(target, `<div id="root">${markup}</div>`));
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`prerendered ${(markup.length / 1024).toFixed(1)}KB of markup into dist/index.html`);
