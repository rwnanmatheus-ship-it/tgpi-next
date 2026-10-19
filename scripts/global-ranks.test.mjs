import assert from "node:assert/strict";
import test from "node:test";
import { GLOBAL_RANKS, getGlobalRank } from "../src/lib/global-ranks.ts";
const empty = {activationCompletion:0, comparisons:0, documentReviews:0, learningPaths:0, planCompletion:0, profileCompletion:0, savedCountries:0};
test("ten ordered stages start from zero with explicit requirements", () => {
 assert.equal(GLOBAL_RANKS.length, 10);
 assert.equal(getGlobalRank(empty).points,0);
 assert.equal(getGlobalRank(empty).id,"global-initiate");
 assert.equal(getGlobalRank(empty).pointsToNext,350);
 for(let i=1;i<GLOBAL_RANKS.length;i++) assert.ok(GLOBAL_RANKS[i].threshold > GLOBAL_RANKS[i-1].threshold);
});
test("bounded activity cannot exceed 10000 or farm repetitions", () => {
 const all = Object.fromEntries(Object.keys(empty).map(key=>[key,900]));
 const rank=getGlobalRank(all);
 assert.equal(rank.points,10000);
 assert.equal(rank.id,"institute-laureate");
 assert.equal(rank.nextRank,null);
 assert.equal(rank.progressWithinRank,100);
 assert.deepEqual(getGlobalRank({...all, comparisons:9000}),rank);
});
test("profile completion alone never unlocks a rank",()=>{
 assert.equal(getGlobalRank({...empty,profileCompletion:100}).id,"global-initiate");
});
test("research and preparation cannot replace completed learning",()=>{
 const rank=getGlobalRank({...empty,activationCompletion:100,profileCompletion:100,planCompletion:100,comparisons:4,documentReviews:4,savedCountries:8});
 assert.equal(rank.points,2200);
 assert.equal(rank.id,"pathfinder");
 assert.equal(rank.pointsToNext,0);
 assert.equal(rank.completedCourses,0);
});
test("top rank requires both twelve courses and a complete plan",()=>{
 const all={activationCompletion:100,profileCompletion:100,planCompletion:100,comparisons:4,documentReviews:4,savedCountries:8,learningPaths:12};
 assert.equal(getGlobalRank(all).id,"institute-laureate");
 assert.notEqual(getGlobalRank({...all, planCompletion:99}).id,"institute-laureate");
 assert.notEqual(getGlobalRank({...all, learningPaths:11}).id,"institute-laureate");
});
test("invalid inputs never produce negative or non-finite points",()=>{
 for(const value of [-100,NaN,Infinity]) {
  const rank=getGlobalRank(Object.fromEntries(Object.keys(empty).map(key=>[key,value])));
  assert.equal(rank.points,0);
 }
});
