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

test("validates real dates and keeps birth dates private by default", async () => {
  const { normalizeBirthDate } = await import("../src/lib/account-profile.ts");
  const now = new Date("2026-10-19T12:00:00Z");
  assert.equal(normalizeBirthDate("2000-02-29", now), "2000-02-29");
  for (const date of ["2001-02-29", "2026-13-01", "2026-10-20", "1899-12-31", "01/02/2000", "", null]) assert.equal(normalizeBirthDate(date, now), "");
  const profile = normalizeTgpiAccountProfile({ dateOfBirth: "2001-02-11", gender: "man" });
  assert.equal(profile.dateOfBirth, "2001-02-11");
  assert.equal(profile.certificateBirthDateConsent, false);
  assert.equal(profile.privacy.visibility, "private");
});

test("uses real names for credentials and explicit titles without inferring gender", async () => {
  const { getCertificateName, getAccountSalutation } = await import("../src/lib/account-profile.ts");
  const identity = { firstName: "Renan", lastName: "Fernandes" };
  const profile = normalizeTgpiAccountProfile({ legalFullName: " Renan Matheus da Silva Fernandes ", gender: "man", preferredTitle: "mx" });
  assert.equal(getCertificateName(identity, profile), "Renan Matheus da Silva Fernandes");
  assert.equal(getAccountSalutation(identity, profile), "Mx. Renan");
  assert.equal(getAccountSalutation(identity, normalizeTgpiAccountProfile({ gender: "woman" })), "Renan");
  assert.equal(getCertificateName(identity, normalizeTgpiAccountProfile({})), "Renan Fernandes");
});

test("normalizes personal context and rejects arbitrary enum values", () => {
  const profile = normalizeTgpiAccountProfile({ gender: "invalid", preferredTitle: "Dr", employmentType: "injected", yearsExperience: "999", certificateBirthDateConsent: "true" });
  assert.equal(profile.gender, ""); assert.equal(profile.preferredTitle, "name");
  assert.equal(profile.employmentType, ""); assert.equal(profile.yearsExperience, "");
  assert.equal(profile.certificateBirthDateConsent, false);
});

test("avatar crop stays within the source at every zoom and position", async () => {
  const { getAvatarCrop } = await import("../src/lib/avatar-crop.ts");
  assert.deepEqual(getAvatarCrop(1600, 800, 1, 50, 50), { left: 400, top: 0, size: 800 });
  for (const [width, height] of [[1600, 800], [800, 1600], [1024, 1024]]) {
    for (const zoom of [1, 2, 3]) for (const x of [-10, 0, 50, 100, 110]) for (const y of [0, 50, 100]) {
      const crop = getAvatarCrop(width, height, zoom, x, y);
      assert.ok(crop.left >= 0 && crop.top >= 0);
      assert.ok(crop.left + crop.size <= width + .001);
      assert.ok(crop.top + crop.size <= height + .001);
    }
  }
  assert.throws(() => getAvatarCrop(0, 100, 1, 50, 50));
});

test("search matches diacritics and provides a broad profession catalog", async () => {
  const { filterProfileOptions, citySuggestions, professionSuggestions } = await import("../src/lib/profile-options.ts");
  assert.equal(filterProfileOptions([{ label: "São Paulo" }], "sao")[0].label, "São Paulo");
  assert.ok(citySuggestions.brazil.includes("São Paulo"));
  assert.ok(professionSuggestions.length >= 100);
  assert.ok(professionSuggestions.includes("Waiter"));
});
