"use client";

import { useEffect, useState } from "react";
import { getFavoriteCountries } from "@/lib/favorites";

export default function FavoriteCountriesPanel() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const result = await getFavoriteCountries();
      setFavorites(result);
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-yellow-400">
        Favorite Countries
      </h2>

      {favorites.length === 0 ? (
        <p className="text-sm text-slate-400">
          You have not favorited any countries yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {favorites.map((country) => (
            <span
              key={country}
              className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200"
            >
              {country}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}