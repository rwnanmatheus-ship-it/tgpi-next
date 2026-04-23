import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type TGPICredential = {
  id: string;
  userId: string;
  name: string;
  program: string;
  score: number;
  level: string;
  issuedAt: string;
  verified: boolean;
};

export function generateTGPIId(uid: string) {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `TGPI-${uid.slice(0, 4).toUpperCase()}-${random}`;
}

export async function createCredential(data: Omit<TGPICredential, "id">) {
  const id = `TGPI-${Date.now()}`;
  const ref = doc(db, "credentials", id);

  await setDoc(ref, {
    id,
    ...data,
  });

  return id;
}

export async function getCredentialById(id: string) {
  const ref = doc(db, "credentials", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as TGPICredential;
}