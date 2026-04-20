import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

function makeReferralCode(uid: string) {
  return `tgpi-${uid.slice(0, 8)}`;
}

export async function getOrCreateReferralCode(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  const existingCode = snap.exists() ? snap.data()?.referralCode : "";

  if (existingCode) {
    return existingCode;
  }

  const newCode = makeReferralCode(uid);

  await setDoc(
    ref,
    {
      referralCode: newCode,
      referrals: snap.exists() && typeof snap.data()?.referrals === "number"
        ? snap.data()?.referrals
        : 0,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return newCode;
}

export async function getReferralCount(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return 0;

  const referrals = snap.data()?.referrals;
  return typeof referrals === "number" ? referrals : 0;
}

export async function addReferralByCode(code: string) {
  const ref = doc(db, "referralCodes", code);
  const snap = await getDoc(ref);

  if (!snap.exists()) return false;

  const ownerUid = snap.data()?.ownerUid;
  if (!ownerUid) return false;

  const userRef = doc(db, "users", ownerUid);

  await updateDoc(userRef, {
    referrals: increment(1),
    xp: increment(50),
    updatedAt: new Date().toISOString(),
  });

  return true;
}

export async function ensureReferralIndex(uid: string, code: string) {
  const ref = doc(db, "referralCodes", code);

  await setDoc(
    ref,
    {
      ownerUid: uid,
      code,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}