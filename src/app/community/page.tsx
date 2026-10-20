import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import CommunityApp from "@/components/community/CommunityApp";
export const metadata: Metadata = {
  title: "Global Community | TGPI",
  description:
    "Connect with people navigating life across borders. Share experiences, ask questions and build your next step.",
};
export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; destination?: string }>;
}) {
  const p = await searchParams;
  return (
    <CommunityApp
      globalAdmin={(await currentUser())?.privateMetadata.role === "admin"}
      initialView={
        [
          "mine",
          "requests",
          "saved",
          "meetings",
          "feed",
          "questions",
          "atlas",
          "preferences",
        ].includes(p.view || "")
          ? p.view
          : "explore"
      }
      destination={(p.destination || "").slice(0, 100)}
    />
  );
}
