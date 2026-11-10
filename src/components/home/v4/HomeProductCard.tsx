"use client";

import Image from "next/image";
import NavigationLink from "@/components/navigation/NavigationLink";
import { useLocale } from "@/components/localization/LocaleProvider";
import ProductSeal from "@/components/brand/ProductSeal";
import { homeCertificateSample } from "@/lib/home-content";
import { HOME_PRODUCTS, homeProductArt, type HomeProductId } from "@/lib/home-showcase";
import styles from "./home.module.css";

export default function HomeProductCard({ id }: { id: HomeProductId }) {
  const { t, locale } = useLocale();
  const product = HOME_PRODUCTS[id];
  const access = "access" in product ? product.access : null;
  return (
    <article className={styles.libraryCard} data-home-product={id}>
      <NavigationLink className={styles.productLink} href={product.href} prefetch={false}>
        <div className={styles.productArt}>
          <Image src={homeProductArt(id)} alt="" fill sizes="(max-width: 500px) 29vw, (max-width: 940px) 45vw, 400px" />
          {id === "certificates" && (
            <Image className={styles.certificateMini} src={homeCertificateSample(locale)} alt="" width={1684} height={1191} sizes="(max-width: 500px) 25vw, 245px" />
          )}
        </div>
        <div className={styles.productBody}>
          <ProductSeal product={id} />
          <div>
            {access && <p className={styles.productAccess}>{t(access)}</p>}
            <h3>{t(product.name)}</h3>
            <p className={styles.productDescription}>{t(product.description)}</p>
          </div>
          <span className={styles.productArrow} aria-hidden="true">↗</span>
        </div>
      </NavigationLink>
    </article>
  );
}
