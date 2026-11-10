import { redirect } from "next/navigation";
import { normalizeCertificateId } from "@/lib/certificate-reference";

export default async function LegacyVerificationRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificateId = normalizeCertificateId(id);
  if (certificateId) redirect("/verify/credentials/" + encodeURIComponent(certificateId));
  redirect("/verify?legacy=" + encodeURIComponent(id));
}
