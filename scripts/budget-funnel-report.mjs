import { createInterface } from "node:readline";
import { pathToFileURL } from "node:url";

const events = [
  "budget_simulation_viewed",
  "budget_scenario_created",
  "budget_scenario_revised_after_24h",
  "decision_brief_export_requested",
  "study_calendar_export_requested",
  "checkout_started",
  "subscription_confirmed",
];

export async function summarizeBudgetFunnel(lines) {
  const counts = Object.fromEntries(events.map(event => [event, 0]));
  let firstEventAt = null;
  let lastEventAt = null;
  for await (const line of lines) {
    let entry;
    try {
      entry = JSON.parse(line);
      if (typeof entry?.message === "string") entry = JSON.parse(entry.message);
    } catch { continue; }
    if (entry?.channel !== "tgpi_funnel_v1" || !events.includes(entry.event) || typeof entry.at !== "string") continue;
    const timestamp = Date.parse(entry.at);
    if (!Number.isFinite(timestamp)) continue;
    const at = new Date(timestamp).toISOString();
    counts[entry.event]++;
    if (firstEventAt === null || at < firstEventAt) firstEventAt = at;
    if (lastEventAt === null || at > lastEventAt) lastEventAt = at;
  }
  return { firstEventAt, lastEventAt, counts };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
  console.log(JSON.stringify(await summarizeBudgetFunnel(input), null, 2));
}
