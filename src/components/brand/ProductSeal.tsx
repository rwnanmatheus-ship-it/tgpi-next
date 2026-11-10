import NavigationIcon from "@/components/navigation/NavigationIcon";
import { HOME_PRODUCTS, type HomeProductId } from "@/lib/home-showcase";
import styles from "./showcase-brand.module.css";

export default function ProductSeal({ product, className }: { product: HomeProductId; className?: string }) {
  const { icon, tone } = HOME_PRODUCTS[product];
  return (
    <span className={className ? `${styles.seal} ${className}` : styles.seal} data-metal={tone} aria-hidden="true">
      <NavigationIcon name={icon} focusable="false" />
    </span>
  );
}
