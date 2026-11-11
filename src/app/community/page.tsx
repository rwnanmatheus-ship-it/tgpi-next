import { localizeMetadata } from "@/lib/localization/metadata.server";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import CommunityApp from "@/components/community/CommunityApp";
const sourceMetadata: Metadata = {
  alternates: { canonical: "/community" },
  title: "Global Community | TGPI",
  description:
    "Connect with people navigating life across borders. Share experiences, ask questions and build your next step.",
};
export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[]; destination?: string | string[] }>;
}) {
  const { view, destination } = await searchParams;
  return (
    <CommunityApp
      globalAdmin={(await currentUser())?.privateMetadata.role === "admin"}
      initialView={
        typeof view === "string" && [
          "mine",
          "requests",
          "saved",
          "meetings",
          "feed",
          "questions",
          "atlas",
          "preferences",
        ].includes(view)
          ? view
          : "explore"
      }
      destination={typeof destination === "string" ? destination.trim().slice(0, 100) : ""}
    />
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
