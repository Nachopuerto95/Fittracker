const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function cors(req, res, next) {
  const origin = req.headers.origin;
  const isAllowed =
    allowedOrigins.includes("*") ||
    (origin && allowedOrigins.includes(origin));

  if (isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Headers", "content-type,authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).send();
  }
  next();
}

module.exports = cors;
