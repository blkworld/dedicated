const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  const p = String(req.query.p || "");
  if (!["view", "event", "session"].includes(p)) {
    return res.status(404).end();
  }

  const ip =
    req.headers["x-real-ip"] ||
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const country = req.headers["x-vercel-ip-country"] || "?";
  const region = req.headers["x-vercel-ip-country-region"] || "?";
  let city = "?";
  try {
    city = decodeURIComponent(req.headers["x-vercel-ip-city"] || "?");
  } catch (e) {}
  const ua = req.headers["user-agent"] || "";

  if (p === "view" && REDIS_URL) {
    try {
      await fetch(REDIS_URL, {
        method: "POST",
        headers: { Authorization: "Bearer " + REDIS_TOKEN },
        body: JSON.stringify([
          "LPUSH",
          "visits",
          JSON.stringify({ t: Date.now(), ip, country, region, city, ua }),
        ]),
      });
    } catch (e) {}
  }

  const body =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});

  const r = await fetch("https://www.devitaocta.com/_vercel/insights/" + p, {
    method: "POST",
    headers: {
      "content-type": req.headers["content-type"] || "application/json",
      "user-agent": req.headers["user-agent"] || "",
      "x-forwarded-for": req.headers["x-forwarded-for"] || "",
      referer: req.headers["referer"] || "",
    },
    body,
  });

  res.status(r.status).send(await r.text());
};