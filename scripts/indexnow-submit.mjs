// Public protocol ownership key, not a credential. Only submits canonical public URLs.
const origin = "https://www.theglobalpolymath.com";
const key = "fed8c3ace0299e7f08380188d09c89f1";
const changed = ["/", "/sitemap.xml", "/courses", ...["en", "pt-BR", "es", "fr", "de", "it"].map(l => `/discover/${l}`)];
const verification = await fetch(`${origin}/${key}.txt`, { signal: AbortSignal.timeout(20000) });
if (!verification.ok || (await verification.text()).trim() !== key) throw new Error("Production ownership file not available; refusing submission.");
const result = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ host: new URL(origin).host, key, keyLocation: `${origin}/${key}.txt`, urlList: changed.filter(path => path !== "/sitemap.xml").map(path => origin + path) }), signal: AbortSignal.timeout(30000) });
const details = await result.text();
console.log(JSON.stringify({ status: result.status, accepted: result.status === 200 || result.status === 202, details, urls: changed.length - 1 }));
if (result.status !== 200 && result.status !== 202) process.exitCode = 1;
