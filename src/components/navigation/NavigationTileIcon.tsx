import NavigationIcon from "@/components/navigation/NavigationIcon";
import type { NavigationIconName } from "@/lib/navigation-system";

const cinematicSymbols: Partial<Record<NavigationIconName, number>> = {
  globe: 0, compass: 1, compare: 2, file: 3, book: 4, apps: 5, bell: 6, key: 7,
};

/** Cinematic TGPI product miniatures share one cached image request. */
export default function NavigationTileIcon({ name }: { name: NavigationIconName }) {
  const symbol = cinematicSymbols[name];
  if (symbol === undefined) return <NavigationIcon name={name} />;
  return <span className="tgpi-nav-cinematic" data-symbol={name} data-cell={symbol} aria-hidden="true"><span className="tgpi-nav-cinematic-object" /><span className="tgpi-nav-cinematic-light" /></span>;
}
