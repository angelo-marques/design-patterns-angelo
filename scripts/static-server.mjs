import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const args = process.argv.slice(2);
const directory = args[0] || "dist/public";
const port = Number(args[1] || process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function resolvePath(urlPath) {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^\.+/, "");
  let filePath = join(directory, cleanPath === "/" ? "index.html" : cleanPath);

  if (!existsSync(filePath)) {
    if (existsSync(join(directory, "404.html"))) {
      filePath = join(directory, "404.html");
    } else {
      filePath = join(directory, "index.html");
    }
  }

  return filePath;
}

createServer((req, res) => {
  const filePath = resolvePath(req.url || "/");
  const ext = extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(res).on("error", () => {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`Static server running at http://0.0.0.0:${port} serving ${directory}`);
});
