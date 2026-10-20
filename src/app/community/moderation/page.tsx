import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ModerationConsole from "@/components/community/ModerationConsole";
export const dynamic = "force-dynamic";
export default async function Page() {
  const user = await currentUser();
  if (user?.privateMetadata.role !== "admin") notFound();
  return <ModerationConsole />;
}
