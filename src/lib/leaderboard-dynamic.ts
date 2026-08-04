import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { RankingEntry, UserData } from "@/types";

type LeaderboardDocument = Pick<
  UserData,
  "name" | "displayName" | "photoURL" | "xp" | "level"
>;

export async function getLeaderboard(): Promise<RankingEntry[]> {
  const snapshot = await getDocs(collection(db, "users"));

  const users: RankingEntry[] = snapshot.docs.map((document) => {
    const data = document.data() as LeaderboardDocument;

    return {
      id: document.id,
      name: data.displayName || data.name || "TGPI Member",
      photoURL: data.photoURL,
      xp: Number(data.xp || 0),
      level: Number(data.level || 1),
    };
  });

  return users.sort((a, b) => b.xp - a.xp).slice(0, 10);
}
