import { permanentRedirect } from "next/navigation";
import { getCountry } from "@/lib/countries";
import { documentsHref, resolveDocumentGoal } from "@/lib/documents-os";

export default async function DocumentsCompatibilityPage({ searchParams }: PageProps<'/documents'>) {
  const { country, goal } = await searchParams;
  permanentRedirect(documentsHref({
    country: typeof country === 'string' ? getCountry(country)?.slug : undefined,
    goal: resolveDocumentGoal(goal),
  }));
}
