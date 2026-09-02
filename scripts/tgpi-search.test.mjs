import assert from "node:assert/strict";
import test from "node:test";
import { rankTgpiSearchDocuments } from "../src/lib/tgpi-search-ranking.ts";

const country = (title, slug, aliases, keywords = []) => ({
  type: "country", title, aliases, keywords,
  description: `${title} country intelligence for cost, work, study, documents and relocation.`,
  url: `/countries/${slug}`,
});
const documents = [
  country("Democratic Republic of the Congo", "democratic-republic-of-the-congo", ["Kinshasa"], ["cheap", "affordable", "low cost", "budget"]),
  country("South Africa", "south-africa", ["Pretoria"], ["cheap", "affordable", "low cost"]),
  country("Portugal", "portugal", ["Lisbon"], ["balanced cost", "Portuguese"]),
  country("Spain", "spain", ["Madrid"], ["balanced cost", "Spanish"]),
  country("Canada", "canada", ["Ottawa"], ["premium cost"]),
  country("United States", "united-states", ["Washington", "USA", "US"], ["premium cost"]),
  country("Russia", "russia", ["Moscow"], []),
  country("Japan", "japan", ["Tokyo"], ["premium cost"]),
  {
    type: "compare", title: "Compare countries", url: "/compare",
    description: "Compare cost, work, study and lifestyle.",
    keywords: ["vs", "versus", "comparison"],
  },
];

test("explicit country outranks generic cost synonyms and stop words", () => {
  const results = rankTgpiSearchDocuments(documents, "Portugal cost of living");
  assert.equal(results[0].url, "/countries/portugal");
  assert.deepEqual(results.filter((r) => r.type === "country").map((r) => r.title), ["Portugal"]);
});

test("multiple named destinations stay above unrelated countries", () => {
  const results = rankTgpiSearchDocuments(documents, "Portugal vs Spain");
  assert.deepEqual(new Set(results.slice(0, 2).map((r) => r.title)), new Set(["Portugal", "Spain"]));
  assert.ok(results.some((r) => r.url === "/compare"));
});

test("capital aliases and accented queries resolve to the correct country", () => {
  assert.equal(rankTgpiSearchDocuments(documents, "Lísbon living costs")[0].title, "Portugal");
  assert.equal(rankTgpiSearchDocuments(documents, "Tokyo study")[0].title, "Japan");
});

test("short aliases use word boundaries, not substrings", () => {
  assert.equal(rankTgpiSearchDocuments(documents, "US jobs")[0].title, "United States");
  assert.equal(rankTgpiSearchDocuments(documents, "USA vs Canada").filter((r) => r.type === "country").length, 2);
  assert.equal(rankTgpiSearchDocuments(documents, "Russia")[0].title, "Russia");
});

test("unknown queries do not return countries merely because they are indexable", () => {
  assert.deepEqual(rankTgpiSearchDocuments(documents, "zzzxxyyunknown"), []);
  assert.deepEqual(rankTgpiSearchDocuments(documents, "the of in"), []);
  assert.deepEqual(rankTgpiSearchDocuments(documents, "   "), []);
});

test("affordability remains a useful general intent", () => {
  const results = rankTgpiSearchDocuments(documents, "affordable countries");
  assert.ok(["South Africa", "Democratic Republic of the Congo"].includes(results[0].title));
});

test("cost of living is not expanded to affordable or cheap", () => {
  const results = rankTgpiSearchDocuments([
    { type: "learn", title: "Housing costs", description: "Cost of living research", keywords: [], url: "/cost" },
    { type: "learn", title: "Bargains", description: "Discounts", keywords: ["cheap", "affordable", "budget"], url: "/cheap" },
  ], "cost of living");
  assert.deepEqual(results.map((r) => r.url), ["/cost"]);
});

test("result limits remain bounded", () => {
  assert.equal(rankTgpiSearchDocuments(documents, "cost", 2).length, 2);
  assert.deepEqual(rankTgpiSearchDocuments(documents, "cost", 0), []);
  assert.deepEqual(rankTgpiSearchDocuments(documents, "cost", -1), []);
});
