import Link from "next/link";
import { dossierFor } from "@/lib/intelligence/dossiers";

export default function SourceReviewNotice({ country }: { country: string }) {
  const issues = dossierFor(country).sources.filter(source => source.reviewIssue);
  if (!issues.length) return null;
  return <p className="ig-caution">{issues.length} {issues.length === 1 ? "source has" : "sources have"} an open review issue for this destination. Content review and checker availability are separate. <Link className="ig-link" href="/intelligence/research#source-review">Inspect the limitations and next steps →</Link></p>;
}
