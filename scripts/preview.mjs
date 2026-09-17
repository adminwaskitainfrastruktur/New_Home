/**
 * Serves the static export in `out/` the way Apache will on Hostinger, so the
 * deploy artifact can be checked before upload — not just the dev server.
 *
 * Mirrors the parts of public/.htaccess that affect what a visitor sees:
 *   - DirectoryIndex  -> /about/ serves out/about/index.html
 *   - DirectorySlash  -> /about redirects to /about/
 *   - ErrorDocument   -> unknown paths return out/404.html with a 404 status
 *
 * Zero dependencies: node scripts/preview.mjs  (npm run preview)
 */
import { createServer } from "node:http";
import { createReadStream, promises as fs } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve(process.cwd(), "out");
const PORT = Number(process.env.PORT ?? 8080);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

async function statOrNull(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

function send(res, status, file, extra = {}) {
  res.writeHead(status, {
    "Content-Type": TYPES[extname(file).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": extname(file) === ".html" ? "no-cache" : "public, max-age=31536000",
    ...extra,
  });
  createReadStream(file).pipe(res);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  // Strip the leading slash and any ../ before joining, so a crafted path
  // cannot escape out/.
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\.]+)/, "");
  const target = join(ROOT, rel);

  if (!target.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  const stat = await statOrNull(target);

  if (stat?.isDirectory()) {
    // DirectorySlash: /about -> /about/
    if (!url.pathname.endsWith("/")) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    const index = join(target, "index.html");
    if (await statOrNull(index)) {
      send(res, 200, index);
      return;
    }
  } else if (stat?.isFile()) {
    send(res, 200, target);
    return;
  }

  const notFound = join(ROOT, "404.html");
  if (await statOrNull(notFound)) {
    send(res, 404, notFound);
    return;
  }
  res.writeHead(404).end("Not found");
});

server.listen(PORT, () => {
  console.log(`Static export preview  →  http://localhost:${PORT}`);
  console.log(`Serving ${ROOT} (rebuild with: npm run build)`);
});
