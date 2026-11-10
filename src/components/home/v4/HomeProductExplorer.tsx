"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import CinematicImage from "@/components/ui/CinematicImage";
import type { CinematicKey } from "@/lib/cinematic-art";
import { useLocale } from "@/components/localization/LocaleProvider";
import styles from "./home.module.css";

type Product = { id: string; label: string; title: string; copy: string; image: CinematicKey; href: string; cta: string; steps: readonly string[] };
const products: readonly Product[] = [
  { id: "decide", label: "Decide", title: "Compare the world before choosing.", copy: "Connect your goal to country profiles, comparison and a personal research plan. Examine sources, costs and open questions together.", image: "decision-comparison", href: "/compare?country=portugal&country=canada&goal=study", cta: "See a real comparison", steps: ["Define your goal.", "Explore the trade-offs.", "Prepare your next step."] },
  { id: "learn", label: "Learn", title: "Build skills for real situations.", copy: "Find a learning path, practise with applied activities and demonstrate what you have learned. Continue from your saved progress.", image: "learning-atelier", href: "/courses", cta: "View the learning catalogue", steps: ["Choose a learning path", "Practise and assess", "Document your achievement"] },
  { id: "atlas", label: "Ask Atlas", title: "Turn a question into a next step.", copy: "Use Atlas to explore ideas, clarify your research and find your way through TGPI. Check sources and current access conditions inside Atlas.", image: "atlas-intelligence", href: "/atlas", cta: "Open Atlas AI", steps: ["Bring your question", "Explore your context", "Choose your next action"] },
  { id: "organize", label: "Organize", title: "Give your ambitions a workspace.", copy: "Bring your destinations, plan, courses and preparation into one place. Sign in to see your own progress and continue where you left off.", image: "workspace-global-focus", href: "/profile", cta: "Open your workspace", steps: ["Save your direction", "Continue your learning", "Review your next steps"] },
];

export default function HomeProductExplorer() {
  const { t } = useLocale();
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const product = products[selected];
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % products.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + products.length) % products.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = products.length - 1;
    else return;
    event.preventDefault(); setSelected(next); refs.current[next]?.focus();
  }
  return <div className={styles.productExplorer}>
    <div className={styles.productTabs} role="tablist" aria-label={t("Explore TGPI tools")}>
      {products.map((item, index) => <button key={item.id} ref={element => { refs.current[index] = element; }} type="button" role="tab" id={`product-tab-${item.id}`} aria-selected={selected === index} aria-controls={`product-panel-${item.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => onKey(event, index)}><span aria-hidden="true">0{index + 1}</span>{t(item.label)}<span aria-hidden="true">↗</span></button>)}
    </div>
    {products.map((item, index) => <div key={item.id} role="tabpanel" id={`product-panel-${item.id}`} aria-labelledby={`product-tab-${item.id}`} tabIndex={0} hidden={selected !== index} className={styles.productPanel}>
      {selected === index && <><div className={styles.productPhoto}><CinematicImage asset={product.image} alt="" sizes="(max-width: 767px) 94vw, 55vw" /><div className={styles.productPhotoCaption}><span>TGPI</span><span>{t(product.label)} / 0{selected + 1}</span></div></div><div className={styles.productCopy}><p className={styles.eyebrow}>{t("Connected to your next step")}</p><h3>{t(product.title)}</h3><p>{t(product.copy)}</p><ol>{product.steps.map((step, i) => <li key={step}><span aria-hidden="true">0{i + 1}</span>{t(step)}</li>)}</ol><Link href={product.href} className={styles.darkButton}>{t(product.cta)} <span aria-hidden="true">↗</span></Link></div></>}
    </div>)}
  </div>;
}
