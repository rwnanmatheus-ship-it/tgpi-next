"use client";

import { useEffect, useState } from "react";
import { getFavoriteCountries, toggleFavoriteCountry } from "@/lib/favorites";

type Props = {
  country: string;
};

export default function CountryFavoriteButton({ country }: Props) {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    async function load() {
      const favorites = await getFavoriteCountries();
      setActive(favorites.includes(country));
    }

    load();
  }, [country]);

  async function handleToggle() {
    setLoading(true);
    try {
      const updated = await toggleFavoriteCountry(country);
      setActive(updated.includes(country));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-yellow-500 text-black hover:bg-yellow-400"
          : "border border-yellow-500/40 bg-yellow-500/5 text-yellow-300 hover:bg-yellow-500/10"
      }`}
    >
      {loading ? "Saving..." : active ? "★ Favorited" : "☆ Add to Favorites"}
    </button>
  );
}