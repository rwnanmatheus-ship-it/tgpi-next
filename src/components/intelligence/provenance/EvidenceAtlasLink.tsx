"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import styles from "./provenance.module.css";

const guide = "/atlas?guide=evidence";

export default function EvidenceAtlasLink() {
  const { isSignedIn } = useAuth();
  return (
    <Link href={isSignedIn ? guide : `/sign-in?next=${encodeURIComponent(guide)}`} className={styles.darkButton}>
      <LocalizedText text="Open Atlas AI" /><span aria-hidden="true">↗</span>
    </Link>
  );
}
