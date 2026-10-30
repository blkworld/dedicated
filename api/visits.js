const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://loggen.edgeone.dev");

  if (!process.env.REKAP_KEY || req.query.key !== process.env.REKAP_KEY) {
    return res.status(401).send("Unauthorized");
  }
  const r = await fetch(REDIS_URL, {
    method: "POST",
    headers: { Authorization: "Bearer " + REDIS_TOKEN },
    body: JSON.stringify(["LRANGE", "visits", 0, 19999]),
  });
  const data = await r.json();
  const lines = (data.result || []).map((s) => {
    const v = JSON.parse(s);
    return JSON.stringify({
      id: v.t + "-" + v.ip,
      timestamp: v.t,
      message: ["visit", "view", v.ip, v.country, v.region, v.city, v.ua].join(" "),
    });
  });
  res.setHeader("content-type", "text/plain; charset=utf-8");
  res.send(lines.join("\n"));
};