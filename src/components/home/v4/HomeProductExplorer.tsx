"use client";

import { useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { normalizeCountrySearch } from "@/lib/country-search";
import { HOME_LIBRARY, HOME_PRODUCT_GROUPS, HOME_PRODUCTS } from "@/lib/home-showcase";
import HomeProductCard from "./HomeProductCard";
import { useHomeGoal } from "./HomeGoalState";
import styles from "./home.module.css";

const filters = [
  { id: "recommended", label: "For your goal" },
  { id: "all", label: "All products" },
  ...HOME_PRODUCT_GROUPS,
] as const;
type Filter = typeof filters[number]["id"];

export default function HomeProductExplorer() {
  const { t } = useLocale();
  const goal = useHomeGoal();
  const [filter, setFilter] = useState<Filter>("recommended");
  const [query, setQuery] = useState("");
  const search = normalizeCountrySearch(query);
  const group = HOME_PRODUCT_GROUPS.find(item => item.id === filter);
  const candidates = filter === "recommended" ? goal.products : HOME_LIBRARY;
  const visible = candidates.filter(id => {
    const product = HOME_PRODUCTS[id];
    if (group && product.category !== group.id) return false;
    if (!search) return true;
    const index = normalizeCountrySearch([product.name, product.description, t(product.name), t(product.description)].join(" "));
    return search.split(" ").every(word => index.includes(word));
  });

  return (
    <>
      <div className={styles.libraryToolbar}>
        <div className={styles.filters} role="group" aria-label={t("Filter TGPI products")}>
          {filters.map(item => (
            <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); if (item.id === "recommended") setQuery(""); }}>
              {t(item.label)}
            </button>
          ))}
        </div>
        <label className={styles.productSearch}>
          <span className="sr-only">{t("Search TGPI products")}</span>
          <span aria-hidden="true">⌕</span>
          <input type="search" value={query} placeholder={t("Search TGPI products")} maxLength={100} onChange={event => {
            setQuery(event.target.value);
            if (filter === "recommended" && event.target.value.trim()) setFilter("all");
          }} />
        </label>
      </div>
      <p className={styles.resultCount} role="status">
        {t("{count} products shown", { count: visible.length })}
        {filter === "recommended" && <span> · {t(goal.label)}</span>}
      </p>
      {visible.length ? (
        <div className={styles.libraryGrid}>
          {visible.map(id => <HomeProductCard key={id} id={id} />)}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>{t("No products match your search.")}</p>
          <button type="button" className={styles.outlineButton} onClick={() => { setQuery(""); setFilter("all"); }}>{t("Show all products")}</button>
        </div>
      )}
    </>
  );
}
