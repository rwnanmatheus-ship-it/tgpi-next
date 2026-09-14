import { redirect } from "next/navigation";

export default async function LegacyVerificationRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect("/verify?legacy=" + encodeURIComponent(id));
}
