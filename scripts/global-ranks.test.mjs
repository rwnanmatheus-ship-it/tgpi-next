import assert from "node:assert/strict";
import test from "node:test";
import {
  GLOBAL_RANKS,
  getGlobalRank,
} from "../src/lib/global-ranks.ts";

const emptyInput = {
  activationCompletion: 0,
  comparisons: 0,
  documentReviews: 0,
  learningPaths: 0,
  planCompletion: 0,
  profileCompletion: 0,
  savedCountries: 0,
};

test("starts every member at Global Initiate without inventing activity", () => {
  const rank = getGlobalRank(emptyInput);

  assert.equal(rank.id, "global-initiate");
  assert.equal(rank.points, 0);
  assert.equal(rank.nextRank?.id, "pathfinder");
  assert.equal(rank.pointsToNext, 150);
});

test("caps every points source and never exceeds one thousand", () => {
  const rank = getGlobalRank({
    activationCompletion: 900,
    comparisons: 900,
    documentReviews: 900,
    learningPaths: 900,
    planCompletion: 900,
    profileCompletion: 900,
    savedCountries: 900,
  });

  assert.equal(rank.id, "global-polymath");
  assert.equal(rank.points, 1000);
  assert.equal(rank.nextRank, null);
  assert.equal(rank.progressWithinRank, 100);
});

test("reaches ranks only when their published thresholds are met", () => {
  const thresholds = [0, 150, 320, 500, 700, 850];

  assert.deepEqual(
    GLOBAL_RANKS.map((rank) => rank.threshold),
    thresholds,
  );
  assert.equal(
    getGlobalRank({ ...emptyInput, profileCompletion: 75 }).id,
    "pathfinder",
  );
  assert.equal(
    getGlobalRank({
      ...emptyInput,
      activationCompletion: 100,
      planCompletion: 100,
    }).id,
    "navigator",
  );
});

test("uses only bounded product progress in the activity score", () => {
  const rank = getGlobalRank({
    ...emptyInput,
    comparisons: 3,
    documentReviews: 3,
    learningPaths: 1,
    savedCountries: 5,
  });

  assert.equal(rank.breakdown.activity, 300);
  assert.equal(rank.points, 300);
});
