// Vercel Node.js serverless function: bridges Node req/res to the
// TanStack Start Web `fetch` SSR entry built into ../dist/server/index.js
import handler from "../dist/server/server.js";

export default async function (req, res) {
  const url = `https://${req.headers.host}${req.url}`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv));
    else if (v != null) headers.set(k, String(v));
  }

  const init = { method: req.method, headers };
  if (req.method && !["GET", "HEAD"].includes(req.method.toUpperCase())) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    if (chunks.length) init.body = Buffer.concat(chunks);
  }

  const webReq = new Request(url, init);
  const webRes = await handler.fetch(webReq);

  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => res.setHeader(key, value));
  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
  }
  res.end();
}

// Runtime defaults to Vercel's Node.js runtime (configured at the project level).
