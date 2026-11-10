"use client";

import { useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { HOME_LIBRARY, HOME_PRODUCT_GROUPS, HOME_PRODUCTS } from "@/lib/home-showcase";
import HomeProductCard from "./HomeProductCard";
import styles from "./home.module.css";

const filters = [{ id: "all", label: "All tools" }, ...HOME_PRODUCT_GROUPS] as const;
type Filter = typeof filters[number]["id"];

export default function HomeProductExplorer() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? HOME_LIBRARY : HOME_LIBRARY.filter(id => HOME_PRODUCTS[id].category === filter);

  return (
    <>
      <div className={styles.libraryFilters} role="group" aria-label={t("Filter TGPI products")}>
        {filters.map(item => (
          <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {t(item.label)}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{t("{count} products shown", { count: visible.length })}</p>
      <div className={styles.libraryGrid}>
        {visible.map(id => <HomeProductCard key={id} id={id} />)}
      </div>
    </>
  );
}
