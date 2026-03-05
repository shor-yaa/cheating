import { promises as fs } from "node:fs"
import path from "node:path"

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8"
    case ".css":
      return "text/css; charset=utf-8"
    case ".js":
      return "text/javascript; charset=utf-8"
    case ".svg":
      return "image/svg+xml"
    case ".png":
      return "image/png"
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".gif":
      return "image/gif"
    case ".webp":
      return "image/webp"
    case ".ico":
      return "image/x-icon"
    default:
      return "application/octet-stream"
  }
}

function rewriteIndexHtml(html: string) {
  // Repoint relative assets to this route handler.
  return html
    .replaceAll('href="global.css"', 'href="/task/assets/global.css"')
    .replaceAll("href='global.css'", "href='/task/assets/global.css'")
    .replaceAll('src="global.js"', 'src="/task/assets/global.js"')
    .replaceAll("src='global.js'", "src='/task/assets/global.js'")
    .replaceAll('src="images/', 'src="/task/assets/images/')
    .replaceAll("src='images/", "src='/task/assets/images/")
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: parts } = await params
  const relParts = (parts ?? []).filter(Boolean)
  const rel = relParts.length === 0 ? "index.html" : relParts.join("/")

  // Prevent traversal.
  if (relParts.some((p) => p === ".." || p.includes("..") || p.includes(":") || p.startsWith("/"))) {
    return new Response("Bad path", { status: 400 })
  }

  const baseDir = path.join(process.cwd(), "Task !")
  const abs = path.resolve(baseDir, rel)
  const baseResolved = path.resolve(baseDir)
  if (!abs.startsWith(baseResolved + path.sep) && abs !== baseResolved) {
    return new Response("Bad path", { status: 400 })
  }

  try {
    if (rel.toLowerCase() === "index.html") {
      const raw = await fs.readFile(abs, "utf8")
      const html = rewriteIndexHtml(raw)
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      })
    }

    const data = await fs.readFile(abs)
    return new Response(data, {
      headers: {
        "content-type": contentTypeFor(abs),
        "cache-control": "public, max-age=3600",
      },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}

