"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {useLocale} from "@/components/localization/LocaleProvider";
import {comparisonPath} from "@/lib/comparison-state";
export default function ComparisonNavigation({countries,goal,page,pageSize}:{countries:{slug:string;name:string}[];goal:string;page:number;pageSize:number}){
  const {t}=useLocale();const router=useRouter();const [pending,startTransition]=useTransition();
  const total=Math.ceil(countries.length/pageSize);const path=comparisonPath(countries.map(c=>c.slug),goal);
  const href=(value:number)=>`${path}&view=${value}#decision-overview`;
  return <div className="compare-result-navigation" aria-busy={pending}><div><p className="compare-kicker">{t("Active comparison")}</p><strong>{t("Showing {start}–{end} of {count}",{start:(page-1)*pageSize+1,end:Math.min(page*pageSize,countries.length),count:countries.length})}</strong></div>{total>1 && <><label><span>{t("Jump to a country")}</span><select value="" onChange={e=>{if(e.target.value)startTransition(()=>router.push(href(Number(e.target.value))));}}><option value="">{t("Choose a country")}</option>{countries.map((c,i)=><option key={c.slug} value={Math.floor(i/pageSize)+1}>{c.name}</option>)}</select></label><nav aria-label={t("Comparison groups")}>{page>1 && <Link href={href(page-1)} prefetch={false}>← {t("Previous")}</Link>}<span>{page} / {total}</span>{page<total && <Link href={href(page+1)} prefetch={false}>{t("Next")} →</Link>}</nav></>}</div>;
}
