import assert from "node:assert/strict";
import test from "node:test";
import {
  canViewTgpiProfile,
  getAccountProfileCompletion,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
  normalizeTgpiAccountProfile,
} from "../src/lib/account-profile.ts";

test("enforces public profile visibility for owners, members and visitors", () => {
  assert.equal(
    canViewTgpiProfile({ ownerId: "owner", viewerId: "owner", visibility: "private" }),
    true,
  );
  assert.equal(
    canViewTgpiProfile({ ownerId: "owner", viewerId: "member", visibility: "private" }),
    false,
  );
  assert.equal(
    canViewTgpiProfile({ ownerId: "owner", viewerId: "member", visibility: "members" }),
    true,
  );
  assert.equal(
    canViewTgpiProfile({ ownerId: "owner", viewerId: null, visibility: "members" }),
    false,
  );
  assert.equal(
    canViewTgpiProfile({ ownerId: "owner", viewerId: null, visibility: "public" }),
    true,
  );
});

test("normalizes account identity and profile fields", () => {
  const identity = normalizeAccountIdentity({
    firstName: "  Renan  ",
    lastName: "  Matheus  ",
  });
  const profile = normalizeTgpiAccountProfile({
    preferredCurrency: "brl",
    languages: ["Portuguese", "English", "Portuguese"],
    measurementSystem: "unknown",
    website: "theglobalpolymath.com",
    linkedin: "https://example.com/not-linkedin",
    instagram: "instagram.com/theglobalpolymath",
  });

  assert.deepEqual(identity, { firstName: "Renan", lastName: "Matheus" });
  assert.equal(profile.preferredCurrency, "BRL");
  assert.deepEqual(profile.languages, ["Portuguese", "English"]);
  assert.equal(profile.measurementSystem, "metric");
  assert.equal(profile.website, "https://theglobalpolymath.com/");
  assert.equal(profile.linkedin, "");
  assert.equal(
    profile.instagram,
    "https://instagram.com/theglobalpolymath",
  );
});

test("hydrates shared context from onboarding without overwriting profile data", () => {
  const profile = mergeAccountProfileWithOnboarding(
    { profession: "Founder", languages: ["Portuguese"] },
    {
      educationLevel: "Bachelor's degree",
      languages: ["English"],
      profession: "Software engineer",
    },
  );

  assert.equal(profile.profession, "Founder");
  assert.equal(profile.educationLevel, "Bachelor's degree");
  assert.deepEqual(profile.languages, ["Portuguese"]);
});

test("calculates profile intelligence completion from useful context", () => {
  const profile = normalizeTgpiAccountProfile({
    bio: "Global education founder.",
    currentCity: "São Paulo",
    currentCountry: "brazil",
    educationLevel: "Bachelor's degree",
    headline: "Founder of TGPI",
    languages: ["Portuguese", "English"],
    preferredLanguage: "English",
    profession: "Founder",
    timezone: "America/Sao_Paulo",
  });

  assert.equal(
    getAccountProfileCompletion(
      { firstName: "Renan", lastName: "Matheus" },
      profile,
    ),
    100,
  );
});

test("does not carry document or credential fields into account metadata", () => {
  const profile = normalizeTgpiAccountProfile({
    documentNumber: "AA123456",
    password: "never-store-this",
    passportNumber: "BR000000",
    preferredLanguage: "Portuguese",
  });

  assert.equal("documentNumber" in profile, false);
  assert.equal("password" in profile, false);
  assert.equal("passportNumber" in profile, false);
});


test("normalizes member IDs without deriving them from private emails", () => {
  assert.equal(normalizeAccountIdentity({ username: " @Renan_Matheus " }).username, "renan_matheus");
  assert.equal(normalizeAccountIdentity({ email: "private@example.com" }).username, undefined);
});

test("rejects lookalike social domains and allows genuine subdomains", () => {
  assert.equal(normalizeTgpiAccountProfile({ linkedin: "https://evillinkedin.com/me" }).linkedin, "");
  assert.equal(normalizeTgpiAccountProfile({ instagram: "https://fakeinstagram.com/me" }).instagram, "");
  assert.equal(normalizeTgpiAccountProfile({ linkedin: "https://www.linkedin.com/in/me" }).linkedin, "https://www.linkedin.com/in/me");
});
