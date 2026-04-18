import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type RecentCountryView = {
  slug: string;
  viewedAt: string;
};

export type UserMemory = {
  preferredCurrency?: string;
  plan?: "free" | "premium";
  favoriteCountries?: string[];
  lastVisitedCountry?: string;
  recentCountryViews?: RecentCountryView[];
};

export async function getUserMemory(uid: string): Promise<UserMemory> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return {
      plan: "free",
      preferredCurrency: "USD",
      favoriteCountries: [],
      lastVisitedCountry: "",
      recentCountryViews: [],
    };
  }

  const data = snap.data() as UserMemory;

  return {
    plan: data.plan || "free",
    preferredCurrency: data.preferredCurrency || "USD",
    favoriteCountries: data.favoriteCountries || [],
    lastVisitedCountry: data.lastVisitedCountry || "",
    recentCountryViews: data.recentCountryViews || [],
  };
}

export async function saveLastVisitedCountry(uid: string, slug: string) {
  const ref = doc(db, "users", uid);
  const current = await getUserMemory(uid);

  const nextRecent = [
    { slug, viewedAt: new Date().toISOString() },
    ...(current.recentCountryViews || []).filter((item) => item.slug !== slug),
  ].slice(0, current.plan === "premium" ? 20 : 5);

  await setDoc(
    ref,
    {
      lastVisitedCountry: slug,
      recentCountryViews: nextRecent,
    },
    { merge: true }
  );
}

export async function toggleFavoriteCountry(uid: string, slug: string) {
  const ref = doc(db, "users", uid);
  const current = await getUserMemory(uid);

  const favorites = current.favoriteCountries || [];
  const isFavorite = favorites.includes(slug);
  const limit = current.plan === "premium" ? 999 : 3;

  if (isFavorite) {
    const next = favorites.filter((item) => item !== slug);

    await setDoc(
      ref,
      {
        favoriteCountries: next,
      },
      { merge: true }
    );

    return {
      isFavorite: false,
      favorites: next,
      limitReached: false,
    };
  }

  if (favorites.length >= limit) {
    return {
      isFavorite: false,
      favorites,
      limitReached: true,
    };
  }

  const next = [...favorites, slug];

  await setDoc(
    ref,
    {
      favoriteCountries: next,
    },
    { merge: true }
  );

  return {
    isFavorite: true,
    favorites: next,
    limitReached: false,
  };
}