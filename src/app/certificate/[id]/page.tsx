import { redirect } from "next/navigation";

export default async function LegacyCertificateRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect("/certificates/" + encodeURIComponent(id));
}
