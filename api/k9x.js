module.exports = async (req, res) => {
  const p = String(req.query.p || "");
  const ip =
    req.headers["x-real-ip"] ||
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const country = req.headers["x-vercel-ip-country"] || "?";
  const region = req.headers["x-vercel-ip-country-region"] || "?";
  let city = "?";
  try {
    city = decodeURIComponent(req.headers["x-vercel-ip-city"] || "?");
  } catch (e) {}
  console.log("visit", p, ip, country, region, city);

  if (!["view", "event", "session"].includes(p)) {
    return res.status(404).end();
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