import Image from "next/image";
import NavigationLink from "@/components/navigation/NavigationLink";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import ProductSeal from "@/components/brand/ProductSeal";
import { HOME_PRODUCTS, homeProductArt, type HomeProductId } from "@/lib/home-showcase";
import styles from "./home.module.css";

export default function HomeProductCard({ id, spotlight = false }: { id: HomeProductId; spotlight?: boolean }) {
  const product = HOME_PRODUCTS[id];
  const access = "access" in product ? product.access : null;
  return (
    <article className={spotlight ? styles.spotlightCard : styles.libraryCard} data-home-product={id}>
      <NavigationLink className={styles.productLink} href={product.href} prefetch={false}>
        <div className={styles.productArt}>
          <Image
            src={homeProductArt(id)}
            alt=""
            fill
            sizes={spotlight ? "(max-width: 679px) 92vw, (max-width: 1200px) 46vw, 608px" : "(max-width: 559px) 28vw, (max-width: 950px) 45vw, 397px"}
          />
        </div>
        <div className={styles.productBody}>
          <ProductSeal product={id} />
          <div className={styles.productText}>
            {access ? <p className={styles.productAccess}><LocalizedText text={access} /></p> : null}
            <h3><LocalizedText text={product.name} /></h3>
            <p className={styles.productDescription}><LocalizedText text={product.description} /></p>
          </div>
          <span className={styles.productArrow} aria-hidden="true">↗</span>
        </div>
      </NavigationLink>
    </article>
  );
}
